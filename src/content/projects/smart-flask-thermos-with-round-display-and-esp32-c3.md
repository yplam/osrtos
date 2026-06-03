---
title: Smart Flask Thermos with Round Display and ESP32-C3
summary: An ESP32-C3 based smart thermos that measures liquid temperature using an
  NTC thermistor and displays it on a 1.28-inch round capacitive touch screen. The
  project utilizes the LVGL library for its user interface and NimBLE for Bluetooth
  connectivity.
slug: smart-flask-thermos-with-round-display-and-esp32-c3
codeUrl: https://github.com/MakersFunDuck/Smart-Flask-Thermos-with-Round-Display-and-ESP32-C3
star: 15
lastUpdated: '2025-01-19'
rtos: freertos
libraries:
- lvgl
- h2zero-esp-nimble-cpp
topics:
- arduino
- bluetooth
- esp32
- lvgl-esp32
- lvgl8
- platformio
- squareline
isShow: false
createdAt: '2026-01-18'
updatedAt: '2026-01-18'
relatedProjects:
- la-marzocco-round-controller
- flatsphere-clock
- reflow-oven-with-micropython-lvgl
- x-knob-a-smart-knob-based-on-lvgl-ui-framework
- esp32-st7789v-ft6236u-arduino-lvgl-demo
- esphome-cosori-kettle-ble-component
---

## Overview

The Smart Flask Thermos project is an innovative application of modern embedded hardware, transforming a standard vacuum flask into an intelligent device. By integrating a high-resolution round display and an ESP32-C3 microcontroller, the project provides real-time temperature monitoring and wireless data access.

At its core, the device solves a simple but common problem: knowing the exact temperature of your beverage without needing to open the flask. By mounting a circular display directly onto the thermos, the user gets immediate visual feedback on the contents' thermal state.

## Hardware Architecture

The heart of the project is the CrowPanel 1.28-inch Round ESP32 Display. This hardware module features a 240x240 IPS capacitive touch screen driven by an ESP32-C3 SoC. The ESP32-C3 provides the necessary processing power and integrated Bluetooth LE capabilities in a compact form factor suitable for small appliances. 

For sensing, the system employs an NTC thermistor to measure the temperature of the liquid inside the flask. The analog readings from the thermistor are processed by the ESP32-C3 to provide accurate Celsius or Fahrenheit values.

## Software and User Interface

The firmware is developed using the Arduino framework within the PlatformIO ecosystem. A significant highlight of the project is its sophisticated user interface, built using the LVGL (Light and Versatile Graphics Library) version 8. The UI was designed using SquareLine Studio, which allowed the developer to create a polished, circular interface that complements the hardware's physical shape.

### Key Features

- **Real-time Temperature Sensing**: Continuous monitoring via an NTC thermistor.
- **High-Quality Display**: 16-bit color round IPS display for clear visuals.
- **Touch Interface**: Capacitive touch support for user interaction.
- **Bluetooth Connectivity**: Remote monitoring of temperature values via Bluetooth Low Energy (BLE).
- **Modern Development Stack**: Built with PlatformIO, LVGL, and NimBLE.

## Technical Implementation

The project configuration is managed via `platformio.ini`, which defines the environment for the `lolin_c3_mini` board. It relies on several key libraries to function:

- **LVGL**: Manages the graphical stack and touch inputs.
- **NTC_Thermistor**: Handles the conversion of analog signals into human-readable temperature data.
- **NimBLE-Arduino**: Provides a memory-efficient Bluetooth stack for the ESP32, allowing the device to communicate with external apps or dashboards.

## Getting Started

To replicate or modify this project, developers need an ESP32-C3 based round display and a standard NTC thermistor. The software side requires PlatformIO for building and flashing the firmware. The UI can be further customized using SquareLine Studio, as the project includes the necessary design files. This project serves as an excellent reference for anyone looking to integrate circular displays into IoT devices or smart home appliances.
