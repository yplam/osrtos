---
title: Cardputer Wardriver
summary: A portable WiFi mapping firmware for the M5Stack Cardputer that scans 2.4
  GHz networks and logs GPS-tagged data in WiGLE-compatible CSV format. It features
  active/passive scanning, a built-in web configuration portal, and automatic WiGLE
  uploads via HTTPS. The project runs on the ESP32-S3 and utilizes FreeRTOS for task
  management and system diagnostics.
slug: cardputer-wardriver
codeUrl: https://github.com/stewmoss/cardputer-wardriver
version: 0.5.3
lastUpdated: '2026-05-05'
licenses:
- MIT
rtos: freertos
libraries:
- esp32-targz
topics:
- cardputer
- m5
- m5cardputer
- m5stack
- wardriving
- wigle
isShow: false
createdAt: '2026-07-19T07:14:28+00:00'
updatedAt: '2026-07-19T07:14:28+00:00'
---

## Turning the Cardputer into a Portable WiFi Mapping Tool

The Cardputer Wardriver is a specialized firmware designed to transform the M5Stack Cardputer into a powerful, handheld wireless mapping station. By leveraging the ESP32-S3's internal radio and an external GPS module, the project allows users to discover and log 2.4 GHz WiFi networks while traveling. The data is captured in a strict WiGLE-compatible CSV format, making it easy to contribute to global wireless databases without requiring complex post-processing.

At its core, the system is built for efficiency and reliability in the field. It handles the complexities of scanning, GPS synchronization, and data persistence to an SD card, all while providing a rich user interface on the Cardputer's built-in display. The firmware supports both the original Cardputer v1.1 and the newer ADV models, automatically detecting pinouts for GPS communication.

## Advanced Scanning and Visualization

Unlike basic WiFi scanners, this project offers sophisticated control over how the radio interacts with the environment. Users can choose between active and passive scanning modes. In active mode, the device sends probe requests to elicit responses from hidden or quiet networks, while passive mode allows for silent observation. The scanning behavior is highly configurable, with adjustable dwell times for per-channel hopping or full-channel sweeps.

To keep the user informed, the firmware provides six live dashboards:
- **Summary**: An overview of the current session stats.
- **Security Snapshot**: A breakdown of encryption types (WPA, WEP, Open).
- **Live AP Feed**: A scrolling list of recently discovered access points.
- **New AP Discovery**: Highlights unique networks not previously seen in the session.
- **Channel Activity Map**: A visual representation of channel congestion.
- **System Info**: Real-time telemetry including heap memory, battery levels, and CPU performance.

One of the standout visual features is the channel congestion map. It uses a color-coded bar chart to show which parts of the 2.4 GHz spectrum are most crowded, offering views for the current session, the latest sweep, or unique network counts.

## GPS Integration and Data Integrity

Accurate mapping requires precise location data. The project interfaces with UART-based GPS modules (like the BN-220 or M5Stack GPS Unit) to tag every discovered network. To ensure data integrity, the ESP32-S3 synchronizes its internal system clock directly from the GPS satellite signal, ensuring every timestamp is accurate even without an internet connection.

Logging is flexible, offering three distinct GPS modes. The "strict fix-only" mode ensures data is only recorded when a high-quality satellite lock is achieved. For environments with poor reception, the "last-known" mode continues logging based on the previous coordinates, while "zero-GPS" allows for scanning without location data. For points of interest, users can drop a manual "FLAG" marker into the CSV file by pressing a physical button on the device.

## Connectivity and Privacy

Managing an embedded device can be cumbersome, but the Cardputer Wardriver simplifies this with a built-in WiFi web configuration portal. On first boot, the device enters Config Mode, creating a captive portal that users can access from a phone or laptop. This interface allows for the adjustment of SSID/BSSID exclusion lists, GPS geofencing (up to 10 zones), and MAC randomization with OUI spoofing. These privacy controls are essential for ensuring that home networks or sensitive routes are automatically excluded from the logs.

For users who contribute to the WiGLE community, the firmware includes an automated upload feature. When the device detects a configured home network at boot, it can automatically compress (using gzip via the `esp32-targz` library) and upload pending CSV files to WiGLE via HTTPS. It even includes a "thin-file" quarantine to prevent uploading low-quality logs with insufficient data.

## Technical Implementation

The project is developed using the Arduino framework on the ESP32 platform, utilizing FreeRTOS for managing concurrent tasks like display updates, GPS parsing, and SD card writes. The use of PlatformIO ensures a streamlined build process. Key libraries include `TinyGPSPlus` for NMEA parsing, `FastLED` for status indicators, and `ArduinoJson` for configuration management. 

Power management is also a priority; the firmware includes display blanking and a graceful auto-shutdown routine that triggers when the battery hits a low threshold, ensuring that all logs are flushed to the SD card and the filesystem is unmounted safely before the device powers off.
