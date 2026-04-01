---
title: Gaggimate
summary: Gaggimate is an ESP32-based smart control upgrade for Gaggia espresso machines,
  providing a custom UI for temperature monitoring and pump control. It leverages
  the FreeRTOS-based ESP32 platform using LVGL and TFT_eSPI for its display interface,
  and NimBLE-Arduino for wireless connectivity.
slug: gaggimate
codeUrl: https://github.com/jniebuhr/gaggimate
siteUrl: https://gaggimate.eu/
version: v1.7.3
lastUpdated: '2026-03-27'
image: /202603/gaggimate_1.avif
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- lvgl
- tft-espi
topics:
- coffee
- espresso
- gaggia
- iot
- pid
- smarthome
isShow: true
createdAt: '2026-03-31T13:15:59+00:00'
updatedAt: '2026-03-31T13:15:59+00:00'
---

Gaggimate is an open-source project designed to upgrade Gaggia espresso machines with smart controls, significantly improving the coffee-making experience. By integrating a display and custom electronics, users can monitor and control their machine with a level of precision not possible with the stock hardware.

## Features

The system introduces several key capabilities to the Gaggia platform:

- **Temperature Control**: Live monitoring of the boiler temperature ensures that the machine is at optimal brewing conditions before you pull a shot.
- **Brew Timer**: Users can set target durations, allowing the system to run the brewing process for a specific, repeatable time.
- **Steam and Hot Water Mode**: The firmware manages the pump and valves to execute specific tasks for steaming milk or dispensing hot water.
- **Safety Features**: The software includes automatic shutoff routines that trigger if the system becomes unresponsive or detects overheating.
- **User Interface**: A simple, intuitive display allows for real-time monitoring and easy control of all machine functions.


## How It Works

The core of the Gaggimate experience is the interactive display. This interface provides live temperature updates and allows for direct control over the espresso machine's internal components. Safety is baked into the logic; if the machine's temperature exceeds safe thresholds or if the controller stops responding, the system will automatically power down to prevent damage or hazards.

![Brew Screen](/202603/gaggimate_2.avif)

## Technical Architecture

Software-wise, Gaggimate is built as a multi-variant firmware for ESP32-based hardware. It is designed to be flexible, supporting both full display interfaces and headless controller configurations for specialized devices. 

The project relies on a robust stack of libraries to handle its diverse responsibilities:
- **UI & Graphics**: The interface is powered by LVGL and the TFT_eSPI library, ensuring smooth performance on small embedded screens.
- **Connectivity**: It utilizes NimBLE-Arduino for efficient Bluetooth communication and ESPAsyncWebServer for network connectivity.
- **Smart Home Integration**: The system supports HomeKit integration via the HomeSpan library, allowing the espresso machine to participate in modern smart home ecosystems.
- **Data & Sensors**: ArduinoJson handles data processing, while SensorLib and various GFX libraries provide the hardware abstraction needed to support different sensor and display configurations across various build environments.

For developers looking to extend the system or integrate it with other tools, additional documentation is available for the WebSocket API, which allows for remote monitoring and control of the machine's state.
