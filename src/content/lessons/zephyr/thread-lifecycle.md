---
title: Suspending, resuming and ending a thread in Zephyr
description: How k_thread_suspend and k_thread_resume set and clear one bit of a thread's state, why a suspended thread keeps its timeout, and how a thread whose entry function returns is halted at once.
order: 5
scenario: task-states
rtos: zephyr
keyStep: { event: Suspend, nth: 1 }
---

This walkthrough follows `Worker` through Zephyr's `kernel/thread.c` and `kernel/sched.c` while
`Supervisor` suspends it, resumes it, and both threads end. The
[task states lesson](/learn/basics/task-states/) explains what the states mean. Here we look at how
the kernel records them. Set the step level to **Line** and open the **Kernel** tab of the code
panel.

The two threads:

- `Worker` (priority 14) works for three ticks, sleeps for two, waits for the semaphore `S`, and
  works one more tick.
- `Supervisor` (priority 13) sleeps for one tick and works for one. Then it calls
  `k_thread_suspend()` on `Worker`, works one more tick and calls `k_thread_resume()`. Then it
  sleeps for five ticks, gives `S` and works a last tick.

## A state is a set of bits

FreeRTOS knows a task's state by the list its `xStateListItem` is in. Zephyr keeps the state in the
thread itself, as bits of `base.thread_state`. The task card shows them as `thread_state`, without
the `_THREAD_` prefix. The ones that matter here:

- `_THREAD_QUEUED`: the thread is in the [run queue](/learn/glossary/run-queue/).
- `_THREAD_SLEEPING`: it waits for its timeout, as in `k_sleep()`.
- `_THREAD_PENDING`: it waits in an object's [wait queue](/learn/glossary/wait-queue/).
- `_THREAD_SUSPENDED`: it was suspended.
- `_THREAD_DEAD`: it has ended.

A thread may run only if none of the last four is set. `z_is_thread_prevented_from_running()` tests
them all in one mask. The bits are independent of each other, so a thread can be asleep *and*
suspended at the same time. That turns out to matter.

## Suspending another thread

