---
title: FloripaSat OBDH (On-Board Data Handling)
summary: The On-Board Data Handling (OBDH) module for the FloripaSat Cubesat project,
  responsible for managing satellite information and mission data. It runs on the
  TI MSP430F6659 microcontroller using FreeRTOS and integrates motion tracking and
  radio communication peripherals.
slug: floripasat-obdh-on-board-data-handling
codeUrl: https://github.com/floripasat/obdh
siteUrl: http://www.floripasat.ufsc.br/
star: 28
version: v1.1
lastUpdated: '2019-10-09'
rtos: freertos
topics:
- cubesat
- freertos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- project-shadow-flight
- filtered-inertial-rotation-module-firm
- move-on-helium-sensors
- suchai-flight-software
- stm32l476g-discovery-rtos-sensor-project
- lfr-flight-software
---

## Overview

The On-Board Data Handling (OBDH) module is a critical component of the FloripaSat Cubesat Project, developed at the Federal University of Santa Catarina (UFSC). As the central nervous system of the satellite, the OBDH module is tasked with managing all cubesat information to ensure the mission reaches its scientific and operational goals. This repository contains the complete hardware designs and firmware source code for the module.

## Hardware Architecture

The OBDH module is built around a robust low-power architecture suitable for the harsh environment of space. The core processing unit is the **Texas Instruments MSP430F6659**, a 16-bit ultra-low-power microcontroller. This MCU was selected for its balance of performance and energy efficiency, which is vital for the limited power budget of a 1U Cubesat.

To support mission requirements, the hardware integrates several key peripherals:
- **Motion Tracking**: An InvenSense MPU9250 9-axis sensor provides gyroscope, accelerometer, and compass data for attitude determination.
- **Communication**: A CC1125 high-performance radio transceiver is utilized for space-to-ground communications, operating in the sub-1 GHz bands.
- **Modular Design**: The hardware folder contains detailed schematics and PCB layouts designed to interface with the rest of the FloripaSat bus.

## Software and RTOS Integration

The firmware is written in C and developed using the Code Composer Studio (CCS) IDE. To manage the various concurrent tasks required for satellite operation—such as sensor polling, telemetry processing, and radio management—the project utilizes **FreeRTOS**. 

The use of an RTOS allows the development team to prioritize critical mission tasks and ensure deterministic behavior. The firmware structure is divided into several layers:
- **HAL (Hardware Abstraction Layer)**: Interfaces directly with the MSP430 registers.
- **Drivers**: Specific implementations for the MPU9250 and CC1125.
- **Interface**: High-level APIs for system-wide communication.
- **Tasks**: FreeRTOS-managed threads that handle the main logic of the OBDH.

## Development and Toolchain

The project is configured for the TI v16.9.1 LTS compiler. The repository includes a comprehensive Doxyfile for generating documentation directly from the source code, ensuring that the internal logic and API structures remain accessible to new contributors. Developers looking to work with the project need to set up the MSP430 Ultra Low Power MCU package within CCS and configure the specific compiler versions as detailed in the project's toolchain setup guide.

## Mission Context

As part of the FloripaSat project, this OBDH module represents a significant effort in open-source aerospace engineering. By providing the full source code and hardware files, the project contributes to the global Cubesat community, offering a reference implementation for MSP430-based satellite controllers running FreeRTOS.
