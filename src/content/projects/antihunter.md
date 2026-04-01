---
title: AntiHunter
summary: AntiHunter is an open-source distributed perimeter defense system designed
  for wireless network security and operational awareness. Built on the ESP32-S3 platform
  using the Arduino framework and FreeRTOS, it creates a scalable mesh network of
  sensors for real-time WiFi/BLE threat detection, device mapping, and signal triangulation.
  The system integrates GPS, SD logging, and tamper-responsive data destruction to
  provide a robust digital tripwire for security professionals.
slug: antihunter
codeUrl: https://github.com/lukeswitz/AntiHunter
version: v0.9.2
lastUpdated: '2026-03-31'
licenses:
- MIT
image: /202604/AntiHunter_0.avif
rtos: freertos
libraries:
- nimble
topics:
- ble
- detection
- esp32
- lora
- mesh
- perimeterdefense
- privacy
- reconnaissance
- security
- sigint
- wifi
isShow: true
createdAt: '2026-04-01T01:14:36+00:00'
updatedAt: '2026-04-01T01:14:36+00:00'
---

AntiHunter is a low-cost, open-source distributed perimeter defense system designed for wireless network security and operational awareness. Built on the ESP32-S3 architecture with mesh networking capabilities, it functions as a scalable sensor network for real-time threat detection, device mapping, and perimeter security. The system transforms spectrum activity into actionable security intelligence by combining WiFi and BLE scanning, GPS positioning, and environmental sensors into a digital and physical "tripwire."

## Primary Detection Modes

At its core, the system operates through several specialized detection modes that allow for both passive monitoring and active tracking of wireless devices. 


### Targeted Scanning and Triangulation
In List/Target Scan Mode, the system maintains a watchlist of specific MAC addresses or vendor OUI prefixes. It sweeps WiFi channels and BLE frequencies, providing immediate alerts and detailed logging to an SD card upon detection. This includes recording RSSI, channel, GPS coordinates, and device names.

For more advanced tracking, the experimental Triangulation mode coordinates multiple nodes across a mesh network to provide precise location tracking. By aggregating RSSI and GPS data from various contributing nodes, the system uses weighted trilateration with Kalman filtering to estimate a target's coordinates, outputting data including confidence levels and uncertainty measurements.

![Distributed Triangulation Diagram showing multiple nodes](/202604/AntiHunter_4.avif)

### Advanced Sniffing Capabilities
Beyond simple scanning, AntiHunter includes several specialized analysis tools:

*   **Baseline Anomaly Detection:** Establishes a baseline of the local RF environment and monitors for new devices, disappearances, or significant signal changes. 
*   **Deauthentication Attack Scan:** Identifies WiFi deauth/disassoc attacks in real-time, filtering frames to identify potential source randomization.
*   **Drone RID Detection:** Identifies UAVs broadcasting Remote ID (ODID/ASTM F3411) and French drone ID formats, extracting pilot location and flight telemetry.
*   **MAC Randomization Correlation:** An experimental feature that traces device identities across randomized MAC addresses using behavioral signatures like IE fingerprinting and channel sequencing.

## Sensor Integration and Hardware

The system is designed to be highly modular, integrating various hardware components via standard interfaces. It utilizes UART for GPS data (TinyGPS++), SPI for SDHC logging, and I2C for DS3231 Real Time Clock management to ensure all logs are accurately timestamped in UTC. A SW-420 vibration sensor provides tamper detection through interrupt-driven logic.

![AntiHunter Hardware and Sensor Integration](/202604/AntiHunter_1.avif)

The core hardware requirements include a Seeed Studio XIAO ESP32-S3 and a Meshtastic-compatible board like the Heltec v3.2. These components are housed in a custom enclosure with dedicated antennas for WiFi/BLE, LoRa, and GNSS.

## Secure Data Destruction and RF Configuration

To protect sensitive data in the field, AntiHunter features a secure data destruction mechanism. This includes configurable auto-erase sequences triggered by the vibration sensor, manual wipes via the web interface, and remote force-erase commands sent over the mesh network. When triggered, the system wipes all sensitive data and can be configured to create a dummy IoT weather device configuration as an obfuscation tactic.

RF performance is managed through several presets—Relaxed, Balanced, and Aggressive—which adjust WiFi channel dwell times, scan intervals, and RSSI thresholds. These settings allow users to balance power consumption with detection speed and coverage depth.

## System Architecture and Mesh Networking

AntiHunter operates as a distributed sensor network where nodes function independently while contributing to a collective security picture. Local detections are identified, enriched with GPS and signal data, and then broadcast over a Meshtastic LoRa mesh network.

![AntiHunter Distributed System Architecture](/202604/AntiHunter_10.avif)

This architecture allows for integration with the AntiHunter Command Center, which aggregates data from all nodes for real-time mapping and visualization. The mesh integration supports standard text messaging protocols for command and control, enabling users to update configurations, start scans, or check system status across the entire network using simple alphanumeric addressing.

## Getting Started

Deployment is streamlined through a precompiled binary flasher script for rapid setup. For developers, the project supports PlatformIO with distinct environments for "Full" (web-enabled) and "Headless" (minimal dependency) firmware. Once flashed, the device provides a web-based dashboard for initial configuration of RF settings, target lists, and mesh credentials.
