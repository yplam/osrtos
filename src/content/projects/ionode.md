---
title: IOnode
summary: IOnode is a specialized firmware that transforms ESP32 microcontrollers into
  NATS-addressable hardware nodes, allowing GPIO, ADC, and I2C sensors to be reached
  over a network via simple request/reply messages. Built on the Arduino framework
  and FreeRTOS, it provides a 'no-SDK' approach to hardware control with features
  like fleet discovery, threshold events, and a built-in web UI.
slug: ionode
codeUrl: https://github.com/M64GitHub/IOnode
siteUrl: https://ionode.io
version: v0.3.0-sensors-displays
lastUpdated: '2026-02-25'
rtos: freertos
libraries:
- littlefs
- spiffs
topics:
- arduino
- embedded
- esp32
- firmware
- gpio
- home-automation
- iot
- nats
- openclaw
- platformio
- sensors
- wireclaw
isShow: false
createdAt: '2026-08-02T06:46:15+00:00'
updatedAt: '2026-08-02T06:46:15+00:00'
relatedProjects:
- mongoose-os-configurable-sensor-node
- esp32-mesh-control
- rnode-firmware-neopixel-edition
- micropython-smarthome-node-pysmartnode
- esp32-plc
- riden-dongle
---

IOnode represents a shift in how developers interact with embedded hardware. Instead of writing custom firmware for every sensor deployment or relying on heavy cloud-based IoT SDKs, IOnode turns the ESP32 into a transparent hardware gateway. By leveraging the NATS messaging protocol, every pin and sensor on the device becomes a network-reachable subject. This architecture allows users to read sensors or toggle relays from a terminal, a script, or a dashboard without writing a single line of C++ code for the node itself.

### Hardware as a Network Subject

The core philosophy of IOnode is to make hardware "speak" NATS. Once flashed, an ESP32 identifies itself on the network and listens for requests on specific subjects. For example, a request sent to `ionode-01.hal.gpio.8.set` with a payload of `1` will immediately drive the corresponding pin high. This mapping extends to complex peripherals as well. The system supports a wide array of built-in "Device Kinds," including standard GPIO, ADC channels, PWM fans, and RGB LEDs, as well as specific I2C sensors like the BME280, BH1750, and SHT31.

Under the hood, IOnode runs on the ESP32's FreeRTOS-based Arduino core. It uses LittleFS to manage configuration files and device registries, ensuring that settings like WiFi credentials, NATS server details, and custom device mappings persist across reboots. The firmware is compatible with the entire modern ESP32 family, including the C6, S3, C3, and the classic ESP32.

### Fleet Management and Discovery

While IOnode works perfectly as a standalone controller, it is designed with fleet operations in mind. It includes a discovery mechanism (`_ion.discover`) that allows a central controller to find every node on the network. Nodes can be tagged (e.g., "greenhouse" or "lab") to enable group queries and bulk monitoring. 

To maintain visibility into the health of a distributed system, IOnode publishes periodic heartbeats. these JSON payloads include critical telemetry such as uptime, heap memory, RSSI, and the number of events fired. The project also features a powerful threshold event system. Users can configure a node to monitor a sensor locally and fire a NATS notification only when a value crosses a specific threshold—such as a temperature exceeding 30°C—complete with configurable cooldown periods to prevent message flooding.

### Extensibility and Integration

One of the most compelling aspects of IOnode is its hackability. Adding support for a new sensor type is a streamlined process that requires only adding an enum and a read case in the device logic; the HAL router handles the NATS subject mapping and persistence automatically. 

For users who prefer high-level control, IOnode integrates deeply with the OpenClaw AI ecosystem. This allows for natural language control of hardware, where an AI agent can discover nodes and execute complex automations like "if any node goes above 30°C, message me on Telegram." Because it uses standard NATS request/reply patterns, it is equally at home in Node-RED flows, Home Assistant setups, or simple shell scripts using the `nats-cli`.

### Getting Started

Deployment is handled via PlatformIO or a browser-based flasher. On the first boot, the node enters an Access Point mode for initial configuration (WiFi, NATS server, and device naming). Once connected, the device can be managed via a local web UI, a centralized HTML5 dashboard, or the `ionode` CLI tool. This multi-layered approach to management ensures that IOnode is accessible to hobbyists while remaining robust enough for professional fleet deployments.
