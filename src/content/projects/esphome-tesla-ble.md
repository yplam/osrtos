---
title: ESPHome Tesla BLE
summary: This project enables ESP32 microcontrollers to manage Tesla vehicle charging
  and monitor telemetry over Bluetooth Low Energy using the ESPHome framework. It
  supports key pairing, charging current adjustment, and vehicle wake management while
  utilizing FreeRTOS for task handling on the ESP32 platform.
slug: esphome-tesla-ble
codeUrl: https://github.com/yoziru/esphome-tesla-ble
version: 2026.3.8
lastUpdated: '2026-03-08'
licenses:
- AGPL-3.0
image: /202604/esphome-tesla-ble_0.avif
rtos: freertos
libraries:
- nimble
- platformio-platformio-core
topics:
- ble
- bluetooth-low-energy
- esp32
- esphome
- home-assistant
- tesla
- tesla-api
- tesla-ble
isShow: true
createdAt: '2026-04-08T23:47:44+00:00'
updatedAt: '2026-04-08T23:47:44+00:00'
---

ESPHome Tesla BLE provides a specialized integration for ESP32 devices to interface with Tesla vehicles via Bluetooth Low Energy (BLE). By utilizing the ESPHome framework, the project transforms hardware like the M5Stack NanoC6 into a dedicated vehicle controller capable of managing charging states and retrieving real-time diagnostics without relying on the Tesla Fleet API.

## Features and Capabilities

The system offers a robust set of controls and sensors to monitor and manage vehicle status. Users can pair the ESP32 as a recognized BLE key, wake the vehicle from sleep, and toggle charging states. It allows for precise control over charging amperage and percentage limits.


Beyond control, the integration exposes several informative sensors:
- **Vehicle State**: Monitoring if the car is asleep, awake, or if a user is present.
- **Security**: Door lock/unlock status and charging flap position.
- **Diagnostics**: BLE signal strength (RSSI) and IEC 61851 charging states.

![Tesla vehicle sensors and status information in Home Assistant](/202604/esphome-tesla-ble_1.avif)

## Configuration and Polling Logic

To balance responsiveness with the vehicle's battery longevity, the component implements a tiered polling architecture. This is divided into two primary communication protocols:

1.  **VCSEC (Vehicle Control System Endpoint)**: Used for basic status updates like sleep/wake and lock state. This is safe to poll even when the vehicle is asleep.
2.  **Infotainment**: Used for detailed data such as battery levels and charging metrics. This is only polled when the vehicle is awake or active.

Smart Wake Management ensures the system respects Tesla's natural sleep cycles. It typically monitors infotainment data during an 11-minute wake window before allowing the vehicle to enter deep sleep, unless active states like charging or user presence override this timeout.

### IEC 61851 State Mapping

The component includes a specialized text sensor that maps Tesla's internal charging states to the IEC 61851 standard. This allows for standardized monitoring across different EVSE (Electric Vehicle Supply Equipment) environments, reporting states such as Disconnected (State A), Complete/Stopped (State B), and Charging/Calibrating (State C).

## Implementation and Usage

Setting up the device involves identifying the vehicle's unique BLE MAC address. The project includes a listener package that scans for Tesla-specific advertising packets, allowing users to find their car's identifier through the ESPHome logs when the vehicle is awake.

Firmware can be managed through the ESPHome dashboard or via a command-line interface using the provided Makefile. The project supports various ESP32 boards, with specific configurations available for the M5Stack NanoC6. Once the firmware is flashed and the device is integrated into Home Assistant, the final step is security authorization.

### Pairing the BLE Key

For the ESP32 to send commands, it must be authorized as a key. This process mimics adding a physical key card. After triggering the "Pair BLE key" command from Home Assistant, the user must tap their existing NFC card on the vehicle's center console to approve the new digital key.

![Tesla in-car display prompt for pairing a new BLE key](/202604/esphome-tesla-ble_3.avif)

Once confirmed, the ESP32 appears in the vehicle's "Locks" menu. Users can then rename the device for easier identification, ensuring the ESP32 has persistent, secure access to manage the vehicle's charging parameters locally.

![Tesla Locks menu showing the successfully paired ESPHome device](/202604/esphome-tesla-ble_4.avif)
