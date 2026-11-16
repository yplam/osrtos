---
title: xTaskDelayUntil in FreeRTOS
description: How xTaskDelayUntil keeps a periodic task on a fixed grid of wake-up times, and what it does when the task overruns its period.
order: 7
scenario: periodic-tasks
rtos: freertos
keyStep: { event: Block, nth: 2 }
---

The [periodic tasks lesson](/learn/periodic-tasks/) shows why a periodic task should sleep until
the next period instead of for a fixed time. This walkthrough reads the FreeRTOS function that does
it. In the simulator, `Sensor` is the periodic task:

```c
TickType_t xLastWakeTime = xTaskGetTickCount();
for( ;; )
{
    vCompute( 2 );
    xTaskDelayUntil( &xLastWakeTime, 5 );
}
```

`xLastWakeTime` belongs to the application, not to the kernel: the task keeps it on its own stack
and passes its address. The task card shows it, next to the kernel's own fields.

## The starting point

```kernel freertos:tasks.c#xTaskGetTickCount
```

The first period is counted from the moment the task reads the tick count, at tick 0 here. The
critical section is only needed where the tick count is wider than the CPU can read in one go; on
the 32-bit Cortex-M3 it compiles to nothing.

## xTaskDelayUntil

```kernel freertos:tasks.c#xTaskDelayUntil
```

[At tick 2](#sim:event=Block:2), `Sensor` has done its first job and calls `xTaskDelayUntil()`:

1. `vTaskSuspendAll()` keeps the scheduler from switching while the lists change, as in
   [vTaskDelay](/learn/freertos/tick-and-delay/).
2. `xTimeToWake = *pxPreviousWakeTime + xTimeIncrement = 0 + 5 = 5`. This is the whole difference
   from `vTaskDelay()`, which computes `xTickCount + 5`. The wake-up time does not depend on when the
   task got here.
3. The function decides whether to sleep at all. Normally the tick count (2) has not wrapped since
   the last call, and the wake-up time (5) is still ahead, so `xShouldDelay` becomes `pdTRUE`. The
   other branch handles a tick count that wrapped past its largest value since the last call; the
   comparisons are written so that the arithmetic still works across the wrap.
4. `*pxPreviousWakeTime = xTimeToWake`: the next period will be counted from 5, whether or not the
   task sleeps now.
5. `prvAddCurrentTaskToDelayedList( xTimeToWake - xConstTickCount, pdFALSE )`. The delayed list
   wants a duration, so the function turns its absolute time back into one: 5 − 2 = 3 ticks. From
   here on it is exactly the code of `vTaskDelay()`.
6. `xTaskResumeAll()`, then a yield, because `Sensor` is no longer ready.

At tick 5 the tick interrupt wakes `Sensor`, and the second job starts exactly one period after the
first.

## When the task is late

At tick 11 `Burst` preempts `Sensor` in the middle of its third job, released at 10. `Sensor` only
finishes it at tick 16 and then calls `xTaskDelayUntil()` with `xLastWakeTime` = 10:

- `xTimeToWake` = 15, but the tick count is already 16. The wake-up time is not ahead, so
  `xShouldDelay` stays `pdFALSE` and the task is **not** put in the delayed list.
- `xLastWakeTime` still becomes 15.
- The function still yields. With nothing else of priority 2 ready, `Sensor` keeps the CPU and starts
  its fourth job at once.
- It returns `pdFALSE`, so a task that cares can see that it overran.

Because `xLastWakeTime` moved on by exactly one period, the fourth job sleeps until 20, and the
grid is back. A task that overruns for several periods in a row runs its late jobs back to back
until it has caught up. If that is not wanted, the task can check the return value and reset
`xLastWakeTime` to the current tick count.

The deadline miss [at tick 14](#sim:event=DeadlineMiss:1) is marked by the simulator, not by
FreeRTOS: the kernel has no notion of a deadline. All it sees is a call that came late, and that
only when the task finally makes it.
