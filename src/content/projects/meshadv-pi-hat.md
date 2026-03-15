---
title: MeshAdv Pi Hat
summary: A high-power 1 Watt LoRa expansion board for Raspberry Pi designed for use
  with the Linux-native Meshtastic daemon. It features an Ebyte E22 LoRa module, integrated
  GPS support, and I2C breakouts, making it ideal for permanent base stations or router
  nodes.
slug: meshadv-pi-hat
codeUrl: https://github.com/chrismyers2000/MeshAdv-Pi-Hat
star: 164
version: V1.1
lastUpdated: '2025-07-28'
rtos: ''
topics:
- gps
- linux-native
- long-range
- lora
- mesh
- mesh-networks
- meshtastic
- meshtastic-repeater
- meshtasticd
- raspberry-pi
- raspberrypi
isShow: true
image: /202603/meshadv-pi-hat.webp
createdAt: '2026-03-15'
updatedAt: '2026-03-15'
---

## Overview

The MeshAdv Pi Hat is a specialized hardware expansion board designed to transform a Raspberry Pi into a powerful Meshtastic node. Unlike standard low-power LoRa modules, this hat utilizes a 1 Watt Ebyte E22 module, providing significantly increased range and penetration for mesh networking. It is specifically tailored for the Linux-native version of Meshtastic, known as `meshtasticd`, allowing users to leverage the full processing power and connectivity of the Raspberry Pi platform.

## Key Features and Capabilities

The board is engineered for reliability and long-term deployment, particularly as a "Base Station" or "Router" node. By using a Raspberry Pi as the host, users can mount the node in high, remote locations and manage it entirely over a network via SSH or MQTT, eliminating the need for physical access to update firmware or change configurations.

**Core hardware features include:**
- **High-Power LoRa:** Support for 1W Ebyte E22-900M30S/M33S (SX1262) or E22-400M30S/M33S (SX1268) modules.
- **Integrated GPS Support:** Dedicated space for an ATGM336H GPS module with PPS (Pulse Per Second) routing for precise timekeeping.
- **I2C Breakout:** Easy expansion for sensors or displays via the I2C bus.
- **Flexible Powering:** Designed to work seamlessly with separate POE adapters for single-cable installations.
- **Wide Compatibility:** Supports almost the entire Raspberry Pi family with a 40-pin header, from the Zero and Zero 2 W to the Raspberry Pi 4 and 5.

## Technical Implementation

The MeshAdv Pi Hat interfaces with the Raspberry Pi through the standard 40-pin GPIO header. It utilizes the SPI bus for LoRa communication and UART for GPS data. A critical safety feature of the design is the requirement for a connected antenna during operation; powering the 1W E22 module without a load can lead to hardware damage.

### Pin Mapping

The hardware uses a specific GPIO layout to interface with the Linux environment:
- **LoRa SPI:** MOSI (GPIO 10), MISO (GPIO 9), CLK (GPIO 11), NSS (GPIO 21)
- **LoRa Control:** RST (GPIO 18), BUSY (GPIO 20), IRQ (GPIO 16), TXEN (GPIO 13), RXEN (GPIO 12)
- **GPS UART:** TX (GPIO 14), RX (GPIO 15), PPS (GPIO 23)
- **I2C:** SDA (GPIO 2), SCL (GPIO 3)

## Software Configuration

Setting up the MeshAdv Pi Hat involves configuring the `meshtasticd` service on Raspberry Pi OS. The configuration is handled via a YAML file, where users define the specific LoRa module pins and GPS paths. 

```yaml
Lora:
  Module: sx1262
  CS: 21
  IRQ: 16
  Busy: 20
  Reset: 18
  TXen: 13
  RXen: 12
  DIO3_TCXO_VOLTAGE: true

GPS:
  SerialPath: /dev/ttyS0

I2C:
  I2CDevice: /dev/i2c-1
```

For users who prefer a more automated setup, the project creator provides a configuration tool to streamline the installation of the Meshtastic daemon and the necessary environment settings. This makes the MeshAdv Pi Hat an accessible yet professional-grade solution for building robust, long-range mesh communication infrastructure.
