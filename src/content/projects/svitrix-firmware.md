---
title: SVITRIX Firmware
summary: SVITRIX is an open-source, AI-developed firmware for the Ulanzi Smart Pixel
  Clock TC001 and custom ESP32-based LED matrices. It features a robust MQTT and HTTP
  API for integration with home automation systems like HomeAssistant, supporting
  dynamic custom apps, visual effects, and real-time environmental sensor data.
slug: svitrix-firmware
codeUrl: https://github.com/svitrix/svitrix-firmware
siteUrl: https://svitrix.github.io/svitrix-firmware
version: v0.2.0
lastUpdated: '2026-04-15'
licenses:
- NOASSERTION
rtos: freertos
libraries:
- littlefs
- lwip
topics:
- esp32
- home-assistant
- led-matrix
- mqtt
- smart-home
- ulanzi-tc001
isShow: true
image: /202604/clock.webp
createdAt: '2026-04-24T09:33:54+00:00'
updatedAt: '2026-04-24T09:33:54+00:00'
---

SVITRIX is a smart home companion designed to transform the Ulanzi Smart Pixel Clock TC001 and DIY LED matrices into powerful information displays. Built as a community-driven fork of the AWTRIX 3 project, SVITRIX focuses on active development and seamless integration with automation ecosystems like HomeAssistant, IOBroker, and Node-RED. 

At its core, SVITRIX provides a bridge between your smart home logic and a high-visibility 32x8 RGB LED display. While it includes pre-installed applications for time, date, and environmental monitoring, its true power lies in its "Custom Apps" philosophy. Unlike traditional firmware where apps are installed locally, SVITRIX treats custom apps as dynamic pages. All logic is handled by an external smart home system, which pushes content to the device via MQTT or HTTP. This allows for infinite flexibility without the need to recompile or reflash the firmware.

### Hardware Architecture and Support

The firmware is optimized for the ESP32-WROOM-32D microcontroller, specifically targeting the hardware configuration of the Ulanzi TC001. This includes:
- **Display**: A 32x8 (256 LEDs) WS2812B-Mini matrix arranged in a serpentine wiring pattern.
- **Sensors**: Integrated support for I2C sensors including the SHT3x (default in Ulanzi), BME280, BMP280, and HTU21DF for temperature, humidity, and pressure sensing.
- **Peripherals**: Support for passive piezo buzzers using PWM, LDR light sensors for automatic brightness adjustment, and battery voltage monitoring via ADC.
- **User Input**: Three physical buttons (Left, Middle, Right) for on-screen menu navigation and a dedicated reset button.

For DIY enthusiasts, the project supports any standard ESP32-WROOM board, allowing users to build their own matrix clocks with custom enclosures and components.

### Advanced Features and API

SVITRIX offers a comprehensive dual-protocol API. Users can interact with the device using simple JSON payloads. The API supports drawing primitives—such as lines, circles, and bitmaps—as well as high-level UI components like bar charts, line graphs, and progress bars. 

Beyond simple text, the firmware includes 19 built-in visual effects (including Matrix, Plasma, and Snake) that can serve as app backgrounds. It also features weather overlays (snow, rain, storm) and the ability to play monophonic RTTTL melodies. For professional lighting setups, SVITRIX can even function as an Artnet (DMX) receiver, allowing the LED matrix to be controlled by stage lighting software.

### API Examples

Sending a notification with an icon and rainbow text is as simple as a single HTTP POST request:

```bash
curl -X POST http://<ip>/api/notify \
  -d '{"text": "Hello!", "icon": "1234", "duration": 10, "rainbow": true}'
```

Creating a persistent custom app to track data from your smart home:

```bash
curl -X POST "http://<ip>/api/custom?name=myapp" \
  -d '{"text": "23°C", "icon": "2056", "lifetime": 900}'
```

### AI-First Development Workflow

A unique aspect of the SVITRIX project is its "AI-First" development approach. The maintainers utilize Claude (Anthropic) and Claude Code as primary tools for architecture decisions, code generation, and CI/CD management. This modern workflow enables rapid feature iteration and robust refactoring, ensuring the codebase remains clean and maintainable despite the complexity of managing real-time LED rendering alongside network stacks.

### Getting Started

The project is designed for ease of use, featuring an online web-based flasher that allows users to install the firmware directly from their browser via USB. Once flashed, the device hosts a web interface for WiFi configuration, MQTT setup, and file management. The web UI also includes a live view of the matrix, an icon downloader compatible with the LaMetric gallery, and OTA update capabilities for wireless maintenance.
