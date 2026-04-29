---
title: Genius Gateway
summary: An ESP32-based gateway for Hekatron Genius Plus X smoke detectors, enabling
  integration with modern smart home systems via MQTT and WebSocket. It features a
  custom PCB design with a CC1101 transceiver and a web-based management interface
  built on SvelteKit.
slug: genius-gateway
codeUrl: https://github.com/hmbacher/genius-gateway
siteUrl: https://hmbacher.github.io/genius-gateway/
version: v1.2.1
lastUpdated: '2026-04-21'
licenses:
- NOASSERTION
image: /202604/genius-gateway_0.avif
rtos: freertos
topics:
- 868mhz
- arduino
- cc1101
- esp-idf
- esp32
- home-assistant
- mqtt
- smarthome
- sveltekit
- wifi
isShow: true
createdAt: '2026-04-29T23:39:46+00:00'
updatedAt: '2026-04-29T23:39:46+00:00'
---

The Genius Gateway is a specialized bridge designed to bring the Hekatron Genius Plus X smoke detection system into the modern smart home era. While Hekatron devices are renowned for their reliability in fire safety, they traditionally operate within a closed ecosystem. Integration with popular home automation platforms usually requires proprietary gateways with limited protocol support. This project provides a reverse-engineered alternative that opens up these devices to standard protocols like MQTT, HTTP, and WebSockets.

## Bridging the Gap in Fire Safety

The primary motivation behind the Genius Gateway is the lack of extensible integration options for Hekatron's FM Basis X radio modules. In a standard installation, these detectors communicate effectively with each other but remain isolated from broader monitoring systems. By reverse-engineering the RF communication protocol, the Genius Gateway allows users to capture, visualize, and act upon fire alarm signals within their own self-hosted infrastructure, such as Home Assistant.

## Hardware Architecture

The gateway is built around the ESP32-S3 microcontroller, specifically utilizing the Seeed Studio XIAO ESP32-S3 module for its compact form factor and integrated WiFi. To interface with the smoke detectors' 868 MHz RF signals, the project uses a CC1101 sub-GHz transceiver module. 

While the project can be assembled on a breadboard for experimental purposes, it includes a professionally designed custom PCB. This hardware design features:
- Integrated RF matching for the 868 MHz band.
- Dual antenna support (2.4 GHz for WiFi and 868 MHz for the Hekatron network).
- Support for external power supplies (12 VDC).
- An enclosure-friendly layout compatible with standard industrial cases.

## Software and Framework

The firmware is developed using the Arduino framework and ESP-IDF, leveraging the FreeRTOS kernel inherent to the ESP32 platform. It utilizes the ESP32-SvelteKit framework to deliver a high-performance web interface. This architecture allows the frontend—built with SvelteKit, TypeScript, and TailwindCSS—to be hosted directly on the ESP32, providing a responsive dashboard without the need for an external web server.

Key software components include:
- **PsychicHttp**: An asynchronous web server for handling API requests and the web interface.
- **PsychicMqttClient**: For reliable communication with smart home brokers.
- **ArduinoJson**: For parsing complex configuration and packet data.

## Key Features and Capabilities

One of the most impressive aspects of the Genius Gateway is its **Packet Visualizer**. This tool allows users to see RF communication in real-time, which is invaluable for debugging and understanding the topology of the smoke detector network. 

### Device and Alarm Management
Users can manage a grid of registered smoke detectors, tracking their location, serial numbers, production dates, and alarm history. The interface provides clear visual states, turning red and displaying fire icons during active alerts. 

### Alarm Blocking and Propagation
To handle false alarms or testing scenarios, the gateway includes an "Alarm Blocking" feature. This allows users to silence or prevent alarm propagation for a specified period (up to 600 seconds), providing a controlled way to manage the system during maintenance or investigation.

### Smart Home Integration
The gateway is designed for seamless integration. It publishes status updates and alarm events to MQTT topics, making it easy to trigger automations in Home Assistant or other platforms. It also supports a WebSocket API for real-time event streaming and a RESTful HTTP API for remote management.

## Safety and Compliance

As this is a reverse-engineered project dealing with life-safety equipment, it comes with significant disclaimers. It is not affiliated with Hekatron, and users are responsible for ensuring their setup complies with local fire safety regulations. The software is licensed under AGPL-3.0 with a Commons Clause, prohibiting commercial use without explicit permission, while the hardware designs are shared under CC BY-NC-SA 4.0.
