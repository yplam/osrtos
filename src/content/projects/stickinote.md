---
title: StickiNote
summary: StickiNote is a digital sticky note application optimized for the ESP32-P4
  high-performance microcontroller. It utilizes the MIPI DSI interface for 10-inch
  displays and the LVGL v9 library to provide a smooth, e-paper-styled user interface
  with persistent storage.
slug: stickinote
codeUrl: https://github.com/0015/StickiNote
star: 42
lastUpdated: '2025-03-26'
rtos: freertos
libraries:
- lvgl
- lwip
topics:
- embedded
- embeddedapp
- esp-idf
- esp32-p4
- lvgl
- sticky-notes
- thatproject
isShow: false
createdAt: '2026-01-13'
updatedAt: '2026-01-13'
relatedProjects:
- esp32-8048s050c-with-lvgl-9-4-and-freertos
- esp-e-paper-component
- esp32-p4-grid-board
- esp32-p4-home-assistant-display
- lvgl-port-for-m5stack-core2
- esp32berry
---

## Overview

StickiNote is a modern, e-paper-styled digital sticky note application designed specifically for high-performance embedded systems based on the ESP32-P4. Unlike standard ESP32 boards, the ESP32-P4 provides the necessary clock speed and specialized peripherals, such as the MIPI DSI interface, to drive large 10-inch displays with fluid animations and responsive touch interactions.

The project serves as a sophisticated example of how to implement a complex, gesture-driven UI on a microcontroller. It mimics the aesthetic of a physical notebook while providing digital advantages like persistent storage, easy editing, and dynamic resizing of notes.

## Key Features

StickiNote offers a comprehensive suite of features tailored for a large-screen embedded experience:

- **Digital Post-its**: Users can add, move, and resize notes across the screen using intuitive touch gestures.
- **Persistent Storage**: Notes are saved as JSON data within the ESP32's Non-Volatile Storage (NVS), ensuring that all information is restored automatically after a reboot.
- **Fluid UI with LVGL v9**: The application leverages the latest version of the Light and Versatile Graphics Library (LVGL) to achieve high frame rates and smooth transitions.
- **Integrated Keyboard**: A pop-up digital keyboard allows for direct text input on individual notes.
- **Hardware Acceleration**: Optimized for the ESP32-P4’s hardware rendering capabilities to maintain performance on high-resolution 10-inch screens.

## Technical Implementation

The project is built using the **ESP-IDF (v5.3+)** framework and utilizes **FreeRTOS** for task management. The architecture is modular, separating the UI logic from the system management:

- **LVGL_WidgetManager**: This component manages the lifecycle of UI elements, handling the creation and destruction of sticky notes and their associated objects.
- **NVSManager**: Responsible for the serialization and deserialization of note data. It handles the storage of note positions, sizes, and text content in the flash memory.
- **SplashScreen**: Provides an animated entry point to the application, demonstrating the system's ability to handle smooth graphical transitions immediately upon boot.

## Hardware Requirements

StickiNote is designed exclusively for the **ESP32-P4** SoC. The high clock speed and MIPI DSI support are essential for driving the target 10-inch display. The project specifically includes support for Waveshare hardware, such as the ESP32-P4 Nano and the JD9365-based 10.1-inch LCD. 

## Getting Started

To build StickiNote, developers need an environment configured with ESP-IDF v5.3 or later. The project relies on specific component dependencies, including the Waveshare drivers for the JD9365 display and the ESP32-P4 Nano board support package. Once flashed, the interface is entirely touch-driven: users tap the Floating Action Button (FAB) to create notes, long-press to edit text, and use corner handles for resizing. The system automatically handles data persistence, making it a practical tool for persistent digital signage or desktop organization.
