---
title: MicroPython Rotary Encoder Driver
summary: A robust, interrupt-driven MicroPython driver for reading rotary encoders
  on various development boards including ESP32, ESP8266, Pyboard, and Raspberry Pi
  Pico. It utilizes a state machine approach for effective debouncing and accurate
  tracking of encoder transitions.
slug: micropython-rotary-encoder-driver
codeUrl: https://github.com/miketeachman/micropython-rotary
star: 329
lastUpdated: '2023-07-22'
rtos: ''
libraries:
- micropython
topics:
- driver
- encoder
- esp32
- esp8266
- micropython
- micropython-driver
- pyboard
- raspberry-pi-pico
- rotary-encoder
- rotary-encoders
- teensy40
- teensy41
- tinypico
- uasyncio
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- micropython-encoder-menu
- micropython-stm-lib
- drv8833-micropython-driver
- micropython-samples-and-drivers
- st7789-driver-for-micropython
- micropython-st7735-tft-lcd-driver
---

## Overview

Reading rotary encoders accurately can be a challenge in embedded systems due to contact bounce and the high frequency of state changes. The MicroPython Rotary Encoder Driver provides a robust solution for developers using MicroPython on popular development boards. This implementation is designed to be highly reliable, utilizing hardware interrupts and a sophisticated state machine to ensure every "click" is captured without the noise associated with mechanical switches.

## Key Features and Implementation

The driver is an adaptation of Ben Buxton's well-regarded C++ implementation for Arduino. It moves away from simple edge detection and instead employs a Gray code-based transition state table. This approach is inherently more stable than basic polling or simple interrupt triggers because it validates the sequence of transitions between the CLK and DT pins.

**Core Technical Highlights:**
- **Interrupt-Based:** Uses hardware interrupts on GPIO pins to trigger an Interrupt Service Routine (ISR), ensuring the main code execution is only interrupted when a physical change occurs.
- **State Machine Logic:** A transition table processes the Gray code signals, providing effective software debouncing without the need for complex timing delays.
- **Platform Independence:** While the core logic resides in a platform-independent file, the driver includes specific wrappers for different hardware architectures to handle their unique interrupt and pin management systems.

## Hardware Support

The project provides specific support for a wide range of MicroPython-compatible hardware:
- **Espressif Systems:** ESP32 and ESP8266 (including variants like Lolin D32 and Adafruit Feather Huzzah).
- **Raspberry Pi:** Pico and Pico W (RP2040).
- **Pyboard:** Pyboard D and Pyboard v1.1.

It is compatible with standard rotary encoders like the KY-040 and Fermion EC11 modules. For ESP8266 users, the documentation provides specific guidance on which GPIO pins are safe to use, avoiding strapping pins that might interfere with the boot sequence.

## Flexible Configuration

The `RotaryIRQ` class offers extensive configuration options to suit different application needs. Beyond simple counting, it supports:
- **Range Modes:** Choose between `RANGE_UNBOUNDED` (infinite counting), `RANGE_WRAP` (loops back to minimum after reaching maximum), and `RANGE_BOUNDED` (stops at limits).
- **Half-Step Mode:** Support for encoders that generate a step on every transition rather than every full cycle.
- **Internal Pull-ups:** Optional activation of internal resistors for hardware that lacks external pull-ups.
- **Event Listeners:** A callback system that allows functions to be triggered automatically whenever the encoder value changes, facilitating reactive UI design.

## Getting Started

Installation is simplified through MicroPython's `mip` package manager. Once installed, setting up an encoder requires only a few lines of code:

```python
from rotary_irq_esp import RotaryIRQ

# Initialize for ESP32/ESP8266
r = RotaryIRQ(pin_num_clk=12, 
              pin_num_dt=13, 
              min_val=0, 
              max_val=100, 
              reverse=False, 
              range_mode=RotaryIRQ.RANGE_WRAP)
              
# Read the current value
current_val = r.value()
```

By combining a proven state-machine algorithm with the ease of MicroPython, this driver provides a professional-grade input solution for embedded projects ranging from volume knobs to menu navigation systems.
