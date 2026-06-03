---
title: MicroPython Stubber
summary: A specialized toolset for generating PEP 484 type hint stubs for MicroPython
  firmware, enabling advanced IntelliSense and static analysis in modern IDEs. It
  supports a wide range of ports including ESP32, RP2040, and STM32, and facilitates
  the creation of stubs for custom firmware builds.
slug: micropython-stubber
codeUrl: https://github.com/Josverl/micropython-stubber
siteUrl: https://micropython-stubber.readthedocs.io/
star: 241
version: v1.26.2
lastUpdated: '2025-12-18'
rtos: ''
libraries:
- micropython
- lvgl
topics:
- firmware-stubs
- micropython
- micropython-stubber
- micropython-stubs
- mypy
- mypy-stubs
- pylance
- pyright
- python
- static-typing
- typed
- vscode
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- micropython-stubs
- micropy-cli
- micropico-visual-studio-code-extension
- micropython-and-lvgl-firmware-for-esp32
- micropython-plugin-for-pycharm-and-intellij
- cmsis-parser
---

# Boosting MicroPython Development with MicroPython Stubber

Developing for MicroPython often presents a unique challenge: while the language is Python, the standard libraries and hardware-specific modules differ significantly from CPython. This discrepancy frequently leaves modern code editors like VS Code "in the dark," resulting in a lack of IntelliSense, broken linting, and a constant need to reference external documentation for simple API calls. The MicroPython Stubber project bridges this gap by providing the tooling necessary to create and maintain high-quality stub files (.pyi) that describe the MicroPython API in a way that static analysis tools can understand.

## The Power of PEP 484 Stubs

At its core, the project leverages PEP 484 Type Hints to create a shadow version of the MicroPython environment. These stubs do not contain executable code; instead, they define the classes, methods, and parameters available in specific firmware versions. By pointing an editor like VS Code (using the Pylance or Pyright extensions) to these stubs, developers gain access to features usually reserved for standard Python development:

- **Real-time parameter hints** for hardware modules like `machine`, `network`, and `utime`.
- **Accurate code completion** for board-specific frozen modules.
- **Static type checking** to catch errors before the code is ever deployed to the hardware.

## A Comprehensive Workflow

The `micropython-stubber` provides a streamlined CLI workflow to generate these stubs from various sources. The process typically involves several stages:

1.  **Switching Context**: Using `stubber switch`, developers can lock their workspace to a specific MicroPython release, such as a stable version, a preview, or a specific version tag.
2.  **Generating Docstubs**: The `docstubs` command parses the official MicroPython documentation to create stubs that include rich docstrings and parameter information.
3.  **Capturing Frozen Modules**: MicroPython often "freezes" Python modules into the firmware to save space. The `frozen` command extracts these from reference firmware downloads to ensure the stubs match the actual code on the device.
4.  **Merging and Building**: The `merge` and `build` commands combine documentation-based stubs with frozen modules and board-specific definitions to create a final, installable output.

## Support for Custom Firmware

One of the most powerful aspects of the stubber is its ability to handle custom MicroPython builds. If you are working with a fork of MicroPython or a custom Raspberry Pi Pico W firmware with unique C-modules, the stubber can be configured to generate stubs specifically for your build. This ensures that even the most specialized embedded projects can benefit from modern IDE features. The tool can pull documentation-based stubs and enrich them with board-specific frozen modules to create a perfect match for your hardware.

## Integration and Ecosystem

The project is part of a larger ecosystem, working closely with the `micropython-stubs` repository, which serves as a central collection of pre-generated stubs for popular boards like the ESP32, Raspberry Pi Pico, and STM32. For users who do not want to build their own, many of these stubs are available directly via PyPI, allowing for a simple `pip install` to get started. 

By automating the creation of these interface definitions, MicroPython Stubber transforms the embedded coding experience from a manual, documentation-heavy process into a fluid, modern development workflow. It allows developers to focus on their logic rather than memorizing register addresses or function signatures.
