---
title: MQTT Viewer
summary: A high-performance desktop MQTT visualization and debugging tool for Windows,
  Mac, and Linux. It supports MQTT v3 and v5 protocols, Sparkplug B codecs, and concurrent
  broker connections, providing a comprehensive interface for monitoring IoT message
  traffic.
slug: mqtt-viewer
codeUrl: https://github.com/mqtt-viewer/mqtt-viewer
siteUrl: https://mqttviewer.app
star: 88
version: v0.6.5
lastUpdated: '2026-01-20'
rtos: ''
libraries:
- sqlite
topics:
- debugging
- linux
- mac
- mqtt
- open-source
- sparkplug
- visualisation
- windows
isShow: false
createdAt: '2026-02-05'
updatedAt: '2026-02-05'
relatedProjects:
- esp32-mpy-jama
- xiao-debug-mate
- linkscope-bpu-uart-analyzer
- modbux
- meshcore-mqtt-gateway
- freertos-visualizer
---

## Overview

MQTT Viewer is a feature-rich, cross-platform desktop application designed to simplify the process of visualizing and debugging MQTT-based systems. As MQTT continues to be the backbone of IoT and industrial automation, having a responsive tool to inspect message flows, verify payloads, and test broker logic is essential for developers. MQTT Viewer provides a modern interface that handles the complexities of both legacy and modern MQTT versions while maintaining high performance even under heavy message loads.

## Technical Architecture

The project is built using a modern hybrid stack. The backend is powered by **Go**, utilizing the **Wails** framework to bridge system-level capabilities with a web-based frontend. This allows the application to leverage Go's concurrency model for handling multiple broker connections and high-throughput message streams. The user interface is built with **Svelte**, ensuring a reactive and lightweight experience. For local data persistence, such as saved connections and message history, the application uses **SQLite** managed via the GORM library and Atlas for database migrations.

## Key Features

MQTT Viewer distinguishes itself with a set of features tailored for both general IoT development and specific industrial use cases:

- **Protocol Compatibility**: Full support for both MQTT v3 and MQTT v5, including support for v5-specific features like user headers.
- **Topic Tree Visualization**: Messages are organized into a hierarchical tree structure, making it easy to navigate complex topic namespaces.
- **Industrial IoT Support**: Built-in support for **Sparkplug B**, as well as Base64 and Hex codecs, allowing developers to decode specialized industrial payloads directly within the viewer.
- **Concurrent Connections**: The tool supports up to 10 concurrent broker connections, enabling side-by-side comparison of different environments (e.g., development vs. production).
- **Interactive Timeline**: A message timeline allows users to scrub through historical data and compare current messages with previous ones to identify state changes.

## Development and Extensibility

The project is open-source and encourages community contribution. Because it uses the Wails framework, developers familiar with Go and modern JavaScript frameworks can easily extend its functionality. The build process utilizes `pnpm` for frontend dependencies and standard Go modules for the backend. For developers looking to contribute or customize the tool, the repository includes a `justfile` to streamline development tasks like running the application in dev mode with hot-reloading enabled for both the frontend and backend logic.

## Use Cases in Embedded Systems

While MQTT Viewer runs on desktop platforms, its primary utility is in the development and maintenance of embedded systems. It serves as a critical bridge for firmware engineers to verify that their devices are publishing data correctly and responding to command-and-control topics as expected. The inclusion of pattern-based filters and publish history makes it particularly useful for stress-testing embedded MQTT clients and simulating broker responses during the early stages of firmware development.
