---
title: Pycopy Standard Library (pycopy-lib)
summary: A modular standard library for the Pycopy project, providing CPython-compatible
  modules and optimized 'micro' versions for resource-constrained embedded systems.
  It supports both the Pycopy Unix port and bare-metal targets like the ESP8266, allowing
  for a flexible, lightweight Python environment.
slug: pycopy-standard-library-pycopy-lib
codeUrl: https://github.com/pfalcon/pycopy-lib
star: 261
version: v2.11.0.15
lastUpdated: '2023-08-06'
rtos: ''
libraries:
- micropython
topics:
- micropython
- minimalist
- pycopy
- python
- suckless
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- pycopy
- micropython-lib
- pikapython
- semito-v-micropython-compatibility-layer-mcl
- microdot
- sparkfun-micropython-opencv
---

## Overview

Pycopy-lib is an ambitious project to develop a non-monolithic standard library for Pycopy, a minimalist and memory-efficient implementation of the Python programming language. While Pycopy is a fork of MicroPython, pycopy-lib aims to extend its capabilities by providing a suite of modules that stay as compatible as possible with CPython while remaining functional on low-resource hardware.

The project follows a modular philosophy. Unlike the standard Python distribution where the library is a single large entity, pycopy-lib allows developers to install only the specific modules they need. This is critical for embedded systems where storage and RAM are at a premium.

## Dual-Goal Development

The project balances two primary objectives that often conflict in the embedded world:

1.  **CPython Compatibility:** For the Pycopy "Unix" port, the goal is to match CPython's standard library as closely as possible. This allows developers to use familiar APIs and port existing Python code with minimal changes.
2.  **Bare-Metal Optimization:** For microcontrollers and bare-metal ports (such as the ESP8266), the project provides "micro" (prefixed with 'u') versions of modules. These are rewritten from scratch or heavily optimized to provide essential functionality within the constraints of low-memory systems.

## Key Modules and Features

Pycopy-lib hosts a wide variety of modules, ranging from core system utilities to network protocols. Some of the most notable inclusions are:

-   **uasyncio:** A lean implementation of asynchronous scheduling and I/O, modeled after CPython's asyncio but optimized for microcontrollers.
-   **urequests:** A subset of the popular 'requests' module for making HTTP calls.
-   **ulogging:** A small-footprint version of the standard logging module.
-   **upip:** Pycopy's native package manager, which allows users to install modules directly from PyPI to their embedded device.
-   **uctypeslib:** Helpers for defining and interacting with C-style structures, essential for hardware interfacing.

## Installation and Usage

Modules in pycopy-lib are published individually on PyPI with the `pycopy-` prefix. The standard way to manage these on a Pycopy system is using the `upip` tool. For example, to install the `pystone` benchmark, a user would run:

```python
import upip
upip.install('pycopy-pystone')
```

For developers working on a local machine, the project includes a `Makefile` and an `install.py` script to facilitate local installation and testing. 

## Development and Backports

One unique aspect of pycopy-lib is the provision of "CPython backports." These are reimplementations of Pycopy-specific modules that run on standard CPython. This allows developers to use CPython's robust debugging and code coverage tools to test logic intended for embedded targets, bridging the gap between desktop development and embedded deployment.
