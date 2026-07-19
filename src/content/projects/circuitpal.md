---
title: CircuitPal
summary: CircuitPal is a multi-function ESP32 gadget featuring an SH1106 OLED display
  and a three-button navigation system. It integrates an NTP-synced clock, live weather
  updates via OpenWeatherMap, and a custom GIF player using a page-based state machine
  architecture. The device simplifies connectivity with a captive-portal WiFi setup
  and utilizes NVS flash for persistent credential storage.
slug: circuitpal
codeUrl: https://github.com/Phonkboisad/Circuitpal
lastUpdated: '2026-05-14'
licenses:
- MIT
rtos: ''
libraries:
- spiffs
topics:
- desktop-pet
- esp-32
- esp32devkit
- gif-player
- iot
- iot-device
- sh1106-oled
- video-gif
isShow: false
createdAt: '2026-06-02T23:21:12+00:00'
updatedAt: '2026-06-02T23:21:12+00:00'
relatedProjects:
- wt32-sc01-plus-smart-desk-companion
- esptimecast
- geekmagic-smalltv-esp8266-firmware
- bitclock
- desk-weather-clock-geekmagic-s3
- elekstube-ips-custom-firmware
---

CircuitPal is a self-contained embedded device that transforms an ESP32 and a small OLED screen into a versatile desktop companion. By combining utility functions like an atomic-synced clock and weather station with playful elements like an animated GIF player, it serves as a high-performance example of what can be achieved with the ESP32 Arduino framework and a well-structured state machine.

### A Modular Application Suite

The device is organized into five distinct applications, navigated via a tactile three-button interface (Previous, Next, and Enter). 

*   **NTP Clock & Timer**: Leveraging the ESP32’s WiFi capabilities, the device syncs with global NTP servers to provide a precise 12-hour digital clock, complete with date information. For productivity, it includes a count-up stopwatch and a sand timer with presets for 5, 10, or 15 minutes, featuring a custom-rendered hourglass animation.
*   **Live Weather**: By connecting to the OpenWeatherMap API, CircuitPal displays real-time conditions for a specific city. The interface provides a comprehensive data set, including temperature, humidity, wind speed, and atmospheric pressure, refreshing automatically every five minutes.
*   **GIF Player**: Perhaps the most unique feature is the integrated GIF browser. It can play monochrome 128×64 animations stored directly in the microcontroller's flash memory. The system supports up to 20 registered animations with independent frame rates.

### Technical Architecture

CircuitPal is built on a clean, namespace-based state machine. Each "page" (Clock, Weather, Timer, etc.) follows a standard lifecycle consisting of `reset()`, `draw()`, and `exitRequested()` functions. This modularity makes the codebase easy to extend; adding a new feature simply requires creating a new header file and adding it to the main router in the `loop()` function.

Connectivity is handled gracefully through a captive portal. On the first boot, or if saved credentials are unavailable, the ESP32 enters Access Point mode. Users can connect their phone to the "CircuitPal-Setup" network, navigate to a local IP, and input their home WiFi details. These credentials are then securely stored in the ESP32's Non-Volatile Storage (NVS) using the `Preferences.h` library, ensuring the device reconnects automatically after a power cycle.

### Hardware and Display Management

The project targets the SH1106 OLED display, a popular I²C-based monochrome screen. Using the Adafruit GFX and SH110X libraries, the firmware renders high-contrast text and graphics. Because the ESP32 features internal pull-up resistors, the three-button interface is wired directly to GPIO pins (25, 26, and 27) without the need for external hardware components.

### Handling Large Assets

One of the challenges of embedded development is managing large binary assets like animations. CircuitPal stores GIF frames as 1-bit monochrome byte arrays in `PROGMEM`. Because each 128×64 frame consumes 1024 bytes, the project requires a specific partition scheme. Users must select the "Huge APP" partition (3MB No OTA) in the Arduino IDE to accommodate the large animation arrays alongside the application logic. 

To make adding custom content easier, the project utilizes a clever auto-registration pattern. By using the `__attribute__((constructor))` compiler directive, new GIF files can register themselves into the system's registry before the main `setup()` function even runs, allowing for easy expansion without modifying the core logic.
