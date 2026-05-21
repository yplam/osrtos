---
title: ClaudeGauge
summary: A real-time AI usage monitor for Anthropic's Claude API, featuring an LCARS-inspired
  Star Trek interface. Built for ESP32-S3 and ESP32-C6 hardware, it tracks token costs,
  rate limits, and Claude.ai subscription status using a custom UI engine and cloud
  proxy.
slug: claudegauge
codeUrl: https://github.com/dorofino/ClaudeGauge
siteUrl: https://claudegauge.com
version: v1.0.0
lastUpdated: '2026-04-29'
licenses:
- MIT
rtos: freertos
libraries:
- tft-espi
topics:
- anthropic
- api-monitor
- arduino
- claude
- dashboard
- embedded
- esp32
- esp32-s3
- iot
- lcars
- platformio
- star-trek
- tft-espi
- usage-tracker
isShow: false
createdAt: '2026-05-20T00:13:53+00:00'
updatedAt: '2026-05-20T00:13:53+00:00'
---

ClaudeGauge is a specialized embedded systems project that transforms a tiny desk gadget into a high-tech monitoring station for AI power users. Inspired by the LCARS interface from Star Trek, this project provides a real-time dashboard for tracking Anthropic Claude API usage, costs, and subscription limits. It is designed to run on ESP32-S3 and ESP32-C6 hardware, leveraging vibrant LCD and AMOLED displays to present complex data in an aesthetically pleasing, futuristic format.

### Monitoring Capabilities

The firmware is built to handle multiple data streams simultaneously. For API users, it tracks daily and monthly expenditures in USD, providing a granular breakdown of token usage across different models, including input, output, and cached tokens. For those using Claude Code, the device displays session analytics, commit counts, pull requests, and code acceptance rates. Beyond API metrics, ClaudeGauge also monitors Claude.ai subscription statuses, showing 5-hour and 7-day rate limits with active countdown timers, ensuring users stay within their usage quotas.

### Hardware and Architecture

The project supports several popular ESP32-based development boards, most notably the LilyGO T-Display-S3 and the Waveshare ESP32-S3-LCD-1.47. Recent updates have also introduced support for ESP32-C6 AMOLED modules. The firmware is organized into three distinct versions:

*   **Firmware v1**: A standalone, all-in-one application featuring seven comprehensive dashboard screens covering overview, model analysis, code analytics, and system status.
*   **Firmware v2**: A modular implementation built on the `lcars-esp32` engine, focusing on a streamlined three-screen experience for Claude.ai monitoring.
*   **Firmware v3**: Specialized firmware targeting ESP32-C6 AMOLED hardware, utilizing the Arduino GFX library for high-resolution rendering.

### The Cloud Proxy and Chrome Extension

A significant technical challenge addressed by this project is the difficulty of connecting an ESP32 directly to `claude.ai`. Because Cloudflare often blocks the mbedTLS TLS fingerprint used by standard microcontrollers, ClaudeGauge utilizes a lightweight Vercel Edge Function as a cloud proxy. This proxy acts as a stateless relay, forwarding requests from the ESP32 to the Claude API with browser-like headers. 

To simplify the setup process, the project includes a Chrome extension. This allow users to capture their Claude.ai session keys and send them to the device with a single click, bypassing the need for manual cookie extraction via browser developer tools.

### Customization with LCARS Designer

For users who want to personalize their display, the repository includes the LCARS Designer—a browser-based WYSIWYG editor. This tool allows for drag-and-drop element positioning and live previews with accurate font rendering. Once a layout is finalized, the designer automatically generates the necessary C++ header files, which can then be compiled and flashed to the device. This bridge between web-based design and embedded execution allows for rapid UI iteration without deep manual coding of coordinate systems.

### Technical Stack

ClaudeGauge is built within the PlatformIO ecosystem using the Arduino framework. It relies heavily on the `TFT_eSPI` library for display management on TFT screens and the `Arduino GFX` library for AMOLED variants. Data handling is managed via `ArduinoJson`, while hardware-specific features like power management on AMOLED boards are handled by the `XPowersLib`. The project demonstrates a sophisticated use of ESP32 capabilities, including captive portal configuration for WiFi and API key setup, ensuring a smooth out-of-the-box experience for users.
