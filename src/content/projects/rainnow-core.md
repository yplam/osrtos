---
title: Rainnow Core
summary: A Mongoose OS-based firmware for controlling NeoPixel LED strips via RPC.
  It provides a JavaScript-driven interface to manage LED states, colors, and blinking
  effects over a network, specifically targeting ESP32 or ESP8266 hardware.
slug: rainnow-core
codeUrl: https://github.com/elzup/rainnow-core
star: 0
lastUpdated: '2017-07-08'
rtos: mongoose-os
topics:
- esp8266
- mongoose-os
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mongoose-os-ws2812b-driver
- moonlight-8266
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- hyperk
- mongoose-os-configurable-sensor-node
- rnode-firmware-neopixel-edition
---

## Overview

Rainnow Core is a specialized firmware designed for controlling NeoPixel LED strips using the Mongoose OS framework. By leveraging the mJS (Embedded JavaScript) engine, the project provides a flexible and easily configurable way to manage lighting effects through Remote Procedure Calls (RPC). This allows developers to control hardware LEDs via standard network protocols like HTTP or WebSockets without writing complex C code.

## Technical Architecture

The project is built on **Mongoose OS**, a popular IoT firmware development framework. The core logic resides in `init.js`, which utilizes several Mongoose OS APIs:

- **api_neopixel.js**: For direct control of WS2812B/NeoPixel LEDs.
- **api_rpc.js**: To expose control functions over the network.
- **api_timer.js**: For handling periodic tasks like LED blinking and state updates.

The system initializes a 16-pixel strip on GPIO pin 4. It maintains an internal state for each pixel, tracking its current color, whether it is active, and if it should be in a blinking state.

## Remote Control API

The primary interface for Rainnow Core is the `Control` RPC handler. This allows external applications or simple `curl` commands to update the LED strip's behavior dynamically. The API supports several parameters:

- `start` and `end`: Define the range of pixels to modify (0-15).
- `color`: An RGB object containing `r`, `g`, and `b` values (0-255).
- `off`: A boolean to quickly disable a range of LEDs.
- `blink`: A boolean to enable a 500ms toggle effect for the specified range.

### Example Usage

To turn a specific segment of the strip green, you can send a POST request to the device's RPC endpoint:

```bash
curl -d '{ "off": false, "start": 7, "end": 9, "blink": false, "color": { "r": 0, "g": 255, "b": 0 }}' http://192.168.2.101/rpc/Control
```

## Internal Logic and Blinking

The firmware implements a global timer that fires every 500ms. This timer iterates through the pixel states; if a pixel is marked as `blink`, the timer toggles its visibility on each tick, creating a flashing effect. The state management ensures that even when blinking, the underlying color and configuration are preserved.

Upon startup, the system initializes all pixels to a default blue-ish color (`r: 39, g: 108, b: 146`) and includes a safety timer that turns all LEDs off after 3 seconds unless a new command is received. This is a useful pattern for ensuring the device doesn't remain in a high-power state if the controller is disconnected.
