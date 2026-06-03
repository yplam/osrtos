---
title: BluButton
summary: BluButton is an open-source firmware for ESP32 and ESP32-C3 devices, implementing
  a BLE button transmitter compatible with the Shelly BLU Button ecosystem. Built
  on ESP-IDF v6.0 and FreeRTOS, it focuses on high energy efficiency through deep-sleep
  cycles and provides encrypted advertising for secure button event triggers.
slug: blubutton
codeUrl: https://github.com/robertoamd90/blu-button
siteUrl: https://robertoamd90.github.io/blu-button/
version: v0.0.4
lastUpdated: '2026-05-03'
licenses:
- GPL-3.0
rtos: freertos
libraries:
- lwip
isShow: true
image: /202605/blu-button.webp
createdAt: '2026-05-04T03:47:06+00:00'
updatedAt: '2026-05-04T03:47:06+00:00'
relatedProjects:
- bleota-esp32-ota-updates-over-ble
- ruuvitag-firmware-for-zephyr-os
- esp32-ble-ota-arduino
- nimble-ota
- buttfinity
- everblu-cyble-enhanced-rf-meter-reader
---

## Overview

BluButton is a specialized firmware project designed for the ESP32 family of microcontrollers, transforming them into open-source Bluetooth Low Energy (BLE) button transmitters. The primary design goal is strict compatibility with the Shelly BLU Button ecosystem, allowing the hardware to be indistinguishable from official Shelly devices from the perspective of receivers like the BluButtonBridge.

Built on the latest ESP-IDF v6.0 framework, BluButton prioritizes a "lean and mean" approach. It intentionally avoids high-overhead features like Wi-Fi, web UIs, or on-device MQTT engines to maximize battery life and simplify the initial setup. Instead, it focuses on the core mechanics of a remote trigger: reliable gesture detection, secure encrypted advertising, and aggressive power management.

## Hardware and Power Efficiency

The project provides native support for several popular development boards, including the ESP32 DevKit V1, the ESP32-C3 SuperMini, and the Seeed XIAO ESP32-C3. By utilizing the ESP32-C3 series, BluButton takes advantage of modern RISC-V architecture and efficient power consumption profiles.

The runtime model is built around deep-sleep cycles. In its idle state, the device remains in deep sleep to conserve energy. A button press triggers a wake event, which immediately opens a gesture-capture session. To keep the response time as low as possible, the BLE stack begins its startup sequence concurrently with the gesture detection, ensuring that the advertisement is ready to fire the moment the button action is classified.

## Gesture Detection and Events

Despite its simplicity, BluButton supports a variety of interaction models. The firmware can detect and transmit four distinct button events:
- Single Press
- Double Press
- Triple Press
- Long Press

Additionally, a 10-second "maintenance hold" is reserved for local administrative tasks, such as re-printing device credentials or resetting the identity. The gesture engine is designed to be resilient; wake-triggering holds are credited for the boot time already spent, ensuring that long-press detection remains accurate even when waking from a cold sleep state.

## Security and Identity

To maintain compatibility with the Shelly BLU Button protocol, BluButton implements a robust security layer. Upon the first boot, the device generates a unique AES key and stores it in Non-Volatile Storage (NVS). This key, combined with a persisted monotonic counter, is used to sign and encrypt BLE advertisements, preventing replay attacks and ensuring that only authorized bridges can interpret the button events.

For maintenance, the project includes specialized scripts to extract these keys directly from the device's NVS partition via the ROM bootloader path. This is particularly useful for boards where the native USB-serial link might drop during deep-sleep transitions, providing a reliable way to register the device with a home automation controller.

## Deployment and Workflow

BluButton embraces a modern deployment workflow through a browser-based installer hosted on GitHub Pages. Utilizing ESP Web Tools, users can flash the firmware directly from a web browser without needing to install local development environments. The installer is board-aware, pulling specific partition tables and bootloaders based on the target hardware identified in the project's configuration catalog.

For developers, the project maintains a multi-target build setup from day zero. Using helper scripts, contributors can manage different `sdkconfig` overlays for various boards, ensuring that GPIO mappings and hardware-specific configurations remain isolated from the core application logic.
