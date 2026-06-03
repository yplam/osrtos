---
title: Tock Bootloader
summary: A specialized bootloader for flashing applications onto microcontrollers
  over USB, built on top of the Tock OS ecosystem. It features a robust UART-based
  communication protocol, support for board-specific metadata through attributes,
  and a modular architecture for different hardware platforms.
slug: tock-bootloader
codeUrl: https://github.com/tock/tock-bootloader
siteUrl: http://www.tockos.org
star: 27
version: v1.1.3
lastUpdated: '2024-02-07'
rtos: tock
topics:
- bootloader
- tock
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- tockloader
- mbed-bootloader
- stm32-bootloader
- mcuboot-for-stm32
- multi-firmware-esp
- yaota8266-ota-bootloader
---

## Overview

The Tock Bootloader is a utility designed to facilitate flashing applications onto embedded boards over a USB connection. Uniquely, it is implemented on top of the Tock OS itself, leveraging the operating system's safety and modularity features to provide a reliable update mechanism. It is designed to work seamlessly with the `tockloader` command-line utility, creating a streamlined development workflow for Tock-based systems.

## Bootloader Operation

Upon system reset, the board enters the bootloader and performs a check to determine whether it should remain in the bootloader mode or jump to the kernel. This logic is abstracted through the `BootloaderEntry` trait, allowing different boards to implement their own entry conditions. Common methods include checking the state of a specific GPIO pin or looking for a magic value stored in a dedicated memory register.

If the bootloader determines it is time to execute the main application, it utilizes the `Jumper` trait. This trait handles the architecture-specific logic required to transition execution to a different starting address, which is typically stored in a dedicated flags section within the flash memory.

## Over-the-Wire Protocol

The bootloader communicates with a host client over UART using a structured framing protocol. All messages are initiated by the client and responded to by the bootloader. The protocol uses an escape character (`0xFC`) to handle arbitrary data lengths and ensure message integrity.

### Supported Commands

The bootloader supports a comprehensive set of commands for flash management and system identification:

- **PING**: A simple connectivity check that returns a pong response.
- **INFO**: Retrieves a detailed information string from the bootloader.
- **ERASE_PAGE & WRITE_PAGE**: Core commands for modifying internal flash memory.
- **READ_RANGE**: Allows the client to read back arbitrary ranges of flash for verification.
- **CRC_INTERNAL_FLASH**: Calculates a CRC over a specified range to ensure data integrity without transferring the entire block.
- **CHANGE_BAUD_RATE**: Enables high-speed transfers by negotiating a new baud rate during the session.

## Metadata and Attributes

A key feature of the Tock Bootloader is its ability to store and manage metadata through a system of flags and attributes. Located near the beginning of the bootloader's flash space, these sections provide persistent storage for board-specific information.

### Attributes
Attributes are key-value pairs (up to 16) where each key is 8 bytes and each value is up to 55 bytes. These are frequently used by tools like `tockloader` to identify the board type, version, or specific configuration parameters without needing to probe the hardware directly.

### Flags
The flags section contains critical system information, including the "TOCKBOOTLOADER" magic string, the bootloader version string, and the specific start address for the kernel jump. This 512-byte section ensures that the bootloader has the necessary context to manage the system state across resets.

## Technical Implementation

The project is written in Rust and organized into several directories that separate the core protocol logic from board-specific implementations. The `arch`, `chips`, and `boards` directories allow the bootloader to be ported to various microcontrollers, such as the nRF52, SAM4L (used in the Hail and imix boards), and others. Development is supported by a Makefile-based build system, making it easy to compile and flash for specific targets.
