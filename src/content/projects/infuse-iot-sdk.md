---
title: Infuse-IoT SDK
summary: The Infuse-IoT SDK is a modular development framework built on the Zephyr
  RTOS, designed for creating ultra-low-power IoT solutions. It provides specialized
  subsystems for time-series data logging, task scheduling, and secure communication,
  primarily targeting Nordic Semiconductor and STMicroelectronics hardware.
slug: infuse-iot-sdk
codeUrl: https://github.com/Embeint/infuse-sdk
siteUrl: https://www.embeint.com/
lastUpdated: '2026-04-23'
licenses:
- NOASSERTION
rtos: zephyr
libraries:
- mcuboot
topics:
- iot
- zephyr
isShow: false
createdAt: '2026-04-26T02:26:13+00:00'
updatedAt: '2026-04-26T02:26:13+00:00'
---

## Simplifying Ultra-Low-Power IoT Development

Developing robust, power-efficient Internet of Things (IoT) devices often requires balancing complex networking stacks with aggressive power management and secure firmware update mechanisms. The Infuse-IoT SDK is designed to streamline this process by providing a comprehensive, modular stack built on top of the Zephyr RTOS. By leveraging Zephyr's hardware abstraction and modularity, Infuse-IoT adds a layer of high-level services that handle the common challenges of IoT deployment, from data persistence to remote management.

At its core, Infuse-IoT is more than just a collection of drivers; it is an integrated ecosystem that includes embedded software, cloud APIs, and desktop tools. This architecture allows developers to focus on application logic while the SDK manages the underlying complexities of secure communication, power optimization, and device telemetry.

## A Modular Architecture Built on Zephyr

The choice of the Zephyr Project as the foundational RTOS provides the Infuse-IoT SDK with a modern, scalable environment. The SDK organizes its functionality into several key subsystems:

*   **Task Runner:** A sophisticated execution engine that manages and schedules background tasks. It utilizes Zephyr’s Zbus for inter-process communication and the standard Poll API to ensure efficient, event-driven task iteration.
*   **Data Logger & TDF:** The SDK features a size-optimized time-series data logging system (TDF). This allows devices to store sensor data locally or transmit it over constrained links using efficient encoding, with support for various backends including flash memory, SD cards (exFAT), and wireless interfaces.
*   **ePacket Communication:** A modular framework for handling, filtering, and forwarding data packets across physical interfaces like Bluetooth, UDP, and serial ports. It supports optional cryptographic operations to ensure data integrity and confidentiality.
*   **Remote Procedure Call (RPC):** The platform includes a built-in RPC server and client, enabling remote command execution and state queries, which is essential for cloud-to-device interaction and local debugging.

## Advanced Firmware Management

One of the standout features of the Infuse-IoT SDK is its approach to Device Firmware Updates (DFU). In addition to standard image management via MCUboot, the SDK supports **cpatch**, a constrained binary patching library. This allows for binary diff application image upgrades, significantly reducing the amount of data that needs to be transmitted over the air—a critical requirement for devices operating on cellular (LTE-M/NB-IoT) or other low-bandwidth networks.

Security is integrated throughout the stack. The SDK provides extended support for **Trusted Firmware-M (TF-M)** and utilizes Mbed TLS for cryptographic operations. It also includes specialized logic for handling hardware unique keys and automated network security key generation.

## Hardware Support and Ecosystem

The SDK is heavily optimized for the Nordic Semiconductor ecosystem, providing first-class support for the nRF52, nRF53, nRF91 (LTE), and the latest nRF54L series. It also supports STMicroelectronics STM32L4x and STM32WBx5 SoCs. 

To simplify the build process, Infuse-IoT uses the Zephyr "Snippet" system. By applying the `infuse` snippet during a build, developers can automatically configure upstream boards with the necessary parameters for ePacket communication, data logging instances, and low-power operation. This ensures that even custom hardware can quickly adopt the full suite of Infuse-IoT features.

## Observability and Tooling

Beyond the firmware, the SDK integrates with the **Memfault** observability platform, providing automated reporting of device metrics, hardware versions, and error traces. This integration is vital for maintaining fleet health post-deployment. For local interaction, the Infuse-IoT Python Tools provide a CLI for interacting with the Cloud REST API and observing local devices via Bluetooth, making it easier to script automated tests and manage devices during development.
