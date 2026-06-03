---
title: 'ZView: Zephyr RTOS Runtime Visualizer'
summary: A lightweight, non-intrusive runtime visualizer for Zephyr RTOS applications.
  It utilizes SWD probes to perform real-time analysis of thread statistics, stack
  watermarks, and heap usage without halting the target CPU.
slug: zview-zephyr-rtos-runtime-visualizer
codeUrl: https://github.com/wkhadgar/zview
star: 12
version: v0.5.2
lastUpdated: '2026-02-05'
rtos: zephyr
topics:
- developer-tools
- tooling
- zephyr-rtos
- ztop
- zview
isShow: false
createdAt: '2026-02-07'
updatedAt: '2026-02-07'
relatedProjects:
- rtic-scope
- freertos-visualizer
- spotflow-observability-device-sdk
- get-irq-priority-for-rt-thread
- zephyr-c-20-framework-zpp
- power-pico
---

## Overview

ZView is a specialized runtime visualization tool designed for the Zephyr RTOS ecosystem. Unlike traditional logging or shell-based monitoring tools that require on-target processing and communication overhead (like UART or USB), ZView operates externally. It leverages the power of Serial Wire Debug (SWD) probes to inspect the system state directly through the memory bus, providing a high-fidelity view of the application's performance with a minimal footprint.

## How It Works

The core innovation of ZView lies in its non-intrusive approach to system analysis. By utilizing a debug probe's ability to read memory via the Access Port Bus (APB) without halting the CPU, ZView can monitor a running system in real-time. 

The tool works by parsing the application's ELF binary to identify the memory locations of internal kernel objects. Once these addresses are known, ZView periodically samples the target's RAM to extract thread metadata, stack watermarks, and CPU usage statistics. This data is then presented in a clean, interactive Terminal User Interface (TUI).

## Key Features

- **Thread Discovery and Monitoring**: Automatically identifies all active threads in the Zephyr system using the kernel's thread monitor features.
- **Stack Analysis**: Tracks stack usage and watermarks to help developers identify potential stack overflows or optimize memory allocation.
- **CPU Usage Tracking**: Provides real-time CPU utilization percentages per thread, including an implicit view of the idle thread.
- **Heap Runtime Visualization**: Offers a dedicated view for monitoring system heaps, allowing developers to track memory allocation patterns and fragmentation.
- **Zero-Overhead Communication**: Because it reads memory via SWD, it does not require UART, Ethernet, or any other communication peripheral on the target hardware.

## Technical Requirements

To use ZView, the Zephyr application must be compiled with specific Kconfig options enabled to expose the necessary metadata in the ELF file and RAM. These include:

```conf
CONFIG_INIT_STACKS=y            # Required for stack watermarks
CONFIG_THREAD_MONITOR=y         # Required for thread discovery
CONFIG_THREAD_STACK_INFO=y      # Required for thread metadata

# Optional Features
CONFIG_THREAD_NAME=y            # Enables thread name display
CONFIG_THREAD_RUNTIME_STATS=y   # Enables CPU usage tracking
CONFIG_SYS_HEAP_RUNTIME_STATS=y # Enables heap runtime stats
```

## Integration and Usage

ZView is designed to fit seamlessly into the standard Zephyr development workflow. It can be installed as a Python package and integrated directly into the `west` meta-tool. By adding ZView to the `west.yml` manifest, developers can launch the visualizer with a simple `west zview` command.

The TUI is navigable via keyboard, allowing users to sort data, invert views, and drill down into specific thread details. It supports popular debug runners including J-Link and pyOCD, making it compatible with a wide range of ARM Cortex-M and other supported microcontrollers.
