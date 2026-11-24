---
title: Semaphores in Zephyr
description: How k_sem_take and k_sem_give work on a count, a limit and a wait queue, why a give to a waiting thread never raises the count, and what happens to a give at the limit.
order: 9
scenario: counting-semaphore
rtos: zephyr
keyStep: { event: Block, nth: 3 }
---

This walkthrough follows the pool of buffers from the
[counting semaphores lesson](/learn/counting-semaphores/) through Zephyr's `kernel/sem.c`. Set the
step level to **Line** and open the **Kernel** tab of the code panel.

The three threads, with Zephyr's priorities (a lower number is more urgent):

- `A` (14) takes `Pool` at once, works for three ticks, gives it back and works one tick more.
- `B` (13) does the same, after sleeping for one tick.
- `C` (12) sleeps for two ticks, takes `Pool` for two ticks of work, gives it back and works one
  tick more.

As always on Zephyr, a sleep ends one tick later than the same delay on FreeRTOS (see
[scheduling](/learn/scheduling/#the-tick)). So `B` wakes at tick 2 and `C` at tick 3.

## What a semaphore is

```c
K_SEM_DEFINE(Pool, 2, 2);
```

defines a `struct k_sem` with a count of 2 and a limit of 2. The struct has three fields:

- `count`: how many takes would succeed now.
- `limit`: the highest value `count` can reach. A binary semaphore is one with a limit of 1.
- `wait_q`: the threads waiting to take it, most urgent first, in arrival order within a priority.

The kernel panel shows the first two as variables and the third as the semaphore's waiting list.
(With `CONFIG_POLL` there is a fourth field, a list for `k_poll()`, which this scenario does not
use.) There is no buffer and no item size. There is no second list for threads waiting to give,
because a give never waits. `K_SEM_DEFINE()` checks at build time that the limit is not 0 and the
count is not above it. `k_sem_init()` checks the same at run time and returns `-EINVAL`.
[FreeRTOS](/learn/freertos/semaphores/) builds its semaphores on a queue whose items have no size.
Zephyr's is a separate object with its own two functions.

## Taking

```kernel zephyr:kernel/sem.c#z_impl_k_sem_take
```

There are three cases:

1. **The count is above 0.** It is decremented and the call returns 0, without touching the
   scheduler. `A` takes a buffer this way at tick 0 (the count goes from 2 to 1), and `B` at
   tick 2 (from 1 to 0).
2. **The count is 0 and the caller passed `K_NO_WAIT`.** The call returns `-EBUSY` at once. That is
   the only way an interrupt handler may call `k_sem_take()`. The `__ASSERT` at the top enforces it.
3. **The count is 0 and the caller can wait.** It calls `z_pend_curr()`.

[At tick 3](#sim:event=Block:3), `C` wakes, preempts `B` and finds the count at 0. It waits:

```kernel zephyr:kernel/sched.c#z_pend_curr
```

`z_pend_curr()` takes the scheduler's lock and calls `pend_locked()`. Only then does it release the
semaphore's lock, so no give can slip in between. `pend_locked()` does two things:

1. `add_to_waitq_locked()` takes `C` out of the run queue, marks it pending and inserts it into
   `Pool`'s `wait_q` by priority.
2. Unless the timeout is `K_FOREVER`, `z_add_thread_timeout()` puts `C` in the timeout list as
   well.

`z_swap_locked()` switches to `B`. Whatever `z_swap_locked()` returns when `C` runs again is what
`k_sem_take()` returns. Before the switch, the kernel stores `-EAGAIN` as that value. A thread
woken by its timeout gets `-EAGAIN`. A thread woken by a give gets whatever the giver stored in its
place.

## Giving

```kernel zephyr:kernel/sem.c#z_impl_k_sem_give
```

[At tick 5](#sim:event=Give:1), `B` is done with its buffer and calls `k_sem_give()`. The first
thing it does is `z_sched_wake()` on the wait queue. That takes the most urgent waiter off it:

```kernel zephyr:kernel/include/ksched.h#z_unpend_first_thread_locked
```

The waiter is `C`. It leaves `wait_q`, and its timeout, if it had one, is cancelled. Then
`z_sched_wake()` stores 0 as `C`'s return value and puts `C` back in the run queue. The count is
not touched: it was 0 and stays 0. The event log shows `Give` by `B` followed by `Take` by `C`,
both inside `B`'s call, before `C` has run.

`z_reschedule()` then switches to `C`, which is more urgent than `B`. `C` resumes inside
`z_pend_curr()`, gets 0, and returns from `k_sem_take()` with the buffer. It does not look at the
count again.

Only when nobody waits does the count go up. `C`'s own give at tick 7 finds an empty wait queue,
so the count becomes 1. `A`'s give at tick 10 makes it 2. In that branch, `sem_handle_poll_events()`
also tells any `k_poll()` callers that the semaphore is available.

This is the difference from FreeRTOS described in
[Semaphores as signals](/learn/semaphores/#who-takes-the-count-freertos-and-zephyr-differ). FreeRTOS
raises the count and wakes the task, and the woken task takes the count itself when it runs. In
Zephyr the count is handed over inside the give. No other thread can take it in between, and the
woken thread never has to wait again.

## The limit

The last line of the give is the whole rule:

```c
sem->count += (sem->count != sem->limit) ? 1U : 0U;
```

A give to a semaphore that is already at its limit changes nothing. `k_sem_give()` returns `void`,
so the caller cannot tell. FreeRTOS's `xSemaphoreGive()` returns `errQUEUE_FULL` in the same case.
For a pool this only happens if the code gives more often than it takes, which is a bug. For a
signal it is the lost event of the [interrupts lesson](/learn/interrupts/). The limit is at most
`K_SEM_MAX_LIMIT`, which is `UINT_MAX`.

`k_sem_reset()` is the opposite. It sets the count to 0 and wakes every waiter with `-EAGAIN`,
the same value a timeout gives.

## What to try

- Set **Pool counts up to** 3. `C` takes a buffer at tick 3 through the first case of
  `z_impl_k_sem_take()`, decrementing the count from 1 to 0. Nobody ever enters the wait queue,
  and `z_pend_curr()` is never called.
- Set **C urgency** to 2, the same as `B`. At tick 5 `B`'s give still hands the buffer to `C`: the
  `Take` is recorded in `B`'s call. But `C` is not more urgent, so `z_reschedule()` does not switch.
  `B` keeps the CPU until its time slice ends at tick 6. In between, the buffer already belongs to
  `C`, and no other thread could have taken it.
