---
title: Infrared Remote Control Repeater
summary: An embedded project that implements an IR signal repeater using an STM32F030
  microcontroller and Mbed OS. It captures signals from an IR receiver module and
  reconstructs the 38 kHz carrier frequency to drive an IR LED, effectively extending
  the range of standard remote controls.
slug: infrared-remote-control-repeater
codeUrl: https://github.com/tsaarni/ir-remote-control-repeater
star: 1
lastUpdated: '2018-10-14'
rtos: mbed-os
topics:
- infrared-control
- mbed-os
- microcontroller
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- mongoose-os-ir-protocol-library
- arduino-ir-for-mongoose-os
- esp32fmradio
- omote-open-universal-remote
- spektrum-receiver-library-for-mbed
- pico-cec
---

## Overview

The Infrared Remote Control Repeater is a specialized embedded project designed to extend the reach of standard IR remote controls. While many IR repeaters simply pass through electrical signals, this implementation focuses on the reconstruction of the infrared signal to ensure high fidelity and reliability when communicating with the target device.

## How It Works

Typical infrared receiver modules, such as the TL1838, perform demodulation internally. When they receive a signal sent over a 38 kHz carrier frequency, they output a clean digital envelope of the data. To repeat this signal effectively, the microcontroller must capture this envelope and reconstruct the original signal by re-applying the 38 kHz carrier frequency before driving the output IR LED.

This project uses an STM32F030 microcontroller to handle this timing-sensitive task. By receiving the demodulated data from the IR receiver and toggling the output LED at the correct carrier frequency, the repeater acts as a transparent bridge between the remote and the appliance.

## Hardware Implementation

The project is built around the cost-effective STM32F030F4P6 development board. The hardware requirements are minimal, making it an accessible project for hobbyists:

- **Microcontroller**: STM32F030F4P6 (ARM Cortex-M0)
- **IR Receiver**: TL1838 or compatible module connected to pin PA_4
- **Output**: IR LED driven by pin PB_1 through a 100 Ohm current-limiting resistor
- **Power**: 3.3V supply

Because the IR LED is intended to be placed in close proximity to the device being controlled, it does not require high-power driving circuitry, allowing it to be powered directly from the microcontroller pin with a simple resistor.

## Software and Build Environment

The firmware is developed using **Mbed OS**, a popular RTOS and framework for ARM Cortex-M microcontrollers. The project utilizes **PlatformIO** as the build environment, which simplifies dependency management and the compilation process.

One interesting technical aspect of this project is the use of a custom linker script (`stm32f030f4_ld_script.ld`). This is necessary because the STM32F030F4 is a resource-constrained device with only 16 KB of Flash and 4 KB of RAM. The custom script ensures that the Mbed OS application fits within these tight memory limits by defining specific memory regions and entry points.

## Technical Details

The implementation avoids complex IR protocol decoding (like NEC or Sony protocols). Instead, it treats the incoming signal as a raw stream of pulses. This "dumb" repeater approach is actually a significant advantage, as it makes the device compatible with almost any IR remote control regardless of the specific protocol used, provided the carrier frequency is approximately 38 kHz.

For developers looking to explore IR signal processing or Mbed OS on low-cost STM32 hardware, this project provides a clear example of handling real-time signal reconstruction in a small memory footprint.
