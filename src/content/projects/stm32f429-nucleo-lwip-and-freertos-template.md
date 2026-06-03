---
title: STM32F429 Nucleo lwIP and FreeRTOS Template
summary: A template project for the STM32F429-Nucleo board integrating the lwIP TCP/IP
  stack with FreeRTOS. It provides a foundational setup for developing networked embedded
  applications, including a basic HTTP server example using the Netconn API.
slug: stm32f429-nucleo-lwip-and-freertos-template
codeUrl: https://github.com/DutchEngineer/STM32F429_NUCLEO_LWIP_FREERTOS
star: 5
lastUpdated: '2016-12-18'
rtos: freertos
libraries:
- lwip
topics:
- freertos
- lwip
- project
- stmcubemx
- truestudio
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lwip-http-server-netconn-rtos-application
- lwip-tcp-ip-stack-on-stm32-microcontroller
- sk-mstm32f107-demo-board-example
- stm32f107-makefile-freertos-template
- stm32h745-ethernet-with-lwip-and-freertos
- micro-ros-stm32-template
---

## Overview

The STM32F429-Nucleo lwIP FreeRTOS project serves as a comprehensive template for developers looking to implement networking capabilities on the STM32F429ZI microcontroller. By combining the power of the FreeRTOS real-time operating system with the lwIP (lightweight IP) stack, this project provides a robust starting point for building IoT devices, web servers, and networked industrial controllers.

The project is specifically designed for the NUCLEO-F429ZI board and utilizes the standard STMicroelectronics development ecosystem, including STM32CubeMX for hardware abstraction and peripheral configuration, and Atollic TrueSTUDIO as the primary integrated development environment (IDE).

## Technical Architecture

The implementation leverages several key components of the STM32 ecosystem:

- **Hardware Platform**: The NUCLEO-F429ZI, featuring an ARM Cortex-M4 core with 2MB of Flash and 256KB of RAM, providing ample resources for both a network stack and application logic.
- **RTOS Integration**: FreeRTOS manages task scheduling, allowing the lwIP stack to run in its own thread while the application handles other real-time requirements.
- **Networking Stack**: lwIP is configured to use the RMII interface of the STM32F429's Ethernet MAC. The project supports both DHCP for automatic IP assignment and static IP configuration.
- **Application Layer**: A demonstration HTTP server is included, utilizing the lwIP Netconn API. This API provides a sequential programming model that is easier to use within an RTOS environment compared to the raw callback-based API.

## Key Features and Configuration

The project includes a detailed walkthrough for configuring the hardware via STM32CubeMX. Key configuration steps highlighted in the project include:

- **Ethernet Configuration**: Setting up the RMII interface and identifying the LAN8742A PHY address.
- **lwIP Customization**: Disabling DHCP for static IP testing and adding specific user constants like `LWIP_TIMEVAL_PRIVATE` to ensure compatibility with the toolchain.
- **Task Management**: Initializing the default FreeRTOS task and integrating the HTTP server initialization code within the generated project structure.
- **Web Content**: A method for hosting simple web pages by converting HTML, CSS, and image files into C-style strings that can be served directly from the microcontroller's internal flash memory.

## Getting Started

To use this template, developers typically start by generating the base code through the provided `.ioc` file in STM32CubeMX. This ensures all pinouts, such as the green LED (LD1) and the Ethernet RMII pins, are correctly mapped. Once the project is imported into TrueSTUDIO, the user adds the `httpserver-netconn` and `temp` source files to the project structure.

The project demonstrates how to serve a basic `index.html` file. Once the board is flashed and connected to a network, it can be reached via its IP address (defaulted to `192.168.2.81` in the template) to view the hosted website. This workflow illustrates the complete path from hardware configuration to a functional networked application.
