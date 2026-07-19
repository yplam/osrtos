---
title: Tomato32
summary: Tomato32 is a Pomodoro timer application specifically designed for the Waveshare
  ESP32-S3-Touch-LCD-3.49 development board. It features a responsive touchscreen
  interface built with the LVGL graphics library and runs on the ESP-IDF framework
  using FreeRTOS. The project supports customizable timer profiles, smart power management,
  and personalized background assets.
slug: tomato32
codeUrl: https://github.com/einoko/Tomato32
lastUpdated: '2026-06-24'
image: /202607/Tomato32_0.avif
rtos: freertos
libraries:
- lvgl
- spiffs
topics:
- desk-gadget
- embedded
- esp32
- esp32-s3
- focus-tool
- lcd
- lvgl
- microcontroller
- pomodoro
- pomodoro-timer
- productivity
- touchscreen
- waveshare
isShow: true
createdAt: '2026-07-18T14:33:50+00:00'
updatedAt: '2026-07-18T14:33:50+00:00'
relatedProjects:
- pomodoro-timer-dial-for-m5stack-dial
- esp32-8048s050c-with-lvgl-9-4-and-freertos
- esp32-tux
- opentimewatch-os
- flatsphere-clock
- pomodesk-physical-pomodoro-timer
---

Tomato32 is a dedicated Pomodoro timer application designed for the [Waveshare ESP32-S3-Touch-LCD-3.49](https://www.waveshare.com/esp32-s3-touch-lcd-3.49.htm) development board. By utilizing the board's integrated touchscreen and powerful ESP32-S3 microcontroller, it provides a tactile and visually engaging tool for managing focus sessions and breaks. 


## Core Features

The application revolves around a customizable touchscreen interface that supports three distinct timer profiles (A, B, and C). Each profile allows users to define specific durations for focus sessions, short breaks, and long breaks, as well as the number of rounds required before a long break is triggered. 

Beyond basic timing, Tomato32 includes several workflow-oriented features:
- **Flexible Progression**: Users can choose between automatic transitions or manual starts for the next phase.
- **Power Efficiency**: For users running on an 18650 battery, the system offers 14–24 hours of life. This can be extended using "Smart Dim" or "Smart Sleep" modes, which reduce brightness or turn off the screen after 60 seconds of inactivity.
- **Visual Customization**: The UI supports both Light and Dark themes, along with a "Visual Pulse" effect that animates the background when a timer expires.

## Technical Architecture and Setup

Tomato32 is built on the ESP-IDF framework and leverages the LVGL graphics library for its UI components. It uses the Inter typeface for high legibility and incorporates custom sound effects for phase transitions. The project is designed with a dual-target approach: a macOS-based simulator using SDL2 for rapid UI development and the primary ESP32-S3 hardware target.

Flashing the device is handled via a Python-based build script that utilizes Docker to ensure a consistent build environment. The firmware also includes SPIFFS partition management to handle on-device storage for assets and configuration.

## Device Operation and Configuration

The device features two distinct boot modes to balance daily use with administrative tasks:
- **Normal Mode**: A standard boot for using the timer.
- **Config Mode**: Entered by holding the PWR and BOOT buttons simultaneously. In this mode, the device acts as a USB Mass Storage device, allowing users to edit `TOMATO32_CONFIG.conf` directly on their computer.

This configuration file is used to manage Wi-Fi credentials and time zone settings. While Wi-Fi is optional, it enables NTP synchronization to keep the internal Real-Time Clock (RTC) accurate, which is essential for the device's daily "Focused today" statistics tracking.

![The settings interface showing theme and display options](/202607/Tomato32_3.avif)

## Personalization and Advanced UI

Users can personalize the timer experience by enabling custom backdrops. Tomato32 supports 640×172 PNG images that are embedded into the firmware during the build process. The system uses a specificity-based naming convention to automatically select the correct image based on the active preset and theme (e.g., `custom_background_b_dark.png`).

![The main timer screen featuring a custom background image](/202607/Tomato32_2.avif)

For those who need to monitor device health or productivity metrics, the application includes hidden screens. A **Statistics screen**, showing total focus time and daily progress, is accessed by long-pressing the phase label. A **Debug screen**, providing IP address and memory heap information, is triggered by tapping the timer text ten times in quick succession.
