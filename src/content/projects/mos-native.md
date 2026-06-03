---
title: mos-native
summary: A collection of installer scripts to set up a native Mongoose OS development
  environment for ESP32. It automates the configuration of ESP-IDF, Mongoose OS source
  code, and filesystem tools to enable local builds without the need for Docker containers.
slug: mos-native
codeUrl: https://github.com/v-kiniv/mos-native
star: 3
lastUpdated: '2021-06-23'
rtos: mongoose-os
libraries:
- littlefs
- spiffs
topics:
- mongoose-os
- mos
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- mongoose-os-docker-image
- mongoose-os-docker-action
- nuttx-esp32-environment-for-wsl2
- homebrew-tinyos-for-msp430
- m5stack-esphome-integrations
- xenomai-installation-and-configuration-scripts
---

## Overview

Developing for Mongoose OS typically involves using the `mos` tool, which by default leverages Docker containers to manage toolchains and dependencies. While this ensures consistency, some developers prefer a native environment for faster build times, better IDE integration, or to avoid the overhead of containerization. 

**mos-native** provides a streamlined installer script that downloads, builds, and installs all the necessary components to build Mongoose OS applications for the ESP32 platform directly on the host machine. By automating the setup of the ESP-IDF and the Mongoose OS core, it bridges the gap between the convenience of the `mos` tool and the performance of a native toolchain.

## Key Components and Automation

The project automates several complex setup steps that would otherwise require manual configuration:

- **ESP-IDF Integration**: It clones a specific version of the ESP-IDF (v3.3-r5) tailored for Mongoose OS and runs the necessary installation scripts to prepare the Espressif IoT Development Framework.
- **Mongoose OS Core**: The script fetches the Mongoose OS source code (version 2.18.0) and integrates it into the local environment.
- **Filesystem Tools**: It builds and installs essential filesystem utilities, specifically `mklfs` for LittleFS and `mkspiffs` for SPIFFS. These tools are critical for packaging the application's filesystem before flashing to the ESP32.
- **Environment Management**: The installer generates an `env.sh` script that exports necessary environment variables, including the `IDF_PATH`, toolchain paths, and build image tags, ensuring the `mos` tool knows how to perform a local build.

## Technical Implementation

The core of the project is the `install.sh` script. It manages the lifecycle of the installation by:
1. Cloning the Mongoose OS fork of the ESP-IDF.
2. Compiling Kconfig tools (`conf-idf` and `mconf-idf`) required for configuration.
3. Fetching the Mongoose OS library repositories for virtual filesystems (VFS).
4. Compiling the filesystem image creators against the Mongoose OS source tree.

Once the environment is set up, users can transition from standard Docker-based builds to native builds by simply sourcing the environment script and adding the `--local` flag to their build commands:

```bash
# Load the native environment
. ./env.sh

# Build the application locally
mos build --platform esp32 --local
```

## Benefits of Native Builds

By using mos-native, developers gain several advantages in their workflow. Local builds eliminate the filesystem synchronization overhead often associated with Docker on non-Linux platforms. Furthermore, it provides direct access to the `xtensa-esp32-elf` toolchain, making it easier to use standard debugging tools like GDB or to integrate with advanced C/C++ IDEs that require local access to header files and compiler binaries.
