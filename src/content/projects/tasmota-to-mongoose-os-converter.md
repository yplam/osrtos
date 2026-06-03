---
title: Tasmota to Mongoose OS Converter
summary: A minimal intermediate firmware designed for OTA flashing Mongoose OS onto
  ESP8266-based IoT devices currently running Tasmota or compatible firmware. It facilitates
  the restoration of Mongoose OS-based stock firmware, such as Shelly devices, by
  providing a bridge between different partition layouts and bootloaders.
slug: tasmota-to-mongoose-os-converter
codeUrl: https://github.com/yaourdt/tasmota-to-mgos
star: 72
version: v0.1.2
lastUpdated: '2023-02-16'
rtos: mongoose-os
topics:
- firmware
- mongoose-os
- shelly
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mongoose-to-tasmota-home-accessory-architect-or-espurna
- shelly-to-haa-firmware-converter
- mongoose-os
- mongoose-os-configurable-sensor-node
- sonoff-basic-firmware-for-openhab
- sonoff-http-firmware
---

## Overview

Tasmota to Mongoose OS is a specialized intermediate firmware designed to solve a specific challenge in the ESP8266 IoT ecosystem: wirelessly reverting devices from Tasmota or similar firmwares back to Mongoose OS. This is particularly useful for users who have flashed alternative firmware onto devices like Shelly smart switches and wish to return to the manufacturer's stock firmware without using a physical serial connection.

The project provides a minimal Mongoose OS environment that can be uploaded via Tasmota's standard update mechanism. Once active, it creates a temporary access point that allows users to push a full Mongoose OS-based firmware package to the device.

## Technical Implementation

The firmware is built on Mongoose OS version 2.19.0 and is optimized for a small footprint to ensure compatibility with devices having limited flash space. To achieve this, the build configuration disables several heavy features, such as SSL support and ATCA crypto chip support, focusing strictly on the networking and OTA update capabilities.

A critical aspect of this project is its handling of the ESP8266 bootloader configuration. Different devices expect the bootloader configuration at different memory offsets. This project supports two primary configurations:
- **0x1000**: Used by devices like Shelly 1, 1PM, 2, 2.5, Uni, i3, and EM.
- **0x7000**: Used by devices like Shelly Plug S, RGBW2, Dimmer 1/2, Bulb, and H&T.

## Workflow and Usage

The conversion process follows a three-step approach to ensure a safe transition between firmware environments:

1.  **Intermediate Flash**: The user uploads the appropriate version of this firmware (matching the device's bootloader offset) using the Tasmota web interface. If Tasmota's compatibility check prevents the upload, users can bypass it using the `Setoption78 1` command.
2.  **Network Handover**: After rebooting, the device enters Access Point mode, broadcasting an SSID labeled `mg-??????`. The device adopts a static IP of `10.42.42.44` to simplify the next step.
3.  **Final Restoration**: Once connected to the device's AP, the user can push the final target firmware (such as a Shelly stock firmware ZIP) using a simple `curl` command:

```bash
curl -i -F filedata=@./fw.zip http://10.42.42.44/update
```

## Building from Source

For developers who wish to customize the firmware or build it themselves, the project utilizes the `mos` tool. The build process involves a unique patching step where specific files in the Mongoose OS core and rboot modules are replaced with patched versions provided in the repository. This allows for the specific memory mapping and bootloader behavior required to bridge the gap between Tasmota's partition scheme and the standard Mongoose OS layout.

```bash
mos build --build-var BOOT_CONFIG_ADDR=0x7000 --local
# Patch files in deps/ as described in documentation
mos build --build-var BOOT_CONFIG_ADDR=0x7000 --local
```

This project serves as a vital utility for the home automation community, providing a software-only path for device recovery and firmware experimentation on ESP8266 hardware.
