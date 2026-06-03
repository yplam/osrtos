---
title: ESP32_BitlashTBP
summary: A multi-interpreter environment for the ESP32-C3 that integrates Bitlash
  and TinyBasicPlus with Quick ESP-NOW wireless connectivity. It provides a programmable
  command shell and BASIC scripting capabilities with a LittleFS-based file system
  for persistent script storage.
codeUrl: https://github.com/jmysu/ESP32_BitlashTBP
isShow: false
rtos: freertos
libraries:
- littlefs
topics:
- arduino
- bitlash
- esp32
- esp32c3
- espnow
- littlefs
- tinybasicplus
star: 1
lastUpdated: '2023-08-01'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- pydos
- lua-rtos-for-esp32
- esp32-bus-expander
- micropython-and-lvgl-firmware-for-esp32
- esp-fs-webserver
- lunokiotwatch-firmware-for-lilygo-twatch-2020
---

ESP32_BitlashTBP is an innovative project designed to bring high-level scripting and interactive command shells to the ESP32-C3 microcontroller. By combining two distinct script interpreters—Bitlash and TinyBasicPlus—with the low-latency Quick ESP-NOW wireless protocol, this project creates a flexible platform for remote control, automation, and rapid prototyping without the overhead of a full Wi-Fi stack.

### Multi-Interpreter Architecture
At the heart of the project are two classic scripting environments adapted for the ESP32:
- **Bitlash ESP32 (V2.1j):** A programmable command shell that allows users to execute functions, control GPIOs, and automate tasks using a C-like syntax directly from a serial or wireless console.
- **TinyBasicPlus (V0.15j):** A C-based implementation of the classic Tiny BASIC language, providing a nostalgic yet functional way to write logic on embedded hardware.

These interpreters allow developers to modify device behavior on the fly without needing to recompile and flash the firmware for every minor change.

### Wireless Connectivity with Quick ESP-NOW
One of the standout features of this project is its integration with **Quick ESP-NOW**. Unlike standard Wi-Fi, which requires a connection to an Access Point, ESP-NOW allows devices to communicate directly with one another. This project leverages that capability to provide a wireless command interface, enabling scripts to be sent and executed across a mesh-like network of ESP32 nodes.

### Storage and Script Management
The project utilizes **LittleFS** for its file system, allowing scripts to be saved and loaded from the ESP32's internal flash memory. The developer has implemented a specific workaround for executing LittleFS scripts, as the `doCommand()` function in Bitlash is not natively re-entrant. This ensures that scripts stored on the file system can be triggered and executed reliably alongside interactive commands.

### Technical Configuration
The project is built using the **PlatformIO** ecosystem and is optimized for the ESP32-C3-DevKitM-1. It includes several partition configurations (2MB and 4MB variants) to balance space between the application code and the LittleFS storage area. 

Key build flags in the `platformio.ini` allow for easy hardware targeting:
- `C3KIT12F`: Standard C3 Kit configuration.
- `C3mBUS`: Specialized bus configurations for different hardware layouts.
- `USB_CDC_ON_BOOT`: Support for the ESP32-C3's native USB Serial interface.

### Getting Started
To use the project, users can flash the firmware using PlatformIO. Once running, the device provides a command interface where users can enter Bitlash or BASIC commands. The repository includes a comprehensive `bitlash-users-guide.pdf` and documentation for TinyBasicPlus to help users master the scripting syntax. For those looking to extend the project, the source code is organized into distinct directories for different versions (V0 and V2.1j), reflecting the evolution of the integration between the interpreters and the wireless stack.
