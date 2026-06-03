---
title: VS Code Zephyr Development Environment
summary: A configuration template for Visual Studio Code to support building and debugging
  Zephyr RTOS projects. It provides pre-configured task and launch settings for the
  Zephyr SDK, enabling seamless integration with Ninja and GDB for embedded development.
slug: vs-code-zephyr-development-environment
codeUrl: https://github.com/codingspirit/vscode-zephyr
siteUrl: https://zephyrproject.org/
star: 6
lastUpdated: '2020-09-16'
rtos: zephyr
topics:
- vscode-settings
- zephyr
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- kconfig-for-the-zephyr-project
- pico-zephyr-project
- stm32-cmake-cmsis-project-skeleton
- stm32f030-cmake-cmsis-project-skeleton
- docker-containers-for-the-zephyr-rtos
- swedish-embedded-workstation
---

## Overview

Developing for the Zephyr RTOS often involves complex command-line toolchains and environment configurations. The `vscode-zephyr` project provides a streamlined starting point for developers who prefer Visual Studio Code as their primary IDE. It offers a set of pre-configured `.vscode` settings that bridge the gap between the Zephyr SDK and the VS Code interface, enabling one-click builds and integrated debugging.

## Key Features

The repository focuses on automating the most common development workflows in the Zephyr ecosystem:

- **Automated Build Tasks**: Pre-configured `task.json` settings allow users to trigger builds using Ninja or other Zephyr-supported build systems directly from the IDE.
- **Integrated Debugging**: A `launch.json` configuration is provided to set up the GDB debugger, specifically targeting the Zephyr SDK's toolchain.
- **Environment Management**: Centralized configuration for critical Zephyr variables such as `ZEPHYR_BASE`, `ZEPHYR_SDK_INSTALL_DIR`, and target board definitions.

## Technical Configuration

The project relies on standard VS Code configuration files to manage the embedded workflow. The `task.json` file is set up to handle environment variables that the Zephyr build system requires. Key variables include:

- `ZEPHYR_TOOLCHAIN_VARIANT`: Specifies the toolchain being used (e.g., "zephyr").
- `ZEPHYR_SDK_INSTALL_DIR`: The path to the local Zephyr SDK installation.
- `ZEPHYR_BASE`: The location of the Zephyr source tree.
- `VS_CODE_BOARD_TO_BUILD`: The specific hardware target (e.g., `reel_board`).

For debugging, the `launch.json` file points to the specific cross-compiler GDB included in the Zephyr SDK (such as `arm-zephyr-eabi-gdb`), allowing for source-level debugging directly within the VS Code editor.

## Getting Started

To use this configuration, developers can copy the `.vscode` folder into their project root. The primary setup involves modifying the environment variables in the JSON files to match the local system paths and the specific hardware board being targeted.

Once configured, the workflow is highly efficient:
- **Ctrl+Shift+B**: Triggers the build task.
- **F5**: Starts the debugging process, launching the GDB server and attaching to the target hardware.

## Known Considerations

Users should be aware of a few minor issues common in embedded debugging environments. An exception may occur when the debugger stops at `main()`, which can typically be ignored as the process remains functional. Additionally, due to toolchain optimizations or specific Zephyr build configurations, some lines may not accept breakpoints, though step-by-step execution usually remains available for those sections of code.
