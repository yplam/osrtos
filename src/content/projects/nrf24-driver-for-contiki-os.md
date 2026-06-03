---
title: nRF24 Driver for Contiki-OS
summary: A port of the popular TMRh20 nRF24L01+ radio library for the Contiki-OS operating
  system. It targets the ATmega328p microcontroller and provides a structured driver
  interface for low-power wireless communication within the Contiki environment.
slug: nrf24-driver-for-contiki-os
codeUrl: https://github.com/Vinggui/nRF24-Contiki
siteUrl: http://tmrh20.github.io/RF24/index.html
star: 4
lastUpdated: '2015-03-19'
rtos: contiki-os
topics:
- c
- contiki-os
- driver
- nrf24
- nrf24l01
- radio
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- arduino-rf24-for-mongoose-os
- sx128x-lora-transceiver-driver-for-contiki-ng
- sx127x-lora-transceiver-driver-for-contiki-ng
- kw41z-rf-driver-for-arm-mbed-nanostack
- 6lowpan-ble-bridge
- ant-arduino
---

## Overview

The nRF24-Contiki project provides a dedicated driver for the nRF24L01+ radio module, specifically designed to run within the Contiki-OS environment. While Contiki-OS is well-known for its support of IEEE 802.15.4 radios, this project bridges the gap for developers wishing to use the ubiquitous and low-cost nRF24 series hardware on AVR-based platforms like the ATmega328p.

The driver is essentially a functional port of the widely used [TMRh20 RF24 library](https://github.com/tmrh20/RF24), translated from C++ to standard C to ensure compatibility with Contiki's build system and coding standards. It includes a full platform definition for the Arduino hardware, allowing for easy integration into existing Contiki projects.

## Technical Implementation

The core of the driver consists of three primary files: `nRF24_driver.c`, `nRF24_driver.h`, and `nRF24L01.h`. These are located within the platform directory and handle the low-level SPI communication and register management required by the radio hardware.

To avoid naming collisions with other Contiki components, all functions in this port use the `nRF24_` prefix. For example, the standard initialization is handled via `nRF24_init()` or through the driver structure `nRF24_driver.init()`. 

### Hardware and Clock Support

The project is optimized for the ATmega328p and supports various clock configurations:
- External crystal (8-16MHz)
- Internal RC clock (1MHz, 4MHz, or 8MHz)

This flexibility is particularly useful for low-power applications where reducing the CPU clock speed is necessary to conserve battery life.

## Configuration and Setup

Configuration is handled through defines in the `platform-conf.h` file. This allows developers to specify pin mappings for Chip Enable (CE) and Chip Select (CS), as well as radio parameters like payload size and address width.

```c
/*
 * nRF24 initial configuration example
 */
#define nRF24_CEPIN               9
#define nRF24_CSPIN               10
#define nRF24_PLUS_MODEL          1 // 0 for false, 1 for true
#define nRF24_PAYLOAD             32
#define nRF24_AUTO_PAYLOAD_SIZE   0
#define nRF24_ADRESS_SIZE         5 
```

## Integration with Contiki-OS

Porting this driver to other hardware platforms within Contiki is designed to be straightforward. It primarily requires adjusting the SPI driver and updating the platform-specific Makefiles. The repository includes a modified SPI driver to maintain compatibility with the original library's logic while operating within the Contiki process model.

For deployment, the project supports flashing via standard Arduino bootloaders (like Optiboot) or using ISP programmers like the USBasp. This makes it accessible for both rapid prototyping on Arduino Uno boards and final deployment on custom bare-metal ATmega328p circuits.
