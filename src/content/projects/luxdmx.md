---
title: LuxDMX
summary: LuxDMX is an open-source Art-Net and sACN to DMX512 gateway designed for
  ESP32 and ESP32-S3 microcontrollers, featuring a live web-based diagnostic interface.
  It provides professional-grade lighting control with support for RDM, source merging
  (HTP/LTP), and multiple network interfaces including WiFi and wired Ethernet. The
  project utilizes a FreeRTOS-based architecture to ensure low-jitter DMX timing while
  simultaneously serving high-speed telemetry via WebSockets.
slug: luxdmx
codeUrl: https://github.com/tombueng/LuxDMX
siteUrl: https://luxdmx.org
version: wt32-issue64-test
lastUpdated: '2026-07-17'
image: /202607/LuxDMX_5.avif
rtos: freertos
libraries:
- lwip
topics:
- art-net-node
- artnet
- artnet-to-dmx
- dmx
- dmx-controller
- dmx-interface
- dmx512
- e131
- esp32
- esp32-arduino
- esp32-s3
- iot
- led-lighting
- lighting-control
- platformio
- sacn
- stage-lighting
- theatre
- web-serial
- wled
isShow: true
createdAt: '2026-07-19T07:18:39+00:00'
updatedAt: '2026-07-19T07:18:39+00:00'
---

LuxDMX is an open-source gateway that bridges Art-Net and sACN (E1.31) protocols to DMX512, targeting the ESP32 and ESP32-S3 platforms. Unlike standard DMX nodes, it is designed to function as both a high-performance network node and a live diagnostic tool. It allows users to monitor all 512 DMX channels in real time through a browser, providing immediate feedback on sender frame rates, inter-frame jitter, and potential universe conflicts where multiple consoles might be competing for control.


## Core Features and Capabilities

The system supports both unicast and broadcast Art-Net, as well as multicast sACN, which can run simultaneously. A key technical feature is its source merging capability, allowing for Highest Takes Precedence (HTP) or Latest Takes Precedence (LTP) merging across multiple active sources, while strictly honoring sACN priority fields. To ensure reliability in professional environments, the gateway includes a configurable signal-loss policy, enabling the device to hold the last frame, blackout, or stop sending entirely if the network source is interrupted.

The live Web UI, built with Bootstrap 5 and powered by WebSocket push updates, provides a comprehensive overview of the DMX universe. Users can view a 512-channel grid with value-proportional brightness and gauge fills, access per-channel history sparklines, and manually override channels for fixture identification or testing.

![Status page showing live DMX channel grid and sender statistics](/202607/LuxDMX_0.avif)

## Hardware Architecture

LuxDMX is designed to be accessible, ranging from simple breadboard prototypes to a sophisticated custom PCB. The LuxDMX v5 board is a 4-layer open-source design featuring an ESP32-S3 with both WiFi and wired Ethernet (W5500). It includes two galvanically-isolated DMX outputs that are DMX512-A Protected, capable of surviving sustained faults of up to ±42 VDC or 30 VAC. For simpler builds, the project supports standard ESP32 DevKits and the WT32-ETH01 module.

![LuxDMX v5 custom PCB with ESP32-S3 and isolated DMX outputs](/202607/LuxDMX_6.avif)

## Software Design and Build Pipeline

The firmware is built on a schema-driven configuration engine. Every setting, from DMX pin assignments to network credentials, is defined in a central table that automatically generates the NVS persistence logic, the web configuration forms, and a serial console interface. This approach allows for runtime configuration of hardware pins without the need for recompilation.

The build pipeline utilizes PlatformIO pre-build hooks to convert HTML, CSS, and image assets into C `PROGMEM` arrays. These assets are then embedded directly into the firmware binary, allowing the ESP32 to serve a modern, responsive web interface directly from flash memory. To maintain high-performance DMX output, frames are clocked out using the ESP32's RMT peripheral, ensuring that timing remains accurate even during heavy network DMA contention.

## Networking and First-Run Setup

To simplify deployment, LuxDMX features a mesh-aware WiFi implementation and a dedicated setup portal. On the first boot, the device creates a `LuxDMX-setup` access point with a captive portal, allowing users to configure WiFi credentials or set the device to a standalone AP mode. For wired configurations, the system supports various Ethernet PHYs (LAN8720, W5500, DM9051) and includes a link-loss watchdog that can automatically fall back to a pre-configured WiFi network if the Ethernet connection fails.

## Visual Feedback and Displays

Status monitoring is handled through a multi-tier approach. A sophisticated LED status language supports standard GPIO LEDs, WS2812 RGB pixels, and a specialized 5-LED status panel found on the v5 board. This language uses color and blink patterns to communicate network health, DMX activity, and RDM status.

Additionally, the gateway supports optional I2C and SPI displays, including mono OLEDs and SSD1351 colour panels. These displays provide at-a-glance information such as IP addresses, universe assignments, and real-time FPS, while auto-switching to high-visibility alert banners during universe conflicts or manual overrides.

![Various supported OLED and colour display layouts](/202607/LuxDMX_4.avif)

## DMX and RDM Implementation

The gateway supports up to two independent DMX outputs, utilizing the ESP32's available UART ports. It functions as a full Art-Net 4 RDM gateway, allowing consoles to discover and configure fixtures over the network. The RDM engine is designed to schedule discovery transactions between DMX frames, ensuring that RDM traffic never stalls the primary DMX output stream. Supported RDM operations include unique branch discovery, device info retrieval, and setting DMX start addresses.
