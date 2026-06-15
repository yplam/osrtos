---
title: ESPTimeCast
summary: A WiFi-connected LED matrix clock and weather display built for ESP8266 and
  ESP32 microcontrollers. It utilizes the MAX7219 driver to display real-time NTP
  clock data and live weather updates from OpenWeatherMap, all configurable via a
  built-in web interface.
slug: esptimecast
codeUrl: https://github.com/mfactory-osaka/ESPTimeCast
star: 1026
lastUpdated: '2026-01-14'
rtos: ''
libraries:
- littlefs
isShow: true
image: /202601/esp-time-cast.webp
createdAt: '2026-01-15'
updatedAt: '2026-01-15'
relatedProjects:
- esp32-weatherstationrtc
- desk-weather-clock-geekmagic-s3
- diy-weather-clock-firmware
- 7-segment-clock
- elekstube-ips-custom-firmware
- shelf-edge-clock
---

## Overview

ESPTimeCast is a sophisticated, WiFi-connected display project that transforms a standard 8x32 LED matrix into a multifunctional desk companion. Designed to run on popular ESP8266 and ESP32 microcontrollers, it provides a sleek interface for time, weather, and custom notifications. The project stands out by offering a robust web-based configuration portal, eliminating the need for users to hardcode credentials or settings into the firmware.

## Hardware and Architecture

The system is built around the **MAX7219** LED matrix driver, typically used in an 8x32 configuration. It supports a variety of boards, including the Wemos D1 Mini and the S2 Mini. A significant technical focus of the project is power stability; the documentation emphasizes powering the LED matrix from the 5V USB rail rather than the microcontroller's 3.3V regulator to prevent overheating and voltage drops.

Data persistence is handled via **LittleFS**, which stores configuration JSON files. This allows the device to remember WiFi credentials, API keys, and display preferences across reboots. The project also utilizes asynchronous web server libraries to provide a responsive UI without interrupting the display's scrolling animations.

## Key Features

ESPTimeCast is packed with features that go beyond a simple clock:

- **Real-Time Synchronization**: Uses NTP to maintain accurate time, with integrated IANA timezone support for automatic Daylight Savings Time adjustments.
- **Live Weather**: Fetches data from OpenWeatherMap every five minutes, displaying temperature, humidity, and localized weather descriptions.
- **Web Configuration Interface**: A built-in portal allows users to manage WiFi settings, display brightness, and toggle features like 12/24h mode or imperial/metric units.
- **Automatic Dimming**: The display can automatically adjust its brightness based on sunrise/sunset times fetched from the weather API or via custom scheduled hours.
- **Home Assistant Integration**: A REST API endpoint allows external smart home platforms to send temporary scrolling messages or control the display's brightness.
- **Nightscout Support**: For users managing diabetes, the device can alternate between weather and real-time glucose data from a Nightscout server.

## Smart Home and API Integration

One of the most powerful aspects of ESPTimeCast is its extensibility via a REST API. By sending POST requests to the device's IP, users can trigger custom scrolling messages. This is particularly useful for Home Assistant automations, such as displaying "DOOR OPEN" or "MAIL DELIVERED" alerts. These messages can be configured with specific scroll speeds, durations, or a set number of scroll cycles before the display returns to its default clock/weather rotation.

## Getting Started

The project is designed for ease of use. On the first boot, if no WiFi is found, the device enters an Access Point (AP) mode. Users can connect to the `ESPTimeCast` hotspot to access a captive portal where they can enter their local network details and OpenWeatherMap API key. Once saved, the device reboots and begins its normal operation, scrolling the current time and weather data.

For developers and makers, the repository provides separate firmware versions for ESP8266 and ESP32, ensuring compatibility with the specific hardware constraints of each chip. The project also offers 3D printable case designs to help users create a finished, professional-looking product for their workspace.
