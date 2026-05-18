---
title: Xiaozhi AI Desk Buddy (ESP32-S3)
summary: An expressive AI desk companion based on the Seeed Xiao ESP32-S3 that features
  a fully animated face system. It utilizes the ESP-IDF framework with FreeRTOS, LVGL
  for rendering display interfaces, and SPIFFS for asset storage. The project integrates
  I2S audio components for listening and speaking capabilities, creating a dynamic
  interactive experience.
slug: xiaozhi-ai-desk-buddy-esp32-s3
codeUrl: https://github.com/TechTalkies/Xiaozhi-for-XiaoESP32S3
lastUpdated: '2026-04-17'
licenses:
- GPL-3.0
image: /202605/Xiaozhi-for-XiaoESP32S3_0.avif
rtos: freertos
libraries:
- lvgl
- spiffs
isShow: true
createdAt: '2026-05-18T12:36:30+00:00'
updatedAt: '2026-05-18T12:36:30+00:00'
---

The Xiaozhi AI Desk Buddy is a charming example of how embedded systems can be used to create personality in hardware. Built around the compact but powerful Seeed Xiao ESP32-S3, this project transforms a collection of sensors and displays into an expressive desk companion. It is an extension of the Xiaozhi firmware, focusing heavily on a sophisticated animation system that brings a digital face to life.

## Expressive Visuals with LVGL

At the heart of the Desk Buddy is a 128x64 OLED display. Rather than showing static text or simple icons, the project uses the LVGL graphics library to render a variety of facial expressions. The system includes an idle animation where the character looks around and a natural blinking system that triggers randomly to mimic biological behavior.

One of the more technically interesting features is the "listening" pose. When the device is processing audio input, the eyes scale with a perspective effect, giving the impression of focus and attention. When the AI "speaks," a dynamic mouth animation syncs with the output, providing visual feedback that mirrors the interaction.

## Audio and Hardware Integration

The project leverages the ESP32-S3's I2S peripherals to handle high-quality audio. For input, it uses an I2S MEMS microphone, while output is handled via a MAX98357A I2S amplifier connected to a 4Ω 3W speaker. This setup allows for clean, digital audio processing, which is essential for both voice recognition and playback.

To manage these concurrent tasks—rendering graphics, processing audio, and maintaining network connectivity—the firmware relies on FreeRTOS within the ESP-IDF framework. This ensures that UI updates remain smooth even while the device is performing intensive background tasks like Wi-Fi communication or audio streaming. The project also includes a dedicated `mic_plotter` utility to help users visualize and verify the raw 16-bit signed audio data coming from the microphone.

## Robust Firmware Management

Handling assets on a small microcontroller can be challenging. The Xiaozhi firmware utilizes SPIFFS (Serial Peripheral Interface Flash File System) to store the graphical assets required for the animations. This separation of code and assets makes it easier to manage the visual components of the project without bloating the primary firmware binary.

Furthermore, the project includes support for Over-the-Air (OTA) updates with a specific partition layout. This is a critical feature for any "smart" desk companion, allowing for the delivery of new features or animation improvements without needing to plug the device back into a computer. For those just starting, the repository even provides a batch flasher for Windows to simplify the initial setup and deployment process.
