---
title: opensleep
summary: An open-source Rust firmware for the Eight Sleep Pod 3 that replaces the
  proprietary software stack. It enables complete local control, MQTT integration,
  and enhanced privacy by communicating directly with the device's internal microcontrollers.
slug: opensleep
codeUrl: https://github.com/LiamSnow/opensleep
star: 125
version: v2.0.0-beta
lastUpdated: '2025-12-29'
rtos: ''
topics:
- eight-sleep
- linux
- mqtt
- musl
- rust
- sleep
- tokio
- uart
isShow: true
image: /202602/opensleep.webp
createdAt: '2026-02-27'
updatedAt: '2026-02-27'
---

## Overview

opensleep is an open-source firmware replacement for the Eight Sleep Pod 3, written in Rust. It is designed to completely replace the proprietary software stack provided by Eight Sleep, moving control from the cloud to a local environment. By running directly on the device's System-on-Module (SOM), opensleep provides users with total privacy, smart home integration via MQTT, and the ability to implement custom features like advanced temperature profiles and vibration alarms.

## Hardware Architecture

The Eight Sleep Pod 3 architecture consists of a central controller and two specialized subsystems. opensleep acts as the master controller on the SOM, orchestrating communication between these components:

*   **System-On-Module (SOM):** A Variscite i.MX 8M Mini running Yocto Linux. This serves as the host for the opensleep binary.
*   **Sensor Subsystem:** An STM32-based board that manages bed temperature sensors, capacitance sensors for presence detection, piezoelectric sensors for biometric data, and vibration motors for alarms.
*   **Frozen Subsystem:** An STM32F030CCT6 microcontroller that manages the cooling and heating hardware, including thermoelectric coolers (TECs), water pumps, and the water tank level sensors.

opensleep replaces the original three-part software stack (DAC, Frank, and Capybara) with a single Rust application that communicates with these subsystems via USART protocols at 38400 and 115200 baud.

## Key Features

- **Local Control & Privacy:** All sleep data and control logic remain on the local device, removing the dependency on Eight Sleep's servers.
- **MQTT Interface:** Provides a comprehensive MQTT API for monitoring real-time sensor data (temperature, presence, humidity) and controlling device state.
- **Advanced Temperature Management:** Supports custom temperature profiles with unlimited data points, automatically distributed between sleep and wake times.
- **Presence Detection:** Utilizes the hardware's capacitance sensors to detect when users are in bed, exposing this state for home automation.
- **Smart Home Integration:** Designed for seamless use with Home Assistant, allowing the bed to trigger automations or be controlled via standard dashboards.
- **Vibration Alarms:** Configurable vibration patterns and intensities relative to wake times.

## Technical Implementation

The project is built using the Rust programming language, leveraging the `tokio` runtime for asynchronous I/O and task management. It utilizes `linux-embedded-hal` for hardware abstraction and `rumqttc` for robust MQTT communication. Configuration is handled via **RON** (Rusty Object Notation) files, allowing for complex, human-readable settings for both solo and couple modes.

By communicating directly with the STM32 microcontrollers, opensleep gains access to raw sensor data that was previously abstracted or hidden by the stock firmware. This includes high-frequency data from piezoelectric sensors and precise temperature readings from the eight distinct bed sensors.

## Setup and Requirements

Deploying opensleep is a technical process that requires SSH access to the Pod's SOM. This typically involves hardware modification, such as disassembling the unit to access the internal SD card or using specialized tools to gain shell access. Once SSH is established, users can disable the factory services and deploy the opensleep binary and service files.

While currently optimized and tested for the Pod 3, the project provides a foundation for supporting other versions of the hardware. It represents a significant step forward for users seeking to own their hardware and data in the smart furniture space.
