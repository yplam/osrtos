---
title: Suspending, resuming and ending a task in FreeRTOS
description: How vTaskSuspend and vTaskResume move a task in and out of xSuspendedTaskList, how the kernel tells a suspended task from one that waits forever, and why a task that deletes itself is freed by the idle task.
order: 5
scenario: task-states
rtos: freertos
keyStep: { event: Suspend, nth: 1 }
---

The [task states lesson](/learn/basics/task-states/) follows `Worker` through every state. This
walkthrough reads the three FreeRTOS functions behind the last ones: `vTaskSuspend()`,
`vTaskResume()` and `vTaskDelete()`. Set the step level to **Line** and open the **Kernel** tab.

`Worker` (priority 1) works for three ticks, sleeps for two, waits for the semaphore `S` and works
one more tick. `Supervisor` (priority 2) starts at tick 1. It suspends `Worker`, resumes it a tick
later, sleeps until tick 8, gives `S` and ends.

## Suspending: vTaskSuspend

```kernel freertos:tasks.c#vTaskSuspend
```

[At tick 2](#sim:event=Suspend:1) `Supervisor` calls `vTaskSuspend( xWorker )`. `Worker` is ready:
`Supervisor` preempted it at tick 1. Everything that changes a list happens in one critical
section:

1. `uxListRemove()` takes `Worker`'s `xStateListItem` out of whatever list it is in. Here that is
   the [ready list](/learn/glossary/ready-list/) for priority 1. It could as well be the
   [delayed list](/learn/glossary/delayed-list/), or `xSuspendedTaskList` for a task that waits
   without a timeout.
2. If the task's `xEventListItem` is in an object's waiting list, it is taken out too. A
   suspended task no longer waits for anything: giving the object later will not wake it.
   `Worker` waits for nothing here.
3. `vListInsertEnd()` puts the task into `xSuspendedTaskList`.
4. If the task was waiting for a [notification](/learn/freertos/task-notifications/), that wait is
   cancelled as well.

After the critical section, `prvResetNextTaskUnblockTime()` runs, in case the task was the next one
due to wake: a suspended task has no wake-up time. Last, if the task suspended itself
(`vTaskSuspend( NULL )`), it yields. `Worker` is not the running task, so `Supervisor` carries on.

Nothing in the kernel ever takes a task out of `xSuspendedTaskList` because of time. The tick does
not look at it. Only `vTaskResume()` (or `xTaskResumeFromISR()`) can.

## Suspended or waiting forever?

`xSuspendedTaskList` holds two kinds of task. A task that is suspended, and a task that waits
with `portMAX_DELAY`: it has no wake-up time to be sorted by, so it goes there instead of a delayed
list. The [task states lesson](/learn/basics/task-states/#the-kernels-own-names) shows `Worker` in
this list at tick 7, blocked on `S`, not suspended.

`vTaskResume()` must only resume the first kind. `prvTaskIsTaskSuspended()` tells them apart:

```kernel freertos:tasks.c#prvTaskIsTaskSuspended
```

A task is suspended only if all of these hold:

- its `xStateListItem` is in `xSuspendedTaskList`;
- its `xEventListItem` is not in `xPendingReadyList`, which would mean an interrupt has already
  resumed it while the scheduler was suspended;
- its `xEventListItem` is in no list at all. A task that waits forever for an object is in that
  object's waiting list;
- it is not waiting for a task notification. A notification has no waiting list, so this is the
  only way to see that wait.

## Resuming: vTaskResume

```kernel freertos:tasks.c#vTaskResume
```

[At tick 3](#sim:event=Resume:1) `Supervisor` calls `vTaskResume( xWorker )`. A task cannot resume
itself, so the function first checks that the handle is not `pxCurrentTCB`. Then, in a critical
section:

1. `prvTaskIsTaskSuspended()` answers yes for `Worker`: it waits for no object and no notification.
2. `uxListRemove()` takes it out of `xSuspendedTaskList`, and `prvAddTaskToReadyList()` puts it at
   the end of the ready list for priority 1.
3. `taskYIELD_ANY_CORE_IF_USING_PREEMPTION()` yields if the resumed task is more urgent than the
   running one:

```kernel freertos:tasks.c#taskYIELD_ANY_CORE_IF_USING_PREEMPTION
```

`Worker` (1) is not more urgent than `Supervisor` (2), so nothing switches yet. `Worker` runs a few
lines later, when `Supervisor` calls `vTaskDelay( 5 )`.

A task that was delayed when it was suspended does not go back to its delay. It goes straight to
its ready list, and its `vTaskDelay()` returns early. The same holds for a task that was waiting
for an object: the wait was cancelled at the suspension, and it runs again inside the call that was
waiting. See **What to try**.

## Ending: vTaskDelete

A FreeRTOS task function must never return. A task that has finished deletes itself with
`vTaskDelete( NULL )`, and that is what the simulator does when a task's program ends.

```kernel freertos:tasks.c#vTaskDelete
```

[At tick 9](#sim:event=TaskEnd:1) `Supervisor` has given `S`, done its last tick of work, and
calls `vTaskDelete( NULL )`:

1. `uxListRemove()` takes it out of its ready list, and its event list item out of any waiting
   list, as for a suspension.
2. The task is the running one. Its stack and
   [task control block](/learn/glossary/task-control-block/) cannot be freed now: the CPU is still
   using that stack, and `vTaskDelete()` itself is running on it. So the task goes into
   `xTasksWaitingTermination`, and `uxDeletedTasksWaitingCleanUp` goes up by one.
3. After the critical section, the task yields. PendSV saves its registers one last time and
   switches to `Worker`, which takes `S`.

Deleting *another* task is simpler. It is not running, so `vTaskDelete()` frees it at once with
`prvDeleteTCB()`.

## The idle task cleans up

The memory is freed by the [idle task](/learn/glossary/idle-task/). Its loop starts with:

```kernel freertos:tasks.c#prvIdleTask
```

```kernel freertos:tasks.c#prvCheckTasksWaitingTermination
```

`uxDeletedTasksWaitingCleanUp` keeps the common case cheap: when it is 0, the idle task does not
even enter a critical section. When it is not, the idle task takes each task off
`xTasksWaitingTermination` and frees its stack and TCB with `prvDeleteTCB()`. It can do this
safely because it runs on its own stack.

In this run, `Supervisor` waits for its memory to be freed for a whole tick. `Worker` runs from tick
9 to 10, ends the same way, and only then
[does the CPU go to the idle task](#sim:event=ContextSwitch:10). Step on from there: the idle task
frees `Supervisor`, then `Worker`, in the order they ended.

That is why the idle task must get some CPU time in a system where tasks delete themselves. If more
urgent tasks always keep the CPU, the deleted tasks' memory is never given back.

## What to try

- Give `Worker` an urgency of 3. It now runs first and waits for `S` forever at tick 5, in
  `xSuspendedTaskList`. `Supervisor` then [suspends it](#sim:event=Suspend:1): `vTaskSuspend()`
  takes it out of the list of tasks waiting for `S` as well. At tick 6 `prvTaskIsTaskSuspended()`
  finds no wait for an object, so `vTaskResume()` resumes it, and because `Worker` is more urgent,
  switches to it at once. `Worker` goes round the loop in `xSemaphoreTake()`, finds `S` still empty
  and waits again.
- Give `Supervisor` an urgency of 1, the same as `Worker`. The two take turns tick by tick, so the
  suspension comes at tick 3 and the resume at tick 4. `vTaskResume()` does not switch here either:
  `Worker` is as urgent as `Supervisor`, not more.
