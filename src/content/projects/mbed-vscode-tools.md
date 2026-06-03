---
title: mbed-vscode-tools
summary: A command-line utility designed to automate the configuration of Visual Studio
  Code IntelliSense for Mbed OS projects. It generates and updates the c_cpp_properties.json
  file by extracting include paths and defines from Mbed build directories. It works
  in conjunction with the official mbed-tools CLI and supports GCC ARM and ARMCC toolchains.
slug: mbed-vscode-tools
codeUrl: https://github.com/shindoh-org/mbed-vscode-tools
star: 2
lastUpdated: '2022-03-24'
rtos: mbed-os
topics:
- mbed
- mbed-os
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mbed-tools
- micropy-cli
- smart-home-device-configurator
- mbed-support-for-clion
- kconfig-for-the-zephyr-project
- mbed-vim
---

## Overview

Developing for Mbed OS often involves navigating complex build systems and deep directory structures. While Mbed Studio provides an integrated environment, many software engineers prefer the flexibility and ecosystem of Visual Studio Code. However, manually configuring VSCode's IntelliSense to recognize the vast array of include paths and preprocessor defines in an Mbed project is a significant challenge. 

`mbed-vscode-tools` is a Python-based command-line interface (CLI) created to solve this specific problem. It automates the management of the `c_cpp_properties.json` file, ensuring that code navigation, autocomplete, and error checking work seamlessly within the VSCode environment for Mbed-based firmware development.

## How It Works

The tool acts as a bridge between the official `mbed-tools` (the Mbed OS 6 build system) and the VSCode editor. When you configure an Mbed project using the official CLI, it generates a build directory containing CMake artifacts. `mbed-vscode-tools` parses these artifacts to extract the exact compiler flags, include directories, and macro definitions required for your specific target hardware and toolchain.

By targeting the `c_cpp_properties.json` configuration, the tool allows developers to maintain a clean workspace while the utility handles the "heavy lifting" of path resolution. This is particularly useful when switching between different Mbed targets (e.g., moving from an STM32 to a Nordic NRF52) or different build profiles (debug vs. release), as these changes often alter the required include paths.

## Key Features

- **Automated Updates**: Automatically populates the `includePath` and `defines` fields in your VSCode configuration.
- **Toolchain Support**: Compatible with both the GNU Arm Embedded Toolchain (`arm-none-eabi-gcc`) and the official Arm Compiler (`armcc/armclang`).
- **Integration with mbed-tools**: Designed to work alongside the modern Mbed OS 6 workflow and `mbed-tools configure` commands.
- **Customizable Entries**: Allows users to specify which configuration entry in `c_cpp_properties.json` should be managed, defaulting to a configuration named "Mbed".

## Technical Workflow

To use the tool, developers typically follow a three-step process within their Mbed program directory:

1.  **Prepare the Configuration**: Create a standard `c_cpp_properties.json` file with a placeholder entry for Mbed.
2.  **Configure the Build**: Use the official `mbed-tools configure` command to set the target board and toolchain. This generates the necessary metadata in the `cmake_build` directory.
3.  **Sync to VSCode**: Run `mbed-vscode-tools update`, pointing it to the generated build directory. The tool then injects the discovered paths directly into the VSCode settings.

```bash
# Example update command
$ mbed-vscode-tools update ./cmake_build/K64F/DEVELOP/GCC_ARM .vscode/c_cpp_properties.json
```

## Requirements

Since the tool is built in Python, it requires Python 3.6 or higher. It relies on the `click` package for its command-line interface and is intended for use with Mbed OS projects that utilize `mbed-tools` (version 7.0.0 or later) and CMake-based build systems. This makes it a modern solution for developers working with the latest iterations of the Mbed ecosystem.
