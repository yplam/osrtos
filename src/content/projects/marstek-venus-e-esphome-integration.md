---
title: Marstek Venus E ESPHome Integration
summary: An optimized ESPHome configuration for the Marstek Venus E battery system
  using LilyGO T-CAN485 hardware. It enables high-speed Modbus RS485 monitoring and
  control with significant performance improvements over standard implementations.
  The project provides real-time metrics, energy tracking, and advanced power management
  through Home Assistant integration.
slug: marstek-venus-e-esphome-integration
codeUrl: https://github.com/whyisthisbroken/marstek-lilygo-rs485
star: 10
version: v3_2026
lastUpdated: '2026-01-21'
rtos: freertos
libraries:
- lwip
topics:
- battery-management
- bms
- energy-monitor
- esp32
- esphome
- home-assistant
- iot
- lilygo
- marstek
- modbus
- solar
isShow: false
createdAt: '2026-02-07'
updatedAt: '2026-02-07'
relatedProjects:
- multiple-jk-bms-modbus-rs485-integration
- esphome-deye-inverter
- ginlong-solis-solar-inverter-modbus-integration
- esp32-remote-for-victron
- esphome-tesla-ble
- tasmota-sml-images
---

## Overview

The Marstek Venus E ESPHome project provides a sophisticated integration solution for the Marstek Venus E 5.12 kWh plug-in battery. By leveraging the LilyGO T-CAN485 development board, this configuration allows users to bridge their battery storage system with Home Assistant or a standalone web interface via Modbus RS485. It is designed to replace or augment standard cloud-based monitoring with a local, high-performance alternative.

## High-Performance Monitoring

Unlike standard configurations, this project focuses heavily on performance optimization. It utilizes an event-driven architecture to achieve 3-second response times for critical sensors, such as battery capacity, which is a 40x improvement over traditional polling methods. Through intelligent Modbus register batching, the configuration reduces bus traffic by 57%, consolidating 24 individual requests into just 7 blocks. This efficiency translates to lower CPU load and improved network reliability.

## Key Features and Metrics

The integration exposes a comprehensive suite of sensors and controls that allow for granular management of the energy storage system:

- **Real-time Battery Metrics**: Monitors State of Charge (SOC), voltage, current, and power, including cell-level voltage and temperature monitoring.
- **Runtime Estimation**: Provides dynamic "time-to-full" or "time-to-empty" calculations based on current power flow, helping users plan their energy usage.
- **Energy Tracking**: Records daily, monthly, and lifetime charge/discharge statistics, compatible with the Home Assistant Energy Dashboard.
- **Advanced Control**: Allows users to switch between Manual, Anti-feed, and AI modes, as well as set power limits (0-2500W) and SOC targets (12-100%).
- **Safety Diagnostics**: Includes 24 warning sensors for grid issues, battery protection, and communication status, providing real-time alerts for system health.

## Technical Implementation

The project is built on the ESP-IDF framework for the ESP32, which provides a robust foundation for the ESPHome application. The configuration includes specific `sdkconfig` optimizations for WiFi throughput (AMPDU) and memory management. These tweaks result in a firmware that uses 22-25 KB less RAM and boots significantly faster than standard builds. 

The Modbus controller is configured with a 3-second update interval and utilizes `offline_skip_updates` to maintain stability if the battery becomes temporarily unreachable. The use of the ESP-IDF framework instead of the Arduino core allows for more advanced networking features and better resource utilization on the ESP32.

## Hardware and Connectivity

The primary hardware target is the LilyGO T-CAN485, a specialized ESP32 development board that features an integrated RS485 transceiver. The connection to the Marstek battery is typically handled via a Weipu SP17 5-pin connector. The configuration manages the hardware-specific pins for the RS485 chip enablement and the onboard WS2812 status LED, which provides visual feedback on system health and connectivity through color-coded blinking patterns.

## Home Assistant Integration

For Home Assistant users, the project includes a ready-to-use Lovelace dashboard and custom templates for calculating monthly efficiency and round-trip losses. The device is automatically discovered via the ESPHome API, making the setup process seamless once the initial firmware is flashed. The inclusion of efficiency templates allows users to track energy lost during charge/discharge cycles, which is a vital metric for monitoring long-term battery health.
