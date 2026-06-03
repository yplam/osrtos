---
title: pyMC Repeater
summary: A lightweight LoRa mesh repeater daemon written in Python for Raspberry Pi-class
  hardware. It utilizes the pymc_core library to provide packet routing, neighbor
  discovery, and real-time monitoring via a built-in web dashboard.
slug: pymc-repeater
codeUrl: https://github.com/rightup/pyMC_Repeater
siteUrl: https://rightup.github.io/pyMC_core/
star: 83
version: 1.0.5
lastUpdated: '2025-12-30'
rtos: ''
libraries:
- sqlite
topics:
- lora
- meshcore
- pymc-core
- repeater
- sx1262
isShow: false
createdAt: '2026-01-27'
updatedAt: '2026-01-27'
relatedProjects:
- meshcore-hub
- streampulse
- meshtnc
- meshadv-pi-hat
- wifimanager-rp2040w-lite
- meshcore-mqtt-gateway
---

## Overview

pyMC_repeater is a dedicated repeater daemon designed to run continuously as a background process on low-power, Linux-based hardware like the Raspberry Pi. Built using the `pymc_core` library, it serves as a critical node in a LoRa mesh network, forwarding packets and extending the reach of the MeshCore ecosystem. 

The project was born out of a desire to understand the inner workings of MeshCore and has evolved into a lightweight, modular solution for users looking to deploy reliable repeaters in real-world environments. Unlike heavy frameworks, pyMC_repeater uses CherryPy for its web interface and simple polling mechanisms to maintain low resource consumption while ensuring high reliability on single-board computers.

## Hardware Support

The project is designed to work out-of-the-box with several popular LoRa hardware configurations for the Raspberry Pi platform:

- **Waveshare LoRaWAN/GNSS HAT (SPI Version):** Supports 868MHz and 915MHz frequencies using the SX1262 radio.
- **HackerGadgets uConsole:** Compatible with the Clockwork uConsole (CM4/CM5) using SPI1.
- **Frequency Labs meshadv & meshadv-mini:** Specialized HATs designed for mesh networking with integrated TX/RX enable pins and TCXO support.

## Key Features

- **Dispatcher & Packet Routing:** Leverages `pymc_core` to handle complex LoRa packet routing and flood policies.
- **Web Dashboard:** Includes a real-time monitoring interface for tracking packet statistics, neighbor discovery, and system health.
- **MQTT Integration:** Optional support for publishing mesh data to an MQTT broker for external logging or integration with home automation systems.
- **Adaptive Delays:** Features score-based transmission filtering and adaptive delays to optimize network airtime.
- **Duty Cycle Enforcement:** Includes configurable airtime limits to ensure compliance with local radio regulations.
- **Automated Setup:** Provides an interactive configuration wizard (`setup-radio-config.sh`) to simplify the process of mapping GPIO pins and radio parameters.

## Technical Architecture

The daemon is structured to be hackable and clear. It avoids the complexity of WebSockets in favor of a robust polling architecture, making it less prone to connection drops in unstable environments. The storage backend utilizes SQLite and RRD (Round Robin Database) for persistent data retention, allowing for long-term performance metrics without filling up the SD card.

Configuration is managed through a central `config.yaml` file, which defines everything from radio parameters (frequency, spreading factor, bandwidth) to hardware-specific GPIO mappings for Busy, Reset, and IRQ pins. This modularity allows the same software to run across diverse hardware targets by simply swapping the configuration profile.

## Getting Started

Deploying a repeater involves enabling the SPI interface on the Raspberry Pi and running the provided management script. The `manage.sh` tool handles the creation of a dedicated service user, directory structures, and the installation of the systemd service. Once running, the repeater can be managed via a web browser at port 8000, providing immediate visibility into the local mesh neighborhood.
