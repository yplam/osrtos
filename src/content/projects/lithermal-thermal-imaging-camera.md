---
title: LiThermal Thermal Imaging Camera
summary: An open-source thermal imaging camera project based on the Allwinner T113-S3
  SoC and the Hikvision TB4117 thermal module. It utilizes Tina Linux for the operating
  system and LVGL for a high-performance graphical user interface, featuring real-time
  temperature analysis and video processing.
slug: lithermal-thermal-imaging-camera
codeUrl: https://github.com/diylxy/LiThermal
siteUrl: https://oshwhub.com/lxu0423/lithermal-thermal-imaging-camera
star: 500
lastUpdated: '2024-12-12'
rtos: ''
libraries:
- lvgl
topics:
- camera
- linux
- lvgl
- pir
isShow: true
image: /202603/lithermal.webp
createdAt: '2026-03-19'
updatedAt: '2026-03-19'
---

## Overview

LiThermal is a sophisticated open-source thermal imaging camera designed for enthusiasts and engineers who require a portable, high-performance thermography tool. The project integrates professional-grade thermal sensing with a modern embedded Linux platform, providing a feature-rich alternative to commercial thermal cameras.

At its core, LiThermal leverages the Allwinner T113-S3, a dual-core Cortex-A7 SoC, to handle the heavy lifting of video decoding and UI rendering. The thermal data is captured using a Hikvision TB4117 module, which is integrated via a custom PCB and processed to provide real-time temperature overlays and visual analysis.

## Technical Architecture

The project is a blend of custom hardware design and advanced embedded software. The hardware stack includes:
- **Main Processor**: Allwinner T113-S3 SoC.
- **Thermal Module**: Hikvision TB4117 (configured in NCM mode).
- **Power Management**: An auxiliary STC8 microcontroller handles power sequencing and battery management to protect the main SoC from voltage irregularities.
- **Display**: A high-resolution screen driven by the T113's display interface.

On the software side, the system runs on **Tina Linux** (an OpenWrt-based distribution for Allwinner chips). The user interface is built using the **LVGL** (Light and Versatile Graphics Library), which allows for a smooth, smartphone-like experience on embedded hardware. The project also utilizes **FFmpeg** libraries (`avcodec`, `avformat`) for video stream handling and **rlottie** for high-quality vector animations within the UI.

## Key Features

- **Real-time Thermal Imaging**: High-frame-rate thermal video with adjustable color palettes.
- **Temperature Analysis**: Automatic tracking of maximum, minimum, and center-point temperatures.
- **Advanced UI**: A polished interface featuring smooth transitions, animations, and intuitive menus powered by LVGL.
- **Custom Power Management**: Dedicated MCU-based power control to ensure system stability and safe shutdown/startup cycles.
- **Connectivity**: Support for MTP (Media Transfer Protocol) for easy file access and ADB for debugging and system configuration.

## Development and Assembly

LiThermal is a high-difficulty DIY project. It requires precision soldering of 0402 components and fine-pitch QFP packages. The software build system uses **CMake** and a cross-compilation toolchain targeting the ARM musl environment. 

Developers can customize the camera's behavior by modifying the LVGL-based application code or adjusting the thermal module's parameters via a network interface. The project documentation provides detailed steps for flashing the STC8 power management firmware, preparing the Tina Linux boot image on a TF card, and configuring the Hikvision module's network settings to ensure proper communication with the T113-S3 host.
