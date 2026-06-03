---
title: 'West: The Zephyr RTOS Meta-Tool'
summary: West is the official command-line meta-tool for the Zephyr RTOS project,
  designed to manage multiple Git repositories and provide a unified development workflow.
  It utilizes a YAML-based manifest system to coordinate project dependencies and
  is highly extensible through custom sub-commands.
slug: west-the-zephyr-rtos-meta-tool
codeUrl: https://github.com/zephyrproject-rtos/west
siteUrl: https://docs.zephyrproject.org/latest/guides/west/index.html
star: 303
version: v1.5.0
lastUpdated: '2025-12-01'
rtos: zephyr
topics:
- build-tool
- debugging
- flashing
- repository-management
- zephyr
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- pinnacle-100-out-of-box-demo-manifest
- mbed-tools
- zephyr-sdk
- vs-code-zephyr-development-environment
- kconfig-for-the-zephyr-project
- breeze
---

## Overview

West is the Swiss Army knife of the Zephyr RTOS ecosystem. As a meta-tool, it provides a unified command-line interface for managing the complex multi-repository structure that defines a Zephyr project. While Zephyr itself is the operating system, West is the tool that brings all the necessary components together, from the kernel source to HALs, libraries, and external modules.

At its core, West solves the problem of managing multiple Git repositories under a single directory. It allows developers to define a workspace where various components can be versioned independently but managed collectively through a single configuration file.

## The West Manifest

The heart of any West-managed project is the manifest file, typically named `west.yml`. This YAML file provides a comprehensive description of the installation, including:

- **Projects**: A list of Git repositories to be managed.
- **Remotes**: The locations where those repositories are hosted.
- **Revisions**: Specific branches, tags, or SHAs to check out for each project.
- **Metadata**: Additional information used by the build system and other tools.

By default, West points to the upstream Zephyr manifest, but it is designed to be flexible. Developers are encouraged to create their own manifest repositories to tailor the environment to their specific hardware or project requirements.

## Core Functionality

West simplifies the initial setup and ongoing maintenance of an embedded development environment through a few primary commands:

- `west init`: Initializes a new West workspace by cloning a manifest repository.
- `west update`: Fetches and updates all repositories defined in the manifest, ensuring the local workspace matches the specified state.
- `west build`: A wrapper that invokes the underlying build system (CMake and Ninja/Make) with the correct environment variables.
- `west flash` and `west debug`: High-level commands that interface with hardware debuggers to load firmware onto target microcontrollers.

## Extensibility and Customization

One of West's most powerful features is its extensibility. It is not a monolithic tool; rather, it is a plugin-based system. Developers can add new sub-commands to West without modifying its core source code. These extensions can be project-specific, allowing teams to automate custom workflows, such as specialized testing suites, data processing scripts, or deployment pipelines.

## Technical Implementation

West is implemented in Python and distributed via PyPI. It leverages popular Python libraries like `PyYAML` for manifest parsing and `colorama` for terminal output. The project maintains a rigorous testing suite and supports multiple operating systems, including Linux, macOS, and Windows, ensuring a consistent experience for embedded developers regardless of their host platform.

For those looking to contribute or customize the tool, West supports an "editable" installation mode, allowing developers to run the tool directly from source code while making modifications. It also includes a comprehensive test suite managed by `pytest` and `poethepoet` to ensure stability across its various sub-commands and extensions.
