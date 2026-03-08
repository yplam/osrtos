---
title: MuditaOS
summary: MuditaOS is an open-source mobile operating system built on FreeRTOS, specifically
  optimized for devices with E Ink displays such as the Mudita Pure phone and Mudita
  Harmony alarm clock. It features a modular architecture designed for low-distraction
  environments, integrating a custom GUI framework, a hardware abstraction layer,
  and various communication stacks for cellular and Bluetooth connectivity.
slug: mudita-muditaos
codeUrl: https://github.com/mudita/MuditaOS
siteUrl: https://store.mudita.com/
star: 906
version: verkotan-v1.0
lastUpdated: '2025-09-24'
components:
- GUI
- FileSystem
- Database
- Wireless
- Audio
- Bootloader
- SecureBoot
- Cellular
- USBDevice
- Shell
- Profiling
- Scheduler
- Memory Management
- IPC
platforms:
- ARM Cortex-M
- ARM Cortex-M7
- Linux
- Simulator
- POSIX
licenses:
- GPL-3.0
- Commercial
libraries:
- FreeRTOS
- FatFS
- LittleFS
- lwext4
- SQLite
- cJSON
- Protobuf
- RE2
- BTstack
- CMSIS
- Catch2
- googletest
- pugixml
- libical
- minimp3
createdAt: '2025-12-31'
updatedAt: '2026-03-08'
---

### Features


- Optimized UI rendering engine specifically designed for high-latency E Ink displays.

- Real-time task scheduling and management based on the FreeRTOS kernel.

- Integrated Hardware Abstraction Layer (HAL) to decouple hardware-specific drivers from the core OS.

- Support for VoLTE (Voice over LTE) and cellular data tethering.

- Comprehensive Bluetooth stack supporting A2DP for audio and HFP for hands-free communication.

- Virtual File System (VFS) supporting multiple backends including lwext4 and LittleFS.

- Relational data storage using an integrated SQLite database for contacts, messages, and notes.

- Multi-format audio playback support for MP3, WAV, and FLAC files with ID3 tag indexing.

- Secure Boot capability with support for signed binary verification.

- Media Transfer Protocol (MTP) support for file synchronization with desktop environments.

- Power management system optimized for extended battery life on Cortex-M7 platforms.

- Integrated meditation timer and wellness applications with specialized audio/visual feedback.

- Support for internationalization with bitmap font generation and JSON-based localization.

- System-wide logging engine with support for RTT and UART output.

- Passive Dual SIM support for cellular connectivity management.



MuditaOS utilizes a modular, service-oriented architecture designed to run on resource-constrained embedded systems while providing a rich mobile user experience. At its core, the system leverages FreeRTOS for task scheduling and synchronization. The architecture is divided into several layers: the Board Support Package (BSP) and Hardware Abstraction Layer (HAL) manage low-level hardware interactions, while a series of 'module' directories contain the core OS services, including the Virtual File System (VFS), GUI engine, and communication managers. 

Interaction between subsystems is primarily handled through a service-based model where high-level applications (module-apps) communicate with background services (module-services) such as the Application Manager, Bluetooth Service, and Cellular Service. This separation ensures that the user interface remains responsive even during complex background operations like database synchronization or network handovers.

#### Core Components
- **Service Manager**: Manages the lifecycle of system services and application execution.
- **GUI Framework**: A custom-built graphics library optimized for the unique refresh characteristics of E Ink screens.
- **VFS Layer**: Provides a unified interface for file operations across different storage media (eMMC, SD cards) and filesystems (ext4, LittleFS).
- **Comm-Stack**: Integrated cellular and Bluetooth stacks for telephony, data, and audio streaming.

### Use Cases
This RTOS is ideal for:
- **Minimalist Mobile Devices**: Specifically designed for phones that prioritize battery life and reduced distractions through E Ink technology.
- **Smart Home Appliances**: Suitable for high-end alarm clocks or home controllers requiring a sophisticated UI and low power consumption.
- **Privacy-Focused Hardware**: Ideal for devices where an open-source, auditable OS is required to ensure user data security and offline-first operation.
- **E Ink Prototyping**: Provides a robust platform for developers looking to build complex applications on electronic paper displays.

### Getting Started
To begin development with MuditaOS, developers should clone the repository using the `--recurse-submodules` flag to ensure all third-party dependencies are included. The project provides a `bootstrap.sh` script in the `config` directory to install the necessary ARM toolchain, CMake, and Docker dependencies on Ubuntu-based systems. Once the environment is set up, the `configure.sh` script is used to generate build files for either the physical hardware (RT1051) or the Linux-based simulator. Detailed documentation for specific modules and the development workflow can be found in the `doc/` directory of the repository.
