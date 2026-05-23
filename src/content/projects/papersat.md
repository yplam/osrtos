---
title: PaperSat
summary: PaperSat is a standalone satellite tracking application for the M5Paper S3
  e-ink tablet, providing real-time orbital predictions and polar sky plots. It utilizes
  SGP4 propagation for high-accuracy tracking and features an offline-first design
  with LittleFS for TLE data caching. The project is designed for amateur radio operators
  and observers, offering on-device configuration for location and time.
slug: papersat
codeUrl: https://github.com/prstoetzer/PaperSat
version: '1.7'
lastUpdated: '2026-05-10'
licenses:
- MIT
rtos: freertos
libraries:
- littlefs
isShow: true
image: /202605/papersat.webp
createdAt: '2026-05-23T00:50:57+00:00'
updatedAt: '2026-05-23T00:50:57+00:00'
---

PaperSat is a professional-grade satellite tracking dashboard designed specifically for the M5Stack M5Paper S3. By leveraging the unique capabilities of e-ink technology, it provides a high-contrast, low-power solution for amateur radio operators (hams), visual observers, and educators who need reliable orbital data in the field. Unlike many tracking solutions that require a tethered smartphone or laptop, PaperSat is entirely self-contained, handling everything from TLE (Two-Line Element) acquisition to complex orbital mechanics on-device.

### Hardware and Display Optimization

The project is built for the M5Paper S3, which features a 960×540 capacitive touch e-ink display. The choice of e-ink is ideal for satellite tracking, as it offers excellent sunlight readability for outdoor observation. PaperSat optimizes the display's refresh behavior to mitigate the inherent ghosting of e-ink screens. It uses selective area clearing (via `fillRect`) for dynamic data like the pass list and status updates, performing full screen refreshes only when transitioning between UI states. To further conserve power and extend the life of the display, the application employs an adaptive polling interval: refreshing every 15 seconds when a satellite is visible above the horizon and dropping to once per minute when the target is hidden.

### Orbital Mechanics and Prediction

At the heart of PaperSat is the SGP4 (Simplified General Perturbations) propagator, implemented via the SparkFun SGP4 library. This allows the device to calculate the precise Azimuth and Elevation of a satellite relative to the user's location. A notable technical achievement in the project is its hybrid AOS (Acquisition of Signal) calculation. While standard libraries often struggle with the precise start times of eccentric orbits (like the RS-44), PaperSat implements a custom refinement algorithm. It searches backward from the predicted peak elevation in coarse 30-second steps, followed by fine 1-second steps, to accurately pinpoint the exact moment a satellite crosses the horizon.

The application tracks up to eight future passes, displaying the next three with high precision, including UTC start/end times and maximum elevation. For visual observers, it renders a polar sky plot that includes concentric elevation rings and cardinal azimuth radials. When a satellite is active, a direction-of-travel arrow predicts its position 45 seconds into the future, helping observers lead their antennas or telescopes.

### Offline-First Architecture

Recognizing that satellite observers are often in remote locations, PaperSat follows an offline-first philosophy. It downloads the full AMSAT `nasabare.txt` TLE collection—containing over 60 popular satellites—and caches it in the ESP32-S3's internal flash memory using the LittleFS file system. Once this initial data is cached, the device functions 100% offline. It includes smart logic to refresh this cache every 24 hours only if a WiFi connection is available and the system time has been synchronized via NTP.

### User Experience and Configuration

The UI is designed for touch interaction without the need for external peripherals. Users can configure their location using either decimal Latitude/Longitude or a Maidenhead Grid Locator (supporting 4- or 6-character precision). For those without internet access, the system allows for manual UTC time and date entry to ensure the SGP4 calculations remain accurate. WiFi setup is simplified through a built-in captive portal powered by WiFiManager, allowing users to configure network credentials via a smartphone if they choose to update their TLE data in the field.
