---
title: LED Controller - ESP32 HUB75E LED Matrix Controller
summary: A comprehensive LED display control system based on the ESP32 and HUB75E
  LED matrices. It features a Kotlin-based Android application for remote control
  via BLE, supporting real-time graffiti, GIF playback, scrolling text, and interactive
  timing games.
slug: led-controller-esp32-hub75e-led-matrix-controller
codeUrl: https://github.com/VincentTung/LEDController
star: 31
version: v0.0.1
lastUpdated: '2025-10-23'
rtos: freertos
topics:
- android
- android-led-matrix
- esp32-hub75e
- esp32-ledmatrix
- hub75e
- led
isShow: false
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- lumifur-controller
- led-matrix-max7219-for-mongoose-os
- esp32-32x32-rgb-matrix-controller
- t-hmi-c64-emulator
- patternflow
- esp32-p4-grid-board
---

## Overview

The LED Controller project is a sophisticated hardware and software ecosystem designed to drive HUB75E LED matrices using the ESP32 microcontroller. By bridging the gap between mobile devices and high-density LED displays, this project enables users to transform a 64x64 LED panel into a dynamic canvas for art, information, and interactive games. The system consists of two primary components: a high-performance Arduino-based firmware for the ESP32 and a feature-rich Android application built with Kotlin.

## Hardware Architecture

The project centers on the ESP32, leveraging its dual-core processing power and integrated Bluetooth Low Energy (BLE) capabilities. The ESP32 interfaces directly with a 64x64 HUB75E LED matrix, which contains 4,096 individual RGB pixels. The hardware setup requires a stable 5V/3A power supply to handle the current demands of the matrix at full brightness. 

The wiring configuration utilizes the ESP32's GPIO pins to drive the standard HUB75E interface signals, including RGB data lines (R1, G1, B1, R2, G2, B2), address lines (A, B, C, D, E), and control signals (CLK, LAT, OE). This direct-drive approach ensures high refresh rates and smooth animations.

## Software Implementation

### ESP32 Firmware
The firmware is developed within the Arduino ecosystem, utilizing specialized libraries for HUB75E driving and BLE communication. It manages the low-level timing required for multiplexing the LED matrix while simultaneously handling incoming BLE commands. The firmware includes logic for:
- **Graphics Rendering**: Processing raw pixel data for static images and real-time graffiti.
- **Animation Engine**: Decoding and displaying GIF animations.
- **Text Processing**: Rendering fonts with support for both static and scrolling modes.
- **Game Logic**: Managing the state and timing for interactive reaction games.

### Android Application
The control interface is a modern Android app developed in Kotlin using ViewBinding and Material Design principles. It provides a user-friendly dashboard for all controller functions. Key technical features of the app include:
- **BLE Optimization**: Implementation of MTU (Maximum Transmission Unit) and PHY (Physical Layer) negotiation to maximize data throughput for image transfers.
- **Real-time Canvas**: A 64x64 drawing interface that synchronizes with the LED matrix in real-time.
- **Image Processing**: Utilizing the Glide library for image loading and custom processors to scale and optimize images for the 64x64 resolution.
- **Concurrency**: Using Kotlin Coroutines for non-blocking UI and background BLE operations.

## Key Functionalities

### Dynamic Text & Clock
Users can send text to the display with adjustable font sizes and scrolling speeds. The system also includes a real-time clock mode, turning the matrix into a functional timepiece synchronized with the mobile device.

### Graffiti & Media
The graffiti mode allows for freehand drawing on the smartphone screen, which is mirrored instantly on the LED panel. Additionally, the app includes a library of GIF animations and supports uploading custom images from the phone's gallery.

### Interactive Timing Game
To demonstrate the system's low-latency capabilities, the project includes a timing game. The LED matrix displays a target time, and the user must stop a running timer on the app as close to the target as possible, testing reaction speed and system responsiveness.

## Technical Configuration

The system is highly configurable through header files in the firmware and constant definitions in the Android source code. Developers can adjust the matrix dimensions, change BLE UUIDs, or modify pin assignments to suit different hardware revisions. The use of BLE service and characteristic UUIDs allows for structured data exchange, separating control commands, brightness adjustments, and bulk data transfers like GIF frames.
