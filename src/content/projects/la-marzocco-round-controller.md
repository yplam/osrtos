---
title: La Marzocco Round Controller
summary: A standalone ESP32-S3 firmware project for a custom round external controller
  for La Marzocco espresso machines. It utilizes the ESP-IDF framework, FreeRTOS,
  and the LVGL graphics library to provide an on-device UI, BLE/cloud connectivity,
  and a local setup portal for managing machine settings and recipes.
slug: la-marzocco-round-controller
codeUrl: https://github.com/kaspizzo/lamarzocco
version: media-2026-04-17
lastUpdated: '2026-05-02'
licenses:
- Apache-2.0
image: /202605/lamarzocco_0.avif
rtos: freertos
libraries:
- lvgl
- nimble
- lwip
topics:
- ble
- coffee
- embedded
- esp-idf
- esp32
- esp32-s3
- espresso
- firmware
- la-marzocco
- lvgl
isShow: true
createdAt: '2026-05-05T23:27:13+00:00'
updatedAt: '2026-05-05T23:27:13+00:00'
relatedProjects:
- espgaggia-smart-coffee-machine-controller
- gaggimate
- smart-flask-thermos-with-round-display-and-esp32-c3
- diy-smart-coffee-and-espresso-scale
- esp-usb-ble-hid-bridge
- omote-open-universal-remote
---

Modern espresso machines often rely heavily on mobile apps for advanced configuration, but for many enthusiasts, a tactile, dedicated physical interface is preferred. The La Marzocco Round Controller project addresses this by providing standalone firmware for ESP32-S3-based round hardware. This isn't just a simple remote; it's a feature-rich interface that bridges the gap between local BLE control and cloud-backed machine management, specifically designed for the JC3636K718-style controller family.

At its core, the project leverages the ESP-IDF framework and FreeRTOS to handle the complexities of concurrent connectivity and real-time UI rendering. The interface is built using the LVGL graphics library, optimized for a 360x360 round display. Users interact with the device through a physical outer rotary ring and touch gestures, receiving feedback via an integrated WS2812 LED ring and DRV2605L-driven haptics. This combination of inputs provides a high-end feel that matches the premium nature of the espresso machines it controls.

## Connectivity and Control Logic

One of the standout features is the dual-path connectivity model. The controller manages machine actions via Bluetooth Low Energy (BLE) for low-latency day-to-day operations like adjusting coffee boiler temperatures or steam levels (Off/1/2/3). Simultaneously, it maintains a cloud connection to sync more complex data like prebrewing timings and Brew-by-Weight (BBW) dose targets. 

The firmware is connectivity-aware; when cloud reachability is lost, the UI intelligently falls back to BLE-only mode, indicated by status icons on the display. This ensures that the controller remains functional even if the home internet connection is unstable. The logic for these interactions builds upon the foundation laid by the `pylamarzocco` project, adapted for the constraints and requirements of an embedded environment.

## Onboarding and User Experience

The onboarding process is designed to be as seamless as possible for an enthusiast project. On the first boot or after a factory reset, the controller automatically opens a setup mode and starts its own Wi-Fi access point. Users are presented with a QR code on the round display that directs them to a local captive portal. From this web interface, users can scan for Wi-Fi networks, enter their La Marzocco cloud credentials, and select their specific machine.

Once configured, the device provides a suite of on-device capabilities:
- **Recipe Presets**: Store and switch between different profiles for temperature, prebrewing on/off times, and BBW targets.
- **Status Monitoring**: Conditional indicators for USB power, low battery, and machine reachability.
- **Recovery Actions**: Quick access to reset network settings or clear web passwords via long-press gestures.
- **Customization**: Support for local SVG uploads to replace the default text header with a custom logo.

## Technical Implementation

The project is highly optimized for hardware with 16MB of Octal SPI PSRAM, ensuring smooth animations and responsive UI transitions. The firmware configuration includes the NimBLE stack for efficient Bluetooth communication and mbedTLS for secure cloud interactions. 

For developers interested in the internals, the repository includes a suite of tools beyond the firmware itself. A dedicated screenshot renderer allows for the generation of UI images by compiling the interface code for a desktop environment, which is essential for documentation and rapid UI prototyping. Additionally, a cloud-dashboard debug helper exists to inspect websocket responses and bootstrap machine selection outside of the embedded firmware loop, facilitating easier reverse-engineering of the La Marzocco protocol.
