---
title: esp32flight
summary: A standalone flight tracking dashboard for ESP32-S3 touchscreen devices that
  visualizes live ADS-B data, routes, and weather without requiring external servers
  or subscriptions. It utilizes the ESP-IDF framework, LVGL graphics library, and
  standard networking protocols to provide a rich, interactive aviation monitoring
  experience.
slug: esp32flight
codeUrl: https://github.com/theqkash/esp32flight
siteUrl: https://theqkash.github.io/esp32flight/
version: v0.4.4
lastUpdated: '2026-08-10'
licenses:
- MIT
image: /202608/esp32flight_2.avif
rtos: freertos
libraries:
- lvgl
- spiffs
- lwip
topics:
- esp32
- esp32-s3
- flight
- flights
- waveshare-esp32-s3-touch-lcd-7b
isShow: true
createdAt: '2026-08-12T14:03:48+00:00'
updatedAt: '2026-08-12T14:03:48+00:00'
relatedProjects:
- esp32-flight-tracker
- flightradar24-ttgo
- plane-radar
- overhead
- nearplane-adsb-tracker
- flightportrait-firmware
---

### A Standalone Desk Flight Radar

esp32flight is a dedicated flight tracking solution designed to run on a single ESP32 board equipped with a touchscreen. Unlike many other hobbyist flight trackers, it operates entirely without a Raspberry Pi, server, or expensive subscriptions. The project provides a real-time view of aircraft in your vicinity, complete with airline logos, route information, and interactive maps. 

Beyond its life as an embedded firmware, the same codebase powers an Android application, ensuring feature parity across both platforms. Whether running on a desk-mounted display or a mobile device, the system delivers live aircraft tracking with zero reliance on paid API keys.


### Core Functionality and UI

The device offers a variety of ways to visualize aviation data. The main interface provides a live flight list within a configurable radius of up to 250 nautical miles. Users can view detailed information for each aircraft, including the airline, route, altitude trends, and aircraft photos sourced from planespotters.net. For aviation enthusiasts, a "Spotter line" provides a compass and elevation guide to help locate aircraft in the sky.

The UI transitions between five distinct modes:
- **List + Details**: A data-rich view of nearby traffic.
- **Ambient Mode**: An auto-cycling display designed for passive observation.
- **Radar View**: A real-time map showing aircraft positions alongside local airport runway strips.
- **Session Stats**: Hourly charts, daily records, and METAR weather data.
- **Retro Radar**: A CRT-style visualization for a classic aesthetic.

![Detailed flight information view with airline logo and aircraft photo](/202608/esp32flight_0.avif)

Additional layers can be toggled on the radar, such as the International Space Station (ISS) position, radiosondes from the SondeHub network, and AIS-equipped ships. The system also supports airspace outlines (CTR/TMA) for a more professional navigation context.

### Data Sources and Connectivity

The system pulls data from free community ADS-B sources like airplanes.live and adsb.lol with automatic failover. For users who maintain their own local ADS-B receiver (such as a Raspberry Pi running dump1090), the device can connect directly to the local LAN output for faster updates and offline functionality. 

Routes are cross-referenced across multiple databases to ensure accuracy, and an optional FlightAware AeroAPI key can be used to add commercial flight numbers and authoritative flight plans. The device also integrates with Open-Meteo for weather and IP geolocation services to automatically set the user's position.

![Full-screen route map showing the great-circle track](/202608/esp32flight_5.avif)

### Integrations and Web Management

For advanced users, the project offers several integration points. It supports push notifications via ntfy.sh for emergency squawks or watchlist alerts. Home Assistant integration is handled via MQTT with auto-discovery, allowing flight data to trigger smart home automations. 

A built-in web panel accessible at `http://esp32flight.local` provides a centralized interface for configuration, spotting history logs, and OTA firmware updates. The panel also offers a Prometheus metrics endpoint and live screenshots of the device display.

![The built-in web management panel](/202608/esp32flight_7.avif)

### Hardware Support and Architecture

The project is optimized for the ESP32-S3 microcontroller, specifically targeting boards with integrated RGB LCDs. Supported hardware includes:
- **Waveshare ESP32-S3-Touch-LCD-7**: The primary target featuring a 16MB flash and 8MB PSRAM.
- **Waveshare ESP32-S3-Touch-LCD-4.3**: A more compact version with a similar pinout.
- **Guition JC8048W550**: A budget-friendly 5-inch option.
- **Sunton ESP32-4827S043**: A lower-resolution 4.3-inch alternative.

The firmware is built using ESP-IDF 5.5+ and the LVGL 8 graphics library. The build process involves several pre-processing steps to fetch airline logos, generate custom fonts, and bundle airport data into the SPIFFS filesystem. For developers, a desktop simulation environment is available to test the UI and logic on macOS or Linux using SDL2.
