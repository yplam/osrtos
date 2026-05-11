---
title: ESP CAN-Analyzer
summary: An ESP32-based bridge that interfaces CAN bus systems with IoT environments
  using the Lawicel (SLCAN) protocol. It supports real-time CAN data monitoring and
  transmission via a web interface, Serial, or WebSockets, and is designed for automotive
  and industrial applications.
slug: esp-can-analyzer
codeUrl: https://github.com/NewTec-GmbH/esp32-can-iot
lastUpdated: '2026-03-13'
licenses:
- BSD-3-Clause
image: /202605/esp32-can-iot_0.avif
rtos: freertos
libraries:
- spiffs
- lwip
topics:
- automotive
- can
- can-bus
- esp32
- iot
- websocket
isShow: true
createdAt: '2026-05-11T13:42:56+00:00'
updatedAt: '2026-05-11T13:42:56+00:00'
---

## Bridging the Gap Between CAN and IoT

The ESP CAN-Analyzer is a specialized firmware project designed to act as a high-performance interface between traditional CAN bus systems and modern IoT environments. Built on the powerful ESP32 platform, it provides a bridge that allows users to interact with CAN frames using the Lawicel Protocol (also known as SLCAN). By representing complex CAN frames as simple ASCII strings, the project makes it possible for standard serial terminals, web browsers, and IoT tools like Node-Red to interpret and manipulate automotive or industrial data with ease.

## The Lawicel Protocol Advantage

At the heart of this project is the Lawicel protocol. Lawicel is a widely recognized standard for serial-to-CAN communication. It translates the binary complexity of CAN frames into human-readable ASCII symbols. This choice of protocol ensures that the ESP CAN-Analyzer is compatible with a vast array of existing software tools and applications available online. Whether you are using a simple terminal emulator or a sophisticated data logging suite, the Lawicel implementation ensures seamless data flow from the physical bus to the end-user system.

## Robust Hardware and Industrial Compliance

Designed with the automotive environment in mind, the hardware requirements for the ESP CAN-Analyzer are rigorous. It targets ESP32-based boards that support ISO 11898 compliant CAN communication at speeds up to 1 Mbps. To ensure reliability in harsh electrical environments, the project emphasizes compliance with ISO 7637 standards, which deal with electrical disturbances from conduction and coupling in road vehicles.

Connectivity is handled through standard DSUB-9 connectors, supporting both general CAN bus layouts and OBD (On-Board Diagnostics) pinouts. The system also includes hardware-level features such as bus-off state management, a red error LED for immediate visual feedback, and a physical control button for manual interaction.

## Web-Based Management and Monitoring

One of the standout features of the ESP CAN-Analyzer is its integrated HTTP server. This allows users to manage the device entirely through a web browser over WiFi. Key capabilities include:

- **WiFi Configuration**: Switch between Access Point (AP) and Station (STA) modes and update credentials on the fly.
- **CAN Settings**: Adjust bit timings and set hardware filters to isolate specific messages without needing to reflash the firmware.
- **Real-Time Monitoring**: A dedicated monitoring page allows users to view incoming CAN frames in real-time, depending on available system memory.
- **On-Demand Transmission**: Send specific CAN frames manually or configure periodic messages for testing and simulation.
- **Security**: The server supports authentication to ensure that only authorized users can modify the bus configuration or send commands.

## IoT Integration and Connectivity

The project offers two primary paths for data acquisition. The first is a traditional Serial interface, where Lawicel strings are sent directly to a connected laptop or PC. The second, more modern approach, utilizes WebSockets. By streaming Lawicel data over a WebSocket interface, the ESP CAN-Analyzer can integrate directly with IoT orchestration tools like Node-Red. This enables complex automation workflows, such as logging vehicle data to a cloud database or triggering alerts based on specific CAN error codes.

## Technical Foundation and Future Growth

The firmware is built using the Arduino framework for ESP32, leveraging the underlying FreeRTOS for task management. While currently highly functional, the project outlines several paths for optimization, including the transition to binary Lawicel commands for higher throughput, better utilization of the ESP32's dual cores for tasking, and improved WebSocket buffering to handle high-traffic buses.

By combining industrial-grade hardware compliance with flexible IoT connectivity, the ESP CAN-Analyzer serves as a robust tool for automotive engineers, hobbyists, and industrial automation specialists looking to unlock the data hidden within their CAN networks.
