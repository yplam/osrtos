---
title: STM32 Bootloader
summary: A customizable bootloader for STM32 microcontrollers designed for in-application
  programming (IAP) of firmware from SD cards. It provides robust features like flash
  verification, checksum validation, and fail-safe operation for STM32L4 series devices.
slug: stm32-bootloader
codeUrl: https://github.com/akospasztor/stm32-bootloader
siteUrl: https://akospasztor.github.io/stm32-bootloader
star: 999
version: v1.1.3
lastUpdated: '2022-11-10'
rtos: cmsis
topics:
- boot
- bootloader
- demo
- example
- fat32
- fatfs
- firmware
- firmware-updater
- flash
- flasher
- iap
- in-app-programming
- mcu
- microcontroller
- microsd
- sd
- stm32
- stm32l4
- stm32l476
- stm32l496
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mcuboot-for-stm32
- mbed-bootloader
- sdcard-boot-with-ota-for-micropython
- tock-bootloader
- esp8266sdupdater
- yaota8266-ota-bootloader
---

## Overview

The STM32 Bootloader is a flexible and customizable solution for performing In-Application Programming (IAP) on STM32 microcontrollers. Its primary focus is enabling firmware updates from an external SD card formatted with the FAT32 file system. By providing a modular library and several hardware-specific examples, the project simplifies the process of implementing field updates for embedded devices.

The project is structured to separate the core bootloader logic from the hardware-specific implementation. The core library resides in a dedicated folder, while various demonstration projects for boards like the STM32L496G-Discovery provide ready-to-use templates for developers.

## Key Features and Capabilities

This bootloader is designed with reliability and safety in mind, offering several features essential for production-grade embedded systems:

- **Flash Management**: Includes routines for flash erasing, programming, and verification to ensure the integrity of the written firmware.
- **Integrity Checks**: Supports checksum verification (CRC32) to validate the application image before execution.
- **Fail-Safe Design**: Features extended error handling and the ability to check or toggle flash write protection.
- **System Recovery**: Provides the ability to trigger ST's built-in system bootloader from software, allowing for full chip re-programming without physical access to the BOOT pins.
- **Debugging Support**: Includes serial tracing over SWO (Serial Wire Output), making it easier to monitor the boot process during development.

## Technical Implementation

The bootloader utilizes the STM32 HAL (Hardware Abstraction Layer) and CMSIS drivers. For file system access, it integrates the FatFs library, allowing it to navigate and read binary firmware images from SD cards. 

One of the critical aspects of this bootloader is its handling of the application jump. To ensure a successful transition from the bootloader to the user application, the system manages vector table relocation. While the bootloader can be configured to perform this automatically, it also provides guidance on manually setting the Vector Table Offset Register (VTOR) within the application's startup code.

### Programming Sequence

The bootloader follows a specific sequence to ensure a safe update process:
1. **Protection Check**: Verifies if flash write protection is active and disables it if necessary.
2. **Initialization**: Prepares the flash interface via `Bootloader_Init()`.
3. **Erasure**: Clears the application space using `Bootloader_Erase()`.
4. **Programming**: Writes the binary image in double-word (8-byte) increments using a loop of `Bootloader_FlashNext()` calls.
5. **Finalization**: Completes the process with `Bootloader_FlashEnd()` and performs a final verification.

## Hardware and Toolchain Support

While the core library is portable across the STM32 family, the repository includes specific projects for:
- **STM32L476VG** (Custom Hardware)
- **STM32L496VG** (Custom Hardware)
- **STM32L496AG** (32L496GDISCOVERY board)

The project supports multiple professional toolchains, including IAR EWARM and the GNU Arm Embedded Toolchain (ARM GCC). The build system is modernized with support for SCons and Make, and the repository includes an Azure Pipelines configuration for continuous integration, ensuring that the code remains buildable and adheres to style guidelines.

## Configuration

Developers can tailor the bootloader behavior through the `bootloader.h` configuration file. This allows for the adjustment of application space boundaries, checksum requirements, and debug trace levels. Because the application image must be in a raw binary format, the project also specifies the exact CRC32 parameters (Initial value: 0xFFFFFFFF, MSB first) required for the image to pass the bootloader's integrity check.
