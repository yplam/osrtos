---
title: nearPlane ADSB Tracker
summary: A portable real-time aircraft tracker for the M5StickC Plus 2 that utilizes
  the adsb.lol API to display flight telemetry and route information. It features
  a multi-page OLED interface, emergency squawk highlighting, and a web-based setup
  portal for easy configuration.
slug: nearplane-adsb-tracker
codeUrl: https://github.com/stevenselcuk/nearPlane
star: 14
lastUpdated: '2025-09-13'
rtos: freertos
topics:
- ads-b
- aircraft-tracking
- ardunio
- aviation
- esp32
- m5stack
- m5stickcplus2
isShow: true
image: /202601/near-plane.webp
createdAt: '2026-01-28'
updatedAt: '2026-01-28'
relatedProjects:
- plane-radar
- flightradar24-ttgo
- esp32-flight-tracker
- cardputer-gps-info
- openlap
- papersat
---

# nearPlane: A Portable ADSB Tracker for Aviation Enthusiasts

Have you ever looked up at a passing aircraft and wondered about its destination, altitude, or speed? nearPlane transforms the M5StickC Plus 2 into a dedicated, real-time ADS-B (Automatic Dependent Surveillance-Broadcast) tracker, bringing live flight data directly to your pocket without the need for expensive radio hardware or complex setups.

## Real-Time Tracking via adsb.lol

At its core, nearPlane leverages the adsb.lol API, a community-driven project that aggregates global flight data. By querying this open-source resource, the device identifies the closest aircraft to your specific coordinates. Unlike basic trackers, nearPlane doesn't just show a hex code; it fetches detailed flight route information, including departure and arrival IATA codes, by communicating directly with the adsb.lol route-set endpoints. This provides significantly more accurate data directly from the adsb.lol ecosystem, eliminating the need for external API keys.

## Feature-Rich Interface

The project makes full use of the M5StickC Plus 2's hardware, offering a multi-page interface that users can cycle through using the device's main button. The telemetry data provided across six different pages includes:

- Altitude and Ground Speed
- Heading and Vertical Rate
- Squawk Codes and Callsigns
- Distance from your current location
- Departure and Arrival airport information

Safety and awareness are also prioritized. The tracker includes an emergency alert system that highlights aircraft broadcasting emergency squawk codes, such as 7500 for hijacking, 7600 for radio failure, or 7700 for general emergencies. When a new aircraft enters the tracking radius, the device plays a distinct tone to notify the user.

## Seamless Configuration

One of the standout features of nearPlane is its user-friendly setup process. Upon first boot or after a factory reset, the device enters a "Setup Mode," acting as a Wi-Fi access point. Users can connect to the `nearPlane-ADSB-Tracker-Setup` network and access a web-based portal at `192.168.4.1`. This interface allows for easy entry of:

- Local Wi-Fi credentials (SSID and Password)
- GPS coordinates (Latitude and Longitude)
- Scan radius in kilometers

This eliminates the need to hardcode sensitive information or location data into the firmware before flashing, making the project accessible to those who may not be comfortable editing source code. Settings are saved to the device's non-volatile memory and can be cleared at any time by holding the side button for five seconds.

## Technical Foundation

The firmware is built on the Arduino framework, utilizing the `M5Unified` library for hardware abstraction and `ArduinoJson` for parsing complex API responses. It targets the ESP32-based M5StickC Plus 2, taking advantage of its integrated Wi-Fi capabilities and vibrant display. The project is open-source and encourages community contributions, particularly for improving route fetching and telemetry display.

Whether you are a dedicated aviation enthusiast or simply curious about the traffic overhead, nearPlane provides a compact and powerful window into the world of aviation telemetry.
