---
title: LVGL Port for STM32F769 Discovery
summary: A professional port of the LVGL graphics library to the STM32F769 Discovery
  kit. It provides a complete hardware abstraction layer for the board's 4-inch capacitive
  touch LCD, SDRAM, and MIPI-DSI interface.
slug: lvgl-port-for-stm32f769-discovery
codeUrl: https://github.com/lvgl/lv_port_stm32f769_disco
siteUrl: https://lvgl.io
star: 41
version: v7.0.0
lastUpdated: '2025-12-15'
rtos: ''
libraries:
- lvgl
topics:
- gui
- lvgl
- stm32
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-port-for-stm32f429-discovery-kit
- lvgl-port-for-esp32
- lvgl-port-for-m5stack-core2
- lvgl-demo-embarcadores
- lvgl-port-for-windows
- lvgl-port-for-raspberry-pi-pico-mdk-arm
---

The `lv_port_stm32f769_disco` repository provides a ready-to-use implementation of the LVGL (Light and Versatile Graphics Library) for the STM32F769 Discovery kit. This board is a high-performance evaluation platform featuring the ARM Cortex-M7 based STM32F769NIH6 microcontroller, which is particularly well-suited for advanced graphical user interfaces thanks to its integrated Chrom-ART Accelerator and MIPI-DSI interface.

## Hardware Integration

The port leverages the rich peripheral set of the Discovery kit to provide a smooth graphical experience. Key hardware features supported include:

- **4-inch Capacitive Touch LCD**: Utilizing the MIPI-DSI connector for high-bandwidth display data transfer.
- **STM32F769NIH6 MCU**: Running at high clock speeds with 2MB of Flash and 512KB of RAM.
- **External SDRAM**: The 128-Mbit SDRAM is used to provide ample space for frame buffers and LVGL's internal memory pool.
- **Touch Controller**: Integrated support for the capacitive touch panel via I2C.

## Software Architecture

This project is structured to work seamlessly with the STM32Cube ecosystem. It includes the necessary STM32 HAL (Hardware Abstraction Layer) drivers and CMSIS components. The core of the port resides in the `hal_stm_lvgl` directory, which contains the display and input device drivers that bridge LVGL's generic drawing commands to the STM32's LTDC and DSI peripherals.

The configuration is optimized for LVGL v9, as seen in the `lv_conf.h` file. It is configured for 16-bit color depth (RGB565) and uses a 64KB internal memory pool for LVGL's allocations. While the current configuration is set to run without an RTOS (`LV_OS_NONE`), the underlying hardware is fully capable of supporting FreeRTOS or other real-time operating systems if the user chooses to integrate them.

## Getting Started

The project supports multiple build environments, including STM32CubeIDE and a CMake-based workflow. To get started, users should clone the repository with submodules to ensure the LVGL core library is included:

```bash
git clone https://github.com/lvgl/lv_port_stm32f769_disco.git --recurse-submodules
```

For command-line builds, a `build.sh` script is provided which uses CMake and Ninja to compile the project into an ELF and binary format. The project also includes a `.cproject` file for direct import into STM32CubeIDE, making it accessible for developers who prefer a traditional IDE experience.

## Performance Features

The port is designed to demonstrate the capabilities of the STM32F7 series. By using the MIPI-DSI interface and dedicated hardware acceleration, it can achieve high frame rates even with complex UI elements. The inclusion of the LVGL demo suite allows users to immediately benchmark the system's performance and explore various widget types, from simple buttons to complex charts and lists.
