---
title: esp-fs-webserver
summary: A comprehensive Arduino library for ESP32 and ESP8266 that simplifies the
  implementation of web servers with integrated file management, WiFi configuration,
  and OTA updates. It enables hosting web assets directly from flash memory and includes
  a built-in code editor for runtime UI adjustments.
slug: esp-fs-webserver
codeUrl: https://github.com/cotestatnt/esp-fs-webserver
star: 145
version: 2.0.10
lastUpdated: '2025-12-08'
rtos: ''
libraries:
- littlefs
topics:
- arduino
- esp32
- esp32-arduino
- esp8266
- esp8266-arduino
- ffat
- filesystem
- littlefs
- spiffs
- web-editor
- webserver
- wifi-manager
- wifimanager
isShow: true
image: /202512/esp-fs-webserver.webp
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
---

The `esp-fs-webserver` library is a powerful tool for developers building web-based interfaces on ESP32 and ESP8266 microcontrollers. It evolved from the standard `FSBrowser.ino` examples found in the ESP core libraries, transforming a complex set of manual file-handling routines into a streamlined, object-oriented Arduino library. By abstracting the complexities of filesystem management and HTTP routing, it allows developers to focus on building responsive user interfaces rather than low-level server logic.

One of the primary advantages of this library is its ability to serve web assets—such as HTML, CSS, and JavaScript—directly from the device's internal flash memory or an external SD card. This approach allows for a clean separation between the embedded C++ backend and the web frontend, enabling developers to update the UI without necessarily recompiling the entire firmware.

### Integrated WiFi and Configuration Management

Beyond simple file serving, `esp-fs-webserver` includes a built-in `/setup` administrative page. This portal serves as a robust WiFi manager, allowing end-users to scan for available networks and configure credentials at runtime. This is particularly useful for IoT devices that need to be deployed in various network environments without hardcoding SSID and password information.

Additionally, the library features a custom options manager. Developers can define application-specific parameters, such as API keys, sensor calibration values, or MQTT broker addresses, which are stored in a `config.json` file on the filesystem. The library provides simple methods like `getOptionValue` and `saveOptionValue` to interact with these settings, leveraging the `ArduinoJson` library for efficient data handling.

### Remote Updates and Development Tools

Maintenance and development are significantly enhanced through integrated tools. The `/setup` interface supports remote firmware updates (OTA), allowing developers to push new code to devices over the network. 

For rapid prototyping, the library includes an optional ACE web file editor accessible via the `/edit` path. This tool provides a browser-based code editor that allows developers to upload, delete, and modify source files directly on the device. Because the web server serves these files dynamically, changes to the UI can be viewed immediately after saving, drastically reducing the development cycle time compared to traditional flash-based workflows.

### Technical Implementation and Flexibility

The library is designed to be flexible and platform-agnostic within the ESP ecosystem. While it defaults to using LittleFS—the modern standard for ESP32 and ESP8266 filesystems—it can be easily configured to use SPIFFS or other filesystem types. It integrates seamlessly with the standard Arduino WebServer implementations and is compatible with both the ESP32 and ESP8266 Arduino cores.

Developers can also extend the built-in pages by injecting custom HTML and JavaScript. This capability allows for the creation of sophisticated provisioning workflows, such as connecting a device to an IoT platform like ThingsBoard directly from the initial setup screen. The library's architecture ensures that these advanced features occupy a minimal footprint, with the setup page and code editor requiring only a few kilobytes of program space.
