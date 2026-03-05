---
title: Nova RP2040 LED Matrix Board
summary: Nova is a compact development board featuring the Raspberry Pi RP2040 microcontroller
  and an integrated 7x10 addressable WS2812-1010 LED matrix. It is designed for creating
  interactive visual projects and supports the Arduino IDE via the Earle Philhower
  RP2040 core.
slug: nova-rp2040-led-matrix-board
codeUrl: https://github.com/VccLabs/Nova
star: 21
version: v1.0
lastUpdated: '2024-12-19'
rtos: ''
topics:
- arduino
- development-board
- diy-electronics
- electronics
- embedded
- fastled
- interactive
- opensource
- rp2040
isShow: true
image: /202603/nova.webp
createdAt: '2026-03-05'
updatedAt: '2026-03-05'
---

## Overview

Nova is a specialized, ultra-compact development board centered around the Raspberry Pi RP2040 microcontroller. What sets Nova apart is its integrated 7x10 matrix of addressable LEDs, providing 70 individual pixels in a tiny form factor. This makes it an ideal platform for developers looking to create wearable electronics, compact status displays, or interactive art pieces without the bulk of external wiring for LED strips.

## Hardware Capabilities

At its core, Nova leverages the power of the RP2040, a dual-core ARM Cortex-M0+ processor capable of running up to 133MHz. This provides ample processing power to handle complex LED animations while simultaneously managing sensors or other peripherals. 

**Key hardware features include:**
- **RP2040 Microcontroller:** High-performance silicon with 264KB of SRAM.
- **7x10 LED Matrix:** Utilizes WS2812-1010 addressable LEDs, known for their small footprint and vibrant color reproduction.
- **Compact Form Factor:** Designed for easy integration into space-constrained projects.
- **USB Type-C:** Modern connectivity for power and programming.

## Software and Ecosystem

Nova is designed to be accessible to both beginners and experienced makers. It fully supports the Arduino IDE environment, specifically utilizing the popular RP2040 core maintained by Earle Philhower. This compatibility allows users to leverage a vast ecosystem of existing Arduino libraries and community support.

For controlling the integrated matrix, the project recommends the **FastLED** library. FastLED is a powerful tool for managing addressable LEDs, offering high-performance math for color fades, animations, and power management.

## Getting Started with Nova

Setting up Nova involves adding the RP2040 board support to the Arduino IDE and installing the necessary libraries. Once the environment is configured, controlling the matrix is straightforward. Below is a basic example of how to initialize the board and toggle the first LED in the matrix using FastLED:

```cpp
#include <FastLED.h>

#define LED_PIN     22    // Data pin connected to LED matrix (GP22)
#define NUM_LEDS    70    // Total number of LEDs in the 7x10 matrix

CRGB leds[NUM_LEDS];

void setup() {
    // Initialize the WS2812 LEDs on the Nova board
    FastLED.addLeds<WS2812, LED_PIN, GRB>(leds, NUM_LEDS);
    FastLED.setBrightness(10); // Set brightness to a safe level
}

void loop() {
    // Set the first LED to red
    leds[0] = CRGB::Red;
    FastLED.show();
    delay(1000);
    
    // Turn off the first LED
    leds[0] = CRGB::Black;
    FastLED.show();
    delay(1000);
}
```

## Applications

Because of its integrated display and powerful microcontroller, Nova is particularly well-suited for:
- **Wearable Tech:** Creating glowing badges or jewelry.
- **IoT Notifications:** Using the matrix to display simple icons or scrolling text for weather alerts or social media notifications.
- **Prototyping:** Quickly testing LED patterns and animations without breadboarding.
- **Education:** A self-contained kit for learning embedded C++ and digital logic.
