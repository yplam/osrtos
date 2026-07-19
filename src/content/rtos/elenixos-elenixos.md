---
title: ElenixOS
summary: ElenixOS is a lightweight, script-driven operating system specifically designed
  for smartwatches and resource-constrained wearable devices. It utilizes JerryScript
  as a core JavaScript engine for application logic and LVGL for high-performance
  graphical rendering, enabling a modern user experience through a cross-platform
  runtime environment.
slug: elenixos-elenixos
codeUrl: https://github.com/ElenixOS/ElenixOS
siteUrl: https://docs.elenixos.com/en
star: 23
version: v0.5.1-alpha
lastUpdated: '2026-07-08'
components:
- GUI
- FileSystem
- Graphics
- Simulator
- Shell
platforms:
- Native
- Simulator
- Linux
- Windows
- macOS
licenses:
- Apache-2.0
libraries:
- LVGL
- JerryScript
- cJSON
- RemixIcon
createdAt: '2026-06-09'
updatedAt: '2026-07-19'
---

### Features

- Script-driven application model using JavaScript to define UI structure and interaction logic.
- Native execution layer for high-performance graphics rendering and event scheduling.
- Integration with LVGL for smooth animations, gesture support, and interface hierarchy.
- Lightweight JavaScript execution on microcontrollers via the JerryScript engine.
- Cross-platform compatibility supporting WebAssembly (WASM), PC simulators, and native hardware.
- Unified API system that treats watch faces and applications as identical runtime entities.
- Hardware abstraction layers designed for simplified porting across diverse MCU architectures.
- Activity and View management system for handling page lifecycles and navigation.
- Integrated file system module for persistent storage and directory management.
- Data serialization and configuration handling through built-in cJSON support.
- Optimized resource management for embedded platforms with limited memory and processing power.
- Visual design and interaction philosophy inspired by modern smartwatch gesture flows.
- Support for rapid iteration through an online browser-based simulator.
- Extensible architecture allowing for custom native modules and hardware driver integration.

ElenixOS utilizes a script-driven architectural design that separates application-level logic from system-level execution. The architecture is divided into two primary layers: a high-level JavaScript runtime and a low-level native core. The JavaScript layer, powered by JerryScript, allows developers to describe UI layouts and business logic using web-like patterns, while the native core, written in C/C++, manages hardware resources, memory allocation, and graphical rendering via the LVGL library. This decoupling ensures that application code remains portable across different hardware targets without requiring modification to the underlying system drivers.

The system's internal structure revolves around an Activity and View management system, which controls the lifecycle of applications and handles navigation transitions. Interaction between the script engine and native hardware is facilitated through a unified API and a clear Hardware Abstraction Layer (HAL). This design enables ElenixOS to run effectively on both physical microcontrollers and virtualized environments like WebAssembly or desktop simulators.

**Core Components**
* **Script Engine**: JerryScript-based runtime for executing JavaScript applications.
* **Graphics Stack**: LVGL-powered rendering engine for high-quality UI components and animations.
* **Lifecycle Manager**: Activity and View modules for managing application states and transitions.
* **Storage System**: File system module for managing data and assets.
* **HAL**: Abstraction layer for MCU-specific hardware peripherals.

### Use Cases
This RTOS is ideal for:
- **Smart Wearables**: Developing feature-rich smartwatch interfaces with smooth animations and gesture-based navigation on low-power MCUs.
- **IoT Edge Devices**: Creating interactive control panels for IoT devices where UI flexibility and rapid application updates are required.
- **Embedded Prototyping**: Rapidly testing UI/UX concepts in a browser or PC environment before deploying to final hardware targets.
- **Educational Platforms**: Learning embedded system design through a modern, script-based approach to hardware interaction.

### Getting Started
Developers can begin by exploring the ElenixOS Online Simulator, which provides a full environment to experience the OS directly in a web browser without hardware setup. For local development, the project provides a PC-based simulator environment compatible with VS Code, allowing for rapid debugging and application iteration. Comprehensive documentation, including environment setup guides, build instructions, and JavaScript API references, is available at the official documentation portal (https://docs.elenixos.com/en). Key modules such as the File System and Activity Manager are documented to help developers understand the core system lifecycle and data management.
