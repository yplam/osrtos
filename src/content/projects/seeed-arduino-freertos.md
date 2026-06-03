---
title: Seeed Arduino FreeRTOS
summary: A port of FreeRTOS version 10.4.3 for the Arduino IDE, specifically designed
  for Seeed Studio's SAMD21 and SAMD51 microcontrollers. It enables real-time multitasking
  and task scheduling on hardware such as the Seeeduino Xiao and Wio Terminal.
slug: seeed-arduino-freertos
codeUrl: https://github.com/Seeed-Studio/Seeed_Arduino_FreeRTOS
star: 45
version: v2.0.0
lastUpdated: '2025-01-07'
rtos: freertos
topics:
- arduino
- arduino-library
- freertos
- samd21
- samd51
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- arduino-freertos-library
- arduino-rt-thread-library
- freertos-port-for-teensy-3-6-4-0-4-1
- freertos-port-for-avr-xmega
- rt-thread-art-arduino-rt-thread
- arduino-pico
---

## Overview

The Seeed Arduino FreeRTOS library brings the power of the FreeRTOS kernel to the Arduino ecosystem. By porting version 10.4.3 of the industry-standard real-time operating system, this project allows developers to move beyond the traditional single-loop execution model of Arduino and implement sophisticated multitasking applications. 

This library is specifically optimized for Seeed Studio's range of SAMD-based microcontrollers, providing a robust foundation for building complex embedded systems that require precise timing, task prioritization, and efficient resource management.

## Hardware Support

The library is tailored for high-performance ARM Cortex-M based boards within the Seeed Studio catalog, including:

*   **SAMD21 Series**: Support for the Seeeduino Xiao and the Arduino Zero.
*   **SAMD51 Series**: Support for the Wio Terminal and other high-speed SAMD51 devices.

By targeting these specific architectures, the library ensures that the FreeRTOS scheduler and context switching are handled efficiently, taking full advantage of the underlying hardware capabilities.

## Key Features

Integrating FreeRTOS into the Arduino IDE provides several critical advantages for embedded developers:

*   **Preemptive Multitasking**: Run multiple tasks concurrently with a priority-based scheduler.
*   **Task Synchronization**: Utilize standard FreeRTOS primitives such as semaphores, mutexes, and queues to manage data and hardware access between tasks.
*   **Real-Time Performance**: Achieve deterministic behavior for time-critical operations, which is often difficult in a standard Arduino `loop()` structure.
*   **Modern Kernel**: Based on FreeRTOS 10.4.3, ensuring access to modern kernel features and bug fixes.

## Technical Implementation

The project is structured as a standard Arduino library, making it easy to include in existing sketches. It includes the core FreeRTOS source files and the necessary port-specific code for the SAMD architecture. The build process is validated through CI/CD pipelines using GitLab CI and Travis CI, ensuring that examples like the `Basic_RTOS_Example` remain functional across updates.

## Getting Started

To use the library, developers can include it via the Arduino Library Manager. Once included, you can define tasks using the standard FreeRTOS `xTaskCreate` API. This allows you to separate concerns—such as sensor reading, display updating, and network communication—into independent execution units. 

Because it is built for the Arduino IDE, it maintains compatibility with existing Arduino libraries while providing the underlying RTOS infrastructure needed for professional-grade firmware development on Seeed hardware.
