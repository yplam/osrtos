---
title: LumiFur Controller
summary: A real-time firmware for ESP32-S3 based HUB75 LED matrix displays, specifically
  designed for Protogen masks. It features sensor-driven interactions using proximity,
  accelerometer, and microphone inputs, alongside Bluetooth LE control and OTA updates
  via the NimBLE stack.
slug: lumifur-controller
codeUrl: https://github.com/stef1949/LumiFur_Controller
siteUrl: https://richies.uk
version: 4.2.0
lastUpdated: '2026-03-07'
licenses:
- BSD-3-Clause
rtos: freertos
libraries:
- nimble
topics:
- arduino
- cpp
- esp32
- furry
- ledmatrix
- leds
- lumifur
- microcontroller
- protogen
- richies3d
isShow: false
createdAt: '2026-04-05T00:57:19+00:00'
updatedAt: '2026-04-05T00:57:19+00:00'
---

The LumiFur Controller is a sophisticated firmware solution for creators building high-end wearable LED displays, particularly the iconic Protogen-style masks. Built for the Adafruit MatrixPortal ESP32-S3, it transforms standard HUB75 RGB LED panels into reactive, expressive faces capable of complex animations and real-time sensor interaction.

At its core, the project leverages the ESP32's dual-core architecture and DMA (Direct Memory Access) capabilities to drive high-performance graphics. By using double buffering, the controller ensures smooth transitions and high frame rates for over 20 built-in effects. These range from classic procedural patterns like plasma and flames to specialized expressions like circle eyes, spiral overlays, and scrolling text. The graphics pipeline is optimized to handle dual 64×32 panels, providing a bright and fluid visual experience.

### Sensor-Driven Interactivity

The true power of LumiFur lies in its interactivity. It doesn't just play loops; it reacts to the wearer and the environment through a suite of integrated sensors:

*   **Proximity & Light**: An onboard APDS9960 sensor manages adaptive brightness to save power and proximity-triggered events, such as "blushing" or eye bounces when something gets close to the mask.
*   **Motion & Physics**: A LIS3DH accelerometer enables gesture-based controls like shake-to-clear and powers "PixelDust" physics simulations, where LEDs behave like grains of sand reacting to gravity and movement.
*   **Audio Reactivity**: For those looking for auditory flair, an I2S MEMS microphone drives real-time mouth animations that sync with speech or ambient music.

### Connectivity and Control

Connectivity is handled via Bluetooth Low Energy (BLE) using the NimBLE stack. This provides a robust interface for remote control without the overhead of traditional Bluetooth. Through a GATT service, users can switch expressions, toggle sensor features, and view real-time temperature telemetry. 

The project includes a modern approach to maintenance with a dedicated Web Bluetooth firmware updater. This allows users to perform Over-The-Air (OTA) updates directly from a web browser, selecting a compiled binary and streaming it to the mask without needing to plug in a USB cable. Persistent user preferences, such as brightness levels and auto-blink settings, are stored in the ESP32's Non-Volatile Storage (NVS) to ensure they survive a reboot.

### Technical Foundation

For developers, the repository is highly structured and built on the PlatformIO ecosystem. The firmware is designed to be extensible, with custom effects living in their own C++ modules under `src/customEffects/`. Hardware mappings are centralized in configuration headers, making it easier to port the code to different ESP32-based hardware if needed.

Robustness is a priority for this project. It includes an extensive testing suite with over 70 Unity tests covering core functionality and a Google Test suite for native environments. This ensures that the complex state machine governing the mask's behavior remains reliable even as new animations or sensor features are added. Whether you are building a fursuit, a cyberpunk helmet, or a unique piece of digital signage, the LumiFur Controller provides a production-ready foundation for high-performance LED matrix projects.
