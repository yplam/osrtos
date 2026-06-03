---
title: ESPHome E-ink 4-Color Dashboard
summary: An ESP32-S3 based information display utilizing a 7.5-inch 4-color e-ink
  screen. It integrates with Home Assistant via ESPHome to provide a visual dashboard
  for weather forecasts and calendar events with automated hourly updates.
slug: esphome-e-ink-4-color-dashboard
codeUrl: https://github.com/xangin/eink-4c-dashboard
star: 27
lastUpdated: '2025-12-01'
rtos: freertos
topics:
- dashboard
- e-ink
- esp32
- home-assistant
isShow: false
createdAt: '2026-01-30'
updatedAt: '2026-01-30'
relatedProjects:
- esp32-p4-home-assistant-display
- lvgl-esphome-firmware-for-waveshare-esp32-p4-86-panel
- esp32-s3-smart-home-control-panel
- home-assistant-epaper-remote
- 42-smart-cluster-sign
- e-ink-assist-screen
---

## Overview

The ESPHome E-ink 4-Color Dashboard is a specialized embedded project designed to create a high-visibility, low-power information hub for home automation. Built around the ESP32-S3 microcontroller and a 7.5-inch 4-color e-ink display (GDEM075F52), the project leverages the ESPHome framework to pull data from Home Assistant and render it onto a multi-colored electronic paper screen. 

By utilizing the unique properties of 4-color e-ink—which supports black, white, red, and yellow pigments—the dashboard provides a distinct visual hierarchy for weather alerts, calendar dates, and event titles. The project is specifically optimized for the ESP32-S3 platform, taking advantage of its PSRAM and processing power to handle the memory-intensive rendering required for large, multi-color displays.

## Hardware Architecture

The system is designed to be housed in a standard IKEA RÖDALM photo frame, making it an aesthetically pleasing addition to a home environment. The core hardware components include:

- **Microcontroller**: ESP32-S3 (N16R8 variant) with 16MB Flash and 8MB Octal PSRAM.
- **Display**: 7.5-inch 4-color e-ink display (GDEM075F52) with a 24-pin FPC interface.
- **Interface**: A C02 adapter board to bridge the FPC cable to standard 2.54mm headers.
- **Connectivity**: SPI interface for the display and Wi-Fi for Home Assistant integration.

### Wiring Configuration

The display is connected to the ESP32-S3 via the following GPIO mapping:

| ESP32-S3 | Display Signal |
| :--- | :--- |
| GPIO14 | BUSY |
| GPIO13 | RES (Reset) |
| GPIO12 | D/C (Data/Command) |
| GPIO11 | CS (Chip Select) |
| GPIO10 | SCK (Clock) |
| GPIO9 | SDI (MOSI) |

## Software Implementation

The project uses the ESP-IDF framework under the hood of ESPHome. A critical component of the software stack is the `esphome_epaper` external component, which provides the driver support for the 4-color Waveshare/GoodDisplay panels. 

### Data Integration and Rendering

The dashboard acts as a client to Home Assistant, receiving pre-processed data via Template Sensors. This offloads complex logic (like parsing weather forecasts or calculating calendar offsets) from the microcontroller to the Home Assistant server. The ESP32-S3 then uses a lambda function within the ESPHome configuration to draw the UI elements.

**Key Display Elements:**
- **Date and Time**: Current date, month, and day of the week.
- **Weather Forecast**: Current temperature and precipitation, plus a 4-hour hourly forecast with MDI (Material Design Icons) weather symbols.
- **Calendar**: A full monthly calendar view with the current day highlighted in red.
- **Upcoming Events**: The next four events from a linked calendar, including time, date, and title.

### Update Strategy

Because 4-color e-ink displays do not support partial refresh and have a relatively long full-refresh cycle, the project implements a conservative update strategy. By default, the `update_interval` is set to `never`. Instead, an automation triggers a refresh once per hour (at 15 minutes past the hour) to ensure all Home Assistant sensors have updated their data. Additionally, a "Times of the Day" sensor in Home Assistant can be used to prevent the screen from refreshing during night hours, extending the lifespan of the panel.

## Getting Started

To deploy the dashboard, users must place the provided YAML configurations into their ESPHome directory and the template sensors into their Home Assistant packages folder. The project requires specific fonts (Gotham, GenJyuuGothic, and NotoSansTC) to be present in the `/fonts` directory to render the UI correctly. Once the hardware is wired and the YAML is flashed, the device automatically syncs with Home Assistant to begin displaying the dashboard content.
