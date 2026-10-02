---
title: ESP32-P4 Home Assistant MQTT Voice Assistant
summary: This project provides local voice assistant firmware for the ESP32-P4 platform,
  built natively on ESP-IDF and integrated with Home Assistant's Assist pipeline.
  It utilizes WakeNet9 for wake-word detection, MQTT for control and discovery, and
  features a local MP3 player and web-based management dashboard.
slug: esp32-p4-home-assistant-mqtt-voice-assistant
codeUrl: https://github.com/dvucinozd/Home-Assistant-MQTT-Voice-Assistant
version: P4-HA-VA-0.1.0
lastUpdated: '2026-01-31'
licenses:
- Apache-2.0
image: /202608/Home-Assistant-MQTT-Voice-Assistant_0.avif
rtos: freertos
libraries:
- lvgl
- lwip
- spiffs
topics:
- esp-idf
- esp32-p4
- home-assistant
- mqtt
- voice-assistant
- wakenet
- wakeword
isShow: true
createdAt: '2026-08-09T09:13:30+00:00'
updatedAt: '2026-08-09T09:13:30+00:00'
relatedProjects:
- esp32-p4-home-assistant-display
- xiaoclaw-ai-voice-assistant-with-local-agent-brain
- tuneoutdisplay
- lvgl-esphome-firmware-for-waveshare-esp32-p4-86-panel
- diy-ai-voice-assistant-for-esp32-s3
- kalo-esp32-voice-assistant
---

The ESP32-P4 Home Assistant MQTT Voice Assistant is a high-performance, local voice firmware designed for the Home Assistant ecosystem. Built natively on ESP-IDF v5.5, it targets the JC-ESP32P4-M3-DEV development board, leveraging the powerful ESP32-P4 microcontroller alongside an ESP32-C6 coprocessor to handle Wi-Fi and Bluetooth connectivity via SDIO. Unlike cloud-dependent assistants, this project focuses on privacy and speed by processing wake words and voice activity detection (VAD) locally before communicating with Home Assistant.

## Local Intelligence with WakeNet9

At the heart of the system is the ESP-SR (Speech Recognition) framework. The firmware uses the WakeNet9 model `wn9_heykira_tts3` to listen for the "Hey Kira" wake word. Users can adjust the detection threshold at runtime via MQTT or the web dashboard, ranging from 0.50 to 0.95, allowing for fine-tuning based on the acoustic environment. Once triggered, the device provides immediate feedback through a short beep and a visual state change on its RGB LED indicator.

## Home Assistant Integration

The integration with Home Assistant is deep and multifaceted. It connects to the Assist pipeline over WebSockets, streaming audio for Speech-to-Text (STT) and receiving intent responses and Text-to-Speech (TTS) audio in return. To ensure the device remains manageable, it employs MQTT Home Assistant Discovery, automatically creating sensors, switches, and number entities within the HA dashboard. These entities allow users to monitor system health (IP address, free memory, uptime) and control hardware parameters like output volume, LED brightness, and Automatic Gain Control (AGC) targets.

## Versatile Hardware Support

The project is optimized for the JC-ESP32P4-M3-DEV board, which features an ES8311 audio codec for high-quality microphone input and speaker output. The architecture supports both Ethernet and Wi-Fi, with a priority-based switching system. Notably, when the system falls back to Wi-Fi, it automatically unmounts the SD card to resolve SDIO pin conflicts between the ESP-Hosted Wi-Fi driver and the local file system. 

Beyond basic voice interaction, the firmware includes several advanced features:
- **Local Timer Fallback**: If Home Assistant fails to parse a timer intent, the firmware can locally extract durations from Croatian keywords to set internal timers.
- **MP3 Playback**: A local MP3 player can stream music from an SD card using the Helix decoder, pausing the voice pipeline during playback to avoid resource conflicts.
- **Web Dashboard**: A built-in web server provides a real-time management interface and WebSerial logging for debugging without a physical USB connection.

## Visual Feedback and Diagnostics

Status is communicated through a multi-color RGB LED (HW-478) and an optional SSD1306 OLED display. The LED uses specific patterns—such as pulsing blue for listening and fast-blinking red for errors—to keep the user informed of the assistant's state. For developers and power users, the system includes a "Safe Mode" to protect against boot loops, a watchdog timer, and detailed reset diagnostics available via MQTT.

## Getting Started

The firmware is built using the standard ESP-IDF toolchain. Configuration is managed via a `main/config.h` file (modeled after a provided example) where users define their Wi-Fi, MQTT, and Home Assistant credentials. Updates can be pushed over-the-air (OTA) using a local HTTP server or directly via the Home Assistant interface, making it easy to maintain the device once it is deployed in a smart home environment.
