---
title: RT-Thread
slug: rt-thread
summary: RT-Thread is a modular, object-oriented real-time operating system (RTOS)
  designed for both resource-constrained microcontrollers and high-performance IoT
  devices. It provides a scalable architecture ranging from a 3KB footprint kernel
  to a comprehensive IoT OS featuring a vast ecosystem of over 450 software packages
  and standardized interfaces like POSIX and CMSIS.
codeUrl: https://github.com/RT-Thread/rt-thread
siteUrl: http://www.rt-thread.org/
star: 11845
version: v5.2.2
lastUpdated: '2026-03-09'
components:
- GUI
- FileSystem
- Network
- Shell
- OTA
- MQTT
- HTTP
- HTTPS
- TCP
- UDP
- IPv6
- DNS
- DHCP
- WebSocket
- Database
- Cryptography
- USBHost
- USBDevice
- CAN
- MachineLearning
- Audio
- Video
- Graphics
- Bootloader
platforms:
- ARM
- ARM Cortex-M
- ARM Cortex-R
- ARM Cortex-A
- ARM7
- ARM9
- ARM11
- RISC-V
- MIPS
- MIPS32
- Arc
- x86
- QEMU
licenses:
- Apache-2.0
libraries:
- Paho MQTT
- JerryScript
- MicroPython
- OpenMV
- mupdf
- CmBacktrace
- EasyFlash
- EasyLogger
- SystemView
- lwext4
- SQLite
createdAt: '2025-12-24'
updatedAt: '2026-03-17'
---

### Features


- Minimum kernel footprint requiring only 1.2KB RAM and 3KB Flash for resource-constrained systems.

- Object-oriented programming model implemented in C for modular and structured system design.

- Preemptive priority-based thread scheduling with support for multi-threading and synchronization primitives.

- Dual-tier distribution offering a Nano version for MCUs and a Standard version for feature-rich IoT devices.

- Comprehensive software package ecosystem with over 450 reusable components across various domains.

- Standardized application interfaces including full POSIX, CMSIS, and C++ runtime environments.

- Virtual File System (VFS) providing a unified interface for various storage and file system types.

- Integrated FinSH command-line interface for real-time system interaction and debugging.

- Highly scalable device framework for unified peripheral management and driver abstraction.

- Support for multiple memory management schemes including small memory, slab, and heap allocators.

- Native support for high-performance graphical user interfaces with touch and sliding effects.

- Cross-compiler compatibility with GCC, Keil MDK, and IAR toolchains.

- Integrated development environment (RT-Thread Studio) for one-stop project management and debugging.

- Env auxiliary tool providing a TUI for Kconfig-based project configuration and generation.

- Support for advanced scripting languages including MicroPython and JerryScript (JavaScript).

- Real-time kernel features including semaphores, mailboxes, message queues, and software timers.

- Hardware abstraction layer (libcpu/BSP) for rapid porting across diverse architectures.

- Built-in simulator support via QEMU for development without physical hardware.



### Architecture

RT-Thread employs a highly modular, layered architecture designed to scale from simple microcontrollers to complex IoT systems. The architecture is divided into three primary layers: the Kernel Layer, the Components and Service Layer, and the Software Package Layer. This design follows object-oriented principles implemented in C, ensuring high internal cohesion within modules and low coupling between different subsystems. 

The **Kernel Layer** is the core of the system, providing essential multi-threading, preemptive scheduling, and inter-thread communication primitives such as semaphores, mailboxes, and message queues. It also includes the Hardware Abstraction Layer (libcpu/BSP), which isolates the kernel from specific hardware details, facilitating rapid porting to new architectures. The **Components and Service Layer** sits atop the kernel, offering higher-level abstractions like the Virtual File System (VFS), the FinSH shell for command-line interaction, and comprehensive device and network frameworks. Finally, the **Software Package Layer** provides a massive ecosystem of reusable components that can be seamlessly integrated into projects to add complex functionality such as scripting languages, multimedia support, and cloud connectivity.

#### Core Components
- **Real-Time Kernel**: Multi-threaded scheduler, memory management, and synchronization primitives.
- **FinSH Shell**: A powerful command-line interface for system debugging and interaction.
- **Virtual File System (VFS)**: Unified interface for FAT, SPIFFS, and network-based file systems.
- **Device Framework**: Standardized I/O device management for UART, I2C, SPI, and ADC.
- **Network Stack**: Support for LWIP and various protocol implementations (MQTT, HTTP, TLS).

### Use Cases

This RTOS is ideal for:

- **Resource-Constrained MCUs**: Using the Nano version to provide multi-tasking on devices with as little as 3KB Flash and 1.2KB RAM.
- **IoT Gateways**: Leveraging the rich network stack and protocol support (MQTT, CoAP, WebSocket) for cloud connectivity.
- **Industrial Control**: Utilizing the real-time preemptive kernel for deterministic task execution in automated systems.
- **Smart Home Appliances**: Implementing complex graphical user interfaces and touch effects using the integrated GUI components.
- **Edge Computing**: Running scripting languages like MicroPython or JerryScript for flexible, high-level application development on embedded hardware.
- **Wearable Devices**: Taking advantage of low power consumption and fast startup times for battery-operated electronics.

### Getting Started

Developers can begin by choosing between the Standard and Nano versions based on their hardware requirements. The recommended development path is using **RT-Thread Studio**, a one-stop integrated development environment that provides graphical configuration, project management, and debugging tools. For those preferring command-line workflows, the **Env tool** provides a TUI for Kconfig-based system tailoring and project generation for GCC, Keil MDK, and IAR. 

For initial testing without physical hardware, RT-Thread provides comprehensive **QEMU BSP support**, allowing developers to run and debug the OS on simulated ARM or RISC-V platforms. Detailed documentation, including the Programming Guide and Kernel Samples, is available on the official website to assist with the learning curve. Links to these resources and the software package index can be found in the repository's README.
