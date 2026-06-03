---
title: BETTA HA Panel
summary: BETTA HA Panel is a runtime-configurable Home Assistant dashboard firmware
  for ESP32-P4 and ESP32-S3 touchscreen devices. Built on the ESP-IDF framework using
  LVGL and LittleFS, it allows users to design complex, multi-page layouts via a web-based
  drag-and-drop editor without requiring YAML configuration or firmware rebuilds.
slug: betta-ha-panel
codeUrl: https://github.com/cptkirki/BETTA-HA-PANEL
siteUrl: https://github.com/cptkirki/BETTA-HA-PANEL/blob/main/README.md
version: v0.8.2
lastUpdated: '2026-05-09'
licenses:
- NOASSERTION
image: /202605/BETTA-HA-PANEL_0.avif
rtos: freertos
libraries:
- littlefs
- lvgl
- lwip
topics:
- dashboard
- dashboards
- esp-idf
- esp32
- esp32-p4
- home-assistant
- homeassistant
- iot
- smart-home
- smart86
- smarthome
- touchscreen
- wall-panel
- waveshare
- websocket
isShow: true
createdAt: '2026-05-19T23:55:27+00:00'
updatedAt: '2026-05-19T23:55:27+00:00'
relatedProjects:
- esp32-p4-home-assistant-display
- lvgl-esphome-firmware-for-waveshare-esp32-p4-86-panel
- openhasp-firmware
- esp32-s3-smart-home-control-panel
- esp-e-paper-component
- home-assistant-epaper-remote
---

BETTA HA Panel provides a professional-grade, runtime-configurable interface for Home Assistant, specifically optimized for high-performance ESP32-P4 and ESP32-S3 touchscreen hardware. Unlike traditional ESPHome-based solutions that require YAML edits and firmware recompilation for every UI change, this project allows users to build and modify their dashboards directly on the device using a web-based editor.

### Supported Hardware and Performance

The project is designed to leverage the advanced capabilities of modern Espressif microcontrollers. It currently supports three primary hardware variants:

*   **panel4**: The Waveshare ESP32-P4-WIFI6-Touch-LCD-4B (4" 720×720).
*   **panel10**: The Waveshare ESP32-P4 Module Nano paired with a 10.1" DSI panel (1280×800).
*   **panels3**: The Guition ESP32-S3-4848S040 (4" 480×480).


For the P4-based devices, the system utilizes an ESP32-C6 network coprocessor via SDIO to handle Wi-Fi 6 connectivity, while the P4 host manages the high-resolution display using LVGL and hardware acceleration. The ESP32-S3 variant provides a more compact alternative while maintaining the same rich feature set.

### Comprehensive Feature Set

At its core, the panel maintains a live link to Home Assistant via WebSockets, supplemented by REST for forecasts and long-poll state updates. The built-in BETTA Editor, accessible via a standard web browser at the device's IP address, offers a drag-and-drop interface for managing widgets and multi-page layouts.

The widget library is extensive, covering standard entities like sensors, buttons, and sliders, alongside advanced modules for media players, Roborock vacuums, and climate control. One of the standout features is the Energy Dashboard, which provides automatic visualization of grid, solar, battery, and gas flows based on the Home Assistant energy model.

![Energy dashboard showing solar and grid flow](/202605/BETTA-HA-PANEL_6.avif)

For data visualization, the system includes a robust graphing engine capable of event-rate sampling up to 4096 points with progressive decimation, supporting line, smoothed line, and bar-chart modes. The UI is also highly polished, featuring auto-dimming backlights, stable GT911 touch integration, and multi-language support (English, German, Spanish, and French).

### Deployment and Configuration

Getting started involves flashing a factory image to the device. Upon first boot, the panel creates a `BETTA-Setup` Wi-Fi access point. A guided provisioning flow allows users to connect the device to their local network and link it to Home Assistant using a long-lived access token. 

![Widget inspector and configuration tool](/202605/BETTA-HA-PANEL_2.avif)

Once connected, the Quick Setup flow can generate a starter dashboard automatically. Maintenance is simplified through an integrated OTA update system, allowing users to upload new firmware versions directly through the web editor without needing a physical USB connection.

### Technical Foundation

The firmware is built using **ESP-IDF v5.5.2** and utilizes several key components for its operation. It relies on **LVGL** for the graphical user interface, **LittleFS** for local storage of configuration and assets, and **LWIP** for networking. The build system is modular, dynamically injecting variant-specific manifests to ensure that the correct drivers—such as those for the P4's DSI interface or the S3's RGB panel—are included based on the target hardware.
