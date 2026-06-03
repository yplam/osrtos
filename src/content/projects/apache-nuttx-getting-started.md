---
title: Apache NuttX Getting Started
summary: A comprehensive guide and setup repository for running the Apache NuttX RTOS
  on Ubuntu and Windows via WSL2. It provides step-by-step instructions for building
  the NuttX shell and running graphical demos using the LVGL library in a simulated
  environment.
codeUrl: https://github.com/sukesh-ak/Apache-NuttX-Getting-Started
siteUrl: https://nuttx.apache.org/docs/latest/index.html
isShow: false
rtos: nuttx
libraries:
- lvgl
topics:
- apache
- nuttx
- rtos
- ubuntu
- wsl
- apache-nuttx
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- nuttx-development-docker-environment
- apache-nuttx-nsh-task-demo
- nuttx-esp32-environment-for-wsl2
- zig-on-risc-v-bl602-with-apache-nuttx-rtos
- pinedio-stack-bl604-on-apache-nuttx-rtos
- sama5d27-resource-sharing
---

Apache NuttX is a versatile real-time operating system (RTOS) designed with a strong emphasis on standards compliance and a small footprint. It is highly scalable, supporting environments from 8-bit microcontrollers to 64-bit processors. One of its most significant advantages is its adherence to POSIX and ANSI standards, making it a familiar environment for developers coming from Linux or Unix backgrounds. This project, the Apache-NuttX-Getting-Started guide, serves as a bridge for developers looking to explore NuttX using Ubuntu or Windows Subsystem for Linux (WSL2).

### Setting Up the Environment

Getting started with embedded development often involves complex toolchain configurations. This guide simplifies the process by detailing the exact dependencies required for Ubuntu/WSL2. The setup includes essential build tools like `gcc-arm-none-eabi`, `cmake`, and `kconfig-frontends`. Because NuttX uses a Kconfig system similar to the Linux kernel, the guide also walks through installing Python dependencies like `kconfiglib`, `pyelftools`, and `cxxfilt` to manage system configurations.

To begin, you create a dedicated workspace and clone the core repositories:

```bash
# Create a workspace folder and switch to it
$ mkdir nuttxspace && cd nuttxspace

# Clone Apache NuttX repo
$ git clone https://github.com/apache/nuttx.git nuttx

# Clone Apache NuttX Application repo
$ git clone https://github.com/apache/nuttx-apps apps
```

### Building and Running the NuttX Shell

One of the easiest ways to experience NuttX without hardware is through the simulator. The simulator allows you to run NuttX as a native process on your host OS. By configuring the build for `sim:nsh`, you can compile the NuttX Shell (NSH).

```bash
# Setup to use NuttX simulator with shell called nsh
$ ./tools/configure.sh sim:nsh
$ make

# Run the binary
$ ./nuttx
```

Once inside the shell, you have access to a variety of POSIX-like commands such as `ls`, `ps`, `ifconfig`, and `mount`. The guide demonstrates how to run a simple "Hello World" application built directly into the OS image, showcasing how NuttX manages built-in applications.

### Graphical Interfaces with LVGL

Beyond simple command-line interfaces, NuttX supports advanced graphical libraries. A highlight of this repository is the demonstration of the Light and Versatile Graphics Library (LVGL) running on NuttX. For Windows 11 users, this is made possible through WSLg, which provides graphical support for WSL2 applications.

By switching the configuration to `sim:lvgl_fb`, the build system prepares a framebuffer-based simulator. When executed, NuttX launches a windowed environment on the desktop, proving that this RTOS is capable of handling complex UI tasks even in a simulated or resource-constrained environment.

```bash
# Setup to use NuttX simulator with LVGL using Framebuffer
$ ./tools/configure.sh sim:lvgl_fb
$ make -j
$ ./nuttx
```

### Conclusion

This getting-started guide is an excellent entry point for developers who want to experiment with a POSIX-compliant RTOS without immediately needing physical hardware. By leveraging the simulator and the rich ecosystem of NuttX applications, users can develop and test their logic in a high-productivity environment before deploying to actual microcontrollers.
