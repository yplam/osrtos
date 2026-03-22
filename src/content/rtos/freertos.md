---
title: FreeRTOS
slug: freertos
summary: FreeRTOS is a market-leading real-time operating system kernel designed for
  microcontrollers and small microprocessors, featuring a small memory footprint and
  fast execution times. It provides a comprehensive ecosystem of libraries for IoT
  connectivity, security, and over-the-air updates, supporting over 40 processor architectures
  including ARM and RISC-V.
codeUrl: https://github.com/FreeRTOS/FreeRTOS
siteUrl: http://www.freertos.org/
star: 7094
version: '202411.00'
lastUpdated: '2026-03-16'
components:
- Network
- TCP
- UDP
- IPv6
- MQTT
- HTTP
- HTTPS
- TLS/SSL
- Cryptography
- OTA
- SNTP
- Cellular
- PKI
- Logging
- Profiling
- TrustZone
- DNS
- DHCP
platforms:
- ARM
- ARM Cortex-M
- ARM Cortex-A
- ARM Cortex-R
- ARM7
- ARM9
- ARM11
- RISC-V
- x86
- x86_64
- MIPS
- MIPS32
- PIC
- dsPIC
- AVR
- AVR8
- MSP430
- MSP432
- Windows
- Simulator
- QEMU
- POSIX
- RX
- H8
- STM8
- Microblaze
- Nios II
- V850
- RH850
- TriCore
- ColdFire
licenses:
- MIT
libraries:
- MbedTLS
- WolfSSL
- Percepio Tracealyzer
createdAt: '2025-12-22'
updatedAt: '2026-03-22'
---

### Features


- Preemptive or co-operative multitasking with priority-based scheduling for deterministic performance.

- Symmetric Multiprocessing (SMP) support for multi-core microcontroller architectures.

- Native TCP/IP stack (FreeRTOS+TCP) with comprehensive support for both IPv4 and IPv6.

- Integrated TLS v1.3 support via MbedTLS and WolfSSL for secure encrypted communications.

- AWS IoT integration for Over-the-air (OTA) updates, Device Shadow, and Jobs management.

- Support for ARMv8-M TrustZone and ARMv8.1-M PACBTI security extensions for firmware protection.

- Lightweight IoT messaging via coreMQTT and coreMQTT Agent for shared network connections.

- Cryptographic identity and key management through the corePKCS11 library.

- Formal verification of software correctness for core libraries using CBMC proofs.

- Memory Protection Unit (MPU) support for task isolation and enhanced system reliability.

- Cellular interface library for seamless mobile network integration.

- SNTP client for accurate network-based time synchronization across devices.

- Support for 40+ architectures and 15+ toolchains including latest RISC-V and ARMv8-M.

- Low power modes and tickless idle functionality for energy-efficient battery operation.

- Trace and profiling support via Percepio View for real-time application analysis.



### Architecture

FreeRTOS utilizes a microkernel design focused on providing a minimal but robust set of primitives for real-time applications. The core kernel is responsible for task management, scheduling, and inter-process communication (IPC) through queues, semaphores, and mutexes. It is designed to be highly portable, with a clear separation between the hardware-independent core and the hardware-dependent port layer. This architecture allows it to maintain a tiny memory footprint, typically around 6K to 12K bytes of ROM, depending on the architecture and configuration.

The system is highly modular, following a "kernel + libraries" approach. While the core kernel handles execution, additional functionality such as the TCP/IP stack (FreeRTOS+TCP), MQTT, and security protocols are provided as optional, loosely coupled libraries under the FreeRTOS-Plus umbrella. This design pattern ensures that developers only include the code necessary for their specific application, optimizing resource usage for constrained embedded devices.

#### Core Components
- **Task Scheduler**: Supports preemptive, co-operative, and round-robin scheduling with priority levels.
- **IPC Primitives**: Includes thread-safe queues, binary semaphores, counting semaphores, and recursive mutexes.
- **Software Timers**: Allows for the execution of functions at specific times or periodic intervals.
- **Event Groups**: Enables tasks to wait for combinations of events to occur.
- **Stream/Message Buffers**: Optimized for task-to-task and interrupt-to-task data transfer.

### Use Cases

This RTOS is ideal for:

- **Industrial Automation**: Managing real-time sensor data and motor control loops with deterministic timing requirements.
- **Consumer Electronics**: Powering smart home devices, wearables, and appliances that require low power consumption and small footprints.
- **Medical Devices**: Providing a reliable and formally verified foundation for life-critical monitoring and diagnostic equipment.
- **IoT Gateways**: Handling complex networking stacks, TLS encryption, and cloud connectivity for edge-to-cloud data routing.
- **Automotive Systems**: Implementing non-safety critical telematics and infotainment systems using ARM Cortex-R or Cortex-A processors.
- **Smart Energy**: Managing smart meters and grid infrastructure components that require long-term stability and remote OTA updates.

### Getting Started

To begin developing with FreeRTOS, it is recommended to clone the main repository using the `--recurse-submodules` flag, as the kernel and supplementary libraries are maintained in separate Git submodules. Developers should start by exploring the `FreeRTOS/Demo` directory, which contains pre-configured projects for hundreds of hardware platforms and various compilers (GCC, IAR, Keil). These demos provide a functional baseline that includes the necessary port files and configuration headers (`FreeRTOSConfig.h`).

Extensive documentation is available on the [official FreeRTOS website](https://www.freertos.org), including a [Kernel Quick Start Guide](https://www.freertos.org/Documentation/01-FreeRTOS-quick-start/01-Beginners-guide/02-Quick-start-guide) and a comprehensive [API Reference](https://www.freertos.org/Documentation/02-Kernel/04-API-references/01-Task-creation/00-TaskHandle). For community support, developers can access the [FreeRTOS Support Forums](https://forums.freertos.org) to interact with the primary developers and the broader ecosystem.
