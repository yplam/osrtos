---
title: PPPoS Example for Mongoose OS
summary: A demonstration application for Mongoose OS that establishes internet connectivity
  via a GSM modem using the Point-to-Point Protocol over Serial (PPPoS). It targets
  the ESP32 microcontroller and the SIM868 module, utilizing the Mongoose OS PPP library
  for automatic network connection and IP acquisition.
slug: pppos-example-for-mongoose-os
codeUrl: https://github.com/Podnet/pppos-mgos-test
star: 1
lastUpdated: '2020-05-28'
rtos: mongoose-os
topics:
- c
- esp32
- mongoose-os
- ppp
- pppos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- esp32-pppos-client-example
- losant-mqtt-mongoose-os-example
- mbed-os-wifi-sample-with-esp8266
- losant-mqtt-example-for-mongoose-os
- mongoose-os-samples-for-esp32
- mongoose-os-aws-iot-uart-and-thing-shadow-example
---

## Overview

Connecting embedded devices to the internet in remote locations often requires cellular connectivity. This project demonstrates how to implement Point-to-Point Protocol over Serial (PPPoS) using Mongoose OS to bridge an ESP32 microcontroller to the GPRS network via a GSM modem. By leveraging the Mongoose OS PPP library, the application automates the process of connecting to a GPRS network and obtaining an IP address, providing a standard networking interface for the rest of the system.

## Hardware Configuration

The example is specifically designed for the ESP32 Dev Board paired with a SIM868 Module. The SIM868 is a versatile module that provides GSM, GPRS, and GNSS capabilities. 

### UART Interface

Communication between the ESP32 and the SIM868 is handled via UART. While the ESP32 supports multiple UART interfaces, this project typically utilizes UART 1. The default pin mapping for the various UART controllers on the ESP32 in this context is:

- **UART 0**: RX (GPIO 3), TX (GPIO 1)
- **UART 1**: RX (GPIO 25), TX (GPIO 26)
- **UART 2**: RX (GPIO 16), TX (GPIO 17)

### Connection Requirements

Beyond the RX/TX lines, hardware integration requires careful attention to power management. The SIM868 module requires a dedicated power supply; insufficient current during network registration can cause the module to restart repeatedly. Additionally, a common ground must be shared between the ESP32 and the SIM868. 

A specific power-on sequence is implemented using GPIO 15 of the ESP32. By pulling this pin low for four seconds and then high, the ESP32 can programmatically trigger the SIM868 module's power-on sequence via the module's RPi Board GPIO 7 pin.

## Software Implementation

The project is built on Mongoose OS, utilizing its modular library system. The core logic is driven by the `pppos` library, which abstracts the complexities of the PPP state machine and GPRS attachment. 

### Configuration via mos.yml

The system is configured through the `mos.yml` file, which defines the hardware pins, baud rates, and cellular network credentials. Key configuration parameters include:

- `pppos.enable`: Enables the PPP stack.
- `pppos.uart_no`: Specifies which UART controller to use (defaulting to 1).
- `pppos.baud_rate`: Sets the communication speed (defaulting to 9600).
- `pppos.apn`: Defines the Access Point Name for the cellular provider (defaulting to "internet").

These settings are compiled into a C structure, allowing the firmware to access them at runtime while remaining modifiable via the Mongoose OS toolset without requiring a full firmware recompile.

## Key Features

- **Automatic Connectivity**: The PPP library handles the negotiation with the GSM modem and the ISP automatically.
- **Standard Networking**: Once the PPP link is established, standard Mongoose OS networking features (like RPC, HTTP, and MQTT) function as they would over Wi-Fi or Ethernet.
- **Modular Design**: Uses standard Mongoose OS libraries for RPC over UART and configuration management, making it easy to extend for production IoT applications.
