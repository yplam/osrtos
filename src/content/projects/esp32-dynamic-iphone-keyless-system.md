---
title: ESP32 Dynamic iPhone Keyless System
summary: An advanced ESP32-based proximity car access control system that identifies
  iPhones using Bluetooth Low Energy (BLE) Identity Resolution Keys (IRKs). It features
  dynamic device learning, persistent NVS storage, and a web-based dashboard for real-time
  management and configuration.
slug: esp32-dynamic-iphone-keyless-system
codeUrl: https://github.com/crazyhoesl/ESPKeylessCar
star: 14
version: v7.2
lastUpdated: '2026-01-12'
rtos: freertos
topics:
- automotive
- ble
- esp32
- iot
- iphone
- keyless
- proximity
isShow: false
createdAt: '2026-01-21'
updatedAt: '2026-01-21'
relatedProjects:
- opencarkey
- freebees-access-control-for-esp32
- esphome-tesla-ble
- blynk-async-esp32-bt-wf
- sistema-de-apertura-de-port-n-con-m-dulo-gsm
- smart-home-automation-with-freertos-and-esp32
---

## Overview

The ESP32 Dynamic iPhone Keyless System is a sophisticated proximity-based car access solution designed to modernize older vehicle entry systems. By leveraging the ESP32's Bluetooth Low Energy (BLE) capabilities, the project allows a car to automatically unlock as the owner's iPhone approaches and lock as they walk away. Unlike simpler systems that rely on static MAC addresses—which iPhones rotate for privacy—this project implements full Identity Resolution Key (IRK) verification to reliably identify specific devices.

## Technical Architecture

The system is built on the ESP32-D0WD-V3 platform using the Arduino framework. Its core functionality revolves around the complex handling of Apple's BLE privacy specifications. Because iPhones use Resolvable Private Addresses (RPA), the system must perform AES-128 cryptographic verification against stored IRKs to confirm a device's identity. 

One of the project's unique architectural choices is its state management. To overcome limitations in the ESP32 BLE stack when transitioning between Server Mode (used for pairing) and Scanner Mode (used for proximity detection), the system utilizes smart restart logic. It detects the hardware reset reason to determine whether to enter a 30-second pairing window or jump directly into keyless operational mode.

## Key Features

- **Dynamic IRK Learning**: The system learns and stores up to 10 iPhone IRKs through a secure pairing process, eliminating the need for hardcoded device IDs.
- **Proximity Hysteresis**: To prevent "door flutter" caused by signal fluctuations, the system employs RSSI filtering and a configurable weak signal counter.
- **Web-Based Management**: A built-in web dashboard provides real-time activity logs, device management, and adjustable thresholds for lock/unlock distances.
- **Captive Portal Setup**: For first-time installation, the ESP32 creates a WiFi access point with a captive portal to simplify network configuration.
- **Automotive Integration**: The hardware design uses NPN transistors to simulate button presses on a modified car key fob, powered via a standard OBD2-to-USB-C connection for constant 12V availability.

## Hardware Implementation

The project requires a modified car key fob. The ESP32 controls the fob's lock and unlock buttons through a simple transistor-based circuit. 

```cpp
// Hardware Pin Configuration
const int KEY_POWER_PIN = 23;    // Key fob power control
const int LOCK_BUTTON_PIN = 19;  // Lock signal transistor
const int UNLOCK_BUTTON_PIN = 18; // Unlock signal transistor
const int LED_PIN = 2;           // Status indication
```

The wiring involves connecting the ESP32 GPIOs to the bases of NPN transistors (like the 2N2222), which then bridge the button contacts on the key fob PCB. This approach ensures that the vehicle's original security system remains intact while adding a layer of automation.

## Security and Privacy

Security is a primary focus of the implementation. The system uses the iPhone's native BLE security framework, requiring a fixed PIN (123456) for initial pairing. Once paired, the IRK is extracted and stored in the ESP32's Non-Volatile Storage (NVS). Because the system operates entirely offline, there are no cloud dependencies or external data leaks. The use of IRKs ensures that only authorized devices can trigger the unlock sequence, even as the iPhone's public BLE address changes every few minutes.

## Getting Started

Developers can deploy the system using PlatformIO. The project includes a pre-configured `platformio.ini` file that manages dependencies and partition schemes. Due to the size of the BLE and WiFi stacks, the project utilizes a "huge_app" partition scheme to maximize available flash space. 

After flashing, the user connects their iPhone to the "ESPKV7 Tracker" Bluetooth device. Once paired, the system automatically extracts the necessary cryptographic keys, restarts, and begins monitoring for the device's proximity. Users can then access the local web interface to fine-tune RSSI thresholds based on their specific vehicle and environment.
