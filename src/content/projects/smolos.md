---
title: smolOS
summary: A lightweight, POSIX-like operating system environment written in MicroPython
  for microcontrollers. It provides a command-line interface for file management,
  system monitoring, and running user scripts on hardware like the Seeed Studio XIAO
  RP2040 and ESP8266.
slug: smolos
codeUrl: https://github.com/w84death/smolOS
siteUrl: https://smol.p1x.in/os/
star: 188
version: v0.9
lastUpdated: '2024-12-29'
rtos: ''
libraries:
- micropython
topics:
- esp8266
- micropython
- micropython-esp8266
- neopixels
- operating-system
- os
- research-project
- rp2040
- seeeduino-xiao
- xiao
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- picoshell
- minios-esp
- pydos
- breadboardos
- micropython-port-for-rt-thread
- pycopy-standard-library-pycopy-lib
---

## Overview

smolOS is a specialized, microcontroller-oriented lightweight operating system designed to provide a familiar, POSIX-like environment on tiny hardware. Written entirely in MicroPython, the project is remarkably compact—occupying less than 20KB of space and consisting of fewer than 500 lines of code. It effectively transforms a standard microcontroller into a functional mini-PC with a command-line interface, making it an ideal tool for research, learning, and quick iteration on embedded projects.

Originally developed and tested on the Seeed Studio XIAO RP2040, smolOS is designed to be portable across any board supported by MicroPython, including the ESP8266. It offers a simple yet capable shell that allows users to interact with the hardware and file system without needing to constantly reflash firmware.

## Key Features and Capabilities

smolOS brings a suite of tools that mimic the experience of using a classic MS-DOS or Unix-like environment. Its core functionality revolves around a custom REPL (Read-Eval-Print Loop) that handles user commands and script execution.

**Core features include:**
- **File Management:** Standard commands like `list` (ls), `print` (cat), `remove` (rm), and `move` (mv) allow for direct manipulation of files on the board's flash storage.
- **smolEDitor:** A built-in, minimum viable text editor that supports line-based editing, allowing users to fix bugs or write small programs directly on the device.
- **System Monitoring:** Tools to check free memory (`free`), disk space, and CPU frequency, including a "turbo" mode to toggle between power-saving and high-performance clock speeds.
- **Hardware Interaction:** Built-in commands to control on-board LEDs and support for external peripherals like NeoPixels and buzzers.
- **Extensibility:** Users can run any `.py` file as a command simply by typing its name, enabling easy integration of custom tools and demos.

## Technical Architecture

The system is built on top of the MicroPython abstraction layer, utilizing standard modules such as `machine` for hardware control, `uos` for file system operations, and `gc` for memory management. The architecture is centered around the `smolOS` class, which manages the command registry and the execution loop.

One of the unique aspects of smolOS is its approach to "programs." Rather than complex binary execution, it treats Python scripts in the file system as executable commands. This allows for a modular ecosystem where users can add functionality (like the included Game of Life or ByteBeat synthesizer) simply by copying a file to the device.

## Getting Started

Setting up smolOS is straightforward for anyone familiar with MicroPython. The primary installation involves copying `smolos.py` to the board's flash memory. For an automated experience, users can also include a `main.py` script that initializes the OS class and calls the `boot()` method upon power-up.

```python
from smolos import smolOS
os = smolOS()
os.boot()
```

Once booted, the system presents a prompt (`smol $: `) where users can type `help` to see a manual of available commands. The environment is designed to be resilient, using protected file lists to prevent accidental deletion of core system files.

## Included Demos and Tools

The repository comes pre-loaded with several interesting applications that showcase the system's capabilities:
- **ansi:** A tool for displaying ANSI escape codes.
- **life & neolife:** Implementations of Conway's Game of Life for both text output and NeoPixel grids.
- **buzz & bytebeat:** Audio tools for generating 1-bit music and algorithmic sounds using a buzzer.
- **plasma & scroller:** Visual demos designed for 5x5 NeoPixel matrices.

smolOS serves as a bridge between high-level scripting and low-level hardware control, providing a sandbox for developers to explore the limits of what can be achieved with MicroPython on constrained devices.
