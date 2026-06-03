---
title: Alfa Romeo Giulia Dashboard Info Display for ESP32-S3
summary: An Arduino-based project for the ESP32-S3 that displays real-time vehicle
  telemetry like turbo boost, gear position, and temperatures on the Alfa Romeo Giulia's
  instrument cluster. It utilizes dual CAN bus controllers to bridge high-speed engine
  data and low-speed dashboard display signals, leveraging FreeRTOS for multi-core
  processing.
slug: alfa-romeo-giulia-dashboard-info-display-for-esp32-s3
codeUrl: https://github.com/ClaudeMarais/AlfaRomeoGiulia_DashboardInfo_ESP32-S3
star: 17
lastUpdated: '2025-05-12'
rtos: freertos
topics:
- alfa
- alfaromeo
- arduino
- battery
- boost
- can
- car
- dashboard
- esp32
- esp32-s3
- mcp2515
- obd2
- oil
- pid
- psi
- romeo
- rpm
- sn65hvd230
- turbo
isShow: true
image: /202601/alfa-romeo-giulia.wepb
createdAt: '2026-01-14'
updatedAt: '2026-01-14'
relatedProjects:
- giulia-tft
- bmw-e90-can-cluster-arduino-project
- wute-dashboard-for-formula-student-electric
- bbmonitor
- euc-dash-esp32-dashboard
- bmw-idrive-controller-can-bus-interpreter
---

## Overview

This project provides a sophisticated way for Alfa Romeo Giulia owners to monitor their vehicle's performance directly through the factory instrument cluster. By leveraging the ESP32-S3's dual-core architecture, the system intercepts and processes vehicle telemetry from the high-speed CAN bus and injects custom text into the dashboard's infotainment display area—the space typically reserved for radio station names or media information.

## Technical Architecture

The project addresses a unique hardware challenge: the Alfa Romeo Giulia uses different CAN buses for different functions. Engine data like RPM and boost pressure reside on the high-speed CAN bus, while the dashboard display is controlled via the low-speed CAN bus. 

To bridge these networks, the system employs two separate CAN controllers:
- **Internal TWAI Controller**: The ESP32-S3's built-in Two-Wire Automotive Interface (TWAI) paired with an SN65HVD230 transceiver handles high-speed data collection.
- **External MCP2515 Controller**: An SPI-based MCP2515 controller with a TJA1050 transceiver manages communication with the low-speed dashboard bus.

## Multi-Core Processing with FreeRTOS

The firmware utilizes FreeRTOS to distribute the workload across the ESP32-S3's two cores. One core is dedicated to the high-frequency task of polling OBD2 PIDs and listening for broadcasted CAN frames. The second core manages the display logic, formatting strings, and timing the injection of CAN frames to ensure custom text appears smoothly without flickering against the car's factory infotainment signals.

```cpp
// Create task that will display info on dashboard using ESP32-S3 core 0
xTaskCreatePinnedToCore(DisplayInfoOnDashboard, nullptr, 1024 * 128, nullptr, 1, &g_TaskDisplayInfoOnDashboard, 0);
```

## Key Features

- **Real-time Telemetry**: Displays turbo boost pressure (PSI), current gear (e.g., D2, R, N), engine temperature, and oil temperature.
- **Performance Monitoring**: Tracks maximum boost achieved during a drive and displays it when the car is idling.
- **Safety Warnings**: Provides proactive alerts, such as warning the driver if engine RPM exceeds 3000 while the oil temperature is still below 70°C.
- **Turbo Maintenance**: Includes a cooldown timer that estimates how long the engine should idle after spirited driving before being shut off.
- **Power Management**: To prevent battery drain from the always-on OBD2 12V pin, the system implements a deep-sleep cycle, checking for ignition status and dropping to ~1mA consumption when the car is off.

## Data Collection and PIDs

The project includes a robust implementation for requesting and calculating various OBD2 PIDs specific to the 2.0L Petrol Giulia. It handles both requested data (via ECM/BCM modules) and passively broadcasted data (like Gear and RPM) to provide a comprehensive view of the vehicle's state.

```cpp
PID PIDs[] = { 
  { "Boost Pressure", CarModule::ECM, OBD2Service::ManufacturerSpecific, 0x195a, &CalcBoostPressure, PrintBoostPressure },
  { "Engine Oil Temp", CarModule::ECM, OBD2Service::ManufacturerSpecific, 0x1302, &CalcEngineOilTemp, PrintEngineOilTemp },
  { "Battery", CarModule::ECM, OBD2Service::ManufacturerSpecific, 0x1004, &CalcBattery, PrintBattery } 
};
```

## Hardware Requirements

To build this project, users need a XIAO ESP32-S3, a 12V to 5V voltage regulator, an SN65HVD230 transceiver, and an MCP2515 controller. Because modern Alfa Romeos often include a Security Gateway (SGW), an SGW bypass module is typically required to allow the ESP32 to write data to the dashboard bus.
