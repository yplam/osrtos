---
title: OpenCarKey
summary: An open-source DIY remote car key and keyless entry system utilizing an ESP32
  microcontroller and a Flutter-based mobile app. It features proximity-based locking/unlocking,
  HMAC authentication, and rolling codes to provide a secure, customizable alternative
  to traditional vehicle keyfobs.
slug: opencarkey
codeUrl: https://github.com/Mauznemo/OpenCarKey
star: 23
lastUpdated: '2025-12-12'
rtos: freertos
topics:
- ble
- car
- esp32
- keyless
- mobile-app
isShow: false
createdAt: '2026-01-18'
updatedAt: '2026-01-18'
relatedProjects:
- esp32-dynamic-iphone-keyless-system
- open-wink-headlight-mod
- esphome-tesla-ble
- freebees-access-control-for-esp32
- open-authenticator-app
- sistema-de-apertura-de-port-n-con-m-dulo-gsm
---

## Overview

OpenCarKey is an ambitious open-source project designed to empower vehicle owners to build their own DIY remote car key or keyless entry system. By combining the versatility of the ESP32 microcontroller with a modern mobile application, the project provides a feature-rich alternative to factory keyless systems. It is particularly aimed at enthusiasts looking to add modern features like smartphone-controlled engine starts or proximity-based locking to older or custom vehicles.

## Key Features

The system is divided into two main components: a hardware lock controller and a mobile application. Together, they enable a wide range of functionality that rivals modern OEM systems:

- **Remote Vehicle Control**: Lock, unlock, open the trunk, or remote start the engine directly from a smartphone.
- **Proximity Key**: Automatically lock or unlock the car based on the user's distance from the vehicle, with a customizable trigger range.
- **Multi-Vehicle Support**: Manage multiple cars equipped with OpenCarKey hardware from a single app interface.
- **Home Screen Widget**: Quick access to vehicle controls without needing to open the full application.
- **Security Measures**: To prevent replay attacks, the system uses authenticated commands with an HMAC (Hash-based Message Authentication Code) and a per-device increasing counter, often referred to as rolling codes.

## Technical Implementation

The project leverages the ESP32 for its hardware component, taking advantage of its built-in wireless capabilities to communicate with the mobile app. The firmware is developed using the PlatformIO ecosystem, allowing for easy customization and deployment. 

Security is a primary focus of the implementation. By utilizing HMAC and rolling codes, OpenCarKey ensures that intercepted signals cannot be reused by malicious actors to gain access to the vehicle. The firmware includes a mechanism to reset the rolling code counter using the ESP32's physical buttons in case the app and controller fall out of sync.

## Getting Started

Setting up OpenCarKey involves both mobile app development and firmware flashing:

### Mobile App
The mobile application is built using Flutter, making it cross-platform. Developers can clone the repository and open the `MobileApp` directory in Android Studio or any editor supporting Flutter to build and deploy the app to their device.

### ESP32 Lock Controller
The hardware side requires an ESP32. The firmware is located in `Firmware/LockController/` and is designed to be opened with PlatformIO. Users can customize the `config.h` file to enable specific vehicle features like trunk release or engine start and set their unique device passwords and names. The project is designed to be extensible, allowing users to add custom C++ code for specific locking and unlocking logic tailored to their vehicle's electrical system.

## Future Development

The project is currently in active development, with several planned features on the roadmap. These include the creation of a dedicated hardware keyfob (also based on the ESP32) for users who prefer a physical button over a smartphone, improved iOS support, and an automatic parking location saver that triggers when the car goes out of range.
