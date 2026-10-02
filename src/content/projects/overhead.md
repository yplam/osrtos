---
title: Overhead
summary: Overhead is a modular multi-page situational-awareness dashboard for ESP32-based
  touchscreen modules, such as the Cheap Yellow Display. Built on the Arduino framework
  and FreeRTOS, it integrates real-time data for satellite passes, aircraft ADS-B
  tracking, aviation weather, and celestial events. The project is specifically engineered
  for reliability on low-memory hardware, featuring a serialized HTTPS task and a
  remote web interface for control and monitoring.
slug: overhead
codeUrl: https://github.com/JamesDavid/Overhead
siteUrl: https://jamesdavid.github.io/Overhead/
lastUpdated: '2026-07-21'
licenses:
- NOASSERTION
rtos: freertos
libraries:
- littlefs
- lwip
topics:
- adsb
- arduino
- astronomy
- aviation-weather
- cheap-yellow-display
- crowpanel
- cyd
- dashboard
- esp32
- esp32-s3
- ham-radio
- iot
- lovyangfx
- ota
- platformio
- satellite-tracking
- sgp4
- space-weather
- star-map
- touchscreen
isShow: false
createdAt: '2026-08-02T06:44:15+00:00'
updatedAt: '2026-08-02T06:44:15+00:00'
relatedProjects:
- cyd-dashboard
- esp32-flight-tracker
- esp32flight
- bbmonitor
- cyd-tactical-weather-station
- nearplane-adsb-tracker
---

## A Real-Time Window to the Cosmos

Overhead is an embedded systems project that transforms inexpensive ESP32-based hardware—specifically the "Cheap Yellow Display" (CYD)—into a dedicated situational-awareness dashboard. It provides a glanceable, always-on observation deck for tracking satellites, rockets, aircraft, and astronomical events. Unlike simple weather stations, Overhead is designed as a modular multi-page application framework capable of handling complex data feeds and real-time visualizations on resource-constrained hardware.

The project is built around an "Intelligent Focus" director, a cross-tab management system that monitors various data providers to surface the most relevant information. Whether it is an upcoming International Space Station (ISS) pass, a rocket launch window opening, or a nearby aircraft squawking an emergency, the system can automatically switch focus or provide visual alerts to ensure critical events are not missed.

## Multi-Domain Tracking Capabilities

Overhead integrates data from several domains into a cohesive user interface. The dashboard is divided into several specialized tabs:

*   **Aviation Radar:** Utilizing ADS-B data, the system displays a north-up radar view with range rings, heading chevrons, and dead-reckoned motion. It includes a bundled database of nearly 4,000 US airports, allowing it to display local radio frequencies and airport identifiers without needing an active network connection for the lookup.
*   **Satellite Tracking:** Using SGP4 algorithms and cached Two-Line Element (TLE) sets, Overhead predicts passes for a watchlist of satellites. It provides polar sky-dome views and ground tracks, indicating when a satellite is sunlit and visible to the naked eye.
*   **Space & Aviation Weather:** The system decodes METAR and TAF reports, provides Skew-T sounding profiles for atmospheric stability analysis, and tracks space weather metrics like the Kp index, solar flux, and aurora probability.
*   **Celestial Navigation:** A real-time star map renders approximately 1,500 stars, constellation figures, and Messier objects. It also includes an orrery for the solar system, tracking the positions of planets, the Moon, and deep-space missions like Voyager.

## Engineering for Low-Memory Hardware

One of the primary technical achievements of Overhead is its ability to run multiple HTTPS data feeds on ESP32 variants without PSRAM. Standard TLS sessions on the ESP32 typically require significant heap space, which can easily lead to out-of-memory crashes when multiple network tasks overlap.

To solve this, Overhead implements a serialized, non-blocking network task. This architecture ensures that only one TLS session exists at any given time. The system is also "heap-floor-aware," meaning it will skip updates or serve stale data rather than attempting a fetch that would risk a system crash. A dedicated WiFi watchdog and stale-data resilience mechanisms further improve long-term stability for an always-on device.

## Remote Management and Extensibility

The project includes a robust remote interface accessible via a web browser. The `/remote` page provides a live screen mirror with interactive touch and swipe controls, allowing users to manage the device from a desktop. For automation and integration, a JSON API provides access to device status, telemetry, and screenshots.

For users interested in physical hardware interaction, the project includes a companion "Rotor" firmware. This optional component uses ESP-NOW to receive azimuth and elevation data from the main dashboard, driving stepper motors to physically point an antenna or pointer at whatever object is currently overhead.

## Hardware Support

Overhead is optimized for the 2.8" ESP32-2432S028R (Cheap Yellow Display) using the ILI9341 controller and XPT2046 resistive touch. It also supports the CrowPanel series and other ESP32-S3 targets. The firmware utilizes LovyanGFX for high-performance graphics rendering, bypassing standard framebuffers to minimize memory usage while maintaining a responsive UI with anti-flicker batching.
