---
title: SparkMiner
summary: A high-performance Bitcoin solo miner firmware for ESP32, ESP32-S3, and ESP32-C3
  microcontrollers. It utilizes hardware-accelerated SHA-256 and pipelined assembly
  optimizations to deliver hashrates up to 1+ MH/s while supporting various TFT and
  OLED displays.
slug: sparkminer
codeUrl: https://github.com/SneezeGUI/SparkMiner
star: 21
version: v2.9.1
lastUpdated: '2026-01-17'
rtos: freertos
libraries:
- tft-espi
- u8g2
topics:
- arduino
- bitcoin
- bitcoin-mining
- cheap-yellow-display
- cpp
- cryptocurrency
- diy
- embedded
- esp32
- esp32-c3
- esp32-s3
- freertos
- hardware-wallet
- iot
- miner
- platformio
- sha256
- solo-mining
- stratum
- tft-display
isShow: true
image: /202601/sparkminer.webp
createdAt: '2026-01-19'
updatedAt: '2026-01-19'
relatedProjects:
- ultrafastsecp256k1
- fastled-idf
- sha2017-badge-firmware
- colibri-wallet
- bitcoin-card-wallet
- micropython-for-esp32-with-psram-support-lobo-port
---

## Overview

SparkMiner is a specialized firmware designed for the ESP32 family of microcontrollers, transforming them into compact, low-power Bitcoin solo miners. While solo mining on microcontrollers is often described as a "lottery" due to the astronomical odds of finding a block, SparkMiner serves as an educational tool and a way to support network decentralization. The project is highly optimized for performance, leveraging hardware-accelerated SHA-256 and pipelined assembly to maximize hashrate on resource-constrained hardware.

## Technical Architecture

The project is built on the Arduino framework and utilizes the dual-core nature of the ESP32 and ESP32-S3 to ensure mining stability. SparkMiner assigns specific tasks to each core to prevent network activity from interrupting the mining process:

- **Core 1 (High Priority):** Dedicated to pipelined hardware SHA-256 mining. It uses direct register access and unrolled assembly loops to achieve maximum efficiency.
- **Core 0 (Low Priority):** Manages the WiFi stack, Stratum v1 protocol communication, display updates, and user interaction via buttons.

This architecture allows the device to maintain a consistent hashrate even while updating the UI or fetching live Bitcoin network statistics. For the single-core ESP32-C3, the project utilizes a software-based SHA-256 implementation optimized for the RISC-V architecture.

## Key Features

### Hardware Support and Display Abstraction
SparkMiner supports a wide array of hardware, most notably the "Cheap Yellow Display" (CYD) boards (ESP32-2432S028). It includes a display abstraction layer that allows it to work seamlessly with TFT displays (via TFT_eSPI) and OLED displays (via U8g2). For boards without screens, a headless mode provides status feedback through serial output or RGB LEDs.

### Persistent Statistics
To ensure mining progress isn't lost during power cycles, SparkMiner implements a robust statistics system. It saves lifetime hashes, accepted shares, and best difficulty found to the device's Non-Volatile Storage (NVS). If a microSD card is present, it also maintains a `stats.json` backup, allowing totals to survive firmware updates or factory resets.

### HTTPS Stats Proxy
Fetching live Bitcoin prices and network data over HTTPS is memory-intensive for the ESP32 and can lead to heap fragmentation. SparkMiner addresses this by supporting an optional HTTP-to-HTTPS proxy. This offloads the heavy SSL/TLS encryption to an external server or Cloudflare Worker, saving approximately 30KB of RAM and improving overall system stability.

## Configuration and Setup

SparkMiner offers three flexible ways to configure the device:
1. **SD Card:** Users can place a `config.json` on a FAT32-formatted microSD card for a "plug-and-play" experience.
2. **WiFi Portal:** If no configuration is found, the device creates a captive portal (`SparkMiner-XXXX`) with a dark-themed web interface for setting up WiFi and pool credentials.
3. **NVS:** Settings are automatically cached in flash memory after the first successful connection.

## Performance Expectations

Performance varies significantly by chip generation due to the availability of hardware acceleration:
- **ESP32 (Dual-core):** ~715-725 KH/s (utilizes hardware SHA-256 registers).
- **ESP32-S3 (Dual-core):** ~280-400 KH/s (utilizes software SHA-256 with midstate caching).
- **ESP32-C3 (Single-core):** ~200-300 KH/s (RISC-V software implementation).

The firmware is compatible with popular solo mining pools such as Public Pool, CKPool, and FindMyBlock, supporting various Bitcoin address formats including Bech32 (SegWit) and Taproot.
