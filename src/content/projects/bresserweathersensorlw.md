---
title: BresserWeatherSensorLW
summary: A LoRaWAN-enabled bridge for Bresser 868 MHz weather sensors based on ESP32
  and RP2040 microcontrollers. It utilizes the RadioLib library to receive sensor
  data via FSK and transmit it to LoRaWAN networks like The Things Network, ChirpStack,
  or Helium, while focusing on low-power operation and extensive sensor support.
slug: bresserweathersensorlw
codeUrl: https://github.com/matthias-bs/BresserWeatherSensorLW
version: v0.17.0
lastUpdated: '2026-03-30'
licenses:
- MIT
image: /202604/BresserWeatherSensorLW_0.avif
rtos: ''
libraries:
- littlefs
topics:
- arduino
- arduino-pico
- ble
- bluetooth
- bluetooth-low-energy
- chirpstack
- esp32
- esp32-arduino
- helium-network
- lorawan
- lorawan-application
- radiolib
- rp2040
- thethingsnetwork
- ttn-application
- weather-sensors
- weather-station
isShow: true
createdAt: '2026-04-01T01:22:41+00:00'
updatedAt: '2026-04-01T01:22:41+00:00'
---

Proprietary weather stations provide excellent local data, but integrating that information into broader IoT ecosystems can be a challenge. The BresserWeatherSensorLW project solves this by acting as a sophisticated gateway, capturing 868 MHz radio signals from Bresser sensors and retransmitting the decoded data over long-range LoRaWAN connections. Designed to run on ESP32 and RP2040 microcontrollers, this project transforms a standard weather station into a connected node capable of communicating with LoRaWAN Network Servers (LNS) across kilometers.

### Multi-Protocol Radio Management

One of the standout technical achievements of this repository is its use of a single radio transceiver for two distinct tasks. By leveraging the RadioLib library, the system can toggle between receiving FSK-modulated data from local weather sensors and performing LoRaWAN communication. It supports a variety of popular radio chips, including the SX1262, SX1276, and the LR1121. This versatility ensures compatibility with a wide range of hardware, from LILYGO T3-S3 boards to Heltec Wireless Sticks and custom ESP32-S3 PowerFeather setups.

The project is fully compliant with LoRaWAN specifications 1.1.0 and 1.0.4, as well as various regional parameters. It has been verified against major networks including The Things Network (TTN), ChirpStack, and Helium IoT, making it a reliable foundation for professional and hobbyist meteorological deployments alike.

### Extensive Sensor Integration

While its primary focus is the Bresser weather sensor line (including soil moisture and indoor thermometers), the software is designed to be a generic LoRaWAN device base. Users can optionally integrate several other sensor types:
- **Bluetooth Low Energy (BLE):** Support for ATC MiThermometer and Theengs Decoder sensors.
- **OneWire:** Integration for Dallas/Maxim temperature sensors.
- **Distance Sensors:** Support for ultrasonic (A02YYUW) and laser (DYP-R01CW) distance modules, useful for monitoring water levels or snow depth.
- **Analog/Digital Inputs:** Built-in support for ADC monitoring and general-purpose GPIO signals.

### Optimized for Battery Operation

Power efficiency is a core design principle for any remote sensor node. BresserWeatherSensorLW utilizes ESP32 Deep Sleep and RP2040 Sleep states to minimize energy consumption between transmission intervals. To avoid the high energy cost of a full LoRaWAN join process after every wake-up, the system stores network session keys and state information in persistent memory—using ESP32 RTC RAM or RP2040 RAM. This allows for "Fast LoRaWAN Joining," where the device resumes its session almost instantly.

Configuration is equally robust. The project supports loading LoRaWAN secrets and hardware-specific parameters from JSON files stored on LittleFS, allowing for easier deployment across multiple devices without hardcoding credentials into the firmware. 

### Ecosystem and Connectivity

The repository provides a complete end-to-end solution, including Javascript-based uplink and downlink payload formatters. These tools ensure that raw hex data is correctly decoded into human-readable JSON on the network server. Beyond raw data, the project is built for integration with Home Assistant via MQTT, as well as cloud platforms like Datacake for professional dashboarding. For advanced users, the software supports remote configuration via LoRaWAN downlinks, enabling the adjustment of sleep intervals, sensor timeouts, and battery thresholds over the air.
