---
title: STM32L475 Pandora Board BSP for RT-Thread
summary: A comprehensive Board Support Package (BSP) for the STM32L475 Pandora development
  board, designed for the RT-Thread RTOS. It provides drivers for a wide range of
  onboard sensors, WiFi connectivity, and audio components using the ARM Cortex-M4
  architecture.
slug: stm32l475-pandora-board-bsp-for-rt-thread
codeUrl: https://github.com/luhuadong/rtt-iot-board
star: 0
lastUpdated: '2020-05-03'
rtos: rt-thread
topics:
- rt-thread
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- iotsharp-pandora-stm32l475-bsp
- rt-thread-bsp-for-stm32f407vet6
- stm32l475-freertos-iot-project
- b-l475e-iot01a-discovery-board-support-crate
- micropython-for-pandora-iot-board
- rt-thread-bsp-for-mh1903x
---

## Overview

The STM32L475 Pandora development board, produced by Alientek (正点原子), is a versatile hardware platform designed to showcase the capabilities of the STM32L475VET6 microcontroller. This repository contains the official Board Support Package (BSP) for RT-Thread, providing a seamless integration between the RTOS and the board's extensive hardware features. Powered by an ARM Cortex-M4 core running at 80MHz, the board is equipped with 512KB of Flash and 128KB of RAM, making it an ideal target for IoT prototyping and embedded systems education.

## Hardware Capabilities

The Pandora board is distinguished by its rich set of onboard peripherals, which are well-supported by this BSP. Key hardware features include:

- **Sensors**: AHT10 temperature and humidity sensor, a six-axis motion sensor, and a light environment sensor.
- **Connectivity**: AP6181 WiFi module (via SDIO), SD card interface, and an infrared transceiver.
- **User Interface**: A TFT LCD display (SPI3), an RGB status LED, and four user buttons.
- **Actuators**: An active buzzer and a vibration motor.
- **Audio**: A high-performance audio decoding chip for sound processing.
- **Debugging**: Integrated ST-LINK V2.1 for programming and serial debugging.

## Software Architecture and Build System

This project follows the standard RT-Thread BSP structure, utilizing the SCons build system and Kconfig for configuration management. This modular approach allows developers to easily enable or disable specific drivers and software packages based on their project requirements.

The BSP supports a variety of development environments, including:
- **Keil MDK (v4 and v5)**
- **IAR Embedded Workbench**
- **GCC** (via the RT-Thread Env tool)

Configuration is primarily handled through the `menuconfig` interface, where users can toggle support for on-chip peripherals like GPIO, UART, SPI, I2C, ADC, and PWM, as well as onboard components like the QSPI Flash (W25Q128) and the WiFi stack.

## Getting Started

To begin development, users can connect the board to a PC via the Micro USB port associated with the onboard ST-LINK. The default configuration enables the RT-Thread FinSH shell on UART1, providing an interactive command-line interface at 115200 baud. 

For advanced usage, the RT-Thread Env tool is recommended. By running `menuconfig` within the BSP directory, developers can access a graphical menu to configure the kernel, components, and hardware drivers. After saving the configuration, the `pkgs --update` command fetches necessary software packages, and `scons --target=mdk5` (or the appropriate target for your IDE) generates the project files.

## Peripheral Support Status

The BSP currently provides robust support for most onboard and on-chip features. While core peripherals like GPIO, UART, and SPI are fully supported, some features like the vibration motor and light sensor are marked for upcoming updates. The inclusion of the AP6181 WiFi driver and SDIO support makes this BSP particularly useful for developers building connected IoT devices.
