---
title: IoTJS-Plus-TizenRT
summary: A lightweight RTOS-based platform designed for low-end IoT devices, featuring
  a Docker-based build environment and support for multiple architectures including
  ESP32, STM32, and ARTIK. It integrates IoT.js to enable JavaScript-based application
  development on embedded hardware.
slug: iotjs-plus-tizenrt
codeUrl: https://github.com/SKKU-ESLAB/IoTJS-Plus-TizenRT
star: 14
lastUpdated: '2020-08-25'
rtos: tizenrt
libraries:
- nanopb
topics:
- cortex-m
- engine
- internet-of-things
- javascript
- tizenrt
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- lua-rtos-for-esp32
- iot-framework-for-nodemcu
- openthread-rtos
- rtox-iot-development-platform
- phoenix-rtos-project
- onesdk-a-unified-ai-access-sdk-for-the-client-side
---

TizenRT is a lightweight, RTOS-based platform specifically engineered for low-end Internet of Things (IoT) devices. Originally developed by Samsung, this repository represents a specialized version that integrates IoT.js capabilities into the TizenRT ecosystem. The platform provides a robust environment for developers to build, configure, and deploy firmware to a variety of microcontrollers and SoCs while maintaining a small footprint suitable for resource-constrained hardware.

## Build System and Environment

One of the standout features of TizenRT is its developer-friendly build system. It leverages Docker to provide a pre-configured environment, eliminating the need for manual toolchain installation. Developers can use the interactive `dbuild.sh` tool to navigate board selection, configuration sets, and build options through a menu-driven interface. 

For advanced users, a command-line configuration script (`configure.sh`) and standard `make` workflows (via `menuconfig`) are available. This flexibility allows for both rapid prototyping and deep customization of the kernel and system services.

## Hardware Support and Emulation

TizenRT boasts extensive support for popular IoT hardware across different manufacturers. Supported boards include:

*   **Samsung ARTIK series**: 053, 053S, and 055S
*   **Espressif Systems**: ESP32-DevKitC and ESP-WROVER-KIT
*   **STMicroelectronics**: STM32F407-DISC1, STM32F429I-DISCO, and STM32L4R9AI-DISCO
*   **NXP**: i.MX RT 1020 and 1050 EVK
*   **Cypress**: CY4390X
*   **QEMU**: Full support for emulation, allowing developers to test logic without physical hardware.

## Technical Architecture

The project is structured to separate the core operating system from applications and external dependencies. The `os` directory contains the kernel logic, while the `framework` directory provides middleware and system services. External libraries such as `nanopb` for protocol buffers and `libsodium` for security are integrated via submodules, ensuring that the platform remains extensible.

This specific version of TizenRT focuses on the integration of IoT.js. By including IoT.js as a core component, the platform allows developers to run JavaScript applications directly on the RTOS. This bridges the gap between high-level web technologies and low-level embedded systems, enabling faster development cycles for IoT edge devices that require network connectivity and complex logic.

## Getting Started

To begin development, the recommended path is using the provided Docker image. The workflow typically follows these steps:

1.  **Configuration**: Use `./tools/configure.sh <board>/<configuration_set>` to set up the build environment for a specific target.
2.  **Customization**: Optionally run `./dbuild.sh menuconfig` to fine-tune kernel features.
3.  **Compilation**: Execute `./dbuild.sh` to generate the binary images.
4.  **Programming**: Use `./dbuild.sh download` to flash the resulting binaries to the connected hardware.

Built binaries are conveniently located in the `build/output/bin` directory, ready for deployment or further testing in the QEMU emulator.
