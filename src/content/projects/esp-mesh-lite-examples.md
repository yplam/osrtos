---
title: ESP-MESH-LITE Examples
summary: A collection of example applications for the ESP-MESH-LITE networking framework
  on ESP32. It demonstrates various protocol implementations including MQTT, HTTP,
  WebSocket, and FTP within a mesh topology. The project highlights the unique architecture
  of ESP-MESH-LITE where each node enables the LWIP stack for direct network interface
  invocation.
slug: esp-mesh-lite-examples
codeUrl: https://github.com/nopnop2002/esp-mesh-lite-examples
siteUrl: https://components.espressif.com/components/espressif/mesh_lite/
star: 12
lastUpdated: '2025-12-10'
rtos: freertos
libraries:
- lwip
topics:
- esp-idf
- esp-mesh
- esp32
isShow: false
createdAt: '2026-01-26'
updatedAt: '2026-01-26'
relatedProjects:
- esp32-freertos-examples
- mongoose-os-samples-for-esp32
- esp32-mesh-control
- mongoose-os-programs-and-examples
- stm32-lwip-mqtt-demo
- esp32-pppos-client-example
---

## Overview

ESP-MESH-LITE is a specialized mesh networking solution designed for Espressif's ESP32 series. Unlike the standard ESP-MESH (MDF), ESP-MESH-LITE features a different architecture where each node in the network enables the LWIP stack. This allows every device in the mesh to be treated as if it were directly connected to a router, enabling them to independently invoke standard network interfaces such as Sockets, MQTT, HTTP, and more.

This repository provides a comprehensive suite of examples that are not found in the official Espressif repository, serving as a bridge for developers looking to implement complex networking protocols over a mesh topology.

## Key Features and Examples

The project includes a wide variety of application-layer examples, demonstrating the flexibility of the ESP-MESH-LITE stack:

- **Standard Protocols**: Implementations for MQTT, HTTP (Client and Server), SNTP, and FTP clients.
- **Real-time Communication**: WebSocket client and server examples for low-latency data exchange.
- **Local Control**: A TCP server script and client example for managing multiple ESP32 nodes locally.
- **Routerless Operation**: Examples for creating mesh networks that function without a central router, including node-to-node message exchange.
- **Gateways**: Applications for bridging mesh data to UART/USB or BLE interfaces.

## Network Topology and Self-Healing

One of the most powerful aspects of ESP-MESH-LITE is its ability to automatically manage and restructure the network topology. The repository provides detailed logs demonstrating how the system handles various network events:

### Loss of Nodes
If a child node is lost, the parent node automatically detects the inactivity and disconnects it from the mesh. Conversely, if a root node (the node connected to the external router) fails, the network performs a self-healing process where a leaf node is automatically promoted to the root position to maintain connectivity.

### Automatic Joining
When new leaf nodes are powered on, the mesh automatically determines the best parent node based on signal strength and network layer depth, integrating the new device into the topology without manual configuration.

## Technical Requirements

These examples are built for the ESP-IDF (Espressif IoT Development Framework). Due to the evolution of the ESP-IDF ecosystem, this project requires **ESP-IDF V5.0 or later**. It utilizes the `esp-iot-bridge` component to facilitate communication between the mesh network and external IP networks.

## Getting Started

Developers can explore the individual directories for each protocol. Each example is structured as a standard ESP-IDF project. Because ESP-MESH-LITE nodes support standard LWIP calls, migrating an existing non-mesh application to a mesh environment is significantly simpler than with traditional mesh architectures. You can independently use standard ESP-IDF components for MQTT or HTTP while the underlying Mesh-Lite stack handles the routing and multi-hop delivery.
