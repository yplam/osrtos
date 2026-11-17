---
title: Message queue
description: A kernel object that passes items of data between tasks, first in first out, blocking a receiver while it is empty and a sender while it is full.
---

A **message queue** (in FreeRTOS simply a **queue**) passes data between tasks, or from an
interrupt handler to a task. It has a fixed number of slots of a fixed size, set when it is
created. Items come out in the order they went in.

- **Sending** copies an item into a free slot. If the queue is full, the sender can wait for room,
  with or without a timeout, or give up at once.
- **Receiving** copies the oldest item out. If the queue is empty, the receiver can wait for an
  item in the same ways.
- A task waiting on a queue uses no CPU time. The kernel wakes it when an item or a free slot
  appears, or when its timeout runs out.

Items are copied **by value**, so the sender may reuse or free its variable as soon as the send
returns. To pass something large, send a pointer to it, and make sure the sender does not change
the data until the receiver is done with it.

The [queues lesson](/learn/queues/) shows a producer and a consumer working through a queue of
three items, and the [queue handoff lesson](/learn/queue-handoff/) shows the two kernels deciding
differently which waiting task gets an item.

In **FreeRTOS**: `xQueueCreate( uxLength, uxItemSize )`, `xQueueSend()`, `xQueueReceive()`, and
`xQueueSendFromISR()` for interrupt handlers. Mutexes and semaphores are built on the same
`Queue_t`, with items of size zero. In **Zephyr**: `K_MSGQ_DEFINE( name, msg_size, max_msgs, align )`,
`k_msgq_put()` and `k_msgq_get()`; an interrupt handler calls `k_msgq_put()` with `K_NO_WAIT`.
Zephyr also has `k_fifo` and `k_queue`, which pass pointers to items without copying them.
