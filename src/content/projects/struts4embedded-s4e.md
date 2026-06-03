---
title: Struts4Embedded (S4E)
summary: An MVC framework for embedded systems that mimics Java's Struts 1.0 architecture
  to decouple model, view, and controller logic. Built specifically for ChibiOS RTOS,
  it provides a structured pattern for developing scalable and maintainable IoT applications
  on STM32 microcontrollers.
slug: struts4embedded-s4e
codeUrl: https://github.com/abusous2000/Struts4Embedded
star: 4
version: S4EChibiOS2030Final
lastUpdated: '2023-06-06'
rtos: chibios-rt
libraries:
- lwip
- sqlite
topics:
- chibios
- embedded
- esp8266
- fatfs
- mp3-player
- mqtt-broker
- mvc-architecture
- node-red
- stm32f4-discovery
- stm32f746g-discovery
- stm32f769i
- ui-dashboard
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-framework
- arm-control-framework-acorns-rover
- stm32-rtic-project-template
- iot-framework-for-nodemcu
- chibios
- mbed-os-6-stm32-iot-ethernet-controller
---

## Overview

Struts4Embedded (S4E) is an innovative Model-View-Controller (MVC) framework designed specifically for the embedded systems domain. It draws heavy inspiration from Apache Struts 1.0, a framework that revolutionized Java web development nearly two decades ago. By bringing these high-level architectural patterns to the world of microcontrollers, S4E aims to decouple data structures (Model) from user interfaces (View) and business logic (Controller).

This decoupling is particularly beneficial for complex IoT projects, as it results in codebases that are faster to market, easier to manage, and significantly more scalable than traditional monolithic embedded firmware. Currently, the framework is tightly integrated with the ChibiOS RTOS, leveraging its robust threading and synchronization primitives.

## Core Architecture

The framework is built around a command-pattern-like architecture using actions and events. These are statically predefined for each project and triggered by sending events to a mailbox (queue). Dedicated worker threads then consume these events and execute the corresponding actions. This design ensures that senders and consumers are loosely coupled, which is a significant departure from the tightly bound interrupt-to-logic patterns often found in simpler embedded projects.

Key architectural components include:
- **ActionEvents**: Predefined logic blocks that respond to system triggers.
- **Mailboxes**: ChibiOS-based inter-thread communication for event queuing.
- **Worker Threads**: Decoupled execution units that handle business logic without blocking the main system or UI.

## Supported Hardware and Integration

S4E has been extensively tested across a wide range of STM32 development boards, including:
- STM32F407 Discovery and Blackboard
- STM32F746 and STM32F769i Discovery boards
- Nucleo boards (F446re, F429zi, F746zg)
- Seeed Arch Max 1.1

The framework is designed to be independent of specific third-party libraries, though it provides helper modules for common embedded needs such as FATFS (via SDIO/SPI), ADC, I2C (SSD1306 OLED), and networking stacks like lwIP for MQTT communication.

## Proof of Concept Use Cases

The repository includes several sophisticated use cases to demonstrate the framework's versatility:

1.  **IoT Dashboard**: Reading potentiometer values and transmitting them as JSON via MQTT to a Node-Red instance, with data persistence in stores like SQLite3 or Elasticsearch.
2.  **MP3 Player**: A full-featured player using the STM32F769i, controllable via a Node-Red UI, a RESTful web service on an ESP8266, or a local uGFX-based GUI.
3.  **Sensor Fusion**: Reading MPU6050 accelerometer and gyroscope data and plotting the results in real-time on a remote dashboard.

## Technical Implementation

The core of the framework is remarkably lightweight, with the primary execution thread logic residing in under 250 lines of C code. It utilizes ChibiOS features such as PAL (Port Abstraction Layer), Mailboxes, and Semaphores to manage concurrency. For developers preferring modern C++, the project also supports compilation with C++ and STL templates, though this increases the binary footprint.

Configuration is handled through board-specific header files (e.g., `Struts4EmbeddedConf.h`), allowing developers to easily include or exclude modules like IR receivers, eByte Lora modules, or PPM frame decoders for RC controls.
