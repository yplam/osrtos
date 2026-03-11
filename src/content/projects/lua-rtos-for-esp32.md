---
title: Lua RTOS for ESP32
summary: Lua RTOS is a real-time operating system for embedded systems, featuring
  a Lua 5.3 interpreter on top of a FreeRTOS-powered micro-kernel. It provides a hardware
  abstraction layer for ESP32, ESP8266, and PIC32MZ platforms, allowing for programming
  via Lua or a block-based IDE.
slug: lua-rtos-for-esp32
codeUrl: https://github.com/whitecatboard/Lua-RTOS-ESP32
siteUrl: https://ide.whitecatboard.org
star: 1305
lastUpdated: '2022-12-02'
rtos: freertos
libraries:
- spiffs
- lwip
topics:
- esp32
- espressif
- freertos
- iot
- iot-platform
- lora
- lorawan
- lua
- lua-rtos
- rtos
isShow: true
image: /202512/lua-rtos-esp32.webp
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
---

# Lua RTOS for ESP32: A Scriptable Real-Time Operating System

Lua RTOS is a specialized real-time operating system (RTOS) tailored for embedded systems with constrained memory resources. While it is highly optimized for the ESP32, its architecture allows for portability across various 32-bit platforms, including the ESP8266 and PIC32MZ. The project aims to simplify embedded development by providing a high-level scripting environment without sacrificing the timing guarantees of a traditional RTOS.

## Three-Layer Architecture

The system is built on a robust three-layer design that separates high-level logic from low-level hardware management:

1.  **Top Layer (Lua Interpreter):** At the highest level, Lua RTOS runs a Lua 5.3.4 interpreter. This provides developers with the full suite of Lua programming features, augmented by specialized modules for hardware access (such as PIO, ADC, I2C, and RTC) and middleware services like LoRa WAN and MQTT.
2.  **Middle Layer (Real-Time Micro-kernel):** The core of the system is powered by FreeRTOS. This layer ensures that tasks are scheduled and executed with real-time precision, handling the underlying complexities of multi-threading and synchronization.
3.  **Bottom Layer (Hardware Abstraction Layer):** The HAL communicates directly with the platform's hardware. This modularity means that porting Lua RTOS to a new architecture primarily involves rewriting this bottom layer, while the interpreter and kernel remain consistent.

## Development Experience

One of the standout features of Lua RTOS is its flexibility in programming. Developers can use the Whitecat IDE to program boards in two distinct ways:

*   **Lua Scripting:** Writing code directly in Lua allows for rapid prototyping and access to the system's full power.
*   **Block-based Programming:** For those who prefer a visual approach or are in the early stages of prototyping, a block-based language is available. This environment translates visual blocks directly into Lua code, allowing developers to switch between blocks and text-based code seamlessly.

## Hardware and Peripheral Support

Lua RTOS provides comprehensive support for the ESP32's peripheral set. The system includes built-in modules for:

*   **Standard I/O:** GPIO (PIO), ADC, I2C, and SPI.
*   **Connectivity:** Integrated support for LoRa WAN and MQTT, making it an excellent choice for IoT applications.
*   **Storage:** Support for SPIFFS and FAT file systems, allowing for persistent data storage on internal flash or SD cards.
*   **System Services:** Real-time clock (RTC) management and Lua-based threading.

## Getting Started and the Whitecat Console

The project provides a dedicated command-line tool called the Whitecat Console (`wcc`). This tool simplifies the process of flashing firmware and managing files on the board. With `wcc`, users can list serial ports, upload or download files, and flash the latest Lua RTOS firmware or filesystem images with simple commands.

For developers who prefer to build from source, the project integrates deeply with the ESP-IDF toolchain. The build process uses a standard Makefile approach, supporting `make menuconfig` for fine-grained configuration of the RTOS features and hardware settings.

## Interactive Console

Once flashed, Lua RTOS provides an interactive console accessible via serial communication. This console allows developers to execute Lua commands in real-time, inspect the file system, and monitor system status. Upon boot, the system automatically executes `system.lua` and `autorun.lua`, enabling standalone operation of user scripts. 

```lua
  /\       /\
 /  \_____/  \
/_____________\
W H I T E C A T

Lua RTOS beta 0.1 powered by Lua 5.3.4

Executing /system.lua ...
Executing /autorun.lua ...

/ > 
```

The combination of a high-level language, a proven real-time kernel, and a user-friendly IDE makes Lua RTOS a powerful platform for both hobbyists and professional embedded developers working with the ESP32.
