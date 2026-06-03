---
title: EasyINI
summary: EasyINI is a lightweight utility library for ESP8266 and ESP32 platforms
  designed to simplify reading and writing configuration data in .ini file format.
  It leverages the SPIFFS (Serial Peripheral Interface Flash File System) to provide
  a persistent storage solution for key-value pairs organized into sections.
codeUrl: https://github.com/bvujovic/EasyINI
isShow: false
rtos: ''
libraries:
- spiffs
topics:
- arduino
- esp
- esp32
- esp8266
- ini-parser
- spiffs
star: 1
lastUpdated: '2020-04-18'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- effortless-spiffs
- esp8266-littlefs-file-handler
- configassist-esp32-esp8266
- settings-manager
- esp8266-config-data-management
- spiffs-for-esp8266-non-os-sdk
---

Managing configuration settings on microcontrollers like the ESP8266 can often be a cumbersome task. Developers frequently resort to hardcoding values or implementing custom parsing logic for simple key-value pairs. **EasyINI** is a utility library specifically designed to streamline this process for the ESP8266 and ESP32 ecosystems by providing a simple interface for reading and writing `.ini` files stored on the SPIFFS (Serial Peripheral Interface Flash File System).

### Why Use INI Files?
While JSON and XML are popular for data exchange, the INI format remains a favorite for configuration due to its human-readable structure and low overhead. It organizes data into sections and key-value pairs, making it easy for developers to manage settings like Wi-Fi credentials, API keys, or device thresholds without the parsing complexity of more nested formats. EasyINI brings this classic, reliable format to the world of embedded ESP development.

### Seamless SPIFFS Integration
EasyINI is built to work directly with the ESP's onboard flash memory. By utilizing SPIFFS, the library ensures that configuration data persists across reboots and firmware updates. This makes it an ideal choice for IoT projects where device-specific settings need to be modified at runtime or stored securely in the local file system. The repository includes sample `.ini` files in the `data` directory, demonstrating how to structure sections and keys for different use cases.

### Getting Started with EasyINI
The library is structured for use within the PlatformIO or Arduino IDE environments. To use it, you simply need to initialize the SPIFFS file system and then use the EasyINI class to interact with your configuration files. 

Typical operations include:
- **Initialization**: Setting up the file system and pointing the library to your target `.ini` file.
- **Reading**: Retrieving values by providing the section name and the specific key.
- **Writing**: Updating or creating new entries to ensure your device state is saved.

### Technical Details and Hardware Support
The project is primarily configured for the **Espressif ESP8266** platform, specifically tested on boards like the NodeMCU v2 and D1 Mini Lite. It uses the Arduino framework, ensuring compatibility with a wide range of existing libraries and community examples. The provided `platformio.ini` configuration suggests a standard setup for 1MB flash with 128KB SPIFFS allocation (`eagle.flash.1m128.ld`), which is a common configuration for these modules.

Whether you are building a weather station, a home automation node, or a custom sensor, EasyINI provides the "set it and forget it" simplicity needed for robust configuration management on resource-constrained hardware.
