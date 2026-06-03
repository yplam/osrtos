---
title: ESPHome Deye Inverter
summary: An ESPHome-based integration for monitoring and controlling Deye photovoltaic
  inverters via Modbus RTU. It targets ESP32 microcontrollers using the ESP-IDF framework
  to provide real-time data visualization and control within Home Assistant.
slug: esphome-deye-inverter
codeUrl: https://github.com/Lewa-Reka/esphome-deye-inverter
star: 41
version: v0.9.4
lastUpdated: '2025-11-30'
rtos: freertos
topics:
- deye
- deye-inverter
- deyesun
- esp-project-package
- esp32
- esphome
- home-assistant
- homeassistant
- homeassistant-integration
- modbus
- photovoltaic
- sg04lp3
isShow: false
createdAt: '2026-01-17'
updatedAt: '2026-01-17'
relatedProjects:
- ginlong-solis-solar-inverter-modbus-integration
- dtugateway-for-hoymiles-hms-inverters
- marstek-venus-e-esphome-integration
- esp32-remote-for-victron
- esphome-modbus-tcp-to-rtu-bridge
- multiple-jk-bms-modbus-rs485-integration
---

The ESPHome Deye Inverter project provides a robust, open-source solution for integrating Deye photovoltaic inverters into the Home Assistant ecosystem. By leveraging the ESPHome framework and Modbus RTU communication, this project enables users to bypass proprietary cloud loggers and gain direct, local control over their solar power systems.

### Core Functionality and Monitoring

The integration offers comprehensive monitoring of the inverter's operational state. Users can track real-time data including PV power generation, battery state of charge (SoC), voltage, and current, as well as grid consumption and load requirements. Beyond simple monitoring, the project supports active control of the inverter. This includes adjusting maximum battery charge and discharge currents, switching between different system work modes (such as "Zero Export To Load" or "Selling First"), and managing solar sell settings.

### Hardware and Connectivity

The system is designed to run on ESP32 microcontrollers, specifically utilizing the ESP-IDF framework for stable performance. Communication with the Deye inverter is established via a Modbus RTU connection, typically requiring an RS485 to TTL converter. The project provides specific configuration files for various Deye models, including:

- **Deye SG0XHP3**: High-voltage three-phase hybrid inverters.
- **Deye SG0XLP1**: Low-voltage single-phase hybrid inverters.
- **Deye SG0XLP3**: Low-voltage three-phase hybrid inverters.

### Safety and Reliability

A key feature of this implementation is the inclusion of safety mechanisms. The configuration includes "Safe Mode" parameters that define a transition delay and default operating values. If communication with the control system is lost, the inverter can automatically revert to safe default parameters, such as a predefined maximum battery charge current or specific work modes, preventing potential equipment damage or unsafe operating conditions.

### Home Assistant Integration

The project is optimized for Home Assistant, providing a seamless data flow that can be used with advanced visualization tools. It is specifically designed to work with the Sunsynk Power Flow Card, allowing for an elegant and intuitive display of energy flow within the home. This includes modern, compact, and wide styles to suit different dashboard layouts, supporting complex setups like dual-battery configurations.

### Modular Configuration

The project utilizes ESPHome's package system, allowing for a clean and modular configuration. Users can import the core logic directly from the GitHub repository while maintaining their specific hardware pins and local secrets (like WiFi credentials) in a separate, minimal YAML file. This structure simplifies updates and allows the community to contribute improvements to the shared logic while users keep their site-specific settings intact.
