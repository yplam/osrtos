---
title: SignalRF
summary: SignalRF is a multi-tool RF analysis firmware for the M5Stack Cardputer,
  enabling WiFi and BLE sniffing, signal mapping, and ultrasonic detection. Built
  on the ESP32-S3 platform and FreeRTOS, it provides a portable toolkit for field
  RF analysis and tracker discovery.
slug: signalrf
codeUrl: https://github.com/ByteHub-1337/SignalRF
lastUpdated: '2026-02-01'
licenses:
- MIT
rtos: freertos
topics:
- airtag-detector
- bluetooth
- cardputer
- esp32
- m5stack
- rf-analysis
- wifi-scanner
isShow: false
createdAt: '2026-10-06T01:33:55+00:00'
updatedAt: '2026-10-06T01:33:55+00:00'
---

The M5Stack Cardputer has quickly become a favorite among hardware enthusiasts and security researchers due to its compact form factor, built-in keyboard, and the power of the ESP32-S3. SignalRF leverages this hardware to create a portable RF analysis toolkit that fits in a pocket, offering a variety of scanning and detection tools that are usually reserved for more complex desktop setups.

At its core, SignalRF is designed for field use. It bypasses the need for complex compilation or library management for the end user by providing a ready-to-flash binary. Once installed, the firmware transforms the Cardputer into a multi-functional device capable of monitoring the invisible signals around us through an intuitive, keyboard-driven interface.

### A Suite of RF Tools

The firmware is divided into five distinct tools, each accessible via the main menu using the Cardputer's physical keyboard:

*   **WiFi Scanner**: Beyond just listing SSIDs, this tool allows users to monitor signal strength and track RSSI over time. This is invaluable for identifying dead zones, rogue access points, or optimizing router placement.
*   **BLE Scanner**: This module identifies nearby Bluetooth Low Energy devices, providing vendor information and signal monitoring to help identify the sea of IoT devices in modern environments.
*   **Ultrasonic Detector**: Utilizing the Cardputer's microphone and Fast Fourier Transform (FFT) processing, this tool acts as a real-time spectrum analyzer for frequencies above 18kHz. It helps users find hidden ultrasonic transmitters or high-frequency beacons.
*   **Signal Mapper**: A unique feature that allows users to map WiFi and BLE coverage across a physical space using a 5x5 grid system, creating a visual representation of signal density.
*   **Tracker Detector**: In an era of privacy concerns, this tool specifically scans for common tracking devices like AirTags, Tiles, and Samsung SmartTags that might be in your immediate vicinity.

### Enhancing the Experience with OUI Lookup

One of the standout features of SignalRF is its optional OUI (Organizationally Unique Identifier) database support. By placing a simple `oui.txt` file on a microSD card, users can see the actual manufacturers of the devices they discover. This turns a cryptic MAC address into "Apple Inc" or "Samsung Electronics," providing immediate context during a scan. This feature highlights the project's focus on usability, as it works seamlessly if the SD card is present but doesn't hinder the core functionality if it isn't.

### Technical Implementation

SignalRF is built using the Arduino framework for the ESP32-S3, which runs on top of the FreeRTOS kernel. This architecture allows the firmware to handle concurrent tasks—such as UI rendering, keyboard input, and background RF scanning—smoothly and efficiently. 

The project makes extensive use of the M5Cardputer library for hardware integration, while `arduinoFFT` powers the signal processing required for the ultrasonic detection tool. The UI is specifically optimized for the Cardputer's display, featuring color-coded signal strength indicators (green for strong, red for weak) and real-time graphing for RSSI in the device detail views. 

### Getting Started

For most users, getting started is as simple as flashing the provided `SignalRF_Default.bin` using `esptool.py`. For developers looking to modify the firmware, it is fully compatible with the Arduino IDE, requiring only standard libraries like M5Cardputer, WiFi, BLEDevice, and arduinoFFT. 

SignalRF was inspired by other community projects like the Bruce firmware, showcasing the collaborative nature of the M5Stack ecosystem. Whether you are a network administrator mapping out dead zones or a privacy-conscious individual looking for hidden trackers, SignalRF provides a polished, open-source solution for the M5Stack community.
