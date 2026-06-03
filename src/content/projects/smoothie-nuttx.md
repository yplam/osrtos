---
title: Smoothie-NuttX
summary: A customized distribution of the NuttX real-time operating system specifically
  preconfigured for the Smoothie-v2 motion control firmware. It includes integrated
  drivers and board configurations for hardware platforms like the Bambino-200E and
  SmoothieV2 Mini Alpha.
slug: smoothie-nuttx
codeUrl: https://github.com/Smoothieware/smoothie-nuttx
star: 10
lastUpdated: '2018-04-01'
rtos: nuttx
topics:
- nuttx
- smoothie
- smoothie-nuttx
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-m-nuttx-custom-board-mod
- nuttx-rtos-experiments
- nuttx-applications
- smoothieware-for-stm32
- hynitron-cst816s-touch-controller-driver-for-apache-nuttx
- apache-nuttx-rtos-for-pinephone
---

## Overview

Smoothie-NuttX is a specialized version of the NuttX real-time operating system (RTOS) tailored for the Smoothie-v2 project. Smoothie is well-known in the open-source community as a powerful motion control firmware for 3D printers, CNC machines, and laser cutters. To support the advanced requirements of version 2, the project leverages NuttX to provide a robust, POSIX-compliant environment on embedded hardware.

This repository serves as a preconfigured foundation, ensuring that all necessary drivers and kernel settings required for Smoothie to operate are correctly set up out of the box. By maintaining this specific version, the Smoothie team provides a stable and reproducible build environment for developers working on the next generation of motion control hardware.

## Hardware Support

The project is designed to support specific hardware targets used in the Smoothie ecosystem. The configuration tools included in the repository are optimized for:

- **Bambino-200E**: A development platform often used in the evolution of Smoothie hardware.
- **SmoothieV2 Mini Alpha**: The early-stage hardware for the compact version of the Smoothie-v2 controller.

## Technical Configuration

Because NuttX is a highly modular RTOS, configuring it from scratch can be a complex task. Smoothie-NuttX simplifies this by providing pre-baked configuration scripts. These scripts handle the selection of file systems, network stacks, and device drivers that the Smoothie firmware depends on. 

The repository follows the standard NuttX directory structure, containing both the kernel (`nuttx`) and the application space (`apps`). This allows developers to build the entire system and export it as a library that can then be linked against the main Smoothie-v2 application code.

## Getting Started with the Build System

The build process utilizes the standard NuttX configuration tools. Developers typically navigate to the tools directory to apply a specific board configuration before compiling. For example, configuring for the Bambino-200E involves running the configuration script with the `smoothiedev` profile. Once configured, the system is compiled and exported into a portable ZIP file (`nuttx-export.zip`), which contains the headers and libraries needed for external firmware development.

This workflow allows the Smoothie-v2 firmware to remain decoupled from the underlying OS source code while still benefiting from a tightly integrated and optimized RTOS kernel.
