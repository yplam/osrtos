---
title: Beremiz4uC
summary: Beremiz4uC is a real-time runtime environment that executes Beremiz IDE PLC
  programs on STM32F4 microcontrollers using Zephyr RTOS. It features dynamic code
  loading via udynlink, eRPC-based communication, and flexible I/O management for
  industrial control applications.
slug: beremiz4uc
codeUrl: https://github.com/nandibrenna/Beremiz4uC
lastUpdated: '2024-03-22'
licenses:
- Apache-2.0
image: /202605/Beremiz4uC_0.avif
rtos: zephyr
libraries:
- littlefs
topics:
- automation
- beremiz
- dynamic-code-loading
- iec2c
- iec61131-3
- industrial-automation
- matiec
- open-source-plc
- openplc
- plc
- plc-programming
- plcopen
- stm32f4
- udynlink
- zephyr-rtos
isShow: true
createdAt: '2026-05-07T12:16:06+00:00'
updatedAt: '2026-05-07T12:16:06+00:00'
relatedProjects:
- esp-4diac-forte-library
- dynamic-app-loading-for-cortex-m
- stm32h743zi-rust-playground
- micropython-port-for-rt-thread
- stm32f429-rtic-and-smoltcp-example-application
- rt-thread-art-arduino-rt-thread
---

Beremiz4uC bridges the gap between the Beremiz Open Source IDE for IEC 61131-3 PLC programming and high-performance microcontrollers. By leveraging the Zephyr RTOS, this runtime environment provides a robust foundation for executing industrial control logic on ARM Cortex-M hardware, specifically targeting the STM32F4 series. It enables developers to transform standard development boards into functional PLCs capable of running complex automation sequences.

### Architecture and Connectivity

The system architecture relies on several sophisticated components to enable dynamic PLC functionality. At its core, the environment utilizes the eRPC (Embedded Remote Procedure Call) library to facilitate communication between the Beremiz IDE on a PC and the embedded target. This connection allows the IDE to interact with the runtime through a custom target extension without requiring core modifications to the IDE itself. 

To handle the execution of PLC logic, the project integrates a dynamic linker module known as `udynlink`. This is a critical feature for industrial environments, as it allows the system to load and execute compiled PLC programs dynamically from storage. Instead of performing a full firmware reflash for every logic update, users can simply provide a new binary, which the runtime links and executes on the fly.

### Hardware and I/O Management

The primary target platform is the "Industrial Control STM32F407VET6 Development Board" (JZ-F407VET6), which features an STM32F407VET6 MCU with 512 kB Flash and 192 kB RAM. The project also supports network connectivity via the W5500 Ethernet controller, making it suitable for networked industrial applications. 

I/O flexibility is a core focus, with support for different hardware configurations. Users can choose between direct STM32 GPIO control or expanded I/O via I2C, depending on the specific requirements of their control hardware. These settings are easily toggled through the Zephyr Kconfig system. For debugging and manual intervention, a shell interface is provided via USART6, offering a suite of commands to monitor PLC execution and system status.

### Storage and Program Execution

Storage is managed through Zephyr's filesystem abstraction, supporting both LittleFS and FATFS. This allows the runtime to interact with SD cards for program storage and data logging. A typical workflow involves starting the system with a FAT32-formatted SD card, which the runtime uses to create a dedicated directory structure. A compiled PLC program, typically named `plc.bin`, is then placed in the appropriate directory for the runtime to load.

While currently in a pre-alpha development stage, Beremiz4uC demonstrates a powerful path toward open-source industrial automation. It combines the modularity and hardware abstraction of Zephyr with the standard-compliant programming environment of Beremiz, offering a modern, transparent alternative to proprietary PLC runtimes.
