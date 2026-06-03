---
title: frt - Flössie's Ready FreeRTOS Threading
summary: An object-oriented C++ wrapper for FreeRTOS tasks, mutexes, semaphores, and
  queues with a focus on static allocation. It provides a clean multithreading API
  for Arduino and general FreeRTOS projects using the Curiously Recurring Template
  Pattern (CRTP) for efficiency.
slug: frt-fl-ssie-s-ready-freertos-threading
codeUrl: https://github.com/Floessie/frt
star: 24
version: 0.9.5
lastUpdated: '2024-12-01'
rtos: freertos
topics:
- arduino
- arduino-freertos
- arduino-library
- freertos
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- freertos-modern-c-wrappers
- freertos-cpp
- freertos-add-ons
- freertos-wrapper-for-rt-thread
- arduino-freertos-library
- xf-extension-to-freertos
---

## Overview

`frt` is a lightweight, object-oriented C++ wrapper designed to simplify multithreading in FreeRTOS-based projects. By providing a clean abstraction over tasks, mutexes, semaphores, and queues, it allows developers to focus on application logic rather than the complexities of the FreeRTOS C API. While originally developed for the Arduino environment, `frt` is designed to be used universally with any FreeRTOS kernel via CMake integration.

A primary design goal of `frt` is efficiency, particularly regarding memory management. The library emphasizes static allocation and utilizes the Curiously Recurring Template Pattern (CRTP) for static polymorphism. This approach minimizes the overhead typically associated with virtual functions and dynamic memory, making it ideal for resource-constrained microcontrollers.

## Key Features

### Task Management
Tasks in `frt` are implemented by inheriting from a template class. This structure encapsulates the task's logic within a `run()` method, which acts as the task's main loop. The library provides built-in methods for common task operations, such as:
- **msleep**: Sleep for a specific duration with optional remainder tracking to prevent jitter caused by timer granularity.
- **yield**: Voluntarily switch to another task of equal or higher priority.
- **Task Notifications**: Built-in support for direct-to-task notifications using `wait()` and `post()` methods, which can replace binary semaphores for better performance.

### Synchronization Primitives
`frt` provides intuitive wrappers for standard RTOS synchronization tools:
- **Mutexes**: Protect shared resources with support for priority inheritance. It includes a `tryLock()` method compatible with `std::scoped_lock` for modern C++ development.
- **Semaphores**: Supports both binary and counting semaphores for task synchronization and resource counting.
- **Queues**: Type-safe queues for passing data between tasks or between Interrupt Service Routines (ISRs) and tasks.

### Interrupt Integration
Handling RTOS primitives from within an ISR requires specific care in FreeRTOS. `frt` simplifies this by providing a consistent three-step pattern for ISR-safe operations:
1. `prepare...FromInterrupt()`: Called at the start of the ISR.
2. `...FromInterrupt()`: The actual operation (e.g., pushing to a queue or posting a semaphore).
3. `finalize...FromInterrupt()`: Called at the end of the ISR to trigger a context switch if necessary.

## Technical Implementation

The entire wrapper is contained within a single header file (`frt.h`), making it extremely easy to integrate into existing projects. By using CRTP for tasks, the compiler can resolve function calls at compile-time, saving both Flash and RAM compared to traditional virtual method tables.

```cpp
class MyFirstTask :
    public frt::Task<MyFirstTask>
{
public:
    bool run()
    {
        // Task logic goes here
        msleep(100);
        return true; // Return true to repeat, false to stop
    }
};
```

## Getting Started

For Arduino users, `frt` functions as a standard library that builds upon the `Arduino_FreeRTOS_Library`. For general embedded C++ projects, it can be integrated via CMake by adding the repository as a submodule and linking the `frt` target. The API resides entirely within the `frt::` namespace to prevent naming collisions with other libraries or the underlying FreeRTOS functions.
