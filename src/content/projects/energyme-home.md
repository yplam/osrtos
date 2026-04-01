---
title: EnergyMe-Home
summary: An open-source energy monitoring system built on the ESP32-S3 and ADE7953
  IC, capable of tracking up to 17 circuits. It features a task-based FreeRTOS architecture
  and supports multiple integration protocols including MQTT, Modbus TCP, and InfluxDB.
slug: energyme-home
codeUrl: https://github.com/jibrilsharafi/EnergyMe-Home
siteUrl: https://energyme.net
version: v1.1.3
lastUpdated: '2026-03-02'
licenses:
- GPL-3.0
rtos: freertos
libraries:
- lwip
- spiffs
- littlefs
topics:
- energy
- energymeter
- esp32
- meter
isShow: false
createdAt: '2026-03-31T13:11:03+00:00'
updatedAt: '2026-03-31T13:11:03+00:00'
---

## Comprehensive Home Energy Monitoring

EnergyMe-Home is a sophisticated, open-source energy monitoring solution designed for DIY enthusiasts and makers who require granular visibility into their home's electrical consumption. Unlike standard smart plugs or single-channel meters, EnergyMe-Home is engineered to monitor an entire electrical panel, supporting up to 17 individual circuits simultaneously. This allows users to distinguish between heavy appliances, lighting loads, and general utility usage with high precision.

At the heart of the system is the ESP32-S3 microcontroller, which provides the processing power and wireless connectivity required for real-time data handling. The actual energy measurement is performed by the ADE7953, a high-accuracy energy measurement IC. To achieve its impressive 17-channel capacity, the design employs a hybrid sampling strategy: one main circuit is sampled at high frequency for primary totals, while 16 branch circuits are monitored via multiplexing.

## Hardware and Electrical Compatibility

The project is designed to be globally compatible, supporting various electrical configurations including Single Phase (230V), Split Phase (120V/240V) commonly found in North America, and Three Phase systems. The hardware utilizes 3.3V-compatible current transformers (CTs) with 333 mV outputs, connected via standard 3.5 mm jack connectors for easy, plug-and-play installation.

The hardware design (v5) is fully open-source, with schematics and Bill of Materials (BOM) available for those who wish to build their own units. The project is also hosted on EasyEDA OSHWLab, providing a streamlined path from design files to a finished PCB.

## Software Architecture

The firmware is built using the Arduino framework within the PlatformIO ecosystem, leveraging a task-based architecture powered by FreeRTOS. This ensures that time-critical energy sampling, web server management, and cloud integrations can run concurrently without interference. 

### Key Firmware Features:
- **Web-Based Dashboard**: A built-in web interface allows for real-time monitoring and system configuration without needing external software.
- **Waveform Analyzer**: A unique diagnostic tool that captures high-resolution voltage and current waveforms directly from the web UI.
- **Robust Networking**: Features a captive portal for initial WiFi setup via WiFiManager and mDNS support for easy access via `energyme.local`.
- **Security**: Token-based authentication and password protection ensure that energy data and system settings remain private.
- **Reliability**: The system includes crash recovery mechanisms and firmware rollback capabilities for safe Over-The-Air (OTA) updates.

## Integration and Ecosystem

EnergyMe-Home is built with interoperability in mind. It does not lock users into a proprietary cloud; instead, it offers a wide array of industry-standard integration options:

- **Home Assistant**: A dedicated custom integration allows all 17 channels to appear as native entities within the Home Assistant Energy Dashboard.
- **MQTT & Modbus TCP**: Supports both IoT-standard MQTT and industrial-grade Modbus TCP for integration with SCADA systems or custom automation scripts.
- **REST API**: A fully documented Swagger API enables developers to pull data or change configurations programmatically.
- **InfluxDB**: Native support for InfluxDB (v1.x and v2.x) allows for long-term data storage and advanced visualization in tools like Grafana.

Whether you are looking to optimize your solar self-consumption or simply want to understand where your electricity bill is going, EnergyMe-Home provides the professional-grade tools and open architecture necessary to master your home's energy usage.
