---
title: Sonoff Basic Firmware for openHAB
summary: A specialized Mongoose OS firmware for the Sonoff Basic smart switch, designed
  for seamless integration with openHAB via MQTT. It supports the Homie Convention
  for auto-discovery and includes features like local scheduling, energy consumption
  analysis, and a web-based WiFi configuration interface.
slug: sonoff-basic-firmware-for-openhab
codeUrl: https://github.com/mongoose-os-apps/sonoff-basic-openhab
siteUrl: https://mongoose-os.com/
star: 22
version: ddd
lastUpdated: '2020-02-28'
rtos: mongoose-os
topics:
- esp32
- esp8266
- iot
- mongoose-os
- openhab
- sonoff
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- sonoff-http-firmware
- openhasp-firmware
- mongoose-os-configurable-sensor-node
- dtugateway-for-hoymiles-hms-inverters
- heidelbridge
- mitsubishi-ecodan-air-to-water-bridge-for-cn105-to-mqtt
---

## Overview

This project provides a robust, feature-rich firmware for the Sonoff Basic smart switch, a popular ESP8266-based relay from iTead Studio. Built on Mongoose OS, the firmware is specifically optimized to work with openHAB 2.4 or newer using the MQTT binding. It transforms the Sonoff Basic into a highly capable IoT device that can operate both as part of a centralized home automation system and as a standalone smart switch with local intelligence.

## Key Features

The firmware goes beyond simple relay toggling, offering several advanced capabilities designed for real-world home automation scenarios:

- **Connectivity Indicators**: Uses the onboard LED with specific blink patterns to indicate the current connection status.
- **Local Intelligence**: Includes a device-local schedule timer and a countdown timer. These allow the switch to perform actions even if the connection to the openHAB server is lost.
- **Energy Analysis**: Features a switch ON duration counter, providing data necessary for energy consumption analysis within openHAB.
- **Night Mode**: A configurable mode to turn off the status LED during specific hours to avoid light pollution in bedrooms.
- **Manual Overrides**: The onboard button remains functional for manual toggling, with built-in bounce protection and a factory reset mechanism (holding for 5 seconds).
- **Web Configuration**: A built-in web interface allows users to set up WiFi credentials without needing to reflash the device or use a serial console.

## Configuration and Discovery

One of the standout aspects of this firmware is its support for two distinct implementation paths:

1. **Homie Convention**: By following the Homie MQTT convention, the device supports auto-discovery. When connected to openHAB, Things, Channels, and Items are automatically configured, significantly reducing manual setup time.
2. **Manual Configuration**: For users who prefer granular control or have specific MQTT topic requirements, the firmware supports manual configuration via text files.

## Technical Implementation

The project is built for the ESP8266 platform, specifically targeting devices with 1MB of flash memory like the Sonoff Basic. It leverages the Mongoose OS ecosystem, utilizing libraries for MQTT communication, RPC services, SNTP time synchronization, and the mJS JavaScript engine for high-level logic.

### Local Scheduling

Local schedules are managed via a `schedules.json` file uploaded to the device filesystem. This allows the device to maintain its routine regardless of network availability. Users can set their specific timezone via the `timer.tz` configuration variable to ensure accurate execution.

```bash
# Example: Setting timezone for California (DST)
mos config-set timer.tz=-0700
```

### Night Mode Configuration

Night mode can be configured via the Mongoose OS command-line tool (`mos`), allowing users to define start and end times for the LED suppression:

```bash
# Set night mode from 23:00 to 06:30
mos config-set nm.enable=true nm.bh=23 nm.bm=0 nm.eh=6 nm.em=30
```

## Hardware Support

The firmware is tailored for the Sonoff Basic hardware. Because these devices typically have limited flash (1MB), the build process and flash parameters are specifically tuned (using `dout` mode and 8m flash frequency) to ensure stability and performance within those constraints.
