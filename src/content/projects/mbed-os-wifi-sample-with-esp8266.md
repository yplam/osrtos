---
title: Mbed OS WiFi Sample with ESP8266
summary: A sample application for Mbed OS 5.12.3 demonstrating WiFi connectivity using
  an ESP8266 module. It implements a robust connection management system with automatic
  reconnection and periodic TCP data exchange on an STM32 NUCLEO-F446RE board.
slug: mbed-os-wifi-sample-with-esp8266
codeUrl: https://github.com/maiorfi/mbedos_wifi_sample_esp8266
star: 0
lastUpdated: '2019-05-12'
rtos: mbed-os
topics:
- mbed-os
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mbed-cellular-boilerplate
- zephyr-wi-fi-and-tcp-udp-connection-demo
- aws-iot-with-the-l475vg-iot01a-on-mbed-os
- pppos-example-for-mongoose-os
- mbed-os-client-example
- embedded-proto-mbed-os-to-server-example
---

## Overview

This project provides a comprehensive example of integrating an ESP8266 WiFi module with Mbed OS 5.12.3. Specifically designed for the STM32 NUCLEO-F446RE development board, it demonstrates how to manage network connectivity, handle asynchronous events, and perform TCP socket operations in a reliable manner.

The sample focuses on creating a resilient network stack that can handle disconnections gracefully. It utilizes Mbed OS's high-level networking APIs and event-driven architecture to ensure that the main application remains responsive while managing network state transitions.

## Key Features

### Robust Connection Management
At the heart of the application is a finite-state machine (FSM) that monitors the network status. The system is designed to keep the network connection open as much as possible. If the connection is lost, a scheduled event automatically attempts to re-initialize the WiFi interface and reconnect to the configured access point.

### Asynchronous Event Handling
The project makes extensive use of the `EventQueue` and `Thread` primitives provided by Mbed OS. By offloading network operations to a dedicated thread and dispatching tasks via an event queue, the application avoids blocking the main execution flow. This is particularly useful for handling periodic data transmissions and hardware interrupts simultaneously.

### TCP Communication
The sample implements a request-reply transaction pattern over TCP. It connects to a specified TCP server (configured as `broker.mqtt.it` by default), sends a message containing a counter, and waits for a response. This demonstrates the use of `TCPSocket` for reliable data exchange.

### Hardware Integration
- **STM32 NUCLEO-F446RE**: The primary target hardware.
- **ESP8266**: Used as the WiFi transport, interfaced via UART (pins PA_0 and PA_1).
- **User Interaction**: A hardware interrupt is attached to the onboard button (`BUTTON1`). Pressing the button triggers an immediate data transmission event.
- **Visual Feedback**: The onboard LED toggles whenever a successful data transaction occurs.
- **Debug Output**: The project uses `SWO` (Serial Wire Output) for high-speed debug logging, providing insights into the connection process and data flow.

## Technical Implementation

The application configuration is managed through `mbed_app.json`, where WiFi credentials and target-specific pin mappings for the ESP8266 are defined. The source code demonstrates several best practices for Mbed OS development:

- **WiFiInterface**: Utilizing the default instance for hardware-agnostic networking.
- **Socket Timeouts**: Setting appropriate timeouts on TCP operations to prevent the system from hanging on network failures.
- **Buffer Management**: Using fixed-size buffers for sending and receiving data to ensure memory stability.

## Getting Started

To use this project, you need to configure your WiFi credentials in the `mbed_app.json` file:

```json
"wifi-ssid": {
    "value": "\"YOUR_SSID\""
},
"wifi-password": {
    "value": "\"YOUR_PASSWORD\""
}
```

The project is compatible with the GCC ARM toolchain and includes configuration files for the Ozone debugger, making it easy to deploy and analyze on STM32 hardware. The logic is encapsulated in `main.cpp`, which initializes the event queue and schedules the periodic network management tasks.
