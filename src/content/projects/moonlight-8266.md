---
title: Moonlight 8266
summary: An RGB LED control firmware for ESP8266-based moon lamps, featuring a web-based
  color picker and WebSocket interface. It includes battery monitoring with low-voltage
  alerts, persistent settings storage via emulated EEPROM, and support for both Access
  Point and Station WiFi modes.
slug: moonlight-8266
codeUrl: https://github.com/UncleGrumpy/Moonlight_8266
star: 2
version: v1.2.0
lastUpdated: '2025-10-13'
rtos: ''
libraries:
- littlefs
- lwip
topics:
- arduino-ide
- eeprom
- esp01
- esp8266
- littlefs
- moon-lamp
- ota
- rgb-led
- websocket
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- esp8266-home-automation
- rgblight-iot-rgb-led-controller
- rainnow-core
- esp8266-wifi-relay-and-bahtinov-masks-controller
- iot-esp8266-serial-forwarder
- volna-2bw42-weather-station-firmware
---

## Overview

Moonlight_8266 is a specialized firmware designed for the ESP8266 platform, specifically the ESP-01 module, to control RGB LEDs within 3D-printed moon lamps. It provides a modern, responsive web interface that allows users to pick colors or activate dynamic modes like a rainbow cycle. The project is built using the Arduino framework and emphasizes a self-contained, secure architecture that requires no external internet resources to function.

## Real-time Control and Web Interface

The project utilizes WebSockets to provide instantaneous feedback between the web browser and the lamp. When a user adjusts the color picker on the hosted web page, the change is reflected on the LED in real-time. The firmware supports two primary web server implementations: the standard `ESP8266WebServer` or the `ESPAsyncWebServer` for improved performance if the library is available in the build environment.

To ensure ease of use, the firmware implements a captive portal. By default, it creates a WiFi network named `Moonlight`. Users can simply connect and navigate to `http://moon.local` or `http://192.168.4.1` to access the controls. All web assets, including HTML, CSS, and JavaScript, are stored on the ESP8266's flash memory using the LittleFS file system.

## Intelligent Battery Monitoring

A standout feature of Moonlight_8266 is its integrated battery management system. Designed for portable, battery-powered operation (such as using an 18650 Li-ion cell), the firmware monitors the system voltage via the ESP8266's internal ADC. 

When the battery level drops too low to maintain accurate color reproduction, the lamp enters a "warning mode," turning red and fading its brightness up and down to alert the user. The hardware design cleverly leaves GPIO0 floating to allow for direct battery readings without the need for an external voltage divider, simplifying the BOM for small-scale builds.

## Technical Implementation

The firmware handles color with a high degree of sophistication for an 8-bit application. It includes:

- **Logarithmic Dimming**: Converts linear 8-bit web colors to a 10-bit PWM scale (0-1023) using a logarithmic approximation to better match human visual perception.
- **HSI to RGB Conversion**: For the rainbow mode, the system cycles through the HSI (Hue, Saturation, Intensity) color space to ensure smooth transitions.
- **Persistence**: Default colors and modes are saved to the emulated EEPROM, ensuring the lamp returns to the user's preferred state after a power cycle.
- **OTA Updates**: Supports ArduinoOTA, allowing developers to flash new firmware versions over WiFi without dismantling the lamp.

## Hardware Integration

While optimized for the ESP-01, the code is configurable via `Config.h` to support various ESP8266 boards and LED configurations. It supports both common anode and common cathode RGB LEDs. The README provides a detailed wiring chart and advice on resistor selection to achieve a true white balance, which is often a challenge with inexpensive RGB components.

```cpp
// Example of the PWM conversion logic used in the project
int HTMLtoAnalog(char *WebColor) {
  int ColorNum = strtol(WebColor, NULL, 16);
  // Convert 8-bit web (0-255) to 10-bit analog (0-1023) range
  float tenBit = ColorNum * 4.012f;
  // Convert linear to logarithmic scale for better visual consistency
  float TrueColor = sq(tenBit) / 1023;
  return round(TrueColor);
}
```

## Getting Started

To deploy Moonlight_8266, developers need the Arduino IDE 2.x and the `WebSockets` and `ESPAsyncTCP` libraries. After flashing the compiled sketch, the web data must be uploaded to the LittleFS partition using the `arduino-littlefs-upload` plugin. Configuration for WiFi credentials, pin assignments, and LED types is handled centrally in the `Config.h` file, making it easy to adapt the project for different hardware revisions.
