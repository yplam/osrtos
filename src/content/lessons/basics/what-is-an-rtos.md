---
title: What is an RTOS?
description: What "real-time" really means, what a real-time kernel gives a program, and how an RTOS differs from Linux and from bare-metal code.
order: 1
---

A **real-time operating system** (RTOS) is a small operating system for programs whose
correctness depends on *when* they do things, not only on *what* they compute. Most RTOSes run on
microcontrollers: chips with a few kilobytes to a few megabytes of memory, no disk, and often no
memory management unit. The part of an RTOS that these lessons are about is its **kernel**, the
code that decides which piece of the program runs at each moment.

## What "real-time" means

"Real-time" does not mean fast. It means **on time**. A real-time system has deadlines: a motor
controller must update its output every 100 microseconds, an airbag controller must fire within a
few milliseconds of detecting a crash, an audio codec must be handed the next buffer before the
current one has played.

An answer that comes after its deadline is a wrong answer, however correct the numbers in it are.
Systems are often sorted by what a missed deadline costs:

- **Hard real-time**: a missed deadline is a failure of the system. The airbag that fires late, the
  brake controller that misses a cycle.
- **Soft real-time**: a missed deadline makes the result worse but still useful. A dropped video
  frame, a click in the audio.

What a real-time kernel offers is **determinism**: the time it takes to react to an event has an
upper bound that you can work out in advance, and that bound does not grow because some unrelated,
less important work happens to be busy. A general-purpose system may react faster *on average* and
still be useless for a hard deadline, because nothing limits how long it can take in the worst
case.

## What the kernel gives you

Without a kernel, a microcontroller program is one function, `main()`, that loops forever, plus
interrupt handlers. That works well for small programs, and the next lesson,
[Main loop vs RTOS](/learn/basics/superloop-vs-rtos/), shows where it stops working. A kernel
lets you split the program into **tasks** (called *threads* in Zephyr) and provides:

- **Tasks.** Each task is an ordinary C function with its own stack, written as if it had the CPU
  to itself. [Tasks and stacks](/learn/basics/tasks-and-stacks/) explains how that is possible on
  one CPU.
- **A scheduler.** Each task has a priority, and the scheduler makes sure the most urgent task that
  is able to run is the one running. When a more urgent task becomes ready, the kernel takes the
  CPU away from the one running. That is [preemption](/learn/preemption/), and it is what bounds
  the response time.
- **Time.** A periodic timer interrupt, the [tick](/learn/glossary/tick/), lets tasks sleep for a
  number of ticks or wait for something with a timeout, instead of spinning in a busy loop.
- **Synchronisation.** [Mutexes](/learn/priority-inheritance/) protect data that several tasks
  share. [Semaphores](/learn/semaphores/) let one task, or an interrupt, signal another.
- **Communication.** Queues pass data between tasks, and between interrupts and tasks.

A task that waits for something does not use the CPU at all. The kernel sets it aside and makes it
ready again when its event arrives. Waiting is free, which is why an RTOS program can have many
tasks that each spend most of their time doing nothing. [Task states](/learn/basics/task-states/)
follows one task through all the ways it can wait.

## RTOS, Linux and bare metal

| | Bare metal | RTOS | General-purpose OS (Linux) |
|---|---|---|---|
| Structure | One main loop and interrupt handlers | Tasks with priorities | Processes and threads |
| Memory | Bytes to kilobytes | Kilobytes and up | Megabytes and up, with an MMU |
| Scheduling goal | Whatever the loop does | The most urgent ready task runs | Fairness and throughput |
| Worst-case response | One pass of the loop | Bounded, set by priorities | Usually low, not guaranteed |

The difference with Linux is less about size than about goals. A desktop or server scheduler shares
the CPU fairly between many programs and tries to finish as much work as possible. An RTOS
scheduler is deliberately unfair: a high-priority task gets the CPU every time it wants it, and a
low-priority one gets only what is left. Linux can be made far more predictable (the `PREEMPT_RT`
work, merged into the mainline kernel in 2024), and it is a good choice when the system needs its
drivers, file systems and networking. But it needs far more memory than a microcontroller has, and
its timing is harder to reason about than a kernel of a few thousand lines.

An RTOS kernel is small enough to read. FreeRTOS's scheduler is a handful of C files. Zephyr is a
larger project with drivers, networking and its own build system, but its kernel proper is still
something you can follow function by function. That is what these lessons do: the simulator runs
models of the real FreeRTOS and Zephyr kernels, checked against them, next to their source code.

## Where RTOSes are used

Anywhere a small processor has to keep promises about time: engine and brake controllers, medical
pumps, drones and their flight controllers, industrial motor drives, wireless sensors and the
Bluetooth or Wi-Fi stacks inside them, smart meters, printers, hard-disk and SSD controllers. Many
devices have several processors, and the small ones that handle the radio, the motors or the power
often run an RTOS while a larger one runs Linux.

## How these lessons work

Each lesson that has a simulator runs a small scenario on a model of a real kernel, FreeRTOS
V11.3.3 or Zephyr v4.5.0. You can play it, step through it a line or an event at a time, see the
kernel's own data structures change, and read the exact line of kernel source that runs at each
step. Links in the text such as "tick 3" move the simulator to that moment.

Next: why a main loop runs out of steam, in [Main loop vs RTOS](/learn/basics/superloop-vs-rtos/).
After the Basics, [How an RTOS scheduler decides what runs](/learn/scheduling/) starts the
Concepts.
