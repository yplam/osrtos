---
title: DevMonitor for Pis
summary: A high-performance device monitoring solution for Raspberry Pi and Orange
  Pi platforms using the LVGL graphics library. It features custom PCB designs and
  software for ST7789-based LCD screens to display real-time system metrics and hardware
  status.
slug: devmonitor-for-pis
codeUrl: https://github.com/Temperature6/DevMonitor_for_Pis
star: 29
lastUpdated: '2024-03-09'
rtos: ''
libraries:
- lvgl
topics:
- linux
- monitor
- orangepi
- raspberry-pi
- st7789
isShow: true
image: /202603/devmonitorforpis.webp
createdAt: '2026-03-05'
updatedAt: '2026-03-05'
---

DevMonitor for Pis is an open-source hardware and software project designed to provide a dedicated system monitoring interface for popular single-board computers. The project specifically targets the Raspberry Pi Zero 2W and the Orange Pi Zero 3, offering tailored expansion board designs and optimized software for each platform.

## Hardware Architecture

The project is built around the ST7789 IPS display controller, utilizing different screen sizes for different platforms. The Orange Pi Zero 3 version employs a 1.47-inch LCD (320x172), while the Raspberry Pi Zero 2W version uses a 1.69-inch LCD (240x280). 

Beyond the display, the project includes comprehensive PCB designs (available in Gerber and BOM formats) that integrate several peripheral components:
- **Input Devices:** Multiple tactile buttons and, in the case of the Raspberry Pi version, a five-way switch for UI navigation.
- **Sensors:** Integration for the SHT20 temperature and humidity sensor.
- **Connectivity:** USB Type-C power input and CH340N-based USART-to-USB interfaces for debugging.
- **Feedback:** Onboard buzzers for audible alerts.

## Software Implementation

The software stack is built on LVGL (Light and Versatile Graphics Library) version 8.3.5, ensuring a smooth and visually appealing user interface. The UI was designed using GuiGuider, and the project includes the original GuiGuider project files for further customization.

To interface with the hardware, the project utilizes the `wiringPi` library (or `wiringOP` for Orange Pi) to manage GPIO and SPI communication. The display driver is a ported version of the ST7789 driver, optimized for hardware SPI throughput on Linux-based SBCs. The build system is managed via CMake, making it straightforward to compile directly on the target device.

## Configuration and Customization

A significant portion of the project is dedicated to portability. While the code is categorized by platform, it remains largely generic. Users can adapt the software to different pinouts by modifying the `inc/st7789.h` header file. This file allows for the configuration of:
- SPI channel and speed (supporting up to 90MHz communication).
- Reset (RST), Data/Command (DC), and Chip Select (CS) pins using wPi numbering.
- Backlight control (BLK) pins.

## Getting Started

The project is designed to be compiled natively on the target Pi. After installing dependencies like `cmake`, `make`, and `wiringPi`, users can build the executable using a standard CMake workflow. Because the application interacts directly with hardware peripherals via SPI and GPIO, it requires root privileges to run. The repository also provides instructions for setting up the monitor as a background service using `rc.local` to ensure the display initializes automatically upon boot.
