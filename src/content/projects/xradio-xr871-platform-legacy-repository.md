---
title: Xradio XR871 Platform Legacy Repository
summary: A legacy development repository for the Xradio XR871 WiFi SoC platform. It
  provides the original Software Development Kit (SDK), Hardware Development Kit (HDK),
  and MCU support files for building wireless IoT applications on ARM Cortex-M hardware.
slug: xradio-xr871-platform-legacy-repository
codeUrl: https://github.com/XradioTech/XR871-OLD
siteUrl: https://github.com/XradioTech/xradiotech-wiki/wiki
star: 104
version: xr871-sdk-rev1.4.0
lastUpdated: '2019-04-30'
rtos: freertos
libraries:
- lwip
topics:
- allwinner
- cortex-m4f
- freertos
- mcu
- sdk
- wifi
- xr871
- xradiotech
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- kendryte-k210-freertos-sdk
- ameba-rtos-sdk
- ameba-freertos-pro2-sdk
- nuclei-software-development-kit-nuclei-sdk
- eclipse-threadx-iot-devkit-starter-application
- esp8266-rtos-software-development-kit-sdk
---

## Overview

The XR871-OLD repository is a comprehensive collection of development resources for the Xradio XR871, a highly integrated wireless System-on-Chip (SoC). Designed primarily for the Internet of Things (IoT), the XR871 combines an ARM Cortex-M core with a robust 802.11b/g/n WLAN subsystem. This repository serves as a historical reference and a foundation for developers working with legacy implementations of the XR871 platform.

As a complete platform repository, it encompasses everything from low-level hardware abstraction layers to high-level application frameworks. While Xradio has since moved active development to newer SDK repositories, this legacy codebase remains a vital resource for maintaining existing products and understanding the architectural evolution of the XR871 series.

## Repository Structure

The project is organized into several distinct modules, each targeting a specific phase of the embedded development lifecycle:

- **01_MCU**: This directory contains the Microcontroller Unit support files, including startup code, linker scripts, and hardware abstraction layers (HAL) specific to the XR871's ARM Cortex-M architecture.
- **02_HDK**: The Hardware Development Kit provides essential resources for PCB design and hardware integration, ensuring that the SoC is correctly implemented in physical circuit designs.
- **03_SDK**: The Software Development Kit is the heart of the repository. It typically includes the RTOS kernel (FreeRTOS), the TCP/IP stack (lwIP), and various middleware components required for wireless connectivity and peripheral management.
- **04_AVL**: The Adherent Vendor List or similar validation resources, often used for tracking compatible components and peripheral modules.
- **05_TOOLS**: A suite of utility programs used for firmware compilation, image generation, and flashing the SoC over serial or JTAG interfaces.
- **06_REPORTS**: Documentation and verification reports related to the platform's performance and compliance testing.

## Technical Capabilities

The XR871 platform is engineered for low-power, high-performance wireless networking. By utilizing FreeRTOS, the system provides a preemptive multitasking environment that allows developers to manage complex network operations alongside real-time sensor data acquisition. The integration of the lwIP (lightweight IP) stack ensures that the device can handle standard internet protocols with minimal memory overhead, making it ideal for battery-powered IoT devices.

Key technical features supported by this platform include:
- **WiFi Connectivity**: Full support for station (STA) and Access Point (AP) modes.
- **Power Management**: Advanced sleep modes to extend battery life in remote sensing applications.
- **Security**: Hardware-accelerated encryption for secure communication over TLS/SSL.
- **Peripheral Richness**: Drivers for GPIO, PWM, I2C, SPI, and UART interfaces to interact with a wide array of external sensors and actuators.

## Transitioning to Modern SDKs

While this repository provides a stable snapshot of the original XR871 environment, XradioTech recommends that new projects utilize the updated SDKs. The newer repositories, such as the XR871SDK and XR809SDK, include updated security protocols, bug fixes, and improved power consumption profiles. However, for developers tasked with maintaining legacy firmware or porting older applications, the XR871-OLD repository remains the definitive source for the platform's original logic and hardware interface definitions.

For detailed technical guides, register maps, and hardware specifications, developers should consult the official XradioTech Wiki, which provides extensive documentation for the entire XR series of wireless SoCs.
