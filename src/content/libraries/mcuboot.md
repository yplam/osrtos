---
title: MCUboot
slug: mcuboot
summary: MCUboot is a secure, OS-independent bootloader for 32-bit microcontrollers
  that provides a standardized infrastructure for system flash layout and firmware
  image management. It enables secure software upgrades through cryptographic image
  verification, robust update swap mechanisms, and hardware-assisted security features
  across multiple RTOS platforms and architectures.
codeUrl: https://github.com/mcu-tools/mcuboot
siteUrl: http://mcuboot.com/
star: 1855
version: v2.3.0
lastUpdated: '2026-03-26'
components:
- Bootloader
- SecureBoot
- OTA
- CodeSigning
- Cryptography
- Storage
- Shell
platforms:
- ARM
- ARM Cortex-M
- RISC-V
- Xtensa
- Simulator
- POSIX
licenses:
- Apache-2.0
libraryType: Bootloader
createdAt: '2025-12-12'
updatedAt: '2026-04-07'
---

### Features


- Secure bootloader functionality for 32-bit microcontrollers with image integrity and authenticity verification.

- Hardware and operating system independent architecture utilizing hardware porting layers for integration.

- Support for multiple RTOS environments including Zephyr, Apache Mynewt, Apache NuttX, RIOT, and Mbed OS.

- Core bootutil library for image management, verification, and update state tracking.

- Integrated imgtool utility for secure firmware image signing and header/TLV generation.

- Support for multiple signature algorithms including RSA-2048, RSA-3072, ECDSA-P256, and ED25519.

- Flexible flash layout management utilizing primary and secondary image slots for fail-safe updates.

- Swap-based update mechanism with support for swap-using-scratch and direct-image-upload modes.

- Serial recovery protocol (SMP) over UART or USB CDC ACM for firmware rescue and updates.

- Downgrade prevention using version numbers or security counters to block older firmware versions.

- Hardware-assisted Secure Boot and Flash Encryption support for specific SoCs like Espressif.

- Simulator environment for testing bootloader logic and regression analysis on POSIX systems.

- Support for multiple updateable images allowing independent updates of different system components.

- Watchdog timer integration to prevent boot loops during failed or hung firmware updates.

- TLV (Type-Length-Value) based image trailer for extensible metadata storage and verification.

- Support for encrypted firmware images to maintain confidentiality during transport and storage.



### Architecture

MCUboot is designed with a modular architecture that separates core bootloader logic from hardware-specific and OS-specific implementations. The core of the system is the **bootutil** library, which handles image verification, state management, and the complex logic of swapping firmware images between flash slots. This core interacts with a hardware porting layer that abstracts flash memory operations (read, write, erase) and cryptographic primitives.

The system flash layout is typically divided into multiple partitions: a bootloader partition, a primary slot (where the active image resides), a secondary slot (where update images are staged), and an optional scratch partition used for atomic image swapping. Firmware images follow a specific format consisting of a header (containing version and size info), the executable binary payload, and a trailer containing Type-Length-Value (TLV) records for cryptographic hashes and digital signatures.

#### Core Components
- **bootutil**: The central library managing image validation and the update state machine.
- **imgtool**: A Python-based utility for signing binaries and generating MCUboot-compatible image headers.
- **boot_serial**: A subsystem providing serial recovery capabilities via the Simple Management Protocol (SMP).
- **Hardware Porting Layer**: OS-specific implementations for Zephyr, Mynewt, NuttX, and others that map MCUboot requirements to platform APIs.

### Use Cases

This library is ideal for:

- **Secure Firmware Updates (OTA)**: Providing a fail-safe mechanism to download, verify, and install new firmware images over-the-air while ensuring only authorized code is executed.
- **Anti-Rollback Protection**: Preventing attackers from downgrading a device to an older, vulnerable firmware version using hardware-backed security counters.
- **Multi-Image Systems**: Managing complex devices that require independent updates for different processors or subsystems (e.g., an application core and a network core).
- **Serial Recovery**: Enabling factory or field recovery of bricked devices through a standardized serial protocol when the main application fails to boot.
- **Confidentiality in Storage**: Utilizing flash encryption and encrypted image support to protect intellectual property and sensitive data on external flash chips.

### Getting Started

To begin developing with MCUboot, developers should first define the flash partition map in their target's device tree or configuration files, ensuring slots are large enough for the intended application. The `imgtool` utility is required to sign binaries; a typical command involves `imgtool.py sign` with a specified RSA or EC private key. For Zephyr users, enabling `CONFIG_BOOTLOADER_MCUBOOT=y` in the application configuration automates much of the integration. Detailed documentation for each supported RTOS is located in the `docs/` directory of the repository, covering specific build instructions for Zephyr, Apache Mynewt, and Espressif SoCs. Developers are encouraged to use the provided simulator in the `sim/` directory for testing custom flash logic or update scenarios in a safe, virtualized environment.
