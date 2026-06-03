---
title: Zigbee Gas Counter
summary: A DIY Zigbee-enabled gas meter built on the ESP32-C6 using the ESP-IDF framework.
  It tracks real-time gas consumption and flow rates, integrating with Zigbee2MQTT
  and Home Assistant for energy management. The device features battery optimization,
  non-volatile storage for data persistence, and OTA firmware updates.
slug: zigbee-gas-counter
codeUrl: https://github.com/IgnacioHR/ZigbeeGasCounter
siteUrl: https://community.home-assistant.io/t/zigbee-gas-counter/833557
star: 26
lastUpdated: '2026-01-11'
rtos: freertos
libraries:
- lwip
topics:
- counter
- esp32
- gas
- hardware
- zigbee
- zigbee-board
- zigbee2mqtt
isShow: true
image: /202601/small_gas_counter.webp
createdAt: '2026-01-16'
updatedAt: '2026-01-16'
relatedProjects:
- q-sensor-multi-functional-zigbee-air-quality-sensor
- energy-consumption-monitor
- smart-iot-sensor-with-xiao-esp32c6
- lixee-box
- everblu-cyble-enhanced-rf-meter-reader
- energyme-home
---

The Zigbee Gas Counter is a specialized DIY IoT solution designed to bring smart metering capabilities to traditional gas meters. Built around the powerful ESP32-C6 microcontroller, this project addresses the common gap in the market for reliable, battery-operated Zigbee gas monitoring devices. By leveraging the low-power capabilities of the ESP32-C6 and the Zigbee protocol, it provides a robust alternative to modified door sensors or Wi-Fi-based solutions that often suffer from short battery life or data loss during network outages.

### How It Works

The system operates on a simple yet effective principle: pulse detection. Most residential gas meters feature a rotating wheel with an integrated magnet. By placing a magnetic reed switch near this wheel, the device can detect each full rotation, which corresponds to a specific volume of gas (typically measured in cubic meters). The ESP32-C6 processes these pulses to maintain a cumulative consumption counter and calculate the instantaneous flow rate in m³/h.

### Key Features and Capabilities

One of the standout features of this project is its focus on reliability and data integrity. Unlike simpler sensors that might lose count if the gateway goes offline, this device maintains an internal counter stored in Non-Volatile Storage (NVS). This ensures that even after a reboot or a period of network instability, the consumption data remains accurate.

**Core capabilities include:**
- **Real-time Tracking**: Monitors both total consumption (m³) and current demand (m³/h).
- **Battery Optimization**: Designed for long-term battery operation with support for sleep modes and voltage monitoring.
- **Dual Battery Connector**: Allows for battery replacement without interrupting the counting process.
- **Rich User Interface**: A single physical button supports multiple gestures (single click, double click, hold) for tasks like forcing reports, restarting the device, or re-commissioning the Zigbee network.
- **OTA Updates**: Supports Over-the-Air firmware updates, allowing for remote improvements and bug fixes.

### Technical Implementation

The project is developed using the Espressif IoT Development Framework (ESP-IDF) and the ESP Zigbee SDK. It utilizes standard Zigbee clusters, such as `seMetering`, to ensure compatibility with popular smart home platforms. To overcome specific integration challenges with Home Assistant, the developer also implemented an analog input cluster to report flow rates where standard gas power units might not yet be fully supported.

The software architecture is designed to be efficient, using FreeRTOS tasks to manage pulse counting, Zigbee communication, and power management. The device is configured to wake up from sleep either when gas consumption is detected or periodically to send status reports to the Zigbee coordinator. The use of the RISC-V based ESP32-C6 provides the necessary radio support for Zigbee 3.0 while maintaining a low power profile suitable for 2S LiPo battery operation.

### Integration and Ecosystem

The Zigbee Gas Counter is designed to fit seamlessly into an existing Zigbee2MQTT and Home Assistant ecosystem. By providing a custom external converter for Zigbee2MQTT, the device exposes all its attributes—including battery percentage, voltage, and gas metrics—directly to the user's dashboard. This enables advanced energy management, historical analysis, and automation within the smart home environment.
