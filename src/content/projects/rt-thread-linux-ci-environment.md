---
title: RT-Thread Linux CI Environment
summary: A containerized development and continuous integration environment for the
  RT-Thread real-time operating system. It provides a pre-configured Linux-based Docker
  image equipped with essential tools like SCons, arm-none-eabi-gcc, and Cppcheck
  for building and testing RT-Thread projects across various CI platforms.
slug: rt-thread-linux-ci-environment
codeUrl: https://github.com/maikebing/rt-thread_linux_env
siteUrl: https://github.com/marketplace/actions/rt-thread-ci-action
star: 5
version: v1
lastUpdated: '2022-07-29'
rtos: rt-thread
topics:
- ci
- github-action
- iotsharp
- rt-thread
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- nuttx-development-docker-environment
- docker-embedded-development-toolchains
- tock-os-docker-image
- nrf-connect-sdk-docker-environment
- swedish-embedded-workstation
- tock-os-docker-build-environment
---

## Overview

The RT-Thread Linux CI Environment is a specialized containerization project designed to streamline the continuous integration (CI) and development workflow for the RT-Thread real-time operating system. By providing a consistent, pre-configured environment, it eliminates the "works on my machine" problem and allows developers to automate builds, static analysis, and testing of embedded firmware.

## Key Features and Capabilities

At its core, the project provides a Docker image (`maikebing/rt-thread_linux_env`) that serves as a complete workspace for RT-Thread development. This environment is particularly useful for teams looking to implement modern DevOps practices in the embedded space.

**The environment includes several critical tools:**
- **Cross-Compiler:** Pre-installed `gcc-arm-none-eabi-6_2-2016q4` for targeting ARM Cortex-M architectures.
- **Build System:** SCons, the standard build tool for RT-Thread projects.
- **Static Analysis:** Cppcheck for identifying potential bugs and enforcing coding standards.
- **Package Management:** Integrated RT-Thread `env` and `pkgs` tools to manage external components and libraries.
- **Emulation & Flashing:** Includes `qemu-system-arm` for simulation and `stm32flash` for hardware interaction.

## Multi-Platform CI Support

One of the project's strongest points is its flexibility across different CI providers. It offers native support for GitHub Actions and Azure Pipelines, allowing developers to trigger builds automatically on every code push.

### GitHub Actions Integration

For GitHub users, the project is available as a marketplace action. This allows for a very clean workflow configuration. A typical setup involves checking out the code and then running the RT-Thread CI Action with specific targets, such as generating an MDK5 project or running static analysis.

```yaml
- name: Setup RT-Thread
  uses: maikebing/rt-thread_linux_env@v1 
  with: 
       TARGET: 'mdk5'
       CPPCHECK: '--enable=all --std=c99 applications/'
```

### Azure Pipelines

The project also provides a detailed template for Azure Pipelines. It demonstrates how to link the container's environment tools to the local workspace, update packages, run static analysis, and publish the resulting binary (e.g., `rtthread.bin`) as a build artifact.

## Local Development Workflow

Beyond automated CI, the environment can be used locally to ensure developers are using the exact same toolchain as the build server. The workflow typically involves pulling the Docker image, cloning the project code into the container, and using the `pkgs --update` command to fetch dependencies. From there, developers can run `scons` to compile the project or generate IDE-specific project files like MDK5 or IAR targets.

## Technical Implementation

The environment is built on an Ubuntu 16.04 base, chosen for its stability and compatibility with older ARM toolchains often required in industrial embedded projects. The `Dockerfile` meticulously sets up the `RTT_EXEC_PATH` and clones the necessary RT-Thread scripts and package repositories directly into the image, ensuring that the environment is ready for use immediately upon startup. The inclusion of an `entrypoint.sh` script automates the initialization of the RT-Thread environment variables, making the transition between the host shell and the container seamless.
