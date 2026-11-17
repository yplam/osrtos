---
title: Message queues in Zephyr
description: How k_msgq_put and k_msgq_get move messages through a ring buffer, and how the kernel finishes a waiting thread's call for it, so that a woken thread never has to try again.
order: 8
scenario: producer-consumer
rtos: zephyr
keyStep: { event: Receive, nth: 1 }
---

This walkthrough follows the [producer and consumer](/learn/queues/) through Zephyr's
`kernel/msg_q.c`. Set the step level to **Line** and go to [tick 4](#sim:tick=4): the message queue
`Q` is full, `Producer` is about to send its fourth message and `Consumer` has not run yet.

## What a message queue is

```c
K_MSGQ_DEFINE(Q, sizeof(uint32_t), 3, 4);
```

defines a `struct k_msgq` and a buffer for 3 messages of 4 bytes, aligned to 4. Its fields (all but
`msg_size` are in the kernel panel):

- `msg_size` and `max_msgs`: the size of a message and how many fit.
- `used_msgs`: how many slots hold a message.
- `read_ptr`: the oldest message, the one the next `k_msgq_get()` copies out.
- `write_ptr`: the slot the next `k_msgq_put()` copies into.
- `wait_q`: the threads that are waiting, most urgent first.

There is only **one** wait queue. Threads wait to receive only while the queue is empty, and to
send only while it is full, so at any moment the waiting threads are all receivers or all senders.
The panel marks each one "to send" or "to receive".

The two pointers wrap round at `buffer_end`, so the slots form a ring. The panel draws them in
memory order, with the oldest message marked "out" and `write_ptr`'s slot marked "in".

## Sending to a full queue

`k_msgq_put()` is `put_msg_in_queue()` with the message going to the back:

```kernel zephyr:kernel/msg_q.c#put_msg_in_queue
```

At ticks 1 to 3 the queue has room and no thread is waiting to receive, so each message is copied
to `write_ptr`, which moves on (wrapping from slot 2 to slot 0 after the third message), and
`used_msgs` goes up.

At tick 4 `used_msgs` equals `max_msgs`. `Producer` passed `K_FOREVER`, so it waits. Before it
calls `z_pend_curr()`, it stores the address of its message in `_current->base.swap_data`. That
pointer is the key to the rest: whoever frees a slot can find the message and send it for
`Producer`. `z_pend_curr()` takes `Producer` out of the run queue, puts it in `Q`'s `wait_q` and
switches to `Consumer`.

## Receiving, and finishing the sender's call

```kernel zephyr:kernel/msg_q.c#z_impl_k_msgq_get
```

`Consumer`'s `k_msgq_get()` finds 3 messages. It takes the one at `read_ptr` (slot 0,
`Producer#1`), moves `read_ptr` on and drops `used_msgs` to 2. Then, still holding the queue's
lock, it looks at the wait queue. A thread is waiting, and because a slot was just freed it must be
a sender. The kernel does that sender's work for it:

1. `z_unpend_first_thread_locked()` takes `Producer` off the wait queue and cancels its timeout,
   if it had one.
2. The message at `Producer`'s `swap_data`, `Producer#4`, is copied to `write_ptr` (slot 0, the
   slot just read), and `used_msgs` goes back to 3.
3. `arch_thread_return_value_set()` makes `Producer`'s `k_msgq_put()` return 0 when it runs again.
4. `z_sched_ready_locked()` puts `Producer` back in the run queue, and `z_reschedule()` switches to
   it, because it is more urgent than `Consumer`.

`Producer` resumes inside `z_pend_curr()`, gets 0, and returns from `k_msgq_put()` with its message
already sent. It never touches the queue again. The event log shows the order: `Consumer` receives
`Producer#1`, then `Producer` sends `Producer#4`, both inside `Consumer`'s call, and only then does
`Producer` run.

Sending to a waiting receiver is the mirror image. If a thread waits in `wait_q` while the queue is
empty, `put_msg_in_queue()` copies the message straight into that thread's buffer (its
`swap_data`) and readies it; the message never enters the queue. The
[queue handoff lesson](/learn/queue-handoff/) shows what that changes.

## Compared with FreeRTOS

[FreeRTOS](/learn/freertos/queues/) wakes the waiting task and lets it repeat its own call: the
woken sender sends again, the woken receiver receives again, and either may find that another task
got there first. Zephyr completes the operation before it wakes the thread, so a woken thread
always has what it waited for. The price is the copy inside the other thread's call, and a little
state per thread (`swap_data`) to make it possible. Semaphores ([`k_sem_give()`](/learn/semaphores/))
and mutexes ([`k_mutex_unlock()`](/learn/mutex-handoff/)) follow the same rule.

## From an interrupt

`k_msgq_put()` can be called from an interrupt handler with `K_NO_WAIT`; the function asserts that
an ISR never asks to wait. If a thread waits to receive, the handler's message goes straight to it
and the thread is readied, but `z_reschedule()` does not switch inside an ISR: the switch happens
when the interrupt returns, as in the [Zephyr interrupts walkthrough](/learn/zephyr/interrupts/).
If the queue is full, the call returns `-ENOMSG` and the message is lost.
