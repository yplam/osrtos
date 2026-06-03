---
title: LittlevGL2RTT
summary: A middleware integration layer that seamlessly embeds the LittlevGL (LVGL)
  graphics library into the RT-Thread RTOS LCD framework. It eliminates the need for
  manual porting by providing a ready-to-use bridge between LVGL and RT-Thread's device
  drivers, supporting various input devices and display resolutions.
slug: littlevgl2rtt
codeUrl: https://github.com/liu2guang/LittlevGL2RTT
star: 157
version: 0.0.1
lastUpdated: '2021-04-15'
rtos: rt-thread
libraries:
- lvgl
topics:
- env
- littlevgl
- rt-thread
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-for-embedded-linux
- lvgl-port-for-esp32
- freertos-wrapper-for-rt-thread
- rt-thread-fbtft-framebuffer-drivers-for-tft-lcds
- lvgl-rust-bindings
- rt-u8g2-u8g2-graphics-library-for-rt-thread
---

## Overview

LittlevGL2RTT is a specialized intermediate framework layer designed to bridge the LittlevGL (now known as LVGL) graphics library with the RT-Thread real-time operating system (version 3.0 and above). The primary goal of this project is to provide a seamless, "plug-and-play" experience for developers looking to implement sophisticated graphical user interfaces on RT-Thread without the overhead of manual porting and driver adaptation.

By leveraging RT-Thread's standard LCD framework, LittlevGL2RTT allows the GUI library to interact directly with the OS-level display drivers. This abstraction ensures that as long as the underlying hardware has a working RT-Thread LCD driver, LVGL can be deployed with minimal configuration.

## Key Features

- **Seamless Integration**: Automatically binds LVGL to the RT-Thread LCD device framework.
- **Input Device Support**: Includes built-in support for input interfaces, tested with hardware such as the GT911 touch controller and QEMU mouse emulation.
- **RT-Thread Package Management**: Fully integrated into the RT-Thread online package system, allowing for easy installation and updates via `menuconfig` and `pkgs` tools.
- **Flexible Configuration**: Supports custom display resolutions and color depths (primarily tested in 16-bit mode).
- **Development Environment Ready**: Optimized for popular platforms like the NXP i.MX RT1050 and simulation environments like QEMU.

## Technical Implementation

The project consists of a core adaptation layer (`littlevgl2rtt.c`) that handles the initialization of LVGL and the registration of display and input drivers. It utilizes the SCons build system common in the RT-Thread ecosystem, making it easy to include in existing BSPs (Board Support Packages).

One important technical note for developers using the Keil MDK environment: because LVGL utilizes anonymous structures, specific compiler flags (`--gnu -g -W`) must be added to the project settings to ensure successful compilation.

## Getting Started

Since LittlevGL2RTT is an official RT-Thread package, the setup process is streamlined through the Env tool:

1. Open `menuconfig` in your RT-Thread environment.
2. Navigate to `RT-Thread online packages` -> `system packages`.
3. Enable `LittlevGL2RTT`, select the latest version, and configure your screen resolution.
4. Enable the demo option if you wish to see a functional example immediately.
5. Run `pkgs --update` to fetch the source code into your project.
6. Generate your project files (e.g., `scons --target=mdk5`) and compile.

## Hardware and Compatibility

The library has been primarily developed and validated on the Fire i.MX RT1050 board featuring an 800x480 LCD and GT911 touch input. It also maintains high compatibility with the QEMU emulator, providing a robust path for developers to prototype their GUIs on a PC before deploying to physical hardware.
