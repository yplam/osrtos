---
title: seL4 Core Platform (seL4cp) Workshop
summary: A workshop project implementing a C-based version of the Wordle game running
  on the seL4 Core Platform. It demonstrates the development of isolated components
  on the seL4 microkernel, targeting ARM platforms such as QEMU and Raspberry Pi 3B.
slug: sel4-core-platform-sel4cp-workshop
codeUrl: https://github.com/ptrk8/seL4cp-workshop
siteUrl: https://summit.ivanvelickovic.com/
star: 1
lastUpdated: '2023-01-27'
rtos: sel4
topics:
- c
- sel4
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- fel4-test-project
- rust-sel4-toy-system-for-i-mx6-sabre-lite
- sel4twinkle-alloc-rs
- rust-fel4-workspace-for-raspberry-pi-3
- sel4-kernel-101
- sel4-kernel-ega-text-display
---

## Overview

The seL4 Core Platform (seL4cp) Workshop repository provides a practical implementation of the popular web-based game "Wordle," built specifically for the seL4 microkernel ecosystem. Originally developed as part of a workshop for the seL4 Summit 2022, this project serves as an introductory guide for developers looking to interact with the seL4 Core Platform, a framework designed to simplify the development of systems on the world's most secure microkernel.

## Technical Architecture

The project is structured as a multi-component system, leveraging the isolation and communication primitives provided by seL4. Instead of a monolithic application, the game is split into distinct functional units:

- **Wordle Server**: Manages the game logic, mystery word selection, and attempt evaluation.
- **Serial Server**: Handles low-level I/O communication, interfacing with the hardware serial port.
- **Client**: The user-facing component that processes input and displays the game state.

This architecture demonstrates the core philosophy of seL4: decomposing a system into small, isolated components that communicate via well-defined interfaces. The use of the seL4 Core Platform framework abstracts much of the underlying microkernel complexity, such as capability management and low-level system calls, allowing developers to focus on application logic.

## Hardware and Simulation

The workshop is designed to run on ARM-based targets. It includes support for:
- **QEMU ARM Virt**: A virtualized environment using `qemu-system-aarch64` with a Cortex-A53 CPU, providing an accessible way to test the system without physical hardware.
- **Raspberry Pi 3B**: The repository contains specific configurations and SDK components for deploying the solution to physical RPi3B hardware.

## Gameplay and Features

The implementation is a faithful C-language recreation of the Wordle mechanics. Users interact with the game via a serial terminal. The system provides visual feedback using standard terminal colors to indicate the accuracy of guesses:
- **Green**: The letter exists and is in the correct position.
- **Yellow**: The letter exists but is in the incorrect position.
- **White**: The letter does not exist in the mystery word.

## Development Environment

The project utilizes a dual build system approach. A `Makefile` provides high-level commands for building and running different parts of the workshop (Part 1 through Part 3), while `CMakeLists.txt` defines the underlying build structure and library dependencies. The repository includes a bundled SDK and workshop materials, ensuring that the environment is reproducible for learners.

To verify the environment, the project includes a 'check' target that boots a simple "hello, world" image in QEMU, confirming that the seL4cp bootstrap process and system invocations are functioning correctly before the user proceeds to the game implementation.
