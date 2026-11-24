---
title: Queues between tasks
description: How a message queue passes data from a producer to a consumer, what happens when it is full or empty, and what its length buys you.
order: 14
scenario: producer-consumer
rtos: [freertos, zephyr]
keyStep: { event: Block, nth: 1 }
---

A [semaphore](/learn/semaphores/) tells a task that something happened. Most of the time the task
also needs to know *what*: the byte that arrived, the reading that was taken, the command that was
typed. A **[message queue](/learn/glossary/message-queue/)** carries that data. One task sends
items into it, another receives them, oldest first, and the kernel blocks either side when there is
nothing it can do:

- **Receiving from an empty queue** blocks the receiver until an item arrives (or its timeout runs
  out).
- **Sending to a full queue** blocks the sender until a slot is free (or its timeout runs out).

Both kernels copy items **by value**: sending copies the item into the queue's own storage, and
receiving copies it out into the receiver's variable. The sender can reuse its variable as soon as
the call returns. FreeRTOS calls the object a queue (`xQueueCreate()`, `xQueueSend()`,
`xQueueReceive()`); in Zephyr it is a message queue, `k_msgq` (`K_MSGQ_DEFINE()`, `k_msgq_put()`,
`k_msgq_get()`).

## The scenario

This is the classic [producer and consumer](/learn/glossary/producer-consumer/).

- `Producer` is the more urgent task. Six times, it works for one tick and sends an item. Its items
  are numbered `Producer#1` to `Producer#6`; in C each one is a `uint32_t`.
- `Consumer` receives an item and works on it for two ticks, six times.
- The queue `Q` holds three items: `xQueueCreate( 3, sizeof( uint32_t ) )`, or
  `K_MSGQ_DEFINE(Q, sizeof(uint32_t), 3, 4)`.

`Producer` makes an item every tick, and `Consumer` needs two ticks per item. The producer is
faster, so the queue will fill.

## What happens

Both kernels run this program on the same ticks.

1. Tick 0: `Producer` runs first, as the more urgent task. `Consumer` is ready, but does not get
   the CPU.
2. Ticks 1, 2 and 3: `Producer` sends `Producer#1`, `#2` and `#3`. Each fits, so it does not wait.
   The kernel panel shows the three items in their slots, with the oldest marked "out".
3. [Tick 4](#sim:event=Block:1): `Producer` tries to send `Producer#4`, but `Q` is full. It blocks,
   this time waiting for **room**: on FreeRTOS it is in the queue's `xTasksWaitingToSend` list, on
   Zephyr in its wait queue marked "to send". Only now does `Consumer` run.
4. Still at tick 4, `Consumer` receives `Producer#1`. That frees a slot, which wakes `Producer`;
   `Producer` is more urgent and preempts `Consumer` straight away, with `Producer#4` sent.
5. From then on the pattern repeats: `Producer` works one tick, finds the queue full and waits;
   `Consumer` frees a slot two ticks later and `Producer` fills it at once. At tick 10 `Producer`
   sends its last item and ends.
6. `Consumer` works through the three items still in the queue and ends at tick 18.

The queue keeps the two tasks loosely coupled. `Producer` ran ahead by three items without waiting
for anybody; once it was three items ahead, the queue slowed it down to the consumer's pace. No
item was lost, and neither task had to poll.

## What the length of a queue buys

A queue absorbs **bursts**. If items come faster than they are handled for a while, the queue
holds the difference, up to its length. It does not help when items come faster *on average*:
then the queue fills and stays full, and the producer runs at the consumer's speed anyway, as
`Producer` did from tick 4.

In this program, the consumer needs 12 ticks of work for six items whatever the length. Set
**Q holds** to 6 and `Producer` never waits: it sends all six items by tick 6 and ends, and the
queue drains afterwards. `Consumer` still ends at tick 18. Set it to 1 and `Producer` waits for room
after its first item, but again `Consumer` ends at tick 18. The length decides how far the producer can get
ahead, and how much memory that costs: the storage is length × item size, allocated when the queue
is created.

## Priorities decide the shape

Swap the urgencies (**Producer urgency** 1, **Consumer urgency** 2). `Consumer` now runs first and
blocks on the empty queue. Each time `Producer` sends an item, the waiting `Consumer` is woken, is
more urgent, and takes it at once: the queue never holds an item for longer than the send call.
The producer waits for the CPU instead of for room.

Neither shape is wrong. A more urgent consumer keeps latency low: each item is handled as soon as
it exists. A more urgent producer, the usual choice when the producer is an interrupt or must not
miss data, gets its work done first and leaves the queue to smooth things out.

## Waiting with a timeout, and interrupts

Like a semaphore take, `xQueueSend()`, `xQueueReceive()`, `k_msgq_put()` and `k_msgq_get()` take a
timeout. With 0 they never wait: a send to a full queue fails at once (`errQUEUE_FULL`, `-ENOMSG`)
and the item is not sent. A timed wait that runs out also fails (`errQUEUE_FULL` on FreeRTOS,
`-EAGAIN` on Zephyr).

An interrupt handler may send but never wait: `xQueueSendFromISR()` on FreeRTOS, `k_msgq_put()`
with `K_NO_WAIT` on Zephyr. If the queue is full, the item is lost. This is the usual way to pass
data from an interrupt to a task, with the queue long enough for the longest burst the task may
fall behind by. The [interrupts lesson](/learn/interrupts/) shows the same deferral with a
semaphore.

## Who gets an item

When a task is waiting to receive and an item is sent, which task gets that item? Here the answer
is always `Consumer`, but with more tasks it depends on the kernel: Zephyr copies the item straight
to the waiting receiver, and FreeRTOS lets the woken task try again when it runs. The
[queue handoff lesson](/learn/queue-handoff/) shows a program where that changes who receives what.
The walkthroughs show how each kernel stores the items:
[queues in FreeRTOS](/learn/freertos/queues/) and [message queues in Zephyr](/learn/zephyr/message-queues/).
