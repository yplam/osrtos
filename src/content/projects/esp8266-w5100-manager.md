---
title: ESP8266_W5100_Manager
summary: A connection and credentials manager for ESP8266 boards using Wiznet W5100/W5100S
  Ethernet controllers. It provides a fallback web configuration portal for runtime
  setup of network settings, custom parameters, and timezone data using LittleFS or
  SPIFFS.
slug: esp8266-w5100-manager
codeUrl: https://github.com/khoih-prog/ESP8266_W5100_Manager
star: 0
version: v1.0.0
lastUpdated: '2022-12-13'
rtos: ''
libraries:
- lwip
- littlefs
- spiffs
topics:
- config-portal
- credential-manager
- credentials
- dhcp-hostname
- dns-server
- double-reset-detector
- esp8266
- hostname
- littlefs
- lwip
- lwip-5100
- lwip-ethernet
- nodemcu
- nodemcu-esp8266
- staticip
- support-arduinojson
- w5100
- w5100s
- web-portal
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp8266-w5500-manager
- asyncesp8266-w5100-manager
- esp8266-enc-manager
- esp32-w5500-manager
- asyncesp8266-w5500-manager
- asyncesp8266-enc-manager
---

The ESP8266_W5100_Manager library is a specialized tool designed for developers using the ESP8266 platform with wired Ethernet connectivity via Wiznet W5100 or W5100S controllers. While the ESP8266 is primarily known for its WiFi capabilities, many industrial and stable IoT applications require the reliability of a wired connection. This library bridges the gap by providing a robust 'WiFiManager-style' experience for Ethernet, allowing users to configure network credentials and static IP settings at runtime without hardcoding them into the firmware.

## Core Functionality and Config Portal

The primary feature of the library is its fallback Web ConfigPortal. When the device fails to connect or when triggered by a physical switch or a double-reset event, it starts an Access Point. Users can connect to this AP via a smartphone or computer to access a web interface. Through this portal, you can configure:
- DHCP or Static IP addresses
- Gateway, Subnet Mask, and DNS servers
- Personalized Hostnames (RFC952-conformed)
- Custom application parameters (e.g., API keys, sensor pins)
- Timezone settings with auto-NTP configuration

## Technical Implementation

Built on top of the LwIP stack for the ESP8266, the library integrates seamlessly with the Arduino environment. It utilizes a JSON-based configuration system, supporting both `ArduinoJson` 5 and 6. For non-volatile storage, it is compatible with modern file systems like LittleFS and the legacy SPIFFS, ensuring that settings persist across reboots. 

One of the more advanced features is the support for Cross-Origin Resource Sharing (CORS), which allows the configuration portal to interact with web services securely. It also includes integration for the `ESP_DoubleResetDetector`, enabling a user-friendly way to force the device back into configuration mode by simply pressing the reset button twice.

## Getting Started

To implement the manager, you typically initialize the `ESP8266_W5100_Manager` object within your setup function. The library handles the complexity of the web server and DNS hijacking required to redirect users to the configuration page.

```cpp
#include <ESP8266_W5100_Manager.h>

void setup() {
  // Initialize the manager with a custom hostname
  ESP8266_W5100_Manager ESP8266_W5100_manager("My-IoT-Device");

  // Start the portal; it will block here until saved or timeout
  if (!ESP8266_W5100_manager.startConfigPortal()) {
    Serial.println("Failed to connect or hit timeout");
  }

  // Once connected, the program continues with the saved settings
  Serial.println("Connected to Ethernet!");
}
```

## Dynamic Parameters

Beyond simple network settings, the library allows developers to define custom fields that appear in the web UI. This is particularly useful for IoT projects that need to store user-specific data like ThingSpeak API keys or MQTT broker addresses. These parameters are automatically saved to the internal file system in JSON format, making them easy to retrieve during the application's normal operation. This eliminates the need for users to re-flash firmware just to change a simple configuration variable.
