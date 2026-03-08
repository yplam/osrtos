---
title: TizenRT
slug: tizenrt
summary: TizenRT is a lightweight, RTOS-based platform designed for low-end IoT devices
  with limited resources, typically equipped with ARM Cortex-M/R processors and less
  than 2MB of RAM. It extends the NuttX kernel with a comprehensive ecosystem including
  Linux-style development environments, advanced networking stacks, and support for
  high-level languages like JavaScript to bridge the gap between RTOS efficiency and
  Linux-like developer experience.
codeUrl: https://github.com/Samsung/TizenRT
siteUrl: https://github.com/Samsung/TizenRT
star: 643
version: 3.0_GBM
lastUpdated: '2026-03-06'
components:
- FileSystem
- Shell
- Database
- Network
- IPv4
- IPv6
- TCP
- UDP
- HTTP
- HTTPS
- MQTT
- CoAP
- LwM2M
- WiFi
- Bluetooth
- BLE
- Audio
- Bootloader
- SecureBoot
- Profiling
- OTA
- gRPC
- SmartFS
- ROMFS
platforms:
- ARM Cortex-M
- ARM Cortex-R
- Xtensa
- QEMU
- AArch32
licenses:
- Apache-2.0
libraries:
- JerryScript
- IoT.js
- IoTivity
- gRPC
- Protobuf
- TinyAlsa
createdAt: '2025-12-24'
updatedAt: '2026-03-08'
---

### Features


- Lightweight kernel based on NuttX providing POSIX and BSD Socket API compliance.

- Docker-based build environment to eliminate manual toolchain and library installation.

- Kconfig-based modular configuration system using menuconfig for granular feature control.

- Dual-stack support for both IPv4 and IPv6 network communication.

- Integrated AraStorage lightweight database specifically designed for IoT sensor data management.

- Native support for IoT protocols including OCF (IoTivity) and LWM2M.

- Lightweight JavaScript environment integration using JerryScript and IoT.js.

- Support for multiple file systems including SmartFS for flash management and ROMFS.

- Interactive dbuild.sh script for menu-driven board selection and sequential build workflows.

- Broad architecture support covering ARM Cortex-M, ARM Cortex-R, and Xtensa.

- Integrated QEMU emulator support for software-based testing and rapid prototyping.

- Automated binary downloading and programming tools for supported hardware platforms.

- Advanced debugging suite including DUMP tools, Ttrace, and global variable profilers.

- Framework-level Task Manager for managing application lifecycles and resource monitoring.

- Built-in support for Samsung SmartThings cloud connectivity.

- Audio subsystem support via TinyAlsa integration.

- Protected build mode offering kernel and user-space separation for enhanced security.



### Architecture

TizenRT is built upon a modular architecture that leverages the **NuttX kernel** as its foundation. This design choice ensures high standard compliance, particularly with **POSIX** and **BSD Socket APIs**, allowing developers familiar with Linux environments to transition easily to embedded development. The system is structured to fit within extremely constrained environments, targeting devices with less than 2MB of RAM and 16MB of Flash memory. 

Beyond the core kernel, TizenRT incorporates a rich set of middleware and framework layers. This includes a comprehensive networking stack (IPv4/IPv6), a specialized IoT database called **AraStorage**, and a dedicated JavaScript engine (**JerryScript/IoT.js**). The architecture supports a "Protected Build" mode, which enforces a strict separation between kernel and user space, enhancing system stability and security by preventing application crashes from impacting the core OS.

#### Core Components
- **Kernel**: Based on NuttX, providing real-time scheduling and standard API compliance.
- **Frameworks**: Includes Task Manager, SmartThings connectivity, and IoT protocol handlers (OCF, LWM2M).
- **Storage**: Features SmartFS for wear-leveling on flash and AraStorage for structured data.
- **Connectivity**: Full TCP/IP stack with support for modern IoT protocols like gRPC and Protobuf.

### Use Cases

This RTOS is ideal for:

- **Smart Home Appliances**: Powering low-end devices like washing machines, refrigerators, or air conditioners that require connectivity without a display.
- **Wearable Devices**: Supporting fitness bands and small-screen wearables that need efficient power management and sensor data processing.
- **IoT Gateways and Sensors**: Collecting, storing, and delivering sensor data using AraStorage and OCF/LWM2M protocols.
- **Industrial IoT**: Deploying on Cortex-M/R based hardware where real-time performance and a small footprint are critical.
- **Cloud-Connected Products**: Integrating directly with the Samsung SmartThings ecosystem for remote monitoring and control.

### Getting Started

To begin developing with TizenRT, the recommended approach is to use the provided **Docker-based build environment**, which pre-packages all necessary toolchains and libraries. Developers can clone the repository and use the interactive `dbuild.sh` script located in the `os` directory to select their target board and configuration. For example, running `./dbuild.sh menu` provides a guided interface for selecting platforms like the **Samsung ARTIK** or **STM32** series. Detailed documentation, including porting guides and API references, can be found in the [TizenRT Wiki](https://github.com/Samsung/TizenRT/wiki) and the `docs` folder of the repository. For software-only evaluation, TizenRT includes full support for the **QEMU emulator**, allowing developers to build and test applications without physical hardware.
