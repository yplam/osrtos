---
title: rp2040-dmxsun
summary: A modular DMX-512-A toolbox and USB interface built on the Raspberry Pi RP2040
  microcontroller. It supports up to 16 DMX universes via USB-CDC NCM networking,
  ArtNet, and E1.31/sACN, featuring a modular hardware design and an integrated web-based
  configuration portal.
slug: rp2040-dmxsun
codeUrl: https://github.com/OpenLightingProject/rp2040-dmxsun
star: 121
version: v1.0.0
lastUpdated: '2024-11-28'
rtos: ''
libraries:
- lwip
- u8g2
topics:
- artnet
- dmx
- dmx512
- kicad
- lighting-control
- lwip
- pcb
- raspberry-pi-pico
- rp2040
- rpi-pico
- tinyusb
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rgblight-iot-rgb-led-controller
- midi2piousbhub
- arcus
- arduino-pico
- pico-usb-blaster
- d21ecm-usb-cdc-ecm-for-samd21
---

## Overview

The rp2040-dmxsun is a sophisticated DMX-512-A toolbox designed for stage lighting control. At its core, it leverages the power and flexibility of the Raspberry Pi RP2040 microcontroller to bridge the gap between computer-based lighting software and physical lighting fixtures. Unlike simple USB-to-DMX adapters, dmxsun is a high-density solution capable of handling up to 16 DMX universes, totaling 8,192 control slots.

One of the project's most innovative features is its approach to connectivity. When connected to a host computer via USB, the device emulates a network card using the CDC NCM interface. An integrated DHCP server automatically assigns an IP address to the host, allowing the user to interact with the device as if it were a standard network node. This architecture enables the use of professional lighting protocols like ArtNet and E1.31 (sACN) over a simple USB cable, while also providing a built-in web server for status monitoring and configuration.

## Modular Hardware Design

The hardware is designed with modularity as a primary goal. The system consists of a base board that hosts the Raspberry Pi Pico and eight RGB status LEDs for immediate visual feedback. Users can expand the system by attaching up to four IO boards, each equipped with RS-485 drivers and XLR connectors. 

This modularity allows for scalable configurations, ranging from a simple single-port interface to a 16-port 1U rack-mounted powerhouse. Configuration data is handled intelligently; the system can store settings on the IO boards themselves or fall back to the Pico's internal flash memory. This ensures that the device can operate standalone or in various hardware combinations without losing its patch settings or network identity.

## Network Integration and Wireless Capabilities

By utilizing the lwIP stack, dmxsun provides a robust networking environment. Users can browse to the device's IP address to access a modern React-based web interface. This interface allows for real-time monitoring of DMX values and configuration of the internal patching system. 

Beyond wired connections, dmxsun supports wireless DMX through the integration of nRF24 radio modules. This allows for the transmission or reception of up to four universes wirelessly between dmxsun devices, facilitating flexible stage setups without the need for extensive cabling. The project even includes plans for mesh networking to extend the wireless range in challenging environments.

## Technical Implementation

The project makes extensive use of the RP2040's unique hardware features. Specifically, it utilizes the Programmable I/O (PIO) blocks to handle the precise timing required for DMX-512-A transmission across multiple ports simultaneously. This offloads the timing-critical tasks from the main CPU cores, ensuring stable DMX output even when the web server or network stack is under load.

The firmware is built using the Raspberry Pi Pico SDK (v1.5.0) and incorporates several specialized libraries:
- **lwIP**: Manages the networking stack for CDC NCM and ArtNet/sACN.
- **u8g2**: Provides support for OLED displays.
- **Pico-DMX**: Handles the low-level DMX protocol logic.
- **React**: Powers the integrated Web UI, which is compressed and stored in the microcontroller's flash using a custom build process.

## Getting Started

For those looking to experiment without building the full hardware, the project can be flashed onto a standard Raspberry Pi Pico. While this won't provide physical DMX ports without additional RS-485 drivers, it allows users to explore the web interface and verify network connectivity. The build process requires CMake and the Pico SDK, along with Node.js for compiling the web assets. Once built, the resulting `.uf2` file can be dragged and dropped onto the Pico in bootloader mode.
