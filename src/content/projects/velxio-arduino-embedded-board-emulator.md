---
title: 'Velxio: Arduino & Embedded Board Emulator'
summary: Velxio is an open-source, multi-board emulator that allows users to write,
  compile, and simulate Arduino C++ or Python code directly in the browser. It supports
  five CPU architectures including AVR8, ARM Cortex-M0+, RISC-V, Xtensa, and ARM Cortex-A53,
  utilizing specialized engines like avr8js, rp2040js, and QEMU. The platform features
  an integrated code editor, a library manager, and over 48 interactive electronic
  components for complex circuit simulation.
slug: velxio-arduino-embedded-board-emulator
codeUrl: https://github.com/davidmonterocrespo24/velxio
siteUrl: https://velxio.dev
version: qemu-prebuilt
lastUpdated: '2026-04-18'
licenses:
- NOASSERTION
image: /202604/velxio_0.avif
rtos: ''
libraries:
- sqlite
topics:
- arduino
- esp32
- simulation
- wokwi
isShow: true
createdAt: '2026-04-20T08:19:15+00:00'
updatedAt: '2026-04-20T08:19:15+00:00'
---

Velxio is a fully local, open-source multi-board emulator designed to bring embedded systems development to the browser. It enables developers to write Arduino C++ or Python code, compile it using an integrated backend, and simulate the resulting firmware on real CPU emulations. With support for 19 different boards and 5 distinct CPU architectures, Velxio provides a comprehensive environment for testing electronic circuits and embedded software without physical hardware.

### Multi-Architecture Simulation Engines

The core of Velxio lies in its diverse set of simulation engines, each tailored to specific hardware architectures. For classic Arduino boards like the Uno, Nano, and Mega, the platform utilizes **avr8js** to provide real ATmega328p and ATmega2560 emulation at native clock speeds. This includes full GPIO support, hardware timers for PWM, and peripheral support for USART, ADC, SPI, and I2C.


For more modern platforms, Velxio integrates **rp2040js** to emulate the ARM Cortex-M0+ found in the Raspberry Pi Pico and Pico W. This engine handles all 30 GPIO pins, dual UARTs, and 12-bit ADC channels. A unique feature of the RP2040 simulation is its WFI (Wait For Interrupt) optimization, where the emulator skips ahead in simulation time during delays rather than busy-waiting, ensuring smooth performance in the browser.

High-performance boards like the ESP32 and ESP32-S3 are simulated using a specialized fork of **QEMU**. This allows for real Xtensa LX6/LX7 dual-core emulation, supporting complex features like WiFi via SLIRP NAT emulation and hardware RMT decoders for NeoPixel (WS2812) rendering. Meanwhile, RISC-V boards such as the ESP32-C3 and CH32V003 run on a custom **RiscVCore.ts** engine written in TypeScript, offering instant startup and offline capabilities.

### Integrated Development Environment

Velxio provides a robust workspace centered around the **Monaco Editor**, offering syntax highlighting, autocomplete, and multi-file project support. Users can manage multiple `.ino`, `.h`, `.cpp`, or `.py` files within a single workspace. The compilation process is handled by an `arduino-cli` backend, which provides a detailed console for debugging compiler warnings and errors.

![Multi-board simulation featuring Raspberry Pi 3 and Arduino connected via serial](/202604/velxio_4.avif)

One of the platform's most powerful capabilities is multi-board simulation. Developers can place different architectures, such as a Raspberry Pi 3 and an Arduino Uno, on the same canvas and connect them via serial communication. The Raspberry Pi 3 simulation runs a full BCM2837 emulation via QEMU, booting a real Raspberry Pi OS image and executing Python scripts that interact with virtual GPIO pins.

### Interactive Components and Wiring

The simulation canvas supports over 48 electronic components derived from the wokwi-elements library. These include interactive parts like potentiometers, ultrasonic sensors, and complex displays. For example, users can simulate an ILI9341 TFT display driven by an Arduino Uno via SPI, rendering real-time graphics using standard libraries like Adafruit_GFX.

![Arduino Uno driving an ILI9341 TFT display via SPI rendering graphics](/202604/velxio_1.avif)

Connectivity is managed through an orthogonal wire system that supports eight signal-type colors, such as Red for VCC, Black for GND, and Gold for I2C. This visual representation helps in understanding circuit flow and debugging pin assignments. The platform also includes a Library Manager that loads the full Arduino library index, allowing users to install and manage dependencies directly within the UI.

### Technical Architecture and Self-Hosting

Velxio is built with a modern web stack, featuring a React 19 and TypeScript frontend paired with a FastAPI and Python backend. Data persistence is handled via an SQLite database and local disk storage for project files. For those who prefer to host their own instance, Velxio is available as a single-container Docker image, which bundles the web server, compiler backend, and various QEMU engines.

![ESP32 simulation with an HC-SR04 ultrasonic distance sensor using QEMU](/202604/velxio_5.avif)

The project follows a dual-licensing model, remaining free and open-source under the AGPLv3 for personal and educational use, while offering commercial licenses for proprietary applications. This ensures the project remains accessible to the community while providing a path for sustainable development.
