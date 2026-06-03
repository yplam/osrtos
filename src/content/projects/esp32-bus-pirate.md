---
title: ESP32 Bus Pirate
summary: An open-source firmware for ESP32-S3 microcontrollers that replicates and
  extends the functionality of the Bus Pirate hardware tool. It provides an interactive
  CLI for sniffing, sending, and scripting various digital and radio protocols like
  I2C, SPI, UART, CAN, and Sub-GHz.
slug: esp32-bus-pirate
codeUrl: https://github.com/geo-tp/ESP32-Bus-Pirate
siteUrl: https://geo-tp.github.io/ESP32-Bus-Pirate/webflasher/
star: 2259
version: v1.2
lastUpdated: '2026-01-05'
rtos: freertos
libraries:
- littlefs
- tft-espi
- lwip
- spiffs
topics:
- arduino
- bluetooth
- can-bus
- debugging
- eeprom
- esp32
- gpio
- hardware-hacking
- i2c
- iot
- jtag
- protocol
- pwm
- rfid
- serial-communication
- spi
- subghz
- uart
- wifi
isShow: true
image: /202601/esp32-bus-pirate.webp
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- esp32-bit-pirate
- esp32-bus-expander
- esp-hack-fw
- esp-graber
- beamstalker
- hydrabus
---

The ESP32 Bus Pirate is an ambitious open-source firmware project that transforms standard ESP32-S3 development boards into versatile multi-protocol hacking and diagnostic tools. Inspired by the legendary Bus Pirate, this firmware leverages the modern power of the ESP32-S3 to provide a significantly expanded feature set, including support for both wired digital protocols and various wireless communication standards.

### A Swiss Army Knife for Hardware Hacking
At its core, the ESP32 Bus Pirate acts as a bridge between a user's computer and various electronic components. It supports an exhaustive list of protocols, making it an essential tool for reverse engineering, debugging, and prototyping. Supported wired protocols include I2C (with scanning and glitching capabilities), SPI (for EEPROM and Flash dumping), UART (with auto-baud detection), 1-Wire, JTAG, and CAN bus. 

Beyond traditional wired interfaces, the project takes full advantage of the ESP32's radio capabilities. It includes modes for Wi-Fi and Bluetooth sniffing, as well as support for Sub-GHz frequencies and RFID when paired with appropriate hardware. This makes it a unique hybrid tool capable of interacting with almost any digital signal an embedded engineer might encounter.

### Versatile Interface Options
One of the standout features of the ESP32 Bus Pirate is its flexibility in how users interact with the device. It offers three distinct Command Line Interface (CLI) modes:

- **Serial Interface**: The traditional method via USB, offering the fastest performance and responsiveness for intensive data handling.
- **Web Interface**: A modern approach that works over Wi-Fi, allowing users to access the CLI from any browser on a PC, tablet, or smartphone without needing physical cables.
- **Standalone Mode**: Specifically designed for the M5 Cardputer, this mode utilizes the device's built-in screen and keyboard for truly portable hardware hacking.

### Hardware Ecosystem
While the firmware can run on almost any ESP32-S3 board with at least 8MB of flash, it features optimized support for several popular development kits and commercial devices. This includes the M5Stack ecosystem (Cardputer, Stick C Plus 2, StampS3, AtomS3 Lite), LILYGO T-Embed series, and the Seeed Studio Xiao S3. The project provides specific pin mappings and hardware-specific features for these devices, ensuring a smooth experience out of the box.

### Automation and Scripting
For complex tasks like automated testing or large-scale data extraction, the ESP32 Bus Pirate supports scripting. Users can automate interactions using Python scripts over a serial connection or utilize Bus Pirate-style bytecode instructions. This allows for sophisticated workflows such as logging sensor data to a file, performing bulk EEPROM dumps, or creating custom LED animations.

### Getting Started
The project is designed to be accessible. The developers provide a Web Flasher tool that allows users to install the firmware directly from a web browser with a single click. Once flashed, the device can be configured via a serial terminal or by connecting to its Wi-Fi access point. Detailed documentation for every mode, command, and supported hardware configuration is maintained in the project's comprehensive Wiki, which serves as the primary resource for mastering the tool's extensive instruction syntax.
