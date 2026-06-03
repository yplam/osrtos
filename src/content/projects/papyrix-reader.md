---
title: Papyrix Reader
summary: A lightweight, open-source firmware for the Xteink X4 e-paper reader powered
  by the ESP32-C3. It supports EPUB, Markdown, and plain text formats with advanced
  typography features like the Knuth-Plass line-breaking algorithm and CJK/Thai text
  rendering.
slug: papyrix-reader
codeUrl: https://github.com/bigbag/papyrix-reader
star: 53
version: v1.1.9
lastUpdated: '2026-02-02'
rtos: freertos
libraries:
- littlefs
topics:
- eink
- eink-devices
- esp32
- papyrix
- xteink
- xteink-x4
isShow: true
image: /202602/papyrix-reader.webp
createdAt: '2026-02-03'
updatedAt: '2026-02-03'
relatedProjects:
- zereader
- esp-e-paper-component
- open-display-firmware
- bitclock
- sha2017-badge-firmware
- e-paper-esp32-c6-firmware
---

Papyrix is a specialized, open-source firmware designed for the Xteink X4 e-paper display reader. Built using the PlatformIO ecosystem and targeting the ESP32-C3 microcontroller, it serves as a streamlined alternative to the official closed-source firmware. The project focuses on providing a high-quality reading experience on constrained hardware, balancing feature-rich document parsing with the strict memory limitations of the ESP32-C3.

## Core Features and Format Support

At its heart, Papyrix is a versatile document reader. It provides robust support for EPUB 2 and EPUB 3 parsing, including complex CSS stylesheet handling for text alignment, margins, and font weights. Beyond standard ebooks, it supports Markdown (.md) and plain text (.txt) files, as well as the native XTC/XTCH format. 

One of the standout aspects of Papyrix is its commitment to high-quality typography. It implements the Knuth-Plass line-breaking algorithm—the same logic used by TeX—to ensure professional-quality justified text. The firmware also includes comprehensive support for CJK (Chinese, Japanese, Korean) and Thai text rendering, including proper mark positioning and soft hyphens for improved layout flow.

## Technical Architecture and Memory Management

Developing for the ESP32-C3 requires careful management of its approximately 380KB of RAM. Papyrix addresses this through a unique dual-boot architecture. The system operates in two distinct modes: a UI mode for browsing and settings, and a dedicated Reader mode. When a user opens a book, the device restarts into the Reader mode, which is stripped of non-essential features to provide the maximum possible heap for document rendering. 

To further optimize performance, the firmware utilizes several advanced techniques:
- **Hash-based Lookups**: EPUB spine and Table of Contents (TOC) resolution use FNV-1a hashing for O(1) lookups.
- **Page Caching**: Partial pages are cached in the background to ensure smooth transitions.
- **Group5 Compression**: 1-bit monochrome image data is compressed using CCITT Group5 to reduce SD card I/O and speed up decompression.
- **Word Width Caching**: A 512-entry cache in the renderer avoids redundant font measurements during layout.

## Connectivity and Customization

Papyrix transforms the Xteink X4 into a more open device through its network capabilities. It includes a built-in web server for WiFi file transfers and supports the Calibre Wireless Device protocol, allowing users to send books directly from their desktop library. Because the WiFi stack consumes significant memory, the device automatically restarts after network activity to reclaim resources for the reading engine.

Users can deeply customize their experience through the SD card. The firmware supports custom themes, user-provided fonts in a specialized `.epdfont` format, and custom sleep screens. It also allows for button remapping, including the ability to use the power button for page turns, enabling comfortable one-handed reading.

## Data Management

The system employs a sophisticated caching mechanism on the SD card under a hidden `.papyrix` directory. When a book is first opened, Papyrix indexes the metadata, generates a cover thumbnail, and parses chapters into binary sections. This ensures that subsequent loads are nearly instantaneous. The firmware also provides built-in maintenance tools to clear these caches, perform factory resets, or view detailed system information such as battery voltage and memory fragmentation.
