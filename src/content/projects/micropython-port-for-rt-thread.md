---
title: MicroPython port for RT-Thread
summary: A specialized port of MicroPython to the RT-Thread operating system, primarily
  targeting STM32F4 microcontrollers. It provides a seamless integration between the
  RT-Thread shell and the MicroPython REPL, allowing developers to control hardware
  and inspect RTOS internals using Python scripts.
slug: micropython-port-for-rt-thread
codeUrl: https://github.com/armink/MpyOnRtt
star: 10
lastUpdated: '2017-11-20'
rtos: rt-thread
libraries:
- micropython
- easyflash
- easylogger
topics:
- micropython
- python
- rt-thread
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- micropython-for-pandora-iot-board
- micropython-for-w601-iot-board
- semito-v-micropython-compatibility-layer-mcl
- micro-ros-for-rt-thread
- micropython-for-sparrow-one-board
- lua2rtt
---

## Overview

MpyOnRtt is a project that brings the flexibility of MicroPython to the RT-Thread real-time operating system. By porting MicroPython v1.9.3 to RT-Thread 3.0.0, this project allows developers to leverage Python's ease of use for rapid prototyping and hardware control while maintaining the robust multitasking capabilities of a professional RTOS. The project is specifically configured for STM32F4 series microcontrollers, providing a bridge between high-level scripting and low-level embedded systems.

## Key Features and Integration

The core of this project is the integration of the MicroPython REPL (Read-Evaluate-Print-Loop) directly into the RT-Thread shell (msh). Users can switch from the standard RTOS command line to a Python environment simply by typing the `python` command. This enables interactive debugging and hardware manipulation without the need for constant recompilation.

### RTOS-Specific Modules

One of the most powerful aspects of this port is the `rtthread` module. This module exposes internal RTOS information to the Python environment, allowing developers to:
- Determine if code is running in a preemptible thread.
- Retrieve the current thread ID.
- Perform stack analysis across all running threads to monitor memory usage and thread status.

### Hardware Control with pyb

The project includes the `pyb` module, which is standard in many MicroPython ports for hardware abstraction. It provides functions for:
- **Board Information**: Detailed memory usage and thread status reports.
- **Interrupt Management**: Enabling and disabling IRQs.
- **Timing**: High-resolution millisecond and microsecond counters and delays.
- **GPIO**: Direct control over pins, including input/output configuration and pull-up/pull-down resistor settings.

## Technical Implementation

The project is built using the GNU Arm Embedded Toolchain and is designed to be managed within the Eclipse IDE. It utilizes the SCons build system, which is standard for RT-Thread projects. The configuration is handled through `rtconfig.py` and `KConfig` files, allowing for fine-grained control over the kernel and library features.

In addition to MicroPython, the project integrates several popular RT-Thread components:
- **EasyFlash**: For environment variable storage in Flash memory.
- **EasyLogger**: A high-performance log output library.

## Getting Started

To use MpyOnRtt, developers typically clone the repository and import it into an Eclipse environment configured with the GNU MCU Eclipse plugins. After building and downloading the firmware to an STM32F4 board via J-Link, the system boots into the RT-Thread shell. Entering the Python environment is straightforward:

```python
msh />python

MicroPython v1.9.3-6-g1742ab26-dirty on 2017-11-04; RT-Thread Board with stm32f4
>>> 
>>> print('Hello World')
Hello World
```

From here, you can interact with the hardware directly. For example, to toggle a GPIO pin:

```python
from pyb import Pin

p_out = Pin(("X1", 33), Pin.OUT_PP)
p_out.value(1)              # set io high
p_out.value(0)              # set io low
```

This interactive workflow significantly speeds up the development of drivers and application logic by allowing real-time testing of hardware registers and logic.
