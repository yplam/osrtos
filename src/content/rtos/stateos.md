---
title: StateOS
slug: stateos
summary: StateOS is a high-performance, lightweight real-time operating system designed
  for deeply embedded microcontrollers, featuring a unique task model inspired by
  state machines. It provides extensive C++ standard library compatibility, including
  support for std::thread and synchronization primitives, while maintaining a small
  footprint suitable for 8-bit and 32-bit architectures.
codeUrl: https://github.com/stateos/StateOS
siteUrl: https://github.com/stateos/StateOS
star: 208
version: v7.0
lastUpdated: '2026-03-13'
platforms:
- ARM Cortex-M
- STM8
licenses:
- MIT
libraries:
- common
createdAt: '2025-12-23'
updatedAt: '2026-03-17'
---

### Features


- Dual-mode kernel supporting both preemptive and cooperative scheduling.

- Configurable timer resolution with support for 16, 32, or 64-bit counters.

- Power-efficient tick-less operation mode for low-power applications.

- Hardware-assisted memory protection using MPU for null pointer detection and stack overflow prevention.

- Asynchronous communication mechanisms designed for unmasked interrupt handlers.

- Comprehensive synchronization suite including spin locks, once flags, and barriers.

- Advanced signaling system with protection masks and multiple flag types (any, all, new).

- Versatile semaphore implementation covering binary, limited, and counting types.

- Feature-rich mutexes with configurable types, protocols, and robustness settings.

- Support for condition variables and read/write locks for complex resource sharing.

- Multiple memory management strategies including fixed-size memory pools and raw buffers.

- Diverse queue types including message, mailbox, event, and job queues.

- Integrated support for Hierarchical State Machines (HSM).

- Full compatibility with CMSIS-RTOS and CMSIS-RTOS2 APIs.

- Extensive C++11/14/17/20 feature support including std::thread, std::future, and std::chrono.

- Thread Local Storage (TLS) support for task-specific data.



### Architecture

StateOS is designed around the concept of a task state machine, where the procedure executed by a task (the task state) is treated as a discrete function that the kernel executes within an infinite loop. This design allows for immediate state changes via a dedicated task function, facilitating a clean implementation of complex logic. The kernel is highly modular and can be configured to operate in either preemptive or cooperative scheduling modes depending on the application requirements.

The architecture includes a robust synchronization layer and a sophisticated memory management subsystem. A key highlight is the advanced C++ wrapper, which provides a seamless bridge between the C-based kernel and modern C++ standards. This allows developers to use standard C++ threading features like **std::thread**, **std::mutex**, and **std::condition_variable** directly on embedded hardware. The kernel also supports tick-less operation and MPU-based hardware protection to enhance reliability and power efficiency.

### Use Cases

This RTOS is ideal for:

- **Industrial Automation**: Implementing complex control logic using the built-in Hierarchical State Machine (HSM) support.
- **Battery-Powered IoT**: Utilizing the tick-less mode to minimize power consumption in remote sensing applications.
- **Modern C++ Embedded Projects**: Leveraging full **std::thread** and **std::chrono** support for high-level application development.
- **Resource-Constrained Systems**: Deploying a full-featured RTOS on 8-bit STM8 or 32-bit ARM Cortex-M microcontrollers with minimal overhead.
- **Standardized Firmware**: Using CMSIS-RTOS/2 compatibility to maintain portability across different ARM-based hardware platforms.

### Getting Started

To get started with StateOS, developers should begin by selecting the appropriate makefile for their compiler, such as `makefile.gnucc` for GCC, `makefile.armcc` for ARMCC, or `makefile.iarcc` for IAR. The core kernel source code is located in the `src` directory, with corresponding headers in the `include` folder. For board-specific implementations, it is recommended to explore the various template and example repositories provided by the StateOS organization on GitHub, which cover platforms like the STM8S-Discovery and STM32F7. Detailed documentation for the API is maintained directly within the source header files.
