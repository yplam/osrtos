---
title: Task states
description: Running, ready, delayed, blocked, suspended and ended, followed through one task's life, with the names each kernel uses for them.
order: 4
scenario: task-states
rtos: [freertos, zephyr]
keyStep: { event: Suspend, nth: 1 }
---

A task spends most of its life not running. At any moment the kernel puts each task in one
**state**, and the state decides whether the scheduler may choose it. Learning the states is most
of learning how a kernel works: every later lesson is about how and when tasks move between them.

The simulator above follows one task, `Worker`, through every state. A second task, `Supervisor`,
is more urgent and causes most of what happens to `Worker`:

- `Worker` has three ticks of work, then sleeps for two ticks, then waits for the semaphore `S`, then
  does one more tick of work and ends.
- `Supervisor` sleeps for one tick, works for one tick, suspends `Worker`, works for another tick,
  resumes `Worker`, sleeps for five ticks, gives `S` and works for one last tick.

Watch the label on `Worker`'s task card, and its lane in the timeline. Tick numbers below are for
FreeRTOS, with Zephyr's in brackets: Zephyr's sleeps last one tick longer (the
[scheduling lesson](/learn/scheduling/#the-tick) explains why).

## Running

The task whose code the CPU is executing. With one CPU there is exactly one, and if no application
task can run, it is the kernel's idle task. `Worker` starts out running at tick 0, because
`Supervisor` goes to sleep first.

## Ready

A ready task could run, but a more urgent task has the CPU. At tick 1 (2) `Supervisor` wakes up,
and because it is more urgent, the kernel
[takes the CPU away from `Worker`](#sim:event=ContextSwitch:3). `Worker` is now ready: it has done
nothing wrong and is not waiting for anything, it simply has to wait its turn. This is
[preemption](/learn/preemption/).

## Suspended

`Supervisor` then [suspends `Worker`](#sim:event=Suspend:1) (`vTaskSuspend()`;
`k_thread_suspend()` in Zephyr). A suspended task is ignored by the scheduler until another task
resumes it, whatever its priority. Nothing in the kernel ends a suspension by itself: no timeout,
no event.

A tick later `Supervisor` [resumes it](#sim:event=Resume:1) and goes to sleep, so `Worker` is ready
again and runs at once. Suspending is a blunt tool, and real programs use it rarely; waiting on a
semaphore or queue is almost always the better way to stop a task.

## Delayed

At tick 5 `Worker` has finished its three ticks of work and
[sleeps for two ticks](#sim:event=Block:3) (`vTaskDelay(2)`; `k_sleep()` in Zephyr). A delayed
task waits for time to pass and nothing else. The kernel keeps it in a list sorted by wake-up
time, and the tick interrupt moves it back to ready when its time comes, at tick 7 (8).

The kernel panel shows the list: `xDelayedTaskList1` in FreeRTOS, the timeout list in Zephyr.
Both tasks are delayed between ticks 5 and 7 (5 and 8), so the CPU runs the idle task.

## Blocked

Back from its sleep, `Worker` asks for the semaphore `S`, which nobody has given yet. It
[blocks](#sim:event=Block:4): it waits for an event that another task (or an interrupt) must cause,
here a `give` of `S`. A blocked task uses no CPU. It sits in the semaphore's list of waiting tasks,
which the kernel panel shows under `S`.

At tick 8 (10) `Supervisor` wakes and [gives `S`](#sim:event=Give:1). That makes `Worker` ready,
but `Supervisor` is still more urgent and has one tick of work left. Only when `Supervisor` ends
does `Worker` run and do its last tick of work. (FreeRTOS lets `Worker` take `S` when it runs;
Zephyr hands `S` to it at the moment of the give. The
[mutex handoff lesson](/learn/mutex-handoff/) is about that difference.)

A wait can have a timeout ("wait for `S`, but at most 10 ticks"), and then the task is in two
places at once: the object's waiting list, and the list of tasks waiting for time. It becomes ready
on whichever comes first. `Worker` waits without a timeout.

## Ended

After its last tick of work, `Worker` [ends](#sim:event=TaskEnd:2). In FreeRTOS it deletes itself
with `vTaskDelete(NULL)` and waits in `xTasksWaitingTermination` until the idle task frees its
memory. In Zephyr its function returns and the kernel aborts the thread. An ended task can never run
again.

## The kernels' own names

The simulator's labels are the same for every kernel. Each kernel names things its own way:

| Simulator | FreeRTOS `eTaskGetState()` | Where FreeRTOS keeps it | Zephyr `base.thread_state` |
|---|---|---|---|
| Running | `eRunning` | `pxCurrentTCB`, and still in its ready list | `_current`, and still in the run queue |
| Ready | `eReady` | `pxReadyTasksLists[priority]` | `_THREAD_QUEUED`: in the run queue |
| Delayed | `eBlocked` | the delayed list | `_THREAD_SLEEPING`, with a timeout |
| Blocked | `eBlocked` | the object's waiting list, plus the delayed list (with a timeout) or `xSuspendedTaskList` (without one) | `_THREAD_PENDING`: in the object's wait queue, with a timeout if it has one |
| Suspended | `eSuspended` | `xSuspendedTaskList` | `_THREAD_SUSPENDED` |
| Ended | `eDeleted` until the idle task frees it | `xTasksWaitingTermination` | `_THREAD_DEAD` |

Two details stand out.

FreeRTOS does not tell delayed and blocked apart: both are `eBlocked`, because a delay is a wait
for nothing but a timeout. The difference is only whether the task's event list item is in an
object's list as well.

FreeRTOS also puts a task that waits **forever** in the *suspended* list, because there is no wake-up
time to sort it by. Step to the moment `Worker` blocks on FreeRTOS and look at the kernel panel:
`Worker` is in `xSuspendedTaskList`. It is still blocked, not suspended. `eTaskGetState()` tells
the two apart by checking whether the task is also waiting on an object.

In Zephyr, the state is a set of flags, and a thread can have more than one: a thread that is
suspended while it waits keeps `_THREAD_PENDING` as well. The simulator shows the flags on each
Zephyr task card. The running thread stays in the run queue in Zephyr's single-CPU configuration,
which makes choosing the next thread simpler.

## The whole picture

| Change | Caused by |
|---|---|
| Ready → Running | the scheduler, when it is the most urgent ready task |
| Running → Ready | preemption by a more urgent task, or giving up its turn (`taskYIELD()`, `k_yield()`, a time slice ending) |
| Running → Delayed | the task sleeps (`vTaskDelay()`, `k_sleep()`) |
| Running → Blocked | the task waits for something that is not available yet |
| Delayed or Blocked → Ready | the tick, when its time is up; another task or an interrupt, when it gives what was waited for |
| any → Suspended → Ready | `vTaskSuspend()` and `vTaskResume()` (`k_thread_suspend()`, `k_thread_resume()`) |
| Running → Ended | the task deletes itself or returns |

Only the first change is the scheduler's choice. Every other change happens because of something a
task, an interrupt or the tick did, after which the scheduler applies its rule again.

## What to try

- Give `Supervisor` an urgency of 1, the same as `Worker`. Neither preempts the other now: they
  take turns tick by tick ([time slicing](/learn/time-slicing/)), so `Worker` goes between ready and
  running before it is ever suspended.
- Set the step level to **Line**, go to the [suspension](#sim:event=Suspend:1), and step through
  `vTaskSuspend()` (or `k_thread_suspend()`) to see the task leave its ready list.

Next: the scheduler's rule and its lists in detail, in
[How an RTOS scheduler decides what runs](/learn/scheduling/).
