---
title: ESP8266/ESP32 Spotify OLED Display
summary: An Arduino-based project for ESP8266 and ESP32 that displays live Spotify
  playback details and weather information on an SH1106 OLED screen. It features real-time
  track synchronization, progress bars, and an idle mode showing time and temperature
  using the OpenWeatherMap API.
slug: esp8266-esp32-spotify-oled-display
codeUrl: https://github.com/alejandrosnz/ESP-Spotify-OLED
star: 43
version: 1.0.0
lastUpdated: '2024-12-13'
rtos: ''
topics:
- arduino
- esp
- esp32
- esp8266
- spotify
- spotify-api
- weather
isShow: true
image: /202603/esp-spotify-oled.webp
createdAt: '2026-03-08'
updatedAt: '2026-03-08'
---

The ESP8266/ESP32 Spotify OLED Display project is a creative implementation of IoT technologies, turning a small microcontroller and an OLED screen into a functional desktop companion. By leveraging the power of the ESP8266 or ESP32 platforms, this project provides a real-time bridge between the Spotify ecosystem and physical hardware.

### Core Functionality
The primary purpose of the device is to serve as a secondary display for Spotify playback. When a user is actively listening to music, the system fetches metadata via the Spotify Web API. The display shows the current song title, the artist (or multiple artists), and a dynamic progress bar that tracks the elapsed time against the total duration of the track. It also indicates the current playback status, such as play or pause, using custom icons.

One of the thoughtful features of this project is its idle state. When no music is detected, the display doesn't simply go blank. Instead, it transitions into a useful information hub, displaying the current time, local temperature, and a weather icon representing the current conditions. This is achieved through integration with the OpenWeatherMap API and the ezTime library for accurate timekeeping and timezone management.

### Technical Architecture
The project is built on the Arduino framework, making it accessible for hobbyists while remaining robust enough for continuous operation. It utilizes several key components:

- **Networking**: The ESP8266 or ESP32 connects to local Wi-Fi to communicate with external REST APIs via HTTPS.
- **API Integration**: It uses the Spotify API with OAuth2 authentication, specifically utilizing refresh tokens to maintain long-term access without manual intervention.
- **Data Parsing**: Since API responses from Spotify and OpenWeatherMap are in JSON format, the project employs the `ArduinoJson` library. A notable optimization in the code is the use of JSON filters, which allows the microcontroller to parse only the necessary fields, saving memory on resource-constrained devices.
- **Display Management**: The project targets the SH1106 OLED display (128x64) using the Adafruit GFX and SH110X libraries. It includes custom logic to handle special characters (such as Spanish accents) to ensure text renders correctly on the screen.

### Hardware and Connectivity
The hardware requirements are minimal, making it an excellent project for makers. It requires an ESP8266 (such as the D1 Mini) or an ESP32, and a standard 1.3-inch SH1106 OLED display. The connection is handled via the I2C protocol, requiring only four wires: SDA, SCL, VCC, and GND. For those interested in aesthetics, the project also references a 3D-printable terminal-style enclosure to give the device a finished, professional look.

### Configuration and Setup
Setting up the project involves configuring two main header files: `secrets.h` for sensitive data like Wi-Fi credentials and API keys, and `config.h` for localized settings like timezones and weather locations. The use of a refresh token generator for Spotify ensures that the device can operate autonomously once the initial authentication is performed. This project serves as a great example of how modern microcontrollers can interact with complex web services to create meaningful, glanceable interfaces for everyday use.
