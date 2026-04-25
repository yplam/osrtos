---
title: Flock-Detector 3.0
summary: Flock-Detector 3.0 is a specialized surveillance detection system designed
  for the Seeed Studio XIAO ESP32-S3 to identify and log WiFi and BLE signatures from
  ALPR cameras and gunshot detectors. The firmware utilizes FreeRTOS for dual-core
  task management, pairing WiFi promiscuous mode and NimBLE-based BLE scanning with
  real-time GPS tagging. It features a weighted confidence scoring engine, persistent
  session storage via LittleFS, and an OLED-based interface for field use.
slug: flock-detector-3-0
codeUrl: https://github.com/zmattmanz/flock-detection
lastUpdated: '2026-03-02'
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- littlefs
topics:
- alpr
- arduino
- ble
- deflock
- esp32
- flock-safety
- foia
- privacy
- raven
- surveillance-detection
- wifi
isShow: false
createdAt: '2026-04-25T00:59:28+00:00'
updatedAt: '2026-04-25T00:59:28+00:00'
---

## Overview

Flock-Detector 3.0 is an advanced embedded surveillance sniffer designed to provide transparency into the deployment of automated license plate readers (ALPR) and acoustic monitoring hardware. Built on the Seeed Studio XIAO ESP32-S3, the project identifies specific wireless signatures associated with hardware like Flock Safety cameras and Raven gunshot detectors. By combining WiFi promiscuous monitoring with Bluetooth Low Energy (BLE) scanning, the device provides real-time alerts and generates GPS-tagged CSV logs for privacy auditing and community mapping initiatives.

## Technical Architecture

The firmware is architected to take full advantage of the ESP32-S3’s dual-core processor using FreeRTOS. This multi-threaded approach ensures that high-speed radio scanning does not interfere with user interface responsiveness or data logging. 

*   **Core 0 (Scanner Task):** Dedicated to wireless operations. It handles adaptive WiFi channel hopping, dwelling longer on primary channels (1, 6, and 11) where surveillance hardware is most likely to operate. Simultaneously, it manages NimBLE-based BLE scanning intervals to capture advertisements from nearby IoT modules.
*   **Core 1 (Main Loop):** Manages the high-level application logic, including GPS NMEA parsing via TinyGPS++, rendering the 7-screen OLED interface, monitoring the user button, and handling SD card I/O. 

Shared state between the cores, such as detection counters and signal buffers, is protected by FreeRTOS mutexes to ensure thread safety.

## Detection Heuristics and Confidence Scoring

One of the most significant features of version 3.0 is its multi-method confidence scoring engine. Rather than relying on a single identifier, the system aggregates points from various signatures to reduce false positives:

*   **WiFi Analysis:** The system monitors 802.11 management frames (beacons and probe requests). It looks for specific SSID patterns, validates hex-formatted SSIDs (like `Flock-XXXX`), and matches MAC OUI prefixes against a database of known vendors like Murata, LiteOn, and Cradlepoint.
*   **BLE Fingerprinting:** The sniffer identifies devices via manufacturer-specific data (e.g., XUNTONG ID 0x09C8), service UUIDs, and BLE address types. It can even distinguish between static addresses used by fixed hardware and the resolvable random addresses typically used by mobile phones.
*   **Raven Firmware Identification:** The tool includes a specific fingerprinting module for Raven gunshot detectors, classifying them into different firmware versions (1.1.x through 1.3.x) based on the specific service UUIDs they advertise.
*   **RSSI Trend Tracking:** To distinguish between a stationary camera and a passing car, the firmware tracks signal strength over time. A rise-peak-fall pattern—characteristic of driving past a fixed installation—earns a confidence bonus.

## User Interface and Feedback

The project is designed for field use, integrating with the XIAO Expansion Base to provide a rich visual and audible experience. The OLED display offers seven distinct screens, ranging from a live signal feed and an activity bar chart to a proximity indicator that provides qualitative distance labels based on RSSI.

Audible alerts are handled via an escalation system. The buzzer pattern changes based on the confidence level of the detection: a single beep for medium confidence, three for high, and five rapid beeps for certain detections. For those requiring a lower profile, a "Stealth Mode" can be toggled to kill the display and buzzer while scanning continues in the background.

## Data Logging and Persistence

All detections are saved to a MicroSD card in a geospatial CSV format. Each entry includes the timestamp, GPS coordinates, speed, heading, and the specific detection methods that triggered the match. This data is structured to be compatible with tools like FOIA requests and the deflock.me community map.

To ensure data integrity across power cycles, the project utilizes LittleFS on the ESP32's internal flash. Lifetime detection counters and uptime statistics are saved every 60 seconds and restored on boot, allowing users to track their total detection history across multiple sessions.

## Hardware Requirements

The project is optimized for the following hardware stack:
*   **MCU:** Seeed Studio XIAO ESP32-S3
*   **Baseboard:** Seeed Studio Expansion Board for XIAO (includes SSD1306 OLED, buzzer, and MicroSD slot)
*   **GPS:** NEO-6MV2 or similar module connected via the Grove UART port
*   **Antenna:** 2.4 GHz Rod Antenna for improved range over the internal PCB antenna
