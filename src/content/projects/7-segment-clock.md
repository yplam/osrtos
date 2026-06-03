---
title: 7-Segment Clock
summary: A DIY digital NTP clock built with an ESP8266 and WS2812B LED strips. It
  features a web-based configuration interface, SPIFFS-hosted assets, and supports
  automation via Home Assistant and HomeKit.
codeUrl: https://github.com/iml885203/7-Segment-Clock
isShow: false
rtos: ''
libraries:
- spiffs
topics:
- arduino
- clock
- 7-segment
- eeprom
- homekit
- spiffs
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- shelf-edge-clock
- sanjin-intelligent-mechanical-clock
- children-s-iot-clock
- esptimecast
- esp32-weatherstationrtc
- elekstube-ips-custom-firmware
---

Building a custom digital clock is a classic maker project, but the 7-Segment Clock by iml885203 takes it a step further by integrating modern IoT capabilities. Using an ESP8266 and addressable WS2812B LED strips, this project creates a large, vibrant display that stays perfectly in sync with network time (NTP) and offers a sleek web interface for customization.

## Hardware and Design
The project is designed around the popular ESP8266 WeMos Mini D1, a compact microcontroller with built-in Wi-Fi. The display itself is constructed from WS2812B LED strips (60 LEDs per meter), which allow for individual control over every segment's color and brightness. This hardware choice makes the clock highly customizable, as users can define the number of LEDs per segment and the specific wiring order directly in the code.

## Smart Features and Web Interface
One of the standout features of this clock is its ease of use. Upon first boot, the ESP8266 creates a Wi-Fi Access Point named "7SegmentClock." Users can connect to this network and navigate to a local IP address to configure their home Wi-Fi credentials. Once connected, the clock automatically fetches the time from an NTP server (defaulting to `tw.pool.ntp.org`) and updates itself every five minutes.

The project includes a built-in web server that hosts a UI for real-time adjustments. From the browser, users can change the LED color using a hex picker and adjust the brightness to suit their environment. These settings are stored in the ESP8266's EEPROM, ensuring they persist even after a power cycle.

## Technical Implementation
The firmware is written in C++ using the Arduino framework. It leverages several key libraries to handle its various tasks:
- **FastLED**: Manages the WS2812B LED animations and color data.
- **SPIFFS**: Used to store the HTML and CSS files for the web interface on the ESP8266's flash memory.
- **ESP8266WebServer**: Handles the incoming requests for the web UI and automation commands.
- **PolledTimeout**: Manages non-blocking timing for tasks like LED blinking and network reconnection.

The code defines a 7-segment mapping for digits 0-9 and even includes some basic characters (t, r, y, d) for status messages. The logic is structured to handle two modes: "Client" mode for normal operation and "AP" mode for initial configuration.

## Automation and Smart Home Integration
For users who want to integrate the clock into a larger ecosystem, the project supports simple HTTP POST requests. This allows for external control via `curl` commands, making it easy to bridge with platforms like Home Assistant. For example, you can create a switch in Home Assistant that changes the clock to a dim, warm color for a "Night Mode" and switches it back to bright white in the morning.

```yaml
switch:
  - platform: command_line
    switches:
      led_clock:
        command_on: '/usr/bin/curl -X POST --data "led_brightness=20&led_color=#ffffaa" http://[CLOCK_IP]/setting'
        command_off: '/usr/bin/curl -X POST --data "led_brightness=5&led_color=#ffff1e" http://[CLOCK_IP]/setting'
        friendly_name: Digital Clock
```

## Getting Started
To build your own, you will need to use the Arduino IDE to flash the firmware. The process involves two steps: uploading the SPIFFS data (the web files) and then flashing the `.ino` sketch. The developer recommends setting the `reset_eeprom` flag to `true` for the first flash to ensure the memory is correctly initialized. Once the hardware is wired according to the `segGroups` array in the code, you'll have a fully functional, network-synced digital clock.
