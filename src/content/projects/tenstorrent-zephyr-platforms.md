---
title: Tenstorrent Zephyr Platforms
summary: The official Zephyr RTOS firmware repository for Tenstorrent AI hardware.
  It provides comprehensive platform support, custom drivers, and application frameworks
  for Tenstorrent's AI ULC products, leveraging a specialized Zephyr fork.
slug: tenstorrent-zephyr-platforms
codeUrl: https://github.com/tenstorrent/tt-zephyr-platforms
siteUrl: https://docs.tenstorrent.com/tt-zephyr-platforms/develop/getting_started/index.html
star: 29
version: v19.4.2
lastUpdated: '2025-12-08'
rtos: zephyr
libraries:
- mcuboot
- nanopb
topics:
- firmware
- tenstorrent
- zephyr
isShow: false
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- tenstorrent-system-firmware
- zephyr-rtos-ai-harness
- swedish-embedded-platform-sdk
- bridle
- blue-clover-plt-demo-v2-zephyr-firmware
- awesome-zephyr-rtos
---

Tenstorrent Zephyr Platforms serves as the central firmware development hub for Tenstorrent's AI hardware ecosystem. By leveraging the Zephyr Real-Time Operating System (RTOS), this project provides a robust, scalable foundation for managing the complex requirements of AI ULC (Ultra-Low-Cost) devices.

The repository is structured as a Zephyr workspace, utilizing the `west` meta-tool to manage dependencies and build configurations. It incorporates a specialized fork of the Zephyr kernel, tailored to the specific architectural needs of Tenstorrent's silicon, including support for platforms like Blackhole and various P-series boards such as the P100A, P150A, and P300A.

### Core Architecture and Components

The project follows the standard Zephyr directory structure but extends it with Tenstorrent-specific modules and configurations. Key areas of the repository include:

- **Boards and SoC Support**: Contains definitions for Tenstorrent's proprietary hardware, ensuring the RTOS can correctly initialize and manage the underlying silicon.
- **Custom Drivers**: Implements hardware-specific drivers necessary for AI acceleration, power management, and inter-processor communication.
- **Library Integration**: The environment integrates several critical embedded libraries, including `librpmi` for Remote Processor Messaging, `mbedtls` for security, and `mcuboot` for secure bootloading capabilities.

### Development and Testing

Quality assurance is a primary focus of the repository, as evidenced by its extensive CI/CD pipelines. The project utilizes Zephyr's native testing tools to maintain high software standards:

- **Twister**: Used for orchestrating test execution across different platforms and configurations.
- **Ztest**: The framework of choice for writing unit tests to ensure firmware reliability.
- **Hardware-in-the-loop (HIL)**: The repository includes workflows for "Smoke" and "Soak" tests on actual hardware, ensuring that firmware updates remain stable under real-world conditions and long-term operation.

### Getting Started

Developers working with Tenstorrent hardware can use this repository to build and flash firmware. The environment is managed via `west`, which handles the fetching of the `tt-zephyr` fork and other necessary modules like `hal_stm32` and `nanopb`. The inclusion of the Zephyr Shell provides an interactive command-line interface directly on the target hardware, facilitating real-time debugging and system inspection.

For those looking to contribute or develop on these platforms, Tenstorrent provides detailed documentation covering environment setup, building, and flashing procedures. The project is licensed under the Apache-2.0 software license, with additional binary artifacts provided under specific terms.
