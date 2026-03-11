---
title: Gesture-Detecting Macro Keyboard
summary: A Bluetooth-enabled macro keyboard featuring gesture recognition powered
  by TensorFlow Lite for Microcontrollers on an ESP32. It combines capacitive touch
  sensors, physical buttons, and an OLED display to provide customizable computer
  control via BLE HID and AutoHotkey integration.
slug: gesture-detecting-macro-keyboard
codeUrl: https://github.com/jakkra/Gesture-Detecting-Macro-Keyboard
star: 96
lastUpdated: '2022-04-22'
rtos: freertos
libraries:
- tensorflow-micro
topics:
- 3d-printing
- ahk-script
- autohotkey
- ble
- bluetooth
- bluetooth-hid
- esp-idf
- esp32
- macro-keyboard
- microcontroller
- tensorflow
- tensorflow-micro
- trill
isShow: true
image: /202512/Gesture-Detecting-Macro-Keyboard.webp
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
---

## Overview

The Gesture-Detecting Macro Keyboard is a sophisticated input device that leverages machine learning to translate hand-drawn gestures into computer actions. Built around the ESP32 microcontroller and the ESP-IDF framework, the project functions as a BLE HID (Bluetooth Low Energy Human Interface Device), allowing it to act as a wireless keyboard for any modern computer. 

Beyond standard macro keys, the device features a capacitive touch pad for gesture drawing and a touch bar for volume control. By running TensorFlow Lite for Microcontrollers locally on the ESP32, the system can recognize complex shapes and patterns without relying on cloud processing, ensuring low latency and privacy.

## Hardware and Components

The project utilizes a variety of sensors and peripherals to create a rich user interface:
- **ESP32 SoC**: Handles the main application logic, Bluetooth stack, and neural network inference.
- **Trill Sensors**: Capacitive touch sensors used for the gesture pad and volume bar.
- **OLED Display**: Provides real-time feedback, including gesture prediction debug info, local IP addresses, and external data like cryptocurrency prices.
- **Mechanical Switches**: 11 buttons for generic macro control.
- **RGB Lighting**: Integrated LEDs for visual status and aesthetics.

## Machine Learning Pipeline

The core of the gesture recognition system is a TensorFlow Lite model. The trackpad outputs X and Y coordinates in a range of [0, 1792], which are collected between touch-start and touch-release events. These coordinates are then converted into a 28x28 2D matrix, serving as the input for the neural network.

The project includes a complete Python-based workflow for training custom models:
1. **Data Collection**: A training mode on the device pipes raw UART data to a Python script (`collect_train_data.py`).
2. **Training**: A script (`train_model.py`) processes the collected samples and generates a C++ header and source file containing the optimized TFLite model.
3. **Deployment**: The generated files are automatically integrated into the ESP-IDF build process, allowing the latest model to be flashed directly to the ESP32.

## Software Architecture

The firmware is built using ESP-IDF 4.2. It utilizes a custom partition table to manage factory app space and NVS (Non-Volatile Storage). The build system is managed via CMake, featuring custom commands to synchronize the machine learning model between the training environment and the embedded source code.

On the host computer side, the project is designed to work in tandem with AutoHotkey. While the device sends standard keyboard shortcuts, the AutoHotkey scripts allow for context-aware actions, such as focusing specific terminal windows for Git commands or managing window minimization based on which macro key is held.

## Technical Implementation Details

- **BLE HID**: The device implements the HID over GATT profile to ensure compatibility with Windows, macOS, and Linux without requiring custom drivers.
- **Gesture Centering**: An optional training flag allows gestures to be recognized regardless of where they are drawn on the pad by centering the input matrix before inference.
- **Menu System**: One specific switch (SWITCH_11) is dedicated to system functions, such as entering Bluetooth pairing mode or cycling through OLED information screens.
