---
title: Pico Zephyr Project
summary: A comprehensive development environment and example collection for using
  the Zephyr RTOS on Raspberry Pi Pico and Pico 2. It features automated installation
  scripts, VSCode integration for debugging, and networking examples for the RP2040
  and RP2350 platforms.
slug: pico-zephyr-project
codeUrl: https://github.com/raspberrypi/pico-zephyr
star: 13
lastUpdated: '2025-10-15'
rtos: zephyr
topics:
- examples
- microcontroller
- raspberry-pi-pico
- raspberrypi
- rtos
- vscode
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- rp2040-freertos-template
- raspberry-pi-pico-freertos-sample-application
- rp2040-projects-by-armstrong-subero
- cmsis-rp2040
- micropico-visual-studio-code-extension
- wiznet-freertos-sdk-for-raspberry-pi-pico-ethernet
---

The Pico Zephyr project provides a streamlined entry point for developers looking to leverage the power of the Zephyr Real-Time Operating System (RTOS) on Raspberry Pi's silicon. While Zephyr has long-standing support for the RP2040, this repository simplifies the setup and development experience by providing pre-configured build scripts and environment tools tailored specifically for the Pico and the newer Pico 2 (RP2350).

### Hardware and Platform Support

The project targets the full range of Raspberry Pi microcontrollers. This includes the original RP2040-based Pico and Pico W, as well as the high-performance RP2350-based Pico 2 and Pico 2 W. By utilizing Zephyr's hardware abstraction layer, developers can write code that is portable across these different architectures, including the ARM Cortex-M33 cores found in the RP2350.

### Streamlined Development Workflow

One of the primary hurdles in RTOS development is environment configuration. This project addresses this with a dedicated setup script that handles the installation of Zephyr dependencies, the `west` meta-tool, and the necessary toolchains. 

For developers who prefer an IDE, the project includes deep integration with Visual Studio Code. It provides configurations for the `pico-vscode` and `Cortex-Debug` extensions, enabling one-click compilation and hardware debugging. The setup includes support for the Raspberry Pi Debug Probe, allowing for real-time inspection of code running on the target hardware via OpenOCD and GDB.

### Networking and Wi-Fi Capabilities

A significant feature of this repository is the inclusion of a Wi-Fi example designed for the Pico W. This example demonstrates how to utilize Zephyr's robust networking stack to:
- Connect to a secure Wi-Fi network using SSID and PSK.
- Perform ICMP pings to external servers like Google's 8.8.8.8.
- Execute HTTP GET and POST requests.
- Handle JSON data payloads for IoT applications.

This functionality is enabled through the `hal_infineon` module, which provides the necessary drivers for the CYW43439 wireless chip used on the Pico W and Pico 2 W.

### Project Structure and Tooling

The repository is organized as a Zephyr workspace, managed by the `west` tool. The `west.yml` manifest defines the necessary modules, including the core Zephyr RTOS, hardware abstraction layers (HALs) for the Raspberry Pi silicon, and ARM's CMSIS libraries. 

Developers can use the provided `build.sh` script to target specific boards and configurations. A notable feature is the ability to toggle between UART and USB serial output (CDC ACM) for logging, which is particularly useful for developers who want to view serial output directly over the same USB cable used to power the board.
