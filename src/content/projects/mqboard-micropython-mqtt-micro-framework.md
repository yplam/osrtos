---
title: MQBoard - MicroPython MQTT Micro-Framework
summary: A micro-framework for managing MicroPython boards remotely via MQTT and asyncio.
  It provides a robust MQTT client, remote REPL access, OTA updates, and remote logging
  over a single encrypted connection, specifically optimized for ESP32 microcontrollers.
slug: mqboard-micropython-mqtt-micro-framework
codeUrl: https://github.com/tve/mqboard
star: 128
version: v0.1
lastUpdated: '2022-05-08'
rtos: freertos
libraries:
- micropython
topics:
- micropython
- micropython-mqtt
- mqtt
- mqtt-libraries
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- microhomie
- micropython-smarthome-node-pysmartnode
- micropython-for-esp32-with-psram-support-lobo-port
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- micros
- micropython-and-lvgl-firmware-for-esp32
---

## Managing Remote MicroPython Nodes with MQBoard

MQBoard is a micro-framework designed to solve the challenges of managing MicroPython-based IoT nodes in the field. When devices are deployed at remote locations, physical access via USB becomes impossible. MQBoard provides a robust infrastructure to manage these nodes entirely over an MQTT connection, ensuring they remain accessible, updatable, and diagnosable even when things go wrong.

## The Single Connection Strategy

One of the most significant constraints on microcontrollers like the ESP32 is memory, particularly when using encrypted connections. A single TLS buffer can consume upwards of 20KB of RAM. MQBoard is engineered to operate using a single encrypted MQTT connection to a broker. This design choice minimizes memory overhead, simplifies certificate management, and reduces the attack surface by ensuring there are no open ports on the device itself.

## Key Features and Capabilities

MQBoard is built for 24/7 operation and includes several features essential for remote reliability:

- **Remote REPL Access:** Developers can access the MicroPython REPL on each board via MQTT. This allows for running diagnostics, interactive troubleshooting, and filesystem management without a physical serial connection.
- **Robust MQTT Client:** The core `mqtt_async` library is a stand-alone, asyncio-based MQTT client optimized for streaming files and maintaining stable connections.
- **OTA Updates:** The framework supports sending MicroPython firmware updates over the MQTT connection.
- **Remote Logging:** Standard console output can be redirected to a remote MQTT-based logger, allowing developers to monitor device behavior in real-time from anywhere.
- **Watchdog and Safe Mode:** To prevent "bricking" a device during a remote update, MQBoard includes a watchdog timer and a safe mode. If the application crashes repeatedly during boot, the system reverts to a known-good safe mode that maintains MQTT connectivity for recovery.

## Technical Architecture

The project is divided into several modular components:

- **mqtt_async:** The backbone library providing asynchronous MQTT communication.
- **mqrepl:** A library that implements the remote REPL protocol over MQTT.
- **mqboard CLI:** A Python-based command-line tool for developers to interact with remote boards from their local machines.
- **board scripts:** Optimized `boot.py` and `main.py` files that handle the transition between normal operation and safe mode.

## Getting Started with Remote Management

The typical workflow with MQBoard involves an initial "bootstrap" phase where the core safe-mode software is loaded via USB. Once this foundation is in place, the device can be managed entirely over the network. 

For example, once a board is running MQBoard, you can evaluate Python expressions remotely using the `mqboard` tool:

```python
# Evaluate a simple expression remotely
$ ./mqboard/mqboard --prefix esp32/test eval '45 + 876'
921

# Check system implementation details
$ ./mqboard/mqboard --prefix esp32/test eval 'import sys; print(sys.implementation)'
(name='micropython', version=(1, 12, 0), mpy=10757)
```

This level of access allows for seamless updates and monitoring. While the project is primarily tested on ESP32, its reliance on standard MicroPython `asyncio` (uasyncio) makes it a flexible choice for various networked MicroPython environments.
