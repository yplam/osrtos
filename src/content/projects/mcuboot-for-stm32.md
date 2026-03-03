---
title: MCUboot for STM32
summary: A secure bootloader for 32-bit microcontrollers, specifically modified by
  STMicroelectronics for integration with the STM32Cube ecosystem. It provides a common
  infrastructure for flash layout, secure boot, and software upgrades on STM32 SoCs.
  This version includes hardware-specific optimizations for AES, SAES, and public
  key accelerators.
slug: mcuboot-for-stm32
codeUrl: https://github.com/STMicroelectronics/stm32-mw-mcuboot
siteUrl: http://mcuboot.com/
star: 56
version: v1.7.2.39
lastUpdated: '2026-02-20'
rtos: ''
libraries:
- mcuboot
topics:
- boot
- bootloader
- middleware
- middleware-library
- secure
- secure-boot
- stm32
- stm32cube-mcu-component
isShow: false
createdAt: '2026-03-03'
updatedAt: '2026-03-03'
---

## Overview

MCUboot for STM32 is a specialized fork of the popular open-source MCUboot project, maintained by STMicroelectronics. It serves as a secure bootloader designed specifically for 32-bit microcontrollers, providing a robust infrastructure for system flash layout and secure software updates. While the core of MCUboot is hardware-independent, this repository contains the necessary porting layers and optimizations required to integrate seamlessly with STM32Cube development software and STM32 SoCs.

The primary goal of the project is to ensure that only authenticated and integrity-checked firmware is allowed to execute on the target hardware. It manages the complex process of image validation, swapping, and rollbacks, which are critical for reliable field updates (OTA).

## Key Features and Capabilities

As a security-focused middleware, this implementation includes several enhancements tailored for the STM32 ecosystem:

- **Secure Boot & Image Validation**: Uses cryptographic signatures to verify firmware images before execution.
- **Flexible Upgrade Strategies**: Supports various upgrade modes, including swap-based updates (where the old and new images are exchanged) and overwrite modes.
- **Hardware Acceleration**: STMicroelectronics has integrated support for on-chip hardware accelerators, such as AES, SAES (Secure AES), and PKA (Public Key Accelerator), to speed up cryptographic operations and reduce boot time.
- **Countermeasures & Robustness**: The implementation includes security reinforcements against common attacks, such as randomization of AES buffers and improved installation robustness.
- **Compatibility with STM32Cube**: Designed to work alongside STM32Cube HAL and LL drivers, ensuring a consistent development experience for STM32 users.

## Technical Architecture

The repository is organized to separate the core bootloader logic from the hardware-specific implementation:

- **boot/bootutil**: This directory contains the core logic of MCUboot. It handles the state machine for image upgrades, slot management, and the verification API.
- **bl2**: Contains the Second Stage Bootloader (BL2) implementation, often used in conjunction with Trusted Firmware-M (TF-M) on modern STM32 devices.
- **scripts/imgtool**: A Python-based utility used to sign, encrypt, and package firmware images into the format required by the bootloader.

## STMicroelectronics Enhancements

ST has significantly modified the upstream MCUboot to better utilize STM32-specific security features. Recent updates have introduced support for:

- **MCE (Memory Construction Engine)**: Enhancing memory protection and encryption.
- **OEMuRoT and OEMiROT**: Support for OEM Root of Trust features found in newer STM32 families like the H7RS.
- **Encrypted Security Counters**: Preventing version rollbacks using secure hardware counters.
- **Fault Injection Hardening (FIH)**: Using RNG-based delays and error handler branching to mitigate physical fault injection attacks.

## Getting Started

When using this middleware, it is crucial to ensure version compatibility with the specific STM32Cube firmware package for your target MCU. Documentation for the core bootloader logic is located within the `boot/bootutil` directory, while ST-specific release notes and modification details are maintained in `st_readme.txt`.

Developers typically use the provided `imgtool` script to prepare their application binaries. This involves generating cryptographic keys, signing the binary, and optionally encrypting it if the target hardware supports encrypted image execution. The bootloader itself is then compiled and flashed to the beginning of the internal flash memory, where it takes control upon system reset to manage the application lifecycle.
