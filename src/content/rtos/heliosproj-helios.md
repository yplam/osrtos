---
title: HeliOS
summary: HeliOS is a lightweight, multitasking kernel designed for low-power embedded
  devices, offering both event-driven and cooperative multitasking models without
  traditional context switching. It provides a rich API for task management, inter-process
  communication, and memory management while maintaining a tiny footprint suitable
  for Arduino and ARM Cortex-M platforms.
slug: heliosproj-helios
codeUrl: https://github.com/heliosproj/HeliOS
star: 407
version: 0.4.1
lastUpdated: '2023-03-28'
components:
- Scheduler
- Memory Management
- IPC
- Profiling
platforms:
- AVR
- ARM Cortex-M
- Xtensa
- SAM
licenses:
- GPL-2.0
libraries:
- CMSIS
createdAt: '2025-12-29'
updatedAt: '2026-03-01'
---

### Features


- Concurrent support for event-driven and cooperative multitasking models within the same application.

- Runtime balanced scheduler that deprioritizes tasks consuming excessive execution time to prevent monopolization.

- Context-switch-free architecture to simplify shared resource management and eliminate portability code requirements.

- Direct-to-task notifications for low-overhead, event-based inter-process communication.

- Flexible FIFO message queues for multi-byte data exchange shared among any number of tasks.

- Stream buffers optimized for single-byte stream-based communication between processes.

- Private heap management using statically allocated memory to improve safety over standard malloc/free.

- Integrated memory defragmentation and consistency checking for long-term system stability.

- Kernel-mode device driver model providing a standardized framework for peripheral integration.

- Task-specific watchdog timers to detect and recover from stalled or unresponsive execution.

- Soft-real-time scheduling prioritizing tasks with elapsed timer events while maintaining system responsiveness.

- Standardized syscall return types (xReturn) for robust error propagation and consistent handling.

- Support for multi-region memory configurations to utilize disparate hardware RAM banks.

- Native support for CMSIS on ARM Cortex-M microcontrollers for seamless vendor integration.

- Configurable kernel parameters via a single centralized header file for easy customization.

- Tiny footprint suitable for a broad range of devices from 8-bit AVR to 32-bit ARM architectures.



HeliOS utilizes a unique architectural approach that blends event-driven and cooperative multitasking without relying on traditional context switching. This design choice simplifies development by removing the need for complex synchronization primitives like mutexes and semaphores for shared resource access, as tasks are not preempted mid-execution. The kernel is structured around a central scheduler that manages two distinct task types: event-driven tasks, which respond to notifications or timers, and cooperative tasks, which follow a "runtime balanced" round-robin approach. This balancing mechanism ensures that long-running tasks are deprioritized, maintaining system fluidity even under heavy load.

#### Core Components
* **Scheduler**: Implements a runtime-balanced algorithm to prevent task starvation and manages execution priority between event and cooperative models.
* **Memory Manager**: Provides a private heap implementation using static memory to avoid fragmentation and improve safety compared to standard library functions.
* **IPC Subsystem**: Facilitates communication through direct-to-task notifications, FIFO message queues, and stream buffers.
* **Device Driver Model**: A kernel-mode framework allowing developers to interface with hardware peripherals through standardized syscalls.

### Use Cases
This RTOS is ideal for:
- **IoT Sensors**: Perfect for low-power devices that spend most of their time in a waiting state, waking only for specific events or timer intervals.
- **Arduino Prototyping**: Provides a structured multitasking environment for Arduino users who have outgrown the "super loop" pattern but want to avoid the complexity of FreeRTOS.
- **Industrial Monitoring**: Suitable for applications requiring soft-real-time performance and robust memory management with consistency checking.
- **Educational Platforms**: An accessible entry point for learning RTOS concepts due to its lack of context-switching complexity and well-documented API.

### Getting Started
Developers can integrate HeliOS into their projects via the Arduino Library Manager or the PlatformIO Registry by searching for "HeliOS". For ARM Cortex-M development, the source code can be manually added to IDEs like Keil uVision or vendor-specific environments, requiring the definition of the `CMSIS_ARCH_CORTEXM` compiler directive and configuration of clock frequencies in the `config.h` header. Detailed API documentation, including the consistent `xReturn` error handling system, is available in the HeliOS Developer's Guide located within the `/doc` directory of the repository. Several example sketches, such as "Blink" and "WaitNotify", are provided to demonstrate the event-driven and cooperative task models.
