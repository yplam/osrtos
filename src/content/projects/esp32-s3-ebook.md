---
title: ESP32-S3 Ebook
summary: An advanced ESP32-S3-based e-book reader featuring a 2.7-inch E-ink display
  and a custom-built UI framework. It integrates Wi-Fi/BLE connectivity, audio playback
  via the ES8311 codec, and a diverse application ecosystem including a reader, notepad,
  and file manager.
slug: esp32-s3-ebook
codeUrl: https://github.com/CHENXiNNNX/Ebook
siteUrl: https://github.com/CHENXiNNNX/Ebook/releases
version: Ebook-v1.1.0
lastUpdated: '2026-08-07'
licenses:
- MIT
image: /202610/Ebook_0.avif
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- littlefs
- lwip
- nimble
topics:
- e-ink
- e-paper
- e-reader
- embedded
- esp-idf
- esp32-s3
- iot
isShow: true
createdAt: '2026-10-06T01:33:55+00:00'
updatedAt: '2026-10-06T01:33:55+00:00'
---

The ESP32-S3 Ebook is a sophisticated open-source firmware and hardware project that transforms the ESP32-S3 SoC into a highly capable electronic paper reader. Unlike many hobbyist projects that use basic static displays, this repository implements a comprehensive UI framework optimized for the unique constraints of E-ink technology, including a dedicated routing system, frame composer, and presentation pipeline.

## Custom UI Framework and Display

The heart of the device is a 2.7-inch GDEY027T91 electronic paper display (264×176). The software stack is designed to handle the inherent latency of e-paper by supporting three distinct refresh modes: full refresh, fast refresh, and partial refresh. This allows the UI to remain responsive during navigation while maintaining high contrast for reading.

The project features a custom-built UI framework that manages the application lifecycle and screen rendering. It utilizes a "router + composer + presentation pipeline" architecture. This structure allows for fluid transitions between the 12 built-in applications, including a system shell that provides a lock screen, home screen, and control center. Interaction is handled through a combination of an FT6336U capacitive touch screen and a three-stage ADC-based sliding switch for tactile navigation.

## Application Ecosystem

The firmware includes a robust set of pre-installed applications that demonstrate the versatility of the ESP32-S3 platform:

*   **Reader**: Supports TXT files with adjustable font sizes, progress tracking, and selectable refresh modes. EPUB support is currently in the planning stages.
*   **Music Player**: Leverages the ES8311 codec and I2S interface to play MP3 and WAV files directly from storage.
*   **Notepad & Drawing Board**: Allows for TXT file editing and 1-bit BMP drawing, with the ability to export files to internal or external storage.
*   **Weather & Utilities**: Includes a weather app powered by the AMap API, a calendar with month views, a large-digit clock with alarm functionality, and a file manager for browsing internal and SD card directories.
*   **Electronic Muyu**: A digital version of the traditional wooden fish instrument, featuring tap counting and sound effects.

## Technical Architecture and Storage

The project is built on the ESP-IDF (v5.4+) framework, utilizing FreeRTOS for task management. It makes extensive use of the ESP32-S3's Octal PSRAM to handle memory-intensive tasks like font rendering via FreeType and JPEG decoding.

Storage is managed through a sophisticated partitioning scheme. A 16MB Flash configuration is used to host several filesystems:
*   **LittleFS**: Used for the `/assets` partition to store read-only resources like fonts, icons, and IME data.
*   **FatFS**: Used for the `/int` (userdata) partition, which supports wear leveling and is accessible via USB Mass Storage Class (MSC). This allows users to drag and drop books and music directly from a PC.
*   **SDMMC**: Supports external TF cards for large-capacity storage of media and documents.

## Connectivity and Hardware Integration

Connectivity is a core feature of the Ebook project. It utilizes the NimBLE stack for Bluetooth LE operations and supports Wi-Fi for NTP time synchronization and HTTP-based weather updates. The hardware integration is comprehensive, featuring a QMI8658A 6-axis IMU for motion sensing, ADC-based battery voltage sampling for real-time power monitoring in the status bar, and PWM-controlled backlighting.

For developers, the project provides a clean directory structure separating the BSP (Board Support Package), the application layer, and the core UI framework. It also includes scripts for firmware packaging and code formatting, ensuring a professional development workflow.
