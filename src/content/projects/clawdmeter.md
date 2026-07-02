---
title: Clawdmeter
summary: Clawdmeter is an ESP32-S3-powered desk dashboard that monitors Claude Code
  token usage and displays it on a 2.16" AMOLED screen. It uses the LVGL library for
  its high-resolution UI and the NimBLE stack to communicate with a host daemon via
  BLE, while also functioning as a HID keyboard for shortcuts. The project features
  dynamic pixel-art animations that react to real-time API utilization rates.
slug: clawdmeter
codeUrl: https://github.com/HermannBjorgvin/Clawdmeter
lastUpdated: '2026-05-11'
image: /202605/Clawdmeter_0.avif
rtos: freertos
libraries:
- lvgl
- nimble
- platformio-platformio-core
isShow: true
createdAt: '2026-05-12T00:33:53+00:00'
updatedAt: '2026-05-12T00:33:53+00:00'
relatedProjects:
- oh-my-clawd
- claudegauge
- deskpet
- deck
- ai-desk-card
- deskpet-for-m5stack-cardputer
---

Clawdmeter is a specialized desk companion designed for users of Claude Code. Built on the Waveshare ESP32-S3-Touch-AMOLED-2.16 platform, this dashboard provides a real-time visual representation of token usage through a series of expressive pixel-art animations and data-rich screens. The project bridges the gap between a local development environment and a physical monitoring device using Bluetooth Low Energy (BLE).

## Visualizing Claude Usage
The primary purpose of Clawdmeter is to keep an eye on Claude Code utilization. As token usage increases, the pixel-art mascot, "Clawd," becomes more excited or "busy" on the display. This interactive feedback loop is managed by a background daemon running on the host machine, which communicates usage statistics to the device.


The device features a multi-screen interface powered by the LVGL graphics library. Upon booting, the firmware displays a splash screen featuring the Clawd mascot. Users can cycle through different views using the physical power button or touch interactions.

![Clawd animation screen](/202605/Clawdmeter_1.avif)

## Interface and Navigation
The user interface is divided into three main contexts: Splash, Usage, and Bluetooth.
- **Splash Screen**: Displays the current animation. The firmware automatically rotates through animations every 20 seconds based on the current usage-rate group, ensuring the display remains dynamic.
- **Usage Screen**: Provides a detailed breakdown of session and weekly utilization percentages, along with time-to-reset indicators.
- **Bluetooth Screen**: Displays connection status, the device's MAC address, and options for resetting bonds.

![Splash](/202605/Clawdmeter_2.avif)

Navigation is intuitive: the middle (PWR) button cycles between the Usage and Bluetooth screens, while tapping the screen generally returns the user to the splash screen.

## Hardware and Internal Components
The project targets the Waveshare 2.16" AMOLED module, which integrates an ESP32-S3R8 SoC. This hardware selection provides a high-resolution 480×480 display (314 PPI) and a capacitive touch controller (CST9220).

Key hardware features include:
- **AXP2101 PMU**: Manages power and Li-Po battery charging.
- **QMI8658 IMU**: Integrated inertial measurement unit.
- **Connectivity**: USB-C for flashing and charging, with optional 3.7V Li-Po support via an MX1.25 connector.

## System Architecture and BLE Protocol
The system operates via a daemon that polls Claude usage every 60 seconds. This daemon reads the Claude Code OAuth token from the local filesystem and performs a minimal API call to Anthropic to retrieve rate-limit headers. These headers contain the unified utilization data used to drive the dashboard.

![Bluetooth](/202605/Clawdmeter_4.avif)

Communication between the host and the ESP32 occurs over a custom GATT service. The daemon writes a JSON payload containing session and weekly percentages to a specific RX characteristic. Simultaneously, the device acts as a standard BLE HID keyboard. This allows the physical side buttons to function as shortcuts:
- **Left Button (GPIO 0)**: Sends a 'Space' keypress, intended for Claude Code's voice-mode push-to-talk.
- **Right Button (GPIO 18)**: Sends 'Shift+Tab' to toggle modes within the Claude Code CLI.

## Customization and Asset Pipeline
Clawdmeter relies on a sophisticated asset pipeline to achieve its aesthetic. Fonts are pre-compiled LVGL bitmap fonts, specifically Anthropic's brand fonts like Tiempos Text and Styrene B. Because the project uses LVGL 9, the font generation process involves manual patching of the output files from `lv_font_conv` to ensure compatibility with the updated descriptor structures.

Icons from the Lucide set are converted into RGB565 arrays to match the AMOLED's color space. The Clawd animations themselves are scraped and converted from pixel-art sprites, organized into "mood groups" that correspond to the rate of change in token consumption.

## Deployment and Licensing
Flashing the firmware is handled via the PlatformIO CLI. Once the firmware is active, the device is paired using standard Linux Bluetooth tools (`bluetoothctl`). The project is primarily tested on Ubuntu, though the community is encouraged to contribute MacOS support.

It is important to note the licensing context of the project. While the source code is non-proprietary, the repository includes assets—such as specific fonts and the Clawd mascot—that are proprietary to Anthropic. Users are advised of this "licensing gray area" when forking or redistributing the project.
