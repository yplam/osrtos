---
title: Eiswolfs Flightradar (CYD)
summary: A live ADS-B flight radar firmware for the ESP32-based 'Cheap Yellow Display'
  (CYD). It tracks nearby aircraft in real-time, featuring a rotating radar screen,
  detailed flight information, and integration with MQTT and Home Assistant.
slug: eiswolfs-flightradar-cyd
codeUrl: https://github.com/Eiswolf-BG/eiswolfs-flightradar-CYD
siteUrl: https://eiswolf-bg.github.io/eiswolfs-flightradar-CYD/
version: v6.9.0
lastUpdated: '2026-10-03'
image: /202610/eiswolfs-flightradar-CYD_0.avif
rtos: freertos
libraries:
- tft-espi
topics:
- ads-b
- adsb
- aircraft
- airplane
- airport
- cheap-yellow-display
- cyd
- esp32
- esp32-2432s028
- flight-radar
- flightradar
- ili9341
- platformio
- radar
- tft
isShow: true
createdAt: '2026-10-06T01:35:15+00:00'
updatedAt: '2026-10-06T01:35:15+00:00'
---

## Turning the 'Cheap Yellow Display' into a Professional Flight Radar

Eiswolfs Flightradar is a sophisticated embedded project that transforms the popular ESP32-2432S028, affectionately known as the "Cheap Yellow Display" (CYD), into a dedicated, real-time ADS-B flight tracking station. By combining the low-cost versatility of the ESP32 with a 2.8-inch touch display, this project offers a localized aviation dashboard that rivals professional tracking software in both aesthetics and functionality.

At its core, the system provides a circular radar view with a rotating sweep line, mimicking classic air traffic control displays. It identifies nearby aircraft and renders them using recognizable type silhouettes—distinguishing between airliners, private jets, turboprops, and even helicopters—rather than generic icons. The interface is further enhanced by a twinkling starfield and customizable color themes, ranging from classic amber and green to modern blue and purple.

## Intelligent Tracking and Visualizations

The radar isn't just a static map; it is a dynamic data visualization tool. Aircraft are color-coded based on altitude—green for low-level traffic, yellow for mid-range, and red for high-altitude flights. For users looking for specific details, tapping an aircraft marker opens a comprehensive panel. This panel pulls data from multiple sources to show the callsign, airline, aircraft model, and even flight routes. 

One of the most impressive technical feats is the "What was that?" feature. Designed for users who hear a plane overhead but can't reach their device in time, the screensaver maintains a snapshot of the last nearest aircraft, allowing for quick identification of recent flyovers. The system also calculates elevation angles and compass headings, telling you exactly where to look in the sky to spot a specific flight.

## Technical Architecture and Dual-Core Performance

To maintain a responsive user interface while handling heavy networking tasks, the project leverages the dual-core architecture of the ESP32. All networking operations—including WiFi management, ADS-B polling, and external API lookups—run on Core 0. Meanwhile, the display rendering and touch input processing are handled by Core 1. This separation ensures that the radar sweep remains smooth and the UI never freezes during data fetches.

Data persistence is handled via a FAT32-formatted microSD card, which stores logbooks, airline databases, and session statistics. The project also features an advanced "Performance Auto-Tuning" system. If the device detects sluggishness or memory pressure, it automatically scales back visual effects—such as the weather animations or the comet-tail sweep—to prioritize data accuracy and system stability.

## Connectivity and Smart Home Integration

Beyond the physical screen, Eiswolfs Flightradar acts as a data hub. It features a built-in web server that provides a live radar view and logbook export functionality to any browser on the same network. For smart home enthusiasts, the project includes robust MQTT support with Home Assistant auto-discovery. This allows users to trigger home automation events based on aircraft proximity, such as changing room lighting when a specific flight is nearby.

Alerting is handled through multiple channels. The board's RGB LED provides visual cues for proximity and watchlist matches, while a software-based Morse code SOS pattern triggers for emergency squawks. For remote notifications, the system integrates with ntfy.sh, sending push notifications to mobile devices for specific events like the appearance of military aircraft or a watchlist hit.

## Versatile Location and Hardware Support

While the system can use IP-based geolocation, it truly shines when configured with precise coordinates. It supports up to three location presets, allowing users to virtually "teleport" their radar to different airports around the world. For mobile use, the project supports external GPS modules (like the BN-180), enabling a "Follow-Me Mode" where the radar centers and rotates based on the user's real-time movement and heading.

Updates are streamlined through an Over-the-Air (OTA) firmware system. The device periodically checks GitHub for new releases and can update itself over WiFi, ensuring that users always have access to the latest features and bug fixes without needing to connect a USB cable.
