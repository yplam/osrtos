---
title: NuttX Applications
summary: A comprehensive collection of applications, utilities, and middleware for
  the NuttX Real-Time Operating System. It provides a modular framework for developing
  user-space commands, network services, and system tools that integrate seamlessly
  with the NuttShell (NSH).
slug: nuttx-applications
codeUrl: https://github.com/PX4/NuttX-apps
star: 29
version: upstream_7.22+
lastUpdated: '2024-02-26'
rtos: nuttx
topics:
- nuttx
- pixhawk
- px4
- rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- nuttx-api-examples
- nuttx-development-docker-environment
- nuttx-real-time-operating-system
- x-cube-azrtos-g4-azure-rtos-software-expansion-for-stm32cube
- stm32h5-classic-core-middleware-coremw-mcu-firmware-package
- stm32cuben6-mcu-firmware-package
---

## Overview

The NuttX Applications repository is a vital component of the NuttX ecosystem, providing a "break away" directory structure for user-space software. While the core NuttX repository contains the RTOS kernel and hardware abstraction layers, this repository houses the various applications, examples, and utilities that make the system functional for end-users. It is designed to be located at the same directory level as the NuttX kernel, allowing the build system to automatically discover and compile selected applications based on the system configuration.

## Architecture and Integration

Applications in this repository are categorized into functional sub-directories such as `netutils`, `crypto`, `graphics`, `fsutils`, and `system`. The integration with the NuttX kernel is handled through a sophisticated build system using Kconfig and GNU Make. 

### Built-In Applications

One of the most powerful features of this repository is the support for "Built-In Applications." These are programs that can be invoked by name string, typically through the NuttShell (NSH). When an application is enabled in the configuration (e.g., `CONFIG_EXAMPLES_HELLO=y`), the build system automatically registers it in the internal application list. This allows the shell to execute the program using the `exec_builtin()` interface.

### Synchronous vs. Asynchronous Execution

By default, commands started from the NSH command line run asynchronously. However, the system supports synchronous execution if `CONFIG_SCHED_WAITPID` is enabled. This allows the shell to wait for a command to complete before returning to the prompt, utilizing the standard `waitpid()` RTOS interface. Users can still override this behavior by appending an ampersand (`&`) to their commands.

## Key Components

The repository is organized into several specialized areas:
- **nshlib**: The core library for the NuttShell, providing the command-line interface.
- **netutils**: A collection of networking applications and protocol implementations.
- **graphics**: Support for displays and graphical user interfaces.
- **system**: Core system utilities and background daemons.
- **examples**: A wide variety of sample code, including the ubiquitous `hello` world, which serves as a template for new developers.

## Custom Application Development

NuttX-apps is designed for extensibility. Developers can add their own applications by creating a sub-directory with four essential files:
1. **Kconfig**: To integrate the application into the menu-driven configuration system.
2. **Make.defs**: To inform the top-level build system about the new application.
3. **Makefile**: To define the local build rules.
4. **Source Code**: The C/C++ code providing the `main()` entry point.

For projects that require keeping proprietary code separate from the main tree, the system supports building board-specific pieces outside the source tree. This can be achieved by defining `CONFIG_APPS_DIR` to point to a custom directory or by using symbolic links within the `apps/` folder, which the build system will automatically discover during the `make context` phase.

## Export and Distribution

The build system includes a `make export` target that bundles header files, libraries, and startup objects into a single archive. This is particularly useful for developers who wish to build their applications in a separate environment while linking against a pre-compiled NuttX kernel. Additionally, the repository contains cryptographic software and is classified under ECCN 5D002.C.1, making it eligible for export under the TSU exception for open-source software.
