---
title: Tock OS Docker Build Environment
summary: A Docker image providing a complete build environment for Tock OS applications.
  It includes necessary dependencies such as the ARM GCC toolchain, Rust compiler,
  and tockloader for flashing and managing applications on embedded hardware.
slug: tock-os-docker-build-environment
codeUrl: https://github.com/jehoffmann/tock-docker
star: 1
lastUpdated: '2020-03-08'
rtos: tock
topics:
- build-automation
- docker
- docker-image
- iot
- rust
- tock
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- tock-os-docker-image
- docker-containers-for-the-zephyr-rtos
- nuttx-development-docker-environment
- docker-embedded-development-toolchains
- zmk-docker-images
- nrf-connect-sdk-build-docker-environment
---

## Overview

The Tock OS Docker project provides a pre-configured, containerized development environment specifically designed for building and deploying Tock OS applications. Tock is a secure, multi-tenant operating system for microcontrollers, and setting up its development environment can often involve managing complex dependencies across different operating systems. This Docker image simplifies that process by bundling all necessary tools into a single, reproducible container.

## Key Features and Tools

The image is built on top of Ubuntu 18.04 and includes a comprehensive suite of tools required for modern embedded development in the Tock ecosystem:

- **Rust Toolchain**: Since Tock OS and its applications are primarily written in Rust, the image includes `rustup` to manage the Rust compiler and associated tools.
- **ARM GCC Toolchain**: The `gcc-arm-none-eabi` package is included for compiling C-based components and handling low-level linking for ARM Cortex-M targets.
- **Tockloader**: A specialized Python utility used for flashing Tock OS kernels and uploading applications to supported boards. It also provides features for managing processes on the device.
- **Build Utilities**: Standard build tools such as `cmake`, `build-essential`, and `git` are pre-installed to support various build systems and version control.

## Technical Implementation

The environment is defined via a Dockerfile that automates the installation of system-level dependencies and Python-based tools. By using this image, developers can ensure that their build environment is identical to their peers' and CI/CD pipelines, eliminating the "it works on my machine" problem common in embedded systems development.

The inclusion of `tockloader` via `pip3` ensures that once the container is running, users have immediate access to the primary tool for interacting with Tock-compatible hardware. The environment also sets up standard paths for `CARGO_HOME` and `RUSTUP_HOME`, ensuring that Rust crates and toolchains are managed correctly within the container filesystem.

## Getting Started

This image is particularly useful for developers who want to experiment with Tock OS without polluting their host operating system with multiple toolchains. It can be used as a base for CI/CD runners or as a development shell. Because it includes the full ARM cross-compilation suite and the Rust compiler, it is capable of building both the Tock kernel itself and the user-level applications (processes) that run on top of it.
