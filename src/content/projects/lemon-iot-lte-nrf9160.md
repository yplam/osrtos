---
title: Lemon IoT LTE nRF9160 Board Support
summary: Official support files and examples for the Lemon IoT LTE nRF9160 board,
  powered by the Nordic nRF9160 SiP. It includes Zephyr RTOS board definitions, device
  tree configurations, and sample applications for cellular IoT development.
slug: lemon-iot-lte-nrf9160
codeUrl: https://github.com/aaron-mohtar-co/Lemon-IoT-LTE-nRF9160
siteUrl: https://lemon-iot.com/index.php/product/lemon-iot-lte-cat-m1-nb-iot-nrf9160-board/
star: 4
lastUpdated: '2024-03-30'
rtos: zephyr
topics:
- cat-m1
- cat-nb1
- device-tree-overlay
- devicetree
- i2c
- iot
- iot-platform
- lemon-iot
- nrf9160
- shtc3
- spi
- zephyr
isShow: false
createdAt: '2025-12-27'
updatedAt: '2025-12-29'
relatedProjects:
- zephyr-lorawan-lora-examples
- anjay-zephyr-client
- nicenano-and-nrf52-supermini-platformio-support
- fctc-art-pi-code-iot-from-chip-to-cloud
- nrf52840-m-2-developer-kit
- zephyr-lvgl-sample-for-nrf52840-mdk
---

The Lemon IoT LTE nRF9160 is a specialized development platform designed for low-power cellular IoT applications. At its core is the Nordic Semiconductor nRF9160 System-in-Package (SiP), which integrates an ARM Cortex-M33 application processor with a full LTE-M/NB-IoT modem and GNSS capabilities. This repository serves as the central hub for board support files, documentation, and example projects required to develop firmware for the hardware using the Zephyr RTOS and the nRF Connect SDK.

### Hardware and Connectivity

The board is built around the nRF9160, making it a powerful choice for asset tracking, smart city infrastructure, and industrial IoT. By leveraging the integrated modem, developers can connect devices to cellular networks globally using power-efficient protocols. The board design exposes various peripherals, including GPIOs, I2C, SPI, and UART, allowing for extensive sensor integration.

### Zephyr RTOS Integration

To facilitate development, the project provides dedicated board definition files for the Zephyr RTOS. These files define the hardware layout, including the device tree (DTS) and pin multiplexing. Users can target two specific configurations:

- **Lemon IoT NRF9160**: The standard target for secure applications.
- **Lemon IoT NRF9160 non-secure**: Used for applications running in the non-secure partition, which is common when utilizing the nRF9160's TrustZone features.

The repository includes instructions on how to integrate these board files into the nRF Connect SDK environment, ensuring that the hardware is correctly recognized during the build process.

### Peripheral Configuration and Flexibility

One of the strengths of the nRF9160 is its flexible serial communication peripherals. The Lemon IoT board pre-allocates the first serial peripheral to UART (`&uart0`). However, the system allows for additional buses like I2C or SPI to be added dynamically using DeviceTree overlays. This approach gives developers the flexibility to allocate I/O pins based on their specific project requirements without modifying the core board files.

### Programming and Bootloading

For developers who do not have access to dedicated ARM programmers like a Segger J-Link or a Nordic Development Kit, the board comes with a pre-installed serial bootloader. This allows for firmware updates and programming over a standard serial connection, significantly lowering the barrier to entry for new developers. Information regarding the bootloader configuration and usage is provided within the project structure.

### Examples and Getting Started

The repository includes several practical examples to help users get up and running quickly. These include:

- **I2C Sensor Example**: Demonstrates how to interface with external sensors using the I2C protocol.
- **SPI Sensor Example**: Shows the configuration and usage of the SPI bus for high-speed peripheral communication.

Beyond these specific examples, the board is fully compatible with the extensive library of samples provided by both the Zephyr Project and the Nordic nRF Connect SDK, covering everything from basic GPIO toggling to complex cloud connectivity via MQTT or CoAP.
