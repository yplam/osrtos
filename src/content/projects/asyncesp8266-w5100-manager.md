---
title: AsyncESP8266_W5100_Manager
summary: An asynchronous Ethernet credentials and connection manager for ESP8266 boards
  using Wiznet W5100 or W5100S controllers. It provides a fallback web configuration
  portal for setting static or DHCP IP addresses, hostnames, and custom parameters
  at runtime using ESPAsyncWebServer.
codeUrl: https://github.com/khoih-prog/AsyncESP8266_W5100_Manager
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
- lwip-w5100
- nodemcu
- staticip
- support-arduinojson
- w5100
- w5100s
- web-portal
- lwip-w5100s
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asyncesp8266-enc-manager
- esp8266-w5100-manager
- asyncesp8266-w5500-manager
- asyncesp32-sc-ethernet-manager
- esp8266-w5500-manager
- esp8266-enc-manager
---

Managing network credentials and connection settings in embedded systems can be a significant hurdle, especially when devices are deployed in the field without easy access to a serial console. The **AsyncESP8266_W5100_Manager** library addresses this challenge for ESP8266-based projects utilizing Wiznet W5100 or W5100S Ethernet controllers. By providing a robust, asynchronous web configuration portal, it allows developers to configure Ethernet settings—such as Static vs. DHCP IP, DNS servers, and custom application parameters—at runtime.

### Why Asynchronous Management Matters
Traditional configuration managers often rely on synchronous web servers that block the main execution loop while handling requests. This library leverages the power of `ESPAsyncWebServer`, which offers several distinct advantages:
- **Concurrency**: It can handle multiple connections simultaneously without blocking the CPU.
- **Speed**: Asynchronous handling is significantly faster, providing a snappier user experience in the configuration portal.
- **Efficiency**: The server takes care of sending responses in the background, leaving the main loop free to handle critical application logic or sensor readings.

### Key Features and Capabilities
The library is more than just a simple connection manager; it is a comprehensive suite for device provisioning. Key features include:
- **Fallback ConfigPortal**: If the device fails to connect to the network, it can automatically launch an Access Point (AP) with a web portal for user configuration.
- **Dynamic Parameters**: Developers can easily add custom fields to the portal, such as API keys, sensor pins, or MQTT broker addresses, which are then saved to non-volatile storage.
- **Storage Flexibility**: It supports saving configuration data to `LittleFS` or `SPIFFS`, ensuring that settings persist across reboots.
- **Advanced Networking**: Support for personalized hostnames (RFC952-conformed), CORS (Cross-Origin Resource Sharing), and NTP configuration for time-sensitive applications.

### Hardware Compatibility
This library is specifically designed for **ESP8266 boards** paired with **LwIP W5100 or W5100S Ethernet** shields. It has been tested successfully with hardware like the Wiznet-Ethernet-Hat_RP2040 (using the W5100S). This makes it an ideal choice for industrial or home automation projects where a wired Ethernet connection is preferred over Wi-Fi for stability and security.

### Getting Started
To integrate the manager into your project, you typically initialize the `AsyncESP8266_W5100_Manager` alongside an `AsyncWebServer` and `AsyncDNSServer`. Below is a basic example of how to set up the manager in an Arduino sketch:

```cpp
#include <AsyncESP8266_W5100_Manager.h>

#define HTTP_PORT 80
AsyncWebServer webServer(HTTP_PORT);
AsyncDNSServer dnsServer;

// Initialize with a personalized hostname
AsyncESP8266_W5100_Manager manager(&webServer, &dnsServer, "My-Ethernet-Device");

void setup() {
  // Start the configuration portal if needed
  manager.startConfigPortal();
}

void loop() {
  // Your application logic here
}
```

### Advanced Configuration and Custom Parameters
One of the most powerful aspects of this library is the ability to define custom parameters that appear in the web interface. For instance, if your project requires a ThingSpeak API key, you can define an `ESPAsync_EMParameter` and add it to the manager. When the user saves their settings in the portal, the library captures these values, allowing you to save them to a JSON file on the filesystem using `ArduinoJson`.

This approach eliminates the need to hardcode sensitive credentials or environment-specific settings, making your firmware more portable and user-friendly. Whether you are building a professional IoT gateway or a hobbyist weather station, the AsyncESP8266_W5100_Manager provides the professional-grade connectivity management required for modern embedded applications.
