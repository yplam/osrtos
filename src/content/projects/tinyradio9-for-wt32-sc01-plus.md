---
title: TINYRadio9 for WT32-SC01-PLUS
summary: An internet radio project for the WT32-SC01-PLUS (ESP32-S3) module featuring
  a sophisticated LVGL-based touchscreen interface. It utilizes ESP32-audioI2S for
  streaming and LittleFS for configuration storage.
slug: tinyradio9-for-wt32-sc01-plus
codeUrl: https://github.com/DrNeuroSurg/TINYRadio9
lastUpdated: '2024-06-14'
rtos: freertos
libraries:
- littlefs
- lvgl
topics:
- lvgl
- lvgl-esp32
- wt32-sc01-plus
isShow: true
image: /202604/tinyradio9.webp
createdAt: '2026-04-26T02:24:13+00:00'
updatedAt: '2026-04-26T02:24:13+00:00'
---

## Bringing High-Quality Internet Radio to the WT32-SC01-PLUS

TINYRadio9 is a specialized firmware designed to turn the WT32-SC01-PLUS development board into a feature-rich internet radio. This project specifically targets the ESP32-S3 powered hardware, which provides the necessary performance for handling both a responsive touch-based user interface and smooth audio decoding simultaneously.

### Advanced Graphics with LVGL

At the heart of the user experience is a modern interface built using LVGL (Light and Versatile Graphics Library) version 9.1.0. By utilizing the LovyanGFX driver, the project achieves high-performance rendering on the WT32-SC01-PLUS's integrated display. This combination allows for smooth transitions, detailed station information, and intuitive touch controls that make navigating through internet radio stations a seamless experience.

### Audio Performance and Connectivity

For audio playback, TINYRadio9 relies on the robust `ESP32-audioI2S` library. This allows the device to stream various internet radio formats directly over Wi-Fi with high stability. To manage network connectivity and initial setup, the project incorporates an asynchronous web server and DNS server, providing a convenient interface for configuration.

The inclusion of a double reset detector helps in managing configuration modes, allowing users to enter setup routines easily. For local storage of station lists and system settings, the project utilizes the LittleFS filesystem, which offers better performance and power-loss resilience for flash memory compared to older alternatives.

### Hardware Integration

While the WT32-SC01-PLUS is a touch-centric device, TINYRadio9 also supports physical controls. The integration of the Ai Esp32 Rotary Encoder library allows for tactile navigation, offering a classic radio feel alongside the modern touchscreen. This hybrid approach ensures that the device is accessible whether you prefer physical knobs or digital sliders.

### Technical Configuration

The project is built using the PlatformIO ecosystem, targeting the ESP32-S3 with specific optimizations. It uses the Arduino framework, benefiting from the extensive library ecosystem while running on top of FreeRTOS for task management. The build configuration uses `-O2` optimization flags to ensure the best possible performance for audio processing and UI rendering.

For those looking to flash the firmware, the project uses a specific memory layout optimized for the 16MB flash size of the WT32-SC01-PLUS:

- **Bootloader**: 0x0000
- **Partition Table**: 0x8000
- **Boot App**: 0xe000
- **Firmware**: 0x10000

The flash process is configured for DIO mode at 80MHz, ensuring fast boot times and reliable operation of the LittleFS filesystem and application code.
