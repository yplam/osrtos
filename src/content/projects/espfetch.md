---
title: espfetch
summary: A system information and logging utility for ESP32 and ESP8266 that provides
  a Neofetch-style ASCII dashboard. It features a Python-inspired logger with thread-safe
  operations on FreeRTOS and supports detailed hardware diagnostics including memory,
  network, and chip status.
slug: espfetch
codeUrl: https://github.com/HamzaYslmn/espfetch
version: v4.0.0
lastUpdated: '2026-04-04'
licenses:
- AGPL-3.0
rtos: freertos
libraries:
- littlefs
- spiffs
topics:
- arduino
- arduino-library
- diagnostics
- esp32
- esp32-arduino
- fastfetch
- freertos
- iot
- neofetch
- serial-monitor
- system-info
isShow: false
createdAt: '2026-04-16T03:44:27+00:00'
updatedAt: '2026-04-16T03:44:27+00:00'
---

## Bringing the Neofetch Experience to ESP32 and ESP8266

System administrators and Linux enthusiasts are often fond of `neofetch`, the command-line tool that displays system information alongside a stylish ASCII logo. `espfetch` brings this exact aesthetic to the world of Espressif microcontrollers. Designed for both ESP32 and ESP8266, it serves as a powerful diagnostic tool that provides a snapshot of the device's health and configuration through a serial terminal. It is particularly useful for developers who need to verify hardware revisions, monitor memory leaks, or check network stability without writing custom reporting code for every project.

## Comprehensive System Diagnostics

When triggered, `espfetch` generates a detailed side-by-side view. On the left, a stylized IC-chip ASCII art represents the hardware. On the right, a wealth of technical data is presented, categorized into sections for easy reading:

- **Chip Information**: Displays the specific model (e.g., ESP32-D0WD-V3), revision number, core count, CPU frequency, SDK version, and internal temperature.
- **Memory & Storage**: Provides a real-time look at heap usage (including minimum free heap and largest allocatable block), flash size, sketch size, and status for filesystems like SPIFFS or LittleFS. It even supports PSRAM detection for higher-end ESP32 modules.
- **Network Status**: Shows WiFi signal strength using visual bars, SSID, RSSI, channel, IP address, MAC address, and even TX power.
- **Runtime Data**: Includes uptime, the reason for the last reset (such as Power-on or Software reset), and the current FreeRTOS task count.

## A Python-Inspired Logging System

Beyond the visual dashboard, the library includes `ESPLogger`, a logging utility inspired by the syntax found in Python's logging module or modern web frameworks like FastAPI. It supports five standard levels: `DEBUG`, `INFO`, `WARNING`, `ERROR`, and `CRITICAL`. 

One of the standout features of `ESPLogger` is its thread safety. On ESP32 devices, the logger utilizes FreeRTOS mutexes to ensure that log messages from different tasks don't interleave or cause race conditions. On the single-core ESP8266, these operations gracefully fall back to standard serial output to maintain compatibility. Developers can also use the `logger.request()` method to generate standardized logs for HTTP servers, capturing the client IP, method, path, and status code in a single line.

## Advanced Integrations and JSON Support

For developers building automated monitoring systems or remote dashboards, `espfetch` isn't limited to human-readable ASCII. It can output the entire system state as a single JSON object via `espfetch.printJSON()`. This makes it easy to pipe system data to a web dashboard or an external monitoring service like Grafana or a custom telemetry backend.

The library also features clever integration with companion projects like `esp32-tunnel`. By using C++ weak symbols, `espfetch` can automatically detect if a tunneling library is linked to the project. If it is, the dashboard will automatically populate with tunnel URLs and provider status without requiring any manual configuration from the user. This "plug-and-play" detection allows the library to expand its reporting capabilities based on what other libraries are present in the build.

## Quick Implementation

Integrating the library into an existing Arduino sketch is straightforward. Once the library is included, it can be hooked into the serial loop to respond to commands like `/espfetch` or `/info`. 

```cpp
#include <espfetch.h>
#include <WiFi.h>

void setup() {
  rtosSerial.begin(115200);
  WiFi.begin("SSID", "PASS");
  while (WiFi.status() != WL_CONNECTED) delay(500);

  logger.info("WiFi connected: %s", WiFi.localIP().toString().c_str());
}

void loop() {
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();
    // Automatically handle /espfetch, /fetch, and /info commands
    if (espfetch.check(cmd)) return; 
  }
}
```

Whether used for debugging during development or as a permanent "about" screen for a production IoT device, `espfetch` provides a professional and informative interface for the Espressif ecosystem, making system monitoring as simple as typing a command.
