---
title: ESP-DashboardPlus
summary: A real-time, on-device web dashboard library for ESP32 microcontrollers featuring
  WebSocket communication, 14 distinct card types, and integrated console logging.
  It provides a responsive UI with minimal memory overhead by storing compressed assets
  in PROGMEM.
slug: esp-dashboardplus
codeUrl: https://github.com/aaronbeckmann/ESP-DashboardPlus
siteUrl: https://aaronbeckmann.github.io/ESP-DashboardPlus
star: 51
version: 1.0.0
lastUpdated: '2026-01-06'
rtos: freertos
topics:
- arduino
- control
- dashboard
- esp
- esp-dashboardplus
- esp32
- graph
- interface
- library
- server
- ui
- webpage
- widgets
isShow: false
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- espui
- esp-fs-webserver
- esp32-remote-control-with-websocket
- nmea0183-wifi-marine-data-gateway
- esp32-p4-home-assistant-display
- espmonitor-iot-environment-monitoring-system
---

ESP-DashboardPlus is a comprehensive library designed to simplify the creation of real-time web interfaces for ESP32-based devices. By leveraging WebSocket communication, it enables instantaneous updates between the microcontroller and the browser, making it ideal for monitoring sensors, controlling actuators, and managing system configurations without the latency associated with traditional HTTP polling.

The library stands out for its "all-in-one" approach. It packages a modern, responsive dashboard, a system console, and an Over-the-Air (OTA) update interface into a single gzipped HTML file stored in the device's flash memory (PROGMEM). This design ensures that the dashboard is always available directly from the device, even without an internet connection, while consuming only about 18KB of storage space.

## Versatile UI Components

At the heart of ESP-DashboardPlus are its "Cards"—modular UI elements that can be easily added to the dashboard via a simple C++ API. The library supports 14 distinct card types to cover almost any IoT use case:

- **Data Visualization**: StatCards for numeric values with units, GaugeCards for thresholds (like battery or CPU usage), and ChartCards for historical data trends.
- **Control Elements**: ToggleCards for switches, SliderCards for range adjustments, and ColorPickerCards for RGB lighting control.
- **Interaction**: ButtonCards for triggers, ActionButtons with confirmation dialogs (useful for resets), and InputCards for text or numeric configuration like WiFi credentials.
- **System Status**: StatusCards for health monitoring and LinkCards for external documentation or related services.

## Integrated Console and OTA

Beyond the main dashboard, the library includes two dedicated tabs that provide essential developer and maintenance tools. The **Console** tab offers a timestamped logging interface with filtering and export capabilities, allowing developers to debug their applications in real-time through the web browser. The **OTA Update** tab provides a user-friendly drag-and-drop interface for firmware updates, complete with progress bars and device information, eliminating the need for physical serial connections during field maintenance.

## Technical Implementation

ESP-DashboardPlus is built on top of the `ESPAsyncWebServer` and `AsyncTCP` libraries, ensuring that web traffic does not block the main execution loop of the microcontroller. It uses `ArduinoJson` for efficient data serialization. The library is highly optimized for the ESP32 ecosystem, supporting the standard ESP32 as well as the S3 and C3 variants. 

One of the most powerful features for advanced users is the inclusion of a Python-based conversion script. This allows developers to modify the source HTML/CSS/JS located in the `extras/` folder and automatically regenerate the C++ header file, providing full control over the dashboard's appearance and branding.

## Getting Started

Integration into existing Arduino-based projects is straightforward. After initializing the library with a reference to an `AsyncWebServer`, developers can add cards and define callback functions to handle user interactions.

```cpp
// Initialize dashboard
dashboard.begin(&server, DASHBOARD_HTML_DATA, DASHBOARD_HTML_SIZE);

// Add a temperature display
StatCard* temp = dashboard.addStatCard("temp", "Temperature", "25.0", "°C");

// Add a toggle switch with a callback
ToggleCard* led = dashboard.addToggleCard("led", "LED", "Status", false);
led->onChange = [](bool state) {
    digitalWrite(LED_BUILTIN, state);
};
```

The library handles the underlying WebSocket management and JSON routing, allowing developers to focus on their application logic rather than web development complexities.
