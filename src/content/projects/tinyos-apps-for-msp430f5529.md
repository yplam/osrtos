---
title: TinyOS Apps for MSP430F5529
summary: A collection of TinyOS applications designed to test and demonstrate various
  peripherals on the MSP430F5529 microcontroller. The project specifically targets
  the EXP430F5529 development board and includes examples for ADC, I2C, PWM, and radio
  communication.
slug: tinyos-apps-for-msp430f5529
codeUrl: https://github.com/pillforge/tinyos-apps
star: 1
version: DrugDelivery
lastUpdated: '2016-03-08'
rtos: tinyos
topics:
- tinyos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- atmega128rfa1-tinyos-kth-wsn-project
- tinyos-nesc-telosb-programs
- zephyr-lorawan-lora-examples
- unipg-mbed-os-samples
- super-mini-esp32-c3-arduino-and-platformio-sketches
- esp32-experiments
---

## Overview

TinyOS Apps is a repository of example applications and test suites built for the TinyOS operating system, specifically targeting the Texas Instruments MSP430F5529 microcontroller. These applications are designed to run on the EXP430F5529 development board, providing a comprehensive set of tools for verifying hardware functionality and peripheral integration within the TinyOS environment.

TinyOS is a component-based, event-driven operating system designed for low-power wireless devices, such as those used in sensor networks. This repository serves as a practical reference for developers looking to implement hardware abstraction layers (HAL) or application-level logic on the MSP430 platform.

## Hardware Support and Peripherals

The project focuses on the MSP430F5529, a popular 16-bit microcontroller known for its low power consumption and integrated USB support. The applications in this repository cover a wide range of internal and external peripherals, including:

- **Analog-to-Digital Conversion**: Examples like `AdcPot` and `AdcPotStream` demonstrate how to read analog values from potentiometers and stream data.
- **Communication Interfaces**: Dedicated tests for I2C (`I2CTest`) and GPIO (`GpioTest`) ensure reliable connectivity with external sensors and actuators.
- **Timing and PWM**: Projects such as `TimerTest`, `PwmTest`, and `PwmHAATest` showcase the MSP430's timing capabilities for signal generation and motor control.
- **Wireless Networking**: As TinyOS is synonymous with wireless sensor networks, the repository includes `RadioRXBlink` and `RadioTXBlink` to test radio transmission and reception.

## Specialized Applications

Beyond basic peripheral testing, the repository contains more complex demonstration projects that integrate multiple subsystems:

- **InclinometerDemo**: A project likely utilizing an accelerometer to determine orientation or tilt.
- **MotorTest**: Logic for controlling motors, likely utilizing PWM outputs.
- **DrugDelivery**: A specialized application folder suggesting a use-case specific implementation for medical or laboratory automation.
- **SenseAndSend**: A classic wireless sensor network pattern where data is sampled from a sensor and transmitted over the radio.

## Technical Implementation

These applications leverage the TinyOS component model, where functionality is encapsulated in modules and wired together using configurations. By targeting the EXP430F5529 development board, the code provides a standardized way to interact with the MSP430's registers and hardware features through the TinyOS Hardware Abstraction Architecture (HAA). This makes it an excellent resource for developers porting TinyOS to new MSP430-based hardware or those learning how to write NesC code for embedded systems.
