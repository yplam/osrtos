---
title: ConfigAssist-ESP32-ESP8266
summary: A lightweight configuration management library for ESP32 and ESP8266 that
  automates variable definition using YAML. It generates a responsive web portal for
  real-time editing and automatically manages storage via .ini files on SPIFFS or
  LittleFS.
codeUrl: https://github.com/gemi254/ConfigAssist-ESP32-ESP8266
isShow: false
rtos: ''
libraries:
- littlefs
- spiffs
topics:
- access-point
- arduino
- arduino-library
- assistant
- captive-portal
- config
- configuration
- esp32
- esp8266
- esp8266-arduino
- ini
- ota-update
- preferences
- responsive
- spiffs
- storage
- variables
- webconfig
- webserver
- yaml
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp-fs-webserver
- easyini
- bleeper
- autonetwork-library
- blynk-wifimanager
- rtkrovermanager
---

Managing configuration settings on embedded devices like the ESP32 and ESP8266 often involves a repetitive cycle of writing web handlers, creating HTML forms, and managing flash storage. **ConfigAssist** is a lightweight library designed to break this cycle by providing a comprehensive, automated configuration management system. By defining application variables in a simple YAML format, developers can instantly generate a responsive web portal to edit settings, which are then automatically saved to the device's local storage.

### The Core Philosophy: YAML to UI
At the heart of ConfigAssist is the idea that configuration should be declarative. Instead of writing boilerplate code for every new setting, you define your variables in a YAML dictionary. This dictionary acts as a template, specifying the variable type, label, default value, and UI attributes. ConfigAssist then takes this definition and generates a web interface featuring various HTML controls—such as edit boxes, password fields, checkboxes, dropdown lists, and even range sliders.

When a user modifies a value in the web portal, the library uses asynchronous JavaScript (AJAX) requests to update the device's memory instantly. Once the user finishes editing or leaves the page, the data is automatically persisted to an `.ini` file in the internal storage (SPIFFS or LittleFS).

### Key Features and Capabilities
ConfigAssist is more than just a form generator; it includes several built-in utilities that address common pain points in IoT development:

*   **Wi-Fi Management:** The library can perform Wi-Fi scans to populate dropdown lists with nearby access points, sorted by signal strength. It also includes a "Test connection" feature that allows the device to validate credentials in `WIFI_AP_STA` mode without dropping the current Access Point connection.
*   **Time Synchronization:** Even without an internet connection or NTP server, ConfigAssist can synchronize the ESP device's internal clock with the browser's clock when the configuration page is accessed.
*   **Firmware Updates (OTA):** It supports both local web-based OTA updates (uploading a `.bin` file) and automated firmware checks over the internet, comparing the current version against a remote server.
*   **Logging:** The library includes a logging macro system (`LOG_E`, `LOG_W`, `LOG_I`) that can redirect serial output to a file in flash storage, complete with timestamps.

### Technical Implementation
To ensure high performance on resource-constrained microcontrollers, ConfigAssist uses C++ vectors to dynamically allocate variables and employs binary search algorithms to speed up access. On subsequent boots, if a valid `.ini` file exists, the library skips loading the heavy YAML dictionary to save memory and decrease startup time.

### Getting Started
Using ConfigAssist in an Arduino sketch is straightforward. First, define your variables in a PROGMEM string:

```c
const char* VARIABLES_DEF_YAML PROGMEM = R"~(
Wifi settings:
  - st_ssid:
      label: Name for WLAN
  - st_pass:
      label: Password for WLAN
Application settings:
  - app_name:
      label: Name your application
      default: MyESPDevice
)~";
```

Then, initialize the class and access your variables using the `()` operator:

```c
ConfigAssist conf("/config.ini", VARIABLES_DEF_YAML);

void setup() {
  conf.setup(server, true); // Setup web server handlers and start AP
  String ssid = conf("st_ssid");
  int pin = conf("led_builtin").toInt();
}
```

For developers looking to simplify network connectivity further, the library includes a `ConfigAssistHelper` class. This helper automates connecting to Wi-Fi using the credentials stored in the configuration, handling failover connections, and setting static IPs if defined.

### Conclusion
ConfigAssist-ESP32-ESP8266 is a robust tool for developers who want to focus on their application logic rather than the minutiae of configuration UI and storage. Its ability to handle everything from Wi-Fi validation to OTA updates makes it an excellent foundation for any ESP-based IoT project.
