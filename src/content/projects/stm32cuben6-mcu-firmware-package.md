---
title: STM32CubeN6 MCU Firmware Package
summary: A comprehensive embedded software platform for the STM32N6 series microcontrollers.
  It provides HAL and LL drivers, CMSIS modules, and a full middleware stack featuring
  Azure RTOS (ThreadX), USBX, and FileX. The package includes numerous examples and
  applications for STM32N6 evaluation and Nucleo boards.
slug: stm32cuben6-mcu-firmware-package
codeUrl: https://github.com/STMicroelectronics/STM32CubeN6
star: 51
version: v1.3.0
lastUpdated: '2025-11-21'
rtos: threadx
libraries:
- filex
- mcuboot
- eclipse-threadx-levelx
topics:
- stm32
- stm32cube-mcu-package
- stm32n6
isShow: false
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- stm32cubewb0-mcu-firmware-package
- stm32cubeh7rs-mcu-firmware-package
- x-cube-azrtos-h7-azure-rtos-software-expansion
- x-cube-azrtos-wb-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-f7-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g4-azure-rtos-software-expansion-for-stm32cube
---

The STM32CubeN6 MCU Firmware Package is the definitive software resource for developers working with STMicroelectronics' high-performance STM32N6 series. As part of the STM32Cube ecosystem, it provides a structured and scalable approach to embedded development, offering a comprehensive suite of drivers, middleware, and example projects that significantly reduce time-to-market.

### Architecture and Drivers

The package is built on a multi-tier architecture designed to balance portability with performance. At the foundation are the CMSIS (Cortex Microcontroller Software Interface Standard) modules, which provide a standardized hardware abstraction for the Arm Cortex-M core implemented in the STM32N6 products.

Building upon this foundation, the package offers two distinct sets of drivers:
- **Hardware Abstraction Layer (HAL):** These drivers provide a high-level, feature-oriented set of APIs. They are designed to be highly portable, allowing developers to reuse code across different STM32 series with minimal changes.
- **Low-Layer (LL) Drivers:** For developers who need to maximize performance or minimize the memory footprint, the LL drivers provide a fast, light-weight, and expert-oriented layer that is much closer to the hardware registers.

Both driver sets are MISRA-C:2012 compliant and have been reviewed with static analysis tools to ensure high code quality and reliability.

### Integrated Middleware Stack

One of the most powerful aspects of STM32CubeN6 is its deep integration of the Azure RTOS suite. This provides a professional-grade middleware stack that includes:
- **ThreadX:** A highly reliable and deterministic real-time operating system.
- **NetX Duo:** An advanced, industrial-grade IPv4 and IPv6 network stack.
- **FileX and LevelX:** Comprehensive solutions for file system management and NAND/NOR flash wear leveling.
- **USBX:** A high-performance USB host and device stack supporting various classes.

In addition to the RTOS components, the package incorporates essential security and utility libraries. It features mbed-TLS for secure communications and mcuboot for secure boot operations, ensuring that security is a first-class citizen in the development process. For multimedia applications, it includes an Image Signal Processing (ISP) library and support for hardware-accelerated video encoding.

### Hardware Support and Ecosystem

STM32CubeN6 is specifically tailored for the STM32N6 series, including support for the STM32N6570-DK Discovery Kit and the NUCLEO-N657X0-Q board. The repository includes a wide array of software projects, including:
- **Examples:** Focused demonstrations of specific peripheral features.
- **Applications:** Complex projects showing how to integrate multiple middleware components.
- **Demonstrations:** Full-featured applications that showcase the capabilities of the evaluation boards.

The package is designed to work seamlessly with popular development toolchains, including STM32CubeIDE, IAR Embedded Workbench (EWARM), and Keil Microcontroller Development Kit (MDK-ARM).

### Getting Started

The repository is managed using Git submodules to ensure that all components are perfectly synchronized. To get started, developers should clone the repository recursively to collect all submodules:

```bash
git clone --recursive https://github.com/STMicroelectronics/STM32CubeN6.git
```

This ensures that all linked modules, including the HAL drivers and middleware, are downloaded correctly. The package is fully compatible with STM32CubeMX, allowing for graphical configuration and code generation, further simplifying the initial setup of complex projects.
