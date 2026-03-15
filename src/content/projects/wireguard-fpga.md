---
title: Wireguard FPGA
summary: An open-source, FPGA-based implementation of the Wireguard VPN protocol designed
  for wire-speed data tunneling. It utilizes a hardware-software SoC architecture
  featuring a RISC-V control plane and an RTL-accelerated data plane targeting Artix-7
  FPGA platforms.
slug: wireguard-fpga
codeUrl: https://github.com/chili-chips-ba/wireguard-fpga
star: 1314
version: v1.0.0
lastUpdated: '2026-03-12'
rtos: ''
topics:
- cocotb
- embedded
- fpga
- iss
- risc-v
- rtl
- verilator
- verilog
- vpn
- vproc
- wireguard
isShow: true
image: /202603/wireguard-fpga.webp
createdAt: '2026-03-15'
updatedAt: '2026-03-15'
---

## Overview

Wireguard FPGA is an ambitious open-source project that brings the modern, secure Wireguard VPN protocol to hardware acceleration. While software implementations of Wireguard are widely available, they often struggle to reach wire-speed performance on standard hardware. Conversely, existing hardware solutions are frequently proprietary and expensive. This project bridges that gap by providing a transparent, FPGA-based System-on-Chip (SoC) designed for high-performance secure networking.

The project implements a complete Wireguard node as an IP router. It is built around a two-layer architecture: a control plane for managing sessions and handshakes, and a data plane for wire-speed cryptography and routing. By leveraging open-source tools and ubiquitous hardware like the Artix-7 FPGA, Wireguard FPGA makes high-speed VPN technology accessible to researchers and developers alike.

## Hardware-Software Architecture

The system is partitioned to maximize efficiency. The **Control Plane** runs on a soft RISC-V CPU. This layer is responsible for the complex logic of the Wireguard protocol, including managing remote peers, executing handshakes, and handling key rotation. The software is written in bare-metal C and utilizes several cryptographic primitives such as Curve25519 for key exchange and BLAKE2s for hashing.

The **Data Plane** is implemented entirely in RTL (Verilog/SystemVerilog) to ensure maximum throughput. It handles the heavy lifting of the network traffic, including:
- **ChaCha20-Poly1305 Encryptor/Decryptor**: High-speed symmetric encryption and authentication.
- **IP Lookup Engine**: Pipelined routing and forwarding table lookups.
- **Packet Assembler/Disassembler**: Encapsulating and decapsulating tunneled traffic.
- **1G MAC & PHY Controller**: Interfacing with physical Ethernet ports.

## Technical Implementation and Tooling

One of the most notable aspects of Wireguard FPGA is its reliance on a modern, open-source toolchain. The project integrates several cutting-edge technologies to streamline development:
- **PipelineC**: An HLS-like tool used to move cryptography blocks from C to hardware gates.
- **PeakRDL**: Used for generating Control and Status Registers (CSR) and their associated software abstraction layers (HAL).
- **VProc**: A virtual processor co-simulation element that allows for high-speed simulation of the RISC-V software alongside the HDL logic.
- **OpenXC7**: An open-source toolchain for Xilinx Series 7 FPGAs, ensuring the project remains free from proprietary tool lock-in.

## Simulation and Validation

To manage the complexity of a hardware-software SoC, the project employs a sophisticated simulation environment. The test bench supports both full HDL simulation (using RTL cores like PicoRV32 or Ibex) and co-simulation using the VProc virtual processor. This flexibility allows developers to verify software logic against hardware models with significantly faster iteration times than traditional RTL simulation.

For real-world validation, the project targets the Alinx AX7201 development board, which features four 1000Base-T ports. This setup allows for at-speed testing of VPN tunnels between multiple nodes, demonstrating the system's capability as a functional, self-sufficient network appliance.

## Project Status and Future Goals

Currently in its first phase, the project serves as a robust proof-of-concept. The development team has successfully achieved board bring-up, implemented the basic Wireguard datapath, and integrated the RISC-V control plane. Future phases aim to increase the number of supported channels, optimize timing closure using open-source tools, and provide user-friendly management interfaces. By maintaining a well-documented and open repository, Wireguard FPGA invites the community to contribute to the future of open-source secure networking hardware.
