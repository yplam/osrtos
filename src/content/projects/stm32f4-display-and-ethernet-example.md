---
title: STM32F4 Display and Ethernet Example
summary: A demonstration project for the STM32F407 microcontroller featuring a HY32D
  TFT display with ILI9325 controller and Ethernet connectivity via the DP83848 module.
  It utilizes the LwIP stack for networking and STemWin for the graphical user interface,
  configured using STM32CubeMX HAL drivers.
slug: stm32f4-display-and-ethernet-example
codeUrl: https://github.com/vAnArhist/STM32F4Display
star: 5
lastUpdated: '2020-06-01'
rtos: ''
libraries:
- lwip
topics:
- dp83848
- hy32d
- lwip
- stm32f4-discovery
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- sk-mstm32f107-demo-board-example
- stm32h750b-dk-touchgfx-freertos-mqtt-example
- lwip-tcp-ip-stack-on-stm32-microcontroller
- stm32h745-ethernet-with-lwip-and-freertos
- mender-ota-example-for-stm32l4-and-zephyr-rtos
- ip-over-usb
---

## Overview

This project serves as a comprehensive reference for integrating multiple complex peripherals on the STM32F407VGTx microcontroller. It specifically targets the HY32D TFT screen, which uses the ILI9325 controller, and includes support for the XPT2046 touchscreen driver. Additionally, it implements networking capabilities using the DP83848 Ethernet PHY and the LwIP protocol stack.

## Hardware Configuration

The project is built around the STM32F407, a high-performance ARM Cortex-M4 MCU. The display is interfaced via the Flexible Static Memory Controller (FSMC), which allows for high-speed data transfer to the 16-bit LCD interface. The pinout documentation provided in the repository details the connections for the FSMC data lines (D0-D15), control signals (NOE, NWE, NE1), and the touchscreen interrupt. 

Key hardware components include:
- **MCU**: STM32F407VGTx
- **Display Controller**: ILI9325 (interfaced via FSMC)
- **Touch Controller**: XPT2046 (interfaced via SPI2)
- **Ethernet PHY**: DP83848 (interfaced via RMII)

## Networking and GUI

For connectivity, the project integrates the LwIP (Lightweight IP) stack, configured for the DP83848 Ethernet module. This enables the device to participate in IP networks with a static IP configuration (defaulting to 192.168.0.103). 

On the visual side, the project includes STemWin (a version of Segger emWin), providing a robust framework for creating window-based graphical user interfaces. The repository contains GUIBuilder files and generated C code, such as `WindowDLG.c` and `TESTDLG.c`, which demonstrate how to create interactive dialogs and windows. This combination of a high-speed display interface and a professional GUI library allows for the creation of sophisticated embedded user interfaces.

## Development Environment

The project was developed using STM32CubeMX (version 4.19.0) for peripheral initialization and code generation. It includes project files for both the IAR Embedded Workbench (EWARM) and Keil MDK-ARM toolchains. The use of HAL (Hardware Abstraction Layer) drivers ensures a structured approach to hardware control, making the code more readable and providing a clear path for further development.

## Technical Implementation

The project structure follows the standard STM32CubeMX layout:
- `Src/` and `Inc/`: Contain the main application logic and peripheral initialization code.
- `Drivers/`: Includes the STM32F4 HAL drivers and CMSIS files.
- `Middlewares/`: Contains the LwIP stack and STemWin library files.
- `GUIBuilder.exe`: A utility provided to help design the user interface visually before generating the corresponding C code.
