---
title: TeslaCAN
summary: TeslaCAN is an open-source CAN bus modification firmware for the ESP32-C6
  designed for Tesla Model 3 and Y vehicles. It enables FSD activation, driver-attention
  nag suppression, and real-time battery telemetry via a built-in LCD, WiFi dashboard,
  or Flipper Zero companion.
slug: teslacan
codeUrl: https://github.com/tuncasoftbildik/tesla-can-mod
lastUpdated: '2026-05-13'
licenses:
- MIT
rtos: freertos
topics:
- arduino
- automotive
- can-bus
- electric-vehicle
- esp32
- esp32-c6
- flipper-zero
- flipper-zero-app
- fsd
- hardware-hacking
- hw3
- hw4
- model-3
- model-y
- model-y-juniper
- obd2
- platformio
- tesla
- tesla-fsd
- tesla-mod
isShow: false
createdAt: '2026-07-20T09:55:50+00:00'
updatedAt: '2026-07-20T09:55:50+00:00'
---

TeslaCAN is a versatile open-source firmware designed for the Waveshare ESP32-C6-LCD-1.47, specifically tailored for Tesla Model 3 and Model Y owners who want deeper integration and control over their vehicle's CAN bus. By plugging into the diagnostic port, TeslaCAN enables a suite of features ranging from automation enhancements to real-time performance monitoring.

### Core Functionality
At its heart, TeslaCAN provides Full Self-Driving (FSD) activation at the CAN frame layer (contingent on an active vehicle entitlement) and suppresses driver-attention "nags" and ISA speed-warning chimes. Beyond these modifications, it serves as a powerful telemetry tool, displaying live battery health metrics such as State of Charge (SoC), voltage, current, pack temperature, and energy consumption in Wh/km. It even includes a dedicated trigger for battery preconditioning, allowing users to heat the battery pack manually before arriving at a charger.

### Hardware and Connectivity
The project is built on the ESP32-C6, taking advantage of its WiFi 6 and BLE 5.0 capabilities. It utilizes the native Two-Wire Automotive Interface (TWAI) driver for CAN communication, paired with an SN65HVD230 transceiver. The system is designed to be affordable, with a total bill of materials around $25.

What sets TeslaCAN apart is its multiple interaction modes:
- **Standalone Mode**: The ESP32-C6’s built-in 1.47-inch color LCD provides an immediate, phone-free readout of vehicle status.
- **WiFi Dashboard**: Users can connect to a built-in WiFi access point to view a full web dashboard at a local IP address.
- **Flipper Zero Companion**: For users with a Flipper Zero, TeslaCAN includes a companion application that communicates with the ESP32 over a 4-wire UART link, turning the Flipper into a handheld controller and dashboard.
- **Python Client**: A reference Python script allows for testing and streaming data directly to a laptop.

### Technical Architecture
The codebase is organized into specialized handlers to support different vehicle generations, including Tesla Model 3/Y with Hardware 3 (HW3), Hardware 4 (HW4/Juniper), and legacy Autopilot systems. The firmware manages complex CAN IDs such as `0x3FD` for Autopilot control and `0x132` for high-voltage bus status.

### Configuration and Build
TeslaCAN is developed using the PlatformIO ecosystem and the Arduino framework. Configuration is handled through build flags in the `platformio.ini` file, allowing users to define their specific vehicle hardware, pin mappings for the CAN transceiver, and UART settings for the Flipper Zero bridge.

```ini
build_flags =
    -D HW4                        ; vehicle handler: HW4 / HW3 / LEGACY
    -D DRIVER_TWAI                ; ESP32 native CAN driver
    -D TWAI_TX_PIN=0
    -D TWAI_RX_PIN=1
    -D FLIPPER_UART_ENABLE        ; enable the Flipper bridge
```

### Vehicle Support
TeslaCAN currently targets the Tesla Model Y (including the Juniper/HW4 update) and Model 3. It supports various diagnostic port configurations and provides detailed signal layouts for battery and steering references. The project is designed for extensibility, with a roadmap that includes OTA updates, SD-card logging, and support for the Model S and X (Palladium) platforms.
