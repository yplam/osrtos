---
title: Zephyr RTOS for DWM1001
summary: A collection of examples and driver adaptations for using Ultra Wideband
  (UWB) and Bluetooth on the DWM1001 module with Zephyr RTOS. It targets the nRF52832-based
  hardware and provides implementations for two-way ranging, low-power listening,
  and UWB transmission.
slug: zephyr-rtos-for-dwm1001
codeUrl: https://github.com/RT-LOC/zephyr-dwm1001
star: 52
lastUpdated: '2019-04-29'
rtos: zephyr
topics:
- decawave
- dwm1001
- localization
- position-tracking
- rtls
- tracking
- zephyr
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zephyr-lorawan-lora-examples
- anjay-zephyr-client
- openhaystack-zephyr-firmware
- zephyr-rtos-driver-for-hc-sr04-ultrasonic-sensor
- zephyr-rtos-lorawan-node
- ruuvitag-firmware-for-zephyr-os
---

## Overview

The Zephyr-DWM1001 project provides a comprehensive suite of examples for developers working with the Decawave (now Qorvo) DWM1001 module. This module is a popular choice for Real-Time Location Systems (RTLS) because it combines a Nordic Semiconductor nRF52832 SoC with a DW1000 Ultra Wideband (UWB) transceiver. By porting Decawave's original driver examples to the Zephyr RTOS environment, this project enables developers to leverage Zephyr's modern build system, hardware abstraction layers, and multi-threading capabilities for UWB applications.

## Key Features

The repository serves as a bridge between the low-level Decawave drivers and the Zephyr ecosystem. It includes a wide variety of functional examples that demonstrate the core capabilities of the DW1000 chip:

- **UWB Transmission and Reception**: Basic examples for sending and receiving frames, including sleep modes and timed transmissions.
- **Two-Way Ranging (TWR)**: Implementations of both Single-Sided (SS-TWR) and Double-Sided (DS-TWR) ranging protocols, which are essential for calculating the distance between two UWB nodes.
- **Advanced UWB Features**: Support for Clear Channel Assessment (CCA), preamble diagnostics, double buffering, and sniffing.
- **Low Power Management**: Examples demonstrating low-power listening and automated sleep cycles to maximize battery life in tag devices.
- **Bluetooth Integration**: Basic BLE examples to utilize the nRF52832's dual-radio capabilities alongside UWB.

## Technical Implementation

The project is structured to work with a specific distribution of Zephyr that includes the DWM1001 Board Support Package (BSP). The application entry point follows standard Zephyr patterns, where the `main.c` file initializes the system and hands off execution to a specialized `dw_main()` function. This structure allows the core logic of the Decawave examples to remain largely intact while benefiting from Zephyr's kernel services.

```c
extern int dw_main(void);

int main(void)
{
  dw_main();

  while(1)
  {}
}
```

## Hardware Support

The primary target for this project is the **DWM1001-DEV** development board. This board integrates the DWM1001 module, which features:
- **nRF52832**: An ARM Cortex-M4 MCU with BLE support.
- **DW1000**: A UWB transceiver compliant with IEEE 802.15.4-2011.
- **LIS3DH**: A 3-axis accelerometer often used for motion-activated location updates.

## Getting Started

Building the firmware requires a standard Zephyr development environment, including CMake, Ninja, and the GNU ARM Embedded toolchain. Unlike many modern Zephyr projects that rely on the `west` tool, this project provides a more direct CMake-based workflow. 

To build an example, such as the simple transmission test, users navigate to the specific example directory and configure the build for the `nrf52_dwm1001` board target:

```bash
cmake -GNinja -DBOARD=nrf52_dwm1001 ..
ninja
```

Flashing is typically performed using Nordic's `nrfjprog` utility, ensuring compatibility with the onboard J-Link debugger found on the DWM1001-DEV.
