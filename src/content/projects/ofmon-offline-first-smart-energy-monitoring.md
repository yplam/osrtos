---
title: 'OFMon: Offline-first Smart Energy Monitoring'
summary: An offline-first energy monitoring system built with Rust for ESP32 microcontrollers.
  It utilizes LittleFS for power-loss resilient local storage and integrates with
  a custom Flutter mobile app and the Thingsboard IoT platform for data synchronization
  and visualization.
slug: ofmon-offline-first-smart-energy-monitoring
codeUrl: https://github.com/arashsm79/OFMon
star: 49
lastUpdated: '2023-01-27'
rtos: freertos
libraries:
- littlefs
- spiffs
topics:
- dart
- embedded
- embedded-hal
- embedded-rust
- embedded-svc
- emon
- energy-monitor
- esp-idf
- esp-idf-hal
- esp-idf-svc
- esp-idf-sys
- esp-rs
- esp32
- espressif
- flutter
- iot
- littlefs
- rust
- smart-energy-monitor
- thingsboard
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- espmonitor-iot-environment-monitoring-system
- energy-consumption-monitor-energymon-c
- tanksync
- espmonitor-iot-environmental-monitoring-system
- light-watcher
- energy-consumption-monitor
---

## Overview

OFMon is an innovative energy monitoring system designed for environments where reliable wireless connectivity is not always available, such as remote locations or industrial containers. Unlike traditional IoT devices that require constant cloud connectivity, OFMon adopts an "offline-first" architecture. It collects energy data locally on an ESP32 microcontroller and stores it in flash memory, allowing a mobile application to fetch the data later via a local Wi-Fi access point and sync it to a central server when internet access is restored.

Built using the modern Rust programming language, the project leverages the safety and performance guarantees of the `esp-rs` ecosystem. The system measures RMS current, voltage, and kWh using SCT sensors connected to the ESP32's ADC subsystem, providing a robust solution for power line monitoring.

## Technical Architecture

The firmware is developed using the ESP-IDF framework, which runs on top of FreeRTOS. The Rust application executes as a task within this environment, utilizing several key components:

- **Rust on ESP32**: The project uses `esp-idf-hal` and `esp-idf-svc` to interface with the hardware and system services. This allows the developer to use the Rust standard library (`std`) while benefiting from the mature C-based ESP-IDF drivers.
- **Power-Loss Resilient Storage**: Data is stored using the LittleFS filesystem. LittleFS was chosen for its wear-leveling capabilities and its ability to remain consistent even if power is interrupted during a write operation—a critical feature for energy monitors.
- **Sharding Strategy**: To maintain performance and avoid the pitfalls of large files in LittleFS, the system implements sharding. Data is split across multiple fixed-size files, ensuring efficient read/write operations over long periods.
- **Web Server Interface**: The ESP32 acts as a Wi-Fi Access Point and hosts a web server. This server provides endpoints for telemetry retrieval, power-loss logs, time synchronization, and OTA updates.

## Energy Measurement and Calibration

The system uses Current Transformer (CT) sensors to monitor AC power. Because microcontrollers typically handle positive voltages, the system implements a DC offset algorithm to center the AC sine wave around the ADC's midpoint. The firmware calculates RMS values by sampling the wave, applying low-pass filters, and aggregating the data into hourly kWh readings.

To handle power outages without a dedicated Real-Time Clock (RTC) module, the system periodically saves its internal RTC value to flash. Upon reboot, it restores the last known time and logs the event, allowing the mobile app to reconstruct the timeline and account for downtime.

## Mobile and Cloud Integration

The project includes a fork of the Thingsboard Flutter Mobile App. This app serves as the bridge between the offline devices and the cloud. It performs several roles:
- **Discovery**: Scans for nearby devices using their unique SSIDs.
- **Data Collection**: Connects to the device's AP, fetches binary telemetry data, and clears the device's local memory.
- **Synchronization**: Once the mobile device has internet access, it flushes the collected data to a Thingsboard IoT server.
- **OTA Management**: The app checks for firmware updates on the server and can push new binaries to the ESP32 devices via the local Wi-Fi connection.

## Flash Partitioning

OFMon uses a custom partition table to manage its 4MB of flash memory effectively. This includes two 1MB OTA partitions for safe firmware updates, a 1.9MB LittleFS partition for data storage, and standard partitions for NVS and PHY initialization data. This setup ensures that the device can always roll back to a working firmware version if an update fails.
