---
title: WiFi Remote Display ADV
summary: An ultra-low latency screen mirroring tool for the M5Stack Cardputer that
  utilizes USB HID injection to deploy a Python-based UDP streaming engine. It features
  adaptive bitrate management, flicker-free display rendering, and robust WiFi handling
  on the ESP32 platform.
slug: wifi-remote-display-adv
codeUrl: https://github.com/Zeloksa/WiFi-Remote-Display-ADV
siteUrl: https://boosty.to/zeloksa
version: v1.0
lastUpdated: '2026-04-22'
licenses:
- NOASSERTION
rtos: freertos
libraries:
- lwip
topics:
- cardputer
- esp32
- m5stack
- payload
- remote-display
- screen-mirroring
isShow: false
createdAt: '2026-06-09T00:27:59+00:00'
updatedAt: '2026-06-09T00:27:59+00:00'
relatedProjects:
- esp32-usb-over-ip
- netshlix
- wifiexe-esp32-s3-based-badusb
- hyperk
- sha2017-badge-firmware
- upycam
---

The **WiFi Remote Display ADV** is a sophisticated utility designed specifically for the M5Stack Cardputer, transforming the compact, keyboard-equipped device into a high-speed remote desktop monitor. Unlike traditional remote desktop clients that require manual software installation on the host, this project utilizes the Cardputer’s USB HID capabilities to "inject" a streaming server directly into a target Windows machine.

### The Zero-Install Injection Engine

One of the most innovative aspects of this project is its deployment method. By emulating a USB keyboard, the Cardputer automatically opens a PowerShell window and types out a complete Python script. This script handles the screen capture using the `mss` and `opencv` libraries, then streams the resulting data back to the Cardputer over UDP. 

To ensure safety and transparency, the injection process is designed with a "human-in-the-loop" approach. The payload delivery stops right before the final execution command. This allows the user to review the generated Python code on their PC monitor to verify its integrity before manually pressing Enter to start the stream. This transparent injection makes it an ideal tool for quick diagnostics or remote monitoring without leaving a permanent software footprint.

### Technical Optimizations for ESP32

To achieve ultra-low latency on the ESP32-S3 hardware, the project implements several low-level optimizations that push the limits of the M5Stack platform:

*   **True Adaptive Bitrate (ABR):** The system mathematically monitors frame render times and UDP packet drops. If network lag is detected, the Cardputer signals the PC to dynamically downgrade JPEG compression quality. This ensures that the frame rate remains consistent even on congested local networks, with quality automatically recovering when bandwidth improves.
*   **Zero-Flicker Direct UI:** Standard screen-drawing methods often rely on heavy RAM buffers that can cause flickering or "out of memory" errors on the ESP32. This project employs a highly optimized algorithm that bypasses these buffers, rewriting only the pixels that have changed. This approach saves approximately 64KB of Heap memory and eliminates screen flicker entirely.
*   **Hardware Anti-Deadlock:** The developer has implemented deep radio module power cycling (`WiFi.mode(WIFI_OFF)`) to bypass notorious ESP32 hardware bugs. This prevents the infinite freezing that can occur during intensive Wi-Fi scans or high-speed UDP transmission.

### User Experience and Controls

The Cardputer's built-in keyboard is fully utilized for camera control and system management. Once the stream is active, users can use dedicated hotkeys to interact with the view:

*   **Zooming:** Use the `[ = ]` and `[ - ]` keys to zoom in and out of the desktop view.
*   **Panning:** Navigate the desktop using the `[ ; ]`, `[ . ]`, `[ , ]`, and `[ / ]` keys to pan the camera in four directions.
*   **Audio Feedback:** The system includes volume controls for the Cardputer speaker, providing beep indicators for system status.

Connectivity is handled via the ESP32's Non-Volatile Storage (NVS). WiFi credentials are saved securely on the chip, allowing for autonomous operation without the need for an SD card. If the device needs to be moved to a new network, a simple "Hard Reset" function via the `[ DEL ]` key clears the stored credentials.

### Requirements and Setup

For the system to function correctly, the target Windows PC (10 or 11) must have Python 3.x installed and explicitly added to the system PATH. Because the payload injection relies on emulated keystrokes, it is vital that the target PC's keyboard layout is set to English before starting the injection process to prevent the PowerShell commands from being typed incorrectly.
