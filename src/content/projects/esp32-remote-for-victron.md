---
title: ESP32 Remote for Victron
summary: An open-source monitoring and control solution for Victron Multiplus II systems
  using the LilyGo T-Display S3 AMOLED. Built on the ESP32 platform, it provides real-time
  data on solar power, grid status, and battery health while allowing users to toggle
  charger and inverter functions.
slug: esp32-remote-for-victron
codeUrl: https://github.com/roblatour/ESP32RemoteForVictron
lastUpdated: '2025-10-22'
licenses:
- MIT
image: /202604/esp32-remote-for-victron.webp
rtos: freertos
topics:
- arduino
- esp32
- lilygo
- victron
isShow: true
createdAt: '2026-04-03T05:32:44+00:00'
updatedAt: '2026-04-03T05:32:44+00:00'
---

## Monitoring and Controlling Victron Systems with ESP32

The ESP32 Remote for Victron project provides a dedicated hardware interface for users of the Victron Multiplus II power system. Developed by Rob Latour, this open-source tool leverages the capabilities of the LilyGo T-Display S3 AMOLED to create a compact, high-visibility dashboard for energy management. By moving system data from a smartphone app or a bulky central console to a dedicated, glanceable display, it offers a streamlined way to manage off-grid or backup power systems.

### Real-Time Power Monitoring

At its core, the project focuses on delivering critical system data at a glance. For users relying on solar and battery storage, keeping track of energy flow is essential for maintaining system health and planning consumption. The remote monitors several key metrics:

- **Incoming Solar and Grid Power**: Track how much energy is being harvested from the sun versus how much is being drawn from the utility grid.
- **Battery Analytics**: View the current state of charge as a percentage, the estimated "Time to Go" based on current usage, and real-time charging or discharging status.
- **AC Load**: Monitor the total power consumption of connected appliances and systems.
- **Operational Status**: Keep tabs on the current mode of both the charger and the inverter.

### Integrated System Control

Beyond simple monitoring, the project enables direct interaction with the Victron Multiplus II. Users can remotely toggle the charger and inverter on or off directly from the device. This is particularly useful for managing power consumption or changing system states without needing to access the main Victron VRM portal or physical switches on the inverter itself. This dual-purpose design makes the device a functional remote control rather than just a passive display.

### Hardware and Design

The project is designed specifically for the LilyGo T-Display S3 AMOLED (non-touch version). This hardware choice is ideal for an embedded remote due to the vibrant, high-contrast AMOLED screen and the powerful ESP32-S3 microcontroller, which handles both the UI and the network communication required to talk to the Victron system.

To help users integrate the device into their living space or van build, the repository includes links to various 3D printable cases. For those looking to maintain a professional look, the project even specifies the exact filament color code—RAL 5012 (Light Blue)—to match Victron’s iconic branding.

### Technical Implementation

The project is built using the Arduino framework for the ESP32. By utilizing the ESP32's integrated Wi-Fi, the remote communicates with the Victron ecosystem, typically interfacing with a GX device (such as a Cerbo GX) that acts as the brain of the Multiplus II installation. The provided source code handles the data parsing and UI rendering, turning raw system metrics into an intuitive visual dashboard. Because it is open source, developers can further customize the interface or add additional monitoring parameters to suit their specific power configuration.
