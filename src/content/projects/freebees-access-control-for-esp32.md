---
title: Freebees Access Control for ESP32
summary: An ESP32-based access control system that integrates PN532 NFC readers, a
  DS3231 real-time clock, and MQTT for remote management. It features a web-based
  configuration interface, SPIFFS-based local storage for access keys, and support
  for dual readers and relays.
slug: freebees-access-control-for-esp32
codeUrl: https://github.com/FreebeesClub/Freebees-AC-Arduino
star: 0
lastUpdated: '2019-03-12'
rtos: freertos
libraries:
- spiffs
topics:
- arduino
- ds3231
- esp32
- hardware-serial
- mqtt
- pn532
- rfid
- rfid-doorlock-application
- rfid-reader
- spiffs
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- smarttrack-rfid-attendance-system
- nfcity
- esp32-dynamic-iphone-keyless-system
- esp32-mfa-authenticator
- esp32-weatherstationrtc
- simplebus2-mqtt-bridge
---

## Overview

Freebees AC is a comprehensive access control solution designed for the ESP32 platform using the Arduino framework. The project provides a robust firmware for managing physical access points using NFC technology, real-time logging, and remote synchronization via MQTT. By combining local processing with cloud-based management, it ensures that access control remains functional even during network outages while allowing for centralized administration.

## Hardware and Components

The system is built around the ESP32 microcontroller, leveraging its dual-core processing and built-in WiFi capabilities. It supports a variety of peripheral hardware to create a complete security solution:

- **NFC Readers**: Utilizes PN532 modules via High-Speed UART (HSU) for reliable card and tag reading.
- **Real-Time Clock**: Integrates the DS3231 RTC to maintain accurate system time, which is critical for validating time-restricted access keys.
- **Storage**: Uses the ESP32's internal SPIFFS (Serial Peripheral Interface Flash File System) to store configuration files and a local database of authorized keys.
- **Actuators and Sensors**: Supports dual relays for door strikes, buzzers for audible feedback, and door sensors for monitoring entry/exit states.

## Key Features

### Intelligent Access Logic
The firmware manages two independent readers (Reader 1 and Reader 2), allowing for controlled entry and exit points. When a tag is scanned, the system searches the local SPIFFS storage for a corresponding JSON key file. This file contains metadata such as activation and expiration timestamps. The system compares these values against the current time provided by the DS3231 RTC to grant or deny access.

### MQTT Integration and Synchronization
Connectivity is a core feature of Freebees AC. The project uses MQTT for:
- **Event Reporting**: Real-time logging of successful entries, exits, and unauthorized attempts.
- **Remote Configuration**: Updating system parameters like relay timing and MQTT credentials over the air.
- **Key Synchronization**: A sophisticated sync mechanism allows a central server to push new keys or revoke existing ones by sending JSON payloads that the ESP32 writes directly to its local filesystem.

### Configuration and Fallback Modes
To simplify initial setup, the project includes a fallback Access Point (AP) mode. If the device cannot connect to the configured WiFi or if a physical setup button is pressed, the ESP32 launches a captive portal and an asynchronous web server. This allows administrators to configure network settings and administrative passwords through a web browser.

## Technical Implementation

The project is structured as a single Arduino sketch that utilizes several powerful libraries to handle its complex requirements. It uses `AsyncTCP` and `ESPAsyncWebServer` for high-performance web handling that doesn't block the main loop, ensuring that NFC scanning remains responsive. Data serialization is handled by `ArduinoJson`, which is used for both the local key database and the MQTT communication protocol.

```cpp
// Example of the event reporting structure used in the project
DynamicJsonBuffer jsonBuffer;
JsonObject& json = jsonBuffer.createObject();
json["evt"] = EVT_ENTER;
json["k_uid"] = cardUid;
char buffer[jsonBuffer.size()];
json.printTo(buffer, sizeof(buffer));
client_MQTT.publish(topic_event, buffer);
```

## Security and Reliability

By storing keys locally in SPIFFS, Freebees AC ensures that users are not locked out if the WiFi connection drops. The use of the DS3231 RTC provides a high-precision time source that is independent of NTP, though the system can synchronize its clock via MQTT commands when online. The firmware also implements a watchdog-like behavior and automatic reconnection logic for both WiFi and MQTT services.
