---
title: AIR32F103 Template Project
summary: A comprehensive GCC-based development template for the AIR32F103, MH32F103A,
  and MH2103A series of microcontrollers. It provides a complete build system with
  support for FreeRTOS, LVGL, and uIP, including a specialized startup routine to
  unlock hidden internal RAM.
codeUrl: https://github.com/IOsetting/air32f103-template
siteUrl: https://wiki.luatos.com/chips/air32f103/index.html
isShow: false
rtos: freertos
libraries:
- lvgl
topics:
- gcc-arm-toolchain
- air32f103
- gnu-arm-embedded-toolchain
- jlink
- pyocd
- mh32f103
- mh2103a
- lvgl
- freertos
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- stm32f107-makefile-freertos-template
- stm32-makefile-freertos-project-template
- stm32-base-project-template
- stm32f030-cmake-cmsis-project-skeleton
- stm32l475-freertos-iot-project
- stm32f103rb-templates-and-examples
---

The AIR32F103 series has gained popularity as a high-performance, cost-effective alternative to the ubiquitous STM32F103. To help developers harness the full potential of these chips, the **air32f103-template** repository provides a robust, Makefile-based environment tailored for the GNU Arm Embedded Toolchain. This project is designed to be a one-stop-shop for developers who prefer a lightweight, command-line driven workflow or VSCode integration over heavy IDEs.

### Hardware Support and the "Hidden RAM" Hack

One of the most intriguing aspects of the AIR32F103 family is the presence of "hidden" RAM. While the official datasheets for parts like the AIR32F103CBT6 might specify 32K of RAM, many of these chips actually contain up to 97K. This template includes a specialized startup routine (`startup_air32f10x.s`) that uses special registers to unlock this extra memory, providing a significant boost for memory-intensive applications like GUI rendering or networking.

The template supports several variants in the family:
- **AIR32F103CBT6**: 128K Flash, 32K (up to 97K) RAM
- **AIR32F103CCT6**: 256K Flash, 64K RAM
- **AIR32F103RPT6**: 256K Flash, 96K RAM

### Integrated Libraries and RTOS Support

Beyond simple peripheral drivers, this template integrates several powerful libraries that can be toggled via the Makefile. This makes it easy to scale a project from a simple GPIO toggle to a complex system with a graphical interface and network stack. Key integrations include:

- **FreeRTOS**: A leading real-time operating system for embedded devices.
- **LVGL**: A versatile graphics library for creating beautiful embedded GUIs.
- **uIP**: A lightweight TCP/IP stack for small 8-bit and 16-bit microcontrollers.
- **Helix MP3**: An optimized MP3 decoder library.
- **Waveshare E-Paper**: Drivers for various e-ink display modules.

### Getting Started with the Toolchain

Setting up the project is straightforward for developers familiar with GCC. The Makefile allows you to specify the path to your ARM toolchain and choose your preferred programmer, whether it be J-Link, ST-Link, or DAPLink (via PyOCD). 

To compile the project, you simply configure the options in the Makefile:

```makefile
USE_FREERTOS    ?= y
USE_LVGL        ?= y
ARM_TOOCHAIN    ?= /opt/gcc-arm/arm-gnu-toolchain-12.2.rel1-x86_64-arm-none-eabi/bin
FLASH_PROGRM    ?= stlink
```

Once configured, standard make commands handle the build process:

```bash
# Clean the build directory
make clean
# Compile the project
make
# Flash the firmware to the target device
make flash
```

### Extensive Examples

The repository is packed with examples categorized into `FreeRTOS` and `NonFreeRTOS` folders. These cover everything from basic peripherals like ADC, CAN, and DMA to advanced implementations like LVGL demos and FreeRTOS task management. This structure allows developers to quickly prototype by copying example code into the `User` directory and modifying it to suit their needs.

Whether you are looking to migrate from STM32 or starting a new project on the AIR32 platform, this template provides the necessary scaffolding to move from a blank slate to a functional application with minimal friction.
