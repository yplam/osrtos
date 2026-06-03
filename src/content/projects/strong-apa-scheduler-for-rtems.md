---
title: Strong APA Scheduler for RTEMS
summary: An implementation of the Strong Arbitrary Processor Affinity (Strong APA)
  scheduler designed for the RTEMS real-time operating system. It improves system
  schedulability by allowing higher-priority tasks to be shifted between processors
  to accommodate lower-priority tasks with restricted affinity masks.
slug: strong-apa-scheduler-for-rtems
codeUrl: https://github.com/richidubey/Strong-APA-Documentation
siteUrl: https://richidubey.github.io/Strong-APA-Documentation/html/
star: 3
lastUpdated: '2021-05-28'
rtos: rtems
topics:
- apa-documentation
- apa-scheduler
- rtems
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- freertos-wrapper-for-rt-thread
- str-xenomai-real-time-systems-practices
- rl-tsch-implementation-for-contiki-ng
- development-of-real-time-systems-assignments
- freertos-cell-for-the-jailhouse-hypervisor
- freertos-port-for-renesas-rh850
---

## Overview

The Strong APA Scheduler project introduces an advanced scheduling algorithm to the RTEMS (Real-Time Executive for Multiprocessor Systems) ecosystem. In standard RTOS scheduling, a lower-priority task often remains blocked if the specific processors defined in its affinity mask are occupied by higher-priority tasks. This can lead to scenarios where processors sit idle while ready tasks wait, simply because the system cannot "move" a higher-priority task to a different compatible processor. 

The Strong Arbitrary Processor Affinity (Strong APA) scheduler solves this by allowing tasks to be "dislodged" or moved among processors. By recursively searching for valid processor-to-task mappings, the scheduler ensures that the highest possible number of high-priority tasks are executing, effectively lowering response-time bounds and improving overall system utilization.

## Core Concepts

The scheduler is based on the research of Cerqueira, Gujarati, and Brandenburg, which treats the scheduling problem as a Maximum Vertex Matching (MVM) problem in a bipartite graph. In this model, tasks and processors are represented as vertices, and affinity constraints are represented as edges. The goal is to find a matching that prioritizes the highest-weight vertices (highest-priority tasks).

### Task States and Transitions

Tasks within the Strong APA framework move between three primary states:
- **BLOCKED**: The task is waiting for a resource or event.
- **READY**: The task is capable of running but is not currently assigned to a CPU.
- **SCHEDULED**: The task is currently executing on a processor.

### The "Dislodging" Mechanism

When a new task arrives, the Strong APA scheduler doesn't just check if a CPU in its affinity mask is free. Instead, it performs a recursive search. If a CPU is occupied by a task that could also run on a different CPU, the scheduler evaluates if moving that task would allow the new, lower-priority task to run. This chain of shifts can significantly improve the total priority sum of scheduled tasks compared to traditional schedulers used in kernels like Linux.

## Technical Implementation

The project includes the core logic in `schedulerstrongapa.c` and its corresponding header. These files implement the logic for task arrival and departure events. 

Consider a system with three CPUs and four tasks:
- **Task A** (Priority 1): Affinity to CPU 0 and 1.
- **Task B** (Priority 2): Affinity to CPU 0.
- **Task C** (Priority 3): Affinity to CPU 1.
- **Task D** (Priority 4): Affinity to CPU 2.

In a standard scheduler, if Task A is on CPU 0 and Task C is on CPU 1, Task B (Priority 2) would be blocked because its only compatible CPU (0) is busy. However, the Strong APA scheduler recognizes that Task A can move to CPU 1 (displacing the lower-priority Task C), which frees up CPU 0 for Task B. This results in a more efficient schedule where tasks with priorities 1, 2, and 4 are running, rather than 1, 3, and 4.

## Integration with RTEMS

This implementation is specifically tailored for integration into the RTEMS kernel. It utilizes RTEMS-specific data structures and scheduling primitives to manage task affinity masks and processor assignments. By providing a more flexible affinity API, it allows RTEMS to better handle complex real-time workloads on multi-core hardware where tasks have strict execution constraints.
