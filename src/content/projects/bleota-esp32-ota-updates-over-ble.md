---
title: 'BLEOTA: ESP32 OTA Updates over BLE'
summary: A library for ESP32 that enables firmware and filesystem (SPIFFS/LittleFS)
  updates over Bluetooth Low Energy. It supports both BlueDroid and NimBLE stacks,
  offering features like data compression, secure RSA-based signature verification,
  and customizable callbacks for update monitoring.
slug: bleota-esp32-ota-updates-over-ble
codeUrl: https://github.com/gb88/BLEOTA
siteUrl: https://gb88.github.io/BLEOTA/
star: 61
version: v1.0.4
lastUpdated: '2026-03-16'
rtos: freertos
libraries:
- littlefs
- spiffs
- nimble
topics:
- ble
- esp32-arduino
- ota
- ota-update
isShow: false
createdAt: '2026-03-24'
updatedAt: '2026-03-24'
---

## Overview

BLEOTA is a specialized library for the ESP32 platform designed to facilitate Over-The-Air (OTA) updates using Bluetooth Low Energy (BLE). Inspired by Espressif's official components, this library provides a streamlined way to update both application firmware and filesystem partitions (SPIFFS or LittleFS) by transmitting data sector by sector. It is highly versatile, supporting both the standard BlueDroid stack and the more resource-efficient NimBLE stack.

## Key Features and Services

The library implements two primary BLE services to manage the device and the update process:

- **Device Information Service (DIS):** This service provides essential metadata about the device, including the model number, serial number, firmware version, hardware version, and manufacturer name. These characteristics are configurable before the library is initialized.
- **OTA Service:** This custom service handles the actual data transfer. It utilizes two main characteristics: one for receiving firmware data and another for sending commands and acknowledgments (ACKs).

## Technical Implementation and Data Protocol

BLEOTA uses a structured command and data packet format to ensure reliable transfers. The firmware is sent in 4K sectors, and each packet includes a sequence number. To maintain integrity, the server verifies the total length and CRC16 of the data before committing it to flash. The protocol includes specific command IDs for starting Flash OTA, starting SPIFFS OTA, stopping the process, and responding to client requests.

One of the standout features of BLEOTA is its support for data compression. By using zlib-based compression (compatible with tools like pigz), users can reduce update times by approximately 30% for firmware and even more for filesystem images. This is particularly beneficial in BLE environments where bandwidth is limited.

## Security and Verification

For production environments, BLEOTA offers robust security features. It supports RSA-based digital signatures to ensure that only authorized firmware is installed. The process involves generating a private/public key pair, signing the compiled binary with SHA256, and appending the signature to the OTA file. The ESP32 then uses the stored public key to verify the signature before applying the update.

## Integration and Callbacks

Integrating BLEOTA into an existing ESP32 project is straightforward. After initializing the BLE server, developers call `BLEOTA.begin()` and `BLEOTA.process()` within the main loop. The library also provides a callback system, allowing developers to execute custom code at specific stages of the update, such as `beforeStartOTA`, `beforeStartSPIFFS`, `afterStop`, and `afterAbort`.

For developers concerned about memory usage, switching to the NimBLE version of the library can reduce flash consumption by up to 46% compared to the standard BlueDroid implementation. This makes it an excellent choice for complex projects where flash space is at a premium.

## Web-Based Management

To simplify the client-side update process, the project includes a companion WebApp. This tool leverages Web Bluetooth to allow users to perform OTA updates directly from a compatible web browser, eliminating the need for a dedicated mobile application to manage device maintenance.
