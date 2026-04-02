---
title: 'WiFiExe: ESP32-S3 based BadUSB'
summary: WiFiExe is a remote-controlled BadUSB tool built on the ESP32-S3 that enables
  HID payload execution and data exfiltration via a web-based interface. It leverages
  the ESP32-S3's native USB capabilities to act as both a keyboard and a mass storage
  device for security research on Windows 11 systems.
slug: wifiexe-esp32-s3-based-badusb
codeUrl: https://github.com/ravssh/WifiExe
lastUpdated: '2024-09-10'
licenses:
- MIT
rtos: freertos
topics:
- arduino
- badusb
- esp32-arduino
- esp32-s3
- hid
isShow: false
createdAt: '2026-04-02T23:28:39+00:00'
updatedAt: '2026-04-02T23:28:39+00:00'
---

## Overview

WiFiExe is an innovative security research tool that transforms an ESP32-S3 development board into a sophisticated, remote-controlled BadUSB device. Unlike traditional HID (Human Interface Device) attack tools that require physical interaction or pre-programmed sequences, WiFiExe provides a dynamic web interface that allows users to trigger payloads and manage exfiltrated data over a local WiFi network. 

By utilizing the native USB capabilities of the ESP32-S3, the project can seamlessly switch between acting as a keyboard to inject commands and a Mass Storage Class (MSC) device to function as a standard USB flash drive. This dual-purpose architecture makes it a powerful platform for demonstrating post-exploitation techniques and data exfiltration vulnerabilities.

## Core Capabilities and Features

The project is designed around a central web server hosted directly on the ESP32-S3. Once a target machine is connected to the device, the operator can access a control panel at `192.168.4.1` to manage the attack lifecycle. 

### Remote Payload Execution
One of the standout features is the ability to run custom batch files with administrative privileges. The web interface allows users to browse the onboard SD card's filesystem, select a script, and execute it via HID injection. This removes the need to hardcode payloads before deployment, offering significant flexibility in the field.

### Automated Data Exfiltration
WiFiExe comes with a default payload specifically designed to extract sensitive browser data, including passwords, cookies, history, and bookmarks. This is achieved by integrating with the [HackBrowserData](https://github.com/moonD4rk/HackBrowserData) tool. The device types the necessary commands to execute the extraction utility and then stores the resulting data on its internal SD card.

### Hybrid USB Interface
The system leverages the [esp32-sdcard-msc](https://github.com/atomic14/esp32-sdcard-msc) implementation to provide a "Mount Storage" function. This effectively ends the HID session and reconnects the device to the host PC as a USB drive. This allows the operator to retrieve the exfiltrated CSV files or update the payload scripts without removing the SD card from the hardware.

## Technical Implementation

The project is built using the Arduino framework within the PlatformIO ecosystem, targeting the ESP32-S3-Pico (or similar S3-based boards). The choice of the S3 variant is critical as it features the native USB PHY required for HID and MSC emulation.

### Hardware Configuration
To function correctly, the project requires an SD card formatted for SPI communication. The `platformio.ini` configuration defines specific pin mappings for the SD card interface:
- **MISO**: GPIO 13
- **MOSI**: GPIO 11
- **CLK**: GPIO 12
- **CS**: GPIO 10

### Software Architecture
The firmware manages several concurrent tasks, including the WiFi Access Point, the web server, and the USB stack. A unique "file_temp_check.txt" mechanism is used to help the scripts determine the drive letter assigned to the ESP32's SD card once it is mounted as a mass storage device, ensuring that exfiltration scripts know exactly where to write their output.

## Usage and Workflow

Deploying WiFiExe involves a straightforward setup process:
1.  **Configuration**: The `platformio.ini` file is adjusted to match the specific ESP32-S3 board variant.
2.  **Preparation**: An SD card is prepared with a placeholder file (`file_temp_check.txt`) to aid in drive detection.
3.  **Deployment**: The device is plugged into a target Windows 11 machine.
4.  **Control**: The operator connects to the 'WifiExe' Access Point and opens the web interface to trigger the desired payload.

## Considerations and Limitations

While powerful, WiFiExe operates within the constraints of the ESP32-S3 hardware. The device uses USB 1.1 speeds, which means that large data transfers or complex exploits may take several minutes to complete. Additionally, the simultaneous management of WiFi, the web server, and USB tasks can create processing bottlenecks, making the device sensitive to high volumes of concurrent web requests. The current implementation is primarily tested and optimized for Windows 11 environments.
