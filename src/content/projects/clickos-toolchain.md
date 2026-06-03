---
title: ClickOS Toolchain
summary: A specialized build system for the ClickOS platform that compiles essential
  libraries including Newlib and Lwip. It targets Xen-based environments and integrates
  with MiniOS sources to provide a development environment for high-performance virtualized
  middleboxes.
slug: clickos-toolchain
codeUrl: https://github.com/sysml/toolchain
star: 17
version: v0.1
lastUpdated: '2017-09-14'
rtos: ''
libraries:
- lwip
topics:
- libc
- lwip
- mini-os
- newlibc
- toolchain
- xen
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- libtock-c-tock-userland-c-library
- archminix
- nuttx-development-docker-environment
- swedish-embedded-workstation
- tock-os-docker-image
- nuttx-esp32-environment-for-wsl2
---

The ClickOS toolchain is a specialized build system designed to facilitate the development of ClickOS, a high-performance virtualized middlebox platform. ClickOS is built upon the Xen hypervisor and utilizes MiniOS, a lightweight operating system kernel designed specifically for Xen "stub" domains. This toolchain automates the process of fetching, patching, and compiling the essential libraries required to run network functions in these highly efficient virtual environments.

### Core Components

The primary purpose of this repository is to provide a consistent environment for building two critical libraries:

1.  **Newlib**: A C library intended for use on embedded systems. The toolchain applies specific patches to Newlib (version 1.16.0) to ensure compatibility with the MiniOS environment and the Xen hypervisor. It configures Newlib with support for long-long and long-double I/O while disabling multilib to keep the footprint small.
2.  **LwIP (Lightweight IP)**: A widely used open-source TCP/IP stack designed for embedded systems. The toolchain uses a specific version of LwIP optimized for high-performance networking tasks within the ClickOS ecosystem.

### Architecture and Compatibility

The toolchain is highly flexible, supporting multiple hardware architectures. The build system automatically detects the host architecture but allows for cross-compilation targeting:
-   **x86_32** (i686-xen-elf)
-   **x86_64** (x86_64-xen-elf)
-   **ARM32** (arm32-xen-elf)
-   **ARM64** (arm64-xen-elf)

This cross-platform support is vital for deploying ClickOS across various server and embedded hardware environments where Xen is supported.

### Integration with MiniOS

A key requirement for using this toolchain is the presence of MiniOS sources. MiniOS provides the low-level kernel primitives—such as scheduling, memory management, and Xen bus interactions—that Newlib and LwIP rely on. The toolchain expects a `MINIOS_ROOT` environment variable pointing to the MiniOS source tree, ensuring that the compiled libraries are correctly linked against the target operating system's headers.

### Build Process and Output

The build process is managed via a central Makefile. When a user initiates the build, the system performs the following steps:
-   Downloads the source archives for Newlib and LwIP.
-   Applies custom patches (redistributed from Xen sources) to adapt the libraries for the Xen environment.
-   Configures and compiles the libraries using a specific cross-compiler (typically GCC 4.7).
-   Installs the resulting headers and static libraries into a structured directory (e.g., `x86_64-root/x86_64-xen-elf`).

The resulting artifacts include the standard `include`, `lib`, and `src` directories, which can then be referenced by ClickOS or other MiniOS-based projects using configuration flags like `--with-newlib` and `--with-lwip`.
