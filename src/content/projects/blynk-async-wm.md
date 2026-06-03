---
title: Blynk_Async_WM
summary: An asynchronous WiFi and Blynk configuration manager for ESP8266 and ESP32
  platforms. It leverages ESPAsyncWebServer to provide a non-blocking configuration
  portal with support for multi-WiFi/multi-Blynk credentials, SSL, and persistent
  storage via LittleFS, SPIFFS, or EEPROM.
codeUrl: https://github.com/khoih-prog/Blynk_Async_WM
isShow: false
rtos: freertos
libraries:
- littlefs
- spiffs
topics:
- async
- asyncwebserver
- blynk
- blynk-library
- blynk-server
- config-portal
- dhcp
- dynamic-parameters
- eeprom
- esp32
- esp32-c3
- esp32-s2
- esp8266
- littlefs
- multiblynk
- multiwifi
- spiffs
- ssl
- staticip
- wifimanager
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- blynk-async-esp32-bt-wf
- blynk-wifimanager
- blynk-async-gsm-manager
- asyncesp8266-w5500-manager
- blynk-wifinina-wm
- blynkgsm-manager
---

For developers working with ESP8266 and ESP32, managing WiFi and Blynk credentials often involves the tedious cycle of hardcoding strings and reflashing firmware whenever network environments change. **Blynk_Async_WM** is designed to eliminate this friction by providing a powerful, asynchronous WiFiManager that handles network and service configuration at runtime.

### Why Go Asynchronous?
Traditional WiFi managers often rely on blocking web servers, which can halt your main application loop while waiting for user input or network responses. Blynk_Async_WM utilizes the `ESPAsyncWebServer` library, which offers several critical advantages:
- **Concurrency**: Handle more than one connection simultaneously.
- **Speed**: Asynchronous handling is significantly faster and more responsive.
- **Non-blocking**: The server processes requests in the background, allowing your RTOS tasks or main loop to continue executing without interruption.

### Key Features and Capabilities
The library is more than just a simple configuration portal; it is a robust connection management system. It supports **Multi-WiFi** and **Multi-Blynk** features, meaning the system can automatically detect and connect to the best available WiFi AP or Blynk server. This is particularly useful for high-reliability systems where a secondary failover network is required.

Security is also addressed through an "insecure" SSL mode. While it sounds counterintuitive, this mode allows devices to connect to TLS servers (like Blynk Cloud) without the overhead of managing frequently expiring CA certificates, while still maintaining encrypted communication to prevent plain-text data exposure.

### Hardware and Storage Support
Blynk_Async_WM is highly versatile, supporting a wide range of hardware and storage backends:
- **Boards**: ESP8266, ESP32, ESP32-S2, and ESP32-C3.
- **Storage**: Configuration data can be saved to **LittleFS**, **SPIFFS**, or **EEPROM**.
- **Reset Detection**: Integration with `ESP_DoubleResetDetector` or `ESP_MultiResetDetector` allows users to force the configuration portal to open by simply toggling the reset button.

### Getting Started
Migrating to Blynk_Async_WM is straightforward for those already familiar with the standard Blynk library. You simply replace your standard Blynk headers with the Async WM equivalents. For example, on an ESP32 without SSL, you would change:

```cpp
// From this:
#include <BlynkSimpleEsp32.h>

// To this:
#include <BlynkSimpleEsp32_Async_WM.h>
```

In your `setup()` function, instead of passing credentials directly, you call `Blynk.begin()`. If the device cannot find valid stored credentials or a reset is detected, it automatically enters "Configuration Mode," starting its own Access Point. Users can then connect via a smartphone or PC to a portal (defaulting to `192.168.4.1`) to enter new credentials through a clean, customizable web interface.

### Advanced Customization
For professional applications, the library allows for extensive UI customization. Developers can inject custom HTML, CSS, and even CORS headers into the configuration portal. It also supports dynamic parameters, allowing you to capture additional user data—such as MQTT server addresses or custom device names—directly through the WiFi configuration screen.

Whether you are building a simple home automation project or a complex industrial IoT sensor, Blynk_Async_WM provides the reliability and ease of use necessary to keep your devices connected in a dynamic wireless world.
