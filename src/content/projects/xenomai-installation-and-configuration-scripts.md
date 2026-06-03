---
title: Xenomai Installation and Configuration Scripts
summary: A collection of shell scripts designed to automate the installation and configuration
  of the Xenomai real-time framework on Linux systems. It handles kernel patching
  with I-pipe, building the Xenomai-enabled kernel, and setting up the runtime environment
  for real-time applications.
slug: xenomai-installation-and-configuration-scripts
codeUrl: https://github.com/realteck-ky/Xenomai-Script
siteUrl: http://rtt-lwr.readthedocs.io/en/latest/rtpc/xenomai3.html
star: 1
lastUpdated: '2018-07-11'
rtos: xenomai
topics:
- linux
- linux-kernel
- shell
- xenomai
- xenomai3
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- xenomai-3-for-raspberry-pi-4
- xenomai-3-for-raspberry-pi-0-1-linux-kernel-4-1-21
- xenomai-3-for-raspberry-pi-2-and-3
- raspberry-pi-4-xenomai-3-patch
- xenomai-on-raspberry-pi
- str-xenomai-real-time-systems-practices
---

## Overview

Xenomai-Script is a utility repository providing a streamlined, automated approach to setting up a Xenomai real-time environment on a Linux system. Xenomai is a real-time development framework that co-exists with the Linux kernel, providing a dual-kernel architecture (Cobalt) or a single-kernel approach (Mercury) to deliver deterministic, low-latency performance for industrial and embedded applications.

Setting up Xenomai manually can be a complex process involving kernel patching, specific configuration flags, and environment management. This project simplifies that workflow into a series of orchestrated shell scripts that handle everything from initial kernel updates to final environment verification.

## Technical Workflow

The installation process is divided into four distinct phases, each handled by a dedicated script. This modular approach allows users to reboot between critical system changes, ensuring stability throughout the kernel replacement process.

### 1. Linux Kernel Update
The process begins with `update_linux.sh`, which fetches specific Ubuntu mainline kernel headers and images. In the provided configuration, it targets Linux version 4.9.90, ensuring a known compatible base for the subsequent real-time patches.

### 2. Environment Preparation
The `prepare_apt.sh` script handles the necessary package dependencies required for building a custom Linux kernel and the Xenomai libraries. This typically includes build-essential tools, fakeroot, and kernel-package utilities.

### 3. Applying Xenomai and Kernel Patching
The core of the project lies in `apply_xenomai.sh`. This script automates several critical tasks:
- Downloading the Xenomai source code (version 3.0.7) and the corresponding I-pipe (Interrupt Pipeline) patch.
- Using the Xenomai `prepare-kernel.sh` script to integrate the real-time patch into the Linux source tree.
- Configuring the kernel with `make olddefconfig` and `make menuconfig`.
- Compiling the kernel into Debian packages (`.deb`) using `make-kpkg` for easy installation and management via `dpkg`.

### 4. Environment Configuration
Once the Xenomai-enabled kernel is running, `setenv_xenomai.sh` configures the user space. It sets up the `xenomai` user group, configures the Cobalt core with specific flags (such as SMP support and PIC), and installs the Xenomai libraries. Finally, it exports essential environment variables like `XENOMAI_PATH` and `LD_LIBRARY_PATH` to the user's `.bashrc`.

## Key Features

- **Automated Patching**: Handles the complex integration of the I-pipe patch into the Linux kernel source.
- **Debian Integration**: Generates standard `.deb` packages for the kernel and headers, making it easier to manage or roll back system changes.
- **Environment Standardization**: Automatically configures the necessary paths and permissions for real-time application development.
- **Verification**: Includes built-in calls to `xeno test` to verify that the real-time sub-system is functioning correctly after installation.

## Getting Started

The scripts are intended to be run in sequence, with reboots in between to ensure the system initializes the new kernel correctly:

```bash
bash update_linux.sh && sudo reboot
bash prepare_apt.sh && sudo reboot
bash apply_xenomai.sh && sudo reboot
bash setenv_xenomai.sh && sudo reboot
```

By following this sequence, developers can transform a standard Linux installation into a high-performance real-time platform suitable for robotics, motion control, and other latency-sensitive embedded tasks.
