---
title: MicroPython Samples and Drivers
summary: A comprehensive collection of drivers, tutorials, and code samples for MicroPython
  targeting platforms like Pyboard, ESP32, ESP8266, and RP2040. It features advanced
  implementations for asynchronous programming, hardware interfacing, and data serialization.
slug: micropython-samples-and-drivers
codeUrl: https://github.com/peterhinch/micropython-samples
star: 522
lastUpdated: '2025-09-14'
rtos: ''
libraries:
- micropython
topics:
- embedded
- esp32
- esp8266
- micropython
- stm32
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- micropython-examples-for-01studio-development-boards
- asynchronous-programming-in-micropython
- awesome-micropython
- sparkfun-python-examples
- esp32-repo
- micropython-lib
---

## Overview

MicroPython Samples is a curated repository of code ideas, device drivers, and technical essays designed to extend the capabilities of MicroPython on various embedded platforms. Maintained by Peter Hinch, the project serves as both an unofficial FAQ and a library of high-quality modules for professional and hobbyist developers. The repository covers a wide range of topics, from low-level hardware manipulation on the Raspberry Pi Pico (RP2040/RP2350) and Pyboard to high-level networking resilience on the ESP32 and ESP8266.

## Key Features & Capabilities

The repository is organized into several distinct sections, each addressing specific challenges in the MicroPython ecosystem:

- **Asynchronous Programming**: Extensive support for `asyncio`, including tutorials and drivers for switches, pushbuttons, and ADCs. It provides a framework for building non-blocking, event-driven applications.
- **Hardware Drivers**: A vast array of drivers for Inertial Measurement Units (IMUs) like the BNo055 and MPU9x50, memory devices (EEPROM, FRAM, Flash), and various displays (OLED, TFT, ePaper).
- **Data Serialization**: Detailed comparisons and implementations of serialization formats including JSON, Pickle, MessagePack, and Google Protocol Buffers (via `minipb`).
- **Advanced Mathematics**: Unique modules for handling Quaternions, allowing for 3D object manipulation and IMU data processing without complex Euler angle mathematics.
- **Networking Resilience**: Guides and code for writing reliable WiFi and MQTT applications that can recover from outages, specifically tailored for the ESP8266 and ESP32.

## Technical Implementation

The project emphasizes efficiency and RAM optimization, which is critical for MicroPython environments. Many samples utilize advanced features such as:

- **Inline Assembler**: Using Arm Thumb assembler for performance-critical tasks like fast array reversal or Fourier transforms.
- **Hardware-Specific Features**: Leveraging RP2040/RP2350 PIO (Programmable I/O), DMA, and dual-core capabilities for high-speed SPI and pulse train measurement.
- **Memory Management**: Techniques for saving RAM, such as using frozen bytecode, lazy loaders, and non-allocating bitmaps.

## Code Example: 3D Rotation with Quaternions

One of the standout features is the `Quaternion` class, which simplifies 3D rotations. Below is a snippet showing how to rotate a point in 3D space:

```python
from quat import Point, Rotator
from math import pi

# Define a point in 3D space
point = Point(0, 0, 1)

# Create a rotator: 45 degrees (pi/4) around the X axis
rot = Rotator(pi/4, 1, 0, 0)

# Perform the rotation in-place using the matmul operator
point @= rot
```

## Serialization with Protocol Buffers

For developers needing efficient binary data exchange, the project provides a tutorial on using `minipb`. This allows for structured data transmission with minimal overhead:

```python
import minipb

# Define a schema for an integer and a float
schema = (('value', 'z'), ('temp', 'f'))
w = minipb.Wire(schema)

# Encode data into a compact binary format
data = {'value': 150, 'temp': 23.5}
tx = w.encode(data)

# Decode back to a dictionary
rx = w.decode(tx)
```

## Target Platforms

While many samples are cross-platform, specific optimizations are provided for:
- **Pyboard (v1.1, Lite, and D-series)**: Utilizing the STM32 hardware features.
- **ESP32 & ESP8266**: Focusing on robust networking and pinout configurations.
- **Raspberry Pi Pico (RP2xxx)**: Highlighting PIO and DMA for advanced I/O tasks.

This repository is an essential resource for anyone looking to move beyond basic scripts and build robust, efficient, and complex systems using MicroPython.
