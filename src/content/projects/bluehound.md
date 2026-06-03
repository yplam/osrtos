---
title: Bluehound
summary: Bluehound is a comprehensive BLE reconnaissance and anomaly detection framework
  designed for real-time device discovery and environment analysis. It combines a
  Python-based Linux backend with ESP32-powered hardware components to monitor signal
  stability, detect RF interference, and visualize Bluetooth activity.
slug: bluehound
codeUrl: https://github.com/NSM-Barii/Bluehound
lastUpdated: '2026-04-23'
rtos: freertos
libraries:
- nimble
topics:
- anomaly-detection
- ble
- ble-scanner
- bluetooth
- bluetooth-low-energy
- cybersecurity
- intrusion-detection
- iot-security
- linux
- network-security
- python
- real-time
- rf-analysis
- wardriving
isShow: false
createdAt: '2026-05-17T01:18:00+00:00'
updatedAt: '2026-05-17T01:18:00+00:00'
relatedProjects:
- antihunter
- ghostble
- ghost-esp
- marauder-centauri
- flock-detector-3-0
- pathshield
---

## Overview

Bluetooth Low Energy (BLE) environments are becoming increasingly crowded and complex. Bluehound addresses the need for better visibility into these environments by offering a dual-mode system designed for both mobile wardriving and stationary anomaly detection. Originally conceived as a simple discovery tool, it has evolved into a framework capable of identifying signal instability, sudden device disappearances, and potential RF interference in real-time.

The project bridges the gap between high-level data analysis and low-level hardware interaction. While the core logic resides in a Python-based host system utilizing the Linux BlueZ stack, the repository includes specialized firmware for ESP32 devices to extend the system's physical reach and capabilities.

## Dual-Mode Operation

Bluehound operates in two distinct modes, each serving a specific security or research objective:

### Sniffer Mode
In Sniffer Mode, the system acts as a high-speed wardriving tool. It continuously scans for BLE advertisement packets, extracting critical metadata such as MAC addresses, vendor information, UUIDs, and RSSI values. This data is stored in a persistent JSON database, allowing for long-term mapping of BLE devices across different sessions. To make this data actionable, Bluehound features a web-based radar visualization that provides a real-time spatial representation of nearby devices based on distance estimation.

### Monitor Mode
Monitor Mode shifts the focus from discovery to behavioral analysis. It builds a live model of BLE activity, tracking individual devices across multiple scan cycles. By applying weighted anomaly detection, the system classifies devices as either `stable` or `unstable`. An instability classification is triggered by a combination of RSSI spikes, missed scan cycles, and sudden signal loss. 

Beyond individual device tracking, the system calculates environment-level metrics, including the "Unstable Device Ratio" and a "Drop Score." These metrics are essential for detecting broader environmental conditions such as BLE flooding, intentional jamming, or significant RF interference.

## Hardware Integration and Microcontroller Support

One of the most interesting aspects of Bluehound is its integration with embedded hardware. The repository contains several PlatformIO projects targeting the ESP32 ecosystem:

*   **BLE Spammer/Scanner**: Utilizing an M5Stick-C and the NimBLE-Arduino library, this component provides a compact, portable tool for interacting with the BLE environment.
*   **BLE Car**: An ESP32-S3-based mobile platform designed for automated scanning, featuring integrated display support via Adafruit GFX.
*   **Light API**: An ESP32-based visual alert system using NeoPixels to provide immediate physical feedback when anomalies are detected by the monitor engine.

These hardware components allow Bluehound to move beyond a stationary laptop, enabling mobile reconnaissance and physical alerting systems.

## Technical Architecture

The Python backend is structured for modularity, separating the scanning logic from the monitoring engine and the web-based UI. The use of the NimBLE library on the ESP32 side ensures efficient power usage and high-performance BLE scanning compared to standard stacks. 

```python
# Example of the logic used in Monitor Mode
# RSSI instability + missed cycles + signal loss → unstable device

if device.missed_cycles > threshold or device.rssi_variance > limit:
    device.status = "unstable"
    session.update_drop_score()
```

## Use Cases and Research

Bluehound is positioned as a tool for security researchers and IoT developers. It is particularly effective for:
*   **IoT Device Auditing**: Mapping the footprint of smart devices in a specific area.
*   **RF Environment Monitoring**: Identifying noise floors and interference patterns that might affect industrial IoT deployments.
*   **Intrusion Detection**: Serving as an early-stage research platform for detecting unauthorized BLE devices or signal-based attacks.

By combining real-time metrics—such as total device counts and unstable ratios—with physical hardware integration, Bluehound provides a versatile platform for understanding the invisible BLE signals that surround us.
