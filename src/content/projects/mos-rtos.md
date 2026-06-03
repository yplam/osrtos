---
title: MOS RTOS
summary: A modern C++23-based preemptive real-time operating system designed for ARM
  Cortex-M microcontrollers and the Renode emulation platform. It features a modular
  kernel with task management, synchronization primitives, and a command-line shell,
  while uniquely supporting asynchronous stackless coroutines for efficient concurrency.
  The project integrates modern C++ features like concepts and futures to improve
  type safety and developer productivity in embedded systems.
slug: mos-rtos
codeUrl: https://github.com/Eplankton/mos-renode
siteUrl: https://deepwiki.com/Eplankton/mos-renode
star: 11
lastUpdated: '2026-02-16'
rtos: cmsis
topics:
- cpp
- embedded
- rtos
- stm32
isShow: false
createdAt: '2026-02-18'
updatedAt: '2026-02-18'
relatedProjects:
- stateos-c-11
- r3v2-cmsis-rtos
- freertos-cpp
- freertos-port-for-teensy-3-6-4-0-4-1
- stm32f1-rtos-example-project
- arduino-rt-thread-library
---

## Overview

MOS (Modular Operating System) represents a modern approach to real-time operating systems by leveraging the power of C++23. Designed primarily for the STM32 series and ARM Cortex-M architecture, MOS provides a preemptive kernel capable of handling complex embedded tasks while maintaining a small footprint. The project distinguishes itself by using modern language features like concepts and coroutines to provide a more type-safe and expressive environment for embedded development.

## Core Architecture

The system is organized into several distinct layers to ensure portability and maintainability:
- **Kernel Layer**: Implements the core scheduler, task management, and synchronization primitives.
- **Architecture Layer**: Contains CPU-specific code, including context switching and hardware initialization for ARM Cortex-M.
- **Driver/HAL Layer**: Interfaces with hardware peripherals using STM32 HAL and LL drivers.
- **Application Layer**: Where user code resides, including the built-in command-line shell.

## Key Features

### Advanced Scheduling and Task Management
MOS supports a preemptive priority-based scheduler with Round-Robin scheduling for tasks at the same priority level. It includes standard synchronization primitives such as Semaphores, Mutexes (with Priority Ceiling Protocol support), Condition Variables, and Barriers. The kernel also implements flexible page allocation policies, including POOL, DYNAMIC, and STATIC strategies, and features an idle task that automatically reclaims resources from terminated tasks.

### Modern Asynchronous Programming
One of the most innovative aspects of MOS is its support for asynchronous stackless coroutines using `co_await`, `yield`, and `return`. This allows developers to write non-blocking code that looks synchronous, significantly reducing the memory overhead typically associated with multiple task stacks in traditional RTOS environments.

### Integrated Shell and Middleware
MOS comes with a built-in command-line shell for real-time interaction with the system. It has been integrated with several popular embedded libraries, including **GuiLite** for graphics, **FatFS** for file system management, and the **Embedded Template Library (ETL)** for efficient C++ data structures.

## Development and Emulation

The project is tightly integrated with **Renode**, an open-source simulation framework for multi-node embedded systems. This allows developers to test their firmware in a virtual environment that mimics real hardware, facilitating automated testing and continuous integration. The build system is powered by CMake, making it compatible with modern IDEs like VS Code and standard GNU toolchains.

## Example: Task and Coroutine Models

MOS allows developers to mix traditional thread-based tasks with modern coroutine models within the same application:

```cpp
// Traditional Thread Model
void red_blink(Device::LED_t leds[]) {
    while (true) {
        leds[0].toggle(); // red
        Task::delay(500_ms);
    }
}

// Modern Coroutine Model
Async::Future_t<void> blue_blink(Device::LED_t leds[]) {
    while (true) {
        leds[1].toggle(); // blue
        co_await Async::delay(500_ms);
    }
}
```

## Getting Started

To begin developing with MOS, the project provides a `build.sh` script that leverages CMake and the Arm GNU Toolchain. For those preferring a graphical environment, the repository includes a VS Code workspace configuration compatible with the EIDE extension. Emulation can be started directly via Renode, providing immediate serial output and debugging capabilities without requiring physical hardware.
