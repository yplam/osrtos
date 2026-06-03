---
title: ESP32-P4 Grid Board
summary: An advanced animated character display system based on the ESP32-P4 platform
  using the DSI interface to drive a 10.1-inch LCD. It features a 12x5 grid for characters
  and emoji with a unique 'card falling' animation effect. The system utilizes LVGL
  for UI rendering and NimBLE for BLE communication via an external ESP32-C6 co-processor.
slug: esp32-p4-grid-board
codeUrl: https://github.com/0015/Grid_Board
star: 28
lastUpdated: '2025-07-28'
rtos: freertos
libraries:
- lvgl
- nimble
topics:
- ble
- embedded-project
- embedded-ui
- esp-idf
- esp32-p4
- lvgl-esp32
- thatproject
isShow: false
createdAt: '2026-01-13'
updatedAt: '2026-01-13'
relatedProjects:
- deck
- clawdmeter
- animated-gif-on-a-320x240-lcd-display-ili9341-with-the-esp32
- esp32-p4-home-assistant-display
- xiaozhi-ai-desk-buddy-esp32-s3
- lvgl-port-for-esp32
---

## Overview

The Grid Board is a high-performance animated character display system designed for the ESP32-P4 platform. By utilizing the high-speed MIPI DSI interface, the project drives a large 10.1-inch LCD panel to create a 12×5 grid of characters, numbers, and emojis. The project is notable for its smooth, flicker-free animations and its sophisticated hardware architecture, which overcomes the native wireless limitations of the ESP32-P4.

## Hardware Architecture

The system is built around the Waveshare ESP32-P4 Nano board. Because the ESP32-P4 SoC does not include native Wi-Fi or Bluetooth, the Grid Board implements a clever multi-chip solution. It uses an ESP32-C6 as a slave device connected via SDIO. By running the `esp-hosted` and `esp_wifi_remote` components, the main P4 processor gains access to robust BLE functionality. 

Key hardware components include:
- **Main Board:** Waveshare ESP32-P4 Nano
- **Display:** 10.1” JD9365 LCD panel (MIPI DSI)
- **Touch Panel:** GT911 via I2C
- **Audio:** ES8311 for optional sound effects
- **Wireless Co-processor:** ESP32-C6 via SDIO

## Visuals and Animation

The core of the user experience is the 12×5 grid, which supports custom characters and emojis. The project uses LVGL v9.2 for its UI and animation engine. To ensure high performance on a large display, the project uses custom-designed, pre-rasterized pixel fonts (`ShareTech140`) and emoji sets (`NotoEmoji64`). This approach avoids the overhead of runtime glyph loading, allowing for lightning-fast updates.

The signature feature is the "card falling" animation. When a new message is received via BLE, characters do not simply appear; they drop into their respective slots with a physical, falling effect. To maintain a high frame rate and responsiveness, the firmware employs a batching technique, animating only 10 slots at a time before proceeding to the next set. This ensures that the animation remains fluid even when updating the entire 60-cell grid.

## Software Implementation

Developed using ESP-IDF v5.4.2, the project integrates several advanced components:
- **LVGL v9.2:** Handles the rendering of the grid, canvas operations, and the animation system.
- **NimBLE:** Provides a robust BLE GATT server implementation for receiving messages from external devices or mobile apps.
- **MIPI DSI Driver:** Leverages the ESP32-P4's dedicated hardware to refresh the large LCD panel at high speeds.
- **SDIO Communication:** Manages the high-speed interface between the P4 and the C6 for wireless data.

## BLE Communication

The Grid Board acts as a BLE peripheral, allowing users to send text and commands from a smartphone or other central device. The NimBLE stack manages the GATT services, abstracting the complexity of the SDIO bridge to the ESP32-C6. This allows the application logic on the ESP32-P4 to treat BLE communication as if it were native to the chip.
