---
title: ESP32 Mesh Control
summary: An ESP-IDF based firmware for creating local mesh networks using ESP32-DevKitV1
  hardware. It features a self-hosted web server for configuration, real-time topology
  visualization via WebSockets, and a custom OTA update mechanism that broadcasts
  firmware to all nodes in the mesh.
slug: esp32-mesh-control
codeUrl: https://github.com/moschiel/esp_mesh_iot
lastUpdated: '2024-08-22'
licenses:
- NOASSERTION
image: /202605/esp_mesh_iot_0.avif
rtos: freertos
libraries:
- lwip
- spiffs
topics:
- esp-idf
- esp32
- espressif
- iot
- mesh-network
- mesh-networks
isShow: true
createdAt: '2026-05-07T00:43:35+00:00'
updatedAt: '2026-05-07T00:43:35+00:00'
relatedProjects:
- esp-mesh-lite-examples
- esp32-wi-fi-provision-care
- rnode-firmware-neopixel-edition
- esp32-p4-home-assistant-display
- esp8266-home-automation
- meshtnc
---

The ESP32 Mesh Control project leverages the ESP-IDF framework to build a robust mesh network of ESP32 devices designed for local indoor environments. By operating independently of an internet connection, it ensures privacy and reliability for local IoT applications. Users interact with the network through a smartphone or computer connected to the same WiFi router, accessing an HTTP server hosted directly on the ESP32 root node. A primary motivation for this repository was implementing Over-the-Air (OTA) updates using only the official ESP-IDF, providing a solution for developers who prefer the native Espressif environment over higher-level frameworks like painlessMesh or ESP-MDF.


## Core Functionalities
The system manages connectivity through a multi-stage process. If no credentials are found in the Non-Volatile Storage (NVS), the device initializes in access point (AP) mode. This allows users to connect to a unique SSID (e.g., "ESP32_Config_XXYYZZ") and navigate to a local configuration portal at `http://espmesh.local/`. Once configured, the device transitions to mesh mode, where it attempts to join the network. The root node of the mesh hosts a web server that provides a central interface for the entire network.

The integrated web server handles several critical tasks:
- **Credential Management**: Users can update WiFi and mesh credentials via a standard web form.
- **Network Monitoring**: A dedicated page provides a tree view of the topology, illustrating the parent-child relationships between nodes.
- **Firmware Distribution**: The server enables OTA updates by accepting a firmware URL and broadcasting the binary to all nodes in the mesh.

![Initial WiFi and Mesh Configuration Interface](/202605/esp_mesh_iot_1.avif)

## Technical Implementation and Storage
Developers can choose from three distinct methods for storing and serving the web interface's HTML files. The first method embeds text files directly into the binary during compilation. The second uses C macros defined in a header file. The third utilizes the SPIFFS (SPI Flash File System), though it currently lacks OTA support for the HTML files themselves. This flexibility allows developers to optimize for memory usage or ease of updates depending on their specific needs.

The project structure is organized into modular components within the `main/` directory, separating concerns such as mesh management, web socket handling, OTA logic, and IP configuration. This modularity supports the complex task of handling simultaneous web server requests and mesh data propagation using standard ESP-IDF components like LwIP and the HTTP server library.

## User Interaction and Feedback
The system provides immediate visual feedback via the onboard LED on the DevKitV1. Different blinking patterns signify whether the device is searching for a network, operating in AP mode, or connected successfully as part of the mesh. For hardware-level control, specific pins (D5 and D23) are designated for manual mode switching and factory resets, allowing users to recover devices or switch between AP and Mesh modes without serial access.

![Mesh Network Node List and Status](/202605/esp_mesh_iot_2.avif)

## Mesh OTA Updates
Updating the entire network is streamlined through a broadcast mechanism. By hosting a firmware binary on a local server (such as a simple Python HTTP server), the user can trigger an update via the web interface. The root node downloads the update and manages the distribution to child nodes. A WebSocket connection between the browser and the root ESP allows the user to monitor the update progress across the entire mesh in real-time.

![OTA Update Progress Monitoring](/202605/esp_mesh_iot_3.avif)

## Getting Started
Building the project requires a configured ESP-IDF development environment. The workflow involves cloning the repository, navigating to the project directory, and using standard `idf.py build` and `idf.py flash` commands. Once flashed, the initial setup is performed through the device's own configuration portal, completing the transition from a standalone microcontroller to a node in a coordinated mesh network.
