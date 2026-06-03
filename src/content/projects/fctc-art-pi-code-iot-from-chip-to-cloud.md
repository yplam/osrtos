---
title: 'FCTC-ART-Pi-Code: IoT From Chip To Cloud'
summary: A collection of firmware examples for the ART-Pi development board based
  on RT-Thread, covering the full IoT stack from hardware peripherals to cloud connectivity.
  It includes implementations for LVGL graphics, Modbus communication, file systems,
  and MQTT integration with Alibaba Cloud.
slug: fctc-art-pi-code-iot-from-chip-to-cloud
codeUrl: https://github.com/luhuadong/FCTC-ART-Pi-Code
star: 5
lastUpdated: '2022-04-18'
rtos: rt-thread
libraries:
- lvgl
topics:
- embedded
- iot
- maker
- rt-thread
- rtos
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp32-freertos-examples
- that-project
- ft900-iot-and-smart-home-framework
- mongoose-os-samples-for-esp32
- e-yantra-iot-workshop
- 100askteam-elinux-code-library
---

## Overview

FCTC-ART-Pi-Code is a comprehensive repository designed to guide developers through the journey of building IoT applications from the ground up—starting from the silicon and reaching into the cloud. The project centers on the **ART-Pi**, a high-performance development board powered by the STM32H750 micro-controller and the RT-Thread real-time operating system. 

This repository serves as a practical companion for learning embedded IoT development, providing a structured set of firmware examples that progress from basic hardware control to complex cloud-integrated systems.

## Hardware and Platform

The project targets the ART-Pi, which is the official development board of the RT-Thread community. It features an STM32H750XBH6 SoC, offering high-speed processing capabilities suitable for demanding tasks like graphical user interfaces and complex network stacks. The examples leverage various onboard peripherals, including:

- **Connectivity**: Onboard WiFi for internet access.
- **Storage**: SD card slots and SPI Flash for persistent data storage.
- **Display**: Support for LCD screens to run graphical interfaces.
- **Industrial Interfaces**: RS-232 and RS-485 for industrial sensor integration.

## Firmware Examples

The repository is organized into several chapters, each focusing on a specific aspect of embedded systems development:

- **Basic Peripherals**: Initial examples cover standard "Hello World" routines and GPIO (Pin) device operations to familiarize users with the RT-Thread device driver model.
- **Sensor Integration**: Demonstrations of data acquisition from various sensors, including those using standard serial protocols like RS-232.
- **Industrial Protocols**: Implementation of RS-485 communication using the Modbus protocol, essential for industrial automation and remote monitoring.
- **Data Management**: Examples showing how to implement file systems on SD cards and SPI Flash, enabling data logging and configuration storage.
- **User Interface**: Integration of the **LVGL** (Light and Versatile Graphics Library) to create modern, responsive graphical user interfaces on embedded displays.
- **Networking and Cloud**: Advanced examples covering WiFi connectivity, HTTP client/server implementations, and MQTT protocols to connect the device to the Alibaba Cloud (Aliyun) IoT platform.
- **System Maintenance**: A dedicated OTA (Over-the-Air) bootloader project is included to demonstrate how to perform remote firmware updates safely.

## Technical Implementation

The project is built upon the **RT-Thread RTOS**, utilizing its modular architecture and extensive software package ecosystem. By using the RT-Thread device framework, the code remains portable and follows a consistent API for interacting with different hardware components. The inclusion of networking stacks and middleware like Modbus and LVGL showcases the power of using a full-featured RTOS for modern IoT development, where multitasking and protocol handling are critical.
