---
title: NogasmLink
summary: An intelligent arousal management system for ESP32 that connects to Lovense
  devices via Bluetooth LE. It uses a pressure sensor for automated edging control
  and features a real-time web dashboard for monitoring and configuration.
slug: nogasmlink
codeUrl: https://github.com/sgrljess/nogasm-link
star: 13
lastUpdated: '2025-06-06'
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- littlefs
- spiffs
topics:
- ble
- edging
- esp32
- lovense
- nogasm
- pressure-sensor
isShow: false
createdAt: '2026-01-28'
updatedAt: '2026-01-28'
relatedProjects:
- bluetooth-mesh-sensor-network
- focus-dial
- esp32-dynamic-iphone-keyless-system
- euc-dash-esp32-dashboard
- patient-monitoring-system-using-96boards
- iot-project-on-hvac
---

NogasmLink is an open-source firmware for the ESP32 designed to provide a local, privacy-focused alternative for controlling Lovense devices. By leveraging the ESP32's built-in Bluetooth LE capabilities and an external pressure sensor, the project creates an automated arousal management system that reacts in real-time to physical feedback.

One of the primary motivations behind NogasmLink is the shift from cloud-based control to local execution. While Lovense provides an official API, it often requires data to be routed through external servers. NogasmLink acts as a local BLE controller, mimicking the behavior of the official remote app but keeping all data on the local network. This results in significantly lower latency and enhanced privacy for the user.

### Hardware Integration

The system is built around the ESP32 development board and the MPX5700GP pressure sensor. This sensor provides the high-resolution data necessary for the system's logic to detect patterns. In addition to the sensor, the project incorporates a rotary encoder for manual sensitivity adjustments and an RGB LED for visual status feedback. The hardware design is straightforward enough for hand-soldering, though the project encourages community contributions for a dedicated PCB design.

### Intelligent Control and Detection

At the heart of NogasmLink is a sophisticated state machine that manages the transition between different session states. The system doesn't just monitor raw pressure; it features advanced clench detection and pressure pattern recognition. This allows the firmware to distinguish between general activity and specific user actions, enabling automated arousal detection with configurable cooldown periods.

Users can fine-tune the experience through several configuration options, including:
- **Arousal Decay Rate**: Controls how quickly the system "cools down."
- **Sensitivity Threshold**: Adjusts the peak detection for pressure spikes.
- **Ramp/Cooldown Times**: Manages the intensity of the connected vibrators.

### Web-Based Monitoring and Analytics

NogasmLink features a comprehensive web interface hosted directly on the ESP32. This dashboard provides real-time data visualization, allowing users to monitor pressure levels and arousal states as they happen. The interface includes a device scanner for pairing Lovense hardware, a session controller, and an analytics tab for reviewing session data. For those interested in data logging, the system even supports exporting session data as a CSV file.

### Technical Stack

The project is developed using the PlatformIO ecosystem and the Arduino framework. It utilizes the `NimBLE-Arduino` library for efficient Bluetooth communication, which is known for having a lower memory footprint than the standard ESP32 BLE library. Data persistence and web assets are managed via the `LittleFS` filesystem, ensuring that configuration settings and UI files are stored reliably across reboots. The project also utilizes `ESPAsyncWebServer` to handle the WebSocket and HTTP traffic required for the real-time dashboard.
