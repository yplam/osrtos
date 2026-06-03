---
title: MicroPython for ESP32 with psRAM Support (LoBo Port)
summary: A specialized MicroPython port for ESP32 microcontrollers with extensive
  support for external psRAM (SPIRAM) up to 16MB. Built as an ESP-IDF component, it
  features dual-core support, integrated hardware drivers, and advanced networking
  modules including MQTT, FTP, and GSM/PPPoS.
slug: micropython-for-esp32-with-psram-support-lobo-port
codeUrl: https://github.com/loboris/MicroPython_ESP32_psRAM_LoBo
star: 865
lastUpdated: '2018-09-06'
rtos: freertos
libraries:
- micropython
- spiffs
- lwip
topics:
- display
- esp-idf
- esp32
- gsm
- libcurl
- micropython
- pppos
- tft
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- micropython-for-kendryte-k210-lobo-port
- micropython-and-lvgl-firmware-for-esp32
- micropython-camera-driver-for-esp32
- esp32-cam-micropython
- micropython-st7735-tft-lcd-driver
- micropython-stm-lib
---

## Overview

MicroPython for ESP32 with psRAM support, often referred to as the LoBo port, is a highly optimized distribution of MicroPython specifically designed to overcome the memory limitations of standard ESP32 builds. While standard MicroPython typically operates with less than 100KB of free memory, this port leverages external SPIRAM (psRAM) to provide up to 4MB or more of free heap space. This massive increase in available memory transforms the ESP32 into a much more capable platform for complex applications, large data structures, and memory-intensive networking tasks.

## Key Features and Capabilities

This project is built as a component of the Espressif IoT Development Framework (ESP-IDF), allowing it to integrate deeply with the underlying hardware features. Unlike standard ports, it utilizes the ESP-IDF **menuconfig** system, enabling developers to configure MicroPython options alongside system-level settings like flash speed, flash mode (QIO, QOUT, DIO, DOUT), and core utilization.

**Core technical highlights include:**
- **psRAM Support:** Full utilization of up to 16MB of external SPIRAM.
- **Dual-Core Execution:** Ability to run the MicroPython task on the second ESP32 core (App CPU), leaving the Pro CPU for system tasks and FreeRTOS operations.
- **Advanced Filesystems:** Support for both FatFS (with wear leveling) and SPIFFS, alongside robust SD card support using the native ESP-IDF sdmmc driver.
- **Enhanced Networking:** Built-in C-based modules for MQTT, mDNS, Telnet, and FTP servers, plus a Curl module supporting FTP, SMTP, and other protocols.
- **Hardware Integration:** Improved drivers for I2C, SPI, ADC, PWM, and RMT (used for Neopixel, DHT, and 1-wire sensors).

## Hardware Support

The LoBo port is compatible with a wide range of ESP32 modules and development boards, particularly those featuring 4MB of psRAM such as:
- M5Stack Development Kit
- ESP-WROVER-KIT and WROVER modules
- TTGO T8 and TAudio boards
- WiPy 3.0
- Lolin32 Pro

## Technical Implementation

By building MicroPython as an ESP-IDF component, the project gains access to the native ESP32 Virtual File System (VFS). This allows for seamless integration between internal flash and external SD cards. The inclusion of a dedicated `_threads` module provides improved inter-thread notifications and messaging, making it easier to write concurrent Python code on an embedded target. 

For power management, the port includes an enhanced `RTC` class within the `machine` module. This provides built-in NTP synchronization, deep sleep management, and the ability to wake from deep sleep based on external pin levels.

## Getting Started

The project provides a `BUILD.sh` script to simplify the compilation process on Linux, MacOS, and Windows (via WSL). Once flashed, the firmware provides a familiar REPL with expanded capabilities. 

### Example: Using the Enhanced RTC

```python
import machine

rtc = machine.RTC()
rtc.init((2017, 6, 12, 14, 35, 20))

# Synchronize with NTP
rtc.ntp_sync(server="pool.ntp.org")

# Deep sleep with wake on pin
rtc.wake_on_ext0(Pin(0), level=0)
machine.deepsleep(10000)
```

### Example: Mounting an SD Card

```python
import uos

# Mount SD card and automatically change to its directory
uos.mountsd(True)
print(uos.listdir())
```

This port is particularly well-suited for developers who need the ease of Python but require the performance and memory overhead necessary for professional IoT gateways, display controllers, and data logging systems.
