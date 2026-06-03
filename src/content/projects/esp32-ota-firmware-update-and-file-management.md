---
title: ESP32 OTA Firmware Update and File Management
summary: A comprehensive ESP32 utility for managing firmware and files over-the-air
  using a web-based interface. It supports binary firmware updates, SPIFFS partition
  image flashing, and individual file operations like browsing and deletion.
codeUrl: https://github.com/AR-D-R/ESP32-OTA-File-management
isShow: false
rtos: freertos
libraries:
- spiffs
topics:
- arduino-ide
- arduino-sketch
- async
- async-web
- asynchronous
- esp32
- esp32-arduino
- esp32-ota
- espasyncwebserver
- filemanager
- ota
- ota-firmware-updates
- ota-update
- ota-updater
- spiffs
- spiffs-memory
- spiffs-support
star: 14
version: '1.0'
lastUpdated: '2020-12-26'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp32-async-web-server-with-spiffs-and-ota
- esp-async-http-update-server
- esp-fs-webserver
- espxwebflmgr
- devfsuploadesp
- esp32-wi-fi-provision-care
---

Managing ESP32 devices in the field often presents a challenge: how do you update the code or modify configuration files without physically connecting a USB cable? The **ESP32-OTA-File-management** project provides a robust, web-based solution to this problem, turning your ESP32 into a self-contained management portal.

This project leverages the asynchronous capabilities of the ESP32 to provide a smooth user experience for three primary tasks: updating the application firmware, flashing entire filesystem partitions, and managing individual files stored on the device. By using the `ESPAsyncWebServer` library, the device remains responsive even during complex file operations.

### Key Capabilities

The utility is divided into three main functional areas:

1.  **Firmware Updates**: Users can generate a compiled binary (`.bin`) file in the Arduino IDE and upload it directly through the web browser. The ESP32 then handles the internal flashing process and reboots into the new version automatically.
2.  **SPIFFS Image Uploads**: Beyond just code, you can update the entire data partition. By using tools like `mkspiffs`, you can package a folder of assets (HTML, CSS, JS, or config files) into a single `spiffs.bin` and flash it to the device's storage area.
3.  **Live File Management**: The interface allows you to browse the current files stored in the SPIFFS filesystem, delete obsolete files, or upload new ones individually without reflashing the whole partition.

### Technical Implementation

The project is built on the Arduino framework for ESP32 and utilizes several core libraries. It uses `Update.h` for the partition-writing logic and `SPIFFS.h` for filesystem interaction. A critical component of this setup is the partition table; as the README notes, users must ensure their partition table is configured to support OTA (Over-The-Air) updates, which typically requires having two 'app' slots so the device can boot into one while writing to the other.

For those using high-capacity modules, such as the 16MB ESP32 chips, the project demonstrates how to maximize storage for large web assets or data logs. 

### Getting Started

To deploy this on your own hardware, you need to configure your local network credentials in the sketch:

```cpp
const char* ssid = "YOUR_SSID";
const char* password = "YOUR_PASSWORD";
```

Once flashed, the device becomes accessible via `esp32.local/` (using mDNS) or its assigned IP address. For developers looking to package their web files, the project suggests using the `mkspiffs` tool with specific parameters to match your partition size:

```bash
mkspiffs -c ./data -b 4096 -p 256 -s 0x6F0000 spiffs.bin
```

This workflow is particularly useful for developers building IoT devices that require frequent UI tweaks or remote maintenance, providing a professional-grade management interface with minimal overhead.
