---
title: 'Thing: Simplified MQTT Framework for ESP8266 and ESP32'
summary: A lightweight Arduino library for building MQTT-connected sensors and actuators
  on ESP8266 and ESP32 platforms. It automates WiFi management and MQTT connectivity
  while storing configuration settings securely in SPIFFS to avoid hardcoded credentials.
slug: thing-simplified-mqtt-framework-for-esp8266-and-esp32
codeUrl: https://github.com/g3rb3n/Thing
star: 1
version: 0.0.2
lastUpdated: '2017-11-05'
rtos: ''
libraries:
- spiffs
topics:
- actuators
- mqtt
- sensor
- spiffs
- wifi
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- autonetwork-library
- losant-mqtt-mongoose-os-example
- arduino-esp-utils
- effortless-spiffs
- esp-fs-webserver
- configassist-esp32-esp8266
---

## Overview

Thing is a specialized utility library designed to streamline the development of IoT sensors and actuators using the Arduino framework on ESP8266 and ESP32 microcontrollers. The project addresses the common overhead associated with connected devices—such as managing WiFi credentials, handling reconnection logic, and configuring MQTT parameters—by providing a high-level abstraction that allows developers to deploy functional hardware in just a few lines of code.

By leveraging SPIFFS (Serial Peripheral Interface Flash File System), Thing moves configuration out of the source code and into the device's filesystem. This approach not only improves security by avoiding hardcoded credentials but also makes devices more portable and easier to configure in the field.

## Key Features

### Intelligent Connectivity Management
The library includes built-in logic to automatically scan for and select the access point with the strongest signal. This is particularly useful in environments with multiple mesh nodes or repeaters. Furthermore, it implements robust reconnection logic to ensure that the device remains online even if the access point or MQTT broker temporarily drops out.

### Filesystem-Based Configuration
One of the standout features of Thing is its use of SPIFFS for storing settings. Users create a `data` folder containing two simple text files:
- `mqtt.txt`: Stores the server address, port, username, and password.
- `wifi.txt`: Stores a list of SSIDs and passwords, allowing the device to choose from multiple known networks.

### Modern API Design
Thing utilizes C++ lambdas for callbacks, providing a clean and expressive way to handle state changes and data updates. It also introduces a generic `Value` class as a flexible data type, simplifying the process of passing different types of sensor data or actuator commands through the MQTT stack.

## Technical Implementation

The library is built on top of the popular `PubSubClient` for MQTT communication and integrates seamlessly with the standard Arduino WiFi libraries for Espressif chips. It is designed to be called within the standard Arduino `setup()` and `loop()` structure, with a `handle()` method that manages the internal state machine and network processing.

## Getting Started

To use Thing, you define your sensors and actuators using simple registration methods. Sensors are configured with a polling interval and a callback to update their value, while actuators are defined with a topic and a callback to handle incoming data.

```cpp
#include "Thing.h"

using namespace g3rb3n;

Thing thing;
int count = 0;

void setup()
{
  Serial.begin(230400);
  
  // Monitor state changes (connecting, connected, etc.)
  thing.onStateChange([](const String& msg){
    Serial.println(msg);
  });
  
  // Add a sensor that publishes to "sensor/test" every 1000ms
  thing.addSensor("sensor/test", 1000, [](Value& v){
    v = count++;
  });
  
  // Add an actuator that listens to "display/test"
  thing.addActuator("display/test", [](Value& v){
    String msg = v; 
    Serial.println(msg);
  });
  
  thing.begin();
}

void loop()
{
  // Maintain network and MQTT state
  thing.handle();
}
```

## Hardware Support

Thing is primarily targeted at the Espressif ecosystem, with verified support for:
- **ESP8266**: Specifically tested on the Wemos D1 Mini.
- **ESP32**: Specifically tested on the Lolin32.

Because it is built as a standard Arduino library, it can be easily integrated into projects using the Arduino IDE or PlatformIO. The library's architecture is lightweight enough to run on these resource-constrained devices while providing enough abstraction to significantly reduce development time for IoT applications.
