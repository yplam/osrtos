---
title: BreadboardOS
summary: BreadboardOS is a firmware platform for the Raspberry Pi RP2xxx family designed
  for rapid prototyping with a focus on a command-line interface. Built on FreeRTOS,
  it integrates the LittleFS filesystem and microshell to provide a POSIX-like environment
  for interacting with hardware peripherals and managing system tasks.
slug: breadboardos
codeUrl: https://github.com/mcknly/breadboard-os
version: v0.4
lastUpdated: '2025-02-25'
licenses:
- MIT
rtos: freertos
libraries:
- littlefs
- lwip
topics:
- arm
- cli
- command-line-interface
- embedded
- firmware
- freertos
- mcu
- microcontroller
- raspberry-pi-pico
- rp2040
- rp2040w
- rp2350
- rtos
isShow: false
createdAt: '2026-04-01T01:29:24+00:00'
updatedAt: '2026-04-01T01:29:24+00:00'
---

BreadboardOS (BBOS) is a specialized firmware platform designed to streamline the transition from a messy breadboard prototype to a functional embedded system. At its core, BBOS is built on the philosophy that every project should start with a Command Line Interface (CLI). By providing a recognizable, POSIX-style shell from the outset, developers can debug, test, and interact with hardware peripherals without needing to write custom UI code or serial parsers for every new project.

## The CLI-First Philosophy

The central component of BreadboardOS is its integration of the microshell project. This provides a robust terminal interface that allows users to navigate the microcontroller's hardware as if it were a filesystem. Developers can check system resources using familiar commands like `ps`, `top`, `free`, and `df`. This transparency is invaluable during the early stages of development when monitoring memory leaks or task stack usage is critical.

Beyond just monitoring, the CLI serves as a direct interface to the hardware. BBOS allows for interacting with chip I/O and serial buses directly from the command line, enabling quick verification of external sensors or actuators before a single line of application-specific code is written.

## Built on a Solid Foundation

BreadboardOS is built on top of FreeRTOS, which provides the multitasking capabilities necessary for modern embedded applications. This allows the system to run various "services"—essentially standalone FreeRTOS tasks—concurrently. The architecture is modular, meaning networking, filesystem management, and user applications run as independent services that can be dynamically controlled at runtime through a task manager.

For persistent storage, the platform integrates LittleFS, a fail-safe filesystem designed specifically for microcontrollers. This enables wear-leveling on the onboard flash and provides a structured way to store configuration files, logs, or web assets for the built-in dashboard.

## Hardware Support and Portability

Currently, BreadboardOS targets the Raspberry Pi RP2xxx family, including the Pico, Pico W, and the newer Pico 2 (RP2350). While the initial implementation is specific to the Raspberry Pi silicon, the project structure is designed with portability in mind. All hardware-specific code is isolated within a dedicated directory, utilizing a header-based Hardware Abstraction Layer (HAL) to simplify porting to other MCU architectures in the future.

For networked projects, BBOS includes WiFi support and an HTTP server. This allows developers to build project dashboards that can be accessed via a browser, making it easier to visualize data or control the system remotely.

## Developing with BreadboardOS

Creating an application on BreadboardOS involves defining new services. These services are structured to be easily integrated into the existing system. A typical service implementation, such as a heartbeat LED or a sensor monitor, follows a standard pattern defined in the project's service headers. 

Configuration is handled through a central `project.cmake` file, where developers can define the project name, version, and hardware parameters:

```cmake
# PROJECT NAME - in quotes, no spaces
set(PROJ_NAME "my-bbos-proj")

# CLI INTERFACE - 0: use UART for CLI (default), 1: use USB for CLI
set(CLI_IFACE 0)

# MCU PLATFORM - set the MCU platform being used
set(PLATFORM rp2xxx)

# BOARD - set the board being used (e.g., pico2)
set(BOARD pico2)

# HOSTNAME - hostname for CLI prompt and network connections
set(HOSTNAME "bbos")
```

By leveraging this pre-built infrastructure, developers can focus on their specific application logic rather than reinventing the wheel for task scheduling, shell interfaces, or filesystem management.
