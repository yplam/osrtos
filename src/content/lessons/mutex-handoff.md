---
title: "Mutex handoff: who gets a mutex when it is unlocked"
description: FreeRTOS frees the mutex and lets tasks compete for it; Zephyr gives it straight to the most urgent waiter. One program, two outcomes.
order: 9
scenario: mutex-handoff
rtos: [freertos, zephyr]
keyStep: { event: Give, nth: 1 }
---

When a task unlocks a mutex that other tasks are waiting for, the kernel has two choices.

- **Free the mutex and wake a waiter.** The woken task still has to take the mutex when it gets the
  CPU. If another task takes it first, the woken task waits again.
- **Hand the mutex over.** The kernel makes the most urgent waiter the owner inside the unlock call.
  The mutex is never free in between.

FreeRTOS does the first, Zephyr the second. Most programs cannot tell. The one above can.

## The program

`High` takes the mutex `M` and then sleeps for two ticks while holding it. That is bad practice, and
here it is done on purpose, to let the other two tasks reach the mutex. `Med` and `Low` both try to
take `M` and block.

Then `High` wakes up, works for one tick, **unlocks `M` and locks it again at once**, for two more
ticks of work. Releasing a lock and taking it again in a loop is a common pattern, for example in a
task that handles one item per pass.

## On FreeRTOS

1. Tick 3: `High` gives `M`. In `xQueueGenericSend()` the mutex becomes free, and the most urgent
   waiter, `Med`, is moved from the mutex's waiting list to its ready list.
2. `Med` is ready, but `High` has a higher priority and keeps running.
3. `High` calls `xSemaphoreTake()` again. The mutex is free, so it succeeds immediately.
4. `High` works during ticks 3 and 4, gives `M` at tick 5 and ends.
5. Only now does `Med` run. It takes `M` at tick 5, two ticks after it was "woken".

The waiter is taken off the waiting list by this function, which does not touch the mutex itself:

```kernel freertos:tasks.c#xTaskRemoveFromEventList
```

Had `Med` found the mutex taken when it finally ran, it would have gone round the loop in
`xQueueSemaphoreTake()` and blocked again. In a loop that gives and takes, a task of higher (or,
without time slicing, equal) priority can keep the others out for as long as it likes.

## On Zephyr

1. Tick 4 (Zephyr's sleeps are one tick longer): `High` calls `k_mutex_unlock()`. The kernel takes
   `Med` off the wait queue and writes it into `mutex->owner`. The simulator shows `M` held by `Med`
   although `Med` has not run yet.
2. `High` is still the most urgent thread and keeps running. It calls `k_mutex_lock()`.
3. The mutex has an owner, so `High` blocks, and `Med` inherits its priority (13 → 12).
4. `Med` works during ticks 4 and 5 and unlocks. `M` is handed to `High`, the most urgent waiter,
   ahead of `Low`.
5. `High` works during ticks 6 and 7.

```kernel zephyr:kernel/mutex.c#z_impl_k_mutex_unlock
```

The lines to look at are the ones that set `mutex->owner = new_owner` and make the new owner ready
in the same locked section.

## Which is better

Neither. They optimise for different things.

| | FreeRTOS: free and compete | Zephyr: hand over |
|---|---|---|
| The most urgent task | is never delayed by a less urgent waiter | can wait for a waiter's whole critical section |
| A waiter | can be passed over repeatedly | gets the mutex in priority order, once per unlock |
| `Med` owns the mutex | 2 ticks after `High` first unlocks it | at the moment `High` unlocks it |
| `High` finishes its second section | 2 ticks after its first unlock | 4 ticks after its first unlock |

FreeRTOS keeps the highest-priority task moving, which is the strict reading of "the most urgent
ready task runs". Zephyr guarantees progress to waiters, at the price of making `High` wait for
`Med`, with priority inheritance keeping that wait short.

If your code relies on one behaviour, say so in a comment. Code that unlocks and relocks in a loop
to "let others in" works on Zephyr and does nothing of the kind on FreeRTOS unless the task also
yields or the others have a higher priority.

## What to try

- Step by **Event** to the first unlock on one kernel, then on the other, and compare which task
  the kernel structures panel shows as the holder of `M`.
- Step by **Line** through the unlock on each kernel and watch the mutex's owner field.
