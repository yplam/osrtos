---
title: E-Ink Assist Screen
summary: A rendering service and ESP32 client system that converts Home Assistant
  data into optimized 1-bit monochrome images for E-Ink displays. It features a Node.js
  backend for HTML-to-BMP conversion and an ESP32 firmware that supports chunked image
  downloading to accommodate memory-constrained hardware.
slug: e-ink-assist-screen
codeUrl: https://github.com/riston/eink-assist-screen
star: 14
lastUpdated: '2026-01-31'
rtos: freertos
libraries:
- platformio-platformio-core
topics:
- eink
- esp32
isShow: true
image: /202602/eink-assist-screen.webp
createdAt: '2026-02-06'
updatedAt: '2026-02-06'
relatedProjects:
- readmepaper-esp32-7-color-e-paper-display-project
- home-assistant-epaper-remote
- esphome-e-ink-4-color-dashboard
- esp-e-paper-component
- esp32-p4-home-assistant-display
- inklink
---

The E-Ink Assist Screen project provides a sophisticated solution for creating low-power information dashboards using e-Paper technology. By combining a powerful Node.js rendering backend with an efficient ESP32 client, it allows users to display real-time data from Home Assistant on high-resolution E-Ink displays, such as the Waveshare 7.5" panel.

### System Architecture

The project is split into two primary components: a renderer server and a display client. The renderer is a Node.js application that fetches data from Home Assistant, populates Handlebars HTML templates, and uses Puppeteer to take a "screenshot" of the rendered page. This image is then processed into a 1-bit monochrome BMP format optimized for e-Paper. 

The client side runs on an ESP32, typically using the Waveshare E-Paper ESP32 Driver Board. It communicates with the renderer via HTTP, fetching the image data and pushing it to the display using the GxEPD2 library. The firmware is built using the Arduino framework within the PlatformIO ecosystem.

### Offset-Based Rendering

One of the most technical challenges in using high-resolution E-Ink displays (like 800x480) with microcontrollers is memory management. A full 1-bit image for such a display requires significant RAM. To solve this, the project implements an "Offset-Based Rendering" system. 

The renderer can serve the BMP file in small, manageable chunks. The ESP32 requests specific byte ranges (offsets), allowing it to process and display the image piece by piece without ever needing to store the entire file in its internal memory. This makes it possible to drive large displays even on devices with very limited heap space. The project includes a detailed guide on BMP file structures and chunking patterns to help developers implement this on various hardware.

### Home Assistant Integration

The system is designed specifically for the Home Assistant ecosystem. It includes a flexible entity mapping system where users can define semantic names for their sensors, weather entities, and calendars. These are then available within Handlebars templates, allowing for dynamic content rendering. 

Example template usage:
```html
<h1>Temperature: {{round entities.indoor_temp.state}}°C</h1>
<p>Door: {{#if entities.main_door.state_is_on}}OPEN{{else}}Closed{{/if}}</p>
```

### Hardware and Physical Design

The project targets the Waveshare 7.5" e-Paper V2 (800x480) and the associated ESP32 Driver Board. Beyond the electronics, the repository even includes laser-cut files (`.dxf` and `.lbrn2`) for a 3mm plywood stand, providing a complete end-to-end solution for a desktop or wall-mounted information display.

For developers, the project includes a Mock Home Assistant server, enabling template development and testing without needing a live Home Assistant instance. This mock server simulates entity states and calendar events, significantly speeding up the UI design process and allowing for offline development.
