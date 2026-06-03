---
title: micropython-lib
summary: A comprehensive collection of Python modules and packages optimized for MicroPython.
  It includes compatible subsets of the Python Standard Library, hardware drivers,
  and extensions for the wider Python ecosystem designed for resource-constrained
  embedded systems.
slug: micropython-lib
codeUrl: https://github.com/micropython/micropython-lib
siteUrl: https://docs.micropython.org/en/latest/reference/packages.html
star: 2722
version: v1.27.0
lastUpdated: '2025-12-08'
rtos: ''
libraries:
- micropython
topics:
- micropython
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- pycopy-standard-library-pycopy-lib
- awesome-micropython
- micropython-samples-and-drivers
- micropython-stm-lib
- awesome-circuitpython
- asynchronous-programming-in-micropython
---

## Overview

micropython-lib is the official repository of packages designed to extend the functionality of MicroPython applications. While the core MicroPython runtime provides the essential Python language features and hardware-specific modules, micropython-lib serves as the central hub for higher-level libraries, drivers, and standard library replacements. 

The project aims to bridge the gap between the full CPython environment and the resource-constrained world of microcontrollers by providing modular, lightweight implementations of familiar Python tools.

## Package Categories

The repository is organized into four primary categories to help developers find the right tools for their specific needs:

*   **python-stdlib**: These are compatible versions of modules from the Python Standard Library. They act as drop-in replacements for CPython modules, though they often feature reduced functionality to fit within the memory constraints of embedded devices.
*   **python-ecosys**: This category contains reduced-functionality versions of popular packages from the wider Python ecosystem, such as those typically found on PyPI.
*   **micropython**: These are packages specific to the MicroPython environment. This includes hardware drivers for sensors, displays, and peripherals, as well as libraries for embedded-specific functionality like Bluetooth (aioble) or specialized networking tools.
*   **unix-ffi**: Specifically for the MicroPython Unix port, these packages provide access to operating system and third-party libraries via the Foreign Function Interface (FFI).

## Installation and Management

Modern MicroPython environments offer several ways to integrate these packages into a project:

### On-Device Installation with mip
As of MicroPython v1.20, boards with network connectivity include the `mip` package manager. This allows for direct installation of packages over WiFi or Ethernet:

```python
import mip
mip.install("package-name")
```

### PC-Based Management with mpremote
For devices without direct network access, the `mpremote` tool can be used from a host PC to install packages onto a connected MicroPython device via the command line:

```bash
$ mpremote connect /dev/ttyUSB0 mip install package-name
```

### Firmware Freezing
For production environments where performance and memory efficiency are critical, packages can be "frozen" into the firmware. Every package in micropython-lib includes a `manifest.py` file, allowing developers to include specific modules during the firmware build process using the `require()` command.

## Technical Architecture and Conventions

micropython-lib follows strict conventions to ensure code remains minimal and efficient. A key concept is the "extension package," where larger libraries are broken into smaller chunks. For example, `collections-defaultdict` extends the base `collections` package, allowing users to only install the specific classes they need, saving precious flash and RAM.

All packages are encouraged to include `manifest.py` files with metadata and use `unittest` for verification. While the code is kept minimal, docstrings are encouraged as they are stripped during the cross-compilation to bytecode, ensuring that documentation does not impact the final footprint on the device.
