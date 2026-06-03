---
title: MicroPython SmartHome Node (pysmartnode)
summary: A modular framework for deploying smart home nodes using MicroPython and
  MQTT. It provides standardized base classes for sensors and switches, supports Home
  Assistant MQTT discovery, and targets ESP32, ESP8266, and Unix platforms using asynchronous
  I/O.
slug: micropython-smarthome-node-pysmartnode
codeUrl: https://github.com/kevinkk525/pysmartnode
star: 119
version: v6.1.2
lastUpdated: '2020-09-01'
rtos: ''
libraries:
- micropython
topics:
- esp32
- esp8266
- home-assistant
- micropython
- mqtt
- sensor
- smarthome
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- microhomie
- mongoose-os-configurable-sensor-node
- mqboard-micropython-mqtt-micro-framework
- iot-framework-for-nodemcu
- nodemcu-device-lua-modules
- seeed-home-assistant-discovery
---

## Overview

pysmartnode is a comprehensive framework designed to simplify the deployment of smart home nodes using MicroPython. Communicating primarily via MQTT, the project provides a structured environment for building reliable IoT devices that are easy to extend with custom components and scripts. By leveraging MicroPython's `uasyncio` library, it enables non-blocking operations, allowing devices to handle multiple sensors, switches, and network communications concurrently.

The framework was born out of a need for a MicroPython-based alternative to C++ frameworks, which can often be difficult for hobbyists to extend. pysmartnode focuses on clear documentation, a logical project structure, and reliability, ensuring that nodes can recover from network failures or component crashes.

## Hardware Support

The project is optimized for popular low-cost microcontrollers and even supports execution on standard operating systems:

*   **ESP8266:** Highly resilient implementation using a software watchdog to ensure 24/7 operation despite the platform's limited RAM.
*   **ESP32:** Fully supported using the official MicroPython port, taking advantage of increased memory and processing power.
*   **Unix Port:** Allows running the framework on Linux-based systems (like a Raspberry Pi), enabling system calls to control external hardware like RF433MHz devices via existing libraries.

## Architecture and Components

At the core of pysmartnode is a modular component system. Every device or sensor is treated as a component, inheriting from base classes that handle the heavy lifting of MQTT communication and integration. 

### Standardized API

The framework provides specialized base classes for different device types:
*   **ComponentSensor:** Standardizes how data is read and published. It separates reading intervals from publishing intervals, ensuring that high-frequency local logic doesn't saturate the MQTT broker.
*   **ComponentSwitch:** Provides a unified interface for anything that can be turned on or off, including state restoration after a reboot.
*   **ComponentButton:** A specialized version of the switch for single-shot actions.

### Home Assistant Integration

One of the standout features of pysmartnode is its native support for Home Assistant MQTT Discovery. When a component is initialized, it can automatically send discovery messages to Home Assistant, allowing the device to appear in the dashboard instantly without manual YAML configuration.

## Configuration Management

pysmartnode offers two primary ways to manage device configurations:

1.  **SmartServer:** A companion server that holds configurations for all microcontrollers in the network. Devices request their configuration over MQTT on boot, making it easy to update settings across dozens of nodes from a central location.
2.  **Local Configuration:** For standalone operation or environments where security is a priority, configurations can be stored locally in a `components.py` file or frozen into the firmware as bytecode to save RAM.

## Technical Implementation

The framework is built to be RAM-efficient, which is critical for the ESP8266. It encourages the use of frozen bytecode—pre-compiling Python scripts into the firmware—to minimize heap usage. It relies on `micropython-mqtt-as`, an asynchronous MQTT library that provides robust connection handling, including automatic reconnection and 'last will' messages to track device availability.

## Getting Started

To use pysmartnode, developers typically clone the repository, update the submodules for dependencies like `mqtt_as`, and customize a `config.py` file with WiFi and MQTT credentials. The project includes templates for new sensors and switches, making it straightforward to integrate unique hardware into the ecosystem. For those looking for detailed module documentation, the `COMPONENTS.md` file provides a deep dive into the class hierarchies and available methods.
