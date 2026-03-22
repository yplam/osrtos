---
title: flexPTP
summary: A lightweight IEEE 1588 Precision Time Protocol (PTP) implementation optimized
  for resource-constrained microcontrollers. It supports both master and slave configurations,
  multiple transport mechanisms, and advanced clock servos like PID and Kalman filters.
  The library targets ARM Cortex-M platforms and integrates with lwIP or EtherLib
  network stacks to achieve sub-100ns synchronization precision.
slug: flexptp
codeUrl: https://github.com/epagris/flexPTP
siteUrl: https://epagris.github.io/flexPTP/
star: 36
version: RC1.0
lastUpdated: '2026-03-06'
rtos: freertos
libraries:
- lwip
topics:
- embedded
- flexptp
- gptp
- ieee1588
- microcontroller
- ptp
- timesync
- tsn
isShow: true
image: /202603/flexptp.webp
createdAt: '2026-03-22'
updatedAt: '2026-03-22'
---

## Overview

flexPTP is a specialized library designed to bring accurate time synchronization to low-energy, microcontroller-based embedded systems. Implementing the IEEE 1588 Precision Time Protocol (PTP), it allows networked devices to synchronize their internal clocks with nanosecond-level precision. While PTP is often associated with high-end networking gear, flexPTP is specifically engineered for low resource utilization, making it suitable for ARM Cortex-M4 and Cortex-M7 based microcontrollers.

The library is released under the MIT license and aims to provide a compact, portable solution for embedded developers who need high-performance timing without the overhead of full-scale PTP stacks designed for desktop or server environments.

## Key Features and Capabilities

flexPTP is a versatile stack that supports a wide range of PTP configurations and profiles:

- **IEEE 1588 Compatibility**: Implements both Slave and Master Ordinary Clock (OC) functionality.
- **Flexible Mechanisms**: Supports End-to-End (E2E) and Peer-to-Peer (P2P) delay mechanisms, as well as Layer 2 (Ethernet) and Layer 4 (UDP/IPv4) transport.
- **Signaling Modes**: Compatible with both one-step and two-step signaling modes.
- **Standards Support**: Can operate as an IEEE 802.1AS (gPTP) clock, making it suitable for Automotive Ethernet and Time-Sensitive Networking (TSN) applications.
- **Advanced Servos**: Includes both PID and Kalman-filter based clock servos to maintain synchronization stability even under varying network conditions.
- **Hardware Integration**: Provides hooks to compensate for hardware layer delays and utilizes hardware-captured timestamps for maximum accuracy.

## Technical Architecture

The library is designed to be highly portable. While it can operate in OS-less (bare-metal) environments, it is optimized for use with embedded operating systems to ensure better control over scheduling and message queuing. It provides out-of-the-box support for the FreeRTOS API and any RTOS with a CMSIS OS2 wrapper. 

On the networking side, flexPTP acts as middleware that sits atop a network stack. It currently features native support for **lwIP** (Lightweight IP) and **EtherLib**. For lwIP users, the library provides guidance on extending the `pbuf` structure to carry hardware timestamps, which is critical for achieving high precision. Experimental support for Linux and POSIX socket APIs is also available for cross-platform development.

## Hardware Support

flexPTP has been tested and ported to several popular microcontroller families, including:
- **STM32**: F4xx, F7xx, and H7xx (including dual-core variants like the H745).
- **TI Tiva**: TM4C1294 Connected LaunchPad.
- **NXP**: MK64F (FRDM-K64F).

Measurements on these platforms have demonstrated synchronization precision of tens of nanoseconds, significantly outperforming standard NTP implementations.

## Runtime Configuration and CLI

One of the standout features of flexPTP is its rich set of runtime-configurable options. It includes a comprehensive Command Line Interface (CLI) that allows developers to manipulate PTP operations on the fly. Through the CLI, users can:
- Adjust servo parameters (Kp, Kd).
- Toggle logging for various subsystems (BMCA, sync, timestamps).
- Change PTP profiles and domains.
- Manually set clock offsets or addends for debugging.
- Query operational statistics and clock status.

## Getting Started

Building the library is primarily handled via **CMake**, which compiles the source into a static library that can be linked into an application. Developers must provide a `flexptp_options.h` header file to define hardware constants and default settings. The project repository includes several example ports for STM32 and Tiva platforms, showcasing how to integrate the PTP task with the underlying RTOS and network driver.
