---
title: MicroPython-STM-Lib
summary: A collection of Python modules and drivers for MicroPython, specifically
  optimized for STM32F4-based hardware like the pyboard and STM32F4DISCOVERY. It provides
  essential utilities for rotary encoders, LCDs, MIDI communication, SPI flash memory,
  and networking, with support extending to ESP8266 and ESP32 ports.
slug: micropython-stm-lib
codeUrl: https://github.com/SpotlightKid/micropython-stm-lib
star: 98
lastUpdated: '2024-02-28'
rtos: ''
libraries:
- micropython
topics:
- accelerometer
- esp32
- esp8266
- hd44780
- http-client
- lcd
- lis302dl
- lis3dsh
- micropython
- midi
- pyboard
- python
- redis
- redis-client
- requests
- rotary-encoder
- spi-flash
- stm32f4
- stm32f4-discovery
- w25q80bv
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- micropython-lib
- micropython-samples-and-drivers
- micropython-examples-for-01studio-development-boards
- micropython-waveshare-e-paper-drivers
- micropython-kitchen-sink-for-m5stack
- stm32-cmsis-libraries
---

MicroPython-STM-Lib is a versatile collection of Python modules designed to extend the capabilities of MicroPython, with a primary focus on STM32F4-based boards. While originally tailored for hardware like the original pyboard and the STM32F4DISCOVERY, the library's modular nature ensures that many of its components are compatible with the MicroPython Unix port and other bare-metal targets such as the ESP8266 and ESP32.

The repository serves as a curated set of drivers and utilities that address common needs in embedded development, ranging from low-level hardware interfacing to high-level networking protocols.

### Hardware Interfacing and Drivers

One of the core strengths of this library is its robust set of hardware drivers. For user input, the `encoder` module provides a reliable way to read rotary encoders using digital input pins. It includes Gray code error checking, which significantly reduces the need for external debouncing circuitry or complex software debouncing logic.

Visual output is handled by the `lcd` module, which provides an interface for the ubiquitous HD44780-compatible LCD controllers. For motion sensing, the `accel` module offers a refined version of the standard `staccel.py` driver found in the main MicroPython repository, ensuring better stability and providing clear examples for implementation.

### Storage and Communication

For projects requiring expanded storage or specific communication protocols, MicroPython-STM-Lib includes several specialized modules:

- **SPI Flash**: The `spiflash` module enables MicroPython to interact with Winbond W25Q series SPI-attached flash memory chips, allowing for expanded filesystem storage.
- **MIDI**: The `midi` module facilitates the transmission and reception of MIDI data over UART or USB virtual serial interfaces, making it a valuable tool for embedded music and audio projects.
- **SPI Master**: A unique `spimaster` library allows for rudimentary SPI communication where an ESP8266 module acts as a slave, typically running an Arduino sketch using the SPISlave library.

### Networking and Utilities

Beyond hardware drivers, the collection includes high-level utilities for modern IoT applications. The `mrequests` module is an evolution of the standard `urequests` library, offering improved features and better reliability for HTTP operations. For network management, `netconfig` simplifies the process of setting up WiFi or Ethernet connections by reading configurations directly from JSON files.

Additionally, the library includes `picoredis`, a minimal Redis client for lightweight data persistence and messaging, and `untar`, a utility for extracting uncompressed tar archives using the standard `utarfile` module.

### Getting Started

Most modules in this collection are designed to be "drop-in" additions to a MicroPython project. Because they are written in Python, they can be easily uploaded to a board's internal filesystem or included in a custom firmware build as frozen modules. Each directory within the repository typically contains example scripts to help developers quickly understand the API and wiring requirements for the specific module. Whether you are building a MIDI controller, a weather station with an LCD, or a data logger using SPI flash, this library provides the building blocks to accelerate development on STM32 and ESP-based microcontrollers.
