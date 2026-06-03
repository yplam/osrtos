---
title: PyDOS
summary: A DOS-like shell for MicroPython and CircuitPython microcontroller boards
  including RP2040, ESP32, and STM32. It provides a command-line interface with standard
  DOS commands, batch file support, and a suite of external utilities like a BASIC
  interpreter and text editors.
slug: pydos
codeUrl: https://github.com/RetiredWizard/PyDOS
star: 169
version: v1.51
lastUpdated: '2026-01-01'
rtos: ''
libraries:
- micropython
topics:
- basic
- cardputer
- cheap-yellow-display
- circuitpython
- cortex-m7
- dos
- esp32
- esp32-2432s028
- esp32s2
- esp32s3
- micropython
- nrf52840
- pico
- python
- raspberry
- rp2040
- rp2350
- samd51
- stm32
- t-deck
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- smolos
- picoshell
- raspberry-pi-pico-freertos-shell
- minios-esp
- micropython-port-for-rt-thread
- esp32-bitlashtbp
---

## Overview

PyDOS is an ambitious project that brings the classic 1981 IBM PC command-line experience to modern microcontrollers. It functions as a DOS-like shell for boards running MicroPython or CircuitPython, providing a familiar environment for users who remember the early days of personal computing. Beyond just a prompt, PyDOS implements a significant subset of traditional DOS commands and supports batch file execution, environment variables, and a variety of external Python-based applications.

## Key Features

The project transforms a microcontroller's REPL into a functional operating environment. It supports a wide array of standard commands including `DIR`, `COPY`, `DEL`, `REN`, `TYPE`, `MKDIR`, and `CHDIR`. One of its most powerful features is the implementation of batch files (`.bat`), allowing for automated sequences of commands, conditional logic using `IF` statements, and labels for `GOTO` branching. 

**Core capabilities include:**
- **Command-Line Interface**: A robust shell supporting standard DOS syntax and switches.
- **Batch Processing**: Execution of `.bat` files, including an `autoexec.bat` that runs on startup.
- **Environment Variables**: Support for variables like `PATH`, `PROMPT`, and `DIRSEP` to customize the shell behavior.
- **External Program Suite**: Includes a BASIC interpreter (PyBasic), line and full-screen editors (edlin, edit), and a terminal-based file viewer.
- **Hardware Integration**: Built-in utilities for I2C scanning, SD card mounting, WiFi connectivity, and GPIO control (LEDs, Neopixels, and sound).

## Technical Implementation

PyDOS is designed to be platform-agnostic across the Python-on-hardware ecosystem. It runs seamlessly on both MicroPython and CircuitPython by abstracting filesystem and hardware differences. A key component is the `pydos_bcfg.py` configuration file, which maps hardware-specific pins for features like sound, I2C, and SPI based on the detected board ID.

For networking, the project utilizes the `PyDOS_wifi` library, which provides a unified WiFi API across different chipsets (ESP32, Pico W, etc.). To handle memory-intensive tasks, PyDOS includes a `runvm.py` utility that can temporarily exit the shell to run a program with maximum available RAM before automatically returning to the prompt.

## Hardware Support

The project supports an extensive list of popular microcontroller platforms:
- **Raspberry Pi**: RP2040 (Pico/Pico W) and RP2350.
- **Espressif**: ESP32, ESP32-S2, ESP32-S3, and ESP32-C3.
- **Other Architectures**: nRF52840, SAMD51, STM32L4+, and NXP ARM Cortex-M7.
- **Specialized Devices**: Lilygo T-Deck, M5Stack Cardputer, and various "Cheap Yellow Display" (CYD) modules.

## Getting Started

Installation is straightforward: users can copy `PyDOS.py` to their device and initiate the shell by typing `import PyDOS` at the REPL prompt. A `setup.bat` script is provided to help identify the specific board and install the appropriate libraries and drivers. For devices with limited flash space, the core shell can run as a standalone script, while larger systems can benefit from the full suite of external commands and the PyBasic interpreter. 

PyDOS also includes sophisticated filesystem management tools, such as the `fs` command, which allows users to toggle the flash between read-only and read-write modes, facilitating easier file transfers from a host computer while maintaining data integrity during microcontroller operations.
