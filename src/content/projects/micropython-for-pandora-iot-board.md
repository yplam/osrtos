---
title: MicroPython for Pandora IoT Board
summary: A specialized MicroPython port for the RT-Thread Pandora IoT Board, powered
  by an STM32L475 microcontroller. It leverages the RT-Thread RTOS to provide a high-level
  Python development environment for IoT applications, featuring extensive hardware
  peripheral support and integrated networking.
slug: micropython-for-pandora-iot-board
codeUrl: https://github.com/SummerGift/micropython_for_pandora
star: 27
lastUpdated: '2020-08-05'
rtos: rt-thread
libraries:
- easyflash
- lwip
- micropython
topics:
- iot-board
- micropython
- pandora
- rt-thread
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- micropython-port-for-rt-thread
- micropython-for-w601-iot-board
- micropython-for-sparrow-one-board
- stm32l475-freertos-iot-project
- iotsharp-pandora-stm32l475-bsp
- stm32l475-pandora-board-bsp-for-rt-thread
---

## Overview

The MicroPython for Pandora IoT Board project brings the ease of Python programming to the RT-Thread ecosystem. Developed for the Pandora (潘多拉) IoT development board, this project allows developers to control hardware peripherals using Python scripts instead of traditional C code. By combining the real-time capabilities of RT-Thread with the flexibility of MicroPython, it offers a modern workflow for rapid IoT prototyping and development.

## Hardware Capabilities

The Pandora board is a feature-rich platform based on the STM32L475 microcontroller. This MicroPython port provides comprehensive access to the board's onboard resources, including:

- **Standard Peripherals**: GPIO (with interrupt support), UART, I2C, SPI, ADC, and PWM.
- **User Interface**: Red LED, RGB LED, three input keys, a beeper, and an LCD display.
- **Sensors**: AHT10 temperature and humidity sensor, AP3216C proximity and light sensor, and an ICM20608 six-axis motion sensor.
- **Connectivity**: Integrated WiFi support for network-enabled applications.
- **System Utilities**: Hardware timers, Watchdog (WDT), and Real-Time Clock (RTC).

## Technical Architecture

This project is built upon the RT-Thread RTOS, which serves as the underlying kernel. The integration uses several RT-Thread components to provide a robust environment:

- **DFS (Device File System)**: Manages the onboard flash using FatFs, allowing users to store Python scripts and data files.
- **LWIP Stack**: Provides the networking foundation for MicroPython's `usocket` and `network` modules.
- **FAL (Flash Abstraction Layer)**: Manages flash partitions, working alongside EasyFlash for environment variable storage.
- **VFS Integration**: MicroPython's `uos` module is mapped to RT-Thread's virtual file system, ensuring seamless file operations.

## Development Experience

One of the primary advantages of this project is the integration with the RT-Thread MicroPython IDE, a VS Code extension. This environment allows developers to write Python code, upload it to the Pandora board, and interact with the MicroPython REPL (Read-Eval-Print Loop) directly. This interactive development cycle significantly reduces the time between writing code and seeing results on the hardware.

### Example: Controlling an LED

Using the `machine` module, controlling hardware becomes as simple as a few lines of Python:

```python
from machine import Pin

# Initialize the red LED on pin PE7
led = Pin("PE7", Pin.OUT)

# Turn the LED on
led.value(1)
```

## Getting Started

To begin developing, users need to flash the appropriate firmware to their Pandora IoT Board. The project supports multiple toolchains for building from source, including GCC, Keil MDK, and IAR. Once the firmware is running, the board presents a REPL over the serial port, enabling immediate execution of Python commands. For more complex applications, scripts can be saved to the internal file system and executed on boot, making it a powerful platform for both learning and professional IoT deployment.
