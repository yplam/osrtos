---
title: Multiple JK-BMS Modbus RS485 Integration
summary: A comprehensive integration for Jikong (JK) Battery Management Systems using
  ESPHome and Modbus RS485. It enables monitoring and control of multiple battery
  packs via ESP32 hardware, specifically designed for Home Assistant ecosystems.
slug: multiple-jk-bms-modbus-rs485-integration
codeUrl: https://github.com/phinix-org/Multiple-JK-BMS-by-Modbus-RS485
siteUrl: https://ha.picoides.io/
star: 13
lastUpdated: '2025-09-06'
rtos: freertos
topics:
- esphome
- esphome-component
- hass
- home-assistant
- jikong-bms
- jk-bms
- modbus
- rs485
isShow: false
createdAt: '2026-01-26'
updatedAt: '2026-01-26'
relatedProjects:
- marstek-venus-e-esphome-integration
- ginlong-solis-solar-inverter-modbus-integration
- esphome-modbus-tcp-to-rtu-bridge
- esphome-deye-inverter
- esphome-flexit-modbus-server
- m5stack-esphome-integrations
---

## Overview

The Multiple JK-BMS Modbus RS485 integration provides a robust solution for monitoring and managing Jikong (JK) Battery Management Systems (BMS) through ESPHome. This project is specifically designed to handle the complexities of multi-device setups, allowing users to aggregate data from up to 16 BMS units connected via a Modbus RS485 bus. By leveraging the ESP32 platform, it bridges the gap between high-power battery hardware and the Home Assistant automation platform.

## Principle of Operation

The integration utilizes the communication ports available on JK-BMS boards, specifically targeting UART1 and UART2. The system distinguishes between different operating modes based on the device address:

- **Master Mode**: When the device address is set to 0x00 via physical switches, the BMS operates in a master mode, polling slaves every 15 seconds.
- **Slave Mode**: For addresses 0x01 through 0x0F, the BMS acts as a Modbus slave, responding to requests from an external master like an ESP32.

The project supports a wide array of protocols, including the JK BMS RS485 Modbus V1.0 and various CAN protocols for inverter communication, such as those used by Victron, Deye, and Pylontech.

## Hardware Requirements

To implement this integration, an ESP32 device with at least 320KB RAM and 4MB Flash is required, paired with an RS485 adapter. Recommended hardware includes boards with integrated RS485 support, such as the LILYGO T-CAN485 or the KAmodESP32 POW RS485. These devices handle the physical signaling required to communicate with the BMS communication board ports (RJ45 or specialized connectors).

## Technical Implementation and ESPHome Configuration

The project provides a modular ESPHome configuration using YAML. Because a single JK-BMS can expose over 320 entities, the configuration is organized into subdirectories (sensors, binary_sensors, switches, etc.) to maintain readability and performance. 

One of the significant technical hurdles addressed in this project is ESPHome's handling of 8-bit (half-length) Modbus registers. Since ESPHome typically expects 16-bit registers, this integration uses a template-based approach. Values are read into sensors, combined or masked as necessary, and then written back to the 16-bit or 32-bit registers using custom lambda functions. This ensures that bit-level switches and packed registers are updated correctly without corrupting adjacent data.

## Supported Registers and Monitoring

The integration supports an extensive register map, covering:
- **Cell Data**: Individual cell voltages (up to 32 cells), average voltage, and resistance.
- **Protection Settings**: Overvoltage, undervoltage, and over-temperature protection thresholds.
- **Real-time Status**: Battery current, SOC (State of Charge), SOH (State of Health), and cycle counts.
- **Control Switches**: Charging, discharging, and balancing toggles.
- **System Information**: Manufacturer ID, hardware/software versions, and uptime.

## Getting Started

Users begin by configuring their ESP32 using the provided `lilygo-jk0.yaml` example. This involves setting up the UART bus, Modbus controller, and including the relevant register modules. The project emphasizes the importance of unique module names and BMS addresses when operating multiple units on a shared bus. Due to the high volume of data transmission, the authors recommend using one ESP32 per BMS for optimal stability, although a single bus configuration is theoretically possible.
