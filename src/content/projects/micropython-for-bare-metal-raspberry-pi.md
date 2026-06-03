---
title: MicroPython for Bare Metal Raspberry Pi
summary: A bare-metal port of MicroPython for the Raspberry Pi Zero, Zero W, and Raspberry
  Pi 2. It enables running Python code directly on the hardware without an underlying
  operating system. The project includes drivers for USB host support and SD card
  access, allowing for a standalone Python environment on classic Raspberry Pi boards.
slug: micropython-for-bare-metal-raspberry-pi
codeUrl: https://github.com/boochow/micropython-raspberrypi
star: 238
version: v1.0.0
lastUpdated: '2020-02-08'
rtos: ''
libraries:
- micropython
topics:
- micropython
- raspberry-pi
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- micropython-for-flipper-zero
- micropython-for-w601-iot-board
- freertos-port-for-raspberry-pi
- micropython-port-for-rt-thread
- pycopy-standard-library-pycopy-lib
- pico-demos-for-rp2040
---

MicroPython is a lean and efficient implementation of the Python 3 programming language that is optimized to run on microcontrollers and in constrained environments. While most Raspberry Pi users are accustomed to running Python within a full Linux distribution like Raspberry Pi OS, the `micropython-raspberrypi` project takes a different approach: bare metal.

By running MicroPython directly on the hardware, this project eliminates the overhead of a traditional operating system. This results in faster boot times and more direct access to the underlying ARM architecture of the Raspberry Pi Zero, Zero W, and Raspberry Pi 2.

### Hardware and Architecture

The project specifically targets the Broadcom SoCs found in earlier Raspberry Pi models. It provides build configurations for:
- **RPI1**: Raspberry Pi Zero and Zero W (ARMv6)
- **RPI2**: Raspberry Pi 2 (ARMv7)

Because it runs bare metal, the project includes its own drivers for essential peripherals. It incorporates the CSUD (Chadderz's Simple USB Driver) for USB host support, allowing users to connect USB keyboards directly to the Pi. It also includes an SD card driver to mount the filesystem, enabling the MicroPython environment to load scripts directly from the microSD card.

### Technical Foundations

This port is built upon several significant community efforts in the bare-metal Raspberry Pi space. It leverages the initial bare-metal porting work by Stefan Naumann and draws inspiration from David Welch’s extensive collection of ARM bare-metal examples. For storage, it utilizes an SD card driver based on work by Zoltan Baldaszti. The USB stack is a modified version of the CSUD driver, updated specifically to support the Raspberry Pi Zero and Zero W models.

### Features and Integration

One of the standout features of this port is the optional USB host support. By enabling `MICROPY_HW_USBHOST` during the build process, developers can interact with the MicroPython REPL using a physical keyboard. Additionally, the project defaults to mounting the SD card at `/sd` during the boot sequence, providing a familiar filesystem structure for Python developers to store their scripts and data.

### Getting Started

Building the firmware requires cloning the repository along with its submodules, which include the core MicroPython source code and the modified CSUD library. Once compiled using the provided Makefile, the installation process involves placing the resulting `firmware.img` onto a microSD card alongside the standard Raspberry Pi firmware files (`bootcode.bin` and `start.elf`).

For developers looking to explore the specific Python modules and classes available in this port, the project maintains a wiki detailing the hardware-specific APIs and implementation details.
