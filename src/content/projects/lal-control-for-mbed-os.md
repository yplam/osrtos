---
title: LAL Control for Mbed OS
summary: A control and monitoring system for a pulsed ablation laser developed for
  the Laboratorio de Sólidos Amorfos at FIUBA. Built on Mbed OS for the NUCLEO-F401RE
  platform, it manages temperature sensing, motor cooling, and user interaction via
  LCD, including a comprehensive alarm system for environmental monitoring.
slug: lal-control-for-mbed-os
codeUrl: https://github.com/JuanHirschmann/LAL-Control-MbedOS
siteUrl: https://juanhirschmann.github.io/LAL-Control-MbedOS/index.html
star: 0
lastUpdated: '2023-01-20'
rtos: mbed-os
topics:
- embedded-systems
- mbed-os
- stm32
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- nucleo-experiment-control-system-for-atom-interferometry
- stm32-pid-temperature-control-implementation
- arm-control-framework-acorns-rover
- stm32l476g-discovery-rtos-sensor-project
- embedded-graphical-interface-for-pid-control
- w601-rt-thread-alarm-clock
---

## Overview

LAL Control is a specialized procedure control and monitoring system designed for operating a pulsed ablation laser. Developed for the Laboratorio de Sólidos Amorfos at the Faculty of Engineering, University of Buenos Aires (FIUBA), this project provides a robust firmware solution for managing the environmental and operational parameters of sensitive laboratory equipment.

The system is built using the Mbed OS framework and is specifically optimized for the STMicroelectronics NUCLEO-F401RE development board, though it remains compatible with equivalent STM32-based microcontrollers.

## Key Features

The firmware implements several critical safety and operational modules:

- **Temperature Management**: Continuous sensing of the extractor motor temperature with automated control of dual cooling fans to maintain safe operating conditions.
- **User Interface**: A dedicated LCD interface provides real-time feedback to the operator, ensuring that system status is always visible.
- **Alarm System**: A comprehensive safety layer that alerts users to excessive temperature, humidity levels within the enclosure, or hardware failures in the connected sensors.
- **Sensor Integration**: Support for high-precision temperature sensing using the DS1820 1-Wire digital thermometer.

## Technical Implementation

The project leverages the **Mbed OS bare-metal profile**, as specified in the `mbed_app.json` configuration. This choice reduces the memory footprint and overhead by excluding the full RTOS kernel features that are not required for this specific control logic, resulting in a more efficient binary for the STM32F401RE MCU. 

The build system is managed via **PlatformIO**, utilizing the `ststm32` platform. The configuration in `platformio.ini` ensures that dependencies, such as the DS1820 library, are automatically handled and that the source filter correctly includes the necessary application logic while excluding unnecessary porting files.

## Hardware and Environment

While the primary target is the **NUCLEO-F401RE**, the use of the Mbed abstraction layer allows for relatively straightforward porting to other boards within the STM32 family. The system is designed to interface with:
- DS1820 temperature sensors.
- Standard character LCDs for the HMI.
- Relay or PWM-controlled cooling fans.
- Humidity sensors for enclosure monitoring.

## Getting Started

To deploy the system, developers should use Visual Studio Code with the PlatformIO extension. By opening the project folder, PlatformIO will automatically configure the environment, download the Mbed framework, and fetch the required DS1820 libraries. The system can then be compiled and flashed directly to the target Nucleo board.
