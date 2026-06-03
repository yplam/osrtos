---
title: NXP i.MX RT Development Platform
summary: A comprehensive development platform for NXP i.MX RT crossover processors
  based on Arm Cortex-M cores. It integrates with the PlatformIO ecosystem to provide
  build systems, toolchain management, and debugging support for frameworks like Zephyr
  and Mbed OS.
slug: nxp-i-mx-rt-development-platform
codeUrl: https://github.com/platformio/platform-nxpimxrt
siteUrl: https://docs.platformio.org/page/platforms/nxpimxrt.html
star: 10
version: v7.3.0
lastUpdated: '2025-10-23'
rtos: zephyr
topics:
- mbed
- nxp
- platformio
- platformio-platform
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rtox-iot-development-platform
- i-mx-rt-cpu-support-package-for-crossworks
- enterprise-stm32-platform-development
- nuttx-development-docker-environment
- zephyr-sdk
- zj-ble-rt-thread-and-nimble-for-nordic-nrf52
---

The NXP i.MX RT series represents a unique class of "crossover" processors. These devices bridge the gap between traditional microcontrollers (MCUs) and high-performance applications processors. By featuring powerful Arm Cortex-M cores, they deliver the real-time responsiveness and ease of use associated with MCUs while providing the performance levels typically reserved for more complex SoCs. This platform is designed to support next-generation IoT applications with a high level of integration and security.

### Framework and RTOS Support

The `platform-nxpimxrt` repository is the official PlatformIO integration for these processors. It allows developers to leverage the PlatformIO ecosystem to build, upload, and debug applications for a wide range of i.MX RT-based boards. One of the primary strengths of this platform is its built-in support for industry-standard frameworks:

- **Zephyr RTOS**: A scalable, secure, and robust real-time operating system for resource-constrained devices. The platform handles Zephyr's complex dependency management, including the `west` tool and device tree compiler (`dtc`).
- **Mbed OS**: An open-source embedded operating system designed specifically for the "Internet of Things," providing a high-level C++ API.

### Advanced Debugging and Tooling

The platform includes sophisticated logic to configure debugging sessions automatically. It supports a variety of hardware debug probes and protocols, ensuring a smooth development experience from code to silicon. Supported tools include:

- **J-Link**: Integrated support for SEGGER J-Link GDB servers with automatic device ID detection.
- **CMSIS-DAP**: Support via both OpenOCD and pyOCD, depending on the specific board configuration.
- **BlackMagic Probe**: Direct support for the BlackMagic ecosystem.

The build system automatically adjusts toolchain versions and optional packages based on the selected framework. For instance, when using Zephyr, the platform ensures that CMake, Ninja, and the Device Tree Compiler are available in the environment. It also manages the GCC ARM None EABI toolchain, ensuring compatibility across different framework versions.

### Configuration and Usage

To use this platform, developers define their environment in the `platformio.ini` file. A basic configuration for a stable release looks like this:

```ini
[env:nxp_board]
platform = nxpimxrt
board = ...
framework = zephyr
```

For developers who need the bleeding edge, the development version can be sourced directly from the GitHub repository. The platform's flexibility makes it an ideal choice for high-performance embedded projects that require a balance of real-time functionality and MCU-level usability.
