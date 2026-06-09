---
title: μReflow Oven with MicroPython & LVGL
summary: A PID-controlled reflow oven controller built for the ESP32 using MicroPython
  and the LVGL graphics library. It features a touch-screen interface for selecting
  solder profiles, real-time temperature monitoring via thermocouple amplifiers, and
  remote configuration via FTP.
slug: reflow-oven-with-micropython-lvgl
codeUrl: https://github.com/dukeduck1984/uReflowOven-Esp32-Micropython
star: 125
version: v1.0
lastUpdated: '2020-09-30'
rtos: freertos
libraries:
- lvgl
- micropython
topics:
- buzzer
- esp32
- ili9341
- kitchen-oven
- littlevgl
- lvgl
- max31855
- micropython
- pid
- reflow-oven-controller
- tft-display
- thermocouple
- xpt2046
isShow: true
image: /202601/reflow-oven.webp
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- precius-precision-cooking-and-home-kitchen-automation
- sonosesp-esp32-p4-sonos-controller
- espgaggia-smart-coffee-machine-controller
- micropython-and-lvgl-firmware-for-esp32
- smart-flask-thermos-with-round-display-and-esp32-c3
- esp32-tux
---

## Overview

The μReflow Oven is a sophisticated DIY solution for reflow soldering, designed to transform a standard kitchen oven or heating plate into a precision electronics manufacturing tool. Built specifically for the ESP32 microcontroller, the project leverages MicroPython for its logic and the LittlevGL (LVGL) library to provide a rich, touch-enabled graphical user interface. 

This project is an evolution of the Adafruit EZ Make Oven, heavily modified to support PID (Proportional-Integral-Derivative) temperature control. This ensures that the heating profile closely follows the specific requirements of various solder pastes, preventing component damage and ensuring high-quality solder joints.

## Hardware Architecture

The system is designed around widely available and affordable components, making it accessible for hobbyists and professional engineers alike. The core hardware stack includes:

- **ESP32 Development Board**: Acts as the central controller running MicroPython.
- **ILI9341 TFT Display**: A 2.8-inch or similar screen with an integrated XPT2046 touch controller for user interaction.
- **Thermocouple Amplifier**: Supports both MAX31855 and MAX6675 modules for high-temperature K-type thermocouple sensing.
- **Solid State Relay (SSR)**: Rated for at least 10A to safely switch the oven's heating elements.
- **Passive Piezo Buzzer**: Provides audible alerts during the reflow process.

## Advanced PID Control

Unlike simpler on/off controllers, this project implements a full PID algorithm to manage the heating curve. The PID controller is highly configurable via a `config.json` file or directly through the GUI. To handle the unique challenges of reflow profiles—which are dynamic curves rather than static setpoints—the firmware includes advanced features:

- **Preheat Until**: A threshold temperature where the oven stays at full power to reach initial temperatures quickly.
- **Provisioning**: A look-ahead parameter that allows the PID to react to the setpoint temperature X seconds in advance, improving responsiveness to the changing curve.
- **Overshoot Compensation**: Specific logic to reduce temperature spikes when transitioning between profile stages.

## User Interface and Experience

The GUI, built with LVGL, offers a professional experience on a small screen. Upon first boot, users are guided through a touch screen calibration process. The main interface allows users to select from various solder paste profiles (e.g., Leaded vs. Lead-Free) via a dropdown menu. Once a profile is selected, the ideal temperature curve is displayed visually.

For users with unique requirements, custom solder profiles can be added by placing JSON files in the `profiles` directory. The system also includes a built-in FTP server. By connecting to the ESP32's WiFi access point, users can edit configuration files and upload new profiles wirelessly using a standard FTP client like FileZilla.

## Technical Implementation and Setup

The project is organized into a `MAIN` folder containing the MicroPython scripts and configuration files. Key configuration is handled in `config.json`, where users define GPIO pins for the SPI display, touch controller, SSR, and sensors. 

### PID Tuning Tips
For optimal performance, the project documentation suggests a specific tuning workflow:
1. Set `previsioning` and `overshoot_comp` to zero to establish a baseline.
2. Use a small `kp` (e.g., 0.1) and a large `kd` (e.g., 300) to minimize early-stage overshooting.
3. Gradually increase `ki` to ensure the actual temperature reaches the peak required during the 'reflow' stage. Note that the integration component (`ki`) is specifically hard-coded to activate only during the reflow stage to prevent wind-up during preheating.
