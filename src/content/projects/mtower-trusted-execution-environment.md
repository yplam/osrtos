---
title: mTower Trusted Execution Environment
summary: mTower is a Trusted Execution Environment (TEE) specifically designed for
  size-constrained IoT devices based on ARM Cortex-M23 and RISC-V architectures. It
  provides a security framework based on Global Platform API standards, supporting
  secure boot and protected application execution.
slug: mtower-trusted-execution-environment
codeUrl: https://github.com/Samsung/mTower
star: 66
version: v0.6.0
lastUpdated: '2025-05-16'
rtos: freertos
topics:
- bootloader
- cortex-m23
- freertos
- gcc
- iot
- m2351
- makefile
- microcontroller
- numaker-pfm-m2351
- nuvoton
- risc-v
- secure
- smarthome
- trusted-execution-environment
- trustzone
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- multizone-iot-sdk
- multizone-security-tee-for-risc-v
- fwrisc-featherweight-risc-v-core
- cortex-m33-trustzone-experiments-on-qemu-an505
- mongoose-os
- libedhoc
---

## Overview

mTower is an open-source Trusted Execution Environment (TEE) tailored for the next generation of secure IoT devices. While traditional TEEs like OP-TEE are designed for powerful Application Processors (Cortex-A), mTower focuses on the resource-constrained world of microcontrollers, specifically those utilizing ARM Cortex-M23/M33 TrustZone technology and RISC-V architectures. 

By providing a secure foundation pre-embedded into the MCU, mTower allows module developers to leverage a standardized SDK based on Global Platform API standards. This ensures that security features—such as cryptographic operations, secure storage, and isolated execution—can be added to IoT solutions without reinventing the underlying security architecture.

## Technical Architecture and Boot Process

The mTower system is structured around a multi-stage boot process and a clear separation between the Secure World and the Normal World. The configuration is managed via a Kconfig system, similar to the Linux kernel or NuttX, allowing developers to toggle features and optimization levels.

**The boot sequence typically involves:**
- **BL2 (Bootloader 2):** The secondary bootloader responsible for initializing the system.
- **BL32 (Secure Handler):** The secure world runtime that manages Trusted Applications (TAs) and handles security requests.
- **BL33 (Normal World):** The non-secure environment, which in mTower typically runs FreeRTOS to manage standard application tasks.

This architecture ensures that even if the primary application (running in the Normal World) is compromised, the sensitive data and cryptographic keys held within the Secure World (mTower) remain protected.

## Hardware and Platform Support

mTower is designed to be portable across various modern embedded architectures. It currently supports several development platforms, including:

- **NuMaker-PFM-M2351 & M2351-Badge:** Featuring the ARM Cortex-M23 with TrustZone.
- **V2M-MPS2:** An ARM Cortex-M33 target supported via QEMU emulation.
- **SparkFun RED-V RedBoard & Pine64 Ox64:** Demonstrating support for the RISC-V architecture.

The project includes a structured approach to adding new platforms, utilizing a `PLATFORM` flag in the build system to manage hardware-specific abstractions in the `arch/` directory.

## Key Features

- **Standardized APIs:** Adheres to Global Platform standards, making it easier for developers familiar with mobile or server-side TEEs to transition to embedded security.
- **Memory Efficiency:** Optimized for microcontrollers where RAM and Flash are at a premium.
- **Integrated Crypto:** Includes a dedicated crypto directory for managing secure cryptographic operations.
- **Configurability:** Uses Kconfig for granular control over debug levels, optimization, and subsystem inclusion.
- **Documentation Support:** Includes a Doxyfile for generating API documentation directly from the source code.

## Getting Started

The build system is based on GNU Make. To get started, a developer typically configures the environment for a specific platform and then builds the secure and non-secure binaries. The project provides a `create_context` target to initialize the build environment based on a platform's default configuration. Documentation can be generated locally using the `make docs_gen` command, providing a detailed reference for the internal TEE APIs and client-side interfaces.
