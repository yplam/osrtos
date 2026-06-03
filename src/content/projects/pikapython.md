---
title: PikaPython
summary: PikaPython is an ultra-lightweight Python interpreter optimized for microcontrollers
  with minimal resources, requiring only 4KB of RAM and 64KB of Flash. It provides
  a zero-dependency C engine with a powerful pre-compiler for seamless C-module integration,
  supporting a wide range of hardware including STM32, ESP32, and RISC-V platforms.
slug: pikapython
codeUrl: https://github.com/pikasTech/PikaPython
siteUrl: https://pikadoc-en.readthedocs.io/en/latest/index.html
star: 1702
version: v1.13.4
lastUpdated: '2025-10-24'
rtos: rt-thread
libraries:
- lvgl
- flashdb
- littlefs
- lwip
topics:
- embedded
- esp32
- esp8266
- iot
- language
- lua
- luatos
- mcu
- microcontroller
- micropython
- python
- rtthread
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- pycopy
- pycopy-standard-library-pycopy-lib
- micropython-esp32-ulp
- semito-v-micropython-compatibility-layer-mcl
- picoweb
- micropython-for-pandora-iot-board
---

## Overview

PikaPython (also known as PikaScript) is a cross-platform, ultra-lightweight Python engine specifically designed for embedded systems. While MicroPython and CircuitPython have brought the ease of Python to microcontrollers, they often require significant resources (typically 256KB+ Flash and 16KB+ RAM). PikaPython breaks this barrier, enabling a subset of Python 3 syntax to run on devices with as little as 4KB of RAM and 64KB of Flash, such as the STM32G030 or STM32F103C8T6.

The project is built with a focus on zero dependencies and zero configuration, making it exceptionally easy to integrate into existing C-based embedded projects. It provides a bridge between the high-level productivity of Python and the low-level efficiency of C code.

## Key Features and Capabilities

### Resource Efficiency
PikaPython is one of the most resource-efficient interpreters available. By requiring only 4KB of RAM, it can run on entry-level microcontrollers that were previously restricted to pure C or assembly. This efficiency does not come at the cost of usability, as it still supports core Python features like classes, inheritance, and modules.

### The Pika Pre-compiler
One of the most innovative aspects of PikaPython is its Rust-based pre-compiler. Instead of manually writing complex binding code or handling global tables, developers define their Python API in `.pyi` files. The pre-compiler then automatically generates the necessary C bindings. This allows developers to call C functions from Python with almost no boilerplate code.

### Extensive Hardware Support
PikaPython supports a vast array of microcontrollers and boards, including:
- **STM32 Series**: G0, F0, F1, F4, and H7.
- **Espressif**: ESP32 and ESP32-C3.
- **RISC-V**: CH32V103, BL-602, and BL-618.
- **Others**: Raspberry Pi Pico, W806, and various Loongson platforms.

### Integration with Embedded Ecosystems
The engine is not just a standalone interpreter; it integrates deeply with popular embedded libraries and operating systems. It features official bindings for **LVGL** (Light and Versatile Graphics Library) and **Arm-2D**, enabling sophisticated GUI development using Python scripts. It also supports **RT-Thread**, providing a robust RTOS environment for multi-threaded Python applications.

## Technical Implementation

The core engine is written in clean, readable C that avoids complex macros and global arguments. It supports a significant subset of Python 3 syntax, including control flow (if, while, for), exception handling (try/except), and standard data structures like lists and dictionaries. For developers needing more power, the project includes a package manager to pull in modules for networking (Socket, MQTT), storage (FatFS, LittleFS), and data processing (cJSON, Hashlib).

## Getting Started Example

Developing with PikaPython often involves writing simple scripts to control hardware peripherals. Below is an example of a simple GPIO toggle script:

```python
import PikaStdLib
import STM32G0

io1 = STM32G0.GPIO()
time = STM32G0.Time()

io1.setPin('PA8')
io1.setMode('out')
io1.enable()

while True:
    io1.low()
    time.sleep_ms(500)
    io1.high()
    time.sleep_ms(500)
```

## Community and Development

PikaPython is an active open-source project with a growing ecosystem. It offers a dedicated project generator and a serial terminal tool (PikaPython Studio) to simplify the development workflow. For those without hardware, the project provides simulation projects for Keil and Linux, allowing developers to test their Python logic in a virtual environment. The project is well-documented with a comprehensive ReadTheDocs site and video tutorials, making it accessible for both professional engineers and hobbyists.
