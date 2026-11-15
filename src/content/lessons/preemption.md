---
title: Preemption
description: How a kernel takes the CPU from a running task the moment a more urgent one becomes ready.
order: 2
scenario: preemption
rtos: [freertos, zephyr]
keyStep: { event: Unblock, nth: 1 }
---

**Preemption** means the kernel stops the running task, without its cooperation, because a more
urgent task has become ready. It is what makes a kernel "real-time": the response time of an urgent
task does not depend on how long the less urgent ones take.

In the simulator above, `Low` has eight ticks of work and starts at once. `High` is more urgent and
sleeps for the first three ticks.

## What happens

On FreeRTOS:

1. `Low` runs during ticks 0, 1 and 2.
2. The tick interrupt at tick 3 finds that `High` is due. It moves `High` from the delayed list to
   its ready list.
3. `High` has a higher priority than the running task, so the tick handler asks for a context
   switch.
4. `High` runs during ticks 3 and 4, then ends.
5. `Low` carries on from where it was stopped and runs its remaining five ticks.

`Low` never called the kernel. It was interrupted between two of its own instructions, and when it
runs again it cannot tell that anything happened, apart from the time that has passed.

## Where the decision is made

The decision is made inside the tick interrupt, not in a task.

In FreeRTOS, `xTaskIncrementTick()` wakes the task and compares priorities. If the woken task is
more urgent than `pxCurrentTCB`, the function returns true, and the port's tick handler sets the
PendSV interrupt pending. PendSV runs when the tick interrupt is finished: it saves the registers of
`Low`, calls `vTaskSwitchContext()` to pick the new `pxCurrentTCB`, and restores the registers of
`High`.

```kernel freertos:portable/GCC/ARM_CM3/port.c#xPortSysTickHandler
```

In Zephyr, waking the thread puts it in the run queue and calls `update_cache()`, which asks
`should_preempt()` whether the new best thread may replace the current one. The switch itself
happens when the interrupt returns.

```kernel zephyr:kernel/include/kthread.h#should_preempt
```

The first test in that function is worth a look. A Zephyr thread with a negative priority is
**cooperative**: `should_preempt()` says no for it, and it keeps the CPU until it sleeps or yields,
whatever else becomes ready. The playground has a
[cooperative threads scenario](/learn/playground/?scenario=cooperative-threads) that shows it.

## One tick later on Zephyr

Switch the simulator to Zephyr. `High` now wakes at tick 4 instead of tick 3, for the reason given
in [the scheduling lesson](/learn/scheduling/#the-tick): a Zephyr sleep lasts at least the ticks
asked for, so one tick is added. The preemption itself is the same.

## Turning preemption off

FreeRTOS can be built with `configUSE_PREEMPTION` set to 0. Select FreeRTOS and untick
**Preemption** in the simulator. The tick interrupt still wakes `High` at tick 3, but no switch is
requested. `High` sits in its ready list until `Low` gives up the CPU, which here is when `Low`
ends. A cooperative system is simpler to reason about, because a task can only lose the CPU at the
points where it calls the kernel, but its worst response time is the longest stretch any task runs
without such a call.

Zephyr has no global switch like this. It decides per thread, by the sign of the priority, so the
parameter is not offered when Zephyr is selected.

## What to try

- Raise the urgency of `Low` to 2, the same as `High`. Nothing is preempted at tick 3: an equal
  priority is not a higher one. What happens next is [time slicing](/learn/time-slicing/).
- Change the start tick of `High` and see that the preemption always lands on a tick edge.
