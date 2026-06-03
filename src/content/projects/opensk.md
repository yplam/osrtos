---
title: OpenSK
summary: An open-source Rust implementation of a FIDO2 security key. It runs as a
  Tock OS application or a standalone library, targeting Nordic nRF52840-based hardware
  to provide secure, hardware-backed authentication.
slug: opensk
codeUrl: https://github.com/google/OpenSK
star: 3265
version: ctap2.0
lastUpdated: '2025-11-26'
rtos: tock
topics:
- ctap2
- embedded
- fido2
- firmware
- hardware
- opensk
- rust
- security
- security-key
- tock
- tock-os
- u2f
- webauthn
isShow: true
image: /202601/opensk.webp
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- esp32-u2f-security-key
- open-authenticator-app
- smartlock-for-disco-l475vg-iot01a
- securegen
- pinetime-tock
- esp32-mfa-authenticator
---

## Overview

OpenSK is an open-source implementation of a FIDO2 security key, written entirely in Rust. Developed by Google as a proof-of-concept and research platform, the project aims to provide a fully transparent and hackable security key experience, from the firmware and operating system level down to the physical enclosure. By leveraging the safety guarantees of Rust and the isolation capabilities of Tock OS, OpenSK provides a robust foundation for building secure authentication hardware.

## Key Features and Protocols

OpenSK implements the Client to Authenticator Protocol (CTAP), allowing it to function as a FIDO2 security key for passwordless login and multi-factor authentication on modern websites. 

**Core capabilities include:**
- **FIDO2 & U2F Support:** Implements CTAP 2.0 (certified) and tracks the latest CTAP 2.2 specifications, while maintaining backward compatibility with U2F.
- **Rust-Based Safety:** The entire application logic is written in Rust, minimizing common memory safety vulnerabilities found in traditional C-based firmware.
- **Post-Quantum Cryptography:** The project serves as a research platform for hybrid post-quantum signatures, helping to future-proof security keys against quantum computing threats.
- **Customizable Hardware:** While it targets specific development kits, the project encourages users to 3D print their own enclosures and customize the firmware behavior.

## Technical Architecture

OpenSK is designed with flexibility in mind. It can be deployed in three primary ways:
1. **Tock OS Application:** Running as a userland process on Tock OS, utilizing Tock's system call interface for hardware abstraction and security isolation.
2. **Wasefire Applet:** Running within the Wasefire ecosystem.
3. **Library:** Integrated directly into other Rust projects as a library.

The project currently utilizes **RustCrypto** for its cryptographic operations. There is ongoing work to integrate hardware-accelerated cryptography using the **ARM CryptoCell-310** embedded in the Nordic nRF52840 chip to improve performance and power efficiency.

## Supported Hardware

The firmware is optimized for the **Nordic nRF52840** SoC, a popular choice for Bluetooth and USB security applications. Supported boards include:
- **Nordic nRF52840-DK:** Recommended for development and debugging due to its integrated JTAG probe.
- **Nordic nRF52840 Dongle:** A compact form factor ideal for daily testing.
- **Makerdiary nRF52840-MDK:** A small USB dongle variant.
- **Feitian OpenSK Dongle:** A commercial-grade hardware option specifically designed for OpenSK.

## Getting Started

Setting up OpenSK involves a combination of Rust toolchain management and Python-based deployment scripts. The project provides a `setup.sh` script to configure the environment, including submodules and Python virtual environments. 

Deployment is handled via a comprehensive `deploy.py` script, which manages the compilation of Tock OS and the OpenSK application, generates cryptographic materials (certificates and private keys), and flashes the resulting binary to the target board using tools like J-Link, OpenOCD, or Nordic DFU. Once flashed, users can manage their key using the provided `tools/configure.py` utility to inject custom certificates or lock the device.
