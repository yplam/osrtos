---
title: ESP32 32x32 RGB Matrix Controller
summary: An ESP32-based project designed to drive 32x32 RGB LED matrices, replacing
  older Arduino Mega implementations. It utilizes FreeRTOS for task management, SPIFFS
  for storing animations, and includes a web-based editor for real-time control.
codeUrl: https://github.com/polygontwist/ESP32_32x32RGBMatrix
isShow: false
rtos: freertos
libraries:
- spiffs
topics:
- arduino
- esp32
- filesystem
- iot
- ntp
- ota
- rgbmatrix
- spiffs
- webserver
star: 6
lastUpdated: '2020-09-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- rgblight-iot-rgb-led-controller
- esp32-web-server-using-spiffs
- esp32-remote-control-with-websocket
- led-matrix-max7219-for-mongoose-os
- esp32-monaco-editor-spiffs
- readmepaper-esp32-7-color-e-paper-display-project
---

The ESP32 32x32 RGB Matrix project is a robust firmware solution for hobbyists looking to drive high-density LED panels with the power of the ESP32. Originally designed to replace an Arduino Mega-based system, this project leverages the ESP32's dual-core capabilities and built-in WiFi to provide a much more interactive and capable display controller.

One of the standout features of this project is its integrated web server. Users can access a web-based editor from a tablet, PC, or smartphone to create and manage animations. The system supports uploading, deleting, and downloading files directly through the browser, making it a standalone IoT device once configured.

## Technical Architecture

The project is built on the Arduino framework for ESP32 but makes direct use of **FreeRTOS** to handle the demanding timing requirements of an RGB matrix. Driving a 32x32 matrix requires constant refreshing; to prevent flickering or crashes during file system operations (SPIFFS), the project implements a buffering system and careful task management. When the system performs file operations, it temporarily halts the matrix refresh task to ensure data integrity, a necessary trade-off for stability on the ESP32 platform.

Key components include:
- **SPIFFS**: Used to store the web interface files (HTML, CSS, JS) and animation files (.ANI).
- **NTP Integration**: Automatically fetches the current time to display a digital clock on the matrix.
- **OTA Updates**: Supports over-the-air firmware updates, eliminating the need for a physical USB connection after initial deployment.
- **Web-Based Editor**: A custom JavaScript-based interface that allows for pixel-by-pixel drawing and color picking directly in the browser.

## Hardware Configuration

The project targets the ESP32 Dev Module (WROOM32). The wiring is specific to ensure high-speed data transfer to the matrix. Below is the mapping for the 32x32 Matrix to the ESP32 IO pins:

| Signal | ESP32 Pin |
|--------|-----------|
| R1 / G1 / B1 | 17 / 16 / 04 |
| R2 / G2 / B2 | 00 / 02 / 15 |
| CH A / B / C / D | 21 / 19 / 18 / 05 |
| CLK / LAT / OE | 22 / 03 / 23 |

## Getting Started

After flashing the firmware using the Arduino IDE, initial configuration is performed via the Serial console. Users can set their WiFi credentials and hostname using simple commands:

```text
setpass=your_password
setssid=your_ssid
sethost=rgbmatrix
ESP=reboot
```

Once the device is on the network, you must upload the essential web assets found in the `daten` directory of the repository. These files (`32x32.js`, `32x32.css`, and `index.htm`) provide the functionality for the browser-based editor. 

## Animation and Display

The system handles `.ANI` files, which are custom animation formats. The project includes several examples like `FIREFOX.ANI`, `DRWHO.ANI`, and various game-themed icons. Because the ESP32's internal flash is limited (typically 1.3MB for the SPIFFS partition), the project efficiently manages these small binary files to provide smooth playback while leaving room for the web server assets. The editor even includes a color picker and touch-event support for mobile devices, making it easy to update your display on the fly.
