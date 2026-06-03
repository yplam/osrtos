---
title: 'SkySweep32: Multi-band Passive Drone Detector'
summary: SkySweep32 is an ESP32-based passive drone detection system that monitors
  radio spectrum across the 900 MHz, 2.4 GHz, and 5.8 GHz bands. Utilizing FreeRTOS
  for concurrent signal processing, it identifies UAV control and video transmission
  patterns through hardware-accelerated scanning and signal fingerprinting.
slug: skysweep32-multi-band-passive-drone-detector
codeUrl: https://github.com/bobberdolle1/SkySweep32
siteUrl: https://github.com/bobberdolle1/SkySweep32
version: v0.5.0
lastUpdated: '2026-03-28'
licenses:
- GPL-3.0
rtos: freertos
libraries:
- u8g2
topics:
- cc1101
- counter-drone
- defense
- drone-detection
- embedded
- esp32
- fpv
- iot
- jamming
- mavlink
- nrf24l01
- platformio
- rf-scanner
- sdr
- security
- uav
isShow: false
createdAt: '2026-06-02T23:24:45+00:00'
updatedAt: '2026-06-02T23:24:45+00:00'
relatedProjects:
- batear
- daeva-rf-cybersecurity-tool
- flock-detector-3-0
- pathshield
- bluehound
- esp32-bluejammer
---

SkySweep32 is a comprehensive monitoring solution designed to identify unmanned aerial vehicles (UAVs) by analyzing the radio frequency (RF) environment. Built around the versatile ESP32 microcontroller, the project offers a modular architecture that scales from a budget-friendly starter kit to an advanced multi-sensor sentinel. By scanning common frequencies used for drone control and video telemetry, it provides operators with real-time awareness of nearby aerial activity without emitting detectable signals itself.

## Multi-Band Detection Strategy

The core strength of SkySweep32 lies in its ability to interface with multiple RF modules simultaneously. It covers three primary bands:
- **900 MHz**: Monitored via the CC1101 module, typically used for long-range telemetry and ISM band drone links.
- **2.4 GHz**: Scanned using the NRF24L01+, covering common WiFi-based drones and proprietary digital radio protocols.
- **5.8 GHz**: Monitored through the RX5808 module, focusing on analog and digital video transmission links.

To manage these diverse hardware components, the system employs a FreeRTOS-based architecture. This ensures that high-priority tasks, such as signal sweeping and protocol decoding, run concurrently with low-priority tasks like updating the OLED display or serving the web dashboard. Hardware SPI mutexes are implemented to prevent data collisions between the shared radio modules.

## Signal Fingerprinting and Identification

Rather than simply detecting raw RF energy, SkySweep32 features a `SignalDatabase` for fingerprinting known drone patterns. It can identify specific technologies like DJI OcuSync, FPV Analog, and Crossfire by analyzing band-matching data and RSSI (Received Signal Strength Indicator) variance. This classification allows the system to assign threat levels ranging from "Info" to "Critical."

For modern compliance, the project includes native support for FAA ANSI/CTA-2063 Remote ID. The ESP32's Bluetooth LE capabilities are used to identify broadcasted drone IDs, providing specific telemetry data for compliant aircraft directly on the device's interface.

## Mesh Networking and Remote Dashboard

SkySweep32 is designed for distributed deployment. It utilizes the ESP-NOW protocol to create a self-organizing mesh network. This allows multiple detector nodes to share threat alerts, heartbeats, and GPS telemetry over a large area without requiring existing WiFi infrastructure or cellular data. 

Users can interact with the system through a local web dashboard served directly from the ESP32. This dark-themed interface features an interactive Leaflet.js map for tracking identified drones and visualizing signal strength graphs. For field use, the system also supports local visual output on an OLED display driven by the U8g2 library and audible alerts via an intelligent buzzer system.

## Modular Tiers and Hardware Evolution

The project is structured into functional tiers, allowing users to build exactly what they need:
- **Base**: Focuses on 2.4 GHz and BLE Remote ID.
- **Standard**: Adds 900 MHz and 5.8 GHz monitoring with ML-based classification.
- **Pro**: Integrates GPS logging and SD card storage for post-mission analysis.
- **Juggernaut**: An advanced configuration for authorized defense research, supporting VCO signal injection for jamming and protocol-specific countermeasures.

## Getting Started with PlatformIO

The project is built using the PlatformIO ecosystem, which handles the complex dependency chain for the various radio drivers and web components. To build the standard configuration, users can define their environment in the `platformio.ini` file:

```ini
[env:esp32dev_standard]
platform = espressif32
board = esp32dev
framework = arduino
build_flags = -DTIER_STANDARD
lib_deps = 
    olikraus/U8g2@^2.35.9
    bblanchon/ArduinoJson@^7.0.4
    jgromes/RadioLib@^6.6.0
```

For those interested in the countermeasure capabilities, the system requires explicit enabling via build flags, though these features are strictly intended for authorized and legal defense research environments. With its focus on accessibility and modularity, SkySweep32 serves as a powerful platform for understanding and defending against the evolving landscape of drone technology.
