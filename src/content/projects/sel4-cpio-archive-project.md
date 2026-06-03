---
title: seL4 CPIO Archive Project
summary: A demonstration project for the seL4 microkernel that illustrates how to
  bundle multiple applications into a CPIO archive. It features a root server that
  parses the archive at runtime to load and execute embedded application binaries
  using the seL4 build system and libcpio.
slug: sel4-cpio-archive-project
codeUrl: https://github.com/manu88/SeL4_CPIO
star: 1
lastUpdated: '2018-09-28'
rtos: sel4
topics:
- cpio
- sel4
- tutorial
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- sel4-userland-library-tutorial
- sel4-kernel-101
- fel4-test-project
- rust-sel4-toy-system-for-i-mx6-sabre-lite
- sel4-kernel-ega-text-display
- apache-nuttx-nsh-task-demo
---

## Overview

The seL4 CPIO Archive project provides a practical implementation of application bundling within the seL4 microkernel ecosystem. Inspired by the official seL4 tutorials, this project demonstrates how to move beyond a single-application system by packaging multiple binaries into a CPIO (Cpio Archive) format. This archive is then linked directly into a root server program, which acts as the system's initial task loader.

In a typical seL4 environment, the root server is the first user-level process to run. By embedding a CPIO archive within this root server, developers can create a multi-tasking environment where the primary 'init' task is responsible for extracting and launching secondary applications from memory.

## Technical Architecture

The project is structured into two main components: the `init` task and the `app` application. 

### The Application (app)

The `app` is a simple C program designed to be bundled. It utilizes standard C libraries provided by the seL4 environment, such as `muslc`, to perform basic operations like printing to the console. A critical aspect of building this application for seL4 is the specific linker flag configuration (`-u __vsyscall_ptr`), which ensures compatibility with the system's syscall interface and prevents capability faults during execution.

### The Root Server (init)

The `init` program serves as the orchestrator. It is linked against `libcpio`, a utility library provided by seL4's `util_libs`. The root server declares an external character array, `_cpio_archive[]`, which the linker maps to the start address of the bundled data. Using the `libcpio` API, the root server can then parse this memory region to locate and execute the binaries contained within.

## Build System Integration

One of the most powerful features of this project is its integration with the seL4 CMake build system. It utilizes the `MakeCPIO` utility, which automates the process of taking a list of compiled binaries and bundling them into a linkable object file (`archive.o`). 

To manage dependencies, the project uses global CMake properties to track which applications should be included in the final archive. This allows for a modular build process where individual application projects can register themselves to be included in the root server's payload. 

```cmake
# Example of adding an app to the CPIO list
set_property(GLOBAL APPEND PROPERTY apps_property "$<TARGET_FILE:app>")

# Creating the archive in the init task
get_property(cpio_apps GLOBAL PROPERTY apps_property)
MakeCPIO(archive.o "${cpio_apps}")
```

## Getting Started

The project is designed to be built using the standard seL4 toolchain, including `ninja` and the `simulate` script for QEMU-based testing. It targets the x86_64 platform by default but is structured to be portable across other architectures supported by the seL4 kernel. By running the simulation, users can observe the `init` task successfully loading the `app` binary and executing its entry point, demonstrating a functional multi-binary seL4 system.
