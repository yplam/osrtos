---
title: OpenBLT Bootloader
slug: openblt
summary: OpenBLT is a highly customizable, open-source bootloader designed for 8-bit,
  16-bit, and 32-bit microcontrollers to facilitate firmware updates without specialized
  debugger hardware. It utilizes the standardized ASAM MCD-1 XCP protocol for communication
  and supports a wide range of interfaces including CAN, RS232, USB, and TCP/IP, complemented
  by cross-platform host utilities for Windows and Linux.
codeUrl: https://github.com/feaser/openblt
siteUrl: https://www.feaser.com
star: 872
version: openblt_v012101
lastUpdated: '2026-03-23'
components:
- Bootloader
- GUI
- FileSystem
- Network
- TCP
- USBDevice
- CAN
- CANFD
- OTA
- Cryptography
- MemoryEncryption
- CodeSigning
platforms:
- ARM Cortex-M
- HCS12
- TriCore
- ARM
- Windows
- Linux
- POSIX
- x86
- x86_64
licenses:
- GPL-3.0
libraryType: Bootloader
createdAt: '2025-12-23'
updatedAt: '2026-03-27'
---

### Features


- Supports firmware updates over RS232, CAN, CAN FD, USB, and TCP/IP interfaces.

- Implements the standardized ASAM MCD-1 XCP version 1.0 protocol for master-slave communication.

- Enables standalone firmware updates directly from a locally attached SD-card.

- Provides a modular architecture allowing for easy porting to new microcontroller architectures and communication peripherals.

- Includes MicroBoot, a graphical user interface (GUI) for user-friendly firmware deployment.

- Includes BootCommander, a command-line interface (CLI) for automated and scriptable updates.

- Offers LibOpenBLT, a cross-platform host library (API) for integrating bootloader functionality into custom tools.

- Features a small ROM footprint, typically ranging from 5 KB to 20 KB depending on enabled features.

- Supports a 'backdoor entry' mechanism to force bootloader activation regardless of the application state.

- Provides built-in security options including firmware encryption and improved checksum verification via add-on modules.

- Allows for data exchange between the bootloader and user application via shared RAM sections.

- Supports multi-node networks by making each microcontroller individually addressable.

- Handles Motorola S-record (S19, S28, S37) firmware file formats.

- Includes preconfigured demo programs for various popular development boards and compiler toolchains.

- Capable of updating the bootloader itself through a secondary bootloader mechanism.



### Architecture

OpenBLT is built upon a modular architectural design that separates the communication protocol, transport layer, and hardware-specific drivers. At its core, it utilizes the **ASAM MCD-1 XCP** protocol, a universal measurement and calibration standard. This master-slave architecture allows a host system (the master) to control the microcontroller (the slave) for memory erasure, programming, and verification. The target-side bootloader is designed to be extremely lightweight, with a typical ROM footprint of 5-20 KB, ensuring it fits within the constrained memory of low-end microcontrollers.

The system is divided into two primary environments: the **Target Bootloader** and the **Host Tools**. The target bootloader contains the XCP slave implementation, flash drivers, and hardware abstraction layers. The host environment includes **LibOpenBLT**, a shared library that abstracts the complexity of the XCP protocol and transport layers, providing a high-level API for tools like **MicroBoot** (GUI) and **BootCommander** (CLI). This separation ensures that the same host-side logic can be used across different communication media such as RS232, CAN, or Ethernet.

#### Core Components
- **XCP Slave Stack**: Implements the communication protocol for memory operations and security.
- **Flash/NVM Drivers**: Hardware-specific modules for erasing and programming internal or external memory.
- **Transport Layers**: Specialized modules for RS232, CAN, USB, and TCP/IP communication.
- **Backdoor Entry**: A safety mechanism that allows bootloader activation during a specific time window after reset.
- **LibOpenBLT**: A cross-platform C library providing the API for custom host tool development.

### Use Cases

This library is ideal for:

- **In-field Reprogramming**: Updating firmware on products already deployed at customer sites via standard interfaces like RS232 or CAN.
- **End-of-Assembly Line Programming**: Flashing the latest software version onto hardware at the final stage of production without debuggers.
- **Development and Prototyping**: Rapidly iterating on firmware code without the need for expensive JTAG/SWD hardware interfaces.
- **Calibration and Tuning**: Using the XCP protocol to optimize software parameters and reprogram them into non-volatile memory.
- **Standalone Updates**: Enabling end-users to update devices by simply inserting an SD-card containing the new firmware file.
- **Multi-node Networking**: Managing firmware updates for multiple microcontrollers connected on a single CAN bus or Ethernet network.

### Getting Started

To get started with OpenBLT, developers should first download the latest release package which contains the source code and preconfigured demo projects. The primary configuration point for the target bootloader is the `blt_conf.h` file, where you enable specific communication interfaces (e.g., `BOOT_COM_CAN_ENABLE`) and define hardware-specific parameters like clock speeds and pin mappings. For the host side, Windows users can use the prebuilt binaries for **MicroBoot**, while Linux users can compile the host tools using **CMake** and **GCC**.

Comprehensive documentation, including porting guides and API references, is available on the [OpenBLT Wiki](https://www.feaser.com/openblt/doku.php). For those integrating the bootloader into proprietary products, it is recommended to review the dual-licensing model to determine if a commercial license is required to maintain a closed-source codebase.
