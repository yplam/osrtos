---
title: MOE (Minds Of Embedded system)
summary: MOE is an event-driven multi-tasking scheduler designed for 8, 16, and 32-bit
  microcontrollers. It provides a lightweight kernel with features including a flexible
  event queue, software timers with callbacks, inter-task messaging, and native support
  for Protothreads.
slug: moe-minds-of-embedded-system
codeUrl: https://github.com/ianhom/MOE
star: 69
version: V0.1.6
lastUpdated: '2019-12-08'
rtos: moe
topics:
- easy-to-use
- event-driven
- mcu
- moe
- multi-task
- protothreads
- schedule
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- stm32-event-triggered-finite-state-machine-framework
- mos-rtos
- minios-esp
- nuttx-real-time-operating-system
- seeed-arduino-freertos
- quectel-uniknect-project
---

## Overview

MOE, which stands for "Minds Of Embedded system," is a lightweight, event-driven scheduler specifically designed for resource-constrained 8-bit, 16-bit, and 32-bit microcontrollers. It offers a middle ground between simple super-loops and full-featured RTOS kernels, providing essential multi-tasking capabilities without the high overhead of context switching and stack management.

The system is built around an event-driven architecture that supports flexible event queue lengths and priority-based event handling. This makes it particularly suitable for IoT devices, sensor nodes, and general embedded control systems where power efficiency and low RAM consumption are critical.

## Key Features

### Event-Driven Scheduling
At its core, MOE manages tasks through an event queue. Tasks react to events rather than running in a continuous loop, which allows the CPU to remain idle or enter low-power modes when no events are pending. The system supports priority events, allowing time-critical operations to jump to the front of the queue.

### Software Timers and Messaging
MOE includes a millisecond-resolution timer module that supports callbacks, simplifying the implementation of periodic tasks or timeouts. For inter-task communication, it provides a robust message API. This includes a "To-All-Task" broadcast mechanism designed with low RAM consumption in mind, enabling efficient synchronization across the entire system.

### Protothread Support
One of MOE's standout features is its support for Protothreads. This allows developers to write asynchronous code in a linear, thread-like style without the memory overhead of traditional multi-threading. This is achieved through a stackless implementation that is highly portable across different MCU architectures.

### Debugging and Reliability
To aid development, MOE integrates flexible debug print options that can be configured for individual tasks or modules. It also includes an easy-to-use assertion system and supports CmBacktrace for hardfault backtracing on ARM Cortex-M processors, significantly reducing the time required to diagnose system crashes.

## Technical Architecture

The repository is organized into a clean, modular structure:
- **Core**: Contains the scheduler, event handler, timer, and messaging logic.
- **App**: Reusable application modules.
- **Cpu**: Startup code and hardware-specific initialization.
- **Driver**: Peripheral drivers for MCUs and external sensors/RF modules.
- **Utility**: Common data structures like queues and linked lists.

## Getting Started

Porting MOE to a new hardware platform requires providing a system millisecond clock and an optional polling function. Once the hardware abstraction is in place, the system is initialized and started with a few lines of code:

```c
void main(void)
{
    Board_Init();
    MOE_Init(GetMsClock, Poll);  /* Init MOE with system clock and poll function */
    MOE_Run();                   /* Start the scheduler */
}
```

Tasks can be written in either a standard event-handler style or using the Protothread style. A typical Protothread task in MOE looks like this:

```c
uint8 Task_PT_Demo_Process(uint8 u8Evt, void *pPara)
{
    PT_INIT();
    PT_BEGIN();
    MOE_MANDATORY_INIT();

    while(1)
    {    
        LED_Toggle(LED_RED);
        PT_DELAY(1000);  /* Non-blocking delay */
    }
    PT_END();
    return SW_OK;
}
```

Tasks are registered in a central configuration file (`Project_Config.h`), allowing for easy management of the system's execution flow.
