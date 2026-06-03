---
title: 'ESPGaggia: Smart Coffee Machine Controller'
summary: An ESP32-based firmware designed to upgrade Gaggia coffee machines with smart
  capabilities. It features PID and Fuzzy Logic temperature control, a custom scripting
  engine for brew recipes, and a touch-screen interface powered by LVGL, with full
  MQTT and Homebridge integration.
slug: espgaggia-smart-coffee-machine-controller
codeUrl: https://github.com/rvt/espgaggia
star: 30
lastUpdated: '2021-07-18'
rtos: freertos
libraries:
- lvgl
- spiffs
topics:
- esp32
- fuzzylogic
- gaggia
- ili9341
- lvgl
- pid
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- gaggimate
- la-marzocco-round-controller
- diy-smart-coffee-and-espresso-scale
- openhasp-firmware
- lvgl-esphome-firmware-for-waveshare-esp32-p4-86-panel
- reflow-oven-with-micropython-lvgl
---

## Overview

ESPGaggia is a sophisticated firmware project designed to modernize the classic Gaggia espresso machine using an ESP32 microcontroller. The project aims to provide precise control over the brewing process while minimizing the complexity of hardware modifications. By replacing or augmenting the machine's traditional thermostats with digital sensors and Solid State Relays (SSRs), ESPGaggia introduces advanced features like PID temperature management, pre-infusion, and remote operation.

## Key Features

The system is built around a robust set of features that cater to coffee enthusiasts looking for consistency and control:

- **Advanced Temperature Control**: Uses Fuzzy Logic and PID controllers to manage both steam and brew temperatures with high precision.
- **Custom Scripting Engine**: Includes a domain-specific language that allows users to define complex brewing sequences, including pre-infusion timings and temperature ramps.
- **Touch Interface**: A rich graphical user interface built with the LVGL library, running on an ILI9341 touch display for real-time monitoring and configuration.
- **Smart Home Integration**: Full MQTT support allows for remote monitoring and control. With the provided Homebridge configuration, users can even trigger their machine using Siri.
- **Energy Management**: Features standby and power-down modes with lower temperature setpoints to conserve energy when the machine is not in active use.

## Technical Implementation

The project is developed using the Arduino framework for the ESP32, leveraging the dual-core capabilities of the chip to handle UI tasks and control loops simultaneously. It utilizes several specialized libraries, including `lvgl` for the interface, `PubSubClient` for MQTT communication, and `MAX31855_RT` for interfacing with K-type thermocouples.

### Scripting Capabilities

One of the most unique aspects of ESPGaggia is its internal scripting engine. This allows users to create "recipes" as simple text files stored on the ESP32's SPIFFS filesystem. A script can control the 3-way valve, the pump, and temperature setpoints. 

For example, a cappuccino script might look like this:

```text
pump=0;
valve=0;
Message=Wait for brew temperature;
brewTemp=defaultBrewTemp;
Message=Preinfusing...;
valve=1;
wait=100;
pump=1;
wait=2000;
pump=0;
wait=5000;
Message=Brewing;
pump=1;
wait=30000;
pump=0;
valve=0;
Message=Done;
```

## Hardware Requirements

The system is designed to interface with standard high-voltage espresso machine components safely via SSRs. The core hardware stack includes:

- **ESP32 Dev Module**: The central controller.
- **MAX31855K Thermocouple Breakouts**: For high-accuracy temperature sensing at the boiler.
- **Solid State Relays (SSRs)**: For controlling the pump, boiler, and 3-way valve.
- **ILI9341 SPI TFT**: A 2.8" touch display for the user interface.
- **HLK-PM01**: A compact 230V to 5V DC power supply to power the electronics directly from the machine's mains.

## Getting Started

The project is managed via PlatformIO. Users can compile and upload the firmware and the filesystem (containing scripts and configuration) using standard PlatformIO commands. The firmware supports Over-The-Air (OTA) updates, making it easy to refine scripts and settings once the machine is fully assembled and closed.
