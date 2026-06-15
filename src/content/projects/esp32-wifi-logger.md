---
title: ESP32 WiFi Logger
summary: An ESP-IDF component for the ESP32 that enables remote logging over WiFi
  via TCP, UDP, or WebSockets. It features seamless integration with the standard
  ESP_LOGX macros, allowing developers to route system logs to a remote server. The
  project uses FreeRTOS for asynchronous message queuing to ensure logging does not
  block critical application tasks.
slug: esp32-wifi-logger
codeUrl: https://github.com/VedantParanjape/esp-wifi-logger
siteUrl: https://vedantparanjape.github.io/esp-wifi-logger/
star: 102
lastUpdated: '2025-05-16'
rtos: freertos
libraries:
- lwip
topics:
- c
- esp-idf
- esp32
- freertos
- hacktoberfest
- logger
- networking
- tcp
- udp
- websockets
- wifi
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- rfc2217-server-for-esp-idf
- cmsis-dap-over-tcp-for-esp32
- embeddedmqttbroker
- esp32-webserver-with-firebase-integration
- iot-esp8266-serial-forwarder
- esp32-cam-mjpeg-streaming-and-sd-capture
---

# ESP32 WiFi Logger

The ESP32 WiFi Logger is a specialized component designed for the ESP-IDF framework, enabling developers to stream log messages from an ESP32 device to a remote server over a wireless network. This tool is particularly useful for field-deployed devices or hardware where a physical UART connection is inaccessible, providing a robust alternative to traditional serial debugging.

## Core Functionality

The component supports three primary transport protocols, allowing developers to choose the best fit for their application's requirements:

*   **UDP**: Offers the lowest latency and minimal memory footprint. It is ideal for high-frequency logging where performance is critical and occasional packet loss is acceptable.
*   **TCP**: Provides a reliable, connection-oriented stream, ensuring that log messages arrive in order and without loss.
*   **WebSockets**: Enables integration with modern web-based monitoring tools and dashboards, offering a flexible way to stream data over standard web protocols.

One of the standout features of this logger is its deep integration with the standard ESP-IDF Logging API. By configuring the component through `menuconfig`, developers can automatically route all `ESP_LOGX()` calls to the WiFi logger. This means that system-level logs, driver messages, and application-specific logs can all be captured remotely without modifying existing codebases. The logger even preserves the standard ANSI color patterns used by ESP-IDF, ensuring that log levels like Error, Warn, and Info remain visually distinct in the remote terminal.

## Technical Architecture

Internally, the logger utilizes FreeRTOS primitives to ensure non-blocking operation. Log messages are formatted and pushed into a FreeRTOS queue, which acts as a buffer. A dedicated background task then retrieves these messages and handles the network transmission. This asynchronous architecture prevents logging operations from stalling the main application logic, which is vital for maintaining real-time performance in embedded systems.

The component is highly configurable via the ESP-IDF `menuconfig` utility. Users can set the target server's IP address, port, and preferred protocol, as well as advanced parameters like queue sizes and buffer lengths to tune the logger for specific heap constraints. For example, the project documentation notes that UDP logging requires approximately 220,388 bytes of free heap, while WebSockets require slightly more, around 205,416 bytes.

## Getting Started

To use the WiFi logger, developers initialize the component in their main application entry point. Once started, the logger handles the WiFi connection (using the standard ESP-IDF connection helpers) and begins processing log messages.

```c
#include "wifi_logger.h"

void app_main(void)
{
    // Start the wifi logger task and network connection
    start_wifi_logger(); 

    while(1)
    {
        // Log messages using the custom wifi_log macros
        wifi_log_i("TAG", "Hello from the WiFi Logger!");
        
        // Standard ESP_LOGI will also be sent if configured in menuconfig
        ESP_LOGI("TAG", "Standard ESP-IDF log message");

        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}
```

On the receiving side, simple command-line tools like `netcat` (nc) or `websocat` can be used to listen for incoming logs, making the setup process straightforward for developers working in Linux or macOS environments. This makes it an excellent tool for remote diagnostics and long-term stability testing where physical access to the device is limited.
