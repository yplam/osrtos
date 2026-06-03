---
title: W601 RT-Thread Alarm Clock
summary: An IoT-enabled alarm clock project built on the RT-Thread RTOS for the Alientek
  W601 development board. It features network time synchronization via NTP, environmental
  monitoring using AHT10 and AP3216C sensors, and a graphical interface on an LCD.
  The project leverages RT-Thread's ecosystem, including WiFi connectivity, EasyFlash
  storage, and the FAL partition management system.
slug: w601-rt-thread-alarm-clock
codeUrl: https://github.com/Rayuu/W601_RT-thread_Alarm
star: 4
version: V1.0
lastUpdated: '2019-12-09'
rtos: rt-thread
libraries:
- lwip
- easyflash
topics:
- c
- rt-thread
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- roostaboosta
- stm32l476g-discovery-rtos-sensor-project
- esp32-weatherstationrtc
- children-s-iot-clock
- elekstube-ips-custom-firmware
- flatsphere-clock
---

## Overview

The W601 RT-Thread Alarm Clock is an integrated IoT application developed for the RT-Thread software package competition. Built using the Alientek W601 development board, which features the Winner Micro W601 SoC (an ARM Cortex-M3 based microcontroller with integrated WiFi), this project transforms a standard development kit into a functional, network-connected smart alarm clock.

By leveraging the RT-Thread RTOS and its extensive package ecosystem, the project demonstrates how to combine networking, sensor data acquisition, and user interface management into a cohesive embedded system.

## Technical Architecture

The project is built on RT-Thread 4.0.2 and utilizes several key components of the RTOS to handle its various functions:

### Networking and Time Synchronization
Connectivity is a core feature of this alarm clock. It uses the RT-Thread WLAN management framework to handle WiFi connections in both Station and AP modes. For accurate timekeeping, the system implements the `netutils` package to synchronize with NTP servers (such as `cn.ntp.org.cn`). This ensures the alarm clock remains accurate without requiring manual time setting. The network stack is powered by lwIP 2.0.2, with a Socket Abstraction Layer (SAL) providing a unified interface for network operations.

### Sensor Integration and Environment Monitoring
The device monitors its surroundings using onboard sensors. It integrates the AHT10 sensor for high-precision temperature and humidity readings and the AP3216C for ambient light and proximity sensing. These sensors are managed through the RT-Thread Sensor Framework, which provides a standardized way to access sensor data via device drivers.

### Storage and Configuration
To maintain settings and alarm configurations across reboots, the project utilizes the EasyFlash package. EasyFlash provides a lightweight, flash-based environment variable system. This is supported by the Flash Abstraction Layer (FAL), which manages partitions on the internal flash and the external W25Q128 SPI flash memory.

### User Interface and Interaction
The project features a graphical interface displayed on an LCD. Interaction is not limited to physical buttons; the system includes an infrared receiver with an NEC decoder, allowing for remote control functionality. Additionally, the project includes a QR code generation package, which can be used for device pairing or displaying information to the user.

## Key Features

- **RT-Thread Kernel**: Utilizes semaphores, mutexes, and mailboxes for inter-thread communication.
- **WiFi Connectivity**: Supports automatic connection and configuration via SmartConfig.
- **NTP Sync**: Automatic time calibration over the internet.
- **Environmental Sensing**: Real-time temperature, humidity, and light level monitoring.
- **Flash Management**: Robust storage for system parameters using EasyFlash and FAL.
- **Infrared Control**: Remote interaction via NEC-protocol infrared signals.
- **Security**: Integrated mbedTLS for secure network communications.

## Hardware Support

The project is specifically tailored for the **Alientek W601 IoT Board**. The hardware configuration includes:
- **SoC**: Winner Micro W601 (Cortex-M3)
- **Display**: Onboard LCD
- **Sensors**: AHT10 (I2C), AP3216C (I2C)
- **Storage**: W25Q128 SPI Flash
- **Peripherals**: PWM for alarm sounds, HWTimer for precise timing, and UART for console debugging.

## Development and Build

The repository provides a complete development environment compatible with both SCons and IDE-based workflows. It includes project files for Keil MDK (`project.uvprojx`) and IAR (`project.ewp`). The build process is managed by SCons scripts (`SConstruct`, `rtconfig.py`), which handle dependency resolution and cross-compilation for the ARM Cortex-M3 target.
