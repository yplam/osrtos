---
title: ESPHome Cosori Kettle BLE Component
summary: An ESPHome component designed to interface with Cosori smart kettles using
  Bluetooth Low Energy on ESP32 microcontrollers. It provides comprehensive control
  over heating states and temperature setpoints while exposing sensors for real-time
  water temperature and base status to Home Assistant.
slug: esphome-cosori-kettle-ble-component
codeUrl: https://github.com/barrymichels/CosoriKettleBLE
star: 13
lastUpdated: '2026-01-05'
rtos: freertos
libraries:
- nimble
topics:
- ble
- esphome
- home-assistant
- iot
- kettle
isShow: false
createdAt: '2026-02-03'
updatedAt: '2026-02-03'
relatedProjects:
- esphome-tesla-ble
- esphome-hitachi-h-link-ac-component
- hunter-douglas-powerview-ble-for-home-assistant
- gaggimate
- esphome-components-for-miot-devices
- smart-flask-thermos-with-round-display-and-esp32-c3
---

## Overview

The ESPHome Cosori Kettle BLE component is a custom integration for ESP32-based devices that allows for the local control and monitoring of Cosori smart kettles. By leveraging the Bluetooth Low Energy (BLE) capabilities of the ESP32, this project bypasses the need for cloud-based control, bringing the kettle's functionality directly into the Home Assistant ecosystem. It provides a bridge between the proprietary Cosori BLE protocol and the native ESPHome framework, enabling features like real-time temperature tracking, heating control, and automation readiness.

## Key Features

This component is feature-rich, offering both monitoring and control capabilities that often exceed what is available in the official mobile application. 

- **Real-time Monitoring**: Track water temperature, current setpoint, and whether the kettle is currently on its base or actively heating.
- **Remote Control**: Start or stop the heating process and adjust the target temperature within the kettle's supported range (104-212°F / 40-100°C).
- **Climate Entity Integration**: The component automatically creates a climate entity in Home Assistant, allowing users to use the native thermostat card for intuitive temperature control.
- **Persistent Connection**: Includes logic for automatic reconnection and a toggle to disable BLE, which is necessary if the user wishes to temporarily use the official mobile app (as the kettle supports only one active connection).
- **Automation Ready**: All sensors and switches are exposed as standard Home Assistant entities, making it simple to trigger notifications when water is ready or start the kettle as part of a morning routine.

## Technical Implementation & Protocol

The project is built upon a reverse-engineered implementation of the Cosori BLE protocol. Communication occurs over a specific service (`0xFFF0`) using two primary characteristics: `0xFFF1` for receiving notifications (RX) and `0xFFF2` for sending commands (TX). 

The protocol uses a structured packet format starting with a magic byte (`0xA5`), followed by a packet type, sequence number, payload length, and a simple checksum. The component handles two main types of status updates: compact status packets for frequent updates and extended status packets that include critical information like the on-base detection status.

### The Handshake Mechanism

A significant challenge in interfacing with modern smart appliances is authentication. Many Cosori kettle firmware versions require a registration handshake sequence during the initial connection. This project includes a comprehensive guide and support for custom handshake sequences, allowing users to extract the necessary registration keys from official app traffic and provide them via the ESPHome YAML configuration.

## Getting Started

To use this component, users need an ESP32 and a compatible Cosori smart kettle. The configuration is handled within the ESPHome YAML file by defining the `external_components` source and configuring the `ble_client` with the kettle's MAC address.

```yaml
external_components:
  - source: github://barrymichels/CosoriKettleBLE
    components: [cosori_kettle_ble]

ble_client:
  - mac_address: "C4:A9:B8:73:AB:29"
    id: cosori_kettle_client

cosori_kettle_ble:
  ble_client_id: cosori_kettle_client
  id: my_kettle
  name: "Kettle"
```

Once flashed, the ESP32 acts as a local gateway. Users can then add sensors for temperature, binary sensors for the heating state, and numbers or switches for direct control. The integration is designed to be robust, handling the Fahrenheit-to-Celsius conversions required for Home Assistant's climate platform while maintaining the kettle's native Fahrenheit precision internally.
