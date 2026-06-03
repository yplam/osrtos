---
title: STM32 Event-Triggered Finite State Machine Framework
summary: A lightweight event-driven finite state machine (FSM) framework designed
  for STM32 microcontrollers. It leverages FreeRTOS and CMSIS-RTOS V2 for task management
  and message queuing, providing a structured way to handle asynchronous events and
  state transitions.
slug: stm32-event-triggered-finite-state-machine-framework
codeUrl: https://github.com/winxos/stm32-event-trigger-state-machine-demo
star: 1
lastUpdated: '2022-07-30'
rtos: freertos
topics:
- cmsis
- event-trigger
- framework
- fsm
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-framework
- moe-minds-of-embedded-system
- amast-minimalist-asynchronous-toolkit
- micro-ros-stm32-template
- stm32-libopencm3-freertos-platformio-template
- tism-the-incredible-state-machine
---

## Overview

This project provides a streamlined framework for implementing event-triggered finite state machines (FSM) on STM32 microcontrollers. By abstracting the complexity of state transitions and event handling, it allows developers to build responsive, modular firmware. The framework is built on top of the CMSIS-RTOS V2 API, utilizing FreeRTOS as the underlying kernel to manage task execution and inter-task communication.

## Technical Architecture

The core of the framework resides in a dispatcher-based architecture. It uses an RTOS message queue to buffer events, which are then processed by a dedicated state machine thread. This design ensures that event producers (such as interrupts or other tasks) can signal state changes without blocking, while the state machine logic remains centralized and predictable.

### Key Components

- **Event Queue**: A thread-safe queue (`osMessageQueue`) that stores incoming signals and optional data payloads.
- **State Dispatcher**: A high-priority RTOS thread that waits for events and dispatches them to the currently active state function.
- **State Functions**: User-defined C functions that encapsulate the logic for specific states, typically using a switch-case structure to handle different signals like entry, tick, or hardware triggers.

## Hardware and RTOS Integration

The demo is specifically configured for the **STM32F103RCT6** microcontroller. It includes a complete STM32CubeMX configuration (`.ioc` file) and a custom linker script. The integration with **FreeRTOS** is handled via the **CMSIS-RTOS V2** wrapper, making the code more portable across different RTOS implementations that support the CMSIS standard.

## Implementation Example

Defining a state is straightforward. Developers create a function that receives a pointer to the state machine object. Within this function, the `SIG(me)` macro is used to identify the incoming event:

```c
void task_idle(State * const me)
{
    switch(SIG(me))
    {
        case SIG_ENTRY:
            task_action(me);
            break;
        case SIG_TICK:
            task_tick(me);
            break;
    }
}
```

Transitioning between states is handled by the `TASK_TO` macro, which updates the state pointer and automatically triggers an entry signal for the new state:

```c
TASK_TO(task_idle);
```

## Practical Applications

The repository includes a practical demonstration of using the FSM to manage a Modbus communication sequence. In this demo, the state machine handles periodic register reading and processes success or failure callbacks asynchronously. This approach is ideal for complex communication protocols, user interface navigation, or system sequencing where multiple asynchronous inputs must be managed without creating "spaghetti code."
