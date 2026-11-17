---
title: "Queue handoff: who gets an item sent to a waiting task"
description: Zephyr copies an item straight to the task waiting for it; FreeRTOS puts it in the queue and lets the woken task try again. One program, two outcomes.
order: 15
scenario: queue-handoff
rtos: [freertos, zephyr]
keyStep: { event: Send, nth: 1 }
---

A task waits on an empty [queue](/learn/queues/). Another task sends an item. The waiting task
obviously gets it, doesn't it? Not necessarily. When an item is sent to a queue that has a waiting
receiver, the kernel can do one of two things, just as with a
[mutex that is unlocked](/learn/mutex-handoff/):

- **Put the item in the queue and wake the receiver.** The woken task still has to take the item
  out when it gets the CPU. If another task receives from the queue first, it gets the item.
- **Hand the item over.** The kernel copies the item straight into the waiting receiver's buffer
  inside the send call. The item never sits in the queue, so nobody else can take it.

FreeRTOS does the first, Zephyr the second. The program above makes the difference visible.

## The program

- `Early` is the least urgent task. It asks for an item at tick 0, finds `Q` empty and waits.
- `Sender` is the most urgent. From tick 2 it sends `Sender#1`, works for two ticks and sends
  `Sender#2`.
- `Late`, more urgent than `Early`, also starts at tick 2 and asks for an item.

`Early` has waited longest, and `Sender#1` is sent while it waits. Who receives it?

## On FreeRTOS

1. Tick 0: `Sender` and `Late` sleep until tick 2. `Early` calls `xQueueReceive()`, finds the
   queue empty and joins its `xTasksWaitingToReceive` list.
2. [Tick 2](#sim:event=Send:1): `Sender` runs first and sends `Sender#1`. `xQueueGenericSend()`
   copies it into the queue, then sees a task waiting to receive and moves `Early` to its ready
   list. `Early` is less urgent than `Sender`, so nothing switches. The kernel panel shows
   `Sender#1` **in the queue**, and `Early` ready but without an item.
3. `Sender` works during ticks 2 and 3 and sends `Sender#2` at tick 4. Nobody is waiting now, so the
   item simply joins the queue. `Sender` ends.
4. `Late` is the most urgent task that is ready. Its `xQueueReceive()` finds two items and takes the
   oldest: `Sender#1`.
5. At tick 5 `Early` finally runs. It is still inside the `xQueueReceive()` it called at tick 0; the
   loop in that function goes round, finds `Sender#2` and returns it.

Waking a task does not give it the item. Had `Sender` sent only one item, `Early` would have found
the queue empty when it ran, and gone back to waiting, having been "woken" for nothing.

## On Zephyr

1. Tick 0: the same, with `Early` in the message queue's `wait_q`. Its call left the address of
   its buffer in the thread's `swap_data`.
2. Tick 3 (Zephyr's sleeps are one tick longer): `Sender` calls `k_msgq_put()`. The queue is not
   full, so the kernel first takes the most urgent waiter off the wait queue, `Early`, and copies
   `Sender#1` **straight into `Early`'s buffer**. `Early` becomes ready with its item already
   received. The queue stays empty.
3. `Sender` works during ticks 3 and 4 and sends `Sender#2` at tick 5. Nobody waits, so it goes
   into the queue. `Sender` ends.
4. `Late` runs and receives `Sender#2`, the only item there is.
5. At tick 6 `Early` runs, and its `k_msgq_get()` returns at once with `Sender#1`.

```kernel zephyr:kernel/msg_q.c#put_msg_in_queue
```

The handoff happens under the scheduler's lock, and the comment above it says why: a timeout
firing at that moment must not wake the receiver before the message is in its buffer. Once the
receiver is off the wait queue with its item, no other thread can get that item.

## Which is better?

Neither kernel is wrong; they make different promises.

- Zephyr's handoff is **fair**: the item goes to a task that was already waiting for it, and a
  woken receiver always has an item. The kernel does the copy on the receiver's behalf.
- FreeRTOS's way is simpler, and favours **urgency**: an item goes to whichever task asks for it
  first once it is in the queue, and that is usually the most urgent one. The price is that a
  woken task may find nothing, so FreeRTOS's receive is a loop that can wait again.

Most programs cannot tell the difference: one consumer per queue, or consumers that are all alike.
It shows when several tasks receive from one queue *and* each item matters to a particular one, for
example when the item is a reply. Then the order of the items alone should not decide who gets
which. Give each consumer its own queue.

The same choice appears on the sending side. When a receive frees a slot in a full queue, Zephyr
copies the waiting sender's item into the queue inside the receive call; FreeRTOS wakes the sender,
which sends again when it runs. The [producer and consumer](/learn/queues/) lesson has a sender
waiting for room; step through tick 4 on each kernel to see it.

## What to try

- Set **Late starts at tick** 6. Now nothing competes with `Early`, and both kernels give it
  `Sender#1`.
- Set **Late urgency** to 1, the same as `Early`. On FreeRTOS `Late` still gets `Sender#1`: the
  tick woke it at tick 2, before `Sender` woke `Early`, so it is ahead of `Early` in the ready list
  for priority 1.
- Set **Early urgency** to 3 and **Sender urgency** to 1. `Early` is now the most urgent task and
  runs as soon as it is woken, so on FreeRTOS too it takes `Sender#1` before anyone else can.
