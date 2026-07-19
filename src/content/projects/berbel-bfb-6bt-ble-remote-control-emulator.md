---
title: Berbel BFB 6bT BLE Remote Control Emulator
summary: An ESP32-powered emulator for the Berbel BFB 6bT remote control, designed
  to integrate Berbel kitchen hoods into smart home environments. It features real-time
  status decoding, MQTT auto-discovery for Home Assistant, and utilizes the NimBLE
  stack to optimize memory usage.
slug: berbel-bfb-6bt-ble-remote-control-emulator
codeUrl: https://github.com/tfohlmeister/berbel-remote
lastUpdated: '2026-06-19'
licenses:
- MIT
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- spiffs
- platformio-platformio-core
topics:
- berbel
- ble
- esp32
- home-assistant
- iot
- kitchen-hood
- mqtt
- nimble
- reverse-engineering
isShow: false
createdAt: '2026-07-19T07:14:43+00:00'
updatedAt: '2026-07-19T07:14:43+00:00'
---

Modern kitchen hoods from Berbel, specifically those equipped with Berbel Connect 2.0, offer wireless control via the BFB 6bT Bluetooth Low Energy (BLE) remote. While convenient, these proprietary systems often lack native smart home integration. This project bridges that gap by providing a full-featured emulator running on an ESP32, allowing users to control their hoods through MQTT and Home Assistant.

## Replicating the Original Experience

The emulator is designed to be a drop-in replacement for the official Berbel BFB 6bT remote (Art. 1090045). It mimics the behavior of the hardware remote so accurately that the hood treats it as an original device. This includes support for the full range of functions: fan speed adjustments (including Power mode), lighting control (both cooktop and ambient effect lights), and the lift function for retractable models like the Skyline Frame.

Beyond simple command execution, the project implements real-time status decoding. By listening to 9-byte status packets sent by the hood, the ESP32 can report the current state of the fan, lights, and cover position back to a smart home controller. This ensures that the dashboard always reflects the actual state of the appliance, even if it was adjusted manually.

## Technical Implementation and BLE Nuances

One of the most interesting aspects of this project is the reverse-engineered BLE protocol. The Berbel hood employs several security and validation measures that the emulator must satisfy to maintain a connection:

*   **MAC OUI Filtering**: The hood's firmware checks the Manufacturer Usage Identifier (OUI) of the connecting device. It only accepts connections from Texas Instruments OUIs (e.g., `88:01:F9`). To bypass this, the ESP32 spoofs its base MAC address before initializing the BLE stack.
*   **GATT Service Order**: The hood validates the order in which GATT services are presented. The emulator carefully constructs its services—Device Information, Battery Service, HID Service, and the Custom Berbel Service—in the exact sequence expected by the central unit.
*   **NimBLE Stack**: By using the NimBLE-Arduino library instead of the standard Bluedroid stack, the project saves approximately 100KB of heap memory. This efficiency is crucial for maintaining stable WiFi and MQTT connections alongside the BLE radio.

## Smart Home Integration

The project is built with Home Assistant in mind. It uses MQTT auto-discovery to automatically create entities for every hood function. Once the ESP32 is flashed and configured with WiFi and MQTT credentials, the following entities appear in Home Assistant:

*   **Lights**: Toggles for upper/effect and cooktop lighting.
*   **Fan**: A select entity for speeds 1-3 and Power mode.
*   **Cover/Lift**: Controls for raising or lowering the hood (for supported models).
*   **Sensors**: Diagnostic information including BLE connection status and raw status hex for debugging.

## Protocol Mapping

The project documents the 13 button codes used by the BFB 6bT remote. Commands are sent as 2-byte notifications on a specific characteristic. For example, pressing the Power button sends `[0x01, 0x00]`, while releasing it sends `[0x00, 0x00]`.

| Function | Code |
| :--- | :--- |
| Power | 0x01 |
| Fan Speed 1-3 | 0x02 - 0x04 |
| Cooktop Light | 0x06 |
| Lift function (Raise/Lower) | 0x09 / 0x0D |

## Hardware and Setup

The firmware is compatible with standard ESP32 development boards. Because it uses PlatformIO, the build process is streamlined. Users simply need to copy the configuration template, add their local network details, and flash the device. The project also supports ArduinoOTA, allowing for future firmware updates over the air without needing to remove the ESP32 from its installation location behind the kitchen cabinetry.
