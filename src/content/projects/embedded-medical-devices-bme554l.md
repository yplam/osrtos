---
title: Embedded Medical Devices (BME554L)
summary: A curriculum and project repository for building embedded medical devices
  using the Zephyr RTOS and Nordic nRF Connect SDK. It features hands-on labs for
  the nRF52833DK, covering real-time operating system fundamentals, Bluetooth Low
  Energy, and sensor integration.
slug: embedded-medical-devices-bme554l
codeUrl: https://github.com/mlp6/Embedded-Medical-Devices
siteUrl: https://mlp6.github.io/Embedded-Medical-Devices/
star: 16
lastUpdated: '2026-01-21'
rtos: zephyr
topics:
- c
- duke-university
- embedded
- medtech
- nordic-semiconductor
- nrf52833
- zephyr-rtos
isShow: false
createdAt: '2026-01-25'
updatedAt: '2026-01-25'
relatedProjects:
- rapid-embedded-systems-design-education-kit
- zj-tek-rt-thread-nimble-littlevgl-nordic-project
- iot-labs-with-contiki-os
- unipg-mbed-os-samples
- develop-your-own-bluetooth-low-energy-applications
- mbed-os-unipg-samples-1
---

The Embedded Medical Devices project, developed for the Duke University BME 554L course, provides a structured framework for learning modern embedded systems development within a medical context. The repository serves as a central hub for course materials, laboratory exercises, and technical documentation, focusing heavily on the Zephyr Real-Time Operating System (RTOS) and the Nordic Semiconductor ecosystem.

### The Zephyr RTOS and nRF Connect SDK
At the heart of the project is the Zephyr RTOS, a scalable and secure real-time operating system designed for resource-constrained devices. The curriculum utilizes the nRF Connect SDK (specifically version 3.2.1), which integrates Zephyr with Nordic-specific drivers and libraries. This choice reflects industry standards for low-power wireless devices, particularly those used in medical applications where reliability and power efficiency are paramount.

### Hardware and Sensors
The primary hardware target is the Nordic nRF52833 Development Kit (DK). This SoC features an ARM Cortex-M4 processor with FPU and supports multiple wireless protocols including Bluetooth Low Energy (BLE). In addition to the development kit, the project incorporates external sensors such as the MCP9808 high-accuracy I2C temperature sensor, allowing students to practice digital communication protocols like I2C and SPI.

### Curriculum and Learning Modules
The project is organized into several learning modules that guide developers through the complexities of embedded software:

- **Event-Driven State Machines**: Implementing robust logic using state machine patterns.
- **Kernel Fundamentals**: Mastering GPIO, Interrupt Service Routines (ISRs), callbacks, and timers.
- **Multithreading**: Utilizing Zephyr threads and kernel events for concurrent task management.
- **State Machine Framework (SMF)**: Leveraging Zephyr's built-in framework for managing complex system states.
- **Peripheral Interfacing**: Working with Analog-to-Digital Conversion (ADC) and Pulse Width Modulation (PWM).
- **Wireless Communication**: Implementing Bluetooth Low Energy (BLE) services for medical data transmission.

### Development Environment
The project promotes a modern development workflow using Visual Studio Code as the primary IDE. It leverages the nRF Connect for VS Code extension pack, providing a seamless interface for building, flashing, and debugging Zephyr-based applications. The use of Git for version control and Quarto for technical report generation ensures that students follow professional engineering practices throughout the development lifecycle.

### Laboratory Exercises
The repository includes a series of labs that transition from basic "Blinky" examples to complex medical device simulations, such as ECG waveform generation and temperature monitoring systems integrated with BLE. These labs are designed to provide practical experience with the Zephyr State Machine Framework and real-time data processing.
