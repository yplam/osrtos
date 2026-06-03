---
title: Sentrius MG100 Gateway Firmware
summary: A Zephyr RTOS-based firmware for the Laird Connectivity Sentrius MG100 Gateway.
  It integrates Bluetooth 5 and LTE-M/NB-IoT connectivity using the Nordic nRF52840
  and Sierra Wireless HL7800, featuring local SD card logging and cloud reporting
  via AWS or LwM2M.
slug: sentrius-mg100-gateway-firmware
codeUrl: https://github.com/LairdCP/MG100_firmware
siteUrl: https://www.lairdconnect.com/iot-devices/iot-gateways/sentrius-mg100-gateway-lte-mnb-iot-and-bluetooth-5
star: 3
version: v3.0.2
lastUpdated: '2023-03-06'
rtos: zephyr
topics:
- firmware
- lte
- lwm2m
- nb-iot
- sensor-data
- support-lte
- zephyr
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- golioth-zephyr-sdk
- pinnacle-100-out-of-box-demo-manifest
- golioth-firmware-sdk
- ruuvitag-firmware-for-zephyr-os
- mongoose-os
- lilygo-higrow-esp32-plant-monitoring-sensor-firmware-hardware-v1
---

# Sentrius MG100 Gateway Firmware

The Sentrius MG100 Gateway is a powerful, out-of-the-box IoT solution designed to bridge Bluetooth 5 sensors with global cellular networks. Built upon Laird Connectivity's Pinnacle 100 modem, the MG100 integrates the Nordic Semiconductor nRF52840 SoC and the Sierra Wireless HL7800 module. This combination enables a wide array of wireless capabilities, including LTE-M, NB-IoT, and advanced Bluetooth 5 features like CODED PHY and LE Advertising Extensions.

The firmware for the MG100 is built on the Zephyr RTOS, providing a robust and scalable foundation for industrial IoT applications. It is designed to ensure that sensor data is captured and reported reliably, even in challenging network conditions.

## Core Functionality and Modes

The MG100 firmware supports two primary operational modes, which are determined at compile time:

- **LTE-M and AWS**: This is the default configuration, designed for high-reliability cellular data transmission to Amazon Web Services. It leverages the LTE-M standard to provide a balance of range, power efficiency, and data throughput.
- **NB-IoT and LwM2M**: For deployments requiring the extreme low-power and deep-penetration capabilities of NB-IoT, the firmware can be configured to communicate using the Lightweight M2M (LwM2M) protocol.

## Hardware Integration and Resiliency

A key feature of the MG100 is its focus on data persistence. The gateway includes an SD card slot used for local data logging. If the cellular connection (LTE-M or NB-IoT) is interrupted, the device continues to capture and store sensor data locally, ensuring no information is lost. Once connectivity is restored, the logged data can be transmitted to the cloud.

The hardware also supports an optional battery backup. This ensures that the gateway remains operational and continues reporting even if the primary power source fails, making it suitable for critical monitoring applications.

## Development and Ecosystem

The MG100 firmware is part of the Zephyr RTOS ecosystem. Because it relies on a specific set of dependencies and kernel configurations, the project uses a manifest-based cloning process. Developers are encouraged to use the `MG100_firmware_manifest` repository to set up their environment correctly using the Zephyr `west` tool.

The project includes comprehensive support for modern Bluetooth profiles, allowing it to interface seamlessly with mobile applications for configuration and data visualization.

## Maintenance and Updates

Laird Connectivity has designed the MG100 with a clear path for lifecycle management. While early units (v2.0.0 and earlier) required physical access via Serial Wire Debug (SWD) for updates, all units running version 3.x or later support flexible firmware update mechanisms. These include updates over UART, Bluetooth Low Energy (BLE), or directly over the cellular LTE link, allowing for remote maintenance of deployed gateways.

*Note: For new designs, Laird Connectivity recommends transitioning to the Pinnacle 100 Firmware or the Canvas-based firmware manifest, as the MG100 firmware repository is primarily maintained for existing deployments.*
