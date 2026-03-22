---
title: Oficina de CircuitPython
summary: A comprehensive educational repository for learning CircuitPython on microcontrollers
  like the Raspberry Pi Pico and ESP32. It covers fundamental electronics, Python
  programming basics, and advanced topics including NeoPixel control, serial buses,
  and display integration using DisplayIO.
slug: oficina-de-circuitpython
codeUrl: https://github.com/djairjr/oficina_CircuitPython
siteUrl: http://circuitpython.org
star: 11
lastUpdated: '2025-09-23'
rtos: ''
libraries:
- micropython
topics:
- arduino
- circuitpython
- circuitpython-community
- circuitpython-project
- electronics
- games
- maker
- neopixels
- python
- rp2040
- rp2350
- seeedstudio
isShow: false
createdAt: '2026-03-22'
updatedAt: '2026-03-22'
---

## Introduction to the CircuitPython Workshop

The Oficina de CircuitPython, created by Djair Guilherme, is a structured educational resource designed to introduce beginners and experienced developers alike to the world of embedded systems using CircuitPython. CircuitPython, developed by Adafruit Industries, is an optimized version of Python specifically tailored for microcontrollers. It simplifies the development process by removing the need for complex toolchains and compilation, allowing users to interact with hardware through a simple USB interface.

This repository serves as a complete curriculum, guiding students through the transition from basic programming concepts to advanced hardware manipulation. It is particularly well-suited for platforms like the Raspberry Pi Pico (RP2040) and the ESP32 series.

## Why CircuitPython?

CircuitPython is built on the philosophy of accessibility. Unlike traditional embedded development which often requires C/C++ and specialized IDEs, CircuitPython allows developers to write code in a high-level language and see results instantly. When a board running CircuitPython is connected to a computer, it appears as a USB drive (CIRCUITPY). Saving a file named `code.py` to this drive triggers an immediate restart and execution of the script. This rapid prototyping cycle is ideal for education and rapid hardware iteration.

## Curriculum Structure

The workshop is organized into ten distinct lessons, each focusing on a specific aspect of embedded development:

- **Foundations**: Introduction to the environment and basic Python syntax.
- **Hardware I/O**: Exploring digital and analog signals, as well as Pulse Width Modulation (PWM) for controlling components like LEDs and motors.
- **Visual Feedback**: Extensive modules on NeoPixel LEDs, including grid layouts and even a Tetris-inspired implementation.
- **Advanced Programming**: Introduction to Object-Oriented Programming (OOP) through game development examples like Space Invaders.
- **Communication Protocols**: Deep dives into serial buses, specifically I2C and SPI, which are essential for connecting sensors and peripherals.
- **Graphics and UI**: Utilizing the `displayio` module to create visual interfaces on various display modules.

## Technical Environment and Tools

The project recommends the use of the Thonny IDE, a beginner-friendly environment that supports the CircuitPython REPL (Read-Eval-Print Loop). The REPL is a powerful feature that allows developers to execute Python commands on the microcontroller in real-time, providing immediate feedback and a platform for hardware debugging. 

Key modules explored in the workshop include:
- `board`: For accessing hardware-specific pins.
- `time`: For managing delays and timing.
- `digitalio` and `analogio`: For basic pin manipulation.
- `displayio`: For advanced graphical rendering.

## Getting Started

To begin with the workshop, users need a compatible microcontroller and the appropriate CircuitPython firmware. The repository provides clear instructions on flashing the firmware—typically by dragging a `.uf2` file onto the board in bootloader mode. Once the `CIRCUITPY` drive appears, users can follow the lessons sequentially, utilizing the provided code examples and the extensive documentation links to Adafruit's learning system and community resources like TodBot's CircuitPython tricks.
