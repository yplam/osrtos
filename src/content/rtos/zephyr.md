---
title: Zephyr
slug: zephyr
summary: Zephyr is a scalable, security-focused real-time operating system (RTOS)
  designed for resource-constrained devices across multiple hardware architectures.
  It features a modular, small-footprint kernel with an extensive suite of subsystems,
  including a native networking stack, comprehensive Bluetooth Low Energy support,
  and a robust device driver model.
codeUrl: https://github.com/zephyrproject-rtos/zephyr
siteUrl: https://www.zephyrproject.org
star: 14763
version: v4.3.0
lastUpdated: '2026-03-21'
components:
- Network
- Wireless
- Cryptography
- FileSystem
- Shell
- Profiling
- OTA
- SecureBoot
- IPv6
- TCP
- UDP
- TLS/SSL
- DTLS
- DNS
- DHCP
- MQTT
- CoAP
- LwM2M
- Bluetooth
- BLE
- Thread
- USBDevice
- USBHost
- CAN
- CANFD
- Power Management
platforms:
- ARM
- ARM Cortex-M
- ARM Cortex-R
- ARM Cortex-A
- AArch32
- AArch64
- RISC-V
- Xtensa
- x86
- x86_64
- SPARC
- MIPS
- MIPS32
- RX
- Arc
- ARC EM
- ARC HS
- QEMU
- POSIX
- Linux
- Windows
- macOS
- Native
licenses:
- Apache-2.0
libraries:
- OpenThread
- LittleFS
- FatFs
- mbedTLS
- TinyCrypt
createdAt: '2025-12-02'
updatedAt: '2026-03-22'
---

### Features


- Multi-threading services supporting cooperative, priority-based, and preemptive threads with POSIX pthreads compatibility.

- Multiple scheduling algorithms including Earliest Deadline First (EDF) and Meta IRQ for interrupt bottom-half behavior.

- Configurable memory protection including stack-overflow protection, kernel object permission tracking, and thread isolation.

- Native, fully-featured networking stack supporting IPv4/IPv6, LwM2M, and BSD sockets.

- Comprehensive Bluetooth 5.0 Low Energy support with host and controller stacks, including Mesh networking.

- Hardware description via Devicetree to decouple application code from hardware specifics.

- Optimized device driver model for consistent initialization and cross-platform driver reuse.

- Virtual File System (VFS) interface supporting ext2, FatFs, and LittleFS.

- Advanced power management with system-wide and fine-grained device-level policies.

- Compile-time resource definition to minimize memory footprint and improve performance.

- Multi-backend logging framework with support for filtering, object dumping, and panic modes.

- Full-featured shell interface with autocompletion, history, and dynamic sub-commands.

- Non-volatile storage (NVS) and settings subsystem for persistent key-value pair storage.

- Support for Symmetric Multiprocessing (SMP) on multi-core systems.

- Native port (native_sim) for running Zephyr as a native application on Linux, macOS, or Windows for testing.

- Integrated cryptographic libraries and security documentation for building secure embedded applications.

- Extensive library of over 1,000 supported boards and shields.

- Modular subsystem design allowing applications to include only necessary capabilities.



### Architecture

Zephyr is built upon a highly modular, small-footprint kernel designed for resource-constrained environments. The architecture is centered around a microkernel-like design where services are provided as optional modules. It utilizes a unified device driver model that abstracts hardware interactions, allowing for high portability across different SoCs and architectures. A key architectural pillar is the use of **Devicetree (DTS)** to describe hardware topology and **Kconfig** for compile-time configuration, ensuring that only the required code and drivers are included in the final binary image.

The system supports both single-core and **Symmetric Multiprocessing (SMP)** configurations. The kernel provides essential RTOS services such as multi-threading, interrupt management, and inter-thread synchronization (mutexes, semaphores, and message queues). Above the kernel layer, Zephyr includes a rich set of subsystems including a native networking stack, a comprehensive Bluetooth stack, and various file system wrappers, all interacting through standardized APIs to maintain modularity and scalability.

#### Core Components
- **Kernel**: Handles scheduling, threads, and low-level synchronization.
- **Device Driver Model**: Provides a consistent API for interacting with peripherals like GPIO, UART, I2C, and SPI.
- **Networking Subsystem**: A native, fully-featured stack supporting multiple protocols from the physical layer to the application layer.
- **Bluetooth Stack**: Includes both a Host and a Controller implementation for BLE and Mesh.
- **Power Management**: Offers system-wide and device-specific power state control.

### Use Cases

This RTOS is ideal for:

- **IoT Sensors**: Low-power environmental sensors requiring long battery life and secure wireless connectivity (e.g., NB-IoT, LoRaWAN).
- **Wearables**: Smartwatches and fitness trackers that need a small footprint, Bluetooth connectivity, and sophisticated power management.
- **Industrial Automation**: Embedded controllers and gateways requiring deterministic scheduling and support for industrial protocols like CAN and Ethernet.
- **Smart Home Devices**: Connected appliances and lighting systems utilizing Thread or Bluetooth Mesh for reliable local networking.
- **Medical Devices**: Resource-constrained diagnostic tools that benefit from Zephyr's focus on security and memory protection.

### Getting Started

To begin developing with Zephyr, developers should use the **West** tool, Zephyr's multi-purpose command-line utility. The setup process involves installing host dependencies (CMake, Python, Devicetree compiler), initializing a West workspace to clone the Zephyr source and its modules, and installing the **Zephyr SDK**, which contains the necessary cross-compilation toolchains. Once the environment is set up, applications can be built using the `west build` command and flashed to supported hardware via `west flash`. Detailed documentation, including a comprehensive 'Getting Started Guide' and hundreds of code samples, is available at [https://docs.zephyrproject.org](https://docs.zephyrproject.org).
