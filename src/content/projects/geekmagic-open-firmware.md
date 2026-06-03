---
title: GeekMagic Open Firmware
summary: An open-source firmware for ESP8266-based GeekMagic devices like the HelloCubic
  Lite and Smalltv-Ultra. It provides a complete replacement for the factory software,
  featuring a custom ST7789 display driver, LittleFS storage, and a web-based configuration
  interface.
slug: geekmagic-open-firmware
codeUrl: https://github.com/Times-Z/Hellocubic-Lite-OpenFirmware
star: 34
version: v1.2.0
lastUpdated: '2026-01-18'
rtos: ''
libraries:
- littlefs
topics:
- arduino
- esp8266
- geekmagic
- hellocubic
- plateformio
- reverse-engineering
- smalltv
- st7789
isShow: false
createdAt: '2026-01-19'
updatedAt: '2026-01-19'
relatedProjects:
- geek-magic-firmware
- open-display-firmware
- elekstube-ips-custom-firmware
- openhasp-firmware
- sonoff-http-firmware
- esp32-ota-firmware-update-and-file-management
---

The GeekMagic Open Firmware project is a community-driven replacement for the stock software found on the HelloCubic Lite and Smalltv-Ultra devices. These compact, ESP8266-powered gadgets are popular for their 3D-printed cases and vibrant LCD screens, often used as desktop clocks or information displays. This firmware aims to provide a clean, extensible, and fully open-source alternative to the original factory code.

### Hardware Architecture

The firmware targets the ESP8266 (specifically the ESP-12E module). One of the most interesting technical aspects of this project is how it handles the display hardware. The devices use an ST7789 LCD controller with a 240x240 resolution. However, unlike most standard SPI displays that use active-low Chip Select (CS) logic, these boards utilize an active-high CS polarity on GPIO 2. To accommodate this, the firmware implements a custom SPI bus driver, `ESP8266SPIWithCustomCS`, ensuring compatibility with the `Arduino_GFX` library.

### Graphics and Performance

To achieve smooth visuals, the project leverages the `Arduino_GFX` library for low-level display management and `AnimatedGIF` for rendering animations. The SPI bus is pushed to 80 MHz to maximize frame rates, though 40 MHz is noted as a more stable fallback. The firmware optimizes drawing operations by keeping the CS pin asserted during continuous writes and streaming GIF frames directly to the display to minimize memory overhead on the resource-constrained ESP8266. Colors are handled in the RGB565 (16-bit) format, providing a balance between visual quality and memory efficiency.

### Modern Web Management

Beyond the display logic, the firmware includes a robust management layer. It uses the LittleFS filesystem to store configuration data and web assets. The user interface is built using a modern, lightweight frontend stack featuring Pico.css for styling and Alpine.js for interactivity. This allows users to configure WiFi settings and device parameters through a responsive web browser interface, avoiding the need for complex serial commands after the initial setup.

### Deployment and Extensibility

The project is structured for the PlatformIO ecosystem, making it easy for developers to build and customize. It supports both traditional USB-to-TTL flashing and Over-The-Air (OTA) updates. For users transitioning from the factory firmware, the project provides a two-step OTA process to flash both the firmware binary and the LittleFS filesystem partition. 

By using the Arduino framework on top of the ESP8266, the project remains accessible to the hobbyist community while providing the performance needed for a high-quality desktop accessory. The developer's roadmap includes moving toward a feature set that matches the original firmware while maintaining the benefits of an open-source codebase.
