---
title: ZMK Docker Images
summary: A collection of lightweight Docker images designed for building and developing
  ZMK firmware. These images provide a pre-configured environment with the Zephyr
  RTOS toolchain, Python requirements, and necessary system dependencies for various
  embedded architectures including ARM, RISC-V, and Xtensa.
slug: zmk-docker-images
codeUrl: https://github.com/zmkfirmware/zmk-docker
star: 29
version: stable
lastUpdated: '2025-10-02'
rtos: zephyr
topics:
- docker
- zephyr
- zmk
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- docker-containers-for-the-zephyr-rtos
- tock-os-docker-image
- docker-embedded-development-toolchains
- sel4-camkes-and-l4v-docker-build-environments
- nrf-connect-sdk-build-docker-environment
- tock-os-docker-build-environment
---

## Overview

The ZMK Docker project provides a streamlined, containerized environment for developers working with ZMK firmware. ZMK is a modern, open-source keyboard firmware built on top of the Zephyr Real-Time Operating System (RTOS). Because embedded development often involves complex toolchain setups and specific dependency versions, these Docker images offer a "plug-and-play" solution for both local development and Continuous Integration (CI) pipelines.

By encapsulating the Zephyr SDK, Python requirements, and system-level dependencies, these images ensure that firmware builds are reproducible across different host operating systems. This eliminates the common "it works on my machine" issues often encountered when configuring cross-compilation environments for microcontrollers.

## Image Variants

The repository maintains two primary types of images tailored for different stages of the development lifecycle:

### The Build Image
Optimized for CI environments, the `build` image is designed to be as lightweight as possible while still containing everything necessary to compile ZMK firmware. It includes:
- Essential Zephyr dependencies via `apt-get` (excluding non-build tools like UI packages).
- Base Zephyr Python requirements.
- The specific Zephyr toolchain for the target platform.

### The Dev Image
Designed for active firmware and documentation development, the `dev` image builds upon the `build` variant. It adds a suite of quality-of-life tools and additional dependencies required for testing and documentation generation, such as:
- Build and test Python requirements.
- Node.js for documentation tooling.
- Debugging and communication tools like `gdb`, `socat`, and `tio`.
- Common utilities like `wget`, `curl`, and text editors.

## Architecture Support

One of the most powerful aspects of this project is its broad support for various hardware architectures. While ARM is the most commonly tested platform for ZMK-powered keyboards, the Docker images are configured to support a wide array of architectures supported by the Zephyr SDK, including:
- **ARM & ARM64**: The standard for most modern keyboard controllers.
- **RISC-V**: Supporting the growing ecosystem of open-source hardware.
- **Xtensa**: Including various ESP32 and Intel ADSP configurations.
- **x86_64, MIPS, and SPARC**: Ensuring compatibility across diverse embedded targets.

## Technical Implementation

The images are based on Ubuntu (specifically the `noble` release) and utilize multi-stage builds to keep the final artifacts efficient. The `Dockerfile` logic dynamically handles the installation of the Zephyr SDK based on the target architecture. It manages the complex dance of installing system packages, setting up Python virtual environments (using `PIP_BREAK_SYSTEM_PACKAGES` where appropriate for container isolation), and configuring the Zephyr environment variables.

For developers, this means that instead of manually downloading the Zephyr SDK and managing multiple versions of `cmake` or `python`, they can simply pull the relevant image and begin compiling their keyboard layouts immediately. This is particularly useful for the ZMK community, where users often want to customize their keymaps without becoming experts in embedded toolchain management.
