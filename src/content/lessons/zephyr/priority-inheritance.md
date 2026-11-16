---
title: Priority inheritance in Zephyr
description: How k_mutex_lock raises a chain of mutex owners and k_mutex_unlock works the priority out again, in the real kernel source.
order: 5
scenario: priority-inversion-mutex
rtos: zephyr
keyStep: { event: PrioChange, nth: 1 }
---

This page follows [priority inheritance](/learn/priority-inheritance/) through the Zephyr source,
as it is in v4.5.0. In the simulator above, set the step level to **Line** and use the **Kernel**
tab of the code panel to see each function execute.

The scenario: `Low` (priority 14) holds the mutex `M`. `Med` (priority 13) is running. At tick 3,
`High` (priority 12) wakes and calls `k_mutex_lock(&M, K_FOREVER)`. In Zephyr a lower number is a
more urgent priority.

## What the kernel records

A `k_mutex` has an `owner`, a `lock_count` (the same thread may lock it more than once) and a wait
queue sorted by priority. For inheritance, each thread carries three more things:

- `orig_prio`: its priority before any inheritance, recorded when it takes its first mutex.
- `held_mutexes`: a list of the mutexes it holds.
- `mutex_pended_on`: the mutex it is waiting for, if any.

The simulator shows `orig_prio` on the task card while a thread holds a mutex.

## Locking: raise the chain of owners

```kernel zephyr:kernel/mutex.c#z_impl_k_mutex_lock
```

The first branch is the uncontended case: the mutex is free (or already ours), so the caller
becomes the owner and the mutex is added to its `held_mutexes`.

Otherwise the caller is going to wait. It records the mutex in `mutex_pended_on` and works out the
priority the owner should have:

```kernel zephyr:kernel/mutex.c#new_prio_for_inheritance
```

That is the more urgent of the caller's and the owner's priorities, limited by
`CONFIG_PRIORITY_CEILING`.

Then comes a loop that FreeRTOS does not have. It raises the owner, and if that owner is itself
waiting for another mutex, it moves on to the owner of *that* mutex and raises it too, and so on
along the chain. Without this, a high-priority thread could still be held up by a medium one two
locks away. The loop stops when it reaches an owner that is not waiting, comes back to the mutex it
started from, or has made a fixed number of hops.

The priority change itself goes through `adjust_owner_prio()`:

```kernel zephyr:kernel/mutex.c#adjust_owner_prio
```

`z_thread_prio_set()` takes the thread out of the run queue, changes its priority and puts it back
in its new position. In the scenario you can see `Low` move ahead of `Med` in
`_kernel.ready_q.runq`. Finally `z_pend_curr()` puts the caller on the mutex's wait queue and
switches to the next thread, which is now `Low`.

## Unlocking: work the priority out again

```kernel zephyr:kernel/mutex.c#z_impl_k_mutex_unlock
```

The unlocking thread removes the mutex from its `held_mutexes`. If it is running at a priority
other than `orig_prio`, it does not simply go back to `orig_prio`. It asks what the mutexes it
*still* holds require:

```kernel zephyr:kernel/mutex.c#held_mutexes_highest_waiter_prio
```

The function looks at the first waiter of every mutex the thread still holds and returns the most
urgent priority among them, or `orig_prio` if nobody waits. So a thread that holds two mutexes
drops exactly as far as it can when it releases one. FreeRTOS, by contrast, keeps the raised
priority until the last mutex is released. Compare both in the
[nested mutexes lesson](/learn/nested-mutexes/).

One consequence was confirmed on the real kernel while this simulator was built: a priority set with
`k_thread_priority_set()` on a thread that holds a mutex is lost when it unlocks, because the
unlock path restores from `orig_prio`, which was recorded earlier.

## Handing the mutex over

The last part of `k_mutex_unlock()` takes the first thread off the wait queue and writes it into
`mutex->owner` directly. The mutex is never free in between, and the new owner has not run yet.
[Mutex handoff](/learn/mutex-handoff/) shows where this differs from FreeRTOS.

## When the waiter gives up

If `k_mutex_lock()` was called with a timeout and it runs out, `z_pend_curr()` returns an error and
the function continues after it. It recomputes the owner's priority with the same
`held_mutexes_highest_waiter_prio()` and lowers the owner if no remaining waiter justifies the
boost. Only the direct owner is lowered. Owners further along a chain keep their raised priority
until they unlock; the kernel documents this as a known limitation. The
[mutex timeout lesson](/learn/mutex-timeout/) runs this path.

## Deadlock detection

The same chain walk can notice a cycle. With `CONFIG_MUTEX_DEADLOCK_DETECT` it asserts when the
chain leads back to the caller and every wait in it is `K_FOREVER`. The excerpt of
`k_mutex_lock()` above contains those lines, but the simulated configuration has the option off: it
is on by default only when assertions are enabled. See [Deadlock](/learn/deadlock/).
