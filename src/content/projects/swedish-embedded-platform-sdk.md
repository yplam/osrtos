---
title: Swedish Embedded Platform SDK
summary: A comprehensive firmware development SDK built on the Zephyr RTOS, featuring
  advanced simulation with Renode and integrated control system tools. It provides
  extensive hardware support for over 400 boards and includes a powerful CI infrastructure
  for automated testing and verification.
slug: swedish-embedded-platform-sdk
codeUrl: https://github.com/swedishembedded/sdk
siteUrl: https://swedishembedded.com/sdk
star: 63
version: v0.36.3
lastUpdated: '2023-08-13'
rtos: zephyr
libraries:
- lvgl
topics:
- cmock
- embedded
- embedded-c
- firmware
- microcontroller
- platform
- sdk
- unity
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- swedish-embedded-workstation
- zephyr-sdk
- ameba-rtos-sdk
- swedish-embedded-control-systems-toolbox
- enterprise-stm32-platform-development
- zephyr-rtos-ai-harness
---

## Overview

The Swedish Embedded Platform SDK is a comprehensive development environment designed to streamline the creation, simulation, and testing of embedded firmware. Built upon the Zephyr RTOS kernel, this SDK provides a portable and scalable foundation for industrial-grade applications. It bridges the gap between hardware development and modern software engineering practices by integrating powerful CI/CD pipelines, advanced simulation frameworks, and specialized control system toolboxes.

## Built on Zephyr RTOS

At its core, the SDK leverages the Zephyr RTOS, a highly capable and stable real-time kernel. This integration grants developers access to a massive ecosystem of over 700 device drivers and support for more than 420 development boards. Whether you are working with STM32, NXP, or other SoC devices, the SDK provides the necessary HAL support and configuration tools to get hardware up and running quickly. It also includes library support for graphical interfaces via the LVGL library, making it suitable for complex HMI applications.

## Advanced Simulation and Visualization

One of the standout features of the Swedish Embedded Platform SDK is its deep integration with the Renode simulation framework. Renode allows for the co-simulation of hardware models alongside production firmware, enabling developers to debug and verify code without physical hardware. 

**Key simulation capabilities include:**
- **Multi-node Simulation**: Test complete networks of devices interacting with each other.
- **Custom Testbenches**: Create visualization testbenches to interact with virtual PCBs and controls.
- **Peripheral Co-simulation**: Map standalone executables into the MCU address space to simulate complex peripherals with user interaction.
- **Scripting**: Use Python or C# to add dynamic modeling and unique simulation behaviors.

## Integrated Control Systems Toolbox

For developers working on industrial automation or robotics, the SDK includes the Swedish Embedded Control Toolbox. This provides high-performance C implementations of essential control algorithms, including:
- **Filtering**: Pure C Kalman filters and Square Root Unscented Kalman Filter (SR-UKF) implementations.
- **System Identification**: Algorithms to identify system dynamics models in real-time directly within the firmware.
- **Controller Design**: Functions for implementing model-based controllers for dynamic systems.

## Powerful CI Infrastructure and Testing

The SDK extends Zephyr's testing capabilities with a focus on agility and code quality. It introduces advanced unit test mocking, allowing developers to reach isolated code paths regardless of component dependencies. Furthermore, it supports RobotFramework, enabling the creation of system-level tests in plain English that can be executed against production firmware in a simulated environment. This infrastructure ensures that every commit is automatically verified through unit, integration, and system-level tests.

## Getting Started

The SDK is designed for ease of use, providing a pre-configured Docker development image (`swedishembedded/develop:latest`) that contains all necessary tools. Using the `west` meta-tool, developers can initialize workspaces, build applications for specific boards, and flash hardware directly from the container.

```bash
# Example of building a blinky sample for an STM32 board
west build -b stm32f429i_disc1 -s ../zephyr/samples/basic/blinky -t flash
```

By combining a stable RTOS with cutting-edge simulation and automated testing, the Swedish Embedded Platform SDK allows firmware teams to focus on writing high-quality code while maintaining a fast and reliable development lifecycle.
