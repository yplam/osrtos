---
title: Time slicing
description: How tasks of equal priority share the CPU, and why the first slice in Zephyr is one tick longer.
order: 3
scenario: time-slicing
rtos: [freertos, zephyr]
---

Priorities decide between tasks of different urgency. **Time slicing** (also called round-robin
scheduling) decides between tasks of the *same* priority: each one runs for a slice of time, then
goes to the back of the queue.

The simulator above runs three tasks, `A`, `B` and `C`, with the same priority. Each has four
ticks of work.

## On FreeRTOS

With `configUSE_TIME_SLICING` set to 1, a slice is always one tick. At every tick,
`xTaskIncrementTick()` looks at the ready list of the running task's priority. If it holds more
than one task, a context switch is requested, and `vTaskSwitchContext()` takes the next task in the
list. The list's `pxIndex` pointer, shown in the simulator, walks round the list one task per
switch.

The order you see is `C`, `A`, `B`, `C`, `A`, `B`… `C` goes first because of how the scheduler is
started: each newly created task of equal or higher priority becomes the task to run first, so the
last one created wins.

## On Zephyr

Zephyr's slice length is configurable (`CONFIG_TIMESLICE_SIZE`, in milliseconds). The simulator
sets it to one tick so the two kernels can be compared; with Zephyr selected you can change **Slice
length**.

Zephyr does not check the run queue on every tick. It arms a timer when a thread starts running, and
you can see that timer as the `slice_timeout` entry in the timeout list. When it fires,
`z_time_slice()` moves the running thread behind the other threads of its priority:

```kernel zephyr:kernel/timeslicing.c#z_time_slice
```

```kernel zephyr:kernel/sched.c#move_current_to_end_of_prio_q
```

The threads start in the order of their names, so `A` runs first. Look at the timeline: `A` runs
for **two** ticks, and every slice after that is one tick. The first slice was started from thread
context, somewhere inside tick 0, and a Zephyr timeout started that way gets an extra tick so that
it is never short. Later slices are started from inside the tick interrupt, exactly on a tick edge,
and need no extra tick. This was confirmed on the real kernel.

## Without time slicing

Untick **Time slicing**. Now a task that has the CPU keeps it until it blocks, yields or ends, even
though other tasks of the same priority are ready. Each task runs its four ticks in one piece.

Higher priorities still preempt. Time slicing only concerns equals.

## What it costs

Every slice boundary is a context switch, which takes time and disturbs the CPU caches. With slicing
on, three tasks that each need four ticks all finish late: on FreeRTOS, at ticks 10, 11 and 12.
Without it they finish at 4, 8 and 12. The total is the same, but the average is worse with
slicing. What slicing buys is that no task waits long for its *first* turn, which matters when the
tasks serve different users or devices.

## What to try

- Raise the urgency of `B`. It runs alone until it ends, and the other two share what is left.
- On Zephyr, set the slice length to 3 and count the ticks of the first slice.
