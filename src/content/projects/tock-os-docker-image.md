---
title: Tock OS Docker Image
summary: A pre-configured Docker-based development environment for Tock OS. It includes
  the ARM GNU Embedded Toolchain, specific Rust nightly builds, and essential utilities
  like Xargo and Uncrustify for building and formatting embedded firmware.
slug: tock-os-docker-image
codeUrl: https://github.com/george-hopkins/tock-docker
siteUrl: https://www.tockos.org/
star: 0
lastUpdated: '2018-05-01'
rtos: tock
topics:
- docker-image
- rust
- tock
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- tock-os-docker-build-environment
- nuttx-development-docker-environment
- zmk-docker-images
- docker-embedded-development-toolchains
- artik-developer-environment-docker
- docker-containers-for-the-zephyr-rtos
---

## Overview

The Tock OS Docker Image provides a standardized, reproducible environment for developing and building applications for Tock OS. Tock is a security-focused operating system for microcontrollers, notable for being written in Rust and utilizing a unique architecture that separates the kernel from user-level applications (capsules). Because embedded development often requires specific versions of compilers and specialized tools, this Docker image simplifies the onboarding process by bundling all necessary dependencies into a single container.

## Environment Composition

Setting up an environment for Tock OS manually can be complex due to the specific requirements of the Rust toolchain and cross-compilation tools. This image automates that process by including:

- **ARM GNU Embedded Toolchain**: Specifically version 6-2016q4, providing the `gcc-arm-none-eabi` compiler and utilities required for targeting ARM Cortex-M architectures.
- **Rust Nightly**: The image is pinned to a specific Rust nightly toolchain (nightly-2018-04-19), ensuring compatibility with the Tock kernel's use of unstable features during that development period.
- **Xargo**: A tool used to compile the Rust standard library (sysroot) for custom targets, which is essential for bare-metal embedded development where the standard library is not provided by the host OS.
- **Code Quality Tools**: Includes `uncrustify` (version 0.65) and `rustfmt-nightly` to maintain consistent code style across the project.

## Technical Details

The image is built on top of Debian Stretch, providing a stable Linux base. It installs standard build essentials like `cmake`, `python`, and `git` before configuring the specialized embedded toolsets. By setting environment variables for `RUSTUP_HOME`, `CARGO_HOME`, and the system `PATH`, the container ensures that the ARM compiler and Rust binaries are immediately available to the user upon execution.

## Usage in Development

This image is particularly useful for CI/CD pipelines and for developers who wish to avoid polluting their local machine with multiple versions of the Rust compiler or specific ARM toolchains. It allows developers to compile Tock OS kernels and applications in a consistent environment, reducing the "it works on my machine" class of bugs. 

For those working with Tock OS, this container serves as a bridge to get started quickly with the hardware-independent aspects of the OS, such as compiling capsules or the kernel itself for various supported boards like the Hail, Imix, or NRF52 series.
