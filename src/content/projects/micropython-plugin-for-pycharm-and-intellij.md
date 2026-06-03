---
title: MicroPython Plugin for PyCharm and IntelliJ
summary: A specialized IDE plugin for PyCharm and IntelliJ IDEA that provides a complete
  development environment for MicroPython devices. It includes features for code completion,
  syntax checking, direct firmware flashing, and an integrated REPL for hardware like
  the ESP8266, PyBoard, and Raspberry Pi Pico.
slug: micropython-plugin-for-pycharm-and-intellij
codeUrl: https://github.com/JetBrains/intellij-micropython
siteUrl: https://plugins.jetbrains.com/plugin/9777-micropython
star: 537
version: 1.4.6
lastUpdated: '2024-08-29'
rtos: ''
libraries:
- micropython
topics:
- editor
- esp32
- esp8266
- ide
- intellij
- microbit
- micropython
- pyboard
- pycharm
- raspberry-pi-pico
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- micropico-visual-studio-code-extension
- micropython-stubs
- mu-a-simple-python-code-editor
- esp32-mpy-jama
- micropy-cli
- mbed-vim
---

## Streamlining MicroPython Development

The MicroPython plugin for JetBrains IDEs (PyCharm and IntelliJ IDEA) provides a robust set of tools designed to bridge the gap between desktop development environments and embedded hardware. By integrating MicroPython-specific features directly into the IDE, it allows developers to write, check, and deploy Python code to microcontrollers with the same level of sophistication expected in standard software engineering workflows.

## Supported Hardware and Platforms

The plugin is designed to work with a variety of popular MicroPython-compatible boards. Currently, it provides dedicated support for:

*   **ESP8266**: Popular low-cost Wi-Fi enabled microcontrollers.
*   **PyBoard**: The original MicroPython development board.
*   **BBC Micro:bit**: An educational board widely used in STEM.
*   **Raspberry Pi Pico**: The RP2040-based board from Raspberry Pi.

Beyond these specific targets, the plugin is extensible and aims to support more device-specific modules and MicroPython variations over time.

## Core Features for Embedded Developers

### Advanced Code Insight
One of the primary advantages of using this plugin is the context-aware code completion. It provides documentation and suggestions specifically for MicroPython modules, which often differ from the standard Python library. Developers can access quick documentation windows (using `Ctrl+Q` or `F1`) to understand hardware-specific APIs without leaving the editor. Additionally, the plugin performs real-time syntax and type checking, catching errors before the code is even flashed to the device.

### Seamless Device Interaction
The plugin simplifies the process of moving code from the computer to the microcontroller. Users can right-click on files or entire directories to "Flash" them to the connected device. For complex projects, sub-directories can be marked as "Sources Root" to ensure the directory structure is preserved correctly on the device's filesystem.

### Integrated REPL
Testing code snippets and inspecting device state is made easy through the integrated MicroPython REPL (Read-Eval-Print Loop). Accessible via the Tools menu, this feature opens a terminal window directly within the IDE, allowing for immediate interaction with the hardware's Python shell.

## Technical Implementation

The plugin itself is a hybrid project written in Kotlin and Python. It leverages the IntelliJ Platform's extensibility to provide the UI and static analysis components, while utilizing Python-based tools like `adafruit-ampy` and `pyserial` to handle the low-level communication with embedded hardware over serial ports. 

To get started, users typically install the plugin from the JetBrains Marketplace, enable MicroPython support in their project settings, and specify the device path. The plugin also includes a "requirements installer" that automatically handles the installation of necessary Python packages required for device communication, ensuring a smooth setup process for developers new to the ecosystem.
