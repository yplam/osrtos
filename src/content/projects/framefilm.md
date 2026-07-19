---
title: FrameFilm (帧影)
summary: FrameFilm is a retro-styled digital film fridge magnet featuring a 3.6-inch
  color E-Ink display and an ESP32-S3 microcontroller. It utilizes specialized dithering
  algorithms to replicate a film aesthetic and supports wireless photo transmission
  via BLE through a web-based management tool or a WeChat mini-program.
slug: framefilm
codeUrl: https://github.com/kirmisaki/FrameFilm
siteUrl: https://kirmisaki.github.io/FrameFilm/
version: v2.0
lastUpdated: '2026-07-13'
licenses:
- GPL-3.0
image: /202607/FrameFilm_0.avif
rtos: freertos
topics:
- esp-idf
- esp32s3
- ink
isShow: true
createdAt: '2026-07-19T00:28:48+00:00'
updatedAt: '2026-07-19T00:28:48+00:00'
---

FrameFilm (帧影) is an atmospheric electronic film fridge magnet designed to blend retro aesthetics with modern electronic paper technology. The project's name, a combination of "Frame" and "Film," reflects its core mission: to capture and freeze moments of life in a high-texture, film-like format that fits seamlessly into a home environment.


### Core Concept and Features

The device focuses on providing a ritualistic experience for displaying memories. By utilizing a color electronic paper (E-Ink) display, FrameFilm offers a low-power, blue-light-free viewing experience that remains clear even under direct sunlight. A single charge can last for several months, making it a practical decorative piece for any magnetic surface.

Key capabilities include:
- **Film Texture Presentation**: The software incorporates multiple dithering algorithms to add a grainy, retro quality to uploaded photos, mimicking the look of classic film photography.
- **Seamless Connectivity**: Integrated Bluetooth Low Energy (BLE) allows for quick pairing with smartphones for one-click photo uploads and scheduled rotations.
- **Minimalist Design**: With a thickness of approximately 7mm and a magnetic back, the device is designed to be "plug-and-play" on refrigerators or other metal surfaces, fitting various home decor styles.

![FrameFilm Front View](/202607/FrameFilm_1.avif)

### Technical Architecture

The system is built on the ESP32-S3 platform using the ESP-IDF framework. The firmware is organized into a modular architecture to ensure maintainability and hardware abstraction:

*   **film_sys**: Handles low-level system initialization, logging, and configuration management.
*   **film_service**: Manages core business logic, including BLE communication protocols, file system management, photo playback sequencing, and parameter storage.
*   **film_hal**: The Hardware Abstraction Layer that interfaces with the E-Ink display, battery management circuitry, LEDs, encoders, and storage media.

![FrameFilm Side View](/202607/FrameFilm_2.avif)

### Hardware Specifications

The hardware is optimized for a slim profile and efficient power usage. It features a 3.6-inch color E-Ink 6 screen driven by an ESP32-S3 chip. Storage is handled via an external TF card (up to 32GB) or an internal SDnand chip. The device is powered by a 304040-specification lithium battery and fits within a compact 92 × 60 × 7 mm footprint. For those interested in the physical build, the hardware design is open-sourced on the LCEDA (立创) platform, including PCB schematics and 3D models for the enclosure.

### Software Ecosystem and Tools

FrameFilm is supported by a robust set of tools for content management and device control:

#### ForFilm Web Tool
The ForFilm web interface serves as a comprehensive management hub. It allows users to convert standard images into the custom `.Film` file format required by the device. Beyond conversion, it supports real-time dithering adjustments, BLE-based file transfers, and Over-the-Air (OTA) firmware updates directly from a browser.

#### WeChat Mini-Program
For mobile users, the FrameFilm WeChat mini-program provides a convenient way to manage multiple frames. It supports direct uploads from the mobile photo gallery, camera integration, and even a hand-drawn creation mode where users can sketch patterns on their phone and send them instantly to the E-Ink display.

### Development and Getting Started

The project is developed using ESP-IDF v5.3+. Developers can compile the firmware by navigating to the `firmware/frame_film` directory and using standard `idf.py build` commands. The repository structure is clearly partitioned into assets, documentation (covering BLE protocols and file formats), firmware source code, and hardware design files, providing a complete roadmap for both software and hardware enthusiasts.
