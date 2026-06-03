---
title: MotoLink
summary: An open-source CAN Bus and K-Line interface for motorcycles featuring fuel
  and ignition mapping capabilities. Built on ChibiOS/RT for STM32 microcontrollers,
  it enables communication with Honda HRC and Yamaha YEC ECUs to create custom fuel
  maps based on real-time sensor data.
slug: motolink
codeUrl: https://github.com/fpoussin/MotoLink
siteUrl: https://cadlab.io/node/808
star: 94
version: v0.9.1
lastUpdated: '2020-02-28'
rtos: chibios-rt
topics:
- chibios
- chibios-rt
- ecu
- efi
- fuel
- hrc
- motorcycle
- stm32
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- xiaomi-cybergear-arduino-library
- cybergear-ros2-controller
- sel4-hobd-prototype-system
- x-track-open-source-gps-bicycle-computer
- cuybot-v1-opensource-smartcar-project
- esp32-bus-pirate
---

MotoLink is a specialized hardware and software interface designed for motorcycle tuning and diagnostics. It provides a bridge between a motorcycle's Electronic Control Unit (ECU) and a computer, supporting both CAN Bus and K-Line communication protocols. The project is primarily intended for use with Honda HRC, Yamaha YEC, and generic OBD ECUs, offering a DIY alternative to commercial auto-tune systems like Bazzaz or Power Commander.

## Core Functionality

The primary purpose of MotoLink is to act as a fuel and ignition mapper. By interfacing with various motorcycle sensors, the device can generate a comprehensive fuel map. This data allows tuners to manually adjust fuel delivery using their preferred software applications, such as TuneEcu or manufacturer-specific tools. 

To ensure accuracy during the tuning process, the system requires input from a wideband exhaust sensor. It is designed to work seamlessly with sensors like the Innovate LC2. Beyond exhaust data, MotoLink captures a variety of digital and analog signals, including:
- **Digital Inputs**: Engine RPM and vehicle speed.
- **Analog Inputs**: Throttle Position Sensor (TPS), Engine Coolant Temperature (ECT), and Wideband O2 data.
- **Serial/Knock Interface**: Dedicated inputs for wideband serial data and knock sensors to assist in fine-tuning ignition timing.

## Technical Architecture

The project is divided into several distinct components, making it a complete embedded ecosystem:

### Firmware and RTOS
The microcontroller code is built on **ChibiOS/RT**, a high-performance real-time operating system. It utilizes the ChibiOS-Contrib repository for additional community-driven drivers. The firmware is optimized for STM32 microcontrollers and includes a dedicated bootloader for easy field updates.

### Graphical User Interface (GUI)
MotoLink includes a cross-platform GUI built with the Qt framework. This interface allows users to visualize sensor data, manage fuel maps, and perform firmware updates via the custom bootloader. The GUI relies on the QtUsb library for communication with the hardware.

### Hardware Design
The repository includes Eagle board files, allowing users to manufacture their own hardware. The design incorporates the necessary transceivers for CAN and K-Line communication, alongside signal conditioning for the various analog and digital sensor inputs.

## Development and Build System

The project uses a standard ARM GCC toolchain for the firmware components. The build process is managed via Makefiles, with a specific requirement to compile a DSP library for the main application. For the GUI, developers use Qt Creator and qmake. The project also utilizes a Jenkins-based CI/CD pipeline, as evidenced by the included Jenkinsfile, which automates the compilation of the bootloader, the main application, and the GUI across different Docker environments.
