---
title: AsyncESP32_SC_Ethernet_Manager
summary: An asynchronous Ethernet connection manager for ESP32-S2/S3/C3 microcontrollers.
  It utilizes the LwIP stack with W5500 or ENC28J60 controllers to provide a web-based
  configuration portal for managing network credentials and static IP settings at
  runtime.
codeUrl: https://github.com/khoih-prog/AsyncESP32_SC_Ethernet_Manager
isShow: false
rtos: freertos
libraries:
- lwip
- littlefs
- spiffs
topics:
- async
- async-dns-server
- config-portal
- credential-manager
- credentials
- dhcp-hostname
- esp32
- esp32-s2
- esp32-s3
- hostname
- lwip
- lwip-enc28j60
- lwip-ethernet
- lwip-w5500
- staticip
- support-arduinojson
- w5500
- web-portal
- webserver-esp32-sc-enc
- webserver-esp32-sc-w5500
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asyncesp8266-w5100-manager
- asyncesp8266-w5500-manager
- asyncesp8266-enc-manager
- esp8266-w5500-manager
- esp32-w5500-manager
- esp8266-enc-manager
---

Managing network credentials in embedded systems often involves a classic hurdle: how do you configure a device's network settings without hardcoding them into the firmware? The **AsyncESP32_SC_Ethernet_Manager** library provides a robust solution for the modern ESP32-S2, S3, and C3 chips when paired with wired Ethernet modules like the W5500 or ENC28J60.

### Why Asynchronous Management Matters
Traditional network managers often block the main execution loop while waiting for a connection or serving a configuration page. By leveraging the power of the `ESPAsyncWebServer`, this library allows the ESP32 to handle multiple connections simultaneously without stalling. This results in a significantly faster and more responsive user interface. When you send a response from the configuration portal, the server is immediately ready to handle other tasks in the background, making the "Speed is OMG" claim in the documentation a tangible reality for developers.

### Key Features and Capabilities
- **Runtime Configuration**: Change between DHCP and Static IP, set custom DNS servers, and define personalized hostnames without reflashing the device.
- **Fallback ConfigPortal**: If the device cannot connect to the network, it can automatically launch a web-based portal. This portal can also be triggered on-demand via a physical switch or a double-reset detection.
- **Dynamic Parameters**: Developers can easily add custom fields to the configuration page, such as API keys or sensor thresholds. These values are automatically saved to the onboard filesystem (LittleFS or SPIFFS) in JSON format.
- **Cross-Origin Resource Sharing (CORS)**: Includes support for CORS headers, which is essential for modern web integrations and security.
- **LwIP Stack Integration**: Specifically designed to work with the LwIP W5500 and ENC28J60 drivers on the newer ESP32 'S' and 'C' series.

### Hardware Support
The library is tailored for the latest generation of Espressif hardware, including:
- **ESP32-S3**: (DevKits, BOX, TinyS3, ProS3)
- **ESP32-S2**: (Saola, AI-Thinker ESP-12K)
- **ESP32-C3**: (DevKitC-02)

It supports the popular W5500 and ENC28J60 Ethernet controllers, providing a reliable wired alternative to WiFi for industrial or high-interference environments.

### Getting Started
To implement the manager, you initialize it alongside an `AsyncWebServer` and `AsyncDNSServer`. Below is a basic example of how to set up the manager in an Arduino sketch:

```cpp
#include <AsyncESP32_SC_Ethernet_Manager.h>

#define HTTP_PORT 80
AsyncWebServer webServer(HTTP_PORT);
AsyncDNSServer dnsServer;

// Initialize with an optional personalized hostname
AsyncESP32_SC_Ethernet_Manager ethManager(&webServer, &dnsServer, "My-ESP32-Device");

void setup() {
  // Start the configuration portal if needed
  ethManager.startConfigPortal();
}

void loop() {
  // The manager runs asynchronously; no heavy lifting required in loop()
}
```

### Advanced Customization
One of the most powerful aspects of this library is the ability to add dynamic parameters. For instance, if your project requires a ThingSpeak API key, you can define it as a parameter that appears in the web portal. The library handles the HTML generation for the input field and the subsequent saving of the data to the internal flash memory. This makes it an excellent choice for creating user-friendly IoT products where the end-user needs to input their own service credentials easily.
