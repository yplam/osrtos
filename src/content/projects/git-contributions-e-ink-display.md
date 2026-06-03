---
title: Git Contributions E-Ink Display
summary: An ESP32-based wireless e-ink display designed to track and showcase GitHub
  contribution streaks. Utilizing the Lilygo T5 development board, the project features
  ultra-low power consumption for months of battery life and a captive portal for
  easy WiFi configuration.
slug: git-contributions-e-ink-display
codeUrl: https://github.com/HarryHighPants/esp32-git-contributions-epd
star: 113
version: 1.0.0
lastUpdated: '2025-06-10'
rtos: freertos
topics:
- contribution-graph
- e-ink
- esp32
isShow: true
image: /202601/elekscava.webp
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- tibber-price-e-ink-display
- c-quiz-on-e-ink-display
- e-paper-climate-logger-weathergotchi
- e-ink-meeting-room-schedule-display
- esp-e-paper-component
- paperlesspaper-e-paper-photo-frame-hardware
---

## Showcasing Your Commit Streaks in Low Power

The Git Contributions E-Ink Display is a specialized firmware for the ESP32 that allows developers to visualize their GitHub activity on a wireless, low-power screen. By leveraging the energy-efficient nature of e-paper technology, this project creates a dedicated physical dashboard for commit history that can run for approximately three months on a single 1200mAh battery charge.

## Hardware Architecture

The project is built around the **LILYGO® T5 2.13-inch E-Paper Development Board**. This specific board is an ideal choice for the project as it integrates an ESP32 microcontroller with a high-contrast e-ink display. The developer notes that while the board supports various display drivers, the GDEM0213B74 panel provides a sharper image for this specific application. 

To make the device portable and desk-friendly, the project includes designs for a 3D-printed case and stand. The hardware setup is rounded out with a 3.7V LiPo battery, which fits snugly within the custom enclosure, and M3 hardware for assembly.

## Software and Configuration

One of the standout features of this project is its user-friendly configuration mode. Rather than hardcoding credentials, the device uses a captive portal system:

- **Captive Configuration**: By holding a physical button for two seconds, the ESP32 enters a configuration mode, creating its own WiFi access point named "Contributions screen."
- **Web Interface**: Once connected, users are presented with a web form to enter their WiFi credentials and GitHub settings.
- **Persistence**: Configuration values are stored in RTC memory, which persists through deep sleep cycles, ensuring the device remembers settings without needing to write to flash constantly.

## Data Fetching and Rendering

Because the GitHub GraphQL API can be heavy for a microcontroller to parse directly, the project utilizes a custom [github-contributions-api](https://github.com/HarryHighPants/github-contributions-api) written in NodeJS and TypeScript. This middleware fetches the user's data and transforms it into a simplified integer array representing commit levels (0-4). 

The ESP32 fetches this data at a configurable interval (defaulting to every 4 hours). If the data has changed, the device updates the display using the **Adafruit GFX Library** and the **GxEPD2_4G** library, which supports greyscale rendering on e-ink panels. This allows for the classic "GitHub Green" grid to be represented accurately in shades of grey.

## Power Management

To achieve its three-month battery life, the system makes extensive use of the ESP32's deep sleep capabilities. The device spends the vast majority of its time in a low-power state, only waking up to perform a quick WiFi handshake, fetch a small JSON payload, update the display if necessary, and return to sleep. The use of `esp_sleep_get_wakeup_cause` allows the firmware to distinguish between a scheduled update and a user-triggered configuration request.
