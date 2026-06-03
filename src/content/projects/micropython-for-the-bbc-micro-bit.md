---
title: MicroPython for the BBC micro:bit
summary: A specialized port of the MicroPython programming language for the BBC micro:bit.
  It provides a Python 3 compatible runtime on the Nordic nRF51822 microcontroller,
  including hardware-specific modules for the LED matrix, buttons, and sensors.
slug: micropython-for-the-bbc-micro-bit
codeUrl: https://github.com/bbcmicrobit/micropython
siteUrl: https://microbit-micropython.readthedocs.io/en/latest/
star: 637
version: v1.1.1
lastUpdated: '2024-09-16'
rtos: mbed-os
libraries:
- micropython
topics:
- microbit
- micropython
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- micropython-for-pandora-iot-board
- micropython-port-for-rt-thread
- micropython-for-w601-iot-board
- mpython-board
- the-micropython-board-pyboard
- micropython-lib
---

MicroPython for the BBC micro:bit is an implementation of the Python 3 programming language optimized to run on the constrained hardware of the original micro:bit. By bringing a high-level, interpreted language to this educational platform, the project enables students and developers to interact with hardware using a Read-Eval-Print Loop (REPL) and simple scripts, abstracting away the complexities of C/C++ development.

## Hardware Integration

The project provides a dedicated `microbit` module that serves as the primary interface for the device's hardware features. Through this module, users can easily control the 5x5 LED matrix, read the state of the physical buttons (A and B), and access the various pins on the edge connector. The implementation is designed to be responsive, offering features like tab completion in the REPL to help users discover available methods and attributes on the fly.

## Technical Architecture

This port is built using the yotta build system and targets the ARM Cortex-M0 based Nordic nRF51822 SoC. It leverages the mbed-classic framework (specifically the `bbc-microbit-classic-gcc-nosd` target) to handle low-level hardware abstraction. The build process involves a custom Makefile that performs extra preprocessing, such as adding version information to the User Information Configuration Registers (UICR) region of the flash memory.

The firmware includes several specialized components:
- **The MicroPython Core**: The standard virtual machine and runtime.
- **Hardware API**: Custom C implementations for micro:bit specific peripherals.
- **Filesystem**: A simple flat filesystem to store Python scripts on the internal flash.
- **REPL**: A serial-based interactive shell accessible via the USB CDC port at 115200 baud.

## Development Workflow

Developing for the micro:bit with MicroPython is highly flexible. Beyond the interactive REPL, the repository includes the `pyboard.py` tool, which allows developers to execute local Python scripts directly on the device from a host PC. This facilitates rapid prototyping and testing without the need for a full flash cycle for every change.

For those looking to build the firmware from source, the project requires an ARM compiler toolchain (arm-none-eabi-gcc) and the yotta build tool. The build system generates a `firmware.hex` file that can be flashed onto the micro:bit by simply copying it to the device's USB mass storage interface.

## Interactive Usage

One of the most powerful features of this project is the ability to experiment with hardware in real-time. Once connected via serial, users can immediately begin issuing commands:

```python
import microbit
# Scroll text across the LED matrix
microbit.display.scroll('hello!')
# Check if a button is currently pressed
if microbit.button_a.is_pressed():
    print("Button A is down!")
```

This immediacy makes it an ideal tool for both educational environments and rapid embedded development, allowing for instant feedback and iterative learning.
