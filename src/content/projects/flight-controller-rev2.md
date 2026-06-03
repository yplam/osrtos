---
title: Flight Controller Rev2
summary: A dual-processor flight control system based on the STM32H753VI microcontroller,
  designed for UAVs, drones, and hobby rockets. It features a dedicated co-processor
  for sensor fusion and supports advanced protocols including DShot, SBUS, and CRSF.
slug: flight-controller-rev2
codeUrl: https://github.com/hiteshbhoyar03/flight-controller-v2
star: 12
lastUpdated: '2025-11-03'
rtos: ''
topics:
- bmi088
- drone
- drones
- embedded
- embedded-systems
- flight-controller
- icm45686
- ms5611
- rocket
- stm32
- uav
- uavs
isShow: true
image: /202601/flight-controller-rev2.webp
createdAt: '2026-01-23'
updatedAt: '2026-01-23'
relatedProjects:
- droners
- protoflight
- avem
- fpv-drone-stm32f411-flight-controller
- alturia-firmware
- drone-stm32f1
---

## Overview

Flight Controller Rev2 is a high-performance, dual-processor embedded control system designed for advanced aerial platforms such as drones, UAVs, and hobby rockets. The project showcases a sophisticated hardware-software co-design, utilizing two STM32H753VI ARM Cortex-M7 microcontrollers to distribute the computational load between flight logic and sensor processing. 

While currently a simulation-only design, the repository provides a comprehensive look at the engineering required for modern flight controllers, from multi-layer PCB stackups in Altium Designer to modular firmware development in STM32CubeIDE.

## System Architecture

The heart of the system is a dual-MCU architecture where two STM32H753VI processors (running at 400MHz) communicate via a high-speed UART link and eight shared GPIO lines for synchronization and handshaking.

### Main Processor Subsystem
The Main Processor is responsible for high-level mission logic, telemetry, and motor control. It is supported by:
- **External Storage**: 4Gb NAND Flash for data logging and a 512KB SPI EEPROM for configuration storage.
- **Actuator Control**: 16 PWM channels capable of driving ESCs or servos.
- **Communication**: USB OTG for firmware updates and debugging, plus multiple UART and SPI interfaces.

### Co-Processor Subsystem
The Co-Processor is dedicated to high-frequency sensor data acquisition and pre-processing, offloading the IMU math from the main flight loop. It manages an extensive sensor suite including:
- **IMUs**: BMI088, ICM-42688-P, and ICM-45686 for redundant, low-noise motion tracking.
- **Barometers**: MS5611 and ICP-20100 for high-resolution altitude sensing.
- **Magnetometer**: MMC5983MA for heading information.
- **GNSS**: NEO-M9N module for multi-constellation positioning.

## Firmware and Protocols

The firmware is built with a modular, layered architecture to ensure portability and ease of maintenance. A significant portion of the low-level driver work is complete, covering SPI abstraction, sensor initialization, and EEPROM handling.

One of the project's strengths is its wide support for industry-standard communication protocols:
- **Motor Protocols**: Supports legacy PWM as well as modern digital protocols like Oneshot42, Oneshot125, Multishot, and the DShot family (up to DShot1200).
- **RC Receiver Protocols**: Integrated support for IBUS, SBUS, and the high-performance CRSF (Crossfire) protocol.

## Development and Tools

The project utilizes a professional toolchain common in the embedded industry. The hardware was designed using a 4-layer PCB stackup in Altium Designer, while the firmware is developed using STM32CubeIDE and STM32CubeMX for peripheral configuration. This workflow demonstrates a complete lifecycle approach to embedded systems engineering, from schematic capture to real-time protocol implementation.
