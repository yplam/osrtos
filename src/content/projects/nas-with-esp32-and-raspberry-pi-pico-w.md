---
title: NAS with ESP32 and Raspberry Pi Pico W
summary: A network-attached storage (NAS) solution for ESP32 and Raspberry Pi Pico
  W microcontrollers. It provides a web-based interface for file management, including
  drag-and-drop uploads, downloads, and deletions using an SD card for storage. The
  project supports both Wi-Fi station and access point modes with optional authentication
  and logging features.
slug: nas-with-esp32-and-raspberry-pi-pico-w
codeUrl: https://github.com/akashdip2001/NAS-with-ESP32
star: 11
lastUpdated: '2025-06-01'
rtos: freertos
topics:
- esp32
- iot
- iot-device
- nas
- network-attached-storage
- project
isShow: false
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- espxwebflmgr
- raspberry-pi-pico-web-server-control
- wi-fi-setup-for-raspberry-pi-pico-w-via-usb-mass-storage
- esp32-ota-firmware-update-and-file-management
- multiftpserver-library
- esp32-web-server-using-spiffs
---

## Overview

The NAS-with-ESP32 project transforms popular microcontrollers like the ESP32 and Raspberry Pi Pico W into functional Network-Attached Storage (NAS) devices. By leveraging the built-in Wi-Fi capabilities of these SoCs and an external SD card module, this project creates a portable, low-power file server. It is designed for users who need a simple way to store, share, and manage files over a local network without the overhead of a full-scale server or PC.

## Key Features and Capabilities

The project offers a robust set of features for file management through a modern web interface. Users can interact with the storage via a browser, making it platform-independent. 

**Core functionalities include:**
- **Web-Based File Explorer:** View a list of all files stored on the SD card directly in your browser.
- **Drag & Drop Uploads:** A user-friendly interface for adding files to the storage.
- **File Operations:** Support for downloading and deleting files remotely.
- **Dual Network Modes:** The system can either connect to an existing Wi-Fi network (Station Mode) or create its own hotspot (Access Point Mode).
- **Logging System:** A persistent logging mechanism that records file activities to a `logs.txt` file on the SD card, with a live preview available via Server-Sent Events (SSE).
- **Authentication:** Experimental support for HTTP Basic Authentication to protect sensitive operations like uploading and deleting.

## Technical Architecture

The project is built using the Arduino framework, utilizing asynchronous web server libraries to ensure the device remains responsive even during heavy file transfers. 

### Hardware Integration
For the ESP32 implementation, the project uses the standard SPI interface to communicate with the SD card module. The Raspberry Pi Pico W version uses the `SDFS` library, specifically optimized for the RP2040's architecture. Both implementations require a MicroSD card formatted as FAT32.

### Software Stack
- **ESPAsyncWebServer:** Used for handling HTTP requests asynchronously, which is critical for maintaining network stability on resource-constrained microcontrollers.
- **AsyncTCP / AsyncEventSource:** Enables real-time features like live log updates without requiring the client to refresh the page.
- **SPI & SD Libraries:** Handle the low-level file system operations on the physical storage media.

## Getting Started

To deploy the NAS system, developers need to flash the provided firmware to their respective board. The project includes specific versions for connecting to a router or acting as a standalone access point.

### Example: Basic File Server Setup

```cpp
#include <WiFi.h>
#include <SPI.h>
#include <SD.h>
#include <ESPAsyncWebServer.h>

// Define SD Card pins
#define SD_CS    5

AsyncWebServer server(80);

void setup() {
  Serial.begin(115200);
  WiFi.begin("Your_SSID", "Your_PASSWORD");
  
  if (!SD.begin(SD_CS)) {
    Serial.println("SD Card Mount Failed");
    return;
  }

  // Serve the UI
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(SD, "/index.html", "text/html");
  });

  server.begin();
}
```

Once the firmware is running, users can upload an `index.html` file to the SD card to serve as the primary dashboard. The dashboard uses JavaScript to communicate with the RESTful endpoints provided by the ESP32, such as `/files` for listing and `/upload` for storage.

## Advanced Configurations

For users requiring more control, the project provides snippets for fixing the IP address in Access Point mode (typically `192.168.4.1`). It also includes a dedicated logging endpoint (`/logs`) that uses SSE to stream server events, providing a real-time look at who is accessing or modifying files on the device. This makes it an excellent tool for both simple storage and educational purposes in learning about network protocols and embedded file systems.
