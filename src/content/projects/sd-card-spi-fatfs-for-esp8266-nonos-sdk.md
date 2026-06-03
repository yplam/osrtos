---
title: SD Card SPI FatFS for ESP8266 NONOS-SDK
summary: A project implementing SD card support via SPI using the FatFS file system
  for the ESP8266 NONOS-SDK. It provides the necessary drivers and configuration to
  integrate external storage into ESP8266-based embedded systems.
slug: sd-card-spi-fatfs-for-esp8266-nonos-sdk
codeUrl: https://github.com/slacky1965/sdcard-spi-fatfs
star: 1
lastUpdated: '2022-04-10'
rtos: ''
libraries:
- lwip
topics:
- esp8266
- fatfs
- nonos
- sdcard
- soft-spi
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- spiffs-for-esp8266-non-os-sdk
- stm32-fatfs-and-freertos-integration
- http-server-from-sd-card-for-esp8266
- esp32-fatfs-storage-example
- esp32-lvgl-8-x-sdspi-template
- sd-h-and-fs-h-port-for-mongoose-os
---

## Overview

The `sdcard-spi-fatfs` project provides a robust implementation for using SD cards with the ESP8266 microcontroller. Specifically designed for the ESP8266 NONOS-SDK, it integrates the popular FatFS library to allow developers to read from and write to standard SD cards over the Serial Peripheral Interface (SPI). This is particularly useful for IoT applications that require local data logging, configuration storage, or web server asset hosting where the internal flash memory is insufficient.

## Technical Implementation

The project is structured to work seamlessly with the standard ESP8266 build environment. It includes a customized version of the FatFS library optimized for the memory constraints of the ESP8266. The core logic handles the SPI communication protocol required to interface with SD and SDHC cards, abstracting the low-level block I/O into a familiar file system API.

### Key Components

- **FatFS Integration**: Includes the source code for FatFS, providing a FAT/exFAT compatible file system module.
- **SPI Driver**: Implements the hardware-specific SPI routines for the ESP8266 to communicate with the SD card controller.
- **Build System**: Utilizes a standard Makefile and helper scripts (`gen_misc.sh` and `gen_misc.bat`) that are compatible with the Espressif NONOS-SDK toolchain.
- **Linker Configuration**: The Makefile is configured to link essential libraries such as `lwip`, `crypto`, and `main`, ensuring the project can coexist with standard WiFi and networking tasks.

## Hardware and Platform Support

This project targets the ESP8266 SoC. Because it uses the NONOS-SDK, it is ideal for applications where low overhead and direct hardware control are prioritized over the multitasking capabilities of an RTOS. 

**Hardware Requirements:**
- ESP8266 Module (e.g., ESP-12E, ESP-01 with enough pins, or NodeMCU).
- SD Card Module or slot connected via SPI pins (typically GPIO12-15 for HSPI).
- Standard SD or SDHC card formatted with FAT16 or FAT32.

## Getting Started

The project is designed to be cloned directly into the `ESP8266_NONOS_SDK` directory. The build process is managed via the provided Makefile, which supports various flash sizes and SPI modes (QIO, QOUT, DIO, DOUT). 

Users can configure the build by running the generation scripts or by passing variables directly to `make`. For example, the project supports various SPI flash maps ranging from 512KB to 16MB, accommodating a wide variety of ESP8266-based hardware modules. Once compiled, the resulting binaries can be flashed using `esptool.py`, with the Makefile providing a convenient `make flash` target.

## Project Structure

- `fatfs/`: Contains the FatFS library source and the glue logic for the SPI driver.
- `user/`: Contains the `user_main.c` file where the application logic and file system initialization reside.
- `include/`: Header files for project-wide definitions.
- `Makefile`: The primary build configuration defining compiler flags, library dependencies, and memory maps.
