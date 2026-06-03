---
title: SPIFFS for ESP8266 NON-OS SDK
summary: A customized port of the SPIFFS (SPI Flash File System) specifically for
  the ESP8266 NON-OS SDK. It provides a lightweight file system for SPI flash memory
  with a C++ wrapper for simplified integration and no external dependencies.
slug: spiffs-for-esp8266-non-os-sdk
codeUrl: https://github.com/quackmore/esp8266_spiffs
star: 4
version: v1.1
lastUpdated: '2019-07-18'
rtos: ''
libraries:
- spiffs
topics:
- esp8266
- non-os-sdk
- spiffs
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- arduino-littlefs-spimemory-wrapper
- esp8266-littlefs-file-handler
- sd-card-spi-fatfs-for-esp8266-nonos-sdk
- avr-spiffs
- effortless-spiffs
- easyini
---

The `esp8266_spiffs` project provides a dedicated implementation of the SPI Flash File System (SPIFFS) tailored for the ESP8266 platform using the official NON-OS SDK. Originally forked from the widely-used SPIFFS project by Peter Andersson, this version has been specifically customized to operate within the constraints and requirements of the ESP8266's bare-metal environment without requiring additional dependencies.

## Core Functionality

SPIFFS is designed for SPI flash devices on embedded systems, focusing on wear leveling and efficient use of limited RAM. This port ensures that ESP8266 developers can easily manage files on the internal flash memory, which is essential for storing configuration files, web server assets, or log data. 

One of the standout features of this repository is the inclusion of a C++ wrapper. While the core SPIFFS implementation is written in C, the wrapper provides a more modern and ergonomic interface for developers working in C++, making file operations more intuitive and reducing boilerplate code.

## Integration and Structure

The project is structured to allow for flexible integration depending on the developer's needs. For projects requiring only the core file system functionality, a subset of files including `spiffs_hydrogen.c`, `spiffs_nucleus.c`, and the flash interface functions can be used. For those preferring the C++ approach, the `esp8266_spiffs.cpp` and `.hpp` files provide the necessary abstraction.

Key configuration files include:
- `spiffs_config.h`: Allows for fine-tuning the file system parameters such as logical block size and page size.
- `spiffs_flash_functions.h`: Contains macros for hardware-level interaction, including a debug toggle to enable or disable serial output.

## Building and Environment

The repository includes a robust build system centered around a `Makefile` and a helper script called `gen_env.sh`. The script guides the user through setting up environment variables such as the SDK path, boot version, SPI speed, and flash size map. This setup generates an `env.sh` file that configures the build environment for the specific ESP8266 hardware configuration being used.

The build process supports various flash sizes (from 512KB up to 16MB) and different SPI modes (QIO, QOUT, DIO, DOUT), ensuring compatibility with a wide range of ESP8266-based modules like the ESP-01, ESP-12E, or NodeMCU.

## Usage and Documentation

Since this is a port, it maintains compatibility with the standard SPIFFS API. Developers familiar with the original SPIFFS documentation can apply that knowledge directly here. The C++ wrapper documentation is primarily found within the header files, providing a clear path for implementation. The project is licensed under the SPIFFS license with an additional [BEER-WARE] license clause.
