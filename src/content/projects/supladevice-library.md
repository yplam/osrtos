---
title: SuplaDevice Library
summary: A comprehensive C++ framework for connecting embedded devices to the SUPLA
  home automation ecosystem. It supports ESP32, ESP8266, and Arduino Mega platforms,
  providing a modular architecture for managing sensors, relays, and complex control
  interfaces.
slug: supladevice-library
codeUrl: https://github.com/SUPLA/supla-device
siteUrl: https://supla.github.io/supla-device/
star: 48
version: v25.11
lastUpdated: '2026-01-02'
rtos: freertos
libraries:
- littlefs
topics:
- arduino
- arduino-library
- esp32
- esp8266
- freertos
- freertos-iot
- linux
- wifi
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- silicon-labs-arduino-core
- autonetwork-library
- spirit-motor-driver-library
- thing-simplified-mqtt-framework-for-esp8266-and-esp32
- pamculib
- esp32-ai-connect
---

## Overview

SuplaDevice is the core library for the [SUPLA](https://www.supla.org) project, an open-source home automation system. This library allows developers to implement software for various hardware devices that connect to the Supla infrastructure. It is designed to be highly portable, supporting the Arduino IDE, ESP8266 RTOS SDK, and ESP-IDF. While primarily targeted at Espressif and AVR microcontrollers, it can also be compiled for Linux and FreeRTOS environments.

## Architecture: Elements and Channels

The library's architecture is built around the concepts of "Elements" and "Channels." In the SUPLA ecosystem, a channel represents a single functional unit—such as a relay, a temperature sensor, or a garage door controller. 

SuplaDevice implements these through the `Element` class. Every physical component (a button, a sensor, or a light) is an instance of an object that inherits from `Element`. These objects automatically register themselves with the main `SuplaDevice` instance. The library manages a sophisticated lifecycle for these elements, calling virtual methods at specific stages:

- `onInit`: Handles GPIO setup and initial state configuration.
- `onLoadConfig` and `onLoadState`: Retrieve configuration and state data from persistent storage.
- `iterateAlways` and `iterateConnected`: Provide hooks for logic that must run every loop or only when the device is online.
- `onTimer` and `onFastTimer`: Offer high-frequency execution for time-critical tasks.

## Hardware and Network Support

SuplaDevice provides broad hardware compatibility, specifically optimized for the following platforms:

- **ESP32 and ESP8266**: Native support for WiFi and Ethernet (on ESP32). These platforms are the primary targets for modern SUPLA implementations.
- **Arduino Mega**: Supported using Ethernet shields (W5100 or ENC28J60). Due to RAM limitations, smaller boards like the Arduino Uno are not supported.
- **Linux**: Allows for running SUPLA logic on single-board computers or PCs, often used for gateways or complex integrations.

Networking is abstracted through specific interface classes, such as `Supla::ESPWifi` or `Supla::EthernetShield`, which handle the underlying TCP/IP stack and SSL/TLS encryption.

## Extensive Feature Set

The library includes a vast array of pre-implemented elements categorized into sensors and control units:

### Sensors
Support is included for a wide variety of environmental and electrical sensors, including:
- **Temperature & Humidity**: DS18B20, DHT11/22, Si7021, BME280, and SHT3x.
- **Electrical**: PZEMv2/v3 one-phase and three-phase meters.
- **General**: Impulse counters, distance sensors (HC-SR04), and weight sensors (HX711).

### Control and Actuators
- **Relays**: Standard relays, bistable relays, and specialized light relays.
- **Lighting**: PWM-based Dimmer, RGB, and RGBW controllers.
- **Motorized**: Advanced Roller Shutter controllers with calibration support.
- **HVAC**: A complex thermostat and HVAC management system supporting weekly schedules and various heating/cooling algorithms.

## Persistence and Storage

To ensure reliability across power cycles, SuplaDevice includes a storage abstraction layer. It supports standard EEPROM and Flash memory (using LittleFS on ESP platforms) as well as high-endurance FRAM via SPI. This allows devices to remember pulse counter values, roller shutter positions, and thermostat settings even after a reset.

## Getting Started

For Arduino users, the library can be installed via the Library Manager. A typical setup involves defining the network interface and the desired elements before calling the `begin` method:

```cpp
#include <supla/network/esp_wifi.h>
#include <supla/control/relay.h>
#include <supla/sensor/ds18b20.h>

// Setup WiFi
Supla::ESPWifi wifi("your_ssid", "your_password");

void setup() {
  // Create a relay on GPIO 5
  new Supla::Control::Relay(5);

  // Create a thermometer on GPIO 4
  new Supla::Sensor::DS18B20(4);

  // Initialize Supla
  SuplaDevice.begin(GUID, "svr1.supla.org", "email@example.com", AUTHKEY);
}

void loop() {
  SuplaDevice.iterate();
}
```

This modular approach allows developers to build complex multi-functional devices by simply instantiating the required classes, with the library handling the complexities of the SUPLA protocol and server communication.
