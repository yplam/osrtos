---
title: ESP32 Wi-Fi Provision Care
summary: A Wi-Fi provisioning and OTA update component for ESP32 using a captive portal.
  It automatically handles credential management via NVS and provides a web interface
  for network scanning and firmware uploads when no connection is available.
slug: esp32-wi-fi-provision-care
codeUrl: https://github.com/uqfus/esp32-wifi-provision-care
lastUpdated: '2025-03-12'
licenses:
- Unlicense
rtos: freertos
libraries:
- lwip
topics:
- captive-portal
- esp32
- esp32-idf
- http-post
- ipv6
- ota
- ota-firmware
- ota-update
- upload-firmware
- wifi-manager
isShow: false
createdAt: '2026-04-07T23:28:44+00:00'
updatedAt: '2026-04-07T23:28:44+00:00'
---

Connecting an embedded device to a local Wi-Fi network is a fundamental hurdle for any IoT project. The **esp32-wifi-provision-care** library offers a streamlined solution for ESP32 developers using the ESP-IDF framework. It simplifies the process by managing Wi-Fi credentials stored in the default NVS (Non-Volatile Storage) partition and providing a fallback mechanism when connectivity fails.

### How It Works

The logic follows a robust sequence designed for a smooth user experience. Upon initialization, the component attempts to connect to Wi-Fi using any credentials previously saved in the NVS partition. If no credentials exist, or if the connection attempt fails, the library automatically transitions the ESP32 into Access Point (AP) mode. 

Once in AP mode, it spawns a captive portal. When a user connects to the ESP32's Wi-Fi network (typically named `esp32-wifi-provision-care-XXXX`), they are automatically redirected to a provisioning page. This web interface displays a list of nearby Wi-Fi routers detected by the ESP32, allowing the user to select their network and enter a password without needing a dedicated mobile app or serial console.

### Built-in OTA Updates

Beyond simple network configuration, this component includes a highly useful "over the air" (OTA) firmware update feature. The provisioning page allows users to upload new firmware binaries directly through the web browser. This is particularly valuable for devices deployed in the field where physical access is limited, as it combines network setup and maintenance into a single, accessible interface.

### Technical Integration

The project is designed as a standard ESP-IDF component. It leverages several core ESP-IDF libraries, including `esp_http_server` for the web interface, `app_update` for OTA functionality, and `nvs_flash` for persistent storage. To optimize performance and memory usage, the provisioning HTML is gzipped and embedded directly into the binary during the build process.

### Implementation Example

Integrating the library into an existing ESP32 project requires minimal code. After adding the dependency to your `idf_component.yml`, you can initialize the service in your `app_main` function:

```c
#include "esp32-wifi-provision-care.h"

void app_main(void) {
    // Initialize the provisioning service
    // Passing NULL uses the default SSID: "esp32-wifi-provision-care-XXXX"
    wifi_provision_care(NULL); 
    
    // Or specify a custom SSID for the Access Point
    // wifi_provision_care("MyCustomProvisioner");
}
```

To ensure the web server functions correctly, the project requires a few adjustments to the `sdkconfig`, specifically increasing the maximum number of LWIP sockets and the HTTP daemon's request header length to accommodate modern browser requests. This makes it a reliable choice for developers looking to add professional-grade network management to their ESP32 applications with minimal overhead.
