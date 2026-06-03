---
title: Homey Smart Home Controllers
summary: A collection of smart home device controllers built using ESP8266 microcontrollers
  and Mongoose-OS. The project includes firmware and hardware designs for blinds,
  heaters, air extractors, and portable sensors, designed to integrate with the Mozilla
  WebThings ecosystem.
slug: homey-smart-home-controllers
codeUrl: https://github.com/chris-zen/homey
star: 1
version: relays-hw/r2
lastUpdated: '2018-11-18'
rtos: mongoose-os
topics:
- electronics
- esp8266
- iot
- mongoose-os
- smarthome
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- esp8266-home-automation
- esphome-components-for-miot-devices
- nodemcu-device-lua-modules
- mongoose-os-samples-for-esp32
- mongoose-os-programs-and-examples
- m5stack-esphome-integrations
---

## Overview

Homey is a comprehensive smart home project focused on building custom controllers for various household automation tasks. This project represents a second-generation evolution of the author's home automation efforts, transitioning from previous energy monitoring systems to a more modular architecture based on the ESP8266 microcontroller and Mongoose-OS.

The system is designed to be interoperable with the Mozilla Project of Things (now WebThings) gateway, allowing for centralized management of custom-built ESP8266 devices alongside commercial Z-Wave hardware. The project covers a wide range of applications, from environmental sensing to motorized control of household fixtures.

## Key Controllers and Modules

The repository is organized into several specialized controllers, each targeting a specific automation need:

- **Blinds Controller**: Designed to remotely operate window blinds, providing motorized up and down functionality.
- **Portable Sensors**: A mobile unit that measures internal and external environmental data, such as temperature and humidity, while providing a portable user interface for monitoring.
- **Heater Controller**: A climate control module that switches heating systems on or off based on desired temperature setpoints, current environmental readings, and humidity parameters.
- **Bathroom Extractor Controller**: An intelligent ventilation system that manages air extraction based on presence detection, humidity levels, and specific time restrictions.

## Technical Implementation

The project leverages **Mongoose-OS**, an IoT firmware development framework specifically chosen for its compatibility with the ESP8266. This choice allows for robust networking capabilities and easier integration with cloud or local gateways. 

On the hardware side, the project includes KiCad schematics and PCB designs, specifically found in the `relays-hw` directory. These designs are optimized for version control using tools like `plotkicadsch` to ensure that hardware changes are easily trackable within the Git repository. The system architecture typically involves a Raspberry Pi acting as the base station, running the Mozilla IoT gateway to coordinate communication between the various ESP8266 nodes.

## Integration and Ecosystem

A significant focus of the project is the integration with the Mozilla WebThings ecosystem. By utilizing a Raspberry Pi as a central gateway, the system can bridge custom ESP8266-based WiFi devices with other standard protocols like Z-Wave. This hybrid approach allows for a flexible smart home setup that combines the cost-effectiveness of custom DIY hardware with the reliability of established commercial smart home standards.

For developers interested in the hardware aspect, the project provides insights into the iterative process of building these controllers, including documentation of previous failures and design improvements in the blinds controller module.
