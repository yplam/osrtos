---
title: Blue Clover PLT Demo V2 Zephyr Firmware
summary: A Zephyr-based firmware implementation for the Blue Clover PLT Demo Board
  (v2), targeting the nRF52832 microcontroller. It serves as a reference platform
  for production line testing and hardware demonstration within the Zephyr RTOS ecosystem.
slug: blue-clover-plt-demo-v2-zephyr-firmware
codeUrl: https://github.com/bcdevices/ly10-zephyr-fw
siteUrl: https://docs.pltcloud.com/acc/pltdemov2/
star: 8
version: v0.5.0
lastUpdated: '2025-02-20'
rtos: zephyr
topics:
- firmware
- nrf52
- plt
- zephyr
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- ruuvitag-firmware-for-zephyr-os
- mender-ota-example-for-stm32l4-and-zephyr-rtos
- openhaystack-zephyr-firmware
- anjay-zephyr-client
- sensilo-ble-sensor-node
- nrf54l15-connect-kit
---

## Overview

The ly10-zephyr-fw project provides a comprehensive firmware implementation for the Blue Clover PLT Demo Board (v2). Built on the Zephyr Real-Time Operating System (RTOS), this firmware is designed to showcase the capabilities of the PLT Demo hardware while providing a robust foundation for production line testing (PLT) workflows. The project specifically targets the Nordic Semiconductor nRF52832 SoC, leveraging Zephyr's hardware abstraction layers to manage the board's peripherals and connectivity features.

## Hardware and Platform Support

The firmware is optimized for the Blue Clover PLT Demo Board (v2), a versatile development and testing platform. The primary target is the nRF52832, an ARM Cortex-M4 based microcontroller with integrated 2.4 GHz transceiver support. Because it is built on Zephyr, the project benefits from a standardized driver model and configuration system (Devicetree and Kconfig), making it a valuable reference for developers working with Nordic-based IoT devices.

## Technical Architecture

This project utilizes Zephyr version 3.0.0, ensuring a stable and well-documented environment. The build system is highly automated, utilizing a Makefile to orchestrate complex tasks such as environment setup, compilation, and artifact generation. 

One of the standout features of the repository is its containerized build approach. By providing a Dockerfile and specific `make docker` targets, the project ensures that developers can achieve reproducible builds regardless of their host operating system (macOS or Linux). This eliminates the common "it works on my machine" issues associated with embedded toolchains and SDK versions.

## Key Features

- **Zephyr RTOS Integration**: Full utilization of the Zephyr ecosystem, including its build tool `west` and configuration management.
- **Production-Ready Workflow**: Includes integration with PLT Cloud for firmware deployment and versioning, reflecting its role in professional manufacturing environments.
- **Automated Versioning**: Features a `GIT-VERSION-GEN` script to automatically handle version tagging based on Git metadata.
- **Multi-Platform Build Support**: Detailed instructions and scripts for building on Linux and macOS, with a focus on the GNU Arm Embedded Toolchain.

## Getting Started

The project is designed to be accessible through multiple build paths. For those preferring a local setup, the repository includes a `make prereq` target that automates the installation of the Zephyr SDK and necessary Python dependencies. Alternatively, the Docker-based workflow allows for immediate compilation into the `dist/` directory, which contains the resulting `.hex`, `.elf`, and `.map` files.

For developers looking to simulate the hardware before deploying to physical boards, the project is compatible with Renodepedia, providing a cloud-based simulator for the Blue Clover PLT Demo V2. This allows for rapid testing of firmware logic in a virtualized nRF52832 environment.
