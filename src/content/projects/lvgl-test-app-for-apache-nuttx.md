---
title: LVGL Test App for Apache NuttX
summary: A simplified test application for the LVGL graphics library running on the
  Apache NuttX RTOS. It provides drivers and configuration for display and touch input
  on hardware like the Pine64 PineDio Stack BL604 and ESP32.
slug: lvgl-test-app-for-apache-nuttx
codeUrl: https://github.com/lupyuen/lvgltest-nuttx
siteUrl: https://lupyuen.github.io/articles/pinedio2
star: 1
lastUpdated: '2022-08-19'
rtos: nuttx
libraries:
- lvgl
topics:
- lvgl
- nuttx
- pinecone
- pinedio
- riscv32
- st7789
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- st7789-and-lvgl-demo-for-apache-nuttx-rtos
- lvgl-terminal-for-pinephone-on-apache-nuttx
- rust-test-app-for-apache-nuttx-os
- zig-lvgl-touchscreen-app-on-apache-nuttx-rtos
- bl602-adc-and-temperature-sensor-test-app
- lora-test-app-for-semtech-sx1262-and-apache-nuttx
---

## Overview

The LVGL Test App for Apache NuttX is a specialized application designed to demonstrate and test the LVGL (Light and Versatile Graphics Library) on embedded systems running the NuttX RTOS. This project serves as a simplified version of the standard LVGL demo, specifically optimized for the Pine64 PineDio Stack BL604, a RISC-V based IoT development board. 

By providing a streamlined implementation, this repository helps developers verify their display and touch panel drivers within the NuttX environment. It includes essential components for framebuffer management, LCD interfacing, and touch input calibration, making it a valuable reference for anyone porting LVGL to new NuttX-supported hardware.

## Hardware and Platform Support

While the primary focus of this project is the Pine64 PineDio Stack BL604 (based on the Bouffalo Lab BL604 RISC-V SoC), the application is designed with portability in mind. It includes configuration instructions and support for:

- **PineDio Stack BL604**: Full support including touch panel drivers.
- **BL602 / BL604**: Generic configurations for the BL602 series.
- **ESP32**: Support for ESP32-DevKitC and similar modules.

The project integrates directly into the NuttX build system, allowing users to select the application via `menuconfig` and compile it as part of a standard NuttX firmware image.

## Technical Implementation

The repository contains several key source files that bridge the gap between the LVGL library and the underlying NuttX hardware drivers:

- **Display Drivers**: `fbdev.c` and `lcddev.c` provide the interface to the NuttX framebuffer and LCD character devices. These files handle the flushing of LVGL's internal buffers to the physical display.
- **Touch Input**: `tp.c` implements the touch panel interface, while `tp_cal.c` provides a calibration routine. This is particularly important for resistive touchscreens that require coordinate mapping.
- **Application Logic**: `lvgltest.c` initializes the LVGL library, registers the display and input drivers, and starts the demo tasks.

## Configuration and Usage

Integration into a NuttX project is handled through the standard `Kconfig` and `Makefile` system. Users can configure various parameters such as display buffer size, double buffering, and asynchronous flushing. The application also supports different LVGL demo modes, including widgets, benchmarks, and stress tests.

To run the application, users simply enable it under the "Application Configuration" → "Examples" menu in `menuconfig`. Once the firmware is flashed, the app can be launched from the NuttX Shell (NSH) using the command:

```bash
lvgltest
```

This project is an excellent starting point for developers looking to implement graphical user interfaces on low-power RISC-V or ESP32 hardware using a robust, real-time operating system like Apache NuttX.
