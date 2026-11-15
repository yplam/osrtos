---
title: How an RTOS scheduler decides what runs
description: Task states, the ready list, the tick and the idle task, shown on two tasks that take turns sleeping.
order: 1
scenario: blocking-idle
rtos: [freertos, zephyr]
keyStep: { event: Block, nth: 2 }
---

A real-time kernel follows one rule: **the most urgent task that is able to run is the one that
runs**. The rest of the scheduler exists to keep track of which tasks are able to run, and to apply the
rule again whenever that changes.

The simulator above runs two tasks. `Sensor` is the more urgent one: it works for one tick, sleeps
for four, and does that again. `Logger` works for two ticks, sleeps for six, then works for two more.
Step through it and watch the task cards and the kernel's lists.

## Task states

At any moment a task is in one of a few states.

- **Running**: the CPU is executing its code. With one core, exactly one task is running.
- **Ready**: it could run, but a more urgent task (or an equally urgent one whose turn it is) has the
  CPU.
- **Delayed**: it asked to sleep until a certain tick.
- **Blocked**: it waits for something another task must do, such as releasing a mutex.

A task leaves the running state in two ways. It can give the CPU up by itself, by sleeping or
waiting. Or the kernel can take the CPU away because a more urgent task became ready; that is
[preemption](/learn/preemption/).

## The ready list

The kernel keeps the ready tasks in a structure it can search quickly.

FreeRTOS has an array of lists, one per priority, called `pxReadyTasksLists`, and a variable
`uxTopReadyPriority` that remembers the highest priority that has a ready task. To choose a task it
walks down from that priority to the first list that is not empty and takes the next task in it:

```kernel freertos:tasks.c#taskSELECT_HIGHEST_PRIORITY_TASK
```

Zephyr, in the configuration simulated here, keeps one run queue sorted by priority. The first
thread in the queue is the best candidate, and the kernel caches the answer in
`_kernel.ready_q.cache` so the context switch code does not have to search:

```kernel zephyr:kernel/sched.c#next_up
```

One detail to keep in mind when you read the numbers on the task cards: in FreeRTOS a **higher**
number is a more urgent priority, in Zephyr a **lower** number is. `Sensor` is priority 2 in
FreeRTOS and priority 13 in Zephyr; in both it is the more urgent task.

## The tick

A hardware timer interrupts the CPU at a fixed rate, 1000 times per second in the simulated
configuration. Each interrupt is a **tick**. The tick handler adds one to the tick count and checks
whether any sleeping task is due to wake. If one is, it goes back to the ready list, and the rule
from the top of this page is applied again.

In the run above on FreeRTOS, `Sensor` calls `vTaskDelay(4)` at tick 1. The kernel removes it from
its ready list and puts it in the delayed list with wake-up tick 5. At tick 5 the tick handler moves
it back, and because it is more urgent than whatever is running, it runs at once.

Switch the simulator to Zephyr and the same program wakes at tick 6, not 5. Zephyr promises that
`k_sleep()` lasts *at least* the time asked for. The call can arrive anywhere inside the current
tick, so the kernel adds one tick to be sure. FreeRTOS counts tick edges instead, so `vTaskDelay(4)`
lasts between three and four tick periods.

## The idle task

At tick 3 both tasks are asleep. The CPU still has to execute something, so every kernel has an
**idle task** (an idle thread in Zephyr) at the lowest priority. It is always ready, so the ready
list is never empty and the scheduler never needs a special case for "nothing to run".

In the timeline, the idle task runs in exactly the ticks where both other lanes are blue. In
FreeRTOS the idle task also has a job: it frees the memory of tasks that have deleted themselves.
On a real product this is also where the CPU is put to sleep to save power.

## What to try

- Give `Logger` an urgency of 3. It now preempts `Sensor` whenever both are ready.
- Change the step level to **Line** and step through one tick interrupt to see every line the
  kernel executes for it.

Next: what happens at the moment a more urgent task wakes up, in [Preemption](/learn/preemption/).
