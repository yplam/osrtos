---
title: Xenomai 3 for Raspberry Pi 2 and 3
summary: A real-time Linux environment for Raspberry Pi 2 and 3 based on the 4.9.80
  kernel patched with I-pipe and Xenomai 3. It provides pre-built kernels, patched
  source code, and build scripts to enable hard real-time capabilities on ARM-based
  single-board computers.
slug: xenomai-3-for-raspberry-pi-2-and-3
codeUrl: https://github.com/thanhtam-h/rpi23-xeno3
star: 16
lastUpdated: '2018-09-11'
rtos: xenomai
topics:
- ethercat
- raspberry-pi
- rasspberry
- realtime
- rpi-3bplus
- xenomai
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- xenomai-3-for-raspberry-pi-0-1-linux-kernel-4-1-21
- xenomai-3-for-raspberry-pi-4
- raspberry-pi-rtos-rpi-rtos
- raspberry-pi-4-xenomai-3-patch
- xenomai-on-raspberry-pi
- soem-w5500-ethercat-master-for-raspberry-pi
---

## Real-Time Linux on Raspberry Pi

Bringing hard real-time capabilities to the Raspberry Pi platform requires more than just a standard Linux distribution. This project provides a specialized environment for the Raspberry Pi 2 and 3 (including the 3B+) by integrating Xenomai 3 with the Linux 4.9.80 kernel. By utilizing the I-pipe (Interrupt Pipeline) patch, it allows the hardware to handle time-critical tasks with deterministic latency while still running a standard Linux environment for non-critical operations.

## Project Components

The repository is structured to support different levels of development needs, from quick deployment to custom kernel configuration:

*   **Patched Kernel Source**: A complete Linux 4.9.80 kernel source tree already integrated with the I-pipe patch. This is ideal for developers who need to modify kernel configurations or add specific drivers while maintaining real-time performance.
*   **Pre-built Binaries**: For those who want to get started immediately, the project includes a ready-to-use real-time kernel along with the necessary Xenomai user-space libraries and tools. This eliminates the need for a lengthy cross-compilation process on the first run.
*   **Build Scripts and Guides**: A collection of scripts and documentation is provided to automate the process of building the I-pipe kernel from scratch, ensuring that users can reproduce the build environment or update the kernel as needed.

## Technical Architecture

Xenomai 3 operates as a co-kernel (or a dual-kernel) system. Unlike the PREEMPT_RT patch which modifies the standard Linux kernel to be more preemptible, Xenomai uses a hardware abstraction layer (I-pipe) to intercept interrupts. High-priority real-time tasks are handled by the Xenomai core, while the standard Linux kernel runs as a low-priority task when no real-time work is pending. This architecture is particularly effective for applications requiring microsecond-level determinism, such as industrial control, robotics, and high-speed data acquisition.

## Getting Started

Developers have two primary paths for using this project. The fastest method involves downloading the pre-built directory, which contains the kernel image and the user-space toolset required to interface with the Xenomai core. For those requiring a custom setup, the provided scripts guide the user through the cross-compilation toolchain setup, kernel configuration, and the final build process. Detailed instructions for these procedures are located within the scripts directory, covering everything from environment variables to the final deployment on the Raspberry Pi's SD card.
