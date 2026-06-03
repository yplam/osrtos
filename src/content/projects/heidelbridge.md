---
title: HeidelBridge
summary: An ESP32-based firmware designed to connect Heidelberg Energy Control wallboxes
  to WiFi networks. It emulates a Daheimladen-compatible interface, allowing for seamless
  integration with energy management platforms like evcc and Home Assistant via MQTT
  and REST APIs.
slug: heidelbridge
codeUrl: https://github.com/BorisBrock/HeidelBridge
star: 34
version: 3.5.0
lastUpdated: '2026-02-08'
rtos: freertos
topics:
- charger
- daheimladen
- esp32
- evcc
- evse
- heidelberg
- home-automation
- modbus
- ocpp
- wallbox
isShow: true
image: /202602/home_assistant.webp
createdAt: '2026-02-11'
updatedAt: '2026-02-11'
relatedProjects:
- dtugateway-for-hoymiles-hms-inverters
- mitsubishi-ecodan-air-to-water-bridge-for-cn105-to-mqtt
- simplebus2-mqtt-bridge
- sonoff-basic-firmware-for-openhab
- esp32-controller-for-charlton-jenrick-fireplace
- lixee-box
---

HeidelBridge serves as a specialized firmware for ESP32 microcontrollers, designed to integrate Heidelberg Energy Control wallboxes into modern smart home ecosystems. By acting as a communication bridge, it translates the wallbox's native Modbus RTU protocol into a network-accessible format, specifically emulating the Daheimladen API. This transformation allows users to monitor and control their EV charging infrastructure through standard home energy management systems (HEMS).

## Hardware and Connectivity

The project is built on the Espressif ESP32 platform, leveraging its integrated WiFi capabilities and robust processing power. To interface with the wallbox, the system requires a MAX485 transceiver module, which handles the physical layer of the RS485 communication. For users seeking a more integrated solution, the firmware also supports the LILYGO T-CAN485 board, which features an onboard RS485 transceiver, simplifying the hardware setup significantly. The minimalist hardware requirements make it an accessible project for DIY enthusiasts, typically requiring only an ESP32, a MAX485 module, and basic wiring.

## Software Architecture

One of the core strengths of HeidelBridge is its asynchronous software architecture. By utilizing specialized asynchronous networking libraries, the firmware maintains high responsiveness even when handling multiple concurrent network requests. It exposes both a REST API and an MQTT interface, providing flexibility for different integration scenarios. 

Key technical features include:
- **Asynchronous Communication**: Uses non-blocking network stacks to ensure the Modbus polling loop remains stable.
- **MQTT & REST APIs**: Dual-protocol support for broad compatibility with automation platforms.
- **Web Interface**: A built-in web server provides a configuration dashboard and real-time status monitoring.
- **OTA Updates**: Support for Over-The-Air updates allows users to maintain the device without physical disassembly.

## Integration Ecosystem

Integration with popular open-source energy management tools is a primary focus. By emulating the Daheimladen protocol, HeidelBridge becomes compatible with evcc, a popular extensible EV charge controller. This allows for advanced features like solar-optimized charging, where the wallbox adjusts its power output based on current photovoltaic production. 

Furthermore, the project provides detailed guidance for Home Assistant integration. Users can stream live data to their dashboards, track energy consumption over time, and create custom automation logic based on the vehicle's charging state. The firmware effectively turns a standard industrial wallbox into a fully connected IoT device.

## Getting Started

Setting up HeidelBridge involves flashing the ESP32 using PlatformIO and connecting the hardware to the wallbox's RS485 interface. The project documentation provides step-by-step guides for software setup, hardware wiring, and specific integrations for evcc and Home Assistant. Because it targets the classic ESP32, it benefits from a mature ecosystem of tools and wide hardware availability.
