---
title: TNeo
slug: tneo
version: v1.09
codeUrl: https://github.com/dimonomid/tneo
siteUrl: https://dmitryfrank.com/projects/tneo
date: '2016-12-20'
lastUpdated: '2024-12-28'
star: 245
components: []
libraries: []
licenses:
- Other
platforms:
- ARM
summary: TNeo is a well-formed and carefully tested preemptive real-time kernel for
  16- and 32-bits MCUs. It is compact and fast.
createdAt: '2024-12-28'
updatedAt: '2026-03-03'
---

### Features

- Tasks, or threads: the most common feature for which the kernel is written in the first place;
- Mutexes: objects for shared resources protection.
- Recursive mutexes: optionally, mutexes allow nested locking. Refer to the TN_MUTEX_REC option for details;
- Mutex deadlock detection: if deadlock occurs, the kernel can notify you about this problem by calling arbitrary function. Refer to the TN_MUTEX_DEADLOCK_DETECT option for details.
- Semaphores: objects for tasks synchronization;
- Fixed-size memory blocks: simple and deterministic memory allocator;
- Event groups: objects containing various event bits that tasks may set, clear and wait for;
- Event group connection: extremely useful feature when you need to wait, say, for messages from multiple queues, or for other set of different events.
- Data queues: FIFO buffer of messages that tasks may send and receive;
- Timers: a tool to ask the kernel to call arbitrary function at a particular time in the future. The callback approach provides ultimate flexibility.
- Separate interrupt stack: interrupts use separate stack, this approach saves a lot of RAM. Refer to the page Interrupts for details.
- Software stack overflow check: extremely useful feature for architectures without hardware stack pointer limit. Refer to the TN_STACK_OVERFLOW_CHECK option for details.
- Dynamic tick: if there's nothing to do, don't even bother to manage system timer tick each fixed period of time. Refer to the page Time ticks for details.
- Profiler: allows you to know how much time each of your tasks was actually running, get maximum consecutive running time of it, and other relevant information. Refer to the option TN_PROFILER and struct TN_TaskTiming for details.

<!--github-projects-->