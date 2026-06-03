---
title: MultiZone IoT SDK
summary: A secure IoT firmware SDK for RISC-V processors featuring a hardware-enforced
  Trusted Execution Environment (TEE). It provides secure access to IoT clouds, real-time
  monitoring, and remote firmware updates using components like FreeRTOS, lwIP, and
  mbed TLS.
slug: multizone-iot-sdk
codeUrl: https://github.com/hex-five/multizone-iot-sdk
siteUrl: https://hex-five.com/multizone-secure-iot-firmware-riscv/
star: 20
version: v2.2.8
lastUpdated: '2024-01-22'
rtos: freertos
libraries:
- lwip
topics:
- attestation
- digilent-arty-board
- embedded-systems
- firmware
- freertos
- iot
- lwip
- mbedtls
- mqtt
- multizone
- ota-firmware-updates
- risc-v
- root-of-trust
- secure-boot
- tcp-ip
- tee
- tls
- trusted-execution-environment
- trustzone
- xilinx-fpga
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- golioth-firmware-sdk
- golioth-zephyr-sdk
- multizone-security-tee-for-risc-v
- mtower-trusted-execution-environment
- kendryte-k210-freertos-sdk
- mongoose-os
---

## Overview

The MultiZone® IoT SDK by Hex Five Security is a comprehensive development kit designed to build secure IoT applications on RISC-V processors. At its core is the MultiZone Trusted Firmware, which provides a hardware-enforced Trusted Execution Environment (TEE). Unlike traditional security solutions that often require proprietary hardware extensions, MultiZone works with any standard RISC-V processor that supports the standard User-mode (U-mode) extension, making high-grade security accessible across the open-source hardware ecosystem.

## Key Features & Capabilities

The SDK's primary innovation is its ability to provide hardware-enforced separation, creating four independent "worlds" or zones. This isolation ensures that trusted applications are shielded from untrusted third-party libraries or potential vulnerabilities in the network stack.

**Core capabilities include:**
- **Hardware-Enforced Separation**: Utilizes RISC-V Physical Memory Protection (PMP) to isolate up to four execution zones.
- **Secure Cloud Access**: Pre-integrated support for IoT clouds via MQTT and TLS.
- **Secure Boot & Remote Updates**: Built-in mechanisms for verifying firmware integrity and deploying updates remotely.
- **Real-Time Monitoring**: Tools for kernel statistics and system health monitoring.
- **Inter-Zone Messaging**: A secure communication protocol between zones that avoids the risks of shared memory or shared stacks.

## Technical Implementation

The MultiZone IoT SDK is optimized for 32-bit and 64-bit RISC-V processors. It is frequently paired with the Hex Five X300 SoC, an enhanced version of the Berkeley E300 (Rocket rv32) designed for Xilinx Artix-7 FPGAs. 

The firmware stack is built on several industry-standard components:
- **FreeRTOS**: Used for real-time task management within specific zones.
- **lwIP (TCP/IP)**: Provides the networking foundation, enhanced with Hex Five security patches.
- **mbed TLS**: Handles SSL/ECC requirements for secure communication.
- **MQTT**: Facilitates telemetry and remote command execution.

One of the most powerful aspects of this architecture is the ability to isolate the networking stack (lwIP/TLS) in its own zone. This means a vulnerability in the TCP/IP stack cannot compromise the main application logic or the secure keys stored in a different zone.

## Hardware Support

The SDK supports several prominent hardware development kits, including:
- **Xilinx Artix-7 Arty FPGA Evaluation Kit**: Using the Hex Five X300 softcore.
- **Microchip PolarFire SoC FPGA Icicle Kit**: Leveraging native RISC-V hardware.

## Getting Started

The SDK integrates with standard development tools including the GNU RISC-V Toolchain, OpenOCD, and the Eclipse IDE. The build process is managed via a primary Makefile that coordinates the compilation of individual zones and the final assembly of the MultiZone firmware image using a specialized Java-based utility.

Once the firmware is loaded, users can interact with the system through a serial terminal. The SDK provides a set of built-in commands for testing the TEE's enforcement:

```bash
# Example commands available in the reference application
Z2 > yield    # Yield CPU to the next zone and measure loop time
Z2 > pmp      # Show the separation policies for the current zone
Z2 > send     # Exchange secure messages with other zones
Z2 > stats    # Print detailed kernel statistics
```

By providing a pre-integrated, secure-by-design foundation, the MultiZone IoT SDK allows developers to focus on their application logic while the underlying TEE handles the complexities of hardware separation and secure connectivity.
