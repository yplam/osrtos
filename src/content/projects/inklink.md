---
title: InkLink
summary: A real-time collaborative drawing system that synchronizes a web-based canvas
  to a 7.5-inch tri-color e-paper display. The project uses an ESP32 microcontroller
  running CircuitPython to fetch and render drawings from a central server via WebSockets
  and BMP processing.
slug: inklink
codeUrl: https://github.com/Nicell/InkLink
siteUrl: https://inklink.winans.io
star: 34
lastUpdated: '2025-01-27'
rtos: ''
libraries:
- micropython
topics:
- bun
- canvas2d
- e-ink
- e-paper
- eink
- epaper
- esp32
- waveshare
- waveshare-epaper
- websockets
isShow: true
image: /202601/inklink.webp
createdAt: '2026-01-18'
updatedAt: '2026-01-18'
relatedProjects:
- readmepaper-esp32-7-color-e-paper-display-project
- e-ink-assist-screen
- 7-color-e-paper-digital-photo-frame
- esphome-e-ink-4-color-dashboard
- m5paper-buddy
- git-contributions-e-ink-display
---

InkLink is an innovative project that bridges the gap between digital collaborative spaces and physical ambient displays. It creates a shared drawing canvas accessible via any web browser, which then synchronizes its state to a 7.5-inch tri-color e-paper display. This setup allows multiple users to contribute to a persistent piece of digital art that lives on a physical desk or wall.

## Hardware Architecture

The system is built around the Waveshare 7.5" tri-color e-paper display (B V3), which supports black, white, and red pigments. Driving this display is a Waveshare ESP32 E-Paper Driver Board. This choice of hardware provides built-in Wi-Fi connectivity and sufficient processing power to handle network requests and image rendering. The project also includes 3D-printable files for a custom enclosure, making it a complete, polished hardware product.

## Software Stack

The project employs a modern, full-stack approach to manage the interaction between the web and the physical hardware:

- **Firmware:** The ESP32 runs CircuitPython, a derivative of MicroPython designed for microcontrollers. The firmware uses custom drivers (`waveshare7in5bv3.py`) and a BMP reader to fetch the latest drawing state from the server every three minutes.
- **Web Interface:** A real-time drawing application built with React, Vite, and Tailwind CSS. It supports multi-user collaboration through WebSockets, ensuring that strokes made by one user appear instantly for everyone else on the web interface.
- **Backend:** A Bun-based server handles the WebSocket connections and serves the drawing as a BMP file for the e-paper display. The server can be easily deployed using Docker and Nginx.

## Technical Implementation

The synchronization process is optimized for the unique constraints of e-paper technology. Since e-paper displays have slow refresh rates and high power efficiency when static, InkLink updates the physical screen every three minutes rather than in real-time. The server generates a BMP image that the ESP32 downloads and parses. The use of tri-color support allows for more expressive drawings, utilizing the red channel alongside standard black and white.

## Getting Started

Setting up InkLink involves flashing the ESP32 with CircuitPython and installing the necessary libraries, such as `adafruit_connection_manager` and `adafruit_requests`. The server-side can be launched via Docker Compose, providing a turnkey solution for hosting the collaborative environment. Once configured, the ESP32 connects to the server's domain to pull the latest canvas data and update the display.

```python
# Example of how the ESP32 triggers the drawing update
import draw
```

The project is licensed under the MIT License and provides a unique example of how to integrate web technologies with low-power embedded displays for creative applications.
