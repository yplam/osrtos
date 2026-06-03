---
title: bbTalkie
summary: A DIY portable walkie-talkie based on the ESP32-S3 that leverages embedded
  neural networks for hands-free communication. It features automatic voice detection
  and keyword recognition using the ESP-SR framework, alongside a visual interface
  for animations and text-based conversation display.
slug: bbtalkie
codeUrl: https://github.com/RealCorebb/bbTalkie
star: 165
lastUpdated: '2026-01-07'
rtos: freertos
topics:
- arduino
- diy
- esp32
- intercom
- maker-projects
- walkie-talkie
isShow: true
image: /202601/bbTalkie.webp
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- diy-ai-voice-assistant-for-esp32-s3
- wally-c-version
- starmoon-open-source-conversational-ai-device
- nebaura-labs-mote
- opentoys
- espri-esp-radio-interface
---

## Overview

bbTalkie is a unique take on the traditional walkie-talkie, moving away from the bulky, button-heavy designs of standard radios toward a smart, hands-free wearable device. Developed by Corebb, this project integrates embedded artificial intelligence to solve the common friction points of cycling and outdoor communication. By using an embedded neural network, the device can automatically detect human speech and trigger actions without the need for a Push-To-Talk (PTT) button.

## Key Features and Capabilities

The standout feature of bbTalkie is its use of the **ESP-SR (Espressif Speech Recognition)** framework. This allows the device to perform several advanced audio tasks locally on the edge:

- **Voice Activity Detection (VAD):** The system identifies when a human is speaking, allowing for hands-free transmission.
- **Keyword Recognition:** Specific wake words or keywords can trigger on-screen animations, making the device interactive and expressive.
- **Speech-to-Visuals:** Beyond simple audio transmission, the project includes logic to display conversations as text bubbles or trigger specific visual assets based on the audio input.
- **Bluetooth Camera Control:** A specialized branch of the project (`ble-camera`) provides basic support for controlling SONY cameras via Bluetooth, expanding its utility for vloggers and cyclists.

## Technical Implementation

The project is built on the **ESP-IDF (v5.4.3)** development framework, targeting the high-performance **ESP32-S3** SoC. Because high-speed audio processing and neural network inference are resource-intensive, the project has specific hardware requirements:

- **Octal PSRAM:** The developer specifies the need for an ESP32-S3 variant with 16MB Flash and 8MB PSRAM (specifically Octal PSRAM). Standard Quad PSRAM is often too slow for the ESP-SR framework, which can lead to system freezes during audio processing.
- **Antenna Configuration:** For reliable communication, the `ESP32-S3-WROOM-1U-N16R8` version with an external antenna is recommended.

## Repository Structure

The bbTalkie repository is a complete open-source hardware and software package, containing everything needed to replicate the build:

- **CAD:** Includes 3D models for the enclosure and DXF files for laser-cut components.
- **PCB:** Contains the full hardware design, including schematics, Gerber files, Bill of Materials (BOM), and pick-and-place files.
- **Assets:** Stores the visual and audio resources, such as animations and UI graphics.
- **Tools:** Provides utility scripts for font bitmap generation, graphics conversion, and audio processing to prepare assets for the embedded environment.
- **Tests:** Includes various test programs used to validate hardware and software modules during the development phase.

## Getting Started

To build bbTalkie, developers need an ESP-IDF environment configured for version 5.4.3. The project is designed to be flashed onto an ESP32-S3 with the specific N16R8 memory configuration. Users interested in the camera control features should switch to the `ble-camera` branch, though it is noted that this increases memory consumption significantly. For those looking to customize the interface, the `tools` directory provides the necessary scripts to convert standard images and fonts into formats compatible with the device's display logic.
