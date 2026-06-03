---
title: BC28 MQTT Package for RT-Thread
summary: An MQTT client package for RT-Thread designed to interface with Quectel BC28
  NB-IoT modules using AT commands. It provides a thread-safe, multi-instance API
  for connecting embedded devices to cloud platforms like Alibaba Cloud IoT.
slug: bc28-mqtt-package-for-rt-thread
codeUrl: https://github.com/luhuadong/rtt-bc28-mqtt
star: 19
version: v1.1.0
lastUpdated: '2023-10-09'
rtos: rt-thread
topics:
- mcu
- mqtt
- mqtt-client
- rt-thread
- rt-thread-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- iotsharp-for-rt-thread
- ppp-device-for-rt-thread
- mbed-to-ibm-watson-iot-platform
- stm32f429-mqtt-client-with-rtic-and-smoltcp
- mbed-to-aws-iot-example
- cicada-iot-communications-module-for-energy-access
---

## Overview

The bc28_mqtt package is a specialized MQTT client implementation for the RT-Thread RTOS, specifically designed to work with Quectel's BC28 NB-IoT module. By leveraging the RT-Thread AT component, this package allows microcontrollers to communicate with the BC28 module over UART to establish MQTT connections. While primarily developed for the BC28, the package is also compatible with BC35-G and BC95 modules due to their similar AT command sets.

## Key Features

This package simplifies the integration of NB-IoT connectivity into RT-Thread projects by providing a high-level API that abstracts the underlying AT command sequences. Key capabilities include:

- **Thread-Safe Design**: Safe for use in multi-threaded RTOS environments.
- **Multi-Instance Support**: Allows for multiple MQTT client instances if required by the application.
- **Automatic Reconnection**: Built-in support for handling network drops and maintaining a persistent connection.
- **Cloud Integration**: Currently optimized for connecting to the Alibaba Cloud (Aliyun) IoT platform.

## Technical Requirements

To use this package, the system must be running RT-Thread 4.0 or higher. It relies heavily on the RT-Thread AT Component, specifically requiring the AT Client functionality to be enabled in the project configuration. The communication is handled via a configurable UART interface, with support for standard baud rates such as 4800, 9600, and 115200.

## Configuration and Setup

Integration is managed through the RT-Thread package manager (Env tool or RT-Thread Studio). Users can configure several parameters directly in the menuconfig interface, including:

- **Hardware Interface**: AT Client device name (e.g., uart3) and baud rate.
- **Module Settings**: Operating frequency bands and reset pin assignments.
- **Cloud Credentials**: Product Key, Device Name, and Device Secret for Alibaba Cloud authentication.
- **MQTT Parameters**: Keep-alive intervals and connection settings.

## API Usage

The package provides a clean set of functional interfaces for managing the network lifecycle and MQTT operations. 

### Network Management

Before MQTT operations can begin, the module must be initialized and attached to the network:

```c
int bc28_init(void);                                         /* Initialize BC28 module */
int bc28_client_attach(void);                                /* Attach to UE network */
int bc28_build_mqtt_network(void);                           /* Establish MQTT network */
```

### MQTT Operations

Once the network is ready, the application can authenticate and interact with the broker:

```c
int  bc28_mqtt_auth(void);                                    /* Configure Aliyun device info */
int  bc28_mqtt_connect(void);                                 /* Connect to MQTT server */
int  bc28_mqtt_subscribe(const char *topic);                  /* Subscribe to a topic */
int  bc28_mqtt_publish(const char *topic, const char *msg);   /* Publish a message */
```

One notable feature is the `bc28_bind_parser` function, which allows developers to bind a custom JSON parsing callback to handle incoming messages efficiently. When publishing messages, the package uses a fixed-length message format, meaning developers do not need to manually append control characters like CTRL+Z to their strings.