[At tick 3](#sim:event=Suspend:1), `Supervisor` calls `k_thread_suspend(Worker)`. `Worker` is
ready. `Supervisor` preempted it at tick 2, with one tick of its work left.

```kernel zephyr:kernel/thread.c#z_impl_k_thread_suspend
```

Read it from the top:

1. A thread that suspends itself takes a shortcut (below). `Worker` is not the caller.
2. A thread that is already suspended is left alone.
3. Everything else goes to `z_thread_halt(thread, key, false)`. That is the function that also ends
   a thread. `false` means "suspend, don't terminate".

On one CPU, `z_thread_halt()` calls `halt_thread()` with the new state `_THREAD_SUSPENDED`:

```kernel zephyr:kernel/sched.c#halt_thread
```

For a suspend, only the first lines run. The function sets the bit and calls `dequeue_thread()`
because `Worker` is in the run queue. Then `update_cache(1)` picks the next thread to run, and the
function returns at the `_THREAD_SUSPENDED` test. Everything after that is for threads that end.
Back in `z_thread_halt()`, `Worker` is not the running thread, so nothing switches. `Supervisor`
carries on.

Note what a suspend does **not** do. It does not cancel the thread's timeout, and it does not take
the thread out of a wait queue. If `Worker` had been asleep, its timeout would still fire. The
timeout handler clears `_THREAD_SLEEPING` and calls `ready_thread()`. `ready_thread()` sees the
suspended bit and leaves the thread out of the run queue. The same happens if a thread is suspended
while it waits for an object: it can still be given the object, but it does not run until it is
resumed. FreeRTOS's `vTaskSuspend()` is different. It removes the task from the delayed list and
from any event list and puts it in `xSuspendedTaskList`, so the delay or the wait is cancelled. See
[the FreeRTOS walkthrough](/learn/freertos/task-lifecycle/).

### Suspending yourself

A thread that suspends itself goes through a shorter path:

```kernel zephyr:kernel/sched.c#z_thread_suspend_current
```

The running thread is in no wait queue and runs on no other CPU, so the function only marks it,
takes it out of the run queue, picks the next thread and switches. The shortcut is taken only
outside interrupts and on a single CPU. Nothing in this scenario suspends itself.

## Resuming

[At tick 4](#sim:event=Resume:1), `Supervisor` calls `k_thread_resume(Worker)`:

```kernel zephyr:kernel/thread.c#z_impl_k_thread_resume
```

It clears the bit and calls `z_sched_ready_locked()`, another name for `ready_thread()`:

```kernel zephyr:kernel/sched.c#ready_thread
```

`ready_thread()` only queues a thread that is not queued and that `z_is_thread_ready()` accepts. A
thread resumed while it still sleeps or waits stays out of the run queue until that ends too.
`Worker` has no other bit set, so it goes to the end of the run queue for priority 14.

`z_reschedule_locked()` then asks whether to switch. `Worker` is less urgent than `Supervisor`, so
the answer is no. A resumed thread is only *ready*. It runs when it is the most urgent. Here that
is later in the same tick, when `Supervisor` calls `k_sleep()`. `Worker` then does its last tick
of work (tick 4) from where it was stopped, as if nothing had happened.

## Ending a thread

The simulator's threads end the usual Zephyr way: their entry function returns. A thread does not
start in its entry function. It starts in `z_thread_entry()`, which calls the entry function and
handles the return:

```kernel zephyr:kernel/sys/thread_entry.c#z_thread_entry
```

`k_thread_abort()` on the running thread ends up in `z_thread_abort()`:

```kernel zephyr:kernel/thread.c#z_thread_abort
```

It returns at once if the thread is already dead. Otherwise it calls `z_thread_halt()`, this time
with `true`:

```kernel zephyr:kernel/sched.c#z_thread_halt
```

The `cpu != NULL` branch is for a thread that runs on another CPU. With one CPU, `halt_thread()`
runs with `_THREAD_DEAD`. This time it goes all the way through:

1. It sets the bit and takes the thread out of the run queue.
2. If the thread was waiting in an object's wait queue, it takes it out (not the case here). It
   cancels its timeout.
3. `unpend_all(&thread->join_queue)` wakes every thread waiting in `k_thread_join()` for this one.
   Nobody joins here.
4. `update_cache(1)` picks the next thread. The rest is bookkeeping for optional features: thread
   monitoring, object cores, user-mode permissions.

Back in `z_thread_halt()`, the dead thread is the running one, so `z_swap_locked()` switches away.
It never returns: the `__ASSERT` after it says so.

The first time is [tick 11](#sim:event=TaskEnd:1). `Supervisor` returns from its entry function
and `Worker` runs. `Supervisor` had given `S` at tick 10, and `k_sem_give()` had already handed the
semaphore to `Worker`, so `Worker`'s `k_sem_take()` returns 0 at once. `Worker` works one tick and
[ends at tick 12](#sim:event=TaskEnd:2), the same way. The idle thread runs.

### No cleanup afterwards

That is all. The kernel never frees a thread: its `struct k_thread` and its stack belong to the
application, statically with `K_THREAD_DEFINE()` or passed in to `k_thread_create()`. Once
`k_thread_join()` has returned, the application may reuse or free them. There is no later step and
no list of threads waiting to be cleaned up. The one exception is MMU systems with
`CONFIG_THREAD_STACK_MEM_MAPPED`. There, a thread that aborts itself has its stack unmapped later,
at the next abort.

FreeRTOS works the other way. A task that deletes itself cannot free the stack it is running on.
`vTaskDelete()` moves it to `xTasksWaitingTermination`, and the idle task frees its TCB and stack
later. That is why a FreeRTOS program that deletes tasks must let the idle task run.

## One tick later than FreeRTOS

Switch to FreeRTOS and compare the timeline. There, `Supervisor` wakes at tick 1, suspends `Worker`
at 2 and resumes it at 3, and the threads end at 9 and 10. Zephyr adds a tick to every relative
sleep so that it lasts at least as long as asked (see [scheduling](/learn/scheduling/#the-tick)).
`Supervisor` sleeps once before the suspend and once more before it gives `S`. So the suspend
comes one tick later on Zephyr, and the end two ticks later.

## What to try

- Set **Supervisor urgency** to 1, the same as `Worker`. `Supervisor` can no longer preempt, so
  the two take turns by [time slice](/learn/glossary/time-slice/). `Supervisor` only reaches
  `k_thread_suspend()` at tick 4, after `Worker` has done all three ticks of its work. Everything
  after that comes a tick later, and both threads end at tick 13.
- Set **Supervisor starts at tick** to 3. `Worker` is asleep until tick 6 when `Supervisor`
  suspends it at tick 5, and its card shows `sleeping | suspended`. Step by **Line** through tick 6. `Worker`'s timeout still fires, but the
  kernel leaves it out of the run queue because it is suspended. `Supervisor`'s
  `k_thread_resume()`, later in the same tick, puts it back.
