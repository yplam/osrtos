---
title: GNSS LoRaWAN Tracker
summary: A GNSS-based tracking application built on Zephyr RTOS that transmits location
  and ignition status over LoRaWAN using ABP authentication. It targets the ESP32
  WROOM 32 and utilizes UART-based GNSS modules and Smart Modular LoRaWAN modems for
  cloud connectivity.
slug: gnss-lorawan-tracker
codeUrl: https://github.com/phfbertoleti/gnss_lorawan_tracker
lastUpdated: '2024-01-01'
licenses:
- Apache-2.0
rtos: zephyr
topics:
- connectivity
- esp32
- gnss
- gps
- internetofthings
- iot
- lorawan
- tracker
- zephyr
- zephyr-rtos
isShow: true
image: /202604/gnss_lorawan_tracker.webp
createdAt: '2026-04-02T12:00:42+00:00'
updatedAt: '2026-04-02T12:00:42+00:00'
---

The GNSS LoRaWAN Tracker is a specialized embedded project designed for asset tracking and telemetry. By combining the precision of Global Navigation Satellite Systems (GNSS) with the long-range, low-power capabilities of LoRaWAN, this project provides a robust solution for monitoring vehicles or remote equipment. Built on the Zephyr RTOS, the application leverages a modular architecture to manage positioning, connectivity, and hardware state monitoring.

## Core Functionality

At its heart, the tracker focuses on three primary data points: geographic coordinates (latitude and longitude), GNSS fix status, and ignition state. The system is designed to work with any GNSS module capable of outputting standard NMEA messages over UART. This data is processed and packaged into a compact periodic message for transmission. 

Connectivity is handled by a Smart Modular LoRaWAN module. Unlike some implementations that require a complex LoRa stack to run on the primary MCU, this project interacts with the LoRaWAN module as a modem using AT commands over a secondary UART interface. The project specifically utilizes Activation by Personalization (ABP) mode, making it straightforward to deploy in private networks or areas with specific credential requirements.

## Technical Architecture and Hardware

The project is optimized for the ESP32 WROOM 32 microcontroller. The firmware utilizes Zephyr’s multi-threading and logging capabilities to ensure that peripheral management—such as reading UART data from the GPS and managing the LoRaWAN modem—happens efficiently without blocking the main application logic.

### Hardware Integration

The firmware maps specific GPIOs for various functions on the ESP32:
*   **GNSS Module (UART 1):** Connected via GPIO 25 (TX) and GPIO 26 (RX).
*   **LoRaWAN Module (UART 2):** Connected via GPIO 23 (TX) and GPIO 5 (RX).
*   **Ignition Monitoring:** GPIO 4 is used to detect the ignition status (on/off) and calculate the duration the ignition has been active.
*   **Status Indicators:** GPIO 18 acts as a "Breathing Light" LED to provide a visual heartbeat of the system's operation.

## Data Payload Structure

To minimize airtime and power consumption, the tracker sends a highly optimized 9-byte payload:
1.  **Latitude (4 bytes):** Float format.
2.  **Longitude (4 bytes):** Float format.
3.  **Status Byte (1 byte):** Bit 0 represents the ignition status, and Bit 1 represents the GNSS fix status.

The frequency of these updates is configurable via Zephyr's Kconfig system, allowing developers to balance between real-time tracking accuracy and battery life.

## Configuration and Deployment

Setting up the tracker requires defining LoRaWAN credentials within the Kconfig file. Users must provide the Device Address (DevAddr), Application Session Key (AppSKey), Network Session Key (NwkSKey), and Application EUI (AppEUI). 

Because the project is built within the Zephyr ecosystem, it utilizes the `west` build tool. A typical build for the ESP32 target involves a simple command sequence:

```bash
west build -p always -b esp32_devkitc_wroom gnss_lorawan_tracker/
west flash
```

This streamlined workflow, combined with Zephyr's robust logging subsystem, makes the GNSS LoRaWAN Tracker an excellent starting point for developers looking to build professional-grade industrial tracking solutions.
