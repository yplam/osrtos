---
title: lwIP Bug Finder
summary: A specialized tool for identifying vulnerabilities in the lwIP TCP/IP stack
  using symbolic execution. Leveraging the angr framework, it analyzes binary executables
  to detect memory corruption, segmentation faults, and protocol logic errors in embedded
  networking stacks.
slug: lwip-bug-finder
codeUrl: https://github.com/ertlnagoya/lwip-bug-finder
star: 14
lastUpdated: '2018-02-01'
rtos: mbed-os
libraries:
- lwip
topics:
- angr
- bug-finding
- lwip
- symbolic-execution
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lwip-for-linux
- esp32-network-scanner
- lwip-contrib-unix-port
- ghost-esp
- lwip-for-esp8266
- straight-httpd-embedded-web-server-simulator
---

## Overview

The lwIP Bug Finder is a security analysis tool designed to uncover vulnerabilities within the lwIP (lightweight IP) stack, a widely used TCP/IP implementation for embedded systems. By utilizing symbolic execution via the **angr** framework, the tool explores various execution paths in lwIP applications to identify bugs that are often difficult to find through traditional fuzzing or manual code review.

The project provides a comprehensive workflow for security researchers and embedded developers to analyze binaries, dump memory states from running processes, and generate proof-of-concept (PoC) attack packets when a bug is discovered.

## Technical Architecture

The tool operates primarily on binary executables rather than source code, making it useful for analyzing firmware where source may not be available. It integrates several powerful open-source utilities:

- **angr**: The core symbolic execution engine used to solve constraints and find paths to "error" states or segmentation faults.
- **Radare2**: Utilized for function and data dependency analysis to understand how data flows through the stack.
- **Scapy**: Used to automatically generate Python scripts that can reproduce found bugs by sending specifically crafted network packets.
- **Graphviz**: Provides visualization of state history, allowing developers to see the path the symbolic engine took to reach a specific bug.

## Analysis Workflow

The tool follows a structured three-stage process to identify vulnerabilities:

### 1. Before Analysis
Before running the solver, the user performs dependency analysis using `analyze.py` to identify which functions and data objects are referenced. A critical step involves `memory-dump.py`, a GDB-integrated script that captures the memory state of a running lwIP application. This allows the symbolic engine to start from a realistic, initialized state rather than an empty one.

### 2. Main Analysis
The core solver, `lwip-bug-finder.py`, is configured via architecture-specific files (supporting both Intel x86 and ARM). Users can specify:
- The target function to start analysis (e.g., `dns_recv`, `tcp_input`).
- Memory regions to monitor for segmentation faults.
- Specific code blocks to avoid or find.

### 3. After Analysis
If the solver finds a path to a crash or a user-defined "find" address, it generates a `result.py` script. This script uses the Scapy library to reconstruct the exact network packet that triggered the state, allowing for immediate reproduction and verification of the bug on real hardware or simulators.

## Target Protocols and Bug Detection

The project includes specific configurations and scripts to find and reproduce known lwIP vulnerabilities, such as:
- **DNS Client Vulnerabilities**: Finding memory access violations in DNS response handling.
- **TCP Stack Logic**: Identifying issues in `tcp_input` and packet processing.
- **Bug #24596**: Includes a dedicated solver for this specific historical lwIP TCP bug.

## Hardware and Platform Support

While the analysis tool runs on a Linux host (suggested Ubuntu 16.04), it targets binaries compiled for various environments:
- **Unix Simhost**: lwIP applications running in a Unix-simulated environment.
- **mbed-os / GR-PEACH**: The repository contains specific support for the Renesas GR-PEACH platform and mbed-based firmware, including memory dump utilities tailored for ARM-based embedded targets.

## Getting Started

To use the bug finder, users typically clone the repository with submodules to include `lwip` and `lwip-contrib` sources. After building the target applications (like `simhost` or `echop`), the process involves capturing a memory dump via GDB and then running the solver with the desired search strategy (Depth-First Search or Width-First Search). 

```bash
### Example: Searching for a DNS bug using Depth-First Search
./lwip-bug-finder.py -c intel_echop -f dns_recv --dfs
```

The output is stored in a `last-output` directory, containing the execution trace, logs, and the reproduction script.
