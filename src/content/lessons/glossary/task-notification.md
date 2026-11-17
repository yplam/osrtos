---
title: Task notification
description: A FreeRTOS signal sent straight to one task, through a value each task has, without a semaphore or queue object in between.
---

A **task notification** is a signal sent directly to a task. In FreeRTOS every task has a
notification value (a `uint32_t`) and a notify state; anyone who has the task's handle can notify
it, and only that task can wait for it.

- `xTaskNotifyGive()` adds one to the value and wakes the task if it waits for a notification.
  `vTaskNotifyGiveFromISR()` does the same from an interrupt handler.
- `ulTaskNotifyTake( clearOnExit, timeout )` waits until the value is not zero and returns it,
  then clears it (`pdTRUE`: the task learns how many notifications came) or takes one off
  (`pdFALSE`: a counting semaphore).
- `xTaskNotify()` and `xTaskNotifyWait()` use the value as bits (a small
  [event group](/learn/glossary/event-group/)) or as a one-item mailbox instead.

Notifications are faster and smaller than a [semaphore](/learn/glossary/semaphore/), because there
is no object, no list of waiters and no locking. The limits follow from the same fact: there is
exactly one receiver, the sender must know it, and nothing like priority inheritance is possible.

The [task notifications lesson](/learn/freertos/task-notifications/) shows an interrupt notifying a
handler task three times while it is busy, and the handler collecting all of them in one take.

**Zephyr** has no task notifications. A `k_sem` used by one thread only, a `k_event`, or a
`k_poll_signal` does the job, as an object of its own.
