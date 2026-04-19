---
title: belay
slug: belay
summary: Belay is a Python library and command-line tool that bridges the gap between
  host-side Python logic and MicroPython or CircuitPython hardware. It allows developers
  to treat a connected microcontroller as an extension of their host environment by
  merging on-device firmware logic and host-side program logic into a single, synchronized
  codebase.
codeUrl: https://github.com/BrianPugh/belay
siteUrl: https://belay.readthedocs.io
star: 268
version: v0.30.1
lastUpdated: '2026-03-03'
components:
- WiFi
- USBDevice
- Shell
- WebSocket
- FileSystem
- NTP
platforms:
- ARM Cortex-M
- macOS
- Linux
- Windows
- POSIX
libraryType: Middleware
createdAt: '2025-12-13'
updatedAt: '2026-04-19'
---

### Features


- Unified codebase architecture that merges host-side logic with on-device MicroPython/CircuitPython execution.

- Task decorator system (@device.task) for serializing and executing Python functions directly on the remote hardware.

- Poetry-inspired package manager for MicroPython that handles dependency resolution and deployment via pyproject.toml.

- Support for both wired serial (USB) and wireless (WebREPL over WiFi) communication protocols.

- Automatic code synchronization at the start of script execution to ensure device-side logic is up-to-date.

- Proxy objects that allow host-side interaction with on-device Python objects as if they were local instances.

- Real-time forwarding of device-side standard output (print calls) to the host terminal.

- Integrated latency measurement tool for benchmarking round-trip communication between host and device.

- Offline-first dependency management that caches libraries locally in a .belay directory for reproducibility.

- Support for multiple dependency sources including the MicroPython package index, GitHub, GitLab, and local paths.

- Time synchronization functionality to align the microcontroller's internal clock with the host system.

- Virtual environment emulation via MICROPYPATH for testing MicroPython code on the host machine.

- Interactive CLI for project initialization (belay new), dependency management (belay add/update), and device interaction.

- Smart delta transfer mechanism in the installer to minimize flash wear and sync time by only sending changed files.

- CircuitPython compatibility through automated filesystem remounting for host-write access.

- Device selection menu (belay select) to identify and specify hardware via USB VID/PID and serial numbers.



Belay operates as a sophisticated middleware layer between a host computer and a MicroPython-compatible microcontroller. Its architecture is centered around the `Device` class, which abstracts the underlying communication channel—whether it be a serial UART connection or a WebSocket-based WebREPL. The core mechanism involves a decorator-based system that captures function source code, transmits it to the device's REPL, and manages the execution and return of data. This design allows for a seamless flow where host-side logic can trigger hardware-level interrupts or GPIO operations without the developer manually managing a communication protocol.

The library also includes a robust package management subsystem that leverages the `pyproject.toml` standard. This subsystem handles the complexities of the MicroPython ecosystem, such as the lack of formal versioning in many libraries, by implementing a local caching strategy. By storing dependencies within the project's own directory structure, Belay ensures that deployments are reproducible and independent of upstream changes in external repositories.

### Use Cases

This library is ideal for:

- **Hardware-in-the-Loop (HIL) Testing**: Automating the validation of physical hardware by driving inputs and reading outputs directly from a host-side test suite like pytest.
- **Rapid Prototyping and IoT Development**: Building applications that require high-level host processing (such as machine learning or cloud integration) combined with low-latency hardware control.
- **Embedded Dependency Management**: Maintaining consistent library versions across a development team for MicroPython projects using a lock-file style approach.
- **Interactive Hardware Debugging**: Using the host-side Python REPL or scripts to interactively probe and manipulate hardware registers and sensors in real-time.

### Getting Started

To begin developing with Belay, install the package via pip: `pip install belay`. For new projects, use the command `belay new .` to generate a standard project structure including a `pyproject.toml` file. Connecting to a device is straightforward: instantiate a `belay.Device` object with the appropriate port or IP address, and use the `@device.task` decorator to define functions that should run on the hardware. Comprehensive documentation covering advanced features like Proxy Objects, Time Synchronization, and CircuitPython configuration can be found at the [official Belay documentation](https://belay.readthedocs.io).
