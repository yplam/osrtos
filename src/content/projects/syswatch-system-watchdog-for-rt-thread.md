---
title: 'syswatch: System Watchdog for RT-Thread'
summary: A system watchdog component for RT-Thread designed to ensure long-term system
  stability by monitoring thread scheduling. It detects crashes, hardware exceptions,
  and thread blocking, offering recovery modes such as system reset, thread termination,
  or thread restart.
slug: syswatch-system-watchdog-for-rt-thread
codeUrl: https://github.com/qiyongzhong0/rt-thread-syswatch
star: 27
version: 1.0.1
lastUpdated: '2025-02-13'
rtos: rt-thread
topics:
- rt-thread
- system
- syswatch
- watchdog
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- sgm706-independent-watchdog-driver-for-rt-thread
- thread-safe-rt-kprintf-for-rt-thread
- rust-support-for-rt-thread
- rx8900-high-precision-rtc-driver-for-rt-thread
- rttrust-rust-wrapper-for-rt-thread
- zview-zephyr-rtos-runtime-visualizer
---

## Overview

In embedded systems, ensuring long-term reliability is a critical challenge. The **syswatch** component is a specialized system guardian for RT-Thread designed to prevent system freezes and thread-level deadlocks. By monitoring the scheduling behavior of the operating system, it can detect when the system has crashed or when specific threads have become abnormally blocked, taking corrective action to restore normal operation.

## Working Principle

The syswatch component operates by creating a high-priority watchdog thread—typically using the highest available priority in the system—to ensure it remains unblocked by application-level tasks. This thread is itself protected by a hardware watchdog device. 

To monitor the rest of the system, syswatch utilizes RT-Thread's thread scheduling hook interface. By tracking scheduling events, it can identify if a thread has stopped responding or is consuming excessive time without yielding. If an anomaly is detected, the component enters a confirmation phase to identify the specific culprit before executing a pre-configured recovery strategy.

## Recovery Strategies

One of the most powerful features of syswatch is its flexible approach to error resolution. Rather than simply resetting the entire MCU for every fault, users can configure different behaviors based on the severity and type of the failure:

- **System Reset (Mode 0):** Performs a full hardware reset. This is the fallback for system-wide crashes or hardware exceptions where the scheduler itself has failed.
- **Kill Blocked Thread (Mode 1):** If a specific thread is identified as the source of the blockage, syswatch can terminate that thread to allow the rest of the system to continue functioning.
- **Restart Blocked Thread (Mode 2):** The most sophisticated mode, where syswatch attempts to restart the specific thread that failed, potentially clearing a transient software lockup without affecting other system services.

## Configuration and Integration

Integration into an RT-Thread project is seamless, especially for users of the Env tool or RT-Thread Studio. The component is available as an online package under the system packages category. Key configuration parameters include:

- `SYSWATCH_EXCEPT_TIMEOUT`: The threshold (in seconds) for determining if a thread is abnormal.
- `SYSWATCH_EXCEPT_CONFIRM_TMO`: The time spent confirming which thread is blocked before taking action.
- `SYSWATCH_WDT_NAME`: The name of the hardware watchdog device to be managed by syswatch.
- `SYSWATCH_THREAD_PRIO`: The priority of the guardian thread, defaulting to 0.

## Testing and Validation

The package includes a built-in test module that can be triggered via the FinSH shell. By using the `syswatch_test` command, developers can simulate thread exceptions by creating a dummy thread with a specific priority and delay. This allows for real-time verification of the watchdog's ability to detect the blockage and execute the configured recovery mode, ensuring the system's fail-safe mechanisms are fully operational before deployment.
