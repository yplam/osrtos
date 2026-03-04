---
title: InkWatchy
summary: A modular and highly configurable firmware for the Watchy and Yatchy e-paper
  smartwatches. Built using ESP-IDF and Arduino, it provides a feature-rich environment
  including weather charts, calendar synchronization, encrypted data storage, and
  FreeRTOS-based task management.
slug: inkwatchy
codeUrl: https://github.com/Szybet/InkWatchy
siteUrl: https://github.com/Szybet/InkWatchy/wiki
star: 175
version: v2.1.0
lastUpdated: '2026-02-16'
rtos: freertos
libraries:
- littlefs
topics:
- e-ink
- esp32
- firmware
- rust
- rust-embedded
- smartwatch
- watchy
- watchy-apps
- watchy-faces
- watchy-screen
- wearable
isShow: true
image: /202603/Yatchy1.webp
createdAt: '2026-03-04'
updatedAt: '2026-03-04'
---

InkWatchy is a comprehensive firmware solution built from the ground up for the Watchy e-paper smartwatch and its successor, the Yatchy. Designed to replace the standard Watchy library, it focuses on modularity, performance, and a dynamic user interface. The project is built on the ESP-IDF and Arduino frameworks, leveraging FreeRTOS for efficient task management and LittleFS for robust file system operations.

## Modular Architecture and Performance

One of the defining characteristics of InkWatchy is its modularity. The firmware is designed so that features can be enabled or disabled via configuration files; if a feature is disabled, it is excluded from the compilation process entirely, ensuring the smallest possible binary size and optimal performance. Unlike many other Watchy firmwares that rely on heavy object-oriented subclasses, InkWatchy uses a function-based approach to remain accessible for beginners while maintaining high performance.

## Key Features and Applications

InkWatchy transforms the e-paper watch into a versatile tool with a wide array of built-in applications:

- **Weather and Environment**: Full weather integration via the Open Meteo API, featuring 16-day forecasts, air quality data, and graphical charts.
- **Productivity**: Calendar synchronization using ICS files, allowing users to view events and descriptions directly on their wrist. It also supports an unlimited number of alarms and a Pomodoro timer.
- **Content Consumption**: A built-in book reader that supports multiple books and allows page turning via hand gestures (accelerometer-based).
- **Security**: A unique "Vault" feature allows users to save and view encrypted images (using AES128 CBC/ECB) protected by a PIN, useful for backing up sensitive information like phone numbers or recovery keys.
- **Gaming**: Several games are included, such as Blockchy (Tetris-like), Pong, and a version of Snake written in Rust.

## Technical Implementation

The firmware utilizes a dynamic UI rendering system. Instead of static bitmaps, the UI is rendered only when values change, which significantly improves battery life. It also includes a sophisticated resource management system where images, fonts, and books are converted into variables dynamically via scripts during the build process.

InkWatchy also explores hybrid development by incorporating Rust components into the ESP-IDF environment, as seen in the `inkrusty` component. This allows the project to benefit from Rust's safety features for specific modules while maintaining the broad hardware support of the C++ ecosystem.

## Hardware Support and Battery Optimization

InkWatchy supports a variety of hardware revisions, including Watchy 1.0, 1.5, 2.0, and 3.0, as well as the ESP32-C6 based Yatchy. To maximize battery life, the firmware includes configurable wake-up intervals, a "Disable Wake Up" mode for extreme longevity, and the ability to disable power-hungry components like the vibration motor based on battery percentage.

For developers, the project provides extensive debugging tools, including serial logs that can be toggled via macros and a 3D demo of the accelerometer axis to verify hardware functionality on the fly.
