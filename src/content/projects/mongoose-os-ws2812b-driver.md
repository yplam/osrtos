---
title: Mongoose OS WS2812B Driver
summary: A dedicated driver for controlling WS2812B (NeoPixel) RGB LED strips on Mongoose
  OS. It provides a simple C interface for managing LED counts, color ordering, and
  GPIO pin configuration for embedded IoT applications.
slug: mongoose-os-ws2812b-driver
codeUrl: https://github.com/OllieDay/mongoose-ws2812b
star: 2
lastUpdated: '2017-08-05'
rtos: mongoose-os
topics:
- c
- iot
- mongoose-os
- neopixel
- ws2812b
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- rainnow-core
- led-matrix-max7219-for-mongoose-os
- neoled
- neopixel-library-for-raspberry-pi-pico
- mongoose-os-relay-library
- hyperk
---

## Overview

The `mongoose-ws2812b` project provides a streamlined driver for the popular WS2812B (also known as NeoPixel) RGB LED strips, specifically designed for the Mongoose OS ecosystem. This driver simplifies the process of integrating addressable LEDs into IoT projects, handling the timing-sensitive communication required by the WS2812B protocol.

## Key Features

This driver offers a straightforward API for managing LED strips of varying lengths and configurations. Key capabilities include:

- **Flexible Color Ordering**: Supports different hardware variants by allowing users to specify color orders such as RGB, GRB, or BGR.
- **GPIO Configuration**: Easily map the LED strip to any available GPIO pin on the target microcontroller.
- **Memory Management**: Includes built-in functions to initialize and free memory, ensuring efficient resource usage on memory-constrained devices.
- **Simple Control API**: Provides high-level functions to set individual LED colors or clear the entire strip with minimal code.

## Technical Implementation

The driver uses a `ws2812b` struct to represent an instance of an LED strip. This struct holds the configuration data, including the pin number, the total LED count, and the color order. Once initialized, the driver manages the underlying data buffer required to push color information to the strip.

### Initialization and Configuration

Setting up a strip involves defining the hardware parameters and calling the initialization function. This allows for multiple strips to be managed if the hardware supports it.

```c
struct ws2812b strip = {
	// GPIO pin for the LED strip
	.pin = 0,
	// Total number of LEDs
	.count = 8,
	// Colour order of the LED: RGB, GRB, or BGR
	.order = WS2812B_ORDER_GRB
};

ws2812b_init(&strip);
```

### Controlling LEDs

Updating the strip is a two-step process: setting the desired colors in the local buffer and then calling a "show" function to transmit that data to the physical LEDs. This approach minimizes jitter and ensures that all LEDs update simultaneously.

```c
// Set a specific LED to white
ws2812b_set_led(&strip, 0, 0xFF, 0xFF, 0xFF);

// Refresh the LEDs to display the change
ws2812b_show(&strip);
```

To turn off all LEDs, the driver provides a convenience function to clear the buffer:

```c
ws2812b_clear(&strip);
ws2812b_show(&strip);
```

## Integration

To use this driver in a Mongoose OS project, the source files must be included in the firmware's `src` directory and referenced in the `mos.yml` configuration file. This integration allows the driver to leverage the Mongoose OS build system and hardware abstraction layers, making it compatible with various supported microcontrollers like the ESP32 and ESP8266.
