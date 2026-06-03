---
title: micro-ROS STM32 Template
summary: A boilerplate project for integrating micro-ROS with STM32 microcontrollers
  using Ethernet connectivity. It leverages FreeRTOS for task management and the Arduino
  framework via PlatformIO, specifically targeting the STM32F407 series.
slug: micro-ros-stm32-template
codeUrl: https://github.com/husarion/micro_ros_stm32_template
star: 32
lastUpdated: '2022-08-29'
rtos: freertos
libraries:
- lwip
topics:
- arduino
- embedded
- ethernet
- freertos
- micro-ros
- platformio
- ros2
- stm32f4
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- stm32f107-makefile-freertos-template
- stm32-makefile-freertos-project-template
- stm32f429-nucleo-lwip-and-freertos-template
- stm32-libopencm3-freertos-platformio-template
- stm32-rtic-project-template
- micro-ros-for-rt-thread
---

## Overview

The micro-ROS STM32 Template provides a ready-to-use boilerplate for developers looking to integrate micro-ROS into their STM32-based embedded systems. By combining the power of ROS 2 with the efficiency of microcontrollers, this project enables hardware-level nodes to communicate seamlessly with a standard ROS 2 ecosystem. The template is specifically configured for the STM32F407 microcontroller using Ethernet as the transport layer, making it ideal for robotics applications requiring reliable, high-bandwidth communication.

## Technical Stack

This project integrates several key technologies to create a robust development environment:

- **micro-ROS**: The primary middleware that brings ROS 2 (Robot Operating System) to microcontrollers, allowing for publishers, subscribers, and services on resource-constrained devices.
- **FreeRTOS**: A real-time operating system that manages task scheduling, ensuring that the micro-ROS client and other application logic run concurrently and deterministically.
- **Arduino Framework & PlatformIO**: The project uses the Arduino core for STM32, managed through the PlatformIO ecosystem, which simplifies dependency management and the build process.
- **LwIP & STM32Ethernet**: These libraries provide the TCP/IP stack and hardware-specific Ethernet drivers required for network communication.

## Hardware Configuration

The default configuration targets the STM32-E407 Olimex board. It is designed to connect directly to a host computer via an Ethernet cable. The system architecture involves a Client (the STM32 board) and an Agent (typically running on a laptop or workstation). The Agent acts as a bridge between the micro-ROS client and the wider ROS 2 network.

In this setup, the STM32 is assigned a static IP (defaulting to `192.168.1.177`), while the Agent is expected at `192.168.1.176` on port `8888` using UDP.

## Getting Started

Developing with this template is streamlined through Visual Studio Code and the PlatformIO extension. The project includes a pre-configured `platformio.ini` file that handles all library dependencies, including the micro-ROS Arduino library and the STM32FreeRTOS port. 

### Build and Flash

Standard PlatformIO commands are used to manage the lifecycle of the project:

```bash
# Build the project
pio run

# Upload the firmware via ST-Link
pio run --target upload
```

The template supports multiple upload protocols, including ST-Link and Serial, which can be toggled within the configuration file.

## Running the Demo

The repository includes a demonstration setup using Docker Compose. This demo launches a ROS 2 Galactic environment containing a micro-ROS agent and a listener node. Once the STM32 is flashed and connected, it appears as a standard ROS 2 node (`/stm32_node`) publishing to the `/chatter` topic. 

Users can verify the connection by running standard ROS 2 CLI tools within the container:

```bash
ros2 node list
ros2 topic echo /chatter
```

The output typically displays a string message containing a counter and the system clock value, demonstrating successful real-time data transmission from the MCU to the ROS 2 graph.
