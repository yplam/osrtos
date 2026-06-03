---
title: Microhomie
summary: A MicroPython framework for the Homie convention, a lightweight MQTT protocol
  for IoT devices. It targets ESP8266 and ESP32 platforms, providing an asynchronous
  implementation of Homie v4.0.0 using MicroPython's uasyncio library.
slug: microhomie
codeUrl: https://github.com/microhomie/microhomie
siteUrl: https://microhomie.readthedocs.io
star: 81
version: v3.0.2
lastUpdated: '2021-01-07'
rtos: ''
libraries:
- micropython
- littlefs
topics:
- conventions
- esp32
- esp8266
- framework
- home-automation
- homie
- iot
- micropython
- mqtt
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- micropython-smarthome-node-pysmartnode
- mqboard-micropython-mqtt-micro-framework
- homerpc
- embeddedmqttbroker
- thing-simplified-mqtt-framework-for-esp8266-and-esp32
- iot-framework-for-nodemcu
---

Microhomie is a specialized MicroPython framework designed to implement the Homie convention, a lightweight MQTT-based communication standard for the Internet of Things. By providing a structured way for IoT devices to describe themselves and their capabilities over MQTT, Microhomie simplifies the integration of microcontrollers like the ESP8266 and ESP32 into home automation systems and IoT dashboards.

## The Homie Convention in MicroPython

The Homie convention defines a standardized hierarchy for MQTT topics, allowing devices to be self-discovering. Microhomie v3 implements Homie v4.0.0, enabling developers to define 'Nodes' (like a light or a sensor) and 'Properties' (like on/off state or temperature) that are automatically announced to the MQTT broker. This structure ensures that any Homie-compliant controller can interact with a Microhomie device without manual configuration of topic strings.

## Asynchronous Architecture

One of the core strengths of Microhomie is its reliance on asynchronous programming. Built on top of MicroPython's `uasyncio` (v3), the framework handles network operations, MQTT heartbeats, and hardware interactions without blocking the main execution loop. It utilizes the `mqtt_as` library by Peter Hinch, which is specifically designed for resilient MQTT connections in MicroPython, ensuring that devices can automatically reconnect and recover from network interruptions.

## Hardware and Filesystem Support

While Microhomie is primarily targeted at the ESP8266, it is extensively tested and widely used on the ESP32. A significant update in version 3 is the move to the LFS2 (LittleFS) filesystem, which offers better reliability and performance for embedded flash memory compared to older FAT-based systems. To optimize for performance and memory on constrained devices like the ESP8266, the framework disables certain non-essential MicroPython features like `btree` and `vfat` support.

## Example Implementation

Creating a device with Microhomie involves defining a `HomieDevice`, adding `HomieNode` objects to it, and then attaching `HomieProperty` objects to those nodes. Below is a basic example of controlling an on-board LED:

```python
import settings
from machine import Pin
from homie.node import HomieNode
from homie.device import HomieDevice
from homie.property import HomieProperty
from homie.constants import BOOLEAN, FALSE, TRUE

# Initialize the pin for the onboard LED
LED = Pin(2, Pin.OUT, value=1)

# The on_message handler to power the led
def toggle_led(topic, payload, retained):
    LED(0 if payload == TRUE else 1)

def main():
    device = HomieDevice(settings)
    led_node = HomieNode(id="led", name="On-board LED", type="LED")

    led_power = HomieProperty(
        id="power",
        name="Power",
        settable=True,
        datatype=BOOLEAN,
        default=FALSE,
        on_message=toggle_led,
    )

    led_node.add_property(led_power)
    device.add_node(led_node)
    device.run_forever()

if __name__ == "__main__":
    main()
```

## Getting Started

Microhomie provides a streamlined build process via a Makefile, allowing users to bootstrap the environment, build custom firmware images, and deploy them to devices using `esptool`. The project includes a comprehensive set of examples covering various sensors and actuators, making it easy for developers to transition from a simple LED toggle to complex multi-node IoT devices. Configuration is handled through a `settings.py` file where WiFi credentials, MQTT broker details, and device-specific extensions are defined.
