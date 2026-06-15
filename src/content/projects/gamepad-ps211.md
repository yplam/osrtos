---
title: Gamepad PS211
summary: An advanced game controller project built on the STM32F103RCT6 microcontroller,
  featuring integrated power management via the AXP2101 chip. It leverages FreeRTOS
  for system orchestration and focuses on high-precision analog inputs and efficient
  wireless communication.
slug: gamepad-ps211
codeUrl: https://github.com/JoinNico/Gamepad_PS211
lastUpdated: '2026-03-03'
rtos: freertos
libraries:
- easylogger
topics:
- c
- stm32
isShow: false
createdAt: '2026-06-13T05:18:10+00:00'
updatedAt: '2026-06-13T05:18:10+00:00'
relatedProjects:
- stm32f107-makefile-freertos-template
- kompressorklock
- stm32l475-freertos-iot-project
- ic-705-ci-v-band-decoder-and-transverter-controller
- hd2-macropad
- diy-portrait-mode-gamepad
---

## Building a Modern Embedded Gamepad

The Gamepad PS211 is a sophisticated embedded systems project focused on creating a high-performance wireless game controller. Built around the versatile STM32F103RCT6 microcontroller, the project aims to go beyond simple button mapping by implementing a robust software architecture that handles complex power management, low-latency wireless communication, and precise analog data acquisition.

At its core, the project serves as a practical application for learning advanced embedded development techniques. It moves away from simple "super-loop" architectures in favor of a real-time operating system approach, ensuring that input sampling, display updates, and communication tasks remain responsive and predictable.

## Technical Architecture

The firmware is structured around **FreeRTOS**, which manages the various concurrent tasks required for a modern controller. Key technical focuses of the implementation include:

*   **Inter-Process Communication (IPC)**: Utilizing FreeRTOS primitives to pass data between sensor reading tasks and communication stacks.
*   **Power Optimization**: Implementing FreeRTOS **tickless mode** to reduce power consumption during idle periods, extending the battery life of the handheld device.
*   **Asynchronous Logging**: Integration of **EasyLogger (elog)** for non-blocking diagnostic output, which is crucial for debugging wireless protocols without timing interference.
*   **Power Management**: Integration with the **AXP2101** PMIC to handle battery charging, voltage regulation, and system power sequencing.

## Hardware Integration

The PS211 hardware design is tailored for a high-end control experience. By using the STM32F103 series, the project takes advantage of multiple ADC channels for high-precision joystick inputs and hardware SPI/I2C interfaces for peripherals. 

One of the standout features is the inclusion of the AXP2101 power management chip. Unlike simpler designs that use basic LDOs, this project treats power as a first-class citizen, allowing for software-defined power rails and sophisticated battery monitoring. For connectivity, the system is designed to work with modules like the **SI24R1**, providing a reliable 2.4GHz wireless link for low-latency gaming.

## Development Goals

Currently in its mid-development phase, the project is evolving from a collection of driver libraries into a cohesive firmware ecosystem. The repository includes several sub-components and reference implementations:

*   **XPowersLib**: A driver suite for managing PMICs like the AXP series.
*   **OLED UI**: An implementation focused on providing visual feedback to the user, likely for battery status, connection strength, and configuration settings.
*   **Wireless Protocol**: A custom implementation for packet processing and parameter storage, ensuring that the controller can pair and maintain a stable link with a receiver.

By combining high-performance hardware with advanced RTOS features, the Gamepad PS211 represents a significant step up from standard DIY controllers, moving toward the territory of professional-grade peripheral design.
