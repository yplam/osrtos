---
title: Counting semaphores
description: A semaphore that counts higher than 1, used as a pool of identical resources or to count events, and why a task waiting for one inherits nothing.
order: 13
scenario: counting-semaphore
rtos: [freertos, zephyr]
keyStep: { event: Block, nth: 3 }
---

A [binary semaphore](/learn/semaphores/) counts to 1: something has happened, or it has not. Many
problems need a larger number. A driver has four DMA buffers, and any four tasks may use one at a
time. An interrupt fires three times before the task that handles it gets to run, and all three
must be handled. A **[counting semaphore](/learn/glossary/counting-semaphore/)** is the same kernel
object with a higher limit: taking it decrements the count, giving it increments the count up to
its maximum, and a task that takes it at 0 waits.

The count can mean two things, and the semaphore starts accordingly:

- **Free resources** (a pool). The count starts at the maximum: every buffer is free. A task takes
  before it uses a buffer and gives when it is done, like a lock that several tasks can hold at once.
- **Events not yet handled.** The count starts at 0. The producer (often an interrupt handler) gives
  once per event, and the handler takes once per event it handles.

This lesson shows the first; the second is in the [interrupts lesson](/learn/interrupts/).

## The scenario

`Pool` counts two free buffers: `xSemaphoreCreateCounting( 2, 2 )` in FreeRTOS, and
`K_SEM_DEFINE(Pool, 2, 2)` in Zephyr (an initial count of 2 and a limit of 2). Three tasks each need
a buffer for a while.

- `A`, the least urgent, takes `Pool` at once, works for three ticks with it, gives it back and works
  one tick more.
- `B` does the same, starting at tick 1.
- `C`, the most urgent, starts at tick 2, needs a buffer for two ticks, gives it back and works one
  more tick.

There are three takers and two buffers, so one of them has to wait.

## What happens

The ticks are those of FreeRTOS. On Zephyr each start delay is one tick longer (`k_sleep()` sleeps
at least the full ticks it is given), so every step comes one tick later; the order is the same.

1. Tick 0: `C` and `B` sleep until their start, and `A` takes `Pool`. The count goes from 2 to 1.
   The semaphore panel shows one of its two tokens left.
2. Tick 1: `B` wakes, preempts `A` and takes the last buffer. The count is 0.
3. [Tick 2](#sim:event=Block:3): `C` wakes, preempts `B` and tries to take `Pool`. The count is 0,
   so `C` blocks in the semaphore's waiting list, and `B` runs on.
4. Tick 4: `B` gives its buffer back. `C` is waiting, so the give wakes it. `C` is more urgent than
   `B` and runs at once, with the buffer.
5. `C` gives at tick 6 and ends; `B` and then `A` finish their work. `A` gives the last buffer back
   at tick 10.

Look at the cards while `C` waits. `A` and `B` hold the buffers, yet their priorities do not
change, and the "Who waits for whom" panel says `Pool` has no owner. A mutex records the task that
holds it, and the kernel can raise that task's priority when a more urgent one waits
([priority inheritance](/learn/priority-inheritance/)). A counting semaphore only has a number.
The kernel cannot tell which of the takers will give next, so it cannot help them along. If `A` and
`B` were preempted by a medium-priority task, `C` would wait for as long as that task ran: the same
[priority inversion](/learn/priority-inversion/) as with a binary semaphore used as a lock.

## In the kernels

FreeRTOS makes a counting semaphore out of a queue whose items have no size, as it does a binary
semaphore. The maximum is the queue's length, and the start value is written straight into the count:

```kernel freertos:queue.c#xQueueCreateCountingSemaphore
```

Taking and giving are the same `xQueueSemaphoreTake()` and `xQueueGenericSend()` that a binary
semaphore uses; only `uxLength` differs. A give checks `uxMessagesWaiting < pxQueue->uxLength`, so
a give to a full pool fails and returns `pdFALSE`.

Zephyr's `struct k_sem` keeps a `count` and a `limit`. A binary semaphore is just one with a limit
of 1:

```kernel zephyr:kernel/sem.c#z_impl_k_sem_take
```

Step through [`B`'s give](#sim:event=Give:1) on each kernel with **Event** steps (tick 4 on
FreeRTOS, 5 on Zephyr). As with a binary semaphore, Zephyr's
`k_sem_give()` hands the give straight to `C`, so `C` has taken `Pool` before it even runs. FreeRTOS
raises the count to 1 and wakes `C`, which takes it a moment later, after the context switch.

## When to use which

| You need | Use |
|---|---|
| One task at a time inside a piece of code or on a device | a [mutex](/learn/glossary/mutex/): it has an owner and priority inheritance |
| Up to N tasks at a time on N identical resources | a counting semaphore, starting at N |
| To know that something happened, once | a binary semaphore, starting at 0 |
| To count events that may come faster than they are handled | a counting semaphore, starting at 0 |
| To pass data with each event | a [queue](/learn/queues/) |

A pool semaphore only says how many buffers are free, not which ones. The code still has to find a
free buffer, usually under a mutex or with interrupts masked for a moment.

## What to try

- Set **Pool counts up to** 3. Now there is a buffer for every task, `C` takes one at tick 2 without
  waiting, and the three tasks only compete for the CPU.
- Set **C starts at tick** 5. `B` has given its buffer back at tick 4, so `C` finds the count at 1
  and does not wait either. Whether a pool is big enough depends on timing, not only on the number
  of tasks.
