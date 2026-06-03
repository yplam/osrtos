---
title: HTTP Server from SD Card for ESP8266
summary: An embedded web server for the ESP8266 platform based on the Espressif NONOS_SDK.
  It allows serving static assets and firmware updates directly from an SD card using
  FatFS and a modified version of the esp_http_server component.
slug: http-server-from-sd-card-for-esp8266
codeUrl: https://github.com/slacky1965/http_server_from_sdcard
star: 2
lastUpdated: '2022-04-10'
rtos: ''
libraries:
- lwip
topics:
- delete-files
- esp8266
- esphttpdlib
- fatfs
- nonos-sdk
- ota-update
- sdcard
- upload-files
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- esp-async-http-update-server
- esp8266sdupdater
- esp-fs-webserver
- sd-card-spi-fatfs-for-esp8266-nonos-sdk
- esp32-async-web-server-with-spiffs-and-ota
- simpleftpserver-library
---

## Overview

The `http_server_from_sdcard` project is a specialized implementation for the ESP8266 microcontroller that transforms the device into a functional web server capable of serving content directly from an SD card. Built on top of the Espressif NONOS_SDK, this project addresses the storage limitations of the ESP8266's internal flash by utilizing the FatFS library to interface with external storage.

This implementation is particularly useful for IoT applications that require a rich user interface with multiple HTML, CSS, and JavaScript files that would otherwise exceed the available internal memory. By serving these files from an SD card, developers can create more complex web-based dashboards and configuration portals.

## Key Features

- **SD Card Integration**: Uses the FatFS library to manage files on an external SD card, allowing for large web assets.
- **Dynamic File Overriding**: Standard files such as `index.html`, `favicon.ico`, `style.css`, and `scripts.js` can be overridden by simply uploading new versions with the same names to the SD card.
- **Web-Based File Management**: Includes a built-in upload form that allows users to transfer files to the server via a web browser.
- **OTA Firmware Updates**: Supports Over-the-Air (OTA) updates, enabling users to upload new firmware images directly through the web interface.
- **Modified HTTP Component**: Utilizes a customized version of the `esp_http_server` component to handle URI matching and file serving logic efficiently.

## Technical Implementation

The project is structured around the ESP8266 NONOS_SDK, which uses an event-driven programming model rather than a traditional RTOS. The build system is managed via a comprehensive `Makefile` and auxiliary scripts (`gen_misc.sh` and `gen_misc.bat`) that handle the complexities of the ESP8266 memory map and SPI flash configurations.

**Core components include:**
- **FatFS**: The filesystem layer that provides the bridge between the SPI hardware and the HTTP server.
- **libesphttpd**: A library providing the core HTTP server functionality, modified here to support the SD card backend.
- **lwIP**: The underlying TCP/IP stack used by the NONOS_SDK for network communication.

## Getting Started

To deploy the server, developers need to clone the repository into their ESP8266 SDK environment. Configuration is primarily handled in `project/user/include/wifi.h`, where network credentials and local IP settings are defined.

### Build and Flash

The project provides a standard workflow for compilation and deployment:
1. Configure WiFi settings in `wifi.h`.
2. Run `make all` to compile the application binaries.
3. Use `make flash` to download the firmware to the ESP8266 module.

Once running, the server is accessible via its IP address. Users can navigate to the root directory to see the default HTML page, which includes the interface for uploading new web assets or firmware images. This makes the system highly flexible, as the look and feel of the web interface can be updated without re-flashing the entire device via a serial connection.
