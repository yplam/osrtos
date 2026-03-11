---
title: OpenHoop
summary: An open-source smart hula hoop controller based on the Arduino Nano 33 BLE
  Sense Rev2. It provides high-density DotStar LED control with persistence-of-vision
  (POV) animations, BLE connectivity for real-time effect tuning, and IMU-based motion
  reactivity.
slug: openhoop
codeUrl: https://github.com/angelcamelot/OpenHoop
star: 11
lastUpdated: '2025-10-12'
rtos: mbed-os
topics:
- arduino-nano-33-ble-sense
- bluetooth-connection
- gyroscope
- hid-device
- hulahoop
- led-controller
- neopixel
- open-source
- platformio
- sound-level-meter
isShow: false
createdAt: '2026-03-11'
updatedAt: '2026-03-11'
---

## Overview

OpenHoop is an open-source LED hoop controller designed for artists, makers, and performers who want to merge light, movement, and code. Built around the Arduino Nano 33 BLE Sense Rev2, the project provides a robust platform for driving high-density DotStar LEDs with precision timing. It is specifically engineered to deliver persistence-of-vision (POV) patterns and responsive lighting effects that react to the performer's movements.

The project stands out by combining a modular effect engine with a flexible Bluetooth® Low Energy (BLE) control stack. This allows performers to adapt routines on the fly, switching between pre-built animations, solid colors, or complex pixel-art sequences. The firmware is designed to be accessible yet powerful, offering a clear path for developers to script new animations or integrate alternative hardware builds.

## Persistence of Vision (POV) Technology

At the heart of OpenHoop is its ability to leverage Persistence of Vision (POV). By synchronizing DotStar LEDs with the hoop's rotation, the controller transforms rapid LED animations into continuous mid-air images. This allows the hoop to "paint" detailed pixel art, logos, and scrolling messages as it spins.

The system includes a dedicated workflow for translating digital drawings into LED frames. This involves capturing motion data from the onboard IMU to determine rotation speed, mapping canvas dimensions, and using Python-based tools to convert artwork into DotStar-compatible color data. The firmware then handles the high-speed rendering required to maintain image clarity during performance.

## Technical Architecture

OpenHoop is built using the PlatformIO ecosystem and targets the Nordic nRF52840-based Arduino Nano 33 BLE Sense. The software architecture is modular, separating the core LED driving logic from the effect engine and communication layers.

**Key components include:**
- **Effect Engine:** A class-based system where custom effects inherit from a base `Effect` class, implementing `start()`, `update()`, and `stop()` methods.
- **BLE Control Stack:** A UART-style GATT service that accepts UTF-8 payloads. It supports complex commands for changing effect types, tuning parameters via JSON, and streaming run-length encoded (RLE) image data.
- **Sensor Integration:** The system taps into the BMI270 IMU for motion-reactive effects and the PDM microphone for sound-responsive lighting.
- **Energy Management:** Configurable performance profiles allow users to balance brightness and responsiveness against battery runtime, which is critical for long performances.

## Hardware and Connectivity

The reference hardware design utilizes a 2S Li-Ion battery configuration (7.4V–8.4V) regulated by Mini560 step-down converters to provide the high current (up to 5A) required by high-density LED strips. The use of the Arduino Nano 33 BLE Sense Rev2 provides a wealth of onboard sensors, including a gyroscope, accelerometer, and microphone, all of which are utilized by the firmware to drive adaptive lighting behaviors.

## Getting Started

Developers can get started by cloning the repository and opening it in PlatformIO. The project relies on several standard libraries, including `Adafruit DotStar`, `ArduinoBLE`, and the `PDM` library for audio input. Once the hardware is assembled according to the provided diagrams, the firmware can be uploaded to the microcontroller. Users can then interact with the hoop using any BLE-capable mobile app or terminal to send commands such as `EffectType`, `SolidColor`, or `ImageUpload` to customize their performance.
