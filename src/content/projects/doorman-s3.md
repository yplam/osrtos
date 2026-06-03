---
title: Doorman S3
summary: An ESP32-S3 powered intercom gateway that bridges TCS and Koch intercom systems
  with home automation platforms. It features TC:BUS communication, integrated solid-state
  relay control, and full ESPHome support for seamless integration into Home Assistant
  and HomeKit.
slug: doorman-s3
codeUrl: https://github.com/AzonInc/Doorman
siteUrl: https://doorman.azon.ai/
star: 171
version: v1.6.0
lastUpdated: '2026-01-22'
rtos: freertos
libraries:
- lwip
topics:
- esp
- esp32
- esp32-s3
- esphome
- gegensprechanlage
- home-assistant
- home-automation
- homeautomation
- intercom
- kicad
- koch
- niko
- nuki
- nuki-smartlock
- pcb
- pcb-design
- scantron
- tc-bus
- tcs
- tcs-bus
isShow: true
image: /202602/doorman.webp
createdAt: '2026-02-09'
updatedAt: '2026-02-09'
relatedProjects:
- simplebus2-mqtt-bridge
- esphome-modbus-tcp-to-rtu-bridge
- genius-gateway
- heidelbridge
- lixee-box
- esp32-c6-matter-over-thread-roof-window-controller
---

The Doorman S3 is an intercom gateway designed to bridge the gap between traditional building intercom systems and modern home automation. Specifically targeting systems like TCS and Koch, it allows users to bring their front door functionality into platforms like Home Assistant, providing a unified interface for access control.

### Hardware Architecture
The heart of the Doorman S3 is the ESP32-S3, a microcontroller that provides the necessary performance for handling real-time bus communication and network tasks. The hardware is designed to be compact, featuring a USB-C port for firmware flashing and a bridge rectifier to handle polarity on the bus-wire input, which simplifies the installation process.

Key hardware capabilities include:
- **TC:BUS Communication**: Native support for door functions and doorbell detection.
- **Solid-State Relay**: Capable of switching up to 40V and 2.5A, which can be used to simulate physical button presses for door openers or lighting circuits.
- **Voltage Monitoring**: Enables interaction with older, non-digital intercoms by reading voltage levels to trigger automation events.
- **Expansion Options**: Includes two additional GPIOs for I2C sensors and a configurable WS2812B RGB LED for visual status indicators.

### Software and Ecosystem
The project is built around the ESPHome framework, making it highly customizable and natively compatible with Home Assistant. The repository includes a Python-based configuration generator that allows users to build firmware tailored to their specific environment. This system can generate configurations for various communication protocols, including the Home Assistant API, MQTT, and HomeKit.

A notable feature is the optional Nuki Bridge functionality. By utilizing the ESP32's Bluetooth capabilities, the Doorman S3 can act as a bridge for Nuki Smart Locks. This allows the device to serve as a central hub for both the building's main entrance and the individual apartment door.

### Open Source Development
Doorman S3 is an open-source project that provides both the software and the hardware design files. The repository contains KiCad schematics and PCB layouts, as well as STL files for a custom enclosure. This transparency allows the community to audit the design, build their own units, or modify the hardware for specialized applications.

The project leverages existing community research into the TC:BUS protocol, building upon previous reverse-engineering efforts to provide a stable and documented implementation. For those looking to integrate the system, the project maintains comprehensive documentation covering hardware compatibility, firmware installation, and ESPHome component usage. Most intercom systems operating on a 2-wire bus in the 14-24V DC range are potentially compatible with the Doorman S3 architecture.
