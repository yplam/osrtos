---
title: Apache NuttX RTOS on 64-bit RISC-V
summary: A project focused on porting, building, and testing the Apache NuttX RTOS
  on 64-bit RISC-V architectures. It supports various platforms including QEMU emulation
  and single-board computers like Star64, Ox64, and Oz64, featuring automated CI workflows
  and specialized kernel build configurations.
slug: apache-nuttx-rtos-on-64-bit-risc-v
codeUrl: https://github.com/lupyuen/nuttx-riscv64
siteUrl: https://lupyuen.github.io/articles/riscv
star: 7
version: qemu-riscv-knsh-2026-01-04
lastUpdated: '2025-03-21'
rtos: nuttx
topics:
- nuttx
- riscv
- riscv64
- rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- apache-nuttx-rtos-for-pine64-star64
- rt-thread-smart-porting-for-risc-v-qemu-and-k210
- unicorn-emulator-for-apache-nuttx-on-avaota-a1-arm64-sbc
- apache-nuttx-nsh-task-demo
- freertos-port-for-risc-v
- freertos-for-raspberry-pi-3-64-bit
---

## Overview

The Apache NuttX RTOS on 64-bit RISC-V project represents a significant effort to bring the Apache NuttX Real-Time Operating System to the modern 64-bit RISC-V architecture. Originally focused on Arm64, the project has migrated its focus to RISC-V, providing a robust environment for teaching the architecture from scratch and supporting a growing ecosystem of RISC-V hardware.

This repository serves as a hub for automated testing, specialized build scripts, and documentation for running NuttX on both emulated and physical RISC-V hardware. It bridges the gap between the core NuttX source code and specific hardware implementations, ensuring stability through daily builds and automated regression testing.

## Supported Hardware and Platforms

The project targets a variety of 64-bit RISC-V platforms, ranging from emulators to high-performance single-board computers (SBCs):

- **QEMU RISC-V Emulator**: Used for daily automated testing of the `rv-virt` target, supporting both standard and kernel builds.
- **Star64 SBC**: Based on the StarFive JH7110 SoC, which is also found in the PineTab-V tablet.
- **Ox64 SBC**: Featuring the Bouffalo Lab BL808 SoC.
- **Oz64 SBC**: Utilizing the Sophgo SG2000 SoC.
- **PineTab-V**: A RISC-V based tablet that shares the JH7110 architecture.

## Automated Testing and CI

A core component of this project is its sophisticated testing infrastructure. Using GitHub Actions and Expect scripts, the project performs daily builds and functional tests. The Expect scripts, such as `qemu-riscv-nsh64.exp`, automate the interaction with the NuttX Shell (NSH). These scripts boot the QEMU emulator, execute commands like `uname -a`, `free`, `ps`, and `ls`, and run the standard `ostest` suite to verify kernel integrity.

## Specialized Build Configurations

The repository includes shell scripts for complex build scenarios, particularly for the Kernel Build (`knsh`). Unlike the standard flat build where the kernel and applications share the same address space, the kernel build implements proper memory protection and separation. 

The build process often involves:
- Toolchain integration with `riscv-none-elf-gcc`.
- Filesystem generation using `genromfs` to create Initial RAM Disks (initrd).
- Automated disassembly generation for debugging, providing `.S` files for the kernel, init process, and sample applications like `hello`.
- Integration with Rust, as seen in the `qemu-riscv-leds64-rust` workflows, demonstrating NuttX's ability to host modern programming languages on RISC-V.

## Technical Implementation Details

The project provides scripts like `check-config.sh` to validate `defconfig` files across the NuttX ecosystem. For developers looking into the internals, the specialized scripts demonstrate how to append padding and RAM disks to the NuttX kernel image to create a bootable binary for specific hardware targets. It also showcases the use of RISC-V specific features like ACLINT (Advanced Core Local Interruptor) and semihosting within the QEMU environment.
