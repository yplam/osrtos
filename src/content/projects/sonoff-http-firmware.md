---
title: Sonoff HTTP Firmware
summary: An alternative firmware for ITEAD Sonoff Wi-Fi smart switches based on Mongoose
  OS. It features an embedded web server with an HTTP API and a web interface for
  remote power toggling on ESP8266-based hardware.
slug: sonoff-http-firmware
codeUrl: https://github.com/OllieDay/sonoff-http
siteUrl: https://mongoose-os.com/
star: 4
lastUpdated: '2018-07-11'
rtos: mongoose-os
topics:
- c
- esp8266
- firmware
- iot
- mongoose-os
- sonoff
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- sonoff-basic-firmware-for-openhab
- esp8266-wifi-relay
- mongoose-to-tasmota-home-accessory-architect-or-espurna
- mongoose-os-configurable-sensor-node
- esp8266-home-automation
- cloudhome-firmware
---

## Overview

The `sonoff-http` project provides a streamlined, alternative firmware for the popular ITEAD Sonoff Wi-Fi Remote Control Smart Switch. Built on the Mongoose OS framework, this firmware transforms the Sonoff device into a controllable IoT node with a built-in web server, offering both a user-friendly web interface and a programmatic HTTP API.

## Why Mongoose OS?

By leveraging Mongoose OS, the firmware benefits from a robust IoT-centric operating system that simplifies Wi-Fi configuration and provides a stable environment for embedded web services. The project uses the `mos` toolchain for building and flashing, making the deployment process consistent with other Mongoose OS-based applications. This choice of RTOS ensures that the device can handle network communication and GPIO state management efficiently.

## Hardware Integration

The firmware is designed specifically for the ESP8266-based Sonoff hardware. To install it, users must interact with the device's internal GPIO pins. The project documentation provides a clear mapping for connecting a 3.3V FTDI module to the Sonoff's header (3.3V, RX, TX, GND). 

**Safety Note:** A critical safety warning is emphasized: the device must never be connected to an AC power source while the case is open or during the flashing process. The 3.3V FTDI module provides the necessary power for the ESP8266 during programming.

## HTTP API and Web Interface

Once flashed and connected to a Wi-Fi network, the Sonoff device hosts a simple web page (`index.html`) featuring a toggle switch. This allows for manual control from any browser on the local network. For automation and integration with other systems, the firmware exposes a straightforward HTTP API:

### GET /sonoff
Retrieve the device state. Returns `200 OK` on success with the response body containing either `0` for off or `1` for on.

```bash
curl http://<address>/sonoff
```

### POST /sonoff
Set the device state. The raw request body should contain either `0` for off or `1` for on. Returns `200 OK` on success.

```bash
curl -X POST -H "Content-Type: text/plain" -d <power> http://<address>/sonoff
```

This simplicity allows the Sonoff to be easily integrated into home automation scripts, Node-RED flows, or third-party dashboards using standard HTTP requests.

## Getting Started

The workflow involves installing the `mos` toolchain, building the firmware locally, and flashing it via the FTDI interface while the device is in bootloader mode (triggered by holding the onboard power button during power-up). Wi-Fi credentials are then configured using the `mos wifi` command, after which the device is ready for standalone operation on the local network. Users can identify the device's IP address through their router's client list to begin interacting with the web interface.
