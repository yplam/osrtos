---
title: OpenC6 BIOS
summary: OpenC6 BIOS is an advanced modular firmware platform for the ESP32-C6 RISC-V
  microcontroller that implements a PC-like architecture by decoupling hardware initialization
  from application logic. Built on FreeRTOS and the ESP-IDF framework, it provides
  a standardized System Call Interface (ABI) for executing bare-metal payloads, a
  management engine running on the LP-Core coprocessor, and support for network-based
  booting and OTA updates.
slug: openc6-bios
codeUrl: https://github.com/Rompass/openc6-bios
version: v1.0.1
lastUpdated: '2026-07-04'
licenses:
- MIT
image: /202607/openc6-bios_0.avif
rtos: freertos
libraries:
- lwip
topics:
- bios
- bootloader
- embedded
- esp-idf
- esp32-c6
- firmware
- riscv
isShow: true
createdAt: '2026-07-15T05:07:49+00:00'
updatedAt: '2026-07-15T05:07:49+00:00'
relatedProjects:
- highboy-firmware
- esp32-risc-v-bare-metal-sdk
- openmmc
- apache-nuttx-rtos-for-pine64-star64
- yaota8266-ota-bootloader
- multizone-iot-sdk
---

OpenC6 BIOS is an open-source, high-performance modular platform designed specifically for the ESP32-C6 (RISC-V) microcontroller. It shifts the traditional monolithic firmware paradigm toward a more server-like architecture by acting as a host platform that decouples hardware initialization from application logic. This allows developers to hot-swap, download, and execute bare-metal payloads directly into RAM or Execute-In-Place (XIP) Flash through a standardized System Call Interface (ABI).

## Visual Demos and Capabilities

The project features several sophisticated interfaces that demonstrate its capabilities beyond standard microcontroller firmware. 

### Retro Web Setup Utility
The system includes a nostalgic, classic PC BIOS interface accessible via local Wi-Fi. This utility runs at a native-looking 1280x1024 5:4 resolution and allows for high-level hardware configuration.


### Micro UNIX Shell
For low-level interaction, OpenC6 provides an interactive file system explorer. Users can inspect, read, write, and execute files directly on a custom log-structured flash file system through a serial terminal.

![OpenC6 UNIX Shell](/202607/openc6-bios_1.avif)

### Wireless BIOS Firmware Update (OTA)
The platform supports safe wireless BIOS flashing over Wi-Fi, utilizing hardware A/B partition rollback protection to ensure the system remains bootable even if an update fails.

![OpenC6 BIOS Update](/202607/openc6-bios_2.avif)

## Key Architectural Features

OpenC6 is built on several advanced subsystems that provide stability and flexibility:

*   **LP-Core Management Engine (ME):** An autonomous out-of-band RISC-V coprocessor that monitors system health, manages the power button logic, and handles hardware Watchdogs. It can trigger emergency thermal shutdowns even if the main processor crashes.
*   **SchedUtil Dynamic Governor:** A real-time load-adaptive CPU frequency scaling system that adjusts the clock between 80, 120, and 160 MHz based on FreeRTOS idle cycles.
*   **Network Boot (PXE):** The ability to dynamically fetch and execute bare-metal payloads over Wi-Fi, eliminating the need for physical USB tools and reducing flash memory wear.
*   **Standardized ABI:** Payloads can be compiled without the full ESP-IDF framework, resulting in lightweight binaries (2-10 KB) that still have access to BIOS-provided Wi-Fi, math, and crypto engines.
*   **Log-Structured Circular File System (openc6_fs):** A custom chunk-based file system designed for flash longevity, supporting dynamic wear leveling and files larger than a single sector.

## Hardware Implementation

The platform is optimized for the ESP32-C6-Zero and generic C6 modules. It utilizes specific GPIO pins for BIOS-like physical interactions:

*   **Power Button (GPIO 4):** Supports short clicks for booting, 3-second holds for Setup, and 5-second holds for hard resets.
*   **BOOT Button (GPIO 9):** Used to enter the interactive Boot Menu during startup.
*   **POST LED (GPIO 8):** An addressable RGB LED used for Aura Sync effects and diagnostic POST codes.
*   **Clear CMOS (GPIO 2):** Shorting this pin during boot resets the NVRAM to factory defaults.

## Getting Started

To deploy OpenC6 BIOS, developers use the ESP-IDF (v6.1-dev) toolchain. The build process involves flashing the core BIOS firmware and then compiling bare-metal payloads using the provided tools. Payloads are typically built as RISC-V binaries that interact with the BIOS via the UART Serial Loader or via network protocols.

### Network Booting and OTA Updates

One of the most powerful features of OpenC6 is the ability to manage the system entirely over Wi-Fi. By running a simple HTTP server on a local PC, users can:

1.  **Network Boot (PXE):** Download a payload into Flash and execute it without a physical connection.
2.  **Wireless BIOS Update:** Reflash the core `openc6_bios.bin` using hardware A/B partition rollback protection. If the new BIOS version fails to boot, the LP-Core Watchdog triggers a hardware reset, and the ESP32 bootloader automatically rolls back to the previous stable version.

## Ongoing Development

The project is actively evolving with a focus on porting the platform to the high-performance ESP32-P4. Other roadmap items include a custom zRAM implementation for RISC-V to expand SRAM execution memory and the addition of SHA256 checksum verification for all payload transfers to ensure security and execution integrity.
