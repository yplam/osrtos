---
title: ESP32_W5500_Manager
summary: A comprehensive connection and credential manager for ESP32 boards using
  the W5500 Ethernet controller and LwIP. It provides a fallback web configuration
  portal for runtime setup of static or DHCP IP addresses, custom parameters, and
  NTP settings, supporting storage via LittleFS or SPIFFS.
codeUrl: https://github.com/khoih-prog/ESP32_W5500_Manager
siteUrl: https://github.com/khoih-prog/ESP32_W5500_Manager
isShow: false
rtos: freertos
libraries:
- lwip
- littlefs
- spiffs
topics:
- credential-manager
- credentials
- dhcp-hostname
- esp32
- esp32-c3
- esp32-s2
- esp32-s3
- hostname
- lwip
- lwip-ethernet
- lwip-w5500
- staticip
- support-arduinojson
- sync
- w5500
- web-portal
- webserver-esp32-w5500
star: 6
version: v1.0.0
lastUpdated: '2022-12-11'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp8266-w5500-manager
- asyncesp8266-w5500-manager
- esp8266-w5100-manager
- asyncesp8266-w5100-manager
- esp8266-enc-manager
- asyncesp32-sc-ethernet-manager
---

Managing network credentials in embedded systems often leads to a common frustration: hardcoding IP addresses and settings into the source code. The **ESP32_W5500_Manager** library solves this by providing a robust connection manager for ESP32 devices paired with the W5500 Ethernet controller. By leveraging the LwIP stack, it allows developers to configure Ethernet settings—including Static IP, DHCP, and custom application parameters—at runtime through a user-friendly web interface.

## Why Use ESP32_W5500_Manager?

In many industrial or IoT scenarios, an ESP32 needs a reliable wired connection via Ethernet. However, deploying these devices across different networks with varying IP requirements can be a logistical nightmare. This library introduces a 'ConfigPortal'—a fallback web server that appears when the device cannot connect or when triggered by a physical switch or a double-reset. This portal allows users to input network details, which are then saved to the ESP32's internal flash memory (using LittleFS or SPIFFS) for subsequent boots.

## Key Features and Capabilities

- **Dynamic Connection Management**: Switch between DHCP and Static IP without reflashing the firmware.
- **Custom Parameters**: Beyond just network settings, you can define custom fields (like API keys or sensor thresholds) to be configured via the web portal.
- **NTP and Timezone Support**: Built-in support for NTP configuration, including a helper to convert timezone names (e.g., "America/New_York") into POSIX TZ strings.
- **Double Reset Detector (DRD)**: Trigger the configuration portal by simply pressing the reset button twice within a short window.
- **CORS Support**: Includes Cross-Origin Resource Sharing features for modern web integration.
- **Filesystem Flexibility**: Compatible with LittleFS, SPIFFS, and FFat for storing configuration data in JSON format.

## Technical Architecture

The library is built on top of the `WebServer_ESP32_W5500` and `LwIP_ESP32` stack. It utilizes `ArduinoJson` to serialize and deserialize configuration data, ensuring that settings are portable and easy to manage. One of the unique aspects of this library is its handling of the W5500 hardware, providing a seamless experience for those using the popular Wiznet chip with Espressif's powerful MCU.

## Getting Started

To integrate the manager into your project, you typically initialize the `ESP32_W5500_Manager` object and call the `startConfigPortal` method when a configuration change is needed. Below is a basic example of how the library is structured in a sketch:

```cpp
#include <ESP32_W5500_Manager.h>

// Initialize the manager with a custom HostName
ESP32_W5500_Manager ESP32_W5500_manager("My-ESP32-Ethernet");

void setup() {
  Serial.begin(115200);
  
  // This will start the portal if no credentials exist or if triggered
  if (!ESP32_W5500_manager.autoConnect()) {
    Serial.println("Failed to connect and hit timeout");
    ESP_restart();
  }

  Serial.println("Connected to Ethernet!");
}

void loop() {
  // Your application logic here
}
```

## Advanced Customization

One of the most powerful features is the ability to add dynamic parameters. If your project requires a ThingSpeak API key or a specific GPIO pin configuration, you can add these to the portal with just a few lines of code. The library handles the HTML generation for the input fields and provides the hooks to save these values into a JSON file on the flash filesystem.

For developers concerned about memory usage, the library allows you to selectively enable timezone regions (e.g., `USING_AMERICA`, `USING_EUROPE`) to save flash space. It also provides specific guidance on avoiding common ESP32 pitfalls, such as the ADC2 conflict with WiFi/Ethernet functions, ensuring your analog sensors continue to work correctly while the network stack is active.
