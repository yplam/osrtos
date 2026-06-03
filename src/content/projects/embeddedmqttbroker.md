---
title: EmbeddedMqttBroker
summary: An asynchronous, event-driven MQTT broker library for ESP32 and ESP8266 microcontrollers.
  It leverages FreeRTOS for multi-core task distribution and supports both standard
  TCP and WebSockets for MQTT 3.1.1 communication.
codeUrl: https://github.com/alexCajas/EmbeddedMqttBroker
isShow: false
rtos: freertos
libraries:
- lwip
topics:
- concurrent-programing
- embedded-system
- esp32
- esp32-arduino-core
- esp8266
- esp8266-rtos-arducore
- freertos-kernel
- iot
- mqtt-broker
- mqtt-server
- multithreading
- tcp
- tcp-server
- websocket
- websocket-server
- websockets
- wifi
star: 100
version: v2.0.12-qos
lastUpdated: '2025-12-17'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asyncmqtt-esp32
- asyncwebserver-esp32-sc-enc
- webserver-esp32-enc
- asyncwebserver-esp32-w5500
- asyncwebserver-esp32-sc-w5500
- webserver-esp32-w5500
---

In the world of IoT, the MQTT protocol is the undisputed king of messaging. Usually, developers rely on a central server or a cloud provider to host an MQTT broker like Mosquitto. However, there are many scenarios—such as local offline networks or edge computing—where the microcontroller itself needs to act as the hub. **EmbeddedMqttBroker** is a high-performance, plug-and-play solution designed specifically for the ESP32 and ESP8266 to fill this gap.

### Modern Architecture for Constrained Devices

Unlike simpler implementations that rely on inefficient polling, EmbeddedMqttBroker is built on a modern event-driven, non-blocking architecture. By leveraging **FreeRTOS**, the library distributes workloads across CPU cores. This ensures that the broker remains responsive even when handling multiple concurrent connections, providing low latency and high resource efficiency.

The project is designed to be developer-friendly, requiring minimal configuration to get a broker up and running. It supports MQTT 3.1.1 (currently at QoS 0) over both standard TCP and WebSockets. The WebSocket support is particularly useful for modern IoT applications, as it allows web-based dashboards to connect directly to the ESP32 without needing a middleman.

### Efficiency Through Data Structures

One of the most interesting technical aspects of this library is how it handles topic matching. Instead of iterating through a list of clients for every message (an O(n) operation that slows down as more clients connect), it utilizes a **Prefix Tree (Trie)** structure. 

In this model, topics are organized into a hierarchy. When a message is published, the broker traverses the tree to find interested subscribers. This reduces the search complexity to the number of levels in the topic rather than the number of connected clients. This approach makes the broker significantly more scalable for complex topic structures.

### Handling Hardware Limitations

While the ESP32 is powerful, it has inherent networking limits. The library documentation notes that the underlying **lwIP** stack typically limits the ESP32 to 10 concurrent TCP sockets. This means a single ESP32 can host approximately 9 clients (with one socket reserved for listening). While this might seem small compared to a PC-based broker, it is more than sufficient for many localized smart home or industrial monitoring tasks.

### Getting Started

Integrating the broker into an Arduino or PlatformIO project is straightforward. Below is a basic example of setting up a TCP-based broker:

```cpp
#include <WiFi.h> 
#include "EmbeddedMqttBroker.h" 

using namespace mqttBrokerName;

const char *ssid = "YOUR_SSID";
const char *password = "YOUR_PASSWORD";
uint16_t mqttPort = 1883;
MqttBroker* broker;

void setup(){
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  // Create the Broker using the Factory Method for TCP
  broker = MqttBrokerFactory::createTcpBroker(mqttPort);

  // Start the broker (Runs in background tasks)
  broker->startBroker();
}

void loop(){
  // The broker runs asynchronously in the background.
  // You can use the loop for other logic or delete it to save RAM.
  vTaskDelete(NULL);
}
```

### Future Roadmap

Currently, the library focuses on high-speed delivery with QoS 0. The developer has indicated plans to implement QoS 1 and QoS 2 in future versions, which will provide the delivery guarantees needed for mission-critical data. For developers working with the ESP8266, a specific `esp8266RTOS` branch is available to ensure compatibility with the RTOS SDK-based cores.
