---
title: Assistant BUS/VELIB/Pluie maison
summary: A smart home display application built on Mongoose OS that provides real-time
  Parisian transit data and weather forecasts. It tracks RATP bus schedules, Velib
  bike availability, and Meteo France rain predictions using an ESP32-based LED matrix
  display.
codeUrl: https://github.com/licarth/compteur-velib
isShow: false
rtos: mongoose-os
libraries: []
topics:
- esp8266
- mongoose-os
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esptimecast
- esp8266-esp32-spotify-oled-display
- esphome-e-ink-4-color-dashboard
- esp32-cyd-weather-station-with-3-day-forecast
- astronomy-micro-station
- lvgl-esphome-firmware-for-waveshare-esp32-p4-86-panel
---

## A Smart Display for the Parisian Commuter

Navigating public transport and weather in Paris can be a challenge. The **Assistant BUS/VELIB/Pluie maison** project aims to simplify this by providing a dedicated hardware display for your home. Instead of checking your phone, this device gives you instant visibility into when the next bus is coming, if there's a Velib bike waiting for you, and whether you'll need an umbrella in the next hour.

## Core Features

The project integrates three essential services for a Parisian resident:
- **Real-time Bus Schedules**: Fetches data from the RATP API to show exactly when the next bus will arrive at your local stop.
- **Velib Station Status**: Monitors nearby bike-sharing stations to report the number of available bikes.
- **Meteo France Rain Forecast**: Provides the "Pluie à 1h" (Rain within the hour) forecast, a staple for anyone walking or cycling in the city.

## Technical Architecture

The project is built using **Mongoose OS**, a versatile framework designed specifically for IoT devices. This choice allows for a hybrid development approach that balances performance with ease of use:

- **C++ Core**: The `src` directory contains `LedControl.cpp` and `LedControl.h`. These files handle the low-level timing and data transmission to the LED display hardware, ensuring smooth rendering of information.
- **JavaScript Logic**: High-level application logic, such as network requests to the RATP and Meteo France APIs and data parsing, is handled in `fs/init.js`. Mongoose OS's ability to run JavaScript allows for rapid iteration on API integrations without requiring a full firmware recompilation for every change.
- **Secure Communication**: The inclusion of `ca.pem` in the filesystem indicates that the device is configured to communicate securely over HTTPS, which is necessary for modern web APIs.

## Hardware and Display

The project utilizes a custom `LedControl` implementation, which is a common pattern for driving MAX7219 or MAX7221 LED matrix controllers. This setup typically results in a bright, high-contrast display that is easy to read from across a room, making it an ideal dashboard for a hallway or kitchen.

## Getting Started

To deploy this project, developers use the Mongoose OS command-line tool (`mos`). The configuration is defined in `mos.yml`, which sets up the build environment, firmware metadata, and hardware-specific settings. 

```cpp
// Example of how the LED control is initialized in src/main.cpp
#include "LedControl.h"

// The LedControl class manages the communication with the LED matrix
// allowing the JavaScript layer to send display commands.
```

Once the hardware is flashed and connected to Wi-Fi, the `init.js` script takes over, managing the polling intervals for the various transport and weather services and updating the display buffer accordingly.
