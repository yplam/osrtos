---
title: F9 Microkernel
slug: f9-microkernel
version: ''
codeUrl: https://github.com/f9micro/f9-kernel
siteUrl: https://github.com/f9micro/f9-kernel
date: '2016-11-30'
lastUpdated: '2026-02-01'
star: 744
components: []
libraries: []
licenses:
- BSD
platforms:
- ARM
summary: F9 microkernel is a microkernel-based (L4-style) kernel to support running
  real-time and time-sharing applications (for example, wireless communications) for
  ARM Cortex-M series microprocessors with efficiency (performance + power consumption)
  and security (memory protection + isolated execution) in mind.
createdAt: '2020-01-01'
updatedAt: '2026-03-08'
---

### Features

- F9 follows the fundamental principles of microkernels in that it implements address spaces, thread management, and IPC only in the privileged kernel.
- Designed and customized for ARM Cortex-M, supporting NVIC (Nested Vectored Interrupt Controller), Bit Banding, MPU (Memory Protection Unit).
- Energy efficient scheduling and tickless timer which allow the ARM Cortex-M to wake up only when needed, either at a scheduled time or on an interrupt event. Therefore, it results in better current consumption than the common approach using the system timer, SysTick, which requires a constantly running and high frequency clock.
- KProbes, dynamic instrumentation system inspired by Linux Kernel, allowing developers to gather additional information about kernel operation without recompiling or rebooting the kernel. It enables locations in the kernel to be instrumented with code, and the instrumentation code runs when the ARM core encounters that probe point. Once the instrumentation code completes execution, the kernel continues normal execution.
- Each thread has its own TCB (Thread Control Block) and addressed by its global id. Also dispatcher is responsible for switching contexts. Threads with the same priority are executed in a round-robin fashion.
- Memory management is split into three concepts: Memory pool, which represent area of physical address space with specific attributes. Flexible page, which describes an always size aligned region of an address space. Unlike other L4 implementations, flexible pages in F9 represent MPU region instead. Address space, which is made up of these flexible pages.
- System calls are provided to manage address spaces: Grant: The memory page is granted to a new user and cannot be used anymore by its former user. Map: This implements shared memory – the memory page is passed to another task but can be used by both tasks. Flush: The memory page that has been mapped to other users will be flushed out of their address space.
- Regarding the interaction between a user thread and the microkernel, the concept of UTCB (user-level thread-control blocks) is being taken on. A UTCB is a small thread-specific region in the thread's virtual address space, which is always mapped. Therefore, the access to the UTCB can never raise a page fault, which makes it perfect for the kernel to access system-call arguments, in particular IPC payload copied from/to user threads.
- The kernel provides synchronous IPC (inter-process communication), for which short IPC carries payload in CPU registers only and full IPC copies message payload via the UTCBs of the communicating parties.
- Debugging and profiling mechanisms: configurable debug console. memory dump. thread profiling: name, uptime, stack allocated/current/used. memory profiling: kernel table, pool free/allocated size, fragmentation.