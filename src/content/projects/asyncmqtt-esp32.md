---
title: AsyncMQTT_ESP32
summary: A high-performance asynchronous MQTT client for ESP32, S2, S3, and C3 microcontrollers.
  It supports WiFi and various Ethernet controllers like W5500, W6100, and ENC28J60
  with integrated SSL/TLS capabilities via LwIP.
codeUrl: https://github.com/khoih-prog/AsyncMQTT_ESP32
isShow: false
rtos: freertos
libraries:
- lwip
topics:
- async
- async-mqtt
- async-mqtt-client
- esp32
- esp32-c3
- esp32-s2
- esp32-s3
- fingerprint
- lwip
- lwip-enc28j60
- lwip-ethernet
- lwip-lan8720
- lwip-w5500
- ssl
- tls
- w5500
- wt32-eth01
- async-mqtts
- lwip-w6100
- w6100
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asynchttpsrequest-generic
- asyncwebserver-esp32-sc-enc
- asynchttpsrequest-esp32-ethernet
- asynchttprequest-esp32-ethernet
- asyncwebserver-esp32-w5500
- asyncwebserver-esp32-sc-w5500
---

The AsyncMQTT_ESP32 library is a powerful extension of the popular Marvin Roger's async-mqtt-client, specifically tailored for the ESP32 family of microcontrollers. In the world of IoT, where responsiveness and efficiency are paramount, this library provides a non-blocking, event-driven approach to MQTT communication. By leveraging asynchronous networking, developers can handle multiple connections simultaneously without stalling the main execution loop, a critical requirement for complex embedded systems.

### Why Asynchronous MQTT Matters
Traditional MQTT libraries often rely on a synchronous, blocking model. When the client sends a message or waits for an acknowledgment, the processor is frequently stuck in a loop, unable to perform other tasks like reading sensors or updating a display. AsyncMQTT_ESP32 changes this paradigm. You are notified via callbacks once a request is ready or a message is parsed. This architecture allows for significantly higher throughput and lower latency, making it ideal for high-speed data telemetry and real-time control applications.

### Extensive Hardware and Networking Support
One of the most impressive aspects of this library is its broad hardware compatibility. While it natively supports the standard ESP32, it also extends full support to the newer S2, S3, and C3 variants. Beyond WiFi, the library is a robust solution for wired industrial applications. It integrates with the LwIP stack to support several popular Ethernet controllers, including:
- **W5500 and W6100**: High-speed (100Mbps) full-duplex controllers.
- **ENC28J60**: A cost-effective 10Mbps Ethernet solution.
- **LAN8720**: Commonly found on boards like the WT32-ETH01.

### Security and SSL/TLS
In modern IoT deployments, security is not optional. AsyncMQTT_ESP32 provides built-in support for SSL/TLS through the `AsyncTCP_SSL` dependency. This allows developers to connect to secured MQTT brokers (typically on port 8883) using fingerprints or certificates, ensuring that data remains private and tamper-proof during transit.

### Getting Started
To use the library, you'll need to install it via the Arduino Library Manager or PlatformIO. It depends on `AsyncTCP` (for standard connections) or `AsyncTCP_SSL` (for secure ones). Below is a simplified example of how to initialize the client:

```cpp
#include <AsyncMQTT_ESP32.h>

AsyncMqttClient mqttClient;

void onMqttConnect(bool sessionPresent) {
  Serial.println("Connected to MQTT.");
  uint16_t packetIdSub = mqttClient.subscribe("test/topic", 2);
}

void setup() {
  Serial.begin(115200);
  mqttClient.onConnect(onMqttConnect);
  mqttClient.setServer("broker.emqx.io", 1883);
  mqttClient.connect();
}

void loop() {
  // No need for a client.loop() call as it's asynchronous!
}
```

### Advanced Features and Debugging
The library includes a comprehensive set of callbacks for handling connection events, disconnections, message arrivals, and delivery acknowledgments (QoS 1 and 2). For developers troubleshooting complex network issues, the library offers a built-in debug system. By adjusting the `_ASYNC_MQTT_LOGLEVEL_` define, you can get detailed terminal output regarding the internal state of the MQTT state machine and packet parsing.

Whether you are building a simple home automation sensor or a complex industrial gateway requiring wired Ethernet and SSL, AsyncMQTT_ESP32 provides the performance and flexibility needed for professional-grade ESP32 development.
