---
title: EverBlu Cyble Enhanced RF Meter Reader
summary: This firmware extracts water and gas usage data from Itron EverBlu Cyble
  meters using ESP32 or ESP8266 microcontrollers and a CC1101 radio transceiver. It
  implements the proprietary RADIAN protocol on the 433 MHz band, offering seamless
  integration with Home Assistant through both MQTT AutoDiscovery and a native ESPHome
  external component.
slug: everblu-cyble-enhanced-rf-meter-reader
codeUrl: https://github.com/genestealer/everblu-meters-esp8266-improved
version: v2.1.4
lastUpdated: '2026-04-07'
licenses:
- NOASSERTION
image: /202604/everblu-meters-esp8266-improved_3.avif
rtos: ''
libraries:
- platformio-platformio-core
topics:
- arduino
- cc1101
- esp32
- esp32-arduino
- esp8266
- esp8266-arduino
- esphome
- esphome-component
- home-assistant
isShow: true
createdAt: '2026-04-21T01:09:01+00:00'
updatedAt: '2026-04-21T01:09:01+00:00'
---

This project provides a robust solution for monitoring utility consumption by interfacing with Itron EverBlu Cyble Enhanced RF meters. By utilizing an ESP32 or ESP8266 paired with a CC1101 transceiver, users can wirelessly fetch usage data via the RADIAN protocol. The system is designed to be production-ready, supporting both water and gas meters with dedicated measurement units and device classes for Home Assistant.


## Core Capabilities and Integration

The firmware supports two primary integration methods. For users deeply embedded in the ESPHome ecosystem, a native external component is available, allowing for simple YAML-based configuration without the need for an external MQTT broker. Alternatively, a standalone MQTT version provides extensive customization and uses Home Assistant's AutoDiscovery feature to populate sensors automatically.

Beyond current usage, the system extracts 12 months of historical data directly from the meter's internal memory. This allows users to bootstrap their energy dashboards with a year of past consumption patterns immediately upon setup. The data is provided in a structured JSON format, detailing monthly readings and consumption deltas.

## Important: Utility Read Counter Compatibility

A critical technical detail of the EverBlu system is the built-in read counter. Every time the meter is queried, an internal counter increments. Utility companies use this counter to validate their own scheduled wireless readings. If a user queries the meter too frequently, the counter may be higher than the utility's equipment expects, potentially flagging the meter for tampering. To mitigate this, the firmware allows for daily scheduled readings and provides the counter value via MQTT, enabling users to "loop" the counter back to an expected value if necessary.

![Itron EverBlu Cyble Enhanced water meter hardware](/202604/everblu-meters-esp8266-improved_2.avif)

## Technical Architecture and Frame Validation

The project implements a sophisticated software-defined approach to decoding the RADIAN protocol. Because the protocol uses a proprietary serial encoding (not standard Manchester), the firmware performs custom serial decoding with 4x oversampling for noise immunity. To ensure data integrity, it employs multiple layers of validation:

*   **CRC-16/KERMIT Checksum**: Verifies the integrity of every transmitted frame.
*   **Preamble Matching**: Uses 0xAAAAAAAA sync word detection.
*   **Signal Quality Filtering**: Monitors RSSI and LQI (Link Quality Indicator) to discard weak or corrupted signals.
*   **Temporal Validation**: Ensures readings occur within the meter's configured wake window.

## Hardware Implementation

The system runs on common ESP8266 (like the Wemos D1 Mini or Adafruit HUZZAH) and ESP32 boards. Communication with the CC1101 433 MHz RF module is handled via hardware SPI. Due to the nature of the RADIAN protocol and potential RF interference, it is recommended to keep the transceiver within 2 to 5 meters of the meter for optimal reliability.

### Wiring Reference for ESP8266/ESP32

| CC1101 Pin | Function | ESP8266 GPIO | ESP32 GPIO |
|------------|----------|--------------|------------|
| VCC | Power (3.3V) | 3V3 | 3V3 |
| SCK | SPI Clock | GPIO 14 | GPIO 18 |
| MISO | SPI Data In | GPIO 12 | GPIO 19 |
| MOSI | SPI Data Out | GPIO 13 | GPIO 23 |
| CSN | Chip Select | GPIO 15 | GPIO 5 |
| GDO0 | Data Ready | GPIO 5 | GPIO 4 |

## Configuration and Frequency Discovery

Setting up the device requires specific metadata from the meter's physical label, specifically the manufacturing year and the middle part of the serial number. 

![Meter label showing the serial number and manufacturing year](/202604/everblu-meters-esp8266-improved_6.avif)

On the first boot, the firmware automatically initiates a wide frequency scan (±100 kHz) to calibrate the CC1101 to the specific frequency of the meter, which typically centers around 433.82 MHz. This automatic calibration accounts for crystal tolerances and environmental drift. Once the optimal frequency is found, the device stores the offset in EEPROM and begins its scheduled querying cycle, typically once every 24 hours to conserve the meter's battery life.
