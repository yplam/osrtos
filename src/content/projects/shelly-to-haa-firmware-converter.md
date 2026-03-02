---
title: Shelly to HAA Firmware Converter
summary: A specialized conversion tool for migrating Shelly Plus, Pro, and Gen3/Gen4
  devices from Mongoose OS to Home Accessory Architect (HAA) firmware. It facilitates
  the transition to a standard ESP-IDF bootloader, enabling native Apple HomeKit support
  and advanced automation features on ESP32-based Shelly hardware.
slug: shelly-to-haa-firmware-converter
codeUrl: https://github.com/RavenSystem/mgos32toHAA
siteUrl: https://github.com/RavenSystem/esp-homekit-devices/wiki
star: 20
version: 0.11.0
lastUpdated: '2025-08-27'
rtos: freertos
topics:
- apple
- esp-idf
- esp32
- firmware
- haa
- home-automation
- homekit
- iot
- matter
- mongoose-os
- ota
- shelly
- smarthome
isShow: false
createdAt: '2026-03-02'
updatedAt: '2026-03-02'
---

## Overview

The mgos32toHAA project provides a streamlined path for users to convert their Shelly smart home devices to the Home Accessory Architect (HAA) firmware. While original Shelly devices (Gen1) were based on the ESP8266, the newer generations—including Shelly Plus, Pro, Mini, Gen3, and Gen4—utilize the more powerful ESP32 microcontroller. This project specifically targets these modern devices, allowing them to be integrated natively into the Apple HomeKit ecosystem without the need for external bridges or hubs.

## Technical Transition

The conversion process is technically significant because it replaces the proprietary Shelly bootloader (based on Mongoose OS) with a standard ESP-IDF bootloader. This change is permanent via Over-the-Air (OTA) methods; once the new firmware is flashed, the device effectively becomes a standard ESP32 target running HAA. Because HAA is built upon the ESP-IDF framework, it leverages FreeRTOS for task management, providing a robust environment for real-time smart home applications.

## Supported Hardware and Features

The project supports an extensive list of Shelly hardware, providing specific ZIP files tailored to the internal circuitry of each model. Supported devices include:

- **Shelly Plus Series**: Plus 1, Plus 1PM, Plus 2PM, Plus I4, Plus Wall Dimmer, and Plus Smoke.
- **Shelly Pro Series**: Pro 1, Pro 2, Pro 3, Pro 4PM, and Pro Dimmer models.
- **Shelly Gen3 & Gen4**: The latest iterations of the Dimmer, EM, H&T, and Mini series.
- **Specialized Devices**: Shelly Plus Uni (with DHT22 support) and Shelly Plus RGBW PM.

Depending on the device, the conversion preloads specific HomeKit functions such as stateless buttons, power metering with data history, internal temperature monitoring, and overheat protection (typically set at 75°C).

## Conversion Process

The migration is designed to be user-friendly, utilizing the existing Shelly web interface. Users download the appropriate ZIP file for their specific hardware and upload it through the device's firmware update settings. 

Key steps in the process include:
1. Accessing the Shelly device's local web interface via its IP address.
2. Navigating to the firmware settings and uploading the conversion ZIP.
3. Allowing the device to perform the bootloader replacement and firmware installation.
4. Connecting to the resulting `HAA-XXXXXX` WiFi HotSpot to complete the HomeKit setup.

## Safety and Recovery

As this process modifies the device's bootloader, it is considered an experimental third-party modification. The project includes a critical warning: there is no OTA method to return to the original Shelly firmware once the conversion is complete. If a user wishes to revert to the factory state or needs to recover a bricked device, a physical wired connection using an FTDI adapter and a PC is required. This level of access ensures that even if the OTA process fails, the hardware remains recoverable for advanced users.
