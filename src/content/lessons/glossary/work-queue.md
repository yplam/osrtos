---
title: Work queue
description: A kernel thread that runs functions handed to it by interrupts and other threads, so deferred work needs no task of its own.
---

A **work queue** is a thread that waits for **work items** and runs them one after another. A
work item is a function and the data it needs. An interrupt handler or a task submits the item and
returns at once; the function runs later, in thread context, where it may take its time and call
kernel functions that an ISR may not. It is
[deferred interrupt handling](/learn/glossary/deferred-interrupt-handling/) without writing a task
and a semaphore for each job.

In **FreeRTOS** the nearest thing is the [timer service task](/learn/glossary/timer-service-task/).
`xTimerPendFunctionCall( fn, pvParameter1, ulParameter2, xTicksToWait )` and, from an interrupt,
`xTimerPendFunctionCallFromISR( fn, pvParameter1, ulParameter2, &xHigherPriorityTaskWoken )` send
a message through the timer command queue; the timer task calls `fn( pvParameter1, ulParameter2 )`
when it reads it. They need `configUSE_TIMERS` and `INCLUDE_xTimerPendFunctionCall`, and they fail
if the queue is full. The function runs at `configTIMER_TASK_PRIORITY`.

In **Zephyr** it is a kernel object of its own. `K_WORK_DEFINE( name, handler )` defines a
`struct k_work`; `k_work_submit()` puts it on the **system work queue**, `k_sys_work_q`, served by
the thread `sysworkq`. `k_work_schedule()` does the same after a delay with a
`struct k_work_delayable`. An application can start more queues with `k_work_queue_start()`.

Two details that surprise people:

- **The system work queue is cooperative.** `CONFIG_SYSTEM_WORKQUEUE_PRIORITY` defaults to -1, the
  least urgent [cooperative](/learn/zephyr/cooperative-threads/) priority, so a handler that has
  started is never preempted by another thread. A slow handler delays every other item, and every
  preemptible thread too.
- **Submitting twice is not queuing twice.** A Zephyr item that is already queued is not added
  again, so, like a binary semaphore, two submissions before it runs give one call. A FreeRTOS
  pended call is a message, so each one runs.

The [FreeRTOS event groups walkthrough](/learn/freertos/event-groups/#from-an-interrupt) follows a
pended call through the timer task, and the [Zephyr timers walkthrough](/learn/zephyr/timers/)
compares the system work queue with FreeRTOS's timer task.
