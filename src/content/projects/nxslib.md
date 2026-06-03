---
title: Nxslib
summary: A Python client library for the Apache NuttX NxScope real-time logging module.
  It enables real-time data streaming and decoding from NuttX-based embedded systems
  via serial or Segger RTT interfaces. The library includes a built-in simulator for
  application development without physical hardware.
slug: nxslib
codeUrl: https://github.com/railab/nxslib
siteUrl: https://nuttx.apache.org/
star: 0
version: v0.9.1
lastUpdated: '2023-11-20'
rtos: nuttx
topics:
- logging
- nuttx
- nxslib
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- nxscli
- semito-v-micropython-compatibility-layer-mcl
- freertos-visualizer
- rust-stub-library-for-apache-nuttx
- bl602-adc-and-temperature-sensor-library-for-apache-nuttx
- micropython-port-for-rt-thread
---

## Overview

Nxslib is a specialized Python client library designed to interface with the Apache NuttX NxScope real-time logging module. In the world of embedded systems development, capturing and analyzing high-frequency data from a running target is a common challenge. Nxslib addresses this by providing a robust, extensible framework for streaming, decoding, and processing data from NuttX devices.

By bridging the gap between embedded firmware and the Python ecosystem, Nxslib allows developers to leverage Python's powerful data analysis and visualization tools to monitor their embedded applications in real-time.

## Key Features and Capabilities

The library is built with flexibility in mind, supporting various communication backends and data formats. Its core functionality revolves around the NxScope protocol, which is optimized for low-overhead logging on microcontrollers.

**Key capabilities include:**

*   **Multiple Transport Interfaces:** Support for standard serial protocols as well as high-speed Segger RTT (Real Time Transfer) via the `pylink` library. This allows for non-intrusive logging even in performance-critical applications.
*   **Hardware Simulation:** A built-in simulated NxScope device allows developers to write and test their Python-side logic without needing a physical NuttX board connected. This is particularly useful for CI/CD pipelines and early-stage software development.
*   **Extensible Decoding:** Users can define specific stream data decoders. This means that custom C structures or proprietary data types sent from the embedded target can be automatically converted into usable Python objects.
*   **Custom Protocol Support:** While it defaults to the NxScope protocol, the library is architected to allow for custom protocol implementations if the standard logging format does not meet specific project requirements.

## Technical Implementation

Nxslib requires Python 3.10 or newer. It relies on several standard embedded-related Python packages, including `pyserial` for UART communication and `pylink-square` for J-Link RTT support. The project maintains high code quality standards, utilizing `tox` for automated testing, `mypy` for strict type checking, and `flake8` for linting.

For developers looking for a ready-to-use tool rather than a library to build upon, the project is closely related to **Nxscli**, a command-line interface built on top of Nxslib that provides immediate access to logging features from the terminal.

## Getting Started

Setting up Nxslib is straightforward via standard Python package managers. Once installed, developers typically initialize a backend (such as Serial or RTT), configure the channels they wish to monitor, and start a stream. The library handles the low-level framing and checksum verification, providing a clean stream of data packets to the user application.

For those interested in contributing or extending the library, the project follows a modern development workflow with comprehensive test coverage and automated formatting tools, ensuring that the library remains stable as the Apache NuttX ecosystem evolves.
