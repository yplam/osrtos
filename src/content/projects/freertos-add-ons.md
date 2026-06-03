---
title: FreeRTOS Add-ons
summary: A collection of C++ wrappers and C extensions for FreeRTOS that simplify
  application development through object-oriented abstractions and advanced synchronization
  primitives. It includes features such as memory pools, reader/writer locks, and
  workqueues, targeting embedded systems using FreeRTOS versions 8.2.3 through 10.5.1.
slug: freertos-add-ons
codeUrl: https://github.com/michaelbecker/freertos-addons
siteUrl: http://michaelbecker.github.io/freertos-addons/
star: 484
version: v1.6.1
lastUpdated: '2024-03-06'
rtos: freertos
topics:
- cpp
- cpp-freertos
- freertos
- freertos-addons
- rtos
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- freertos-cpp
- freertos-modern-c-wrappers
- frt-fl-ssie-s-ready-freertos-threading
- freertos-wrapper-for-rt-thread
- xf-extension-to-freertos
- freertos-rust
---

## Enhancing FreeRTOS with Modern Abstractions

FreeRTOS Add-ons is a mature project designed to bridge the gap between the low-level C API of FreeRTOS and modern software engineering patterns. Developed by Michael Becker after over a decade of working with the RTOS, this repository provides a robust set of C++ wrappers and C-based utility libraries that make developing complex embedded applications more efficient and less error-prone.

The project is divided into two primary components: a comprehensive C++ wrapper library and a set of C add-on wrappers. These tools allow developers to leverage the power of FreeRTOS while using higher-level abstractions that handle much of the boilerplate integration work automatically.

## C++ Wrappers for Object-Oriented RTOS Development

The C++ wrapper library encapsulates core FreeRTOS functionality into easy-to-use classes. This is particularly beneficial for teams moving toward C++ in the embedded space who want to avoid the pitfalls of manually wrapping RTOS primitives. The library has been verified against multiple FreeRTOS versions, including 8.2.3, 9.0.0, 10.0.0, and 10.5.1.

Key features of the C++ layer include:
- **Thread Management**: Object-oriented thread creation and management.
- **Synchronization**: Wrappers for Mutexes, Semaphores, and Event Groups.
- **Condition Variables**: An implementation of condition variables, which are not natively present in FreeRTOS.
- **Flexible Configuration**: Support for environments without C++ exceptions or C++ strings via preprocessor flags like `CPP_FREERTOS_NO_EXCEPTIONS` and `CPP_FREERTOS_NO_CPP_STRINGS`.

## Advanced C Add-ons

For developers sticking to C, the project offers several high-value components that extend the standard FreeRTOS feature set:

- **Memory Pools**: Fixed-size memory allocation buffers that eliminate the risk of memory fragmentation, a critical requirement for high-reliability embedded systems.
- **Reader/Writer Locks**: These allow multiple threads to read shared resources simultaneously while ensuring exclusive access for writers, optimizing throughput in data-heavy applications.
- **Workqueues**: A mechanism to queue functions for execution in a different thread context, ideal for handling asynchronous tasks without the overhead of dedicated threads for every small operation.
- **Optimized Data Structures**: Implementations of singly linked lists, doubly linked circular lists, queues, and stacks optimized for embedded use.

## Portability and Documentation

The project includes a significant number of demo and unit test projects—nearly 60 in total—demonstrating how to use both the C++ and C libraries. While it previously maintained a custom Linux port, it has transitioned to supporting the official GCC/Posix port distributed with the FreeRTOS Kernel, ensuring better long-term compatibility.

Documentation is a first-class citizen in this project, with full cross-referenced Doxygen-generated manuals available for both the C and C++ components. This makes it easy for developers to explore the API and understand the underlying implementation details. The project is licensed under the MIT Open Source License, matching the licensing of FreeRTOS itself since version 10.0.0.
