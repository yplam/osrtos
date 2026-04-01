---
title: Td-Free
summary: An open-source device for measuring the transmission distance (td) of 3D
  printing filaments using an ESP32-C3 and high-precision light sensors. It provides
  a cost-effective, WiFi-enabled alternative to proprietary tools, specifically designed
  for HueForge users and filament characterization.
slug: td-free
codeUrl: https://github.com/mawoka-myblock/td-free
siteUrl: https://mawoka.eu/projects/td-free
version: v0.8.4
lastUpdated: '2025-12-26'
licenses:
- EUPL-1.2
rtos: freertos
topics:
- 3dprinting
- esp32
- hueforge
- platformio
- veml7700
isShow: false
createdAt: '2026-04-01T01:23:02+00:00'
updatedAt: '2026-04-01T01:23:02+00:00'
---

Td-Free is an innovative open-source solution for 3D printing enthusiasts who need to accurately determine the Transmission Distance (td) of their filaments. In the world of "filament painting" and tools like HueForge, knowing exactly how much light passes through a specific material is crucial for achieving predictable color blending and layering results. While commercial solutions exist, Td-Free offers a DIY, cost-effective, and transparent alternative.

### The Importance of Transmission Distance
Transmission Distance (td) is a metric used to describe the translucency of a 3D printing filament. It specifically measures the thickness at which a material becomes opaque. For artists using software to layer different colored filaments, having an accurate td value is the difference between a successful print and a wasted spool. Td-Free automates this measurement process, replacing manual "test tower" prints with a digital sensor reading.

### Hardware and Design
The project centers around the ESP32-C3 Supermini, a compact and powerful microcontroller that brings WiFi capabilities to the device. The measurement engine consists of a VEML7700 high-accuracy ambient light sensor and a dedicated cold white LED module. By measuring the light intensity passing through a filament sample, the device can quantify the material's opacity with high precision.

The physical build is designed to be accessible and reproducible. The CAD files are hosted on Onshape under a Creative Commons license, allowing users to modify or improve the design. The enclosure consists of 3D-printable parts, including specific internal components that must be printed in black filament to ensure light-tightness, which is critical for accurate sensor readings.

### Technical Implementation
Unlike many embedded projects that rely on C or C++, Td-Free is developed using the Rust programming language through the `esp-rs` ecosystem. The firmware leverages the ESP-IDF framework, which runs on top of FreeRTOS. This choice of stack provides modern memory safety features and high performance on the ESP32-C3 hardware.

The project's configuration is managed through standard ESP-IDF files like `sdkconfig.defaults`, which specifies custom stack sizes and logging levels to optimize the device's performance. For developers, getting started is as simple as setting up the Rust ESP toolchain and running `cargo run --release` to flash the device.

### Comparison and Ecosystem
When compared to commercial alternatives like the TD-1 by Ajax, Td-Free stands out for its open nature. It is smaller, cheaper to build, and includes WiFi connectivity, which allows for easier data retrieval without needing a physical screen or a direct USB connection to a PC. While it focuses specifically on measuring td values for samples rather than continuous spool monitoring, its affordability makes it an essential tool for any maker's workbench.

For those who prefer not to source every component individually, the project maintainer also offers fully assembled units and custom PCBs through an online store, supporting the ongoing development of the open-source hardware ecosystem.
