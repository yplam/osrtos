---
title: I2C Scanner for M5Cardputer
summary: A portable I2C bus scanner for the M5Cardputer that identifies connected
  devices and displays their hexadecimal addresses on the built-in screen. Built with
  the Arduino framework, it provides a real-time diagnostic tool for hardware debugging
  via the Grove connector.
slug: i2c-scanner-for-m5cardputer
codeUrl: https://github.com/geo-tp/M5-Card-Computer-I2C-Scanner
star: 20
version: v1.0
lastUpdated: '2024-05-17'
rtos: freertos
topics:
- cardputer
- i2c
- m5cardputer
- m5stack
isShow: false
createdAt: '2026-03-24'
updatedAt: '2026-03-24'
---

The I2C Scanner for M5Cardputer is a specialized utility designed to simplify hardware debugging and peripheral identification on the M5Stack Cardputer platform. By leveraging the device's integrated display and Grove expansion port, this tool provides a portable solution for identifying I2C addresses without needing a full desktop setup or external logic analyzer.

### Functionality and User Experience

Upon startup, the application immediately begins probing the I2C bus. It iterates through all possible 7-bit addresses to identify responding devices. When a device is detected, its address is formatted as a hexadecimal string (e.g., 0x3C) and rendered on the M5Cardputer's built-in screen. 

The scanner operates on a continuous loop, refreshing the results every eight seconds. This periodic scanning is particularly useful when hot-plugging sensors or modules into the Grove connector, as it allows developers to verify connections in real-time. If the bus is empty, the screen clearly displays a "No I2C devices" message, ensuring the user knows the system is active even when no peripherals are found.

### Technical Implementation

The project is built using the Arduino framework and managed via the PlatformIO build system. It specifically targets the M5Stack StampS3, which serves as the core microcontroller for the M5Cardputer. The implementation relies on the official M5Cardputer library to handle display output and hardware abstraction for the ESP32-S3 SoC.

Because it runs on the ESP32-S3, the application operates within the FreeRTOS environment provided by the Espressif IoT Development Framework (ESP-IDF) that underpins the Arduino core. This ensures stable execution and efficient management of system resources while the scanner performs its periodic bus transactions.

### Hardware Requirements

To use this scanner, you simply need:
- An M5Cardputer device.
- Any I2C-compatible peripheral (sensors, displays, or actuators) connected via the Grove port.

This tool is an essential addition to any M5Cardputer owner's toolkit, transforming the compact computer into a versatile piece of test equipment for embedded electronics development. It eliminates the guesswork involved in configuring new sensors and ensures that hardware communication is established before moving on to more complex software development.
