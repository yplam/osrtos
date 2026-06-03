---
title: Zephyr C++20 Framework (ZPP)
summary: A header-only C++20 framework for the Zephyr RTOS that wraps the native C-API
  with minimal runtime and memory overhead. It provides a modern C++ interface for
  Zephyr features like threads and synchronization primitives while maintaining high
  performance.
slug: zephyr-c-20-framework-zpp
codeUrl: https://github.com/lowlander/zpp
siteUrl: https://lowlander.github.io/zpp/
star: 56
lastUpdated: '2023-01-13'
rtos: zephyr
topics:
- c-plus-plus
- cpp
- cpp-library
- cpp20
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- freertos-modern-c-wrappers
- freertos-cpp
- lv-modern-c-20-bindings-for-lvgl
- xf-extension-to-freertos
- herald-for-c
- micropython-wrap
---

## Modernizing Zephyr Development with ZPP

ZPP is an experimental C++20 framework designed specifically for the Zephyr RTOS. Its primary mission is to provide a modern, type-safe C++ wrapper around the Zephyr C-API. Unlike some other abstraction layers, ZPP is built with a focus on efficiency, aiming to minimize runtime and memory overhead, making it suitable for resource-constrained embedded environments.

## A Modern C++ Interface for Zephyr

The Zephyr RTOS is predominantly written in C, which is the industry standard for embedded systems. However, as C++ continues to evolve, features in C++20 offer powerful tools for building safer and more expressive APIs. ZPP leverages these advancements to wrap Zephyr's core functionality—such as threads, mutexes, and semaphores—into a cohesive C++ namespace.

By using ZPP, developers can move away from the macro-heavy and pointer-intensive patterns common in C-based RTOS development. Instead, they can utilize RAII (Resource Acquisition Is Initialization), stronger type checking, and cleaner syntax provided by modern C++.

## Design Philosophy: Efficiency First

One of the most significant concerns when using C++ in embedded systems is "bloat." ZPP addresses this by being a header-only library. This design choice allows the compiler to optimize the code effectively, often inlining the wrapper functions so that the resulting machine code is nearly identical to calling the Zephyr C-API directly.

It is important to note that ZPP does not attempt to implement a full `std::` library for Zephyr. Instead, it focuses strictly on providing a C++ interface for the existing Zephyr primitives. This keeps the footprint small and ensures that developers aren't paying for features they don't use.

## Integration and Usage

ZPP is designed to be integrated seamlessly into the Zephyr ecosystem using the `west` meta-tool. Developers can add it to their project by including the repository in their `west.yml` manifest. 

Once integrated, all ZPP components are accessible under the `zpp::` namespace. The library organizes its headers in a logical structure, allowing for specific inclusions like:

```cpp
#include <zpp/thread.hpp>

void my_function() {
    // Example of using the zpp namespace
    // zpp::thread my_thread;
}
```

All header files use the `.hpp` extension, distinguishing them from standard C headers and ensuring compatibility with modern C++ compilers.

## Current Project Status

As of its current development phase, ZPP is considered to be in an experimental or early alpha state. The API is not yet stable and is subject to frequent changes as the project matures. For developers looking to experiment with modern C++ on Zephyr, ZPP offers a glimpse into a more expressive way of writing firmware, though it should be used with caution in production environments until it reaches a more stable release.

For those interested in exploring the API further, the project maintains automatically generated Doxygen documentation which provides a detailed look at the available classes and functions.
