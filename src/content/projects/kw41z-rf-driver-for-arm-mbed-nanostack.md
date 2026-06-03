---
title: KW41Z RF Driver for ARM mbed Nanostack
summary: An RF driver for NXP KW41Z and KW21Z 802.15.4 wireless microcontrollers,
  specifically designed for the ARM mbed Nanostack. It enables 6LoWPAN mesh networking
  and is compatible with the FRDM-KW41Z development platform.
slug: kw41z-rf-driver-for-arm-mbed-nanostack
codeUrl: https://github.com/istepura/kw41z-rf-driver
star: 1
lastUpdated: '2017-07-23'
rtos: mbed-os
topics:
- 6lowpan
- driver
- kinetis
- kw41z
- mbed
- mbed-os
- nanostack
- nxp
- rf-driver
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- sx128x-lora-transceiver-driver-for-contiki-ng
- nrf24-driver-for-contiki-os
- sx127x-lora-transceiver-driver-for-contiki-ng
- bitcraze-crazyflie-2-0-2-1-mbed-os-firmware
- x-cube-subg2-firmware-package
- avnet-wnc14a2a-cellular-driver
---

## Overview

The kw41z-rf-driver is a specialized hardware abstraction layer designed to interface NXP's KW41Z and KW21Z wireless microcontrollers with the ARM mbed Nanostack. This driver provides the necessary low-level hooks for the 802.15.4 radio hardware, allowing the Nanostack to manage 6LoWPAN communication and mesh networking protocols.

Targeting the NXP Kinetis KW41Z family—which features an ARM Cortex-M0+ core and an integrated 2.4 GHz transceiver—this driver is essential for developers building low-power wireless sensor networks. It bridges the gap between the raw radio hardware and the high-level networking services provided by the mbed ecosystem.

## Key Features and Capabilities

- **802.15.4 Support**: Implements the driver interface required for IEEE 802.15.4 wireless communication.
- **Nanostack Integration**: Specifically tailored for use with the ARM Nanostack, supporting complex networking topologies like 6LoWPAN mesh.
- **Hardware Compatibility**: Optimized for the NXP FRDM-KW41Z development board, a popular platform for Thread and Zigbee development.
- **Mesh Networking**: Validated for use with `mbed-os-example-mesh-minimal` and `nanostack-border-router`, enabling the creation of functional mesh networks and internet gateways.

## Technical Implementation

The project is structured as an mbed-os compatible module. It includes a `module.json` file that defines its dependencies on core mbed drivers and Nanostack service libraries. A key configuration aspect is found in `mbed_lib.json`, which allows developers to configure parameters such as the long MAC address for the device.

While the driver is currently in an early stage of development, it has demonstrated the ability to establish mesh connectivity between multiple FRDM-KW41Z boards. This makes it a viable starting point for developers looking to implement custom 802.15.4 solutions on NXP hardware within the mbed environment.

## Getting Started

To use this driver, it should be included as a dependency in an mbed-os project. It is typically used in conjunction with the Nanostack library to provide the physical layer (PHY) implementation. Developers can configure the driver through the standard mbed configuration system, specifically managing the EUI-64 (long MAC address) settings required for 802.15.4 identification.

For those building border routers or mesh nodes, this driver serves as the critical link that allows the Nanostack to send and receive packets over the air using the KW41Z's internal radio peripheral.
