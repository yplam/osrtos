---
title: ESP32 AI Mini Screen
summary: A retro-styled desktop companion for ESP32-C3 and ESP8266 that monitors AI
  coding assistant usage, stock markets, and system telemetry. It leverages the Arduino
  framework with TFT_eSPI and AnimatedGIF libraries to display real-time data provided
  by a local bridge application.
slug: esp32-ai-mini-screen
codeUrl: https://github.com/WhiteBalance2800K/esp32ai
siteUrl: https://mac.qust.me/
version: v0.4.6-c3.15
lastUpdated: '2026-08-03'
image: /202608/esp32ai_0.avif
rtos: freertos
libraries:
- littlefs
- tft-espi
topics:
- claude-code
- codex
- esp32c3
- st7789
- web-serial
isShow: true
createdAt: '2026-08-06T11:22:27+00:00'
updatedAt: '2026-08-06T11:22:27+00:00'
relatedProjects:
- m5paper-buddy
- deskpet
- bbmonitor
- ai-desk-card
- clawdmeter
- claudegauge
---

The ESP32 AI Mini Screen is a retro-styled 240×240 desktop companion designed to provide real-time visibility into AI workflows and system metrics. Acting as a physical dashboard for Claude Code and Codex CLI, it eliminates the need for direct API keys by communicating with a local bridge program on macOS or Windows. This bridge extracts session logs and credentials to display remaining quotas, costs, and active task statuses directly on the device's TFT screen.


### Hardware Integration and Display Optimization

Transitioning to the ESP32-C3 platform introduced specific hardware challenges, particularly regarding the 1.54-inch TFT display. A common issue during firmware flashing is a black screen where the firmware boots correctly but the display remains unlit due to incorrect GPIO mapping or driver configuration. Unlike standard ESP8266 setups, this project utilizes the `ST7789_2_DRIVER` with specific SPI initialization (`SPI.begin(3, 5, 5, -1)`). 

Key hardware considerations for the ESP32-C3 build include:
- **LCD_BL (GPIO 1)**: Controlled via an AO3401, requiring a low-level signal to light up.
- **Signal Routing**: Data/Command (DC) on GPIO 2, SCLK on GPIO 3, and MOSI/MISO sharing GPIO 5 to satisfy SPI initialization requirements even though the screen is write-only.
- **Safety First**: It is highly recommended to back up the original 4MB Flash before erasing, as factory firmware often contains the correct initialization parameters for varying screen revisions.

### Core Functionality and AI Monitoring

The device serves as a multifaceted monitor, shifting between several specialized views based on user activity and system state.

![AI 工作状态](/202608/esp32ai_1.avif)

**AI Workflow Tracking**
The primary mode displays AI work status, including weekly quotas for Claude and Codex. It tracks token usage and calculates costs from 00:01 to 23:59 daily. To make the interaction more engaging, a desktop pet (such as a Border Collie) animates based on AI activity—running when the AI is processing and meditating when idle. High-intensity tasks in Fast or Priority modes trigger specific "Ludicrous" full-screen animations.

![多市场行情](/202608/esp32ai_2.avif)

**Market and System Telemetry**
Beyond AI, the screen supports multi-market financial tracking. Users can monitor up to 15 assets across BTC/ETH, A-shares, Hong Kong, US, and Korean markets. The interface provides K-line cycles and refresh intervals, pulling data from sources like Tencent and East Money. For system enthusiasts, a task-manager-style network monitor provides a 56-second rolling window of upload and download speeds with automatic scaling.

![音乐播放显示](/202608/esp32ai_3.avif)

**Media and Personalization**
When music is playing, the device automatically switches to a media view showing album art, song titles, and progress bars. Personalization is handled through an integrated GIF decoder that supports over 3,300 pets from the Petdex gallery or custom user uploads, all processed on-device without requiring firmware recompilation.

### Deployment and Architecture

The ecosystem consists of the ESP32 firmware and a desktop bridge application. Firmware can be flashed via a web-based tool, which handles the complex partitioning required for LittleFS and application data. Once flashed, the device creates a WiFi hotspot for initial configuration. 

The software architecture is divided into several components:
- **Firmware**: Built with PlatformIO and Arduino, handling board-level GIF decoding and display rendering via TFT_eSPI.
- **Bridge Apps**: A Swift-based macOS menu bar app and a C# .NET 8 Windows tray app that discover the device on the local network to sync data.
- **Tools**: Python scripts for converting GIFs to RGB565 sprite maps for built-in animations.

This setup ensures that the hardware remains a "thin client" for the data processed by the more powerful host machine, allowing for complex data aggregation without taxing the ESP32's resources.
