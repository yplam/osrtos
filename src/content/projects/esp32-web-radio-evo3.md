---
title: ESP32 Web Radio Evo3
summary: An advanced internet radio streamer built on the ESP32-S3 platform, featuring
  support for MP3, AAC, VORBIS, and FLAC streams. It integrates a web server for remote
  control, an OLED display for visualization, and supports both rotary encoder and
  infrared remote inputs.
slug: esp32-web-radio-evo3
codeUrl: https://github.com/dzikakuna/ESP32_radio_evo3
star: 41
lastUpdated: '2025-12-27'
rtos: freertos
libraries:
- u8g2
- spiffs
topics:
- esp32
- internetradio
- webradio
isShow: true
image: /202601/RadioAsm1.webp
createdAt: '2026-01-22'
updatedAt: '2026-01-22'
relatedProjects:
- radiojkk32-multifunctional-internet-radio-player
- snow-radio
- tinyradio9-for-wt32-sc01-plus
- melody-machine
- si4732-radio
- esp32-rtspserver
---

The ESP32 Web Radio Evo3 is a sophisticated internet radio streamer designed for the ESP32-S3 microcontroller. This third iteration of the "Evo" series represents a significant step forward in DIY audio streaming hardware, providing a custom-tailored experience that moves beyond generic platforms. By leveraging the PCM5102A DAC, the system delivers high-quality audio across various formats, including MP3, AAC, VORBIS, and high-bitrate FLAC streams up to 1.5Mbit.

## Hardware and Architecture

The project is built around a robust hardware stack. At its core is the ESP32-S3, which provides the processing power and connectivity required for stable audio streaming and concurrent web server operations. The user interface is handled through a 256x64 OLED display based on the SSD1322 or SH1122 driver IC, offering multiple display modes including fullscreen clocks and real-time VU meters. 

Interaction is streamlined through a single rotary encoder or a standard 38kHz NEC infrared remote control (such as the Kenwood RC-406 clone). This allows for intuitive volume adjustment, station switching, and power management. The hardware design also includes a resistance keyboard based on a single ADC input and support for SD or micro SD card readers for configuration and station storage.

## Software Capabilities

One of the standout features of the Evo3 is its integrated web server. This allows users to control the radio from any desktop or mobile device on the same network. The web interface provides access to station lists, bank selection, volume control, and a settings menu. Furthermore, the system supports Over-The-Air (OTA) updates directly through the web page, simplifying the process of keeping the firmware up to date.

Key software features include:
- Support for 16 banks with 99 stations per bank.
- 3-point Equalizer for audio customization.
- Polish font support for correct display of station strings.
- Sleep timer and power management via remote control.
- SD card content review through the web interface.

## Configuration and Usage

Storage and configuration are handled via an SD card, which stores station bank files and remote control mappings. The radio streams URL addresses are defined in bank files (e.g., Bank01.txt), which can be stored on the SD card or downloaded automatically from a GitHub repository. For a minimal setup, the radio can function with just the ESP32-S3 and PCM5102A, storing the last used station and volume in EEPROM, though the full experience is realized with the addition of an SD card and physical controls.

## Technical Implementation

The project is developed using the Arduino framework but is fully compatible with PlatformIO. It utilizes several key libraries to manage its complex tasks: `ESP32-audioI2S` for audio decoding, `U8g2` for the high-resolution display, and `WiFiManager` for easy network provisioning. The software architecture is designed to handle network streaming, display updates, and user input concurrently, leveraging the underlying FreeRTOS capabilities of the ESP32-S3.
