---
title: ESP32 MP3
summary: A custom-built portable MP3 player based on the ESP32 that features Bluetooth
  A2DP audio streaming and a dedicated OLED user interface. It utilizes a modular
  C++ architecture and a custom-designed PCB to manage media playback from a MicroSD
  card.
slug: esp32-mp3
codeUrl: https://github.com/GiacoBot/ESP32MP3
version: v1.1.0-beta
lastUpdated: '2026-01-28'
licenses:
- GPL-3.0
image: /202604/ESP32MP3_0.avif
rtos: freertos
libraries:
- u8g2
topics:
- a2dp
- a2dp-source
- bluetooth-audio
- esp32
- esp32-arduino
- microsd
- mp3-player
- platformio
isShow: true
createdAt: '2026-04-16T03:43:35+00:00'
updatedAt: '2026-04-16T03:43:35+00:00'
---

The ESP32 MP3 project is a self-built, portable media player that combines custom hardware design with an intuitive software interface. Originally conceived as a simple software experiment for Bluetooth audio streaming, the project evolved into a comprehensive product featuring a custom-designed development board and a bespoke graphical user interface.


## Key Features

The device is built around a custom development board (Rev 1.1) designed in KiCad to house all components compactly. It features a 0.96" SSD1306 OLED display for the user interface and is controlled via five physical buttons (Up, Down, Left, Right, and Enter). For storage, it utilizes a MicroSD card slot and includes integrated power management with support for Li-Ion batteries and USB-C charging.

On the software side, the system acts as a Bluetooth A2DP source, allowing it to connect to wireless headphones and speakers. The firmware supports a multi-screen UI including:
*   **Bluetooth Device Selection**: For scanning and managing connections.
*   **Track Selection**: For browsing the music library stored on the SD card.
*   **Now Playing**: Displaying track metadata, titles, and progress bars.
*   **Volume Control**: Direct adjustment from the interface.

## Hardware Architecture

The hardware is centered on the ESP32-WROOM-32E module. The development board was optimized for manual assembly and portability, integrating the processor with the display, storage, and input modules. 

![Custom PCB design for the ESP32 MP3 project](/202604/ESP32MP3_1.avif)

Key hardware components include:
*   **Processor**: ESP32-WROOM-32E
*   **Display**: SSD1306 I2C/SPI OLED (128x64)
*   **Storage**: Standard MicroSD card reader
*   **Design Tool**: KiCad

## Software Design and Framework

The firmware is developed using the Arduino framework within the PlatformIO ecosystem. It relies on several specialized libraries to handle the complex audio pipeline and user interface. The U8g2 library manages the monochrome display, while the audio decoding is handled by a combination of `arduino-audio-tools`, `ESP32-A2DP`, and the Helix-based `arduino-libhelix` decoder.

The software architecture is built around a state machine that manages navigation between different application screens. The logic is encapsulated into specialized "Managers" (Display, Input, Bluetooth, and Player). This modular approach ensures high cohesion and low coupling, allowing the system to communicate via an internal event system and shared states.

## Getting Started

To use the device, the hardware requires a MicroSD card formatted as FAT32. Music files must be encoded as MP3s with a specific sample rate of 44100 Hz to ensure compatibility with the decoding pipeline. The firmware is compiled and uploaded using PlatformIO, with the core logic located in the `Software` directory of the repository.

## User Interface Gallery

The interface is designed for smooth navigation, supporting short presses, long presses, and auto-repeat for button inputs to facilitate fast browsing through large music libraries.

![User interface screenshots showing track selection and playback](/202604/ESP32MP3_2.avif)
