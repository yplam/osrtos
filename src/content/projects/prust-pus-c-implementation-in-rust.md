---
title: 'Prust: PUS-C Implementation in Rust'
summary: Prust is a modular implementation of the ECSS PUS-C (Packet Utilization Standard)
  written in Rust. It provides a framework for space engineering telemetry and telecommand,
  featuring core data structures, a ground simulation tool, and a complete FreeRTOS-based
  project for STM32 microcontrollers.
slug: prust-pus-c-implementation-in-rust
codeUrl: https://github.com/visionspacetec/Prust
siteUrl: http://www.visionspace.com
star: 18
version: v1.0
lastUpdated: '2021-04-23'
rtos: freertos
topics:
- explanations
- freertos
- prust-app
- pus
- rust
- wiki
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-rtic-project-template
- project-shadow-flight
- freertos-rust
- rust-stub-library-for-apache-nuttx
- stm32h743zi-rust-playground
- rust-ir-thermometer-firmware
---

## Overview

Prust, a portmanteau of **P**US and **Rust**, is a specialized implementation of the [PUS-C](https://ecss.nl/standard/ecss-e-st-70-41c-space-engineering-telemetry-and-telecommand-packet-utilization-15-april-2016/) (Packet Utilization Standard) designed for high-reliability space engineering applications. By leveraging the safety and performance characteristics of the Rust programming language, Prust aims to provide a robust foundation for telemetry and telecommand (TM/TC) systems in embedded environments.

## Project Structure

The ecosystem is divided into several distinct modules to ensure separation of concerns and reusability:

- **Prust-Core**: This module contains the fundamental PUS-C data structures implemented in Rust. It serves as the backbone for the entire project, ensuring that packet definitions adhere to the ECSS standards.
- **Prust-Test**: A Command Line Interface (CLI) tool designed to simulate ground station operations. This allows developers to test their PUS implementations without requiring physical ground segment hardware.
- **Prust-FreeRTOS**: A complete embedded project configured for STM32CubeIDE. It demonstrates how to integrate the Rust-based PUS logic into a traditional C-based RTOS environment.
- **Prust-App**: The specific RTOS application logic that utilizes the PUS-C structures to perform system tasks.

## Technical Implementation and Hardware Support

Prust is specifically tailored for embedded systems, with a primary focus on the **VST104 (Sierra)** platform and **STM32** microcontrollers. The project demonstrates a hybrid approach to embedded development, where the safety-critical protocol logic is handled by Rust, while the real-time scheduling and hardware abstraction are managed by **FreeRTOS**.

This architecture allows developers to benefit from Rust's memory safety and strict type system—crucial for space applications where software failures can be catastrophic—while maintaining compatibility with industry-standard RTOS tools and STM32 hardware ecosystems.

## Development and Extensibility

The project is designed to be extensible, allowing developers to add new functions and services according to their specific mission requirements. The maintainers provide comprehensive documentation via a GitHub Wiki, covering essential workflows such as:

- Building the project for the VST104 target.
- Utilizing the Prust-Test CLI for ground simulation.
- Implementing new PUS services and functions within the framework.

While the project previously supported a bare-metal Rust implementation, that approach has been deprecated in favor of the current RTOS-integrated model, which provides a more standard path for complex space-grade embedded applications.
