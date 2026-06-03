---
title: AsyncESP8266_W5500_Manager
summary: A comprehensive connection and credentials manager for ESP8266 boards equipped
  with W5500 Ethernet shields. It features an asynchronous web configuration portal
  for runtime network setup, supporting DHCP, static IP, and custom parameters stored
  via LittleFS or SPIFFS.
codeUrl: https://github.com/khoih-prog/AsyncESP8266_W5500_Manager
siteUrl: https://github.com/khoih-prog/AsyncESP8266_W5500_Manager
isShow: false
rtos: ''
libraries:
- littlefs
- spiffs
- lwip
topics:
- async
- async-dns-server
- async-manager
- config-portal
- credential-manager
- credentials
- dhcp-hostname
- double-reset-detector
- esp8266
- hostname
- littlefs
- lwip-ethernet
- lwip-w5500
- nodemcu
- nodemcu-esp8266
- staticip
- support-arduinojson
- w5500
- web-portal
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp8266-w5500-manager
- asyncesp8266-w5100-manager
- asyncesp8266-enc-manager
- esp32-w5500-manager
- esp8266-w5100-manager
- asyncesp32-sc-ethernet-manager
---

Managing network credentials on embedded devices can be a logistical challenge, especially when hardware is deployed in environments where network settings like static IPs or gateway addresses might change. The **AsyncESP8266_W5500_Manager** library provides a robust solution for developers using the ESP8266 platform paired with W5500 Ethernet shields. By leveraging the power of asynchronous networking, it allows for a seamless configuration experience without blocking the main application loop.

### Why Asynchronous Management Matters
Traditional web-based configuration portals often rely on synchronous web servers that can only handle one connection at a time and block execution while waiting for client responses. This library utilizes the `ESPAsyncWebServer`, which offers significant performance advantages. It can handle multiple simultaneous connections, serves content with much higher speed, and allows the ESP8266 to remain responsive to other tasks while the server manages the response in the background. This is particularly critical for IoT applications that must maintain sensor readings or control loops while a user is interacting with the configuration interface.

### Core Functionality and Features
The library acts as a bridge between the ESP8266's LwIP stack and the W5500 Ethernet controller. Its primary purpose is to provide a fallback Web ConfigPortal. If the device cannot connect to the network using stored credentials, or if a specific trigger (like a double reset or a physical button press) is detected, the device launches an Access Point. Users can then connect to this AP via a browser to configure:

*   **Network Mode**: Toggle between DHCP and Static IP.
*   **IP Settings**: Configure Station IP, Gateway, Subnet Mask, and DNS servers.
*   **Custom Parameters**: Developers can add their own fields, such as API keys for ThingSpeak or MQTT broker addresses, which are then saved to the filesystem.
*   **Timezone and NTP**: Integrated support for configuring timezones and NTP servers, including CloudFlare NTP.
*   **CORS Support**: Cross-Origin Resource Sharing can be enabled for modern web integration.

### Technical Architecture
The library is designed to be flexible with storage, supporting both `LittleFS` and the legacy `SPIFFS` for persisting configuration data. Settings are typically stored in JSON format, making them easy to parse and extend. It also integrates with the `ESP_DoubleResetDetector` library, allowing users to trigger the configuration portal simply by pressing the reset button twice within a short window—a common pattern for devices without dedicated 'config' buttons.

### Getting Started
To implement the manager in an Arduino sketch, you first define your filesystem and include the library headers. The library uses a unique implementation style (using `.hpp` and `_Impl.h` files) to avoid multiple definition errors in complex projects. 

```cpp
#include <LittleFS.h>
#include <AsyncESP8266_W5500_Manager.h>

AsyncWebServer webServer(80);
AsyncDNSServer dnsServer;

// Initialize the manager with a personalized hostname
AsyncESP8266_W5500_Manager ethManager(&webServer, &dnsServer, "My-ESP8266-Device");

void setup() {
  // Start the configuration portal if needed
  ethManager.startConfigPortal();
}
```

### Hardware Compatibility
This library is specifically tailored for **ESP8266** development boards (like the NodeMCU or Wemos D1 Mini) when they are interfaced with a **Wiznet W5500** Ethernet module. This combination is popular for projects requiring the reliability of a wired connection alongside the ease of the ESP8266 ecosystem. By providing a standardized way to manage these connections, the library ensures that even 'headless' Ethernet devices can be easily configured by end-users without needing to re-flash the firmware.
