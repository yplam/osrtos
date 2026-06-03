---
title: FreeRTOS Modern C++ Wrappers
summary: A C++ wrapper library for the FreeRTOS kernel that provides an API closely
  following the C++ standard thread support library. It emphasizes static allocation
  to optimize RAM usage and includes automatic ISR context detection for threading
  calls. The library is compatible with C++11 and above, supporting platforms like
  ESP-IDF and Cortex-M architectures.
slug: freertos-modern-c-wrappers
codeUrl: https://github.com/IntergatedCircuits/freertos-mcpp
star: 38
lastUpdated: '2025-12-03'
rtos: freertos
topics:
- cpp
- cpp11
- freertos
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- frt-fl-ssie-s-ready-freertos-threading
- xf-extension-to-freertos
- freertos-cpp
- zephyr-c-20-framework-zpp
- freertos-add-ons
- freertos-wrapper-for-rt-thread
---

## Overview

FreeRTOS Modern C++ Wrappers (freertos-mcpp) is a library designed to bring the power and safety of modern C++ to the ubiquitous FreeRTOS kernel. While FreeRTOS is traditionally used via a C API, this project provides a wrapper layer that closely follows the C++ standard thread support library. This allows developers to write cleaner, more expressive code while maintaining the performance and reliability of the underlying FreeRTOS kernel.

## Key Features

The library is built with embedded constraints in mind, focusing on efficiency and predictability. Unlike many C++ wrappers, it avoids the use of virtual classes to ensure that the wrapper classes accurately encapsulate the underlying FreeRTOS data structures without unnecessary overhead.

**Core capabilities include:**
- **Standard-compliant API**: The public API is designed to match the standard C++ threading library, making it familiar to developers coming from desktop C++ environments.
- **Static Allocation Focus**: The library promotes static allocation of kernel objects, which is a best practice in safety-critical embedded systems to reduce the risk of heap fragmentation.
- **Automatic ISR Context Detection**: One of the most convenient features is the ability to automatically detect if a call is being made from an Interrupt Service Routine (ISR). The API selects the appropriate FreeRTOS call (e.g., `xSemaphoreGive` vs `xSemaphoreGiveFromISR`) automatically, simplifying application logic.
- **ESP-IDF Support**: The library includes built-in support for the ESP-IDF platform, making it easy to integrate into ESP32-based projects.

## Technical Implementation

The library covers a wide range of FreeRTOS primitives, including threads (tasks), mutexes, recursive mutexes, condition variables, semaphores, event groups, and queues. It requires a FreeRTOS port that implements the `xPortIsInsideInterrupt()` call to handle the automatic ISR context switching.

To ensure correct operation, the library relies on specific configurations within `FreeRTOSConfig.h`. These include enabling static allocation, defining task return addresses for automatic resource freeing, and configuring thread-local storage pointers for thread termination signaling.

### Helper Components

Beyond the core wrappers, the project provides several helper files in the `src/helpers` directory to address common embedded use cases:
- **tasks_static.c**: Provides the necessary source code to support static allocation of kernel objects.
- **runtime_stats_timer.c**: Offers a zero-cost runtime statistics timer specifically for Cortex-M architectures.
- **Memory Management**: Includes `malloc_free.c` and `new_delete_ops.cpp` to redirect standard C++ memory allocation to the FreeRTOS heap management system.

## Getting Started

Integrating the library into an existing project involves adding the source files and ensuring the C++ compiler is set to C++11 or higher. For ESP-IDF users, the project includes a `CMakeLists.txt` that allows it to be registered as a component. 

When configuring the project, developers should pay close attention to the recommended `FreeRTOSConfig.h` settings provided in the documentation, particularly regarding `configSUPPORT_STATIC_ALLOCATION` and `configTHREAD_EXIT_CONDITION_INDEX`, which are vital for the library's resource management and thread synchronization features.
