---
title: IoTSharp PANDORA STM32L475 BSP
summary: A Board Support Package (BSP) for the STM32L475 Pandora development board
  running RT-Thread. It enables seamless integration with the IoTSharp platform for
  telemetry and attribute data collection while providing comprehensive driver support
  for onboard peripherals.
slug: iotsharp-pandora-stm32l475-bsp
codeUrl: https://github.com/IoTSharp/PANDORA
star: 1
lastUpdated: '2022-05-10'
rtos: rt-thread
libraries:
- easyflash
- lwip
topics:
- embedded
- iot
- iotsharp
- rt-thread
- spi
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32l475-pandora-board-bsp-for-rt-thread
- rt-thread-bsp-for-stm32f407vet6
- stm32l475-freertos-iot-project
- micropython-for-pandora-iot-board
- b-l475e-iot01a-discovery-board-support-crate
- rt-thread-bsp-for-mh1903x
---

## Overview

The IoTSharp PANDORA project provides a robust Board Support Package (BSP) designed to bridge the STM32L475 Pandora development board with the IoTSharp cloud platform. Built upon the RT-Thread real-time operating system, this project leverages a high-performance ARM Cortex-M4 core to deliver a versatile IoT prototyping environment. It serves as a foundation for developers looking to implement telemetry reporting, attribute synchronization, and remote device management.

## Hardware Capabilities

The Pandora STM32L475 is a feature-rich development board from Alientek, centered around the STM32L475VET6 microcontroller. Operating at 80MHz with 512KB of Flash and 128KB of RAM, the board is equipped with an extensive array of onboard resources:

- **Connectivity**: AP6181 WiFi module (SDIO) and ST-LINK V2.1 with virtual COM port support.
- **Sensors**: AHT10 temperature and humidity sensor, a six-axis motion sensor, and an ambient light sensor.
- **Storage**: 16MB SPI Flash (W25Q128) and an SD card interface.
- **User Interface**: A TFT-LCD display, RGB status LEDs, and multiple user buttons.
- **Audio & Actuators**: High-performance audio decoding chip, active buzzer, and a patch motor.

## Software Architecture

The project is deeply integrated with the RT-Thread ecosystem, utilizing its modular component system and driver framework. Key software features include:

- **RT-Thread Kernel**: Provides multi-threading, semaphores, and memory management.
- **IoTSharp SDK**: Facilitates communication with the IoTSharp server using MQTT (via Paho MQTT).
- **Filesystem & Storage**: Uses DFS (Device Virtual File System) and FAL (Flash Abstraction Layer) for managing onboard storage and EasyFlash for environment variable persistence.
- **Network Stack**: Employs the lwIP TCP/IP stack to manage WiFi connectivity.
- **Build System**: Utilizes SCons and Kconfig, allowing developers to easily configure the system via the `menuconfig` graphical interface.

## Peripheral Support

The BSP currently supports a wide range of on-chip and onboard peripherals. Supported features include GPIO, UART, SPI, QSPI, I2C, TIM, ADC, RTC, WDT, and PWM. Advanced modules like the AP6181 WiFi, AHT10 sensor, and QSPI Flash are fully operational, while support for the patch motor and light sensor is planned for future updates.

## Getting Started

The project supports multiple development environments including MDK (Keil), IAR, and GCC. For users familiar with the RT-Thread ENV tool, the workflow is streamlined:

1. Open the ENV tool in the BSP directory.
2. Use `menuconfig` to enable or disable specific hardware drivers or software packages.
3. Run `pkgs --update` to fetch the necessary online packages.
4. Generate the project files for your preferred IDE using `scons --target=mdk5` or similar commands.

Once compiled and flashed, the system provides a FinSH command-line interface via the serial port, allowing users to interact with the RTOS in real-time and monitor the connection status to the IoTSharp platform.
