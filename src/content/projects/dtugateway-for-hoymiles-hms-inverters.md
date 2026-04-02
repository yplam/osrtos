---
title: dtuGateway for Hoymiles HMS Inverters
summary: dtuGateway is an ESP32-based firmware that bridges Hoymiles HMS-series solar
  inverters with integrated Wi-Fi to smart home ecosystems. It provides reliable data
  monitoring and remote control via MQTT, REST API, and openHAB, bypassing the limitations
  of the official cloud interface. The project supports various local displays and
  features a captive portal for easy configuration.
slug: dtugateway-for-hoymiles-hms-inverters
codeUrl: https://github.com/ohAnd/dtuGateway
version: v2.3.0018
lastUpdated: '2025-09-13'
licenses:
- Apache-2.0
image: /202604/dtuGateway_0.avif
rtos: freertos
libraries:
- nanopb
- tft-espi
- u8g2
topics:
- arduino
- embedded
- esp32
- esp8266
- hoymiles
- oled-128x64
- oled-display-ssh1106
- protobuf
- tft-240x240
- tft-display-gc9a01
isShow: true
createdAt: '2026-04-02T03:39:25+00:00'
updatedAt: '2026-04-02T03:39:25+00:00'
---

## Bridging the Gap for Hoymiles Solar Systems

For owners of Hoymiles HMS-series solar inverters with integrated Wi-Fi, accessing real-time data can often be a frustrating experience. The official cloud interface is frequently cited as unstable, and the lack of a documented local API makes integration with smart home platforms like Home Assistant or openHAB difficult. The **dtuGateway** project solves this by turning an affordable ESP32 microcontroller into a dedicated local bridge. 

By communicating directly with the inverter's internal DTU (Data Transfer Unit), dtuGateway provides a rock-solid connection that bypasses the cloud entirely. This ensures that solar production data is always available, even if the manufacturer's servers are down or the internet connection is interrupted.

## Technical Architecture and Integration

Built primarily for the ESP32 platform, the firmware leverages several robust libraries to handle its diverse feature set. It uses **Nanopb** for efficient Protocol Buffer serialization, which is essential for communicating with the Hoymiles hardware. Data is then exposed through multiple channels:

*   **MQTT with Auto-Discovery**: For Home Assistant users, the gateway automatically populates sensors for grid power, PV panel metrics, and inverter temperature.
*   **openHAB REST API**: Direct integration allows for automatic item creation and state updates.
*   **JSON REST API**: A local web endpoint provides real-time data in a structured format for custom dashboards or scripts.
*   **OpenDTU Compatibility**: For users migrating from other tools, the project includes a mode that mimics the OpenDTU MQTT topic structure, making it a drop-in replacement.

## Hardware Support and Visual Feedback

The project targets the **Hoymiles HMS-xxxW-2T** series (such as the HMS-800W-2T and HMS-600W-2T). It is important to note that this gateway is designed specifically for models with *integrated* Wi-Fi, rather than those requiring external DTU-Lite or DTU-Pro sticks.

Beyond just background data processing, dtuGateway supports local visual monitoring. Users can attach various displays to the ESP32, including:
*   **1.3" OLED (SSH1106)**: Provides a high-contrast summary of power output, energy yield, and system health.
*   **1.28" Round TFT (GC9A01)**: Offers a more modern aesthetic with analog-style gauges, night modes, and backlight control.

## Configuration and Ease of Use

One of the standout features of dtuGateway is its focus on user experience. The firmware includes a universal captive portal. Upon first boot, the ESP32 creates a Wi-Fi access point; connecting to it automatically triggers a configuration page on most smartphones and laptops. This allows users to set up their home Wi-Fi credentials and the inverter's IP address without ever touching a line of code or a serial terminal.

For advanced users, the gateway offers remote control capabilities. Through MQTT or the web interface, users can set power limits (0-100%) or trigger remote reboots of the inverter and DTU. The system also includes intelligent connection management, which can detect weak signals and automatically attempt recovery to ensure data continuity.

## Developer Workflow

The project is actively maintained using **PlatformIO** and features a fully automated build environment via GitHub Actions. This allows for a two-tier release system: "Stable" builds for production use and "Snapshot" builds for those who want to test the latest features, such as improved device diagnostics or new display layouts. 

Whether you are looking to optimize your self-consumption or simply want to keep a closer eye on your solar production, dtuGateway transforms a closed hardware ecosystem into a transparent, smart-home-ready powerhouse.
