---
title: Mbed Tools
summary: A modern command-line interface for Mbed OS development, providing tools
  for project management, device detection, and build orchestration. It leverages
  CMake and Ninja to streamline the compilation process for Mbed Enabled devices and
  supports multiple toolchains including GCC, ARM, and IAR.
slug: mbed-tools
codeUrl: https://github.com/ARMmbed/mbed-tools
siteUrl: https://armmbed.github.io/mbed-tools/api/
star: 49
version: 7.59.0
lastUpdated: '2022-11-16'
rtos: mbed-os
topics:
- cli
- mbed
- mbed-os
- os
- tools
- toolset
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mbed-vscode-tools
- mbed-support-for-clion
- mbed-vim
- docker-embedded-development-toolchains
- micropy-cli
- west-the-zephyr-rtos-meta-tool
---

## Overview

Mbed Tools is the modern command-line interface designed to support the future of Mbed OS development. As the successor to the original Mbed CLI, this toolset provides a streamlined workflow for developers working with Mbed Enabled hardware. It focuses on core operations such as device detection, project management, and build orchestration, utilizing industry-standard tools like CMake and Ninja to provide a faster and more reliable build experience.

While the project is designed to be the primary interface for Mbed OS 6 and beyond, it maintains a focus on extensibility, providing a Python API that other tooling developers can leverage to build custom Mbed-related applications.

## Key Features

The toolset offers several critical capabilities for embedded developers:

- **Device Detection**: Automatically identifies Mbed Enabled devices connected via USB or J-Link, providing details like product codes and mount points.
- **Project Management**: Simplifies the process of checking out Mbed projects and managing library dependencies.
- **Build Orchestration**: Interfaces with CMake and Ninja to perform builds across various profiles (develop, debug, release) and toolchains.
- **Configuration System**: A robust system for managing `targets.json` and application-specific configurations, generating the necessary CMake files for the build process.

## Technical Implementation

Mbed Tools is implemented in Python and follows a modular architecture. It relies on several key technologies to deliver its functionality:

- **Build System**: It moves away from the custom build scripts of previous versions in favor of **CMake** (version 3.19.0+) and **Ninja**. This allows for better integration with modern IDEs and significantly faster incremental builds.
- **CLI Framework**: Built using the **Click** library, providing a consistent and user-friendly command-line experience with built-in help and option parsing.
- **Templating**: Uses **Jinja2** to generate build files and project metadata dynamically based on the target hardware and user configuration.
- **Hardware Interaction**: Utilizes libraries like `pyudev` (on Linux) and `pywin32` (on Windows) to interact with system-level USB and serial interfaces for device discovery.

## Getting Started

Mbed Tools is distributed via PyPI and can be installed easily within a Python virtual environment. Once installed, the `mbed-tools` command becomes available for project interaction.

### Basic Workflow

To create a new project and prepare it for a specific target, a developer might use the following sequence:

```bash
# Create a new project
mbed-tools new my-project

# Detect connected devices
mbed-tools detect

# Configure the build for a specific target and toolchain
mbed-tools configure -m K64F -t GCC_ARM

# Compile the project
mbed-tools compile -m K64F -t GCC_ARM
```

## Ecosystem and Compatibility

The project is deeply integrated into the Mbed OS ecosystem. It parses `targets.json` from the Mbed OS source tree to understand hardware capabilities, memory maps, and toolchain requirements. By generating `mbed_config.cmake`, it bridges the gap between Mbed's complex configuration system and the standard CMake build process. This allows developers to use standard C++ development tools while still benefiting from the hardware abstraction and RTOS features provided by Mbed OS.
