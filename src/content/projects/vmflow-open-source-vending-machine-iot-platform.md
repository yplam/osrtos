---
title: VMflow — Open-Source Vending Machine IoT Platform
summary: An ESP32-S3 based platform that enables MDB protocol communication for vending
  machine cashless payments and remote telemetry. It features support for EVA DTS
  DEX/DDCMP standards, Bluetooth connectivity via NimBLE, and integrated foot traffic
  analysis using a PAX counter.
slug: vmflow-open-source-vending-machine-iot-platform
codeUrl: https://github.com/nodestark/mdb-esp32-cashless
siteUrl: https://vmflow.xyz
version: v1.1.0
lastUpdated: '2026-04-01'
licenses:
- MIT
image: /202604/mdb-esp32-cashless_1.avif
rtos: freertos
libraries:
- nimble
topics:
- esp32
- iot
- protocol-mdb
- vending-machine
isShow: true
createdAt: '2026-04-01T23:47:37+00:00'
updatedAt: '2026-04-01T23:47:37+00:00'
---

VMflow is an open-source IoT platform designed to modernize vending machine management. By leveraging the ESP32 platform, it transforms traditional vending machines into connected, cashless, and remotely managed devices. The project provides a bridge between the machine's internal protocols and modern cloud services, allowing for real-time monitoring and advanced payment integrations.


## Core Features and Capabilities

The platform is built around the Multi-Drop Bus (MDB) protocol, which is the standard for communication between vending machine controllers and peripheral devices like coin changers and cashless payment terminals. VMflow implements this protocol to facilitate both telemetry collection and cashless transactions.

Key technical capabilities include:
- **MDB Protocol Implementation**: Enables seamless communication with the vending machine's main controller for processing payments and reporting status.
- **Hardware Flexibility**: Built on the ESP32-S3, providing robust Wi-Fi and Bluetooth capabilities. The hardware design is open-source, created in KiCad to allow for easy customization and production.
- **DEX/DDCMP Support**: Implements the European Vending Association Data Transfer Standard (EVA DTS), which is essential for remote monitoring and auditing of machine inventory and sales data.
- **PAX Counter**: A unique feature that detects nearby mobile devices to estimate foot traffic. This data is reported anonymously to help operators understand location performance and peak hours.


## Technical Architecture

The repository is divided into two primary firmware implementations: a master and a slave mode for the ESP32-S3. This dual approach allows the hardware to either act as the main controller or as a peripheral device depending on the deployment needs. The software stack relies on the ESP-IDF framework (v5.x), utilizing FreeRTOS for task management and NimBLE for efficient Bluetooth Low Energy communication.

For connectivity, the system integrates with a web dashboard for centralized management. This interface provides real-time insights into sales data, device health, and operational metrics collected from across the machine network.

## Management and Integration

VMflow uses a modern backend stack involving Supabase and MQTT for device management. Operators can interact with their machines programmatically through a REST API to perform various tasks:

1.  **Remote Credit**: Sending credits to a machine over MQTT to facilitate remote refunds or promotional sales.
2.  **Sales Monitoring**: Retrieving real-time sales logs to track revenue and inventory.
3.  **Device Status**: Monitoring the connection state and telemetry of all embedded units in the field.
4.  **Metric Analysis**: Accessing PAX counter data to visualize presence metrics and heatmaps.


By combining specialized vending protocols with modern web technologies, VMflow provides a comprehensive toolkit for operators looking to upgrade their fleet with IoT capabilities without relying on closed-source, proprietary hardware.
