---
title: NuttX ESP32 Environment for WSL2
summary: A specialized development environment designed to build and deploy Apache
  NuttX on ESP32 microcontrollers within Windows Subsystem for Linux (WSL2). It utilizes
  Docker containers to provide a consistent build toolchain and includes scripts for
  automated board configuration and custom application integration.
slug: nuttx-esp32-environment-for-wsl2
codeUrl: https://github.com/LeandroTE/nuttx_esp32_wsl2
star: 1
lastUpdated: '2024-02-27'
rtos: nuttx
topics:
- docker
- docker-compose
- esp-idf
- esp32
- nuttx
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- nuttx-development-docker-environment
- nrf-connect-sdk-build-docker-environment
- docker-containers-for-the-zephyr-rtos
- nrf-connect-sdk-docker-environment
- tock-os-docker-image
- docker-embedded-development-toolchains
---

## Developing NuttX on Windows with WSL2

Building Apache NuttX for ESP32 hardware can often be a complex task, especially when navigating the dependencies required on Windows systems. The NuttX ESP32 Environment for WSL2 simplifies this process by providing a pre-configured Docker-based workflow. This project allows developers to leverage the power of Windows Subsystem for Linux (WSL2) to compile, flash, and simulate NuttX applications with minimal manual setup.

By containerizing the build environment, the project ensures that the specific versions of the Xtensa toolchain, build utilities, and NuttX source code are consistent across different development machines. While optimized for WSL2, the environment is also compatible with native Ubuntu installations.

## Key Features and Capabilities

The repository acts as a wrapper for the NuttX ecosystem, adding several quality-of-life improvements for ESP32 developers:

- **Docker-Integrated Build System**: Uses a customized Dockerfile based on the official Apache NuttX CI image, ensuring all necessary build tools are present.
- **Automated Configuration**: Includes a `setup_build.sh` script that handles board selection (such as the ESP32-S3 DevKit), symbolic link creation for custom apps, and initial workspace cleaning.
- **USB Passthrough Support**: Provides detailed instructions and configuration for using `usbipd-win`, enabling WSL2 to access physical ESP32 hardware connected via USB for flashing and serial monitoring.
- **Simulation Support**: Includes configurations for running NuttX in a simulated environment, allowing for logic testing without physical hardware.
- **Custom Application Integration**: A dedicated `CustomApps` directory structure allows developers to maintain their own application code outside of the core NuttX tree while easily linking it during the build process.

## Technical Workflow

The environment is orchestrated through Docker Compose, which maps the local repository into the container workspace. This allows developers to edit code using Windows-based IDEs (like VS Code) while the compilation happens within the high-performance Linux environment of WSL2.

### Hardware Interaction

One of the standout features of this project is the integration of `usbipd-win`. Since WSL2 does not natively support USB serial devices, the project documents the process of attaching the ESP32's USB bus ID to the WSL instance. Once attached, standard tools like `esptool.py` and `picocom` (included in the Docker image) can interact with the board as if it were natively connected to a Linux machine.

### Configuration and Customization

The environment supports the standard NuttX `menuconfig` system. Developers can customize the kernel and application features, then use the `make savedefconfig` command to export their settings. The provided `setup_build.sh` script can then be used to apply these configurations to specific targets, such as the `apolo` board or the `sim` target for local testing.

## Getting Started

To use the environment, users build the container using Docker Compose and then enter the shell. The `setup_build.sh` script is the primary entry point for configuration. For example, to set up a specific board configuration, a user would run:

```bash
./setup_build.sh -a apolo
```

Once configured, standard `make` commands are used to compile the firmware. Flashing is handled via the `make flash` target, specifying the appropriate `ESPTOOL_PORT` (typically `/dev/ttyUSB0` after attaching via usbipd). For networking tasks, the environment includes built-in support for configuring WiFi via the NuttX Shell (NSH) using `wapi` and `ifup` commands.
