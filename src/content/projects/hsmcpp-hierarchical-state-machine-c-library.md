---
title: 'HSMCPP: Hierarchical State Machine C++ Library'
summary: A comprehensive C++ library for implementing hierarchical (HSM) and finite
  state machines (FSM) with a focus on embedded and real-time systems. It supports
  code generation from SCXML, visual debugging, and provides specialized dispatchers
  for FreeRTOS, Arduino, and POSIX platforms.
slug: hsmcpp-hierarchical-state-machine-c-library
codeUrl: https://github.com/igor-krechetov/hsmcpp
siteUrl: https://hsmcpp.readthedocs.io
star: 110
version: 1.0.2
lastUpdated: '2024-05-31'
rtos: freertos
topics:
- cpp
- embedded
- embedded-systems
- finite-state-machine
- freertos
- fsm
- fsm-library
- hierarchical-state-machine
- hsm
- rtos
- state-machine
- uml-state-machine
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- freertos-modern-c-wrappers
- supladevice-library
- arduino-rt-thread-library
- frt-fl-ssie-s-ready-freertos-threading
- stateos-c-11
- amast-minimalist-asynchronous-toolkit
---

## Overview

HSMCPP is a robust C++ library designed to simplify the implementation of the state machine design pattern, specifically focusing on Hierarchical State Machines (HSM) and Finite State Machines (FSM). While many state machine implementations require heavy frameworks or commercial licenses, HSMCPP provides a lightweight, non-commercial alternative that is particularly well-suited for multi-threaded, event-driven applications and RTOS-based environments.

The library allows developers to decouple behavior from component logic, making complex systems easier to reason about, test, and maintain. By leveraging statecharts, developers can ensure that all possible states are explored and exceptional situations are handled, leading to lower bug counts in complex embedded software.

## Key Features and Capabilities

HSMCPP stands out by offering a "code-free" visual approach to state machine definition. It integrates with third-party visual editors and supports the W3C SCXML (State Chart XML) format for defining logic. 

**Core technical features include:**
- **Hierarchical States**: Support for substates, parent states, and deep history.
- **Parallel States**: Ability to manage multiple active states simultaneously.
- **Code Generation**: Automatic C++ code and PlantUML diagram generation from SCXML files.
- **Thread Safety**: Built-in mechanisms for safe execution in multi-threaded environments.
- **Visual Debugging**: The `hsmdebugger` tool allows for real-time analysis of state machine behavior, helping developers trace transitions and state changes visually.

## Embedded and RTOS Integration

One of the primary strengths of HSMCPP is its flexibility across different execution environments. It provides configurable event dispatchers that allow the state machine to run seamlessly on various platforms:

- **FreeRTOS**: Includes a specialized dispatcher for FreeRTOS tasks and supports transitions triggered from interrupts.
- **Arduino**: Optimized for resource-constrained environments with interrupt-safe dispatching.
- **POSIX/Windows**: Standard thread-based dispatchers for desktop or high-performance embedded Linux systems.
- **Framework Integration**: Optional dispatchers for GLib, GLibmm, and Qt.

For safety-critical applications, the project undergoes static code analysis including MISRA and CodeQL checks, ensuring a high standard of code quality and reliability.

## Getting Started

Implementing a state machine with HSMCPP typically involves defining your states and events, then registering transitions and callbacks. Below is a basic example of a toggle state machine using the standard thread dispatcher:

```cpp
#include <hsmcpp/hsm.hpp>
#include <hsmcpp/HsmEventDispatcherSTD.hpp>

enum class States { OFF, ON };
enum class Events { SWITCH };

int main() {
    auto dispatcher = hsmcpp::HsmEventDispatcherSTD::create();
    hsmcpp::HierarchicalStateMachine<States, Events> hsm(States::OFF);

    hsm.initialize(dispatcher);

    // Register state callbacks
    hsm.registerState(States::OFF, [](const VariantList_t& args) { printf("Off\n"); });
    hsm.registerState(States::ON, [](const VariantList_t& args) { printf("On\n"); });

    // Define transitions
    hsm.registerTransition(States::OFF, States::ON, Events::SWITCH);
    hsm.registerTransition(States::ON, States::OFF, Events::SWITCH);

    // Trigger transition
    hsm.transition(Events::SWITCH);

    dispatcher->join();
    return 0;
}
```

For more complex scenarios, developers can use the SCXML-based workflow to generate the boilerplate code, allowing them to focus entirely on the functional logic within the state callbacks.
