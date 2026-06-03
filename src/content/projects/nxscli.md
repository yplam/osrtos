---
title: Nxscli
summary: A Python-based command-line client for the Apache NuttX NxScope real-time
  logging module. It enables high-performance data acquisition from embedded targets
  via serial, Segger RTT, or UDP, supporting advanced features like per-channel triggering
  and live visualization through plugins.
slug: nxscli
codeUrl: https://github.com/railab/nxscli
siteUrl: https://nuttx.apache.org/
star: 2
version: v0.5.1
lastUpdated: '2025-06-17'
rtos: nuttx
topics:
- cli
- click
- embedded
- logging
- nuttx
- nxscli
- nxslib
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- nxslib
- freertos-visualizer
- rtems-ec-cli-command-line-interface-for-embedded-controllers
- picoshell
- linkscope-bpu-uart-analyzer
- espfetch
---

## Overview

Nxscli is a specialized command-line interface (CLI) client designed to interact with the Apache NuttX NxScope real-time logging module. In the world of embedded systems development, capturing high-frequency data for debugging and performance analysis is a critical task. Nxscli provides a bridge between the embedded target running NuttX and a host machine, allowing developers to stream, capture, and analyze data with ease.

Built on Python 3.10+, Nxscli leverages the `nxslib` library to handle the underlying NxScope protocol. It is designed to be both powerful and extensible, catering to developers who need more than just a simple serial terminal for their data acquisition needs.

## Connectivity and Data Acquisition

One of the core strengths of Nxscli is its support for multiple communication interfaces. Depending on the hardware setup and the required bandwidth, developers can choose from several transport layers:

*   **Serial Port:** The standard method for most embedded targets.
*   **Segger RTT (Real Time Transfer):** A high-speed interface that allows for extremely low-latency data transfer without the overhead of traditional serial communication, provided a J-Link debugger is used.
*   **UDP Streaming:** For targets with network connectivity, Nxscli can stream data over UDP. This is particularly useful for remote monitoring or when integrating with external visualization tools.

## Plugin Architecture and Extensibility

Nxscli is built with a modular architecture that encourages the use of plugins. By default, the core package focuses on features that depend only on the standard Python libraries. However, its functionality can be significantly expanded through the `nxscli.extensions` entrypoint.

Currently, there are two primary official extensions:
*   **nxscli-mpl:** Integrates Matplotlib for high-quality static and dynamic plotting.
*   **nxscli-np:** Adds Numpy support, enabling complex numerical operations and data manipulation on the captured streams.

This architecture allows the community to build custom handlers for specific data types or proprietary visualization requirements without modifying the core client.

## Advanced Triggering and Visualization

Beyond simple data capture, Nxscli implements a sophisticated triggering system. Users can define triggers globally or on a per-channel basis, allowing for precise control over when data recording starts and stops. This is invaluable when trying to capture transient events or specific system states in a real-time environment.

For visualization and storage, Nxscli offers several options:
*   **CSV Export:** Save captured samples directly to CSV files for post-processing in Excel or custom scripts.
*   **Live Printing:** Print samples directly to the console for immediate feedback.
*   **PlotJuggler Integration:** By streaming data over UDP, Nxscli is natively compatible with PlotJuggler, a popular open-source tool for real-time time-series visualization.

## Getting Started

Nxscli is easily installed via pip, and its development environment is managed using `tox` to ensure code quality and test coverage. Developers can get started by installing the package and configuring their NuttX target to use the NxScope module. Once the target is transmitting data, Nxscli can be invoked to start capturing or streaming data immediately. 

The project maintains a clear roadmap, with plans to introduce boolean operations on triggers, virtual channels for on-the-fly math operations, and an interactive mode to further enhance the user experience for embedded engineers.
