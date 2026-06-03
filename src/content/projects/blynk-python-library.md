---
title: Blynk Python Library
summary: A Python and MicroPython library designed to connect IoT hardware to the
  Blynk Cloud. It provides an API for exchanging sensor data and controlling hardware
  peripherals like relays and motors from iOS and Android devices, specifically targeting
  Raspberry Pi and ESP-based microcontrollers.
slug: blynk-python-library
codeUrl: https://github.com/blynkkk/lib-python
siteUrl: https://docs.blynk.io
star: 241
version: 0.2.6
lastUpdated: '2025-05-07'
rtos: ''
libraries:
- micropython
topics:
- blynk
- embedded
- esp32
- esp8266
- hardware
- iot
- iot-application
- iot-cloud
- iot-device
- iot-platform
- library
- linux
- mcu
- microcontroller
- micropython
- python
- raspberry-pi
- raspberry-pi-3
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- semito-v-micropython-compatibility-layer-mcl
- blinker-iot-documentation
- micropython-for-sparrow-one-board
- rp2040-pico-w-esp8285-wifi-library
- mongoose-os-relay-library
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
---

## Overview

The Blynk Python Library is a bridge between IoT hardware and the Blynk Cloud ecosystem. It allows developers to connect hardware running Python or MicroPython—such as Raspberry Pi, ESP32, and ESP8266—to the Blynk mobile apps for iOS and Android. Through this library, users can send raw or processed sensor data to the cloud and remotely control hardware components like relays, motors, and servos from anywhere in the world.

While this library is a powerful tool for rapid prototyping and IoT development, it is important to note that the project is currently in a maintenance-only state. The developers recommend transitioning to the Blynk MQTT API for new, future-proof projects.

## Dual-Platform Support

The library is uniquely structured to support both standard CPython (for environments like Raspberry Pi or desktop testing) and MicroPython (for resource-constrained microcontrollers). This is achieved through two primary implementation files:

- **blynklib.py**: Optimized for CPython 2.7.9+ or 3.4+. It supports advanced features like SSL socket connections for secure communication with the Blynk Server.
- **blynklib_mp.py**: A specialized version for MicroPython that uses lightweight modules like `usocket`, `utime`, and `ustruct` to fit within the memory constraints of devices like the ESP8266.

## Core Concepts: Virtual Pins and Events

The library operates primarily through the concept of **Virtual Pins**. Unlike physical GPIO pins, Virtual Pins are logical channels used to send and receive data between the hardware and the Blynk app widgets. 

The library uses an event-driven architecture, allowing developers to register handlers for specific actions using decorators. This makes the code highly readable and easy to maintain.

```python
import blynklib

BLYNK_AUTH = '<YourAuthToken>'
blynk = blynklib.Blynk(BLYNK_AUTH)

# Register handler for Virtual Pin V22 write events
@blynk.handle_event('write V22')
def write_virtual_pin_handler(pin, value):
    print(f'Current V22 value: {value}')

while True:
    blynk.run()
```

## Hardware and Features

The library has been tested extensively with several popular embedded platforms:
- **Raspberry Pi**: Supports all models, often used for more complex gateway-style applications.
- **ESP32 & ESP8266**: Targeted via MicroPython, allowing these low-cost Wi-Fi chips to interact with the Blynk ecosystem.

Beyond simple data exchange, the library supports several advanced Blynk features:
- **Push Notifications**: Send alerts directly to a smartphone.
- **Email and Twitter Integration**: Trigger external communications based on hardware events.
- **Widget Property Control**: Dynamically change the UI of the Blynk app (e.g., changing the color of an LED widget based on a sensor threshold).
- **Blynk Timer**: A dedicated `blynktimer` module is included to handle periodic tasks without using blocking `sleep` calls, which is critical for maintaining the connection to the Blynk server.

## Memory Management

For hardware with limited memory, such as the ESP8266, the library documentation provides guidance on using "frozen modules" or "frozen bytecode." This approach allows the library to be compiled into the MicroPython firmware itself, significantly reducing RAM usage and allowing for more complex user applications on small chips.
