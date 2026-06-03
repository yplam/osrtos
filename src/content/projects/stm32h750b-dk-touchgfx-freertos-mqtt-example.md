---
title: STM32H750B-DK TouchGFX FreeRTOS MQTT Example
summary: A comprehensive example project for the STM32H750B-DK development board integrating
  TouchGFX GUI, FreeRTOS, and LWIP MQTT. It demonstrates how to establish MQTT connections,
  subscribe to topics, and exchange data between the GUI and network tasks using FreeRTOS
  queues.
slug: stm32h750b-dk-touchgfx-freertos-mqtt-example
codeUrl: https://github.com/GrzHeller/STM32H750B-DK_TouchGFX_FreeRTOS_MQTT_Example
star: 20
lastUpdated: '2022-08-11'
rtos: freertos
libraries:
- lwip
topics:
- demo
- ethernet
- example
- freertos
- lwip
- mqtt
- mqtt-client
- stm32
- stm32h750b-dk
- touchgfx
- tutorial
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-lwip-mqtt-demo
- freertos-mqtt-client-demo
- stm32f4-display-and-ethernet-example
- sk-mstm32f107-demo-board-example
- mqtt-client-and-https-server-using-mbedtls
- stm32f429-nucleo-lwip-and-freertos-template
---

## Overview

The STM32H750B-DK TouchGFX FreeRTOS MQTT Example serves as a robust starting point for developers looking to integrate graphical user interfaces with network-connected IoT functionality on high-performance STM32H7 microcontrollers. The project bridges the gap between complex hardware configuration and application-level logic, providing a working template that combines the TouchGFX framework, the FreeRTOS real-time operating system, and the LwIP TCP/IP stack.

## Key Features

This project demonstrates several critical aspects of modern embedded development:
- **Graphical User Interface**: A TouchGFX-based UI featuring dynamic text wildcards, custom typography, and interactive buttons.
- **MQTT Connectivity**: Implementation of a basic MQTT client capable of connecting to brokers (like Mosquitto) over unencrypted port 1883.
- **Network Services**: Integration of DNS support to allow connections to cloud-based MQTT brokers via hostnames rather than static IP addresses.
- **Inter-Task Communication**: Use of FreeRTOS queues to safely pass data between the high-priority MQTT networking task and the TouchGFX GUI task.
- **Hardware Optimization**: Specific configurations for the STM32H750B-DK, including MPU region settings and Ethernet peripheral initialization.

## Technical Implementation

The project architecture relies on the seamless integration of several middleware layers. It addresses common pitfalls in STM32H7 development, such as the specific MPU (Memory Protection Unit) configurations required for Ethernet DMA descriptors and buffer management in the D2 SRAM domain.

### RTOS and Networking
FreeRTOS manages the concurrency, ensuring that the GUI remains responsive while the LwIP stack handles background network traffic. A significant technical detail included in this example is the adjustment of the LwIP cyclic timer. By modifying `MQTT_CYCLIC_TIMER_INTERVAL`, the project ensures that MQTT Keep Alive functionality remains stable even with low timeout values, preventing accidental disconnections.

### GUI and Peripheral Integration
The project utilizes TouchGFX for the front-end. It provides a solution for the common "white screen" issue encountered when using the "Generate peripheral initialization as a pair of .c/.h files" option in STM32CubeMX. By manually restoring specific initialization code for QUADSPI and FMC (Flexible Memory Controller) into the generated files, the project maintains a clean code structure without sacrificing hardware functionality.

## Getting Started

The workflow follows a standard STM32 toolchain approach:
1. **TouchGFX Designer**: Used to design the UI and generate the base C++ classes.
2. **STM32CubeMX**: Used to configure the H7 hardware, including Ethernet pins, LwIP parameters, and FreeRTOS tasks/queues.
3. **STM32CubeIDE**: The final integration environment where the MQTT logic is implemented and the project is compiled.

For testing, the project is designed to work with a Mosquitto broker. Users can publish messages to specific topics (e.g., `test/topic`) to trigger visual changes on the Discovery board's screen, such as toggling images or updating text fields. This demonstrates a complete end-to-end IoT signal path from a remote client to an embedded display.
