---
title: PathShield
summary: PathShield is a privacy-focused RF monitoring tool for the M5StickC-Plus,
  designed to detect and alert users to persistent WiFi and BLE devices. It employs
  a multi-threaded ESP32 architecture and a sophisticated persistence scoring algorithm
  to distinguish potential trackers from ambient wireless noise. The system features
  an offline manufacturer database and customizable detection thresholds for enhanced
  situational awareness.
slug: pathshield
codeUrl: https://github.com/lukeswitz/PathShield
siteUrl: https://lukeswitz.github.io/PathShield/
version: v1.2.1
lastUpdated: '2026-01-19'
licenses:
- MIT
image: /202604/PathShield_0.avif
rtos: freertos
libraries:
- spiffs
topics:
- ble
- m5stack
- privacy
- security
- wifi
isShow: true
createdAt: '2026-04-01T01:15:06+00:00'
updatedAt: '2026-04-01T01:15:06+00:00'
---

PathShield is a specialized RF awareness firmware designed for the M5StickC-Plus (v1 and v2) hardware platforms. In an era where portable trackers like AirTags, Tiles, and various IoT surveillance devices are increasingly common, PathShield provides a portable, real-time solution for identifying persistent wireless signals that may be following a user. By leveraging the dual-radio capabilities of the ESP32, the project monitors both Wi-Fi and Bluetooth Low Energy (BLE) spectrums to build a comprehensive map of the surrounding RF environment.

## Advanced Persistence Scoring

At the core of PathShield is a sophisticated detection algorithm that goes beyond simple proximity sensing. To reduce false positives from common household electronics or transient mobile devices, PathShield assigns a persistence score (0.0 to 1.0) to every detected MAC address. This score is calculated based on four distinct factors:

*   **Detection Frequency**: Requires a minimum number of detections (default 8) to ensure the signal is not a one-time occurrence.
*   **Time Window Distribution**: The system tracks devices across four separate windows (5, 10, 15, and 20 minutes). A device must appear in at least three windows to be considered a tracking risk.
*   **ε-Connectedness**: This metric looks for continuous tracking patterns by ensuring there are no gaps greater than 3 minutes between detections, helping distinguish a stalker from a coincidence.
*   **RSSI Pattern**: Signal strength variations are analyzed to correlate device movement with the user's own path.

When a device crosses the alert threshold (default ≥ 0.65), PathShield triggers a visual alert, highlighting the suspicious device in red on the display.

## Hardware Integration and User Interface

The project is optimized for the M5StickC-Plus, utilizing the M5Unified library for hardware abstraction. The interface is designed for high-stress situations, featuring a color-coded display system that allows users to quickly differentiate between normal Wi-Fi networks (Cyan), manufacturer-identified IoT devices (Yellow), and suspected trackers (Red).

The top status bar provides critical system telemetry, including the current scan mode, battery percentage, and a real-time memory bar. Because the system tracks a large number of devices and runs a multi-threaded scanning architecture, the memory bar serves as a vital indicator of system health, turning red if RAM becomes critically low.

## Customization and Database Capabilities

One of the most powerful features of PathShield is its offline manufacturer database. With over 24,500 MAC prefixes stored locally, the device can identify the manufacturer of a detected signal without needing an internet connection. This is particularly useful for identifying specific brands of trackers or cameras (such as Axon Taser cameras or Apple devices) in the field.

Users can further customize the firmware by editing the `PathShield.ino` source file:

```cpp
const char *specialMacs[] = {
  // Apple OUIs (AirTags use rotating addresses from Apple's OUI space)
  "AC:DE:48",  // Apple Inc.
  "F0:98:9D",  // Apple Inc.
  "BC:92:6B",  // Apple Inc.
  
  // Tile
  "C4:AC:05",  // Tile Inc.
  "E0:00:00",  // Tile Inc. (some models)
};
```

Additionally, an `allowlistMacs` feature allows users to ignore their own devices, such as personal smartphones or smartwatches, to prevent them from triggering alerts. For advanced users, the sensitivity of the detection algorithm—including the persistence threshold and scan timing—can be fine-tuned to suit specific environments.

## Technical Implementation

PathShield is built on a multi-threaded architecture that balances the heavy processing requirements of wireless scanning with a responsive UI. It utilizes the ESP32's native Wi-Fi and BLE stacks alongside the SPIFFS (Serial Peripheral Interface Flash File System) for storing the manufacturer database and device logs. The project supports installation via a web flasher or through the Arduino IDE, requiring specific partition schemes (Huge APP with 1MB SPIFFS) to accommodate the extensive MAC database and the firmware logic.
