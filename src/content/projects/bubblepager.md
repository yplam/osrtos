---
title: BubblePager
summary: BubblePager is a dedicated hardware pager for Telegram that displays video
  notes, stickers, and text on a round GC9A01 display. Built on the ESP32-S3 platform
  using the LVGL graphics library and FreeRTOS, it communicates with a self-hosted
  FastAPI server that transcodes media into MJPEG streams. The system features a custom
  unread queue, touch/button navigation, and motion-wake capabilities.
slug: bubblepager
codeUrl: https://github.com/GavinnnTann/BubblePager
lastUpdated: '2026-07-24'
licenses:
- MIT
image: /202608/BubblePager_0.avif
rtos: freertos
libraries:
- lvgl
topics:
- arduino
- diy
- embedded
- esp32
- esp32-s3
- fastapi
- ffmpeg
- gc9a01
- gc9a01display
- hardware
- iot
- lvgl
- mjpeg
- pager
- platformio
- round-display
- telebubble
- telegram
- telegrambot
- video-notes
isShow: true
createdAt: '2026-08-02T06:42:51+00:00'
updatedAt: '2026-08-02T06:42:51+00:00'
relatedProjects:
- lilygo-t-display-s3-boilerplate
- readmepaper-esp32-7-color-e-paper-display-project
- esp32-s3-mjpeg-video-player
- esp32-p4-home-assistant-display
- esp32-p4-grid-board
- sonosesp-esp32-p4-sonos-controller
---

BubblePager is a physical, receive-only pager designed specifically for Telegram. It offers a way to glance at incoming messages without the distractions of a smartphone. By focusing on Telegram's circular video notes, stickers, and short texts, the project creates a specialized communication device that feels like a modern reimagining of a classic pager.

### The Inspiration

The project was born from the realization that Telegram's circular video-note bubbles are a perfect match for round displays. BubblePager leans into this aesthetic, using a round panel to display video notes edge-to-edge. It provides a focused experience: messages arrive one at a time, avoiding the "doomscroll" of notification feeds and group chats.

![Text message on the round display](/202608/BubblePager_2.avif)

### Key Features

The device is packed with features designed for a seamless "glanceable" experience. It supports MJPEG streaming for video notes, complete with a live progress ring and tap-to-pause functionality. It handles both static (WEBP) and video (WEBM) stickers, while gracefully declining unsupported formats like Lottie animations. 

For text communication, messages are word-wrapped specifically for the round display's safe zone. The interface includes a pager-style unread queue where new arrivals pulse the sender's profile photo. If ignored, the display sleeps and maintains an unread count. Users can catch up using a reels-style interface, skipping through missed messages, or browse a history carousel using touch swipes or physical buttons.

### System Architecture

The BubblePager ecosystem consists of two primary components: the ESP32-S3 firmware and a self-hosted Python server. The data flow begins when a message is sent to a Telegram bot. The FastAPI server, utilizing FFmpeg, downloads and transcodes the media into a 240×240 MJPEG stream. It also fetches the sender's avatar and pushes the event to the device over WiFi using Server-Sent Events (SSE).

![Incoming pulse screen with sender avatar](/202608/BubblePager_1.avif)

On the device side, the firmware streams and decodes the MJPEG data directly to the round panel. The firmware is built using PlatformIO and the Arduino framework, leveraging LVGL v9 for the graphical interface and ArduinoJson for data management.

### Hardware Implementation

The heart of the BubblePager is an ESP32-S3 (N16R16) microcontroller. This drives a GC9A01 240×240 round IPS panel over an I80 parallel bus for high-performance updates. The hardware suite is comprehensive, including:

*   **Capacitive Touch:** For intuitive navigation and swipes.
*   **Haptic Feedback:** Providing physical confirmation for interactions.
*   **TCA6408 Button Expander:** To handle physical navigation buttons.
*   **PCF85063 RTC:** For accurate timekeeping and clock faces.
*   **QMI8658 IMU:** Enabling motion-wake and auto-rotation of the UI.


### Interaction and Customization

Navigation is designed to be flexible, supporting both a capacitive touch ring and physical buttons. This dual-input model ensures the device is usable in various environments. Users can access on-device settings through a touch-scrollable wheel to manage WiFi/NTP synchronization, haptics, motion-wake sensitivity, and auto-rotation preferences. The server component is designed for easy deployment via Docker, allowing it to run on a Raspberry Pi, VPS, or home server without vendor lock-in.
