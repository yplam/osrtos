---
title: How FreeRTOS chooses the next task
description: vTaskSwitchContext, the search through the ready lists and the walking index that makes tasks of one priority take turns, in the FreeRTOS source.
order: 3
scenario: time-slicing
rtos: freertos
keyStep: { event: ContextSwitch, nth: 2 }
---

Every [context switch](/learn/freertos/context-switch/) asks one question: which task runs next? The
[scheduling lesson](/learn/scheduling/) gives the rule, the most urgent ready task, and shows the
macro that applies it. This page reads that code closely, together with the code that keeps the
[ready lists](/learn/glossary/ready-list/) in a state where the answer is quick, and shows why tasks
of the same [priority](/learn/glossary/priority/) take turns.

The scenario: three tasks `A`, `B` and `C`, all priority 1, each with four ticks of work. With
[time slicing](/learn/time-slicing/) on, the tick takes the CPU from one to give it to the next.
Set the step level to **Line**, open the **Kernel** tab, and watch the `pxIndex` marker in the
priority 1 ready list.

## What the kernel keeps

- `pxReadyTasksLists[]`: one list per priority, `configMAX_PRIORITIES` of them (here five, 0 to 4).
  Each ready task's `xStateListItem` is in the list for its priority.
- `uxTopReadyPriority`: the highest priority that *may* have a ready task.
- `pxCurrentTCB`: the task that runs, or is about to run.

Each list also has its own `pxIndex`, a pointer to one of its items, which plays the main part
below.

## Adding a task to a ready list

```kernel freertos:tasks.c#prvAddTaskToReadyList
```

Two lines matter. `taskRECORD_READY_PRIORITY()` raises `uxTopReadyPriority` if the task's priority
is above it. It never lowers it. `listINSERT_END()` adds the task to the list for its priority.

"End" needs a closer look. A FreeRTOS list is circular, with an end marker, and `listINSERT_END()`
inserts the new item just *before* `pxIndex`. When `pxIndex` is at the end marker, that is the end
of the list. When `pxIndex` has moved into the list, it is the place the walk will reach last. Either
way, a task that becomes ready joins the back of the queue for its priority, behind the tasks that
were already waiting for a turn.

## The switch: vTaskSwitchContext

```kernel freertos:tasks.c#vTaskSwitchContext
```

The PendSV handler calls this function between saving the old task's registers and restoring the
new task's. Most of it is optional (run-time statistics, stack overflow checks, `errno`), compiled out
in the simulated configuration. Two parts remain:

- If the scheduler is suspended, it does not switch. It sets `xYieldPendings[ 0 ]` and returns;
  `xTaskResumeAll()` or the next tick will act on it.
- Otherwise it clears that flag and calls `taskSELECT_HIGHEST_PRIORITY_TASK()`.

## The search

```kernel freertos:tasks.c#taskSELECT_HIGHEST_PRIORITY_TASK
```

This is the generic version, used when `configUSE_PORT_OPTIMISED_TASK_SELECTION` is 0, as here.

1. It starts at `uxTopReadyPriority` and walks down while the list at that priority is empty. The
   `configASSERT( uxTopPriority )` says it can never walk past 0: the
   [idle task](/learn/glossary/idle-task/) is always ready at priority 0.
2. `listGET_OWNER_OF_NEXT_ENTRY()` advances that list's `pxIndex` by one item, skipping the end
   marker, and makes the owner of the item it lands on the new `pxCurrentTCB`.
3. It stores the priority it found back in `uxTopReadyPriority`.

Step 3 is where `uxTopReadyPriority` comes down. When a task leaves its ready list, the generic code
does not lower it (`taskRESET_READY_PRIORITY()` is an empty macro in this configuration). The
variable stays too high until the next search walks down and corrects it. That trades a few wasted
loop iterations in the search for nothing to do on the much more frequent "task blocks" path.

The search costs at most one step per priority level, however many tasks there are, so FreeRTOS
recommends keeping `configMAX_PRIORITIES` small. The port-optimised version replaces the loop with a
bitmap of non-empty lists and the Cortex-M "count leading zeros" instruction; the result is the same.

## Taking turns

The scenario starts with all three tasks in the priority 1 list, in the order they were created:
`A`, `B`, `C`. [The first task to run is `C`](#sim:event=ContextSwitch:1), the last one created.
`xTaskCreate()` makes each new task `pxCurrentTCB` if its priority is at least that of the one chosen
so far, so among equals the last one wins. The scheduler starts whatever `pxCurrentTCB` is, without
a search, so `pxIndex` is still at the end marker.

[At tick 1](#sim:event=ContextSwitch:2), `xTaskIncrementTick()` sees that the list of the running
task's priority holds more than one task and requests a switch. The search starts at priority 1,
finds the list not empty, and advances `pxIndex` from the end marker to the first item: `A`. Not the
task after `C`, because the index had never been moved to `C`; the scheduler start skipped the
search.

[At tick 2](#sim:event=ContextSwitch:3), the index moves on to `B`, at tick 3 to `C`, at tick 4 back
round to `A`, skipping the end marker. That is all round robin takes: the list does not change
order, only the index walks. The tasks never move between lists, so time slicing costs no list
operations at all.

The walk is per list. A task of priority 2 that becomes ready interrupts the rotation, and when the
priority 1 tasks run again the index carries on from where it was.

## The end of the run

[At tick 12](#sim:event=TaskEnd:3) the three tasks have done their work and end one after another.
After the last one, `B`, deletes itself, the search starts at priority 1, finds that list empty,
walks down to 0 and picks `IDLE`. That is the only time in this run that the loop body executes, and
the only time the search stores a lower `uxTopReadyPriority`.

## What to try

- Give `B` an urgency of 2. `B` runs ticks 0 to 3 alone: the search never reaches priority 1 while
  `B` is ready. When `B` ends, `A` and `C` take turns.
- Turn **Time slicing** off. The time-slice check in the tick is compiled out, so `C` keeps the CPU
  until it ends at tick 4. The index then moves to `A`, which keeps it until tick 8.

Zephyr keeps a single sorted queue instead of an array of lists; compare
[how Zephyr chooses the next thread](/learn/zephyr/choosing-the-next-task/).
