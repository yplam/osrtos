---
title: Semaphores as signals
description: How one task waits for another with a binary semaphore, why the waiter runs the moment it is signalled, and how a semaphore differs from a mutex.
order: 4
scenario: signal-semaphore
rtos: [freertos, zephyr]
keyStep: { event: Give, nth: 1 }
---

Tasks often have to wait for each other. A task that handles data has nothing to do until another
task (or, later, an interrupt) has produced some. It could check a flag in a loop, but that burns
the CPU that the producer needs. The kernel offers a better way: the waiting task **blocks** on a
[semaphore](/learn/glossary/semaphore/), and the producer **gives** the semaphore when there is work.

A binary semaphore is a counter that is either 0 or 1. Taking it when it is 1 sets it to 0 and
returns at once. Taking it when it is 0 blocks the caller until somebody gives it. Giving it sets
it to 1, or, if a task is waiting, wakes that task.

## The two tasks

- `Handler` is the more urgent task. It takes `S` and does one tick of work, twice.
- `Producer` works for two ticks, gives `S`, works three more, gives `S` again and works one last
  tick.

`S` starts empty: `xSemaphoreCreateBinary()` creates it that way in FreeRTOS, and the Zephyr
program defines it with `K_SEM_DEFINE(S, 0, 1)`, a count of 0 and a limit of 1.

## What happens

1. Tick 0: `Handler` runs first, because it is more urgent. It takes `S`, which is empty, so it
   blocks. Its card shows it as blocked on `S`, and `Producer` gets the CPU.
2. `Producer` works during ticks 0 and 1. Nothing in the kernel looks at `Handler` meanwhile: a
   task that waits for a semaphore costs no CPU time at all.
3. [Tick 2](#sim:event=Give:1): `Producer` gives `S`. `Handler` is taken off the semaphore's
   waiting list and made ready. It is more urgent than `Producer`, so the kernel switches to it
   inside the give call. `Producer` is preempted in the middle of its own code.
4. `Handler` does its tick of work and, at [tick 3](#sim:event=Block:2), takes `S` again. `S` is
   empty again, so it blocks again, and `Producer` continues.
5. Tick 6: the second give, and the same thing happens. `Handler` runs during tick 6 and ends.
6. `Producer` finishes its last tick, 7, and ends.

The timing of `Handler` is now decided by the event it waits for, not by polling: it reacts in the
same tick the signal is given. That is the pattern behind most RTOS programs, with the giver often
being an interrupt handler (the lesson on interrupts comes later).

## Who takes the count: FreeRTOS and Zephyr differ

Step through tick 2 on each kernel with **Event** steps and watch the semaphore in the kernel
structures panel.

- **FreeRTOS** builds a semaphore on its queue. `xSemaphoreGive()` puts one (empty) item in the
  queue, so `uxMessagesWaiting` becomes 1, and wakes `Handler`. When `Handler` runs again, it is
  still inside `xSemaphoreTake()`, which goes round its loop, finds the item and removes it. The
  take happens *after* the context switch.
- **Zephyr**'s `k_sem_give()` checks the wait queue first. If a thread waits, the kernel wakes it
  with the semaphore already taken on its behalf; the count is never raised. The take happens
  *before* the context switch, inside the give.

```kernel zephyr:kernel/sem.c#z_impl_k_sem_give
```

The `if` at the top is the whole difference: `z_sched_wake()` hands the semaphore to the first
waiter, and only when nobody waits does `count` go up. As with
[mutex handoff](/learn/mutex-handoff/), the result here is the same on both kernels, but on FreeRTOS
a third task could take `S` between the give and the moment `Handler` runs.

## A semaphore is not a mutex

Both are taken and given, and FreeRTOS even creates both with `xSemaphoreCreate...()`, so they are
easy to confuse. They answer different questions.

| | Binary semaphore | [Mutex](/learn/glossary/mutex/) |
|---|---|---|
| Used for | signalling: "something happened" | mutual exclusion: "I am using this" |
| Starts | empty (nothing has happened yet) | free |
| Who gives it | any task, often a different one from the taker | only the task that took it |
| Owner | none | the task that holds it |
| [Priority inheritance](/learn/priority-inheritance/) | no: there is no owner to raise | yes |
| From an interrupt | can be given (with the ISR form of the call) | must not be used |

A semaphore can be used as a lock, by starting it full. The
[priority inversion](/learn/priority-inversion/) lesson does exactly that and shows the price: the
kernel does not know who holds it, so it cannot help the waiter. Use a mutex to protect data, and a
semaphore to say that something has happened.

## A binary semaphore remembers one signal

The count of a binary semaphore stops at 1. If the producer gives twice before the handler takes
once, the second give is lost: FreeRTOS's `xSemaphoreGive()` returns `pdFALSE`, and Zephyr's
`k_sem_give()` leaves the count at its limit. The handler then sees one event where there were two.

When events can arrive faster than they are handled, or when a semaphore stands for a number of
free resources, a counting semaphore is needed. It works the same way with a larger limit, and is
the subject of a later lesson.

## What to try

- Swap the urgencies: set **Handler urgency** to 1 and **Producer urgency** to 2. Now `Handler`
  does not run until `Producer` has finished. `Producer` gives twice while nobody waits; the second
  give is lost, `Handler` takes `S` once, runs, and then waits for a signal that never comes. The run
  stops at its tick limit with `Handler` still blocked.
- Set **Handler starts at tick** to 3. The first give finds nobody waiting and leaves the count at
  1, so when `Handler` arrives it takes `S` without blocking. Only its second take waits.
