---
title: Micropy Cli
summary: A project management and generation tool for MicroPython development. It
  automates workspace setup with linting, IntelliSense, and dependency management
  for modern IDEs like VSCode, targeting platforms such as ESP32 and Raspberry Pi
  Pico.
slug: micropy-cli
codeUrl: https://github.com/BradenM/micropy-cli
siteUrl: https://micropy-cli.readthedocs.io
star: 329
version: v4.2.2
lastUpdated: '2024-07-30'
rtos: ''
libraries:
- micropython
topics:
- autocompletion
- automate
- cli
- ide
- intellisense
- linting
- microcontroller
- micropython
- pylint
- stubs
- visual-studio-code
- vscode
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- micropico-visual-studio-code-extension
- micropython-stubber
- mbed-vscode-tools
- cmsis-rp2040
- micropython-stubs
- esp32-mpy-jama
---

## Streamlining MicroPython Development

Micropy Cli is a project management and generation tool designed to bring a modern development experience to the MicroPython ecosystem. While MicroPython allows for rapid prototyping on microcontrollers, the development environment often lacks the robust features that Python developers take for granted, such as sophisticated linting, IntelliSense, and automated dependency management. Micropy Cli bridges this gap by automating the creation of a workspace tailored for modern IDEs, specifically VSCode.

The tool's primary goal is to simplify the process of writing MicroPython code by handling the complexities of environment configuration. It ensures that your local development environment accurately reflects the capabilities and constraints of your target hardware.

## Key Features and Capabilities

Micropy Cli provides a comprehensive suite of features to enhance the developer workflow:

- **Intelligent Autocompletion & Linting**: By leveraging stub files, the tool enables VSCode IntelliSense and linting that is compatible with specific MicroPython firmware versions.
- **Dependency Management**: It handles external dependencies automatically, tracking them in a `micropy.json` file (similar to `package.json`) and keeping `requirements.txt` and `dev-requirements.txt` updated.
- **Stub Management**: Stubs are the core of Micropy Cli's intelligence. The tool can search for, download, and even create stubs directly from a connected MicroPython device over USB or WiFi.
- **VCS Compatibility**: It generates a workspace structure that is friendly to version control systems, allowing teams to share settings like `.pylint.rc` and `settings.json` while ignoring environment-specific symlinks.

## Technical Architecture

When a project is initialized using `micropy init`, the tool creates two essential items: a `.micropy/` folder and a `micropy.json` file. The `.micropy/` folder contains symlinks to a global stubs directory, allowing the project to reference required files relatively. This architecture ensures that the workspace remains portable and consistent across different machines.

For dependency handling, Micropy Cli manages the tricky process of incorporating external modules into MicroPython projects. It can source packages from PyPI, URLs, or local paths, and automatically stubs them to provide autocomplete support for the libraries you intend to deploy to your device.

## Hardware and Firmware Support

Micropy Cli is designed to be hardware-agnostic within the MicroPython ecosystem. It supports a wide range of devices and firmware versions by sourcing stubs from the [micropy-stubs](https://github.com/BradenM/micropy-stubs) repository. Common targets include:

- **ESP32 and ESP8266**: Full support for standard MicroPython firmware.
- **Raspberry Pi Pico**: Integration for the RP2040 platform.
- **Custom Firmware**: Users can generate their own stubs from any device running MicroPython using the `micropy stubs create` command.

## Getting Started

Setting up a new project is straightforward. After installing the tool via pip, developers can run a few simple commands to get started:

```bash
# Install Micropy Cli
pip install micropy-cli

# Initialize a new project
micropy init my_project

# Add stubs for your specific device
micropy stubs add esp32-micropython-1.11.0

# Install a library
micropy install picoweb
```

Once initialized, the tool configures VSCode automatically, allowing you to import libraries and receive real-time feedback from the linter and type-checker just as you would in a standard CPython project. This workflow significantly reduces the friction of moving from a desktop Python environment to embedded hardware.
