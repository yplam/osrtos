---
title: LVGL Port for STM32F429 Discovery Kit
summary: A hardware-specific port of the LVGL graphics library for the STM32F429 Discovery
  development board. It features support for the onboard 2.4-inch QVGA TFT, resistive
  touch, and utilizes the STM32 DMA2D (Chrom-ART) GPU for accelerated rendering in
  a bare-metal environment.
slug: lvgl-port-for-stm32f429-discovery-kit
codeUrl: https://github.com/lvgl/lv_port_stm32f429_disco
siteUrl: https://lvgl.io
star: 95
version: v8.0.0
lastUpdated: '2021-08-23'
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
- lvgl-port-for-stm32f769-discovery
- lvgl-demo-embarcadores
- lvgl-port-for-m5stack-core2
- lvgl-port-for-arm-cortex-m55-and-mps3-an547
- lvgl-port-for-esp32
- lvgl-port-for-raspberry-pi-pico-mdk-arm
---

## Overview

This project provides a comprehensive port of the Light and Versatile Graphics Library (LVGL) for the STMicroelectronics STM32F429 Discovery kit (32F429IDISCOVERY). It serves as a high-performance reference implementation for developers looking to create sophisticated user interfaces on STM32 microcontrollers without the overhead of a real-time operating system (RTOS).

The STM32F429 Discovery kit is a popular platform for graphical applications due to its integrated 2.4" QVGA TFT LCD and its powerful 180 MHz ARM Cortex-M4 core. This port is specifically designed to leverage the hardware features of the board, ensuring smooth animations and responsive touch interactions.

## Key Features

- **Hardware Acceleration**: Full support for the STM32 DMA2D (Chrom-ART) GPU, which offloads pixel blending and color conversion tasks from the CPU.
- **Display Integration**: Pre-configured drivers for the 240x320 QVGA TFT display using the LTDC (LCD-TFT Display Controller).
- **Touch Support**: Integrated drivers for the onboard resistive touchscreen controller.
- **Memory Management**: Optimized memory configuration using the 256KB internal RAM and providing options for external SDRAM placement for frame buffers.
- **Bare-Metal Performance**: Designed as a "no-OS" project, maximizing performance by eliminating context-switching overhead.

## Technical Implementation

The project is built using STM32 CubeMX drivers for peripheral initialization and is compatible with the STM32CubeIDE environment. The core of the hardware abstraction layer resides in the `hal_stm_lvgl` directory, which contains the specific implementations for the display (`tft.c`) and input devices (`touchpad.c`).

### Graphics Configuration

In the `lv_conf.h` file, the project is configured for 16-bit color depth (RGB565), which is the native format for the display controller. The DMA2D engine is enabled via `LV_USE_GPU_STM32_DMA2D`, allowing LVGL to perform fast area fills and image blending. Users can further customize the port by enabling or disabling external SDRAM placement for the frame buffers to balance between performance and power consumption.

### Memory Layout

The project includes a custom linker script (`LinkerScript.ld`) tailored for the STM32F429ZI, defining the 2048KB Flash and 192KB RAM boundaries. It also accounts for the CCMRAM (Core Coupled Memory), which can be used for performance-critical data structures.

## Getting Started

To use this port, developers should clone the repository with submodules to ensure the LVGL core library and demos are included:

```bash
git clone https://github.com/lvgl/lv_port_stm32f429_disco.git --recurse-submodules
```

Once cloned, the project can be imported directly into STM32CubeIDE. The repository includes pre-configured debug launch settings and a variety of LVGL demos (widgets, benchmark, and stress tests) that can be enabled in `lv_demo_conf.h` to verify hardware performance.
