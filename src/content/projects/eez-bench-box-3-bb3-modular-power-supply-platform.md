---
title: EEZ Bench Box 3 (BB3) Modular Power Supply Platform
summary: An open-source modular Test and Measurement platform centered around an STM32F769
  ARM Cortex-M7 MCU. It provides a complete hardware and software framework for modular
  power supplies and data acquisition, supporting visual programming via EEZ Flow,
  SCPI commands, and MicroPython scripting.
slug: eez-bench-box-3-bb3-modular-power-supply-platform
codeUrl: https://github.com/eez-open/modular-psu
siteUrl: https://www.envox.eu/studio/studio-introduction
star: 357
version: '2.0'
lastUpdated: '2024-12-16'
rtos: ''
libraries:
- micropython
topics:
- diy-solutions
- eez-dib
- micropython
- mqtt
- power-supply
- scpi
- stm32
- tft-display
isShow: true
image: /202512/eez_bb3_chassis.webp
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
---

## Overview

The EEZ Bench Box 3 (BB3) represents a significant advancement in open-source Test and Measurement (T&M) equipment. Designed to bridge the gap between DIY hobbyist tools and professional-grade benchtop instruments, the BB3 is a modular framework that allows users to build a customized power supply and data acquisition system. It is the successor to the well-regarded EEZ H24005 project, expanding on its predecessor's capabilities with a more powerful processor, a modular backplane, and a sophisticated software ecosystem.

At its heart, the BB3 is built on the EEZ DIB (Digital Interface Board) specification, which facilitates communication between a central controller and various peripheral modules. This modularity allows the system to be expanded beyond simple power delivery to include multi-channel temperature sensors, data loggers, switch matrices, and function generators.

## Hardware Architecture

The system is composed of several specialized boards that work in tandem:

*   **MCU Board**: Powered by the STM32F769IIT6, a high-performance 32-bit ARM Cortex-M7 microcontroller. This board handles the heavy lifting, including the graphical user interface, network stack, and module management.
*   **BP3C Backplane**: The backbone of the system, providing power distribution and signal routing for up to three modules.
*   **AUX Power Supply**: Manages AC input protection, soft-start circuitry, and provides the necessary DC rails (+5V and +12V) for the internal logic and cooling fans.
*   **Peripheral Modules**: The system initially supports modules like the DCP405, a precision 0-40V / 5A DC power source, with many more T&M modules in development.

The entire assembly is housed in a professional metal enclosure featuring a 4.3" TFT LCD touchscreen, providing a rich and intuitive local interface for the user.

## Software and Automation

What sets the BB3 apart is its flexible software stack. It is designed for both standalone use and deep integration into automated test environments. Key technologies supported include:

*   **EEZ Flow**: A visual programming tool that allows users to create complex test and measurement sequences without writing traditional code.
*   **MicroPython**: For those who prefer scripting, the BB3 supports MicroPython, enabling on-device automation and custom logic execution.
*   **SCPI Support**: The system follows the Standard Commands for Programmable Instruments (SCPI) protocol, making it compatible with industry-standard lab software and drivers.
*   **Modern Connectivity**: With built-in support for MQTT and Node-RED, the BB3 can be easily integrated into IoT workflows and remote monitoring dashboards.

## Open Source Philosophy

The EEZ BB3 is a fully open-source project, licensed under the TAPR Open Hardware License. This commitment to openness means that all schematics, PCB layouts (created in KiCad), and firmware are available for the community to study, modify, and improve. This transparency not only ensures the longevity of the platform but also allows users to verify the precision and safety of their measurement hardware.
