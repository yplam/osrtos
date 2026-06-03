---
title: AsyncESP8266_ENC_Manager
summary: A high-performance asynchronous connection and credentials manager for ESP8266
  boards using the ENC28J60 Ethernet controller. It provides a fallback web configuration
  portal for runtime setup of DHCP/Static IP settings, hostnames, and custom application
  parameters stored in LittleFS or SPIFFS.
codeUrl: https://github.com/khoih-prog/AsyncESP8266_ENC_Manager
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
- enc28j60
- esp8266
- hostname
- littlefs
- lwip-enc28j60
- lwip-ethernet
- nodemcu
- nodemcu-esp8266
- staticip
- support-arduinojson
- web-portal
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asyncesp8266-w5100-manager
- asyncesp8266-w5500-manager
- esp8266-enc-manager
- esp8266-w5500-manager
- asyncesp32-sc-ethernet-manager
- esp8266-w5100-manager
---

While the ESP8266 is famous for its integrated WiFi capabilities, many industrial and hobbyist applications require the reliability of a wired connection. The **AsyncESP8266_ENC_Manager** library addresses a common pain point for these developers: managing network credentials and static IP configurations without hardcoding them into the firmware. By combining the ESP8266 with the ENC28J60 Ethernet controller, this library provides a robust 'Connection Manager' experience similar to popular WiFi managers but tailored for Ethernet.

### Why Asynchronous Management Matters

One of the standout features of this library is its reliance on the `ESPAsyncWebServer`. Traditional web servers on the ESP8266 are synchronous, meaning they block the execution of the main loop while processing requests. In contrast, an asynchronous approach allows the device to handle multiple connections simultaneously. This results in a significantly faster and more responsive configuration portal, which is especially noticeable when accessing the interface from modern smartphones or tablets.

### Key Features and Capabilities

- **Dynamic Configuration Portal**: If the device cannot connect to the network or if a manual trigger (like a double reset) is detected, the library can launch a web-based configuration portal.
- **Flexible IP Management**: Users can switch between DHCP and Static IP at runtime via the web interface. It also supports configurable DNS servers and personalized hostnames.
- **Custom Parameters**: Beyond network settings, developers can define custom fields (e.g., API keys, sensor pins, or MQTT topics) that are displayed in the portal and saved to the filesystem in JSON format.
- **Persistence**: Settings are stored in non-volatile memory using LittleFS or SPIFFS, ensuring that configurations survive power cycles.
- **CORS Support**: Includes Cross-Origin Resource Sharing features, allowing for more complex web integrations.

### Hardware Integration

The library is specifically designed for the **ESP8266** paired with the **ENC28J60** Ethernet module using the LwIP ENC28J60 driver. This setup is ideal for projects where WiFi is either unavailable or undesirable due to interference or security concerns.

### Getting Started

To implement the manager, you typically initialize the `AsyncESP8266_ENC_Manager` with a pointer to an `AsyncWebServer` and an `AsyncDNSServer`. Below is a basic example of how to set up the manager in an Arduino sketch:

```cpp
#include <AsyncESP8266_ENC_Manager.h>

#define HTTP_PORT 80
AsyncWebServer webServer(HTTP_PORT);
AsyncDNSServer dnsServer;

// Initialize with an optional personalized hostname
AsyncESP8266_ENC_Manager AsyncESP8266_ENC_manager(&webServer, &dnsServer, "My-Ethernet-Device");

void setup() {
  // Start the configuration portal if needed
  AsyncESP8266_ENC_manager.startConfigPortal();
}

void loop() {
  // The manager handles connections asynchronously in the background
}
```

### Advanced Customization

For developers needing to capture more than just IP addresses, the library's `ESPAsync_EMParameter` class allows for the creation of custom HTML elements within the portal. These parameters are easily serialized and deserialized using `ArduinoJson`, making it simple to integrate complex application settings into the same unified configuration flow. 

Whether you are building a wired IoT gateway or a localized sensor node, AsyncESP8266_ENC_Manager provides the middleware necessary to make your Ethernet-enabled ESP8266 project user-friendly and field-configurable.
