---
title: Pico Demos for RP2040
summary: A collection of example projects for the Raspberry Pi Pico (RP2040) designed
  to run without the official pico-sdk. It features bare-metal implementations, flash
  utility tools, and SEGGER Embedded Studio templates utilizing CMSIS conventions.
slug: pico-demos-for-rp2040
codeUrl: https://github.com/majbthrd/pico-demos
star: 6
lastUpdated: '2021-11-20'
rtos: cmsis
topics:
- cmsis
- rp2040
- segger-embedded-studio
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rp2040-freertos-template
- rp2040-projects-by-armstrong-subero
- raspberry-pi-pico-freertos-sample-application
- cmsis-rp2040
- blinky-pico-2-dual-core-bare-metal
- pico-zephyr-project
---

## Overview

The Pico Demos repository provides a unique look at the Raspberry Pi Pico (RP2040) by offering functional examples that operate entirely independent of the official Raspberry Pi `pico-sdk`. This collection is particularly useful for developers who want to understand the low-level hardware registers of the RP2040 or those who prefer a more traditional bare-metal development workflow similar to other microcontroller ecosystems.

By stripping away the abstraction layers of the standard SDK, these demos demonstrate how to interact with the RP2040 hardware directly, providing a leaner starting point for custom firmware development.

## Key Components

### Bare-Metal Blinky
The repository includes a "quick and dirty" LED blink implementation. Inspired by the minimalist style of the `mcu-starter-projects`, this demo shows the absolute minimum code required to initialize the RP2040's GPIO and toggle an LED. It serves as an excellent reference for understanding the boot sequence and basic register manipulation without the overhead of a large framework.

### Picoblank Utility
One of the practical tools included is `picoblank`. This utility is provided as a `.uf2` file designed to overwrite the first 256 bytes of the onboard flash with `0xFF`. This is a specialized tool for developers needing to reset the flash state or clear out bootloader configurations during the development process.

### SEGGER Embedded Studio Integration
For developers who prefer professional IDEs over command-line build systems, the `pico-ses` project provides a sample SEGGER Embedded Studio (SES) project. This project is significant because it:
- Uses standard CMSIS conventions, making it familiar to ARM developers.
- Is compatible with `pico-debug`, allowing for advanced debugging capabilities.
- Provides a structured environment for managing more complex RP2040 projects outside of the CMake-based SDK workflow.

## Technical Philosophy

The project emphasizes portability and standard conventions. By utilizing CMSIS (Cortex Microcontroller Software Interface Standard), it aligns the RP2040 with the broader ARM ecosystem. This approach allows developers to use familiar tools like SEGGER J-Link and Embedded Studio, which are industry standards in embedded systems engineering. 

This repository is an ideal resource for engineers looking to port existing ARM-based codebases to the RP2040 or for those who find the official SDK's structure too restrictive for their specific application needs.
