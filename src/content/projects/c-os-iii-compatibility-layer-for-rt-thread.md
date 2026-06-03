---
title: μC/OS-III Compatibility Layer for RT-Thread
summary: A high-fidelity compatibility layer that allows applications written for
  Micriμm's μC/OS-III to run seamlessly on the RT-Thread RTOS. It supports μC/OS-III
  versions 3.00 through 3.08 and provides integration with the μC/Probe visualization
  tool and RT-Thread's FinSH console.
slug: c-os-iii-compatibility-layer-for-rt-thread
codeUrl: https://github.com/mysterywolf/RT-Thread-wrapper-of-uCOS-III
siteUrl: https://www.rt-thread.org/
star: 105
version: v1.1.1
lastUpdated: '2023-01-29'
rtos: rt-thread
topics:
- compatibility-layer
- keil
- keil-mdk
- nano
- probe
- rt-thread
- rtt
- rtthread
- uc-cpu
- uc-lib
- uc-os
- uc-os3
- uc-probe
- ucos
- ucos-iii
- ucos3
- ucosii
- ucosiii
- wrap
- wrapper
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- c-os-ii-compatibility-layer-for-rt-thread
- cmsis-rtos2-compatibility-layer-for-rt-thread
- c-common-for-rt-thread
- cmsis-rtos1-compatibility-layer-for-rt-thread
- freertos-wrapper-for-rt-thread
- uc-modbus-for-rt-thread
---

## Overview

The μC/OS-III Compatibility Layer (ACL) for RT-Thread is a specialized middleware designed to bridge the gap between two popular real-time operating systems. It allows developers to migrate existing applications based on Micriμm's μC/OS-III to the RT-Thread ecosystem with minimal effort. By providing a 100% C-based implementation of the μC/OS-III API, this wrapper ensures that legacy code can run on RT-Thread without requiring significant application-level changes.

This project is particularly valuable for engineers transitioning from μC/OS-III to RT-Thread, as it allows them to leverage their existing experience and codebases while gaining access to RT-Thread's extensive package ecosystem and hardware support.

## Key Features

### High Fidelity API Support
The wrapper supports nearly the entire μC/OS-III API surface (versions 3.00.00 to 3.08.00). This includes task management, semaphores, mutual exclusion semaphores (mutexes), message queues, event flags, and software timers. It even implements complex behaviors like nested task suspension and resumption, which are native to μC/OS-III but handled differently in the RT-Thread kernel.

### μC/Probe Integration
One of the standout features of this compatibility layer is its support for μC/Probe. Developers can use Micriμm's professional visualization tool to monitor RT-Thread kernel objects, task statuses, and CPU usage in real-time. The wrapper exposes the necessary internal structures and debug lists required for μC/Probe to function as if it were running on a native μC/OS-III system.

### FinSH Console Integration
The wrapper registers several commands with RT-Thread's FinSH shell. Users can type `ucos --help` in the terminal to view status information for various μC/OS-III components, including tasks, semaphores, mutexes, and timers, providing a familiar debugging experience within the RT-Thread environment.

## Technical Implementation

The compatibility layer is built directly on top of the RT-Thread kernel. It maps μC/OS-III objects (like `OS_TCB`, `OS_SEM`, and `OS_Q`) to their RT-Thread counterparts while maintaining the specific data structures and member variables expected by μC/OS-III applications. 

### Configuration
Developers can configure the wrapper using standard μC/OS-III configuration files: `os_cfg.h` and `os_cfg_app.h`. This allows for fine-grained control over which features are enabled, such as statistics tasks, software timers, or specific IPC mechanisms. For resource-constrained systems, a "Tiny Mode" is available to reduce the memory footprint by stripping away non-essential debug members from kernel structures.

### Initialization
The project supports multiple initialization workflows:
- **Standard Manual Init**: Follows the official Micriμm startup sequence (`OSInit`, `OSStart`).
- **Automatic Init**: When used with the RT-Thread Env tool, the wrapper can be configured to initialize itself automatically before the `main` function, allowing μC/OS-III tasks to start immediately.

## Getting Started

When migrating a project, developers should pay close attention to stack size units. While RT-Thread typically uses bytes, μC/OS-III uses `CPU_STK` units. The wrapper handles the conversion, but users must ensure they use the provided μC/OS-III macros to maintain consistency. 

```c
#include <os.h>

int main(void)
{
    OS_ERR err;
    
    OSInit(&err);    /* Initialize the uCOS-III compatibility layer */
    OSStart(&err);   /* Start the uCOS-III scheduler */
    
    /* Application tasks can now be created using OSTaskCreate */
}
```

## Hardware and Toolchain Support

The project includes a ready-to-use Keil MDK simulation project based on the STM32F103 platform. It is fully compatible with the RT-Thread Nano version as well as the full RT-Thread distribution via the Env tool and SCons build system.
