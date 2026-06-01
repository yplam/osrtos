---
title: Plane Radar
summary: An embedded flight tracking application for the ESP32-C3 Super Mini and a
  1.28-inch round GC9A01 display. It visualizes live ADS-B aircraft data from adsb.fi
  on a sonar-style interface, providing real-time updates on aircraft headings, altitudes,
  and speed vectors with a captive portal for easy configuration.
slug: plane-radar
codeUrl: https://github.com/MatixYo/ESP32-Plane-Radar
version: v1.0.0
lastUpdated: '2026-05-31'
licenses:
- MIT
image: /202606/ESP32-Plane-Radar_0.avif
rtos: freertos
isShow: true
createdAt: '2026-06-01T00:44:43+00:00'
updatedAt: '2026-06-01T00:44:43+00:00'
---

The Plane Radar project is a specialized embedded application that transforms an ESP32-C3 and a round display into a dedicated aviation tracking station. By utilizing live ADS-B (Automatic Dependent Surveillance–Broadcast) data, the device provides a real-time "sonar" view of the skies, specifically tailored for the circular form factor of the GC9A01 display.

### Visualizing the Skies

At the heart of the project is a custom-drawn radar interface. Unlike traditional rectangular flight trackers, this project leans into the circular geometry of its hardware. The display features a dark blue background with subdued green rings and crosshairs, creating a classic radar aesthetic. Aircraft are rendered with high-contrast symbols that provide immediate situational awareness:

*   **Heading and Speed**: Each aircraft is represented by a red triangle pointing in its direction of travel, accompanied by a magenta speed vector.
*   **Dynamic Tagging**: Information such as callsigns, aircraft types, and altitudes are displayed via tags that intelligently shift position to avoid the screen edges and maintain readability.
*   **Directional Cues**: For aircraft that are within the data fetch radius but outside the current zoom level, the software places small red dots on the rim of the screen, acting as a bearing indicator for incoming traffic.

### Technical Architecture

The firmware is built for the **ESP32-C3 Super Mini**, a compact RISC-V based microcontroller. It leverages the **LovyanGFX** library to handle the complexities of the GC9A01 SPI display, ensuring smooth updates and efficient rendering of the radar grid and aircraft symbols. 

Data is sourced from the **adsb.fi** open data API. The system performs periodic fetches (defaulting to every 5 seconds) to update the positions of nearby planes. Because the display is circular, the software includes logic to translate geographic coordinates (latitude and longitude) into polar coordinates relative to the user's home location, which is then mapped to the 240x240 pixel grid.

### User Experience and Configuration

One of the standout features of the project is its ease of setup. Recognizing that hardcoding Wi-Fi credentials and GPS coordinates is cumbersome, the developer integrated a captive portal system. On the first boot, or when triggered by a long press of the BOOT button, the device acts as an Access Point named `PlaneRadar-Setup`. Users can connect via their smartphone to a web interface to configure:

*   Local Wi-Fi credentials.
*   Home Latitude and Longitude (the center of the radar).
*   Preferred units (Kilometers vs. Miles).

Settings are persisted in the ESP32's Non-Volatile Storage (NVS), ensuring the device resumes operation immediately after a power cycle. Physical interaction is handled through the single BOOT button on the Super Mini, allowing users to cycle through range presets (5, 10, 15, or 25 km) with a short tap.

### Hardware Integration

The project is designed for a specific hardware stack that is both affordable and widely available. The wiring is straightforward, utilizing the SPI bus of the ESP32-C3:

| Display | ESP32-C3 Pin |
|---------|----------|
| RST | GPIO 0 |
| CS | GPIO 1 |
| DC | GPIO 10 |
| SDA (MOSI) | GPIO 3 |
| SCL (SCLK) | GPIO 4 |
| BOOT (User Button) | GPIO 9 |

For those looking to build a polished desktop gadget, the project also links to a custom 3D-printed case design, completing the transition from a breadboard prototype to a finished consumer-grade device.
