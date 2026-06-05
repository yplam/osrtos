---
title: Astronomy Micro Station
summary: A standalone astronomy display for the LILYGO T-Display S3 Pro powered by
  an ESP32-S3. It tracks solar and lunar conditions using the ipgeolocation.io API,
  featuring a touch-enabled interface, LittleFS caching for offline use, and seamless
  Home Assistant integration via MQTT.
slug: astronomy-micro-station
codeUrl: https://github.com/sfrechette/astro-micro-station
lastUpdated: '2026-05-18'
licenses:
- MIT
image: /202606/astro-micro-station_0.avif
rtos: freertos
libraries:
- littlefs
- tft-espi
topics:
- astronomy
- c
- cpp
- esp32
- home-assistant
- lilygo
- lilygo-t-display-s3-pro
- moon
- moonphase
- platformio
- sunrise
isShow: true
createdAt: '2026-06-04T23:38:19+00:00'
updatedAt: '2026-06-04T23:38:19+00:00'
relatedProjects:
- weather-micro-station-for-t-display-s3
- project-aura
- esp32-s3-smart-home-control-panel
- esp32-ascom-alpaca-implementation
- esp32-remote-for-victron
- wt32-sc01-plus-smart-desk-companion
---

The Astronomy Micro Station is a dedicated hardware solution for tracking the sun, moon, and light conditions in real-time. Designed specifically for the LILYGO T-Display S3 Pro, this ESP32-S3 based device provides a comprehensive overview of celestial data, from sunrise and sunset to specific twilight phases and lunar illumination. By fetching data from the ipgeolocation.io Astronomy API and caching it locally, the station remains functional even during temporary network outages.

## Visualizing the Cosmos

The interface is organized into four primary touch-navigated screens, each focusing on a specific aspect of the sky. 

### Moon and Sun Tracking

The **Moon Detail** screen provides a visual representation of the current lunar phase alongside critical data points such as illumination percentage, rise and set times, altitude, azimuth, and distance. 


For solar tracking, the **Day / Sun** screen monitors sunrise, sunset, solar noon, and total day length. It also tracks the sun's current position in the sky (altitude and azimuth) and identifies the beginning and end of the night.


### Twilight Phases

Two dedicated screens handle the transitions between day and night. The **Morning Twilight** screen tracks the astronomical, nautical, and civil twilight phases, as well as the blue and golden hours for the AM period. 

Conversely, the **Evening Twilight** screen monitors the PM golden and blue hours, followed by the three standard twilight phases as the sun descends. Every screen includes a common status bar indicating the date and time of the last API fetch and navigation dots to show the active screen.

![Evening Twilight screen with astronomical and nautical twilight data](/202606/astro-micro-station_3.avif)

## Hardware and Architecture

The project leverages the robust capabilities of the LILYGO T-Display S3 Pro. At its core is the ESP32-S3R8, a dual-core MCU running at 240 MHz. The display is a 2.33" IPS TFT with a resolution of 480×222, driven by the ST7796 controller via SPI. User interaction is handled through a CST226SE capacitive touch controller and a proximity sensor (LTR-553ALS-01) that allows for "wave-to-wake" functionality.

Memory management is crucial for this project, utilizing 16 MB of Flash and 8 MB of Octal PSRAM. The system uses a custom partition scheme allocating 8 MB to LittleFS, which stores the `astro_cache.json` file. This ensures that even if the device reboots without a WiFi connection, it can still display the last known valid astronomical data.

## Smart Home Integration

Beyond being a standalone display, the station integrates deeply with Home Assistant via MQTT Discovery. When enabled, the device automatically registers 19 different sensors, including moon phase, sun altitude, and twilight times. Data is published to JSON topics every 15 minutes, allowing users to trigger home automation based on specific astronomical events without writing any manual YAML configuration.

## Advanced Features and Navigation

The station is designed for nighttime use with a specialized **Red Night-Vision Mode**. A long press anywhere on the screen toggles a deep red theme for the background, cards, and text. In this mode, even the moon phase images are re-rendered as red-luminance to preserve the user's night vision, while the backlight automatically drops to a lower intensity. 

Navigation is intuitive: a simple tap cycles through screens, while physical buttons on the board allow for manual brightness adjustment. The device also features an automatic dimming timer to save power and extend the life of the IPS panel.
