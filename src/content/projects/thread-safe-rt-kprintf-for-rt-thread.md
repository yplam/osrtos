---
title: Thread-safe rt_kprintf for RT-Thread
summary: A thread-safe implementation of the rt_kprintf function for the RT-Thread
  RTOS. It automatically selects the best protection mechanism—mutexes, semaphores,
  or scheduler locking—based on the current execution context and system configuration.
slug: thread-safe-rt-kprintf-for-rt-thread
codeUrl: https://github.com/mysterywolf/rt_kprintf_threadsafe
star: 10
lastUpdated: '2023-08-24'
rtos: rt-thread
topics:
- printf
- rt-kprintf
- rt-thread
- threadsafe
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rt-thread-full-featured-vsnprintf-package
- ppool-for-rt-thread
- freertos-wrapper-for-rt-thread
- ff-iso-stm32-multitasking-fatfs-sdio
- rt-thread-smart-porting-for-risc-v-qemu-and-k210
- rust-support-for-rt-thread
---

## Overview

In the standard RT-Thread environment, the `rt_kprintf()` function found in `kservice.c` is intentionally designed to be simple and low-dependency. This design ensures it works in almost any environment, but it comes with a significant trade-off: it is not thread-safe. Following the ISO C standard for `printf`, the default implementation does not include internal locking. When multiple threads attempt to print data simultaneously, it often results in garbled output, interleaved messages, or data being dropped entirely.

The `rt_kprintf_threadsafe` package solves this issue by providing a robust, thread-safe version of the function that maintains the original's versatility while adding necessary protection for multi-threaded environments.

## Intelligent Context Detection

One of the key features of this implementation is its ability to automatically detect the execution context. It doesn't just apply a global lock; instead, it evaluates the system state to choose the most appropriate behavior:

1.  **Pre-Scheduler Phase**: If the RT-Thread scheduler has not yet started, the function operates without protection to ensure boot-up messages are still delivered.
2.  **Interrupt Context**: If called from within an Interrupt Service Routine (ISR), it bypasses locking mechanisms to avoid deadlocks or illegal blocking operations.
3.  **Thread Context**: When called from a standard thread, it applies a hierarchical protection strategy based on the kernel configuration:
    *   If **Mutexes** are enabled in the kernel, it uses a mutex for the highest level of safety.
    *   If mutexes are unavailable but **Semaphores** are enabled, it falls back to using a semaphore.
    *   If neither synchronization primitive is enabled, it protects the output by temporarily **disabling the scheduler**.

This tiered approach ensures that the function remains as lightweight as possible while guaranteeing data integrity across different kernel configurations.

## Compatibility and Integration

This package is designed to be a transparent replacement for the standard logging function. For users running **RT-Thread 4.0.4 or higher**, the integration is seamless. Because the original `rt_kprintf` is defined as a weak function in newer versions of the kernel, this package will automatically override it upon installation without requiring any changes to the kernel source code.

For users on older versions (below 4.0.4), a small manual step is required to comment out the original function in `kservice.c` to avoid symbol conflicts.

## Getting Started

The package is available through the RT-Thread online package manager. It can be enabled via `menuconfig` under the following path:

```text
RT-Thread online packages
    system packages --->
        enhanced kernel services --->
            [*] rt_kprintf_threadsafe: thread-safe version of rt_kprintf
```

Once enabled, developers can continue using `rt_kprintf()` exactly as they did before. The underlying safety mechanisms operate in the background, providing a "user-agnostic" upgrade that prevents common debugging headaches associated with concurrent console access.
