---
title: LoRa Test App for Semtech SX1262 and Apache NuttX
summary: A test application for the Semtech SX1262 LoRa transceiver running on the
  Apache NuttX RTOS. It provides functionality for initializing the radio driver,
  reading registers, and performing basic PING/PONG message exchanges. The project
  supports hardware platforms like BL602 and ESP32.
slug: lora-test-app-for-semtech-sx1262-and-apache-nuttx
codeUrl: https://github.com/lupyuen/sx1262_test
siteUrl: https://lupyuen.github.io/articles/sx1262
star: 2
lastUpdated: '2022-04-26'
rtos: nuttx
topics:
- bl602
- bl604
- lora
- nuttx
- pinecone
- pinedio
- riscv32
- sx1262
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lorawan-test-app-for-apache-nuttx
- rust-test-app-for-apache-nuttx-os
- lvgl-test-app-for-apache-nuttx
- bl602-adc-and-temperature-sensor-test-app
- tinycbor-test-app-for-apache-nuttx
- zephyr-lorawan-lora-examples
---

## Overview

The LoRa Test App for Semtech SX1262 is a demonstration and testing utility designed for the Apache NuttX RTOS. It serves as a practical implementation for developers looking to integrate LoRa wireless communication into their NuttX-based embedded systems. The application focuses on the Semtech SX1262 transceiver, a popular choice for long-range, low-power IoT connectivity.

## Key Features

This application provides a structured way to verify LoRa hardware and driver integration. Its primary capabilities include:

- **Driver Initialization**: Sets up the SPI communication and initializes the SX1262 radio driver within the NuttX environment.
- **Register Access**: Includes utility functions to read and print internal SX1262 registers, which is essential for hardware debugging and verifying SPI connectivity.
- **LoRa PING/PONG**: Implements a standard PING/PONG communication flow, allowing two devices to exchange messages and verify bidirectional wireless links.
- **Configurable Parameters**: Supports regional frequency bands (such as 923 MHz for Singapore, 868 MHz for Europe, or 915 MHz for North America) and adjustable LoRa parameters like spreading factor, bandwidth, and coding rate.

## Technical Implementation

The project is built as a standard NuttX application, utilizing the `Kconfig` and `Makefile` system for seamless integration into the NuttX build process. It targets modern microcontrollers such as the BL602 (RISC-V) and ESP32.

The core logic resides in `sx1262_test_main.c`, which interacts with the radio through a structured event-driven API. The application defines several callback functions to handle asynchronous radio events:

- `on_tx_done`: Triggered when a message has been successfully transmitted.
- `on_rx_done`: Triggered when a LoRa packet is received, providing the payload, RSSI (Signal Strength), and SNR (Signal-to-Noise Ratio).
- `on_rx_timeout` and `on_rx_error`: Handle communication failures gracefully.

### Example Configuration

Developers can configure the LoRa transceiver settings directly in the source code or via the NuttX menuconfig system. Below is a snippet showing how the radio is initialized with specific LoRa parameters:

```c
// Configure the LoRa Transceiver for transmitting messages
Radio.SetTxConfig(
    MODEM_LORA,
    LORAPING_TX_OUTPUT_POWER,
    0,        // Frequency deviation: Unused with LoRa
    LORAPING_BANDWIDTH,
    LORAPING_SPREADING_FACTOR,
    LORAPING_CODINGRATE,
    LORAPING_PREAMBLE_LENGTH,
    LORAPING_FIX_LENGTH_PAYLOAD_ON,
    true,     // CRC enabled
    0,        // Frequency hopping disabled
    0,        // Hop period: N/A
    LORAPING_IQ_INVERSION_ON,
    LORAPING_TX_TIMEOUT_MS
);
```

## Getting Started

To use this application, it should be added as a submodule within the `apps/examples` directory of a NuttX project. After updating the build configuration, the application can be enabled via `make menuconfig` under `Application Configuration > Examples`. 

The project is particularly useful for developers working with the BL602 or ESP32 who need a reliable starting point for LoRaWAN or point-to-point LoRa development on a real-time operating system.
