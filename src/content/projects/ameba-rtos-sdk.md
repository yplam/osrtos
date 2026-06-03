---
title: Ameba RTOS SDK
summary: A comprehensive IoT development framework for Realtek Ameba series SoCs,
  providing a robust environment for building connected applications. It primarily
  leverages the FreeRTOS kernel and integrates essential networking stacks like lwIP,
  Wi-Fi, and Bluetooth. The SDK supports a wide range of Realtek chips, including
  the RTL8730E and RTL8721Dx, with tools for both CLI and VS Code-based development.
slug: ameba-rtos-sdk
codeUrl: https://github.com/Ameba-AIoT/ameba-rtos
siteUrl: https://www.realmcu.com/
version: v1.1.1
lastUpdated: '2026-05-26'
licenses:
- Apache-2.0
rtos: freertos
libraries:
- lwip
- littlefs
topics:
- bluetooth
- embedded-systems
- iot
- wifi
isShow: false
createdAt: '2026-06-01T00:51:21+00:00'
updatedAt: '2026-06-01T00:51:21+00:00'
relatedProjects:
- ameba-freertos-pro2-sdk
- esp8266-rtos-software-development-kit-sdk
- kendryte-k210-freertos-sdk
- openthread-rtos
- golioth-firmware-sdk
- nuclei-software-development-kit-nuclei-sdk
---

Ameba RTOS is the primary development framework for Realtek’s line of Ameba AIoT SoCs. It provides a full-featured environment for developers to build, compile, and flash firmware onto Realtek hardware, supporting both Linux and Windows development hosts. The framework is designed to be modular, allowing developers to toggle specific features like Wi-Fi, Bluetooth, and various networking protocols depending on the requirements of their specific IoT application.

## Hardware Support

The SDK is built to support a wide array of Realtek chips within the Ameba series. This includes high-performance SoCs such as the RTL8730E and RTL8726E, as well as more specialized versions like the RTL8721Dx, RTL8710E, and RTL8720E. These chips are often used in smart home devices, industrial sensors, and audio applications, making the framework a versatile choice for diverse AIoT ecosystems.

## Core Architecture and RTOS

At the heart of Ameba RTOS is a flexible kernel management system. While the framework is most commonly associated with FreeRTOS—providing the standard task management, queues, and timers expected in an embedded environment—it also includes configuration options for Zephyr. This dual-RTOS support ensures that developers can choose the kernel that best fits their project's architecture.

The system components are organized into a modular directory structure, including:
- **OS Layer**: Abstractions for FreeRTOS and Zephyr, including POSIX and VFS layers.
- **Network Stack**: A robust implementation of the lwIP (Lightweight IP) stack, enabling TCP/IP, DHCP, DNS, and mDNS.
- **Connectivity**: Native drivers and application APIs for Wi-Fi and Bluetooth (including BLE, Mesh, and LE Audio).
- **Security**: Integration of MbedTLS and GmSSL for secure communication via TLS 1.3 and other cryptographic protocols.

## Connectivity and Networking

One of the standout features of the Ameba platform is its comprehensive networking suite. Beyond basic Wi-Fi and Bluetooth connectivity, the SDK includes a Software Defined Network (SDN) stack for fine-grained control over Bluetooth HCI and link layer management. It also provides high-level application protocols such as MQTT, HTTP/HTTPS (client and server), WebSocket, and CoAP. For manufacturing and testing, the framework includes an AT command interface that allows for system control and configuration via serial, SPI, or USB interfaces.

## Storage and File Systems

For data persistence, Ameba RTOS integrates multiple file system options. It supports LittleFS, which is optimized for flash wear leveling and power-fail safety in embedded systems, as well as FATFS for compatibility with SD cards and USB mass storage. These are managed through a Virtual File System (VFS) layer, providing a unified API for file operations regardless of the underlying storage medium.

## Development Workflow

Realtek offers two primary ways to interact with the Ameba RTOS environment:

### VS Code Extension
The Ameba extension for Visual Studio Code is a specialized tool built upon the Cline framework. It automates much of the boilerplate work, including environment checking, toolchain installation, and SDK configuration. It provides a graphical interface for project compilation, firmware flashing, and serial port monitoring, making it accessible for developers who prefer an integrated IDE experience.

### Command Line Interface (CLI)
For power users and CI/CD pipelines, the framework provides a Python-based utility called `ameba.py`. This tool handles the entire lifecycle of a project:
- **Configuration**: Using `ameba.py menuconfig` to toggle features and hardware settings.
- **Building**: Compiling the project into binary images.
- **Flashing**: Deploying images to the target hardware via serial or USB.
- **Monitoring**: Real-time serial output and debugging.

## Advanced Features

The framework is equipped for professional-grade development with support for Over-the-Air (OTA) updates, allowing for remote firmware management via HTTP or HTTPS. It also includes advanced debugging tools, such as RTOS-aware inspection of tasks and memory, and support for hardware-level debugging using DAP-Link or J-Link adapters. This makes Ameba RTOS a complete solution for taking an IoT product from initial prototyping to mass production.
