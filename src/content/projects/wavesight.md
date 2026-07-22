---
title: WaveSight
summary: WaveSight is an ESP32-based radar system that utilizes Wi-Fi Channel State
  Information (CSI) to detect human presence and movement without the need for cameras
  or PIR sensors. Built on the ESP-IDF framework and FreeRTOS, it features a real-time
  web dashboard for signal visualization, auto-calibration routines, and GPIO outputs
  for integration with external hardware.
slug: wavesight
codeUrl: https://github.com/ErfanDL/WaveSight
version: Stable
lastUpdated: '2026-05-10'
rtos: freertos
libraries:
- nimble
- lwip
topics:
- agentic-ai
- densepose
- esp-idf
- esp32
- firmware
- mcu
- mincut
- monitoring
- pose-estimation
- radar
- rf
- self
- self-learning
- spatial-intelligence
- wifi
- wifi-csi
- wifi-hacking
- wifi-security
- world-model
isShow: false
createdAt: '2026-07-20T10:55:04+00:00'
updatedAt: '2026-07-20T10:55:04+00:00'
---

WaveSight represents a significant shift in environmental sensing by repurposing existing Wi-Fi signals to detect human activity. While traditional motion detection often relies on PIR sensors—which can fail to detect stationary people—or cameras—which raise significant privacy concerns—WaveSight uses Wi-Fi signal jitter to monitor a space. By analyzing Channel State Information (CSI), the system can determine if a room is occupied or if movement is occurring based solely on how a human body disturbs the wireless field between the ESP32 and a Wi-Fi access point.

### Privacy-First Human Detection
The core philosophy of WaveSight is privacy. Because the system does not use optical sensors or microphones, it is an ideal solution for sensitive areas like bedrooms or bathrooms where traditional monitoring is intrusive. The technology works by monitoring the connection to a standard 2.4 GHz Wi-Fi router. As people move through the line-of-sight or even near the devices, they cause minute changes in the signal's phase and amplitude. WaveSight captures this data, filters out background noise, and translates it into actionable presence and movement states.

### Technical Foundation
The project is built using the Espressif IoT Development Framework (ESP-IDF) and runs on FreeRTOS, allowing it to handle complex signal processing tasks alongside web hosting and network management. It is designed to be highly portable across the Espressif ecosystem, supporting the ESP32, ESP32-S2, ESP32-S3, and ESP32-C3 series. 

Key technical features include:
- **Moving-Window Filtering**: Real-time noise reduction to ensure movement detection is accurate and responsive.
- **Presence Logic**: A configurable timeout system that maintains a "someone present" status even when occupants are relatively still.
- **NimBLE Stack**: Integrated Bluetooth support via NimBLE (enabled in configuration) alongside standard Wi-Fi station and SoftAP modes.
- **GPIO Triggering**: Dedicated pins for `someone` and `move` status, allowing the device to act as a physical trigger for other microcontrollers or home automation relays.

### Real-Time Web Dashboard
WaveSight includes a modern, responsive web interface that provides a window into the invisible Wi-Fi environment. The dashboard features live rolling charts for RSSI and Jitter, giving users immediate visual feedback on how the radar is interpreting the environment. Beyond monitoring, the UI acts as a full control center where users can perform Wi-Fi scans, adjust radar sensitivity parameters, and configure hardware pins without needing to reflash the firmware.

### Auto-Calibration and Feedback
To account for the unique wireless characteristics of different rooms, WaveSight includes an automated calibration feature. During a 60-second sampling period in an empty room, the device learns the background noise floor and automatically calculates the optimal thresholds for detection. 

For physical feedback, the project supports WS2812 RGB LEDs. The LED provides a quick reference for the device's current state: breathing blue for configuration mode, green for detected movement, and white for confirmed presence. This makes it easy to verify the system's status at a glance without opening the web dashboard.
