---
title: NFCity
summary: An ESP32-based NFC/RFID card tool for inspecting and modifying Mifare Classic
  memory blocks. It utilizes an MFRC522 reader and communicates via MQTT to a Vue-based
  web dashboard for real-time memory manipulation and access condition configuration.
slug: nfcity
codeUrl: https://github.com/abobija/nfcity
siteUrl: https://abobija.com/projects/nfcity-esp32-nfc-card-tool
star: 12
version: 1.0.2
lastUpdated: '2026-03-05'
rtos: freertos
libraries:
- lwip
topics:
- card
- esp-idf
- memory
- mfrc522
- nfc
- read-write
- web
isShow: false
createdAt: '2026-03-07'
updatedAt: '2026-03-07'
---

# NFCity: A Modern Interface for NFC Card Exploration

NFCity is an open-source project designed to demystify the complexities of NFC and RFID card interaction. While many libraries provide high-level APIs that hide the underlying memory structure, NFCity takes the opposite approach by providing a transparent, low-level view of how data is stored and secured on cards like the Mifare Classic series.

## System Architecture

The project is built on a distributed architecture consisting of three primary components: an ESP32-based hardware device, a web-based management dashboard, and an MQTT messaging bus that facilitates asynchronous communication between them.

- **The Device**: An ESP32 microcontroller interfaced with an MFRC522 reader. The firmware is developed using the ESP-IDF framework, leveraging its robust networking capabilities and the FreeRTOS kernel for task management. It acts as a bridge, translating high-level commands from the web application into low-level SPI transactions with the NFC reader.
- **The Web Application**: A Single Page Application (SPA) built with Vue. It provides a "retro-hacker" themed interface that allows users to visualize memory sectors, blocks, and access conditions. By using MQTT over WebSockets, the application receives real-time updates from the device whenever a card is detected.
- **Messaging Bus**: An MQTT broker handles the asynchronous message exchange, allowing the web app and the hardware to remain decoupled.

## Deep Dive into NFC Memory

One of the most challenging aspects of working with Mifare Classic cards is managing the Sector Trailer. This specific block contains the secret keys (Key A and Key B) and the access bits that define how the rest of the sector can be accessed. Incorrectly formatting this block can lead to permanently "bricking" the sector. 

NFCity simplifies this by providing a user-friendly interface for:
- Unlocking sectors using known keys.
- Modifying data blocks in hex or ASCII formats.
- Calculating and updating access bits without manual bit-shifting.
- Managing sector keys.

## Hardware and Connectivity

The hardware setup is straightforward, requiring only an ESP32 and a standard MFRC522 module. The communication between the two is handled via SPI. Once the firmware is flashed, the device connects to a local WiFi network and an MQTT broker. 

To ensure security and avoid collisions on public MQTT brokers, each device generates a unique "root topic" upon its first boot. This topic is stored in the ESP32's NVS (Non-Volatile Storage) and is used to pair the web dashboard with the specific hardware instance. This pairing ensures that commands sent from the browser reach the correct physical device.

## Technical Implementation

The firmware relies on the `esp-idf-rc522` library for the heavy lifting of card communication. Because it is built on ESP-IDF, it benefits from the framework's built-in support for lwIP (for networking) and the integrated MQTT client. The asynchronous nature of the project is handled through FreeRTOS tasks, ensuring that the device remains responsive to network messages while simultaneously polling for NFC tags.

For developers looking to understand the internals of NFC cards or build their own RFID-based systems, NFCity serves as both a powerful tool and a clear reference implementation of a modern, MQTT-based IoT architecture.
