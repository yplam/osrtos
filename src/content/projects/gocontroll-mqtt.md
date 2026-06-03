---
title: GOcontroll-MQTT
summary: A lightweight, client-oriented MQTT stack designed for embedded systems.
  It supports QoS 0 and 1, features a priority-based message queue, and is built on
  top of the LwIP netconn API. The stack includes built-in mechanisms for connection
  monitoring, pings, and automatic re-initialization.
slug: gocontroll-mqtt
codeUrl: https://github.com/Rick-GO/GOcontroll-MQTT
star: 4
lastUpdated: '2020-03-27'
rtos: ''
libraries:
- lwip
topics:
- embedded-c
- lwip
- mqtt-client
- mqtt-protocol
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- freertos-mqtt-client-demo
- mqtt-like-application-for-tinyos
- stm32-lwip-mqtt-demo
- stm32f429-mqtt-client-with-rtic-and-smoltcp
- bc28-mqtt-package-for-rt-thread
- lightweight-publish-subscribe-application-protocol-for-tinyos
---

## Overview

GOcontroll-MQTT is a lightweight MQTT stack specifically designed for embedded systems where resource management and reliability are critical. Unlike heavy, full-featured MQTT clients, this stack focuses on providing a streamlined interface for constructing and reading messages to and from a broker. It is particularly well-suited for microcontrollers requiring a stable connection with minimal overhead.

## Technical Architecture

The stack is organized into four primary modules, each handling a specific layer of the MQTT protocol and communication process:

- **MqttApplication**: This is the user-facing layer. It provides functions to set broker details, subscribe to topics, and publish data. It also includes utility functions for extracting integer values from JSON strings, which are commonly used in MQTT payloads.
- **MqttInterface**: This module abstracts the communication hardware. While the default implementation is built on the LwIP netconn API, it is designed to be easily swappable for other communication interfaces.
- **MqttStack**: This is the core engine that manages the MQTT protocol logic. It handles timeouts, retries, and internal state management.
- **MqttBuffer**: This layer manages data streams using circular buffers. It features a priority-based send queue that ensures critical messages, such as PING requests, are sent first even if the outgoing queue is backed up.

## Key Features

GOcontroll-MQTT provides several robust features to ensure reliable communication in embedded environments:

- **Connection Management**: Includes a ping mechanism to keep connections alive and an automatic re-initialization routine if the connection to the broker is lost.
- **Quality of Service (QoS)**: Supports QoS 0 and QoS 1, allowing for flexible delivery guarantees depending on the application's needs.
- **Priority Queueing**: The outgoing message queue checks message priority. This is a significant advantage during short communication interruptions, as it allows the stack to prioritize pings or acknowledgments over standard data packets to maintain the session.
- **Configurable Parameters**: Users can fine-tune timeouts and retry limits for connection acknowledgments, subscriptions, publishing, and ping responses.

## Implementation and Integration

The stack is designed to be integrated into an RTOS-based environment or a well-timed super-loop. To drive the engine, the user must call `MqttStack_Scheduler()` every 10ms. This steady timing is crucial for the accurate execution of timeouts and ping actions.

Because the default implementation uses the LwIP netconn TCP connection, the `MqttInterface_ReceiveFromServer()` function is blocking. It is recommended to run this function within its own dedicated task or thread to prevent stalling the rest of the application. For developers using different hardware, the interface can be customized by implementing three core functions in `MqttInterface.c`:

- `MqttInterface_ConnectToServer`
- `MqttInterface_ReceiveFromServer`
- `MqttInterface_SendToServer`

## Data Handling

Received data is placed into a cyclic buffer. The stack monitors read and write pointers to trigger data extraction. When a message arrives on a subscribed topic, the stack automatically writes the payload into a user-declared character array, simplifying the process of data handling for the application developer.
