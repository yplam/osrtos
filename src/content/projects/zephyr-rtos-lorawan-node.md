---
title: Zephyr RTOS LoRaWAN Node
summary: A sample project for a Class A TTN LoRaWAN node built on Zephyr RTOS. It
  targets STM32-based boards like the Blackpill F411CE and Black F407VE, utilizing
  the Zephyr LoRaWAN stack and SX12xx radio drivers for connectivity to The Things
  Network.
slug: zephyr-rtos-lorawan-node
codeUrl: https://github.com/fcgdam/zLorawan_Node
siteUrl: https://primalcortex.wordpress.com/2020/11/17/a-zephyr-rtos-based-ttn-lorawan-node/
star: 8
lastUpdated: '2022-09-20'
rtos: zephyr
topics:
- lora
- lorawan
- lorawan-node
- stm32
- stm32f4
- ttn
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zephyr-lorawan-lora-examples
- zephyr-stm32-spi-example
- mender-ota-example-for-stm32l4-and-zephyr-rtos
- zephyr-webusb-sample-for-stm32
- gnss-lorawan-tracker
- lorawan-test-app-for-apache-nuttx
---

## Overview

The Zephyr RTOS LoRaWAN Node project provides a reference implementation for a Class A LoRaWAN device designed to connect to The Things Network (TTN). Built on the Zephyr RTOS, this project demonstrates how to leverage the RTOS's built-in LoRaWAN stack and hardware abstraction layers to create a functional IoT node with minimal custom code.

The project is specifically tested on popular STM32 development boards, including the Blackpill F411CE and the Black F407VE. It serves as a practical starting point for developers looking to integrate LoRaWAN connectivity into their Zephyr-based embedded applications.

## Technical Implementation

The project utilizes the native Zephyr LoRaWAN subsystem, which provides a high-level API for managing the LoRa radio and network join procedures. The configuration is handled through Zephyr's Kconfig system (`prj.conf`), where essential modules such as GPIO, SPI, and the LoRaWAN stack are enabled. 

Key configurations include:
- **LoRaWAN Stack**: Enabled via `CONFIG_LORAWAN=y`.
- **Radio Driver**: Support for SX12xx series radios (e.g., SX1276).
- **Region Support**: Configured for the EU868 region by default.
- **USB Console**: Includes support for USB CDC ACM to provide a serial console for debugging on boards like the Blackpill.

## Hardware and Connectivity

While the code is tested on specific STM32 boards, the use of Zephyr's hardware abstraction layer makes it portable to other architectures supported by Zephyr. The node is designed to operate as a Class A device, which is the most power-efficient LoRaWAN class, suitable for battery-powered sensors that primarily send data upstream.

To connect to The Things Network, the project uses Over-the-Air Activation (OTAA). Users must configure their specific TTN keys within the source code, including:
- **DEV_EUI**: Device EUI
- **JOIN_EUI**: Application EUI
- **APP_KEY**: Application Key

## Getting Started

The project follows the standard Zephyr development workflow using the `west` meta-tool. After configuring the necessary OTAA keys in `src/main.c`, the project can be built and flashed using simple commands:

```bash
# Build for Blackpill F411CE
west build -b blackpill_f411ce -p

# Flash using OpenOCD
west flash --runner openocd
```

Upon startup, the onboard LED provides visual feedback: rapid flashing indicates a window for the user to connect to the serial console, while slower flashing indicates that the LoRaWAN joining process and application logic are active. In its current state, the firmware is configured to join the network and send a single data frame, demonstrating a successful end-to-end connection.
