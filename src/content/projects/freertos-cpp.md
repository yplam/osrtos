---
title: FreeRTOS-Cpp
summary: A modern C++17 header-only interface for the FreeRTOS kernel. It provides
  an object-oriented abstraction for FreeRTOS modules like tasks, queues, and semaphores
  using templates and the C++ type system to simplify embedded development.
slug: freertos-cpp
codeUrl: https://github.com/jonenz/FreeRTOS-Cpp
siteUrl: https://jonenz.github.io/FreeRTOS-Cpp/index.html
star: 64
version: v0.5
lastUpdated: '2024-10-22'
rtos: freertos
topics:
- c-plus-plus
- c-plus-plus-17
- embedded
- freertos
- freertos-kernel
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- freertos-add-ons
- frt-fl-ssie-s-ready-freertos-threading
- freertos-modern-c-wrappers
- freertos-rust
- zephyr-c-20-framework-zpp
- mos-rtos
---

## Modernizing the FreeRTOS Experience

FreeRTOS is the industry-standard real-time operating system for microcontrollers, known for its reliability and efficiency. However, its native C API can sometimes feel verbose or error-prone when building complex applications. FreeRTOS-Cpp addresses this by providing a modern C++17 header-only interface to the FreeRTOS kernel API. 

The project aims to bridge the gap between the low-level kernel and high-level application logic by exposing FreeRTOS modules as classes. This allows developers to leverage object-oriented programming (OOP) patterns while maintaining the performance and predictability required for embedded systems.

## Key Goals and Features

The library is designed with several core objectives in mind:

- **Object-Oriented Interface**: FreeRTOS modules like Tasks, Queues, and Semaphores are encapsulated as classes, making the code more intuitive and easier to manage.
- **Template-Based Design**: The project uses C++ templates to simplify the creation of queues and statically allocated modules. This helps in managing varying memory requirements without the boilerplate code typically associated with static allocation in C.
- **Type Safety**: By utilizing the C++ type system, the library reduces common errors associated with `void*` pointers often found in the original C API.
- **Minimal Abstraction**: The interface is kept thin to ensure it doesn't introduce unnecessary overhead, acting as a foundation for users to build even higher-level abstractions if needed.

## Supported FreeRTOS Modules

FreeRTOS-Cpp provides wrappers for the most essential components of the kernel, including:

- **Task Management**: Simplified task creation and control.
- **Synchronization**: Mutexes, Semaphores, and Event Groups.
- **Communication**: Queues, Stream Buffers, and Message Buffers.
- **Timing**: Software Timers and Kernel control functions.

## Technical Implementation

The project is strictly header-only, meaning integration is as simple as adding the `FreeRTOS-Cpp/include` directory to your project's include path. It requires a compiler that supports C++17 features. 

The repository includes a comprehensive set of examples that mimic the official FreeRTOS documentation, rewritten to demonstrate the C++ interface. These examples are tested against the FreeRTOS kernel (included as a submodule) and configured for ARM Cortex-M0 targets using CMake, though the library itself is portable across any architecture supported by FreeRTOS.

## Getting Started

The recommended way to use FreeRTOS-Cpp is to add it as a Git submodule in your project. Once added, you can include the specific headers for the modules you need. For example, to use tasks and queues, you would include:

```cpp
#include <FreeRTOS/Task.hpp>
#include <FreeRTOS/Queue.hpp>
```

Because the library is header-only, there is no need to compile separate source files for the wrapper itself. The project also provides a CMake configuration to facilitate easy integration into modern build systems. Detailed API documentation and usage examples are available via the project's GitHub Pages site, providing a familiar reference for those already accustomed to the standard FreeRTOS documentation.
