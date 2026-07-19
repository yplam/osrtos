---
title: LVGL ESPHome Firmware for Waveshare ESP32-P4-86-Panel
summary: A custom ESPHome-based firmware for the Waveshare ESP32-P4-86-Panel-ETH-2RO,
  utilizing the LVGL graphics library for a rich touch interface. It integrates with
  Home Assistant to provide control over lights, climate, media players, and more,
  while displaying real-time sensor data and weather forecasts.
slug: lvgl-esphome-firmware-for-waveshare-esp32-p4-86-panel
codeUrl: https://github.com/alaltitov/Waveshare-ESP32-P4-86-Panel-ETH-2RO
star: 48
lastUpdated: '2025-11-09'
rtos: freertos
libraries:
- lvgl
topics:
- display
- esp32-p4
- esphome
- esphomeyaml
- firmware
- homeassistant
- iot
- lvgl
- lvgl-esp32
- lvgl8
- voice-assistant
- waveshare
isShow: false
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- esp32-p4-home-assistant-display
- esp32-s3-smart-home-control-panel
- openhasp-firmware
- esphome-lvgl-component
- hometiles
- geekmagic-smalltv-esp8266-firmware
---

## Overview

This project provides a sophisticated custom firmware for the Waveshare ESP32-P4-86-Panel-ETH-2RO, a powerful 86-type smart home control panel. Built on the ESPHome framework and leveraging the LVGL (Light and Versatile Graphics Library) version 8.4, the firmware transforms the hardware into a comprehensive Home Assistant dashboard. It features a modern, multi-page user interface designed for high-resolution touch displays, allowing users to manage their entire smart home ecosystem from a centralized wall-mounted device.

## Hardware Platform

The firmware is specifically tailored for the Waveshare ESP32-P4-86-Panel-ETH-2RO. This hardware is based on the ESP32-P4 chip, which offers significant performance improvements over previous ESP32 generations, particularly for driving high-resolution displays and handling complex UI logic. The board includes Ethernet connectivity (ETH) and two onboard relays (2RO), making it an ideal candidate for both network-stable communication and direct hardware control within a smart home setup.

## Key Features and Capabilities

The firmware includes a wide array of widgets and control interfaces, all synchronized with Home Assistant entities:

- **Comprehensive Dashboard**: Displays date, time, and status indicators for Wi-Fi, Home Assistant API connectivity, thermostat status, and touchscreen locks.
- **Environmental Control**: Dedicated interfaces for climate control (HVAC), fans, and covers.
- **Lighting and Media**: Full control over light brightness and color, as well as media player controls and radio testing features.
- **Weather and Forecasts**: Real-time weather icons with current conditions, temperature, and detailed daily/hourly forecasts.
- **Security and Utility**: Alarm panel controls, vacuum cleaner management, and sensor readings directly from Home Assistant.
- **Multi-language Support**: The interface is localized for several languages, including English, Russian, Polish, French, Spanish, Dutch, Slovenian, Italian, and German.
- **Voice Assistant**: Experimental support for integrated voice assistant functionality.

## Technical Implementation

The project utilizes the ESPHome LVGL component to define the UI declaratively. By using ESPHome's substitution system, the firmware allows for easy customization. Users can modify `substitutions.yaml` and `config.yaml` to map their specific Home Assistant entities to the UI widgets without needing to rewrite the core display logic. 

To support the advanced UI features, the project requires the development version of ESPHome (2025.11.0 or newer). It also integrates with custom Home Assistant components for enhanced functionality, such as specialized forecast tools and media player cover art handling.

## Getting Started

To deploy the firmware, users should copy the repository into their ESPHome environment (such as the VS Code plugin or the Home Assistant ESPHome dashboard). Configuration is primarily handled through the substitution files, where users define their Wi-Fi credentials, API keys, and entity IDs. It is crucial to enable the "Allow the device to perform Home Assistant actions" option within the Home Assistant ESPHome integration to ensure the touch interface can successfully trigger service calls and control devices.
