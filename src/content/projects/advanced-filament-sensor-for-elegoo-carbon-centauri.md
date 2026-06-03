---
title: Advanced Filament Sensor for Elegoo Carbon Centauri
summary: An ESP32-based filament movement sensor for the Elegoo Carbon Centauri 3D
  printer. It integrates a Big Tree Tech SFS 2.0 sensor to detect jams or runouts
  and communicates via WebSockets to pause the printer. The project features a web-based
  UI for configuration and real-time status monitoring.
slug: advanced-filament-sensor-for-elegoo-carbon-centauri
codeUrl: https://github.com/jrowny/cc_sfs
siteUrl: https://jonathanrowny.com/cc_sfs/
star: 87
version: v0.2.2
lastUpdated: '2025-09-11'
rtos: freertos
libraries:
- littlefs
topics:
- 3d-printing
- centauri-carbon
- elegoo
- esp32
isShow: false
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- ikedrybox-smart-3d-filament-dryer
- printpoop-retro-pixel-smart-display-for-bambu-lab-a1
- openspool
- klipper-esp32
- td-free
- printsphere
---

The Elegoo Carbon Centauri is a popular budget-friendly 3D printer, but its stock filament runout sensor has a significant limitation: it is a simple binary switch. While it can tell if filament is present, it cannot detect if the filament has stopped moving due to a tangle, a break after the sensor, or a nozzle clog. The Advanced Filament Sensor project addresses this by using an ESP32 microcontroller and a Big Tree Tech (BTT) SFS 2.0 sensor to provide intelligent movement detection.

## How It Works

Since the Elegoo Carbon Centauri does not have a native input for a movement-based sensor like the BTT SFS 2.0, this project implements a clever workaround. It leverages the printer's open WebSocket communication layer. The ESP32 monitors the SFS 2.0 sensor, which toggles a signal every 2.8mm of filament movement. If the ESP32 detects that the filament has stopped moving for a user-defined timeout period while the printer is active, it sends a WebSocket command to the printer to pause the print.

This approach allows for a non-invasive upgrade that doesn't require deep firmware modifications to the printer itself. Instead, the ESP32 acts as a bridge between the physical sensor and the printer's network interface.

## Hardware and Wiring

The project is designed to be minimal, requiring only an ESP32 (such as the S3 N8R2 or a standard Wroom module) and the BTT SFS 2.0 sensor. Wiring involves connecting four main lines: 5V power, Ground, Runout (blue wire), and Movement/Motion (green wire).

Users have two main integration options:
1. **Stock Integration**: Wiring into the existing runout sensor connector to retain stock functionality while adding movement detection.
2. **Standalone**: Powering the ESP32 via USB and relying entirely on the WebSocket interface to pause the printer, bypassing the stock sensor entirely.

### Standard Pinout

| Wire | Color | ESP32 Pin |
| :--- | :--- | :--- |
| Ground | Black | GND |
| 5V Power | Red | 5V / VIN |
| Runout | Blue | GPIO 12 |
| Movement | Green | GPIO 13 |

## Software and User Interface

The firmware is built using the Arduino framework within the PlatformIO ecosystem. It utilizes several modern libraries, including `ESPAsyncWebServer` for the management interface and `WebSockets` for printer communication. The project also features a sophisticated web UI built with SolidJS and Vite, which is served directly from the ESP32's LittleFS filesystem.

The WebUI allows users to:
- Configure WiFi credentials and the printer's IP address.
- Monitor the real-time status of filament movement.
- Adjust the movement timeout value to match specific print speeds and flow rates.
- Perform Over-the-Air (OTA) updates using the ElegantOTA library.

## Configuration and Tuning

A critical aspect of the system is the timeout setting. Because the ESP32 doesn't know the printer's exact expected flow rate, users must tune a timeout value. If the sensor doesn't detect a state flip within this window, it assumes a jam has occurred. The project intelligently doubles this timeout for the first layer, accounting for the typically slower speeds used during initial adhesion.

This project provides a robust safety net for long prints, ensuring that mechanical failures or filament issues don't result in "printing air" and wasted time.
