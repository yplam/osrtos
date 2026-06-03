---
title: μC/OS-II Compatibility Layer for RT-Thread
summary: A compatibility layer that allows applications developed for the μC/OS-II
  RTOS to migrate seamlessly to the RT-Thread operating system. It supports μC/OS-II
  versions 2.00 through 2.93 and provides a 100% C-based implementation of the μC/OS-II
  API.
slug: c-os-ii-compatibility-layer-for-rt-thread
codeUrl: https://github.com/mysterywolf/RT-Thread-wrapper-of-uCOS-II
siteUrl: https://www.rt-thread.org/
star: 36
version: v1.1.1
lastUpdated: '2022-12-26'
rtos: rt-thread
topics:
- compatibility-layer
- keil
- mdk
- nano
- rt-thread
- rtt
- rtthread
- uc-os2
- ucos
- ucos-ii
- wrap
- wrapper
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- c-os-iii-compatibility-layer-for-rt-thread
- cmsis-rtos1-compatibility-layer-for-rt-thread
- cmsis-rtos2-compatibility-layer-for-rt-thread
- freertos-wrapper-for-rt-thread
- c-common-for-rt-thread
- rtduino
---

## Overview

The μC/OS-II Compatibility Layer (ACL) for RT-Thread is a middleware solution designed to bridge the gap between legacy Micriμm μC/OS-II applications and the modern RT-Thread ecosystem. This project allows developers to migrate existing task modules and application code to RT-Thread without significant refactoring, respecting the original design and behavior of the μC/OS-II kernel.

Written entirely in C, the wrapper supports all versions of μC/OS-II from 2.00 to 2.93. It is particularly useful for engineers who are transitioning from μC/OS-II to RT-Thread but wish to leverage their existing experience and codebase to reduce time-to-market and learning costs.

## Key Features and Capabilities

This compatibility layer provides a high degree of fidelity to the original μC/OS-II environment while running on top of the RT-Thread kernel. Key features include:

- **Broad Version Support**: Compatible with μC/OS-II versions 2.00 through 2.93.
- **Seamless Migration**: Applications can often be moved to RT-Thread with zero or minimal changes to the application logic.
- **Resource Management**: Uses RT-Thread's native heap memory management, eliminating the need to manually configure memory pools for tasks and kernel objects.
- **Statistics Task**: Implements a compatible statistics task to provide CPU usage metrics identical to the original μC/OS-II implementation.
- **Tiny Mode**: An optional "Tiny Mode" allows for a significantly reduced memory footprint by stripping away non-essential structure members if full compatibility with internal control block fields is not required.

## Technical Implementation

The wrapper maps μC/OS-II primitives directly to RT-Thread equivalents. For example, μC/OS-II tasks are mapped to RT-Thread threads, and semaphores, mutexes, and message queues are mapped to their respective RT-Thread IPC objects. 

One critical area of implementation is the handling of stack sizes. While μC/OS-II typically defines stack sizes in terms of `CPU_STK` (usually 4 bytes), RT-Thread uses bytes. The wrapper handles these conversions internally, but developers must remain consistent with μC/OS-II data types when defining stacks to avoid subtle memory corruption.

### API Extensions

In addition to standard μC/OS-II APIs, the wrapper introduces several extended functions to simplify development on the RT-Thread platform:
- `OSMutexCreateEx()`: A simplified mutex creation function that removes the unnecessary priority parameter required by the original μC/OS-II implementation.
- `OSQCreateEx()`: A simplified message queue creation function.

## Getting Started

For users of the RT-Thread full version, the wrapper can be easily integrated using the **Env tool**. By navigating to the system packages menu, users can enable the uCOS-II Wrapper and configure options such as automatic initialization and Tiny Mode.

For RT-Thread Nano users, the integration involves adding the source files (including the specific `os_rtwrap.c`) to the project and configuring `os_cfg.h`. 

### Stack Definition Example

When defining task stacks, it is important to use the μC/OS-II data types to ensure the wrapper correctly calculates the required memory:

```c
#define THREAD_STACK_SIZE 256
ALIGN(RT_ALIGN_SIZE)
static CPU_STK thread2_stack[THREAD_STACK_SIZE]; // Correct: Use uCOS-II data types

OSTaskCreateExt(task,
                0,
                &thread2_stack[THREAD_STACK_SIZE-1],
                TASK_PRIO,
                0,
                &thread2_stack[0],
                THREAD_STACK_SIZE, // Size in CPU_STK units
                0,
                OS_TASK_OPT_STK_CHK|OS_TASK_OPT_STK_CLR);
```

## Hardware Support and Simulation

The project includes a ready-to-use Keil MDK simulation project based on the STM32F103 platform. This allows developers to verify the behavior of the compatibility layer in a simulated environment before deploying to physical hardware. The simulation uses USART2 for console output and requires the RT-Thread Nano 3.1.3 pack.
