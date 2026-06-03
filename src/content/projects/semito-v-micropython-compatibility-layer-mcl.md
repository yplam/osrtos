---
title: SemiTO-V MicroPython Compatibility Layer (MCL)
summary: A Python library that allows developers to include and control MicroPython
  code targeting microcontrollers directly from a CPython environment. It provides
  a seamless interface for managing MCU peripherals and variables over serial connections,
  specifically optimized for RISC-V hardware like the RP2350.
slug: semito-v-micropython-compatibility-layer-mcl
codeUrl: https://github.com/semitov/SemiTOV-MCL
star: 20
lastUpdated: '2026-01-03'
rtos: ''
libraries:
- micropython
topics:
- cpython
- embedded
- esp32
- iot
- mcu
- microython
- python
isShow: false
createdAt: '2026-01-27'
updatedAt: '2026-01-27'
relatedProjects:
- micropython-port-for-rt-thread
- blynk-python-library
- sparkfun-micropython-opencv
- micropython-for-pandora-iot-board
- pycopy-standard-library-pycopy-lib
- pikapython
---

## Overview

The SemiTO-V MicroPython Compatibility Layer (MCL) is a specialized library designed to bridge the gap between standard CPython running on a host computer and MicroPython running on a microcontroller. Originally developed for the RISC-V based RP2350 GPIO Expansion Card for Framework Laptops, MCL provides a high-level API to interact with embedded hardware as if it were local Python code.

By using MCL, developers can write desktop applications in CPython that directly manipulate hardware peripherals on an attached MCU. This eliminates the need for complex custom serial protocols, as MCL handles the communication and execution of MicroPython commands behind the scenes.

## Key Features

- **Seamless Integration**: Import MicroPython modules and classes directly into your CPython script.
- **Variable Mapping**: Set and get variables on the MCU that behave like local Python objects.
- **Broad Hardware Support**: While optimized for RISC-V (RP2350), it works with any MCU that supports MicroPython and a serial connection (ARM, X86, etc.).
- **Modern Tooling**: Built with support for the `uv` package manager and Python 3.13+.

## Technical Implementation

MCL operates by establishing a serial connection to the target microcontroller. It leverages the MicroPython REPL (Read-Eval-Print Loop) to send commands and receive data. The library abstracts this communication through the `Board` class, which manages the lifecycle of the connection and the state of the remote environment.

The library relies on `pyserial` for low-level communication and is designed to be cross-platform, supporting Linux, Windows, and macOS. On Linux systems, it specifically addresses common permission issues with serial ports (like `/dev/ttyACM0`) by guiding users through group management.

## Getting Started

To use MCL, you initialize a `Board` object with the appropriate serial port and baud rate. From there, you can import standard MicroPython modules like `machine` to control hardware.

```python
from mcl import Board

# Initialize the connection to the MCU
board = Board("/dev/ttyACM0", baudrate=115200)

# Import MicroPython modules on the remote board
board.add_import("machine")
board.add_import("Pin", from_module="machine")

# Define a variable on the MCU and interact with it
led = board.set_variable("led", "Pin(10, Pin.OUT)")
led.value(1) # Turns the LED on
```

## Development and Contribution

The project is open-source under the GPL-3.0 license. It uses a modern Python development workflow centered around `uv` for dependency management and `pytest` for testing. The architecture is designed to be extensible, allowing for more complex MicroPython interactions to be added as the library evolves. For developers looking to contribute, the project maintains a strict issue-first workflow to ensure code quality and feature alignment.
