---
title: DRV8833 MicroPython Driver
summary: A pure MicroPython driver for the DRV8833 dual H-bridge motor controller.
  It provides PWM-based throttle control for two DC motors, supporting both fast and
  slow decay modes. The library is designed for microcontrollers like the Raspberry
  Pi Pico and is compatible with various DRV8833 breakout boards.
slug: drv8833-micropython-driver
codeUrl: https://github.com/AHSPC/DRV8833_micropython
star: 10
lastUpdated: '2024-06-03'
rtos: ''
libraries:
- micropython
topics:
- adafruit
- drv8833
- micropython
- micropython-rpi-pico
isShow: false
createdAt: '2026-02-08'
updatedAt: '2026-02-08'
relatedProjects:
- opendualmotordriver
- micropython-rotary-encoder-driver
- neopixel-library-for-raspberry-pi-pico
- micropython-st7735-tft-lcd-driver
- micropython-waveshare-e-paper-drivers
- micropython-max7219-8x8-led-matrix-library
---

## Overview

The DRV8833 is a popular dual H-bridge motor driver capable of driving two DC brushed motors or one stepper motor. This project provides a pure MicroPython implementation for controlling the DRV8833, specifically optimized for ease of use on platforms like the Raspberry Pi Pico. While it was designed with Adafruit's DRV8833 breakout board in mind, the driver is generic enough to work with any standard DRV8833 hardware configuration.

## Key Features

This driver focuses on providing a clean, object-oriented interface to motor control. Key capabilities include:

- **Dual Motor Support**: Independent control for Motor A and Motor B.
- **PWM Throttle Control**: Fine-grained speed control using Pulse Width Modulation (PWM).
- **Decay Mode Selection**: Supports both `SLOW_DECAY` and `FAST_DECAY` modes. Slow decay is the default as it typically improves spin thresholds and provides better linearity between throttle values and motor speed.
- **Safety & Cleanup**: Includes a `deinit` method to safely stop motors and release PWM resources, which is also called automatically when the object goes out of scope.

## Technical Implementation

The driver leverages the MicroPython `machine.PWM` and `machine.Pin` modules to interface with the hardware. It maps throttle values from a range of `-1.0` to `1.0` to the standard 16-bit duty cycle range (0 to 65535) used by MicroPython's PWM implementation.

One of the critical aspects of motor control handled by this library is the decay mode. In `SLOW_DECAY` mode, the driver manipulates the PWM pins such that one pin is held high while the other toggles, which helps maintain motor current during the 'off' cycle. In `FAST_DECAY`, both pins are toggled or set to low, allowing current to dissipate more quickly.

## Getting Started

To use the driver, you need to define four PWM pins (two for each motor channel) and set their frequency. A frequency of 40,000 Hz is recommended as a starting point for most small DC motors.

```python
from machine import Pin, PWM
from drv8833 import DRV8833

# Configure pins for Motor A and Motor B
ain1 = PWM(Pin(15, Pin.OUT))
ain2 = PWM(Pin(14, Pin.OUT))
bin1 = PWM(Pin(13, Pin.OUT))
bin2 = PWM(Pin(12, Pin.OUT))

# Set PWM frequency
frequency = 40_000
for p in [ain1, ain2, bin1, bin2]:
    p.freq(frequency)

# Initialize the driver
drv = DRV8833(ain1, ain2, bin1, bin2)

# Set throttle (range -1.0 to 1.0)
drv.throttle_a(0.5)  # Motor A at 50% speed forward
drv.throttle_b(-1.0) # Motor B at 100% speed backward

# Stop motors
drv.stop_a()
drv.stop_b()
```

## Hardware Compatibility

This library is platform-agnostic within the MicroPython ecosystem, provided the port supports the `machine.PWM` API. It has been successfully tested on the Raspberry Pi Pico (RP2040). When wiring the DRV8833, ensure that the input pins (AIN1, AIN2, BIN1, BIN2) are connected to PWM-capable GPIOs on your microcontroller.
