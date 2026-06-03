---
title: SHA2017 Badge Firmware
summary: The official firmware for the SHA2017 hacker camp badge, built on the Espressif
  ESP-IDF framework and FreeRTOS. It provides a robust platform featuring a MicroPython
  runtime, uGFX graphics support for E-ink displays, and integrated WiFi connectivity
  for the ESP32-based hardware.
slug: sha2017-badge-firmware
codeUrl: https://github.com/SHA2017-badge/Firmware
siteUrl: https://wiki.sha2017.org/w/Projects:Badge
star: 84
version: sha2
lastUpdated: '2018-08-19'
rtos: freertos
libraries:
- lwip
- micropython
- spiffs
topics:
- eink
- epd
- esp32
- firmware
- micropython
- ugfx
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- micropython-and-lvgl-firmware-for-esp32
- unigeek-firmware
- open-display-firmware
- e-paper-esp32-c6-firmware
- stick-firmware
- bruce-firmware
---

The SHA2017 Badge Firmware is the core software stack developed for the electronic badge distributed at the Still Hacking Anyway (SHA) 2017 hacker camp. Built on the Espressif IoT Development Framework (ESP-IDF), the firmware leverages FreeRTOS to manage the complex tasks of a modern connected wearable, including wireless networking, power management, and a high-level application environment.

## A Hybrid Development Environment

One of the most significant features of the SHA2017 badge is its hybrid nature. While the core system is written in C for performance and low-level hardware access, it prominently features a MicroPython port. This allows users to write "apps" or scripts directly on the badge using Python, significantly lowering the barrier to entry for attendees who wanted to customize their devices during the event. The firmware includes a specialized `badge` module for MicroPython to interact with the hardware peripherals.

## Graphics and Display Technology

The badge features a 2.9-inch E-ink (Electronic Paper) display, which provides excellent readability in direct sunlight and maintains an image without consuming power. To manage this display, the firmware integrates the uGFX library, a lightweight and powerful graphics stack. uGFX handles everything from basic geometric primitives to complex font rendering and image decoding. The firmware supports multiple E-ink controller variants (such as the DEPG0290B1 and GDEH029A1) and includes custom look-up tables (LUTs) for partial screen updates and grayscale rendering.

## Hardware Interfacing

The firmware is designed to manage a variety of peripherals specific to the SHA2017 hardware design:
- **ESP32 SoC**: Utilizing the dual-core Xtensa LX6 processor for application logic and network processing.
- **MPR121 Touch Controller**: Managing the capacitive touch buttons on the front of the badge.
- **WS2812B LEDs**: Driving the programmable RGB LEDs for visual feedback and flair.
- **Power Management**: Monitoring battery voltage and charging status via the ESP32's ADC and dedicated GPIOs.
- **Storage**: Utilizing SPIFFS and FatFS for storing Python scripts, configuration data, and assets on the internal flash and optional SD card.

## Networking and OTA Updates

Connectivity is a core component of the badge experience. The firmware uses the lwIP stack for TCP/IP communication over WiFi. It includes a custom Over-the-Air (OTA) update mechanism that allows the badge to pull new firmware versions directly from the event's servers. This was used during the camp to push bug fixes and new features to thousands of attendees simultaneously.

## Getting Started for Developers

For developers looking to modify the native firmware, the project uses a standard Makefile-based build system compatible with the ESP-IDF toolchain. The environment can be set up using the provided `set_env.sh` script, which configures the paths for the Xtensa compiler. 

For those preferring the MicroPython route, the badge provides a REPL over the serial port and a web-based installer for deploying scripts. A simple example of using the uGFX library within MicroPython to draw on the E-ink display is shown below:

```python
import badge
import ugfx

# Initialize the display
ugfx.init()
ugfx.clear(badge.BLACK)

# Draw shapes and text
ugfx.box(30, 30, 50, 50, badge.WHITE)
ugfx.string(130, 50, "Hacking", "PermanentMarker22", badge.WHITE)

# Flush the buffer to the E-ink screen
ugfx.flush()
```

## Legacy and Impact

The SHA2017 badge firmware served as a reference point for many subsequent hacker camp badges. Its successful integration of a high-level language (MicroPython) with a professional-grade RTOS (FreeRTOS) and a specialized display (E-ink) proved that event hardware could be both a functional tool and a versatile educational platform.
