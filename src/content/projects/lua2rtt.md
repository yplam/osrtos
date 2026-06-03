---
title: Lua2RTT
summary: A Lua interpreter port for the RT-Thread RTOS, designed for seamless integration
  via the RT-Thread package manager. It supports Lua versions 5.1.4 and 5.3.4, providing
  an interactive shell interface and script execution capabilities for embedded systems.
slug: lua2rtt
codeUrl: https://github.com/liu2guang/Lua2RTT
star: 47
version: v1.0.0
lastUpdated: '2021-04-14'
rtos: rt-thread
topics:
- env
- rt-thread
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- micropython-port-for-rt-thread
- lua-rtos-for-esp32
- littlevgl2rtt
- c-common-for-rt-thread
- freertos-wrapper-for-rt-thread
- rust-support-for-rt-thread
---

## Overview

Lua2RTT is a specialized port of the Lua programming language specifically designed for the RT-Thread real-time operating system (version 3.0 and above). The project aims to provide a seamless, "out-of-the-box" experience for developers who want to embed scripting capabilities into their firmware without the overhead of manual porting and integration.

By bringing Lua to RT-Thread, developers can leverage the flexibility of a high-level scripting language for logic that requires frequent updates or user-level customization, while maintaining the real-time performance of the underlying C-based RTOS.

## Key Features

- **Seamless RT-Thread Integration**: Fully compatible with the RT-Thread package management system (`pkgs`), allowing for easy installation and configuration via `menuconfig`.
- **Multiple Version Support**: Currently supports both Lua 5.1.4 and Lua 5.3.4, giving developers the choice between the lightweight 5.1 branch or the more modern features of 5.3.
- **Interactive Shell (REPL)**: Includes a custom implementation of a Lua shell that integrates with RT-Thread's FinSH/MSH. It supports command history, line editing, and special key handling (like arrow keys for history navigation).
- **Thread-Safe Execution**: The interpreter runs in its own RT-Thread task, utilizing semaphores for non-blocking I/O operations and ensuring it plays nicely with other system threads.

## Technical Implementation

The core of the project is found in `lua2rtt.c`, which acts as the bridge between the standard Lua source and the RT-Thread environment. It implements a custom `readline` function that handles terminal escape sequences, allowing for a professional-feeling interactive console on embedded hardware.

When a user starts the Lua interpreter from the RT-Thread shell, the system creates a dedicated thread with a configurable stack size (defaulting to 10KB). This thread manages the Lua state and handles input/output through the RT-Thread device drivers, specifically targeting the console device.

## Getting Started

Because Lua2RTT is part of the official RT-Thread online packages, installation is straightforward for users of the RT-Thread Env tool:

1. Run `menuconfig` in your BSP directory.
2. Navigate to `RT-Thread online packages` -> `language`.
3. Enable `Lua2RTT` and select your preferred Lua version.
4. Update your packages using `pkgs --update`.
5. Compile and download the project to your target board.

Once running, you can enter the Lua environment by simply typing `lua` into the RT-Thread MSH console. From there, you can execute Lua commands directly or run scripts. To exit the interactive mode and return to the RT-Thread shell, users can use the `CTRL+D` shortcut.
