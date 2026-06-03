---
title: ESP8266 DHT22 SPIFFS Demo
summary: A demonstration project for ESP8266 microcontrollers featuring DHT22 sensor
  integration and a web-based file manager using SPIFFS. It provides a secure web
  interface with Basic Authentication for monitoring environmental data and managing
  static files on the device's flash storage.
slug: esp8266-dht22-spiffs-web-server
codeUrl: https://github.com/Deliaz/ESP8266-DHT-SPIFFS
siteUrl: https://github.com/esp8266/arduino-esp8266fs-plugin
star: 2
lastUpdated: '2018-05-01'
rtos: ''
libraries:
- spiffs
topics:
- arduino
- dht22
- esp8266
- spiffs
- web-interface
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp8266-web-server-and-spiffs-integration
- esp32-web-server-using-spiffs
- esp8266-config-data-management
- esp-datalogger-with-firebase-and-spiffs
- easy-iot-file-system
- esp32-async-web-server-with-spiffs-and-ota
---

The ESP8266-DHT-SPIFFS project is a comprehensive demonstration of the ESP8266's capabilities as a standalone IoT node. It combines environmental sensing, local file storage, and a robust web interface into a single application, specifically tested on the Wemos D1 mini (V2) hardware.

At its core, the project serves two primary purposes: monitoring temperature and humidity using a DHT22 sensor and providing a web-based file management system. By utilizing the SPIFFS (Serial Peripheral Interface Flash File System), the device can store static web assets like HTML, CSS, and JavaScript files directly on its internal flash memory, allowing for a rich user interface without external hosting.

### Integrated Web Server and File Management

The project implements a web server listening on port 8080. One of its standout features is the integration of a file browser and editor, based on the ESP8266 FSBrowser example. This allows users to upload, delete, and modify files on the SPIFFS partition directly through their web browser. To ensure security, the `/edit` endpoint is protected by Basic Authentication, requiring a username and password defined in the project's configuration.

### Sensor Integration and Data Handling

For environmental monitoring, the project utilizes the Adafruit DHT Unified Sensor library. It reads data from a DHT22 sensor connected to the D4 pin. To ensure stability and prevent the sensor from being polled too frequently, the project employs the `CreateTimer` library to implement a debounce mechanism, updating sensor values every five seconds. This prevents the common issues associated with the DHT22's slow response time and potential read errors.

The system exposes a JSON endpoint at `/all`, which provides real-time diagnostic and sensor data, including:
- Current heap memory status
- Temperature readings
- Humidity levels
- WiFi signal strength (RSSI)

### Technical Implementation Details

The firmware is built on the Arduino core for ESP8266 and leverages several key components:
- **mDNS Support**: The device can be reached via a local hostname (e.g., `esp8266fs.local`) instead of just an IP address, simplifying network access.
- **OTA Updates**: Support for ArduinoOTA allows for wireless firmware updates, making it easier to maintain the device once it is deployed in a hard-to-reach location.
- **Gzip Support**: The file server is capable of serving compressed `.gz` files. This is a critical feature for ESP8266 projects, as it significantly reduces the footprint of web assets on the limited flash storage.

### Getting Started

To deploy this project, users need to configure their network and security settings in a `credentials.h` file, which can be created from the provided `credentials-example.h` template. After flashing the firmware, the static web files located in the `data` directory must be uploaded to the SPIFFS partition using the ESP8266 Sketch Data Upload plugin for the Arduino IDE. Once running, the device provides a full-featured dashboard for monitoring and file management accessible via the board's IP address on port 8080.
