---
title: micropython-esp32-ulp
summary: An assembler toolchain for the ESP32 Ultra Low-Power (ULP) Co-Processor,
  implemented in MicroPython. It allows developers to write, assemble, and load ULP-FSM
  machine code directly on ESP32 microcontrollers without needing external cross-compilers.
  Supports the full instruction sets for ESP32, ESP32-S2, and ESP32-S3 variants.
slug: micropython-esp32-ulp
codeUrl: https://github.com/micropython/micropython-esp32-ulp
star: 136
version: 1.2.0
lastUpdated: '2025-11-04'
rtos: ''
libraries:
- micropython
topics:
- assembler
- esp32
- micropython
- ulp
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- pikapython
- micropython-and-lvgl-firmware-for-esp32
- semito-v-micropython-compatibility-layer-mcl
- esp32-p4-jit-dynamic-code-loading-system
- pycopy
- jupyter-micropython-kernel
---

## Overview

The ESP32 series of microcontrollers features a unique component known as the Ultra Low-Power (ULP) co-processor. This tiny processor is designed to remain active while the main dual-core CPU is in deep sleep, allowing the system to monitor GPIOs, perform ADC measurements, or wake the main system based on specific triggers while consuming minimal power. Traditionally, developing for the ULP required a complex cross-compiler toolchain (like `binutils-esp32ulp`) installed on a development machine.

**micropython-esp32-ulp** changes this workflow by providing a complete assembler toolchain written entirely in MicroPython. This enables developers to translate assembly language programs into executable ULP-FSM machine code directly on the ESP32 hardware itself, removing the dependency on external build environments.

## Key Features and Capabilities

This toolchain is designed to be a lightweight yet powerful alternative to the standard Espressif toolchain. It supports the Finite State Machine (FSM) version of the ULP found in the original ESP32, as well as the ESP32-S2 and ESP32-S3. 

**Core features include:**
- **Full Instruction Set Support**: Implements the entire ULP instruction set for the ESP32 and ESP32-S2/S3 families.
- **Assembly Language Features**: Supports standard assembly directives such as `.set` for constants and `#define` for macros.
- **Expression Evaluation**: Allows the use of mathematical expressions within assembly code and constant definitions.
- **RTC Convenience Macros**: Includes built-in macros like `WRITE_RTC_REG` to simplify interaction with Real-Time Clock peripherals.
- **On-Device Disassembler**: Includes a simple disassembler to inspect binary code directly on the microcontroller.

## Technical Implementation

The project is structured to handle the nuances of different ESP32 variants. While the ESP32-S2 and ESP32-S3 share the same ULP binary format, it differs significantly from the original ESP32. The assembler manages these differences through a CPU selection mechanism. Furthermore, it handles peripheral register address translation, which is critical because register offsets can vary between chip generations even when the instruction set remains compatible.

Because the tool is written in MicroPython, it integrates seamlessly with the `esp32.ULP` class provided by the MicroPython firmware. This allows for a workflow where assembly code is defined as a string, assembled into a binary, and then loaded into the ULP memory space using standard MicroPython APIs.

## Getting Started

For modern MicroPython installations (v1.20 or newer), the toolchain can be installed directly from GitHub using the `mip` package manager:

```python
import mip
mip.install('github:micropython/micropython-esp32-ulp')
```

Once installed, a typical workflow involves writing assembly code, assembling it, and then using the main CPU to interact with the ULP's memory. This is particularly useful for tasks like reading a sensor at a fixed interval without waking the power-hungry main cores. The project includes examples, such as a counter that demonstrates how to exchange data between the ULP and the main MicroPython environment.

## Requirements and Compatibility

The toolchain requires MicroPython v1.12 or later. For users working with the ESP32-S2 or ESP32-S3, MicroPython v1.20+ is necessary, as earlier versions did not include the required `esp32.ULP` class for those specific chips. It is important to note that this tool targets the ULP-FSM; it is not intended for the RISC-V ULP co-processor found in some newer ESP32 variants.
