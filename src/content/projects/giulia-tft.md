---
title: Giulia TFT
summary: An ESP32-based telemetry display for Alfa Romeo Giulia and Stelvio JTDm vehicles.
  It interfaces with a Bluetooth OBD2 adapter to monitor engine parameters, DPF regeneration
  cycles, and battery health using the LVGL graphics library on a touchscreen TFT
  display.
slug: giulia-tft
codeUrl: https://github.com/anegrin/GiuliaTFT
star: 15
lastUpdated: '2025-02-20'
rtos: ''
libraries:
- lvgl
- tft-espi
topics:
- alfaromeo
- bluetooth
- dpf
- esp32
- ili9341
- ili9488
- obd2
- tft
isShow: true
image: /202603/giulia-tft.webp
createdAt: '2026-03-11'
updatedAt: '2026-03-11'
---

## Visualizing Alfa Romeo Telemetry with Giulia TFT

Giulia TFT is an open-source embedded project designed specifically for owners of the Alfa Romeo Giulia and Stelvio JTDm (diesel) models. The project addresses a common need for enthusiasts: monitoring real-time engine data and Diesel Particulate Filter (DPF) health, which is often hidden from the standard dashboard. By leveraging the ESP32 microcontroller and a high-quality touchscreen display, Giulia TFT provides a professional-grade telemetry interface that connects to the vehicle via a Bluetooth OBD2 adapter.

## Comprehensive Vehicle Monitoring

The application is divided into two primary data screens, easily toggled via the touchscreen interface. The **Main Screen** focuses on performance and emissions, displaying critical values such as absolute boost pressure, current gear, coolant temperature, and intake air temperature. Most importantly for diesel owners, it provides a detailed breakdown of the DPF status, including clogging percentage, current temperature, regeneration progress, and the distance traveled since the last regeneration cycle.

For deeper vehicle health insights, the **Secondary Screen** tracks total DPF regeneration counts, battery voltage, and the Intelligent Battery Sensor (IBS) percentage. It also monitors engine oil degradation, gearbox oil temperature, and individual tire temperatures, making it a comprehensive tool for both daily driving and performance monitoring.

## Hardware and Connectivity

The project is built around the **ESP32**, specifically targeting the ELECROW 3.5-inch HMI Display (320x480 resolution) using the ILI9488 driver. Connectivity to the car's ECU is handled through a Bluetooth OBD2 adapter, with the developer recommending the ScanTool OBDlink LX for its reliability and high data throughput. 

One of the standout features is the automated power management. Giulia TFT is designed to handle deep sleep and reboot cycles automatically based on the engine state or the status of the Bluetooth connection, ensuring that the device doesn't drain the car's battery when parked.

## Technical Implementation

Giulia TFT is developed using the **Arduino framework** and managed via **PlatformIO**. It utilizes several sophisticated libraries to achieve its polished look and feel:

- **LVGL (Light and Versatile Graphics Library):** Used to create the modern, responsive user interface.
- **TFT_eSPI:** Provides the low-level display drivers and SPI communication logic.
- **ELMduino:** Handles the ELM327 protocol communication over Bluetooth Serial.
- **ESP32-Buzzer:** Provides audible alerts, such as a 5-beep warning when a DPF regeneration begins.

## Development and Customization

The project includes a robust development environment. Because flashing hardware repeatedly can be time-consuming, the repository includes **SDL2-based emulators** for both 3.5-inch and 2.8-inch displays. This allows developers to refine the UI on a PC (64-bit Windows/Linux/macOS) before deploying to the ESP32.

Customization is also a core part of the project. Users can modify the splash screen message (e.g., changing "Giulia TFT" to "Stelvio TFT") and adjust the display rotation. The latter is particularly useful for Right-Hand Drive (RHD) models, where the viewing angle might require a 180-degree flip of the landscape orientation. 

## Getting Started

To build the project, users need Visual Studio Code with the PlatformIO plugin. The `platformio.ini` file is pre-configured with environments for the physical hardware (`denky32`) and the desktop emulators. On the first boot, the firmware initiates a touchscreen calibration wizard, ensuring that the UI interactions are precise for the specific hardware used. For those who want to test the interface without a vehicle, a `GT_DEMO` build flag is available to populate the screens with randomized data.
