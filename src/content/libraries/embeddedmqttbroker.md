---
title: EmbeddedMqttBroker
slug: embeddedmqttbroker
summary: EmbeddedMqttBroker is a high-performance, asynchronous MQTT 3.1.1 broker
  implementation for ESP32 and ESP8266 microcontrollers. It leverages an event-driven,
  non-blocking architecture and FreeRTOS tasks to manage concurrent TCP and WebSocket
  connections with minimal CPU overhead and high scalability.
codeUrl: https://github.com/alexCajas/EmbeddedMqttBroker
star: 105
version: v2.1.12-qos0
lastUpdated: '2026-04-11'
components:
- Network
- Wireless
- TCP
- MQTT
- WebSocket
- HTTP
platforms:
- Xtensa
libraryType: Network
createdAt: '2025-12-27'
updatedAt: '2026-04-19'
---

### Features


- Implements MQTT 3.1.1 protocol for embedded devices.

- Features an asynchronous, non-blocking architecture to handle concurrent connections.

- Supports MQTT over both raw TCP and WebSockets.

- Utilizes FreeRTOS tasks to distribute processing across ESP32 CPU cores.

- Uses a prefix tree (trie) for efficient O(n) topic matching where n is the number of topic levels.

- Provides full support for MQTT wildcards including '#' and '+'.

- Employs an event-driven I/O model to minimize CPU cycle waste compared to polling.

- Includes a factory pattern for easy instantiation of TCP or WebSocket brokers.

- Supports configurable output buffer sizes to manage high-traffic bursts.

- Integrates with ESP32 hardware abstraction layer logging for real-time activity monitoring.

- Compatible with ESP8266 via the ESP8266 RTOS SDK-based Arduino core.

- Designed for low latency and resource efficiency in memory-constrained environments.

- Supports up to 9 concurrent TCP clients on ESP32 due to lwIP limitations.

- Implements QoS level 0 for message delivery.

- Provides approximately 2.8KB of storage capacity for topic strings.

- Utilizes worker tasks to prevent slow clients from blocking the main event loop.

- Includes a HTML MQTT-WebSocket client dashboard for browser-based testing.

- Supports custom core debug levels for granular serial output control.



EmbeddedMqttBroker is designed as a scalable, high-performance solution for handling MQTT traffic on resource-constrained microcontrollers. The architecture centers on an event-driven, non-blocking I/O model that avoids the inefficiencies of traditional polling. By utilizing the FreeRTOS scheduler, the broker distributes network management and message processing across available CPU cores. This design ensures that the system remains responsive to new connection requests even during heavy message throughput.

The core of the message routing logic is a prefix tree (trie) structure. This allows the broker to perform topic matching in O(n) time, where n is the number of levels in the topic string, rather than the number of connected clients. This hierarchical approach significantly reduces CPU cycles during message distribution and provides native support for MQTT wildcards. The broker also employs a factory pattern to abstract the underlying transport layer, allowing developers to instantiate either TCP or WebSocket-based brokers through a unified interface.

**Core Components**
- **MqttBrokerFactory**: Manages the instantiation of broker objects for different transport protocols.
- **Prefix Tree (Trie)**: Handles efficient topic storage, subscription management, and wildcard matching.
- **Event Loop Task**: A high-priority FreeRTOS task responsible for managing network events and socket states.
- **Worker Tasks**: Background tasks that handle message parsing and distribution to avoid blocking the network interface.
- **Outbox Buffer**: A configurable queue for managing high-traffic bursts and ensuring message delivery to clients.

### Use Cases
This library is ideal for:
- **Local IoT Gateways**: Serving as a central MQTT broker for a local network of sensors and actuators, eliminating the need for external cloud dependencies.
- **Real-Time Web Dashboards**: Leveraging WebSocket support to enable direct, low-latency communication between web browsers and embedded hardware.
- **Industrial M2M Communication**: Providing a reliable and efficient messaging backbone for machine-to-machine interactions in constrained industrial environments.
- **Embedded System Prototyping**: Offering a plug-and-play broker solution for developers needing rapid integration of MQTT functionality into ESP32 or ESP8266 projects.

### Getting Started
To get started with EmbeddedMqttBroker, install the library through the Arduino Library Manager or PlatformIO (`alexcajas/EmbeddedMqttBroker`). Ensure that the required dependencies, including `WrapperFreeRTOS` and either `AsyncTCP` or `ESPAsyncWebServer`, are available in your environment. For ESP32 users, the broker can be instantiated using the `MqttBrokerFactory::createTcpBroker(port)` method within the `setup()` function. After calling `broker->startBroker()`, the system runs concurrently in the background using FreeRTOS tasks. ESP8266 users must specifically use the `esp8266RTOS` branch and the `esp8266RTOSArduCore` to ensure compatibility with the required asynchronous architecture.
