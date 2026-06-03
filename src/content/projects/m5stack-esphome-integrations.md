---
title: M5Stack ESPHome Integrations
summary: A collection of ESPHome configuration files and external components specifically
  designed for M5Stack hardware. It provides ready-to-use YAML templates for devices
  like the CoreS3, Atom EchoS3R, and PowerHub, utilizing the ESP-IDF framework for
  Home Assistant integration.
slug: m5stack-esphome-integrations
codeUrl: https://github.com/m5stack/esphome-yaml
siteUrl: https://docs.m5stack.com/en/homeassistant/overview
star: 20
lastUpdated: '2026-01-23'
rtos: freertos
libraries:
- platformio-platformio-core
topics:
- esp-idf
- esp32
- esphome
- firmware
- homeassistant
isShow: true
image: /202601/Atom_EchoS3R_01.webp
createdAt: '2026-01-24'
updatedAt: '2026-01-24'
relatedProjects:
- esphome-components-for-miot-devices
- micropython-kitchen-sink-for-m5stack
- esp32-p4-home-assistant-display
- esp32-repo
- openhasp-firmware
- homey-smart-home-controllers
---

## Overview

The M5Stack ESPHome Integrations repository provides a comprehensive suite of configuration files and external components designed to bridge M5Stack hardware with the Home Assistant ecosystem. By leveraging ESPHome, this project allows users to deploy sophisticated firmware to M5Stack devices using simple YAML-based configurations, eliminating the need for complex C++ coding while maintaining high performance through the ESP-IDF framework.

## Supported Hardware and Features

This project covers a wide range of M5Stack's product lineup, focusing on voice assistants, environmental monitoring, and power management. Key supported devices include:

- **Voice Assistants**: Configurations for the Atom EchoS3R and CoreS3, enabling local voice control within Home Assistant.
- **Environmental Sensing**: Support for the PM2.5 Air Quality Kit-SHT30, providing real-time air quality data.
- **Power Management**: The PowerHub integration offers advanced monitoring of battery voltage, current, and charging status, along with control over various power ports (USB, Grove, RS485, and CAN).
- **Imaging and HMI**: Support for the Unit PoE CAM-W and the Tab5 Home Assistant HMI for visual feedback and control interfaces.

## Technical Implementation

The configurations in this repository are built upon the ESP-IDF framework rather than the standard Arduino core, offering better stability and access to advanced ESP32-S3 features. Many devices utilize custom external components, such as the `powerhub` component, which handles complex I2C communication with power management ICs and RTCs internally.

### Example: PowerHub Configuration

The PowerHub example demonstrates the depth of integration available. It manages multiple power rails and provides telemetry for every port:

```yaml
esp32:
  board: esp32-s3-devkitc-1
  framework:
    type: esp-idf

external_components:
  - source: github://m5stack/esphome-yaml/components
    components: powerhub

sensor:
  - platform: powerhub
    battery_voltage:
      name: "Battery Voltage"
    grove_red_current:
      name: "Port.A Current"
```

This setup allows Home Assistant to monitor the power consumption of individual sensors or actuators connected to the M5Stack PowerHub, while also managing the battery lifecycle.

## Integration and Extensibility

Beyond simple sensor reporting, these integrations include support for:
- **Native API with Encryption**: Secure communication with Home Assistant.
- **Over-the-Air (OTA) Updates**: Easy firmware maintenance without physical access to the device.
- **Captive Portal**: Simplified WiFi provisioning for new devices.
- **Custom Lighting Effects**: Integrated RGB LED control for status indication, such as battery level visualization or charging pulses.

By providing these templates, M5Stack enables developers to quickly prototype and deploy industrial-grade IoT solutions that are fully integrated into a centralized smart home or building management system.
