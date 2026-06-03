---
title: ESP32 MFA Authenticator
summary: A standalone hardware TOTP generator for the ESP32 platform, featuring a
  touch-screen interface powered by LVGL. It provides a secure way to manage MFA codes
  without a smartphone, supporting WiFi time synchronization and SD card configuration.
slug: esp32-mfa-authenticator
codeUrl: https://github.com/AllanOricil/esp32-mfa-authenticator
siteUrl: https://allanoricil.github.io/esp32-mfa-authenticator
star: 113
version: v0.20.0
lastUpdated: '2025-12-07'
rtos: freertos
libraries:
- lvgl
- spiffs
- tft-espi
topics:
- 2fa
- authenticator
- esp32
- esp32-cyd
- mfa
- totp
isShow: true
image: /202602/esp32mfa.webp
createdAt: '2026-02-08'
updatedAt: '2026-02-08'
relatedProjects:
- open-authenticator-app
- securegen
- esp32-u2f-security-key
- freebees-access-control-for-esp32
- esp32-sram-puf-authentication
- smartlock-for-disco-l475vg-iot01a
---

The ESP32 MFA Authenticator is a dedicated hardware solution for generating Time-based One-Time Passwords (TOTP), providing a secure alternative to smartphone-based authentication apps. Built specifically for the ESP32-2432S028 development board—popularly known as the "Cheap Yellow Display" (CYD)—this project transforms an affordable microcontroller into a functional security gadget.

## Hardware and User Interface

The project leverages the integrated 2.8-inch touchscreen of the ESP32-CYD to provide a modern, responsive user interface. Utilizing the LVGL (Light and Versatile Graphics Library), the authenticator features a gesture-based UI where users can swipe between different service groups. The interface includes a double-tap to lock feature and a single-tap wake-up mechanism, mimicking the behavior of modern mobile devices. To ensure accuracy, the firmware includes a built-in touch calibration routine that saves calibration data to the ESP32's internal SPIFFS storage.

## Security Features

Security is handled through several layers of protection:
- **PIN Authentication**: The device can be locked with a PIN. Validation is performed using HMAC-SHA256 hashing with a user-defined key, ensuring that the actual PIN is never stored in plain text.
- **Brute Force Protection**: The system can be configured to lock down after a specific number of failed unlock attempts, requiring a hard reset to recover.
- **Local Storage**: Secrets are stored on a physical SD card in a `services.yml` file. This allows users to keep their sensitive data physically separate from the device when not in use.

## Configuration and Management

The authenticator is highly configurable via YAML files stored on an SD card. The `config.yml` file manages WiFi credentials, authentication settings, display sleep timeouts, and touch calibration flags. The `services.yml` file supports up to 100 different MFA services, which can be organized into 10 distinct groups for easier navigation.

For easier maintenance, the project includes a built-in web-based management application. When the board is connected to a local network, users can access a password-protected settings page to update their configuration files directly on the SD card without needing to remove it and connect it to a computer.

## Technical Implementation

Developed using the Arduino framework and PlatformIO, the project integrates several robust libraries to handle its complex requirements:
- **TFT_eSPI**: Provides high-performance display drivers for the ILI9341 controller.
- **YAMLDuino**: Enables the parsing of human-readable configuration files from the SD card.
- **ESPAsyncWebServer**: Powers the local management interface.
- **mbedTLS**: Handles the cryptographic functions required for secure hashing.
- **NTP Integration**: Uses WiFi to synchronize the internal clock with global time servers, ensuring TOTP codes remain valid.

## Getting Started

Users can get started by flashing their ESP32-CYD board using a web-based installer or by compiling the source code via PlatformIO. Once flashed, the device requires an SD card containing the initial configuration files. The project is designed to be user-friendly while maintaining the flexibility expected by the maker community, supporting custom 3D-printed cases to complete the hardware build.
