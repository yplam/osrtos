---
title: nRF52840 M.2 Developer Kit
summary: An open-source IoT prototyping platform featuring a removable nRF52840 M.2
  module and a versatile dock. It supports Zephyr RTOS and nRF5 SDK, offering advanced
  features like integrated DAPLink debugging and real-time power profiling for low-power
  wireless applications.
slug: nrf52840-m-2-developer-kit
codeUrl: https://github.com/makerdiary/nrf52840-m2-devkit
siteUrl: https://wiki.makerdiary.com/nrf52840-m2-devkit
star: 32
version: v1.0.0
lastUpdated: '2020-07-11'
rtos: zephyr
libraries:
- littlefs
- lvgl
topics:
- bluetooth-low-energy
- iot
- nrf5-sdk
- nrf52840
- nrf52840-m2
- open-hardware
- openthread
- python
- zephyr
- zigbee
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- nrf54l15-connect-kit
- zj-ble-rt-thread-and-nimble-for-nordic-nrf52
- objex-link
- ameba-rtos-sdk
- infuse-iot-sdk
- hail-iot-development-module
---

The nRF52840 M.2 Developer Kit is a modular and versatile IoT prototyping platform designed to accelerate the transition from development to production. At its core is the nRF52840 M.2 Module, a removable E-Key form factor board powered by the Nordic Semiconductor nRF52840 SoC. This hardware architecture allows developers to prototype using the full developer kit and then seamlessly integrate the same M.2 module into custom PCB hardware for final products.

## Hardware Capabilities

The kit is built around the powerful Arm Cortex-M4 with FPU, running at 64 MHz with 1 MB of Flash and 256 KB of RAM. Its wireless capabilities are extensive, supporting Bluetooth 5, Bluetooth mesh, Thread, Zigbee, 802.15.4, ANT, and 2.4 GHz proprietary stacks. Security is handled by an Arm TrustZone Cryptocell 310 subsystem, making it suitable for secure IoT deployments.

The accompanying M.2 Dock expands the module's utility by providing a rich set of peripherals and interfaces, including:
- A 1.3-inch 240x240 Color IPS TFT LCD Display
- MicroSD card slot for data logging
- Li-Po battery charger with power path management
- Arduino form factor headers and Grove connectors for rapid expansion
- Reversible USB-C connectors for modern connectivity

## Advanced Debugging and Power Profiling

One of the standout features of this kit is the integrated DAPLink debugger. It provides a complete development environment without the need for external probes, offering drag-and-drop programming, a virtual COM port for logging, and a CMSIS-DAP compliant debug channel. 

Furthermore, the kit includes advanced power profiling hardware. This allows developers to perform real-time current profiling of their applications with high precision (30,000 samples per second) and dual-gain stage amplifiers. This is critical for optimizing the battery life of low-power wireless devices, as it enables the tracking of voltage and current consumption during various radio states.

## Software Ecosystem

The project is deeply integrated with modern embedded software stacks. It utilizes the Zephyr RTOS, managed through the `west` meta-tool, which provides a robust, scalable, and secure environment for IoT development. The repository includes configurations for various libraries such as LVGL for the color display, LittleFS and FatFS for file system management, and TinyCrypt for security.

For those who prefer alternative environments, the kit also supports the traditional nRF5 SDK and even ships with a Python interpreter firmware for rapid scripting and testing. This multi-language support makes it accessible to both low-level firmware engineers and high-level application developers.
