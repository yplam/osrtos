---
title: Tock Test Harness
summary: A Python-based test runner and harness for Tock OS designed to automate testing
  across a wide variety of embedded hardware platforms. It provides a configuration-driven
  environment for executing tests on Cortex-M and RISC-V boards using J-Link and OpenOCD.
slug: tock-test-harness
codeUrl: https://github.com/goodoomoodoo/tock-test-harness
siteUrl: https://goodoomoodoo.github.io/tock-test-harness/
star: 0
lastUpdated: '2021-07-07'
rtos: tock
topics:
- action-runner
- raspberry-pi
- tock
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- tcf-test-case-framework
- icetea-test-framework
- remote-flash-and-test-for-bl602-bl604-nuttx
- ferros-fancy-test
- tockloader
- apache-nuttx-rtos-on-64-bit-risc-v
---

## Overview

The Tock Test Harness is a specialized development tool designed to streamline the testing process for Tock OS, a secure embedded operating system. As Tock OS supports a diverse ecosystem of hardware, ensuring consistent behavior across different microcontrollers and boards is a significant challenge. This project provides a structured runner and harness to automate the execution and validation of tests on physical hardware.

## Extensive Hardware Support

One of the core strengths of the Tock Test Harness is its built-in knowledge of various embedded platforms. The system includes pre-defined configurations for a wide range of popular development boards, including:

- **Nordic Semiconductor**: nRF51DK, nRF52DK, and Arduino Nano 33 BLE.
- **STMicroelectronics**: STM32F3 Discovery, STM32F4 Discovery, and Nucleo-F4 boards.
- **RISC-V Platforms**: SiFive HiFive1, HiFive1b, and Arty FPGA (running SiFive cores).
- **Texas Instruments**: LaunchPad CC26x2R1 and EK-TM4C1294XL.
- **Other Platforms**: Hail, imix, EDU-CIAA, and BBC Micro:bit v2.

By leveraging these definitions, the harness can automatically handle architecture-specific details such as page sizes, flash addresses, and specific OpenOCD or J-Link commands required for flashing and debugging.

## Technical Architecture

The harness is primarily written in Python and utilizes several key components to manage the testing lifecycle. It integrates with `tockloader` logic to understand board interfaces and uses `toml` for configuration management. 

Key technical features include:
- **Automated Environment Setup**: The `runner_init.py` script can automatically clone the Tock OS repository and set up the necessary directory structures.
- **Protocol Abstraction**: It supports multiple communication protocols, including J-Link and OpenOCD, allowing it to interface with various debug probes seamlessly.
- **Interactive Configuration**: The harness includes an initialization guide that prompts users to select their board model, communication protocol, and board directory, ultimately generating a `config.toml` file that governs the test execution.
- **Hardware Interaction**: Through the use of `gpiozero`, the harness can potentially interact with physical pins on a host machine (like a Raspberry Pi) to trigger hardware resets or signal test states.

## Getting Started

To use the harness, developers typically run the initialization script to define their target environment. The script guides the user through selecting a known board or defining a custom one. Once configured, the harness manages the process of building Tock, flashing the test image to the target board, and monitoring the output for success or failure criteria. This automation is essential for continuous integration (CI) environments where Tock OS must be verified against real hardware targets to ensure kernel stability and driver correctness.
