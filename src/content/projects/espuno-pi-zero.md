---
title: ESPuno Pi Zero
summary: An ESP32-C6 based development board in the Raspberry Pi Zero form factor,
  designed for high-voltage industrial and IoT applications. It features integrated
  support for Wi-Fi 6, Bluetooth, Zigbee, and Thread, alongside RS-485/DMX interfaces
  and a wide 5-60V DC power input range.
slug: espuno-pi-zero
codeUrl: https://github.com/DitroniX/ESPuno-Pi-Zero_WiFi-BT-Zigbee-Thread-60V
siteUrl: https://ditronix.net
star: 10
lastUpdated: '2025-12-04'
rtos: freertos
libraries:
- micropython
- open-thread
- platformio-platformio-core
topics:
- bt
- btle
- dmx512
- esp32-c6
- grove
- home-assistant
- home-automation
- i2c
- iot
- micropython
- platformio
- raspberry-pi
- rs485
- rtc
- spi
- tasmota
- thread
- usb-host
- wifi6
- zigbee
isShow: true
image: /202601/espuno-pi-zero.webp
createdAt: '2026-01-15'
updatedAt: '2026-01-15'
relatedProjects:
- cyberboard-v2
- seeed-home-assistant-discovery
- xiao-esp32c6-sketches
- esp-e-paper-component
- smart-iot-sensor-with-xiao-esp32c6
- micropython-for-pandora-iot-board
---

## Overview

The ESPuno Pi Zero is a versatile STEM Maker and Developer SDK board that combines the power of the Espressif ESP32-C6 with the popular mechanical form factor of the Raspberry Pi Zero. Designed for flexibility, it bridges the gap between the Raspberry Pi hardware ecosystem and the embedded world of the ESP32, allowing users to utilize PiHats and breakout boards with an Arduino-compatible controller.

One of the most striking features of the ESPuno Pi Zero is its wide operating voltage range. Capable of handling 5V to 60V DC, it is uniquely suited for industrial environments, solar energy monitoring (such as 48V battery systems), and automotive or marine applications where standard 5V or 12V limits are often exceeded.

## Connectivity and Communication

At its core, the ESP32-C6-MINI module provides a comprehensive suite of wireless protocols. It supports Wi-Fi 6 (802.11ax), Bluetooth 5.3 (LE and Mesh), and 802.15.4 based protocols including Zigbee 3.0 and Thread 1.4. This makes the board an excellent candidate for Matter-enabled smart home devices and mesh networking projects.

For wired industrial communication, the board includes a dedicated RS-485 interface. This enables support for industry-standard MODBUS RTU protocols and DMX512 lighting control, allowing the board to act as a controller, analyzer, or interface for professional lighting and SCADA systems.

## Hardware Architecture

The board is packed with integrated peripherals that extend its utility beyond a simple microcontroller breakout:

- **GPIO Expansion**: A PCA9671 GPIO expander drives the Raspberry Pi-compatible header, ensuring that the ESP32-C6 can interact with complex PiHats.
- **Sensors and Storage**: It features an on-board TMP102 digital temperature sensor and a 24C64 EEPROM (64Kbit) for local data logging and storing user parameters.
- **Power Management**: The board includes a 5V SMPS (600mA) and a 3.3V LDO (700mA) to maintain stable power across its wide input range.
- **Ecosystem Support**: A dedicated Grove connector provides a standardized I2C expansion interface for the wide range of Grove sensors and actuators.

## Software and Development

The ESPuno Pi Zero is designed to be framework-agnostic, supporting a vast array of development environments. Developers can utilize the native ESP-IDF (Espressif IoT Development Framework) with FreeRTOS for professional-grade applications, or leverage the ease of the Arduino IDE and PlatformIO. For those preferring high-level languages, the board fully supports MicroPython and CircuitPython.

Because it targets the IoT and Home Automation sectors, it is also compatible with popular platforms such as Home Assistant (ESPHome), ESP RainMaker, Tasmota, and ThingsBoard. This broad compatibility ensures that whether you are building a simple sensor node or a complex industrial gateway, the ESPuno Pi Zero fits into your existing workflow.

## Versatile Applications

Thanks to its robust power stage and diverse communication options, the ESPuno Pi Zero excels in several specific niches:
- **Solar Monitoring**: Direct connection to high-voltage battery banks.
- **Robotics and Drones**: Compact form factor with high-voltage tolerance for various battery chemistries.
- **Industrial Automation**: MODBUS RTU control and PLC interfacing.
- **Smart Lighting**: DMX512 analysis and control for stage and architectural lighting.
