---
title: RTduino Pinout Generator
summary: A specialized tool for the RTduino ecosystem that automates the generation
  of pinout mapping files for RT-Thread BSPs. It facilitates the adaptation of microcontroller
  hardware to the Arduino-compatible API provided by RTduino.
slug: rtduino-pinout-generator
codeUrl: https://github.com/RTduino/pinout-generator
siteUrl: https://docs.rtduino.com/#/zh/manual/adapt/bsp/pinout-generator/pinout-generator
star: 5
version: v2.0.3
lastUpdated: '2024-04-21'
rtos: rt-thread
topics:
- arduino
- pinout-generator
- rt-thread
- rtduino
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rtduino
- arduino-cmsis-module
- rt-thread-art-arduino-rt-thread
- buildpkg
- bl602-gpio-expander-for-apache-nuttx
- arduino-freertos-library
---

RTduino is a compatibility layer that allows the Arduino ecosystem to run on top of the RT-Thread RTOS. This bridge is powerful because it combines the ease of use of Arduino with the real-time capabilities and extensive middleware of RT-Thread. However, for this bridge to work, the system needs to know which physical pins on a specific microcontroller correspond to the standard Arduino pinout. This is where the **RTduino Pinout Generator** comes into play.

### The Role of Pin Mapping in Embedded Systems

In the world of microcontrollers, pins are often multiplexed, meaning a single physical pin can serve multiple functions such as a digital I/O, an analog input, a PWM output, or a serial communication line (UART/SPI/I2C). When adapting a Board Support Package (BSP) to support the Arduino API, developers must create a mapping table. This table tells the RTduino core which RT-Thread device name (e.g., `pwm1`) and which pin number (e.g., `GET_PIN(A, 1)`) should be triggered when a user calls `analogWrite(3)`.

### Automating the Configuration Process

Manually writing these mapping tables is error-prone and tedious, especially for high-pin-count microcontrollers like those in the STM32 or i.MX RT series. The Pinout Generator provides a structured approach to this problem. By using the scripts and tools provided in this repository, developers can:

- Define pin functions in a centralized configuration.
- Generate the `pins_arduino.c` and `pins_arduino.h` files automatically.
- Ensure consistency between the hardware datasheet and the software implementation.
- Speed up the process of supporting new boards within the RTduino ecosystem.

### Repository Structure

The project is organized to support various stages of the generation workflow:

- **scripts**: Contains the logic for parsing pin data and generating source code.
- **software**: Likely houses the core application or logic used to define the pinout.
- **tools**: Includes auxiliary utilities that assist in the conversion or validation of pin configurations.
- **project**: Contains templates or specific board configurations that serve as the input for the generator.

### Integration with RT-Thread and RTduino

The output of this generator is designed to be dropped directly into an RT-Thread BSP. Once the generated files are included, the board becomes "RTduino-ready," allowing users to install Arduino libraries via the RT-Thread package manager and run standard sketches. This tool is essential for maintainers who want to expand the list of supported hardware for RTduino, ensuring that the transition from a bare RT-Thread BSP to an Arduino-compatible environment is as seamless as possible.

### Getting Started

For developers looking to adapt a new board, the process typically involves identifying the pin multiplexing of their MCU and using the generator to create the mapping header. Detailed instructions and a step-by-step manual are available on the official RTduino documentation site, which provides a comprehensive guide to BSP adaptation and the use of this generator.
