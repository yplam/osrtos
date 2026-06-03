---
title: The MicroPython Board (pyboard)
summary: The official hardware design repository for the MicroPython board (pyboard),
  a development platform based on the STM32F405RGT6 microcontroller. It provides the
  schematics, PCB layouts, and pinout diagrams for the reference hardware specifically
  optimized to run the MicroPython programming language.
slug: the-micropython-board-pyboard
codeUrl: https://github.com/micropython/pyboard
star: 529
lastUpdated: '2015-12-23'
rtos: ''
libraries:
- micropython
topics:
- microcontroller
- micropython
- pyboard
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mcudev-black-stm32f407vet6-micropython-support
- micropython-for-pandora-iot-board
- micropython-examples-for-01studio-development-boards
- micropython-port-for-rt-thread
- mpython-board
- micropython-samples-and-drivers
---

## Overview

The MicroPython board, commonly known as the pyboard, is the flagship hardware platform designed specifically to run MicroPython—a lean and efficient implementation of the Python 3 programming language. This repository serves as the central hub for the pyboard's hardware design, containing everything from schematics and pinout diagrams to PCB layout files.

As the reference hardware for the MicroPython project, the pyboard allows developers to control a microcontroller using Python scripts, providing a high-level programming experience on bare-metal hardware. The board is designed to be small, fast, and versatile, making it suitable for a wide range of embedded applications, from robotics to IoT prototyping.

## Hardware Specifications

The pyboard is built around the powerful **STM32F405RGT6** microcontroller. This chip provides the necessary performance to handle the MicroPython runtime while maintaining low power consumption. Key hardware features include:

- **MCU**: STM32F405RGT6 (Cortex-M4 core with hardware floating point)
- **Connectivity**: Micro USB connector for power and serial communication
- **Storage**: Micro SD card slot for storing Python scripts and data logs
- **Sensors**: Integrated MMA7660 3-axis accelerometer
- **I/O**: Numerous GPIO pins, including support for UART, SPI, I2C, CAN, and PWM
- **User Interface**: Onboard LEDs and switches for immediate feedback and interaction

## Repository Contents

This repository provides the complete open-source hardware documentation for the production version of the board, designated as **PYBv10b**. Developers and hardware hackers can find:

- **Schematics**: Detailed PDF schematics (PYBv10b.pdf) and pinout diagrams.
- **Design Files**: Eagle CAD files and Gerbers for manufacturing or modifying the board layout.
- **Mechanical Data**: Metric and Imperial dimension sheets for enclosure design and integration.
- **Legacy Support**: Documentation for older iterations, such as PYBv3 and PYBv4, for historical reference.

## Using the pyboard

The pyboard functions as a USB mass storage device when connected to a computer. This allows users to write Python scripts (usually named `main.py`) and save them directly to the board or an inserted SD card. Once saved, the board executes the script upon reset. This workflow eliminates the need for complex toolchains or specialized flashing software, making embedded development accessible to anyone familiar with Python.

For those looking to integrate the pyboard into their own projects, the provided pinout documentation is essential. It details the multiplexed functions of the STM32 pins, ensuring developers can correctly interface with external sensors, actuators, and communication modules.
