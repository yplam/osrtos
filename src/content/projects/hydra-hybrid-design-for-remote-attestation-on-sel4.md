---
title: 'HYDRA: Hybrid Design for Remote Attestation on seL4'
summary: A security framework for remote attestation and secure software updates built
  on the formally verified seL4 microkernel. It targets the I.MX6-SabreLite platform
  as a prover and utilizes a Windows-based verifier to ensure system integrity through
  the HYDRA and ASSURED architectures.
slug: hydra-hybrid-design-for-remote-attestation-on-sel4
codeUrl: https://github.com/norrathep/seL4_hydra
siteUrl: https://sel4.systems/Info/Hardware/sabreLite/
star: 2
lastUpdated: '2018-09-11'
rtos: sel4
topics:
- attestation
- c
- embedded-systems
- imx6
- secure-update
- sel4
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- the-sel4-white-paper
- sel4-armv8-vmm-manifest
- rust-sel4-toy-system-for-i-mx6-sabre-lite
- raspberry-pi-pico-w-and-pico-2-w-fota-bootloader
- advanced-operating-system-2017-sos
- bpf-ebpf-for-microcontroller-compartmentalization
---

## Overview

HYDRA is a research-driven security framework designed to provide hybrid remote attestation for embedded systems. By leveraging the formally verified seL4 microkernel, HYDRA establishes a root of trust that allows a remote verifier to confirm the software integrity of an embedded device (the prover). This project is particularly significant for its focus on formal verification and its application in secure software updates through the ASSURED architecture.

## System Architecture

The system is divided into two primary entities:

*   **Prover**: An embedded device based on the I.MX6-SabreLite SoC. This device runs the seL4 microkernel and hosts the attestation framework and target applications.
*   **Verifier**: A powerful Windows-based machine that communicates with the prover over Ethernet to verify its state and manage updates.

## Key Components

### Remote Attestation (HYDRA)

The core HYDRA implementation provides the main attestation framework. It includes a target process (`hydra-app`) and the framework itself (`hydra`), which work together to generate cryptographic proofs of the system's state. This ensures that the software running on the I.MX6 board has not been tampered with.

### Secure Software Update (ASSURED)

The project includes an implementation of the ASSURED architecture, which focuses on secure software updates for realistic embedded devices. It features a software update framework based on a modified TUF (The Update Framework) verification process. The repository includes several updatable user-space processes, such as a fuel-level application and a speedometer application, demonstrating how updates can be pushed and verified in a real-world scenario.

## Technical Implementation

The project is built on the seL4 microkernel, known for its high-assurance security properties. The prover side involves several specialized applications:

*   `dhs-demo`: The main software update framework.
*   `update-benchmark`: A proof-of-concept for the ASSURED implementation used for performance evaluation.
*   `hydra`: The primary attestation logic.

Deployment involves flashing application images to specific sectors of a micro-SD card using `dd` and booting the I.MX6-SabreLite via U-Boot. The verifier side is developed using Visual Studio and communicates with the prover via UDP over a dedicated Ethernet configuration.

## Hardware and Environment

While the software is designed for the seL4 microkernel, it is specifically tailored for the I.MX6-SabreLite hardware. The verifier requires a Windows 10 environment with Visual Studio 2015. Networking is a critical component, as the verifier and prover must be connected via Ethernet with specific IP configurations (e.g., 192.168.168.1) to facilitate the attestation protocol.
