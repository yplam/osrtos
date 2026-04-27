---
title: WIZnet FreeRTOS SDK for Raspberry Pi Pico Ethernet
summary: A robust framework and collection of examples for implementing Ethernet connectivity
  on Raspberry Pi Pico (RP2040/RP2350) using FreeRTOS. It integrates WIZnet's hardwired
  TCP/IP controllers with mbedTLS for secure MQTT and SSL/TLS communication.
slug: wiznet-freertos-sdk-for-raspberry-pi-pico-ethernet
codeUrl: https://github.com/WIZnet-ioNIC/WIZnet-PICO-FREERTOS-C
version: 1.2.0
lastUpdated: '2025-11-25'
licenses:
- Apache-2.0
rtos: freertos
topics:
- c
- cpp
- ethernet
- freertos
- raspberry-pi-pico
- rp2040
- rp2350
- w5100s
- w5100s-evb-pico
- w5500
- w5500-evb-pico
- w55rp20
- w55rp20-evb-pico
isShow: true
image: /202604/w5100s-evb-pico2.webp
createdAt: '2026-04-27T08:41:57+00:00'
updatedAt: '2026-04-27T08:41:57+00:00'
---

Developing connected applications on the Raspberry Pi Pico often requires the reliability of a wired connection. This repository provides a comprehensive environment for integrating WIZnet’s Ethernet solutions with the Raspberry Pi Pico and the newer Pico 2, utilizing FreeRTOS for task management and timing. By combining the RP2040 or RP2350 microcontrollers with WIZnet’s hardwired TCP/IP chips, developers can build stable, multi-threaded networking applications that handle everything from basic DHCP to secure cloud connectivity via SSL/TLS.

## Hardware Support and Architecture

The project is designed to support a wide array of WIZnet Ethernet modules and evaluation boards. This includes the standard W5100S and W5500 chips, as well as the W6100 and W6300 series which introduce support for IPv6. The hardware integration covers various interfaces, including standard SPI and high-performance QSPI implemented via the Pico's Programmable I/O (PIO) blocks. 

One of the standout features of this repository is its support for the RP2350 (Pico 2) alongside the original RP2040. This ensures that projects can take advantage of the increased performance and security features of the newer hardware while maintaining a consistent networking API.

## Core Components and Libraries

The firmware stack is built upon several key pillars:

*   **FreeRTOS Kernel**: Provides the real-time operating system foundation, allowing for preemptive multitasking and efficient resource management.
*   **ioLibrary_Driver**: WIZnet’s standard C library for controlling their Ethernet chips. It handles the low-level socket registers and hardware communication.
*   **mbedTLS**: An open-source SSL/TLS library used here to provide cryptographic functions and secure communication channels, essential for modern IoT applications.
*   **Pico SDK & Extras**: The underlying hardware abstraction layer provided by Raspberry Pi for peripheral control.

## Modular Porting Layer

A significant architectural advantage of this project is the dedicated `port` directory. This layer abstracts MCU-dependent code—such as SPI port configurations, GPIO pin assignments for interrupts, and timer implementations—away from the main application logic. If you are moving from a Raspberry Pi Pico to a custom board or even a different MCU entirely, the porting layer provides a centralized location to modify hardware-specific functions like `wizchip_spi_initialize` or `wizchip_critical_section_lock` without touching the core network protocol implementations.

## Networking Examples

The repository includes several practical examples to help developers jumpstart their projects:

*   **DHCP & DNS**: Demonstrates how to automatically acquire IP addresses and resolve domain names using the hardwired stack.
*   **MQTT**: A thread-safe implementation for connecting to IoT brokers, suitable for telemetry and remote control.
*   **TCP Client over SSL**: Showcases how to use mbedTLS to establish secure encrypted connections, a requirement for communicating with most modern web services and cloud platforms.

## Getting Started

Configuring the project is handled through CMake, making it compatible with Visual Studio Code and standard command-line build tools. To target a specific hardware setup, developers simply need to set the `BOARD_NAME` in the root `CMakeLists.txt`. For example, to use the W5500-EVB-Pico, the configuration would look like this:

```cmake
# Set board
set(BOARD_NAME W5500_EVB_PICO)
```

Additionally, the SPI clock speed and QSPI modes can be adjusted directly within the build configuration to optimize performance for specific hardware layouts. Because the project uses submodules for its dependencies (like the FreeRTOS kernel and ioLibrary), it is important to clone the repository recursively to ensure all necessary source files are present.
