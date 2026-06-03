---
title: Marauder Centauri
summary: A portable suite of WiFi and Bluetooth offensive and defensive tools built
  for the ESP32 microcontroller. It enables security researchers to perform packet
  sniffing, beacon spamming, and network analysis through a dedicated handheld interface
  utilizing the Arduino framework.
slug: marauder-centauri
codeUrl: https://github.com/justcallmekoko/MarauderCentauri
star: 184
lastUpdated: '2021-03-24'
rtos: freertos
libraries:
- tft-espi
- lvgl
- h2zero-esp-nimble-cpp
- spiffs
topics:
- arduino
- atmega328p
- bluetooth
- deauther
- esp32
- esp8266
- evil-twin
- i2c
- ili9341
- keyboard
- led
- lvgl
- ota-update
- sd-card
- signal-analysis
- spi
- tft-display
- wifi
- xpt2046
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- esp32-marauder-for-esp32-3248s035c
- unigeek-firmware
- esp-hack-fw
- esp32-marauder-for-cheap-yellow-display-cyd
- ghostesp
- wifiphisher-for-esp32
---

The Marauder Centauri is a specialized firmware suite designed for the ESP32, transforming the popular microcontroller into a portable powerhouse for wireless security auditing. Inspired by the original ESP8266 Deauther, this project expands the scope to include both WiFi and Bluetooth capabilities, providing a wide array of tools for both offensive testing and defensive monitoring.

### Wireless Auditing Capabilities
The core of the Marauder Centauri lies in its extensive list of WiFi and Bluetooth features. For WiFi, the tool can perform probe request sniffing, beacon sniffing, and various forms of beacon spamming. Users can broadcast random SSIDs, create a "Rick Roll" beacon list, or monitor connection attempts to specific networks. It also includes a packet monitor that visualizes WiFi packet density on specific channels using a time-bar graph.

On the Bluetooth side, the firmware includes a sniffer for identifying nearby devices and a specialized tool for detecting Bluetooth-enabled credit card skimmers. These features make it a versatile companion for physical security assessments and hardware penetration testing.

### Hardware and User Interface
Designed to be used as a standalone handheld device, Marauder Centauri leverages the TFT_eSPI library to drive color touchscreens. The interface allows users to navigate menus, add SSIDs via an on-screen keyboard, and even doodle on the screen. The project supports various ESP32-based hardware configurations, including the LOLIN D32 Pro, M5Stack, and Odroid Go.

To handle the data captured during audits, the firmware supports saving PCAP files directly to an SD card. This allows for deeper analysis of captured traffic using tools like Wireshark on a desktop computer.

### Technical Foundation
The project is built using the Arduino framework on top of the ESP32's FreeRTOS-based environment. It utilizes several key libraries to manage its complex operations:
- **TFT_eSPI**: For high-performance display driving and touch interaction.
- **NimBLE-Arduino**: A memory-efficient Bluetooth stack that allows the Marauder to maintain a smaller RAM footprint compared to the standard ESP32 Bluetooth library.
- **SPIFFS**: Used for storing internal data, web update files, and configuration.

### Firmware Management
One of the standout features of the Marauder Centauri is its robust update system. Users can update the firmware over-the-air (OTA) via a built-in web interface or by placing an `update.bin` file on an SD card. This ensures that the device can be easily kept up to date with the latest security tools and features without needing to tether it to a computer.

### Getting Started
Setting up the Marauder Centauri requires the Arduino IDE and the ESP32 board support package. Because the project pushes the limits of the ESP32's resources, specific configuration steps are necessary, such as installing the TFT_eSPI library and modifying its `User_Setup.h` to match the target hardware's pinout. Once flashed, the device operates independently, providing a mobile platform for wireless exploration.
