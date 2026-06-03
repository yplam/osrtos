---
title: 'ELEVOURER: Portable Intelligent Electronic Load'
summary: An ESP32-S3 based portable intelligent electronic load featuring high-precision
  control and a rich graphical interface. It utilizes FreeRTOS for multi-tasking and
  integrates PID and Model Predictive Control (MPC) algorithms with Kalman filtering
  for accurate current regulation. The system supports Constant Current (CC), Constant
  Power (CP), and Constant Resistance (CR) modes with real-time monitoring via LVGL.
slug: elevourer-portable-intelligent-electronic-load
codeUrl: https://github.com/skyswordx/ESP32-S3-ELECTRONIC-LOAD
star: 11
version: v1.0-alpha
lastUpdated: '2025-06-30'
rtos: freertos
libraries:
- lvgl
- tft-espi
topics:
- 3d-models
- electronic-load
- electronics-engineering
- embedded-systems
- esp-arduino
- esp32-s3
- freertos
- ips-screen
- kalman-filter
- lceda
- logo-design
- lvgl-esp32-port
- made-with-love
- mpc-control
- pid-controller
- solidworks-pcb-parts
- sysu
- sysu-course
isShow: true
image: /202601/electronic-load.webp
createdAt: '2026-01-28'
updatedAt: '2026-01-28'
relatedProjects:
- esp32-s3-smart-home-control-panel
- esp32-lab-power-supply
- embedded-graphical-interface-for-pid-control
- reflow-oven-with-micropython-lvgl
- esp32-remote-for-victron
- project-aura
---

## Overview

ELEVOURER is a high-precision, portable intelligent electronic load designed for power supply testing, battery discharge analysis, and circuit debugging. Built on the powerful ESP32-S3 dual-core processor, the project leverages a multi-tasking architecture to provide real-time control and a responsive user interface. It stands out by implementing advanced control theory, including Model Predictive Control (MPC) and PID, alongside signal processing techniques like Kalman filtering to ensure stable and accurate load characteristics.

## Key Features and Capabilities

The system provides three primary load modes to accommodate various testing scenarios:
- **Constant Current (CC):** Maintains a steady load current ranging from 50mA to 1800mA with ±0.1% precision.
- **Constant Power (CP):** Dynamically adjusts current based on input voltage to maintain a set power consumption (0.1W to 20W).
- **Constant Resistance (CR):** Simulates a linear resistive load (1Ω to 1000Ω) by calculating the required current relative to the input voltage.

Beyond basic loading, ELEVOURER includes a robust safety protection system. It monitors for over-voltage (up to 12V), over-current (up to 1.8A), and over-power (up to 20W) conditions. It also features rate-of-change limiting to prevent current spikes and thermal monitoring to protect the hardware during high-load operations.

## Technical Architecture

The project is built on a modular software stack using the Arduino framework and ESP-IDF, managed via PlatformIO. It utilizes FreeRTOS to handle concurrent tasks, ensuring that high-priority control loops for the load regulation do not interfere with the graphical user interface or sensor sampling.

### Control and Filtering
One of the most sophisticated aspects of ELEVOURER is its dual-controller approach. It combines a standard PID controller (with anti-windup and derivative kick protection) with Model Predictive Control (MPC). The MPC handles multi-constraint optimization, allowing the device to proactively manage load transitions. To clean up the noise from the INA226 current sensor, a one-dimensional Kalman filter is employed, providing a smooth and reliable feedback signal for the control loops.

### Hardware Integration
- **Microcontroller:** ESP32-S3 with 16MB Flash and 8MB PSRAM.
- **Sensing:** INA226 high-precision bi-directional current/power monitor.
- **Output:** MCP4725 12-bit DAC for controlling the analog load circuit.
- **Interface:** 3.5-inch TFT (ILI9488) with touch support and a rotary encoder for tactile parameter adjustment.
- **GUI:** Powered by LVGL 8.3.10, providing real-time wave-forms, historical data curves, and intuitive menu navigation.

## Getting Started

The project is designed to be compiled using PlatformIO within VS Code. The hardware requirements include an ESP32-S3 development board and the specific I2C/SPI modules mentioned above. 

```cpp
// Example of the pin configuration used in the project
// INA226 & MCP4725: SDA=GPIO8, SCL=GPIO9
// TFT Display: MOSI=GPIO11, MISO=GPIO13, SCK=GPIO12
// Encoder: CLK=GPIO1, DT=GPIO2, SW=GPIO42
```

Once the hardware is wired and the firmware is uploaded, the system performs an automatic sensor calibration. Users can switch between modes using physical buttons or the touchscreen, and adjust target values via the rotary encoder. The modular library structure (found in the `lib/` directory) makes it easy for developers to extend the project with new control algorithms or hardware drivers.
