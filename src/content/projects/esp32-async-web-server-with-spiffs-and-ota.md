---
title: ESP32 Async Web Server with SPIFFS and OTA
summary: A comprehensive ESP32 application demonstrating an asynchronous web server
  that serves content from the SPIFFS filesystem. It features a web-based file manager,
  user authentication, and integrated Over-The-Air (OTA) firmware updates.
codeUrl: https://github.com/har-in-air/ESP32_ASYNC_WEB_SERVER_SPIFFS_OTA
isShow: false
rtos: freertos
libraries:
- spiffs
topics:
- access-point
- arduino
- async
- dns
- esp32
- ota
- platformio
- spiffs
- visual-studio-code
- webserver
star: 16
lastUpdated: '2021-08-09'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp32-ota-firmware-update-and-file-management
- esp-async-http-update-server
- esp-fs-webserver
- esp32-webserver-with-firebase-integration
- esp32-asyncwebserver-file-upload-example
- esp32-web-server-using-spiffs
---

Developing for the ESP32 often involves creating a web interface to interact with the device. This project, **ESP32_ASYNC_WEB_SERVER_SPIFFS_OTA**, provides a robust template for building a high-performance, asynchronous web server that handles everything from basic file serving to remote firmware updates.

### Project Overview

At its core, this project is a "mashup" of several popular ESP32 web server implementations, refined to include advanced features like Over-The-Air (OTA) updates and chunked file downloads. By utilizing the `ESPAsyncWebServer` library, the system can handle multiple simultaneous connections without blocking the main execution loop, making it ideal for responsive IoT applications.

### Key Features & Capabilities

- **Asynchronous Web Server**: Built on `AsyncTCP` and `ESPAsyncWebServer`, the server is non-blocking and efficient.
- **SPIFFS File Management**: The project includes a full-featured web interface for managing files stored in the SPIFFS partition. Users can list, upload, download, and delete files directly from their browser.
- **OTA Firmware Updates**: The system intelligently handles file uploads. If a user uploads a `.bin` file, the server processes it as a firmware update rather than a standard file storage operation.
- **Access Control**: Security is handled via a login page requiring a username and password, ensuring that only authorized users can modify the filesystem or update the firmware.
- **mDNS Support**: Users can access the device via `http://esp32.local` instead of tracking dynamic IP addresses.
- **Dynamic UI**: The HTML and CSS files are hosted on SPIFFS. This allows developers to tweak the look and feel of the web interface without needing to recompile the entire binary.

### Technical Details

The project is developed using **Visual Studio Code** with the **PlatformIO** plugin, targeting the Espressif ESP32 Arduino framework. Because the ESP32 Arduino core runs on top of **FreeRTOS**, the asynchronous nature of the web server integrates seamlessly with the underlying RTOS tasks.

To accommodate both the firmware and the filesystem, the project uses a custom partition table defined in `min_spiffs.csv`. This configuration is optimized for 4MB flash modules, providing larger OTA code partitions while maintaining a smaller SPIFFS area for web assets.

### Getting Started

To deploy this project, you need to follow a specific sequence in PlatformIO to ensure the filesystem and firmware are correctly synchronized:

1. **Erase Flash**: Use `Platformio -> Project Tasks -> Platform -> Erase Flash` before the first upload.
2. **Build Filesystem**: Use `Build Filesystem Image` to package the contents of the `/data` directory (HTML, CSS, images) into a SPIFFS binary.
3. **Upload Filesystem**: Use `Upload Filesystem Image` to flash the SPIFFS partition to the ESP32.
4. **Upload Firmware**: Finally, use the standard `Upload` task to flash the application code.

### Configuration

The project supports two primary network modes: connecting to an existing Access Point (Station mode) or acting as a standalone Access Point. These configurations allow the ESP32 to be deployed in various environments, from home automation setups to isolated industrial sensors.

By separating the web assets (HTML/CSS) from the application logic, this repository serves as an excellent starting point for any developer looking to build a professional-grade web interface for their ESP32 projects.
