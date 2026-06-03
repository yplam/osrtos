---
title: thingBot-SubGHz
summary: A hardware platform and Contiki OS port based on the TI CC1310 SoC, designed
  for sub-GHz wireless IoT applications. It features an ARM Cortex-M3 core, IEEE 802.15.4g-compliant
  radio operation, and a suite of on-board sensors for environmental monitoring.
slug: thingbot-subghz
codeUrl: https://github.com/automote/thingBot-SubGig
star: 7
lastUpdated: '2017-01-28'
rtos: contiki-os
topics:
- cc1310
- contiki
- contiki-os
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- 6lbr-on-telecontrolli-devices-x-ip4t-x-ip5
- low-power-wireless-networking-for-iot-lpiot
- tinycore-esp32-s3-learning-platform
- hail-iot-development-module
- 6lowpan-ble-bridge
- atmega128rfa1-tinyos-kth-wsn-project
---

## Overview

The thingBot-SubGHz is a specialized hardware platform built around the Texas Instruments CC1310 System on Chip (SoC). Designed for ultra-low power wireless applications, it leverages the ARM Cortex-M3 architecture running at 32 MHz to provide a balance of processing power and energy efficiency. The platform is specifically tailored for the Contiki OS ecosystem, providing a robust foundation for sub-GHz networking in the 868 MHz band.

## Hardware Architecture

At the heart of the thingBot-SubGHz is the TI CC1310, which integrates 128 kbytes of Flash and 20 kbytes of RAM. The board is designed to be XBee-compatible, allowing it to interface with a wide range of existing hardware ecosystems. It includes several integrated peripherals and sensors that make it an ideal candidate for industrial and environmental monitoring:

- **Wireless Connectivity**: Support for CC13xx proprietary mode and IEEE 802.15.4g-compliant sub-GHz operation.
- **On-board Sensors**: Integrated sensors for temperature, humidity, and ambient light.
- **Power Management**: Deep sleep support with RAM retention and an ultra-low-power sensor controller for autonomous data collection.
- **Security**: A dedicated cryptoprocessor supporting AES (up to 256-bit) and SHA-256.
- **Expansion**: Standard interfaces including UART, dual SPI, I2C, and 8-channel ADC.

## Contiki OS Integration

The project provides a dedicated port for Contiki OS, specifically targeting the CC13xx/CC26xx CPU framework. This integration allows developers to utilize Contiki's mature networking stack, including IPv6, RPL (Routing Protocol for Low-Power and Lossy Networks), and 6LoWPAN. The port supports standard Contiki features such as the Coffee file system and the rtimer/clock infrastructure underpinned by the CC1310's hardware timers.

## Development and Deployment

Developing for the thingBot-SubGHz typically involves the GNU Tools for ARM Embedded Processors. The project is compatible with standard Contiki examples, such as the RPL border router, web servers, and CoAP (Constrained Application Protocol) implementations. 

Firmware can be uploaded to the nodes over a serial connection using the `cc2538-bsl` script. The board features a 10-pin c-JTAG connector for debugging and programming. For initial setup, the platform can be flashed using the SmartRF06 Evaluation Board (EB) or directly via the serial bootloader. 

### Building the Demo

A simple demo application is provided to showcase the platform's features, including sensor readings and radio functionality. To compile for this target, developers can use the following command structure:

```bash
make TARGET=srf06-cc26xx BOARD=srf06/cc13xx cc26xx-demo.upload PORT=/dev/ttyUSB1
```

This command builds the firmware and utilizes the serial bootloader to flash the device. The platform's flexibility is further enhanced by its ability to route any digital peripheral pin to any GPIO, allowing for significant customization in hardware interfacing.
