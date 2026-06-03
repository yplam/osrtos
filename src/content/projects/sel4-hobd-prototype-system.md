---
title: seL4 HOBD Prototype System
summary: A prototype Honda On-Board Diagnostics (HOBD) system built on the seL4 microkernel
  for the Sabre Lite IMx6 platform. It manages ECU diagnostic connections, logs data
  to an SD card, and provides a multi-threaded console interface for real-time system
  interaction.
slug: sel4-hobd-prototype-system
codeUrl: https://github.com/jonlamb-gh/sel4-hobd-prototype
siteUrl: https://sel4.systems/
star: 2
version: 0.0.9
lastUpdated: '2018-07-22'
rtos: sel4
topics:
- sel4
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rust-sel4-toy-system-for-i-mx6-sabre-lite
- motolink
- sel4-kernel-ega-text-display
- fel4-test-project
- advanced-operating-system-2017-sos
- breadboardos
---

## Overview

The seL4 HOBD Prototype is an embedded system designed to interface with Honda CBR Engine Control Units (ECUs) using the HOBD protocol. Built on the high-assurance seL4 microkernel, the project demonstrates a secure and modular approach to automotive diagnostics. The system is specifically targeted at the Sabre Lite IMx6 platform, utilizing its quad-core ARM Cortex-A9 architecture to handle concurrent tasks such as data logging, communication, and user interaction.

## System Architecture and Multicore Support

The project leverages the SMP (Symmetric Multiprocessing) capabilities of seL4. By default, it is configured to utilize four cores, matching the hardware specifications of the IMx6 Quad. Thread affinity is carefully managed to distribute workloads across these cores, ensuring that time-critical diagnostic communications are not delayed by background logging or console tasks.

The system is composed of several distinct threads, each serving a specific role:
- **hobd-comm**: Manages the K-line communication with the Honda ECU.
- **mmc**: Handles file operations and data logging to the SD card.
- **console**: Provides an interactive command-line interface for the user.
- **time-server**: Manages system timing and metrics.
- **sys**: Handles general system management and monitoring.

## Diagnostic Capabilities

The core functionality revolves around the HOBD protocol, which allows the system to request and receive diagnostic data from the motorcycle's ECU. The project includes a `fake-hobd-ecu-data` tool for testing, which simulates the ECU's state machine—transitioning from wakeup to diagnostic initialization and finally to an active listening state where data packets are exchanged.

Data captured from the ECU is logged to an SD card via the MMC module. Users can interact with this process through the built-in console, which supports commands to enable or disable logging, check file sizes, and delete log entries. This modularity allows the diagnostic engine to run independently of the user interface, a key benefit of the microkernel architecture.

## Hardware and GPIO Configuration

The prototype is designed for the Sabre Lite (i.MX6) development board. It utilizes specific GPIO mappings for UART communication, which is essential for the K-line interface. The README provides detailed pin multiplexing information, such as mapping `SD3_DAT7` and `SD3_DAT6` to `UART1_TX_DATA` and `UART1_RX_DATA` respectively. This level of hardware-specific configuration is crucial for developers looking to port the system to similar i.MX6-based hardware.

## Development and Simulation

For developers without immediate access to the hardware, the project supports simulation via QEMU. The build system includes scripts to apply necessary patches and compile the kernel and user-space components. The simulation environment can be configured to forward serial data to a telnet port, allowing developers to send binary hex data to the HOBD communication module as if it were coming from a physical ECU.

## Interactive Console

Upon booting, the system drops into a custom console (`IRin`). This interface provides a suite of commands for system introspection and control:
- `help`: Displays available commands.
- `stats` / `info`: Provides module metrics and scheduler information.
- `mmc`: Sub-commands for managing the SD card logging state and file operations.
- `hobd`: Sub-commands to toggle the K-line communication and check status.

This prototype serves as a robust foundation for building secure, real-time automotive applications where isolation between the communication stack and the logging system is paramount.
