---
title: Pinnacle 100 Out of Box Demo Manifest
summary: A manifest repository for the Pinnacle 100 Out of Box (OOB) Demo firmware
  based on the Zephyr RTOS. It manages dependencies for the Laird Connectivity Pinnacle
  100 module, which integrates LTE-M/NB-IoT and Bluetooth Low Energy using the West
  build tool.
slug: pinnacle-100-out-of-box-demo-manifest
codeUrl: https://github.com/LairdCP/Pinnacle_100_OOB_Demo_Manifest
star: 2
version: v3.0.1
lastUpdated: '2022-02-24'
rtos: zephyr
topics:
- firmware
- zephyr
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- sentrius-mg100-gateway-firmware
- west-the-zephyr-rtos-meta-tool
- pelion-device-management-client-example-for-mbed-os
- anjay-zephyr-client
- blue-clover-plt-demo-v2-zephyr-firmware
- mender-ota-example-for-stm32l4-and-zephyr-rtos
---

## Overview

The Pinnacle 100 Out of Box (OOB) Demo Manifest repository serves as the central configuration point for building the demonstration firmware for the Laird Connectivity Pinnacle 100 module. The Pinnacle 100 is a unique hardware platform that combines the power of the Nordic Semiconductor nRF52840 (Bluetooth 5) with the Sierra Wireless HL7800 (LTE-M/NB-IoT), providing a robust solution for cellular IoT applications.

This repository is specifically designed to work with **West**, Zephyr's meta-tool for managing multiple repositories. Instead of containing the source code directly, this manifest defines the specific versions and locations of all dependencies required to build the OOB demo, including the Zephyr RTOS kernel, the nRF Connect SDK (NCS), and various middleware components.

## Technical Architecture

The project is built upon the Zephyr RTOS, specifically targeting version 2.3.x. By utilizing a manifest-based approach, the project ensures that all developers and CI/CD systems use the exact same revisions of the underlying frameworks. 

Key components managed by this manifest include:
- **Zephyr RTOS**: The core real-time operating system.
- **nRF Connect SDK (sdk-nrf)**: Nordic's software suite for nRF52 and nRF91 series devices.
- **Pinnacle 100 OOB Demo Source**: The actual application logic for the demo.
- **Frameworks and Libraries**: Includes the `jsmn` JSON parser and Laird-specific board definitions and framework modules.

## Hardware and Toolchain

The firmware is designed for the Pinnacle 100 module. To ensure successful compilation, the project recommends specific toolchain versions, notably the **GNU Arm Embedded Toolchain (9-2019-q4-major)** and Zephyr SDK v0.11.3 for Linux users. This alignment between the RTOS version and the compiler is critical for stability in embedded environments.

## Getting Started with West

To use this repository, developers utilize the `west` tool to initialize their workspace. The process involves pointing `west` at this manifest repository, which then automatically pulls down the correct versions of the Zephyr kernel and the nRF Connect SDK. 

```bash
# Initialize the workspace
west init -m https://github.com/LairdCP/Pinnacle_100_OOB_Demo_Manifest.git

# Pull all source code described in the manifest
west update
```

## Important Note

This specific manifest is currently marked as **not recommended for new designs**. Laird Connectivity has transitioned to a newer firmware manifest structure. Developers starting new projects with the Pinnacle 100 should refer to the updated [Pinnacle 100 Firmware Manifest](https://github.com/LairdCP/Pinnacle-100-Firmware-Manifest) for the latest features and long-term support.
