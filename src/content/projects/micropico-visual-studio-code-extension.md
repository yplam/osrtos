---
title: MicroPico Visual Studio Code Extension
summary: A comprehensive development extension for Visual Studio Code tailored for
  MicroPython projects on Raspberry Pi Pico, ESP32, and Teensy 4.0. It provides an
  integrated REPL, automatic code completion via stubs, and streamlined file management
  for embedded microcontrollers.
slug: micropico-visual-studio-code-extension
codeUrl: https://github.com/paulober/MicroPico
star: 360
version: v4.3.4
lastUpdated: '2025-11-28'
rtos: ''
libraries:
- micropython
topics:
- micropython
- micropython-rpi-pico
- raspberry-pi-pico
- raspberry-pi-pico-w
- vscode
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- micropython-stubs
- micropy-cli
- micropython-plugin-for-pycharm-and-intellij
- pico-zephyr-project
- cmsis-rp2040
- rp2040-projects-by-armstrong-subero
---

## Overview

MicroPico (formerly known as Pico-W-Go) is a powerful Visual Studio Code extension designed to streamline the development workflow for MicroPython on the Raspberry Pi Pico and Pico W. Beyond the Pico family, it has expanded to include experimental support for a variety of popular microcontrollers, including the ESP32-WROOM, ESP32-C3, ESP32-S3, and Teensy 4.0. By integrating essential development tools directly into the VS Code environment, MicroPico eliminates the friction often associated with embedded Python development.

## Key Features

The extension provides a suite of features that transform VS Code into a full-featured IDE for MicroPython:

- **Integrated REPL**: A pseudo-terminal integration allows for direct communication with the MicroPython REPL on the board, supporting tab-completion and real-time interaction.
- **Intelligent Code Completion**: MicroPico includes high-quality stubs for MicroPython firmware, providing developers with code highlighting, snippets, and documentation-aware auto-completion.
- **Project Management**: Tools for initializing projects, managing global and workspace-specific settings, and switching between different microcontroller stubs.
- **File Synchronization**: Seamlessly run current files on the hardware or transfer entire projects to and from the board's filesystem. It includes advanced features like `pyignore` lists to exclude specific files during synchronization.
- **Device Manager UI**: An experimental interface for managing Wi-Fi connections and installing packages via `mip` specifically for the Pico W.

## Technical Implementation

MicroPico leverages the `pico-mpy-com` library (and previously `pyboard-serial-com`) to handle serial communication with the target devices. It utilizes a virtual workspace provider to represent the board's filesystem within VS Code, allowing users to browse and edit files directly on the microcontroller. The extension is built using TypeScript and Webpack, ensuring a responsive and cross-platform experience across Windows, macOS, and Linux.

For Linux users, the extension documentation provides specific guidance on managing serial port permissions, which is a common hurdle in embedded development on that platform.

## Getting Started

To begin a project, users can run the `Initialize MicroPico project` command. This sets up the necessary stubs and configuration files within the workspace. A simple "Hello World" for the onboard LED illustrates the ease of use:

```python
from machine import Pin
from utime import sleep

pin = Pin("LED", Pin.OUT)

print("LED starts flashing...")
while True:
    try:
        pin.value(not pin.value())
        sleep(1) # sleep 1sec
    except KeyboardInterrupt:
        break
pin.off()
print("Finished.")
```

Once the code is written, developers can use the "Run" button in the status bar or the command palette to execute the script immediately on the connected hardware.

## Advanced Configuration

MicroPico offers extensive customization through VS Code settings. Developers can configure automatic connection to serial ports, define specific folders for synchronization, and toggle features like garbage collection before uploads or soft-resets after file transfers. These options allow the tool to adapt to various workflows, from simple script testing to complex multi-file project deployments.
