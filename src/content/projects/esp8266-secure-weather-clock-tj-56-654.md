---
title: ESP8266 Secure Weather Clock (TJ-56-654)
summary: An open-source firmware replacement for the TJ-56-654 weather clock kit,
  focusing on security, privacy, and performance. It features a fully asynchronous
  architecture for the ESP8266, utilizing NTP for time synchronization and the Open-Meteo
  API for weather data. The project provides a secure web interface, REST API, and
  Over-the-Air (OTA) update capabilities to replace insecure factory firmware.
slug: esp8266-secure-weather-clock-tj-56-654
codeUrl: https://github.com/petrochen/esp8266-weather-clock-opensource
siteUrl: https://github.com/petrochen/esp8266-weather-clock-opensource/releases
version: v1.9.9
lastUpdated: '2026-05-19'
licenses:
- MIT
rtos: ''
libraries:
- lwip
topics:
- aliexpress
- arduino
- esp-01s
- esp8266
- home-assistant
- iot
- ntp
- oled-display
- open-meteo
- ota-updates
- reverse-engineering
- security
- tj-56-654
- weather-station
- wifi-clock
isShow: false
createdAt: '2026-07-19T07:13:55+00:00'
updatedAt: '2026-07-19T07:13:55+00:00'
---

The journey of this project began with a common hobbyist purchase: a €5 DIY weather clock kit from AliExpress, model TJ-56-654. While the hardware—comprising an ESP-01S module and a small OLED display—was capable, the original firmware presented a significant security risk. Upon investigation, it was discovered that the device leaked WiFi passwords in plaintext via an open access point that remained active even after configuration. This repository provides a complete, ground-up rewrite of the firmware to transform this inexpensive kit into a secure, feature-rich smart device.

## Security and Privacy by Design

The primary motivation for this custom firmware was to eliminate the "textbook example of poor IoT security" found in the factory code. The new implementation ensures that no open networks are left active after setup. It utilizes the WiFiManager library for a secure captive portal during the initial configuration and includes a timeout mechanism that closes the setup AP if no activity is detected. 

Privacy is also a core focus. The original firmware relied on proprietary Chinese cloud services and required users to register for QWeather API keys. This replacement switches to the Open-Meteo API, which is free, requires no registration, and allows the device to fetch weather data directly without intermediaries. 

## Technical Architecture

The firmware is built on a fully asynchronous architecture, ensuring the system remains responsive even during network operations. By leveraging libraries like `ESPAsyncTCP` and `AsyncHTTPRequest_Generic`, the clock avoids blocking the main loop, which is critical for maintaining smooth display animations and a responsive web interface on the limited ESP8266 hardware.

### Hardware Integration and Quirks

The project targets the TJ-56-654 mainboard, which uses an ESP-01S (ESP8266EX with 1MB Flash). A notable hardware quirk addressed in the code is the non-standard I2C pin mapping. The board designer utilized GPIO0 and GPIO2 for the OLED display but swapped the typical SDA/SCL roles. The firmware correctly initializes the `Wire` library with `Wire.begin(0, 2)` to communicate with the SSD1306-compatible GM009605v4.3 OLED display.

### Key Features

- **Dynamic Display Modes**: The clock cycles through three main screens: a large time display with date and day, a weather screen showing local temperature, and a sunrise/sunset screen that calculates daylight duration.
- **Robust Networking**: Features include NTP time synchronization with automatic European DST calculation, mDNS support for easy local access (e.g., `http://tj56654-clock.local`), and exponential backoff for WiFi reconnection.
- **Web-Based Management**: A comprehensive web interface allows users to configure WiFi, NTP servers, timezones, and weather locations (latitude/longitude) without reflashing. It also includes a debug page for real-time system diagnostics.
- **Over-the-Air (OTA) Updates**: Once the initial flash is performed via an FTDI adapter, the device supports both Web-based OTA (uploading .bin files via the browser) and ArduinoOTA (uploading directly from the IDE).
- **REST API**: For those looking to integrate the clock into broader smart home ecosystems like Home Assistant, the firmware exposes several JSON endpoints providing time, weather, and system status data.

## Getting Started

To install this firmware, users need a 3.3V FTDI USB-to-Serial adapter. Because the ESP-01S requires specific wiring to enter programming mode, the project documentation provides detailed instructions on jumpering GPIO0 to GND during boot. Once the firmware is flashed, the device creates a "TJ56654-Setup" access point. Connecting to this network allows the user to input their home WiFi credentials, after which the device becomes fully autonomous.

For developers interested in the internal state machines, memory management strategies, or EEPROM layout, the project includes detailed architectural notes in the `docs/` directory. The repository also features a hardware-in-the-loop Python test suite to verify API stability and heap health over time.
