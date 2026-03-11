---
title: DT78 ESP32 Firmware
summary: A custom firmware and hardware redesign for the DT78 smartwatch, replacing
  the original internals with an ESP32. It features a sophisticated LVGL-based UI,
  custom watchfaces, and integration with the Chronos companion app for notifications
  and weather data.
codeUrl: https://github.com/fbiego/dt78-esp32-firmware
isShow: true
image: /202512/dt78-esp32-firmware.webp
rtos: freertos
libraries:
- lvgl
topics:
- ble
- cst816s
- dt78
- dt78-firmware
- esp32
- esp32-pico-d4
- firmware
- gc9a01
- kxtj3-1057
- lvgl
- smartwatch
star: 60
lastUpdated: '2024-07-28'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
---

The DT78 ESP32 Firmware project is a compelling example of hardware hacking and embedded systems development. Rather than simply writing software for an existing device, this project involves a complete motherboard replacement for the DT78 smartwatch. By swapping the original proprietary hardware with a custom-designed PCB powered by the ESP32, the project unlocks the full potential of the wearable, turning it into an open-source platform for experimentation.

### Hardware and Architecture
The project centers around the ESP32-WROOM module, which provides the dual-core processing power and Bluetooth connectivity necessary for a modern smartwatch experience. The firmware is built using the Arduino framework and managed via PlatformIO. It leverages several specialized libraries to interface with the watch's original components, including the CST816S touch controller and the KXTJ3-1057 accelerometer. 

Because the ESP32 is significantly more powerful than the original chipsets found in budget smartwatches, it can handle more complex graphics and smoother transitions. The repository even includes the PCB design files and schematics for those looking to perform the hardware swap themselves.

### User Interface with LVGL
The visual experience is driven by the Light and Versatile Graphics Library (LVGL), which allows for a rich, smartphone-like interface on a small circular display. The firmware includes several functional screens:
- **Main Watchface**: Supports multiple styles including Analog, Radar, and Pixel-art designs.
- **Weather**: Provides a one-week forecast including icons and temperature data.
- **Notifications**: A notification center that stores up to 10 recent alerts with app-specific icons.
- **Control Center**: Quick access to music controls, brightness, and device info.

One of the most impressive aspects is the watchface system. The project supports various pre-built faces and provides a workflow for converting binary watchface assets into LVGL code, though users are limited by the ESP32's internal flash size when choosing which faces to include in a build.

### The Chronos Ecosystem
To make the watch truly useful, it integrates with the **Chronos App**, a companion mobile application. This link enables the watch to stay synchronized with the real world by:
- Syncing the system time from the smartphone.
- Forwarding notifications from various apps (Facebook, WhatsApp, Mail, etc.).
- Providing real-time weather updates and location-based data.

### Getting Started
For developers, the project is structured to be compiled using PlatformIO. The `platformio.ini` file defines the necessary dependencies and build flags. Key libraries used include `GFX Library for Arduino` for display driving and `ChronosESP32` for managing the BLE communication protocol. 

```ini
[env:esp32doit-devkit-v1]
platform = espressif32
board = esp32doit-devkit-v1
framework = arduino
lib_deps = 
	moononournation/GFX Library for Arduino@^1.2.3
	fbiego/CST816S@^1.1.0
	ldab/KXTJ3-1057@^0.0.1
	fbiego/ChronosESP32@^1.3.0
	lvgl/lvgl@^8.3.4
```

This project serves as an excellent template for anyone interested in building their own wearable or repurposing existing hardware with modern, open-source microcontrollers.
