---
title: Delayed list
description: Where FreeRTOS keeps sleeping tasks, sorted by wake-up tick, and what Zephyr uses instead.
---

The **delayed list** is where FreeRTOS keeps the tasks that sleep until a given tick: every task in
`vTaskDelay()`, and every task that waits for a queue, semaphore or mutex with a timeout. Each entry
carries the tick at which the task must wake, and the list is sorted by it, so the kernel only ever
looks at the front.

When a task sleeps, `prvAddCurrentTaskToDelayedList()` works out its wake-up tick and inserts it in
order. The kernel also keeps `xNextTaskUnblockTime`, the wake-up tick of the first entry. On each
[tick](/learn/glossary/tick/), `xTaskIncrementTick()` compares the tick count with that one value and
only walks the list when it has been reached. The
[tick and delay walkthrough](/learn/freertos/tick-and-delay/) follows it line by line.

A task that waits with no timeout at all (`portMAX_DELAY`) is not put in the delayed list but in
`xSuspendedTaskList`, so it can never time out.

Two details that surprise people:

- **There are two delayed lists.** A wake-up tick that has wrapped past the largest tick count
  would sort before every other entry. Such tasks go into a second list, `pxOverflowDelayedTaskList`,
  and when the tick count wraps to 0 the two lists swap roles. The
  [tick overflow lesson](/learn/freertos/tick-overflow/) shows the swap.
- **Zephyr has no delayed list.** A sleeping thread is simply not in the
  [run queue](/learn/glossary/run-queue/); what wakes it is its entry in the kernel's **timeout
  list**. Each entry stores `dticks`, its distance in ticks from the entry before it, so the tick
  only decrements the first one. The same list holds every timeout, including the
  [time slice](/learn/glossary/time-slice/). See the
  [Zephyr tick and delay walkthrough](/learn/zephyr/tick-and-delay/).
