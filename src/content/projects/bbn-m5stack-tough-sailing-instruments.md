---
title: BBN M5Stack Tough Sailing Instruments
summary: A comprehensive sailing instrument display and autopilot controller for the
  M5Stack Tough (ESP32). It integrates with SignalK, NMEA 0183, and Victron systems
  using the LVGL graphics library to provide real-time marine data visualization and
  vessel control.
codeUrl: https://github.com/bareboat-necessities/bbn-m5stack-tough
siteUrl: https://bareboat-necessities.github.io/
isShow: false
rtos: freertos
libraries:
- lvgl
topics:
- arduino
- boat
- boating
- esp32
- esp32-arduino
- lvgl
- m5stack
- m5stack-core2
- pypilot
- sensesp
- signalk
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- nmea0183-wifi-marine-data-gateway
- lvgl-port-for-m5stack-core2
- esp32-remote-for-victron
- lvgl-port-for-esp32
- bbmonitor
- esp32-tux
---

The **BBN M5Stack Tough** project is a specialized firmware for the ESP32-based M5Stack Tough, designed to serve as a rugged, waterproof marine instrument display. For sailors and boaters, having access to real-time data like wind speed, depth, engine status, and GPS location is critical. This project leverages the power of the ESP32 and the LVGL (Light and Versatile Graphics Library) to create a high-performance, touch-enabled dashboard that rivals expensive commercial marine electronics.

### A Versatile Marine Hub
At its core, the project acts as a bridge between various marine data protocols and the user. It supports **SignalK**, the modern open-source data format for marine use, as well as the legacy **NMEA 0183** standard. Beyond simple data display, it integrates deeply with **PyPilot**, an open-source marine autopilot, allowing users to control their vessel's heading directly from the touch screen. It also features robust support for **MQTT**, specifically tailored for Victron Energy systems (Cerbo GX or Venus OS), making it an excellent tool for monitoring battery banks, solar chargers, and power consumption.

### Key Features and Capabilities
The firmware is packed with a wide array of specialized instrument screens, including:
- **Navigation**: GPS location, speed over ground (SOG), heading, and local sunset/sunrise times.
- **Sailing Data**: Apparent and true wind displays, heel (clinometer), pitch, and rudder position.
- **Vessel Monitoring**: Engine RPM, oil temperature, alternator voltage, and tank levels (fuel, water, waste).
- **Environment**: Barometric pressure, humidity, and weather forecasts.
- **System Management**: WiFi configuration, mDNS service discovery, and brightness/orientation settings.

One of the standout features is the **Deep Sleep** mode, which allows the device to conserve power while remaining ready to wake up instantly via the touch screen—a vital feature for off-grid living or long-distance cruising.

### Technical Architecture
The project is built using the Arduino framework on the ESP32, utilizing **FreeRTOS** for task management. The user interface is powered by **LVGL 8.x**, providing smooth animations and a professional look. Data handling is managed through **ArduinoJson** for parsing SignalK and Victron MQTT messages, while **ReactESP** provides an asynchronous event-driven programming model to keep the UI responsive even while processing heavy network traffic.

### Hardware and Setup
The primary target is the **M5Stack Tough**, chosen for its integrated touchscreen, ESP32-D0WDQ6-V3 processor, and IP65-rated enclosure. To get started, developers need to configure the Arduino IDE with the ESP32 board manager and install several key libraries:

```cpp
#include <M5Tough.h>
#include <lvgl.h>
#include <ArduinoJson.h>
#include <MQTT.h>
#include <ReactESP.h>
```

The project requires a specific `lv_conf.h` configuration to enable features like 16-bit color depth, custom tick sources, and specific fonts (Montserrat 20). Once flashed, the device can connect to the boat's local 2.4GHz WiFi network to begin pulling data from a SignalK server or NMEA gateway.

### Community and Ecosystem
Part of the larger **Bareboat Necessities** ecosystem, this project is designed to work seamlessly with other open-source marine tools. Whether you are building a DIY chartplotter using a Raspberry Pi or setting up a simple ESP32-based sensor network, the M5Stack Tough display provides a polished, reliable interface for interacting with your boat's data. Its ability to discover services via mDNS makes it nearly "plug-and-play" once the initial WiFi credentials are set.
