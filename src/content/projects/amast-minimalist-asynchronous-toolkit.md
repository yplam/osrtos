---
title: 'Amast: Minimalist Asynchronous Toolkit'
summary: A minimalist C99 asynchronous toolkit providing Active Objects, Finite State
  Machines (FSM), and Hierarchical State Machines (HSM). It features a unique async/await
  implementation for C and is designed for resource-constrained embedded systems with
  support for FreeRTOS, POSIX, and bare-metal environments.
slug: amast-minimalist-asynchronous-toolkit
codeUrl: https://github.com/adel-mamin/amast
siteUrl: https://amast.readthedocs.io/
star: 24
version: v0.14.5
lastUpdated: '2026-02-17'
rtos: freertos
topics:
- active-object
- async
- async-await
- asynchronous-programming
- c99
- embedded
- embedded-systems
- event-driven
- finite-state-machine
- firmware
- fsm
- fsm-library
- hierarchical-state-machine
- hsm
- libuv
- real-time-event-framework
- rtef
- state-machine
- statechart
isShow: false
createdAt: '2026-03-07'
updatedAt: '2026-03-07'
---

## Overview

Amast is a minimalist asynchronous toolkit designed for C99, specifically targeting embedded systems where resource efficiency and structured asynchronous logic are paramount. It provides a suite of tools to manage complexity in event-driven applications, ranging from simple state machines to sophisticated Active Object (AO) architectures. By providing a structured way to handle asynchronous interactions, Amast helps developers avoid the common pitfalls of manual state management and complex concurrency.

## Core Components and Architecture

The toolkit is built around several modular libraries that can be used independently or together to form a cohesive application framework. 

### State Machine Powerhouse
At its core, Amast offers robust support for both Finite State Machines (FSM) and Hierarchical State Machines (HSM). The HSM implementation allows for behavioral inheritance, where sub-states can inherit event-handling logic from super-states, significantly reducing code duplication in complex logic. The toolkit is designed with a "coding rules" approach that ensures state machine implementations remain clean, maintainable, and easy to visualize using tools like Mermaid.

### The Active Object Pattern
For more complex systems, Amast implements the Active Object pattern. This pattern decouples method execution from method invocation, effectively giving each "object" its own thread of execution (or a shared cooperative thread) and an event queue. This is a powerful alternative to traditional multi-threading, as it eliminates many common concurrency issues like race conditions by ensuring that each object processes events serially. Amast supports both preemptive and cooperative execution models for these objects.

### Async/Await in C
One of the most modern features of Amast is its async/await implementation for C. This allows developers to write asynchronous code that looks and behaves like synchronous code, making it much easier to read and maintain. This is particularly useful for handling long-running operations or sequences of events without falling into "callback hell."

## Lightweight and Portable

Amast is built with a minimalist philosophy. On x86-64, a basic FSM implementation can be as small as 2.4kB, while a full Active Object system might only take around 10.6kB. This makes it suitable for even very small microcontrollers where every byte of Flash and RAM counts.

The toolkit includes a Platform Abstraction Layer (PAL), allowing it to run on various environments:
- **FreeRTOS**: For real-time embedded applications requiring task management.
- **POSIX**: For Linux/Unix-based systems and simulation.
- **libuv**: For high-performance asynchronous I/O.
- **Windows**: For desktop-based development and testing.

## Comprehensive Utility Suite

Beyond state machines and AOs, Amast provides essential building blocks for embedded development:
- **Timers**: Flexible timer management for event triggering and periodic tasks.
- **Memory Management**: A "onesize" memory allocator designed for deterministic performance in real-time systems.
- **Data Structures**: Efficient implementations of singly and doubly linked lists, as well as ring buffers.
- **Event System**: A centralized event publishing and subscription mechanism that facilitates loose coupling between system components.

## Getting Started

Amast uses the Meson build system and Pixi for environment management, making it easy to integrate into modern CI/CD pipelines. A typical implementation involves defining states as C functions and using the provided macros to handle transitions and event processing. 

```c
static enum am_rc state_a(struct app *me, const struct am_event *event) {
    switch (event->id) {
    case AM_EVT_ENTRY:
        am_printf("state_a entry\n");
        return AM_FSM_HANDLED();
    case EVT_B:
        return AM_FSM_TRAN(state_b);
    }
    return AM_FSM_HANDLED();
}
```

Whether you are building a simple sensor node or a complex industrial controller, Amast provides the architectural scaffolding needed to manage asynchronous complexity without the overhead of a heavy framework.
