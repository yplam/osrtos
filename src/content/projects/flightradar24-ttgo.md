---
title: FlightRadar24-TTGO
summary: FlightRadar24-TTGO is an ESP32-based firmware that provides a real-time aircraft
  tracking display on TTGO and LilyGo-T-Display-S3 modules. It leverages the FlightRadar24
  API for live updates and uses the LVGL library to render detailed flight information
  and carrier logos. The project includes a web-based configuration portal for setting
  location parameters, units, and traffic filters.
slug: flightradar24-ttgo
codeUrl: https://github.com/rzeldent/esp32-flightradar24-ttgo
version: v1.2
lastUpdated: '2026-04-14'
image: /202606/esp32-flightradar24-ttgo_0.avif
rtos: freertos
libraries:
- lvgl
- tft-espi
- spiffs
topics:
- airplanes
- airports
- aviation
- clock
- display-flights
- esp32
- esp32-arduino
- esp32-ttgo
- flight-monitor
- lilygo-t-display-s3
- platformio
- platformio-io
- real-time
- stand-alone
- ttgo
- ttgo-t-display
isShow: true
createdAt: '2026-06-01T11:16:03+00:00'
updatedAt: '2026-06-01T11:16:03+00:00'
relatedProjects:
- nearplane-adsb-tracker
- esp32-flight-tracker
- plane-radar
- elekstube-ips-custom-firmware
- desk-weather-clock-geekmagic-s3
- wt32-sc01-plus-smart-desk-companion
---

FlightRadar24-TTGO is a specialized firmware designed for ESP32-based display modules, specifically the TTGO-Display and LilyGo-T-Display-S3. It provides a real-time visualization of aircraft traffic in a user-defined area without requiring a login or a dedicated account. By tapping into the FlightRadar24 API for live flight updates while maintaining an internal database of airport, aircraft, and airline metadata, the system minimizes network overhead and provides a rich graphical experience.


The project has evolved significantly since its inception in late 2019. Key milestones include the transition to the LVGL graphics library for a more polished UI, the addition of vertical speed and heading indicators, and the implementation of a web-based WiFi manager to simplify configuration. Recent updates have focused on optimizing data tables and improving support for the LilyGo-T-Display-S3 hardware.

### Core Features and Capabilities
The firmware goes beyond simple flight tracking. It performs comprehensive lookups to identify aircraft manufacturers, specific types, and engine configurations. When available, carrier logos and country flags are displayed alongside flight data. Users can view essential telemetry such as registration numbers, altitude, heading, speed, and vertical speed.

To ensure efficiency, the application only requests flight updates from the external API; all static assets like airline graphics and airport coordinates are stored locally within the firmware. Beyond tracking, the device features a status screen for network monitoring and a dedicated clock mode that shows the date and time, accessible via the hardware's top button.

### Hardware Integration and Usage
The project is built using PlatformIO and is optimized for the ESP32 TTGO-Display and LilyGo-T-Display-S3. The high-resolution screens on these modules allow for a dense yet readable layout of flight information.

![Detailed flight information layout on LilyGo-T-Display-S3](/202606/esp32-flightradar24-ttgo_3.avif)

Once flashed, the device initializes an access point named "FlightRadar" for initial configuration. Users can connect to this AP to set up their local WiFi credentials and tracking parameters. After configuration, the device automatically begins updating flights based on the user's specified coordinates.

### Web-Based Configuration and Status
The system includes a robust web interface for managing settings. This interface allows users to define the observation area using decimal latitude and longitude coordinates and set the observation range.

![Web-based configuration interface for settings and filters](/202606/esp32-flightradar24-ttgo_5.avif)

Filtering options are available to include or exclude specific types of traffic, such as airborne flights, grounded aircraft, gliders, or ground vehicles. Users can also configure time zones and choose between metric or imperial units. The status page provides a real-time overview of the device's network health and current settings, making it easy to troubleshoot connectivity issues or verify the active configuration.

### Enclosure and Final Assembly
For those looking to create a finished standalone device, the project supports various enclosure options. 3D-printable STL files are available to house the TTGO-Display along with a battery for portable use.

![3D-printed enclosure for the FlightRadar24 tracker](/202606/esp32-flightradar24-ttgo_6.avif)

Alternatively, the "LILYGO T-Display Shell" can be adapted with minor modifications to fit the project hardware. This flexibility allows users to move the project from a development board to a permanent, desk-ready flight tracker.
