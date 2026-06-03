---
title: Smart Home Device Configurator
summary: A development tool and library for configuring smart home devices using JSON
  descriptions. It generates C++ template code for Mbed OS 6, implements MQTT-based
  communication, and targets platforms like the Nucleo F746ZG.
slug: smart-home-device-configurator
codeUrl: https://github.com/veracioux/siau-devconf
siteUrl: https://siau-devconf.rtfd.io
star: 1
version: v0.1.0
lastUpdated: '2021-09-24'
rtos: mbed-os
topics:
- cli
- cmake
- cpp
- json
- linux
- mbed
- mbed-os
- mqtt
- qttest
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mbed-vscode-tools
- home-smart-mesh-sdk-for-thingy53
- clion-for-stm32
- mbed-tools
- micropython-smarthome-node-pysmartnode
- supladevice-library
---

The Smart Home Device Configurator (`devconf`) is a specialized toolset designed to streamline the development of IoT devices within a smart home ecosystem. By bridging the gap between high-level device descriptions and low-level firmware implementation, it allows developers to focus on the unique features of their hardware rather than the boilerplate of communication protocols and configuration management.

## The Development Workflow

The project introduces a structured workflow for creating smart devices:

1.  **Description**: Define the device's capabilities and properties using basic JSON files.
2.  **Generation**: Use the `devconf` tool to generate C++ template code specifically tailored for an Mbed OS workspace.
3.  **Implementation**: Fill in the generated C++ functions to handle specific hardware interactions.
4.  **Deployment**: Compile the project and download it to the target microcontroller.

This approach ensures that the device description remains the "source of truth," which can be shared between the physical device and the central smart home management system.

## Core Components and Libraries

At the heart of the project is `devlib`, a library that facilitates the use of JSON descriptions across both the embedded device and the broader smart home system. This shared metadata approach reduces errors and ensures that the system always knows exactly what features a device supports.

For communication, the system relies on the MQTT protocol. The generated code handles the complexities of MQTT messaging, allowing the developer to simply implement the logic for the device's features without worrying about the underlying transport layer.

## Technical Foundation

The project is built on modern embedded and desktop technologies:

- **Mbed OS 6**: The firmware targets the Mbed OS 6 real-time operating system, providing a robust and portable foundation for embedded applications.
- **Qt 5**: The `devconf` configurator application is built using the Qt framework, specifically utilizing `qt5-mqtt` for its communication needs.
- **Hardware Support**: While designed to be portable, the system has been specifically tested on the STMicroelectronics Nucleo F746ZG development board.

## Getting Started

To use the configurator, developers typically start by defining their device in the `devices/` directory. The `devconf` tool then processes these definitions against templates found in the `template/` directory. The project includes a Makefile-based build system for the configurator itself, requiring CMake and Qt dependencies.

For those looking to automate their environment setup, the project supports `mbed-cli`, which can automatically generate a complete Mbed workspace based on the configurator's output. This integration makes it easy to move from a high-level JSON description to a flashable binary in a matter of minutes.
