---
title: Producer and consumer
description: The pattern where one task makes items and another handles them, joined by a queue that absorbs the difference in their pace.
---

**Producer and consumer** is the most common way to split work between tasks. A **producer** makes
items: readings from a sensor, bytes from a UART, commands from a user. A **consumer** handles them.
A [message queue](/learn/glossary/message-queue/) between them carries the items, so neither has
to wait for the other, as long as the queue is neither full nor empty.

- When the producer is faster for a while, the queue fills up and absorbs the burst.
- When the consumer is faster, the queue empties and the consumer waits for the next item, using no
  CPU time.
- When the producer is faster **on average**, no queue is long enough. The queue fills and stays
  full, and the producer is slowed down to the consumer's pace (if it waits for room), or items are
  lost (if it cannot wait, like an interrupt handler).

The relative priorities decide how the two take turns. A more urgent consumer handles each item as
soon as it is sent, so the queue rarely holds more than one. A more urgent producer runs ahead and
leaves items in the queue for the consumer to catch up on. The [queues lesson](/learn/queues/)
lets you try both, and change the queue's length.

A producer is very often an interrupt handler: it does the minimum (reads the data, sends it to the
queue) and leaves the rest to a task, which is
[deferred interrupt handling](/learn/glossary/deferred-interrupt-handling/) with data attached.
