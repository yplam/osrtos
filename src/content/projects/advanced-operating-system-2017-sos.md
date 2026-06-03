---
title: Advanced Operating System 2017 (SOS)
summary: A comprehensive implementation of a Simple Operating System (SOS) built on
  the seL4 microkernel for the UNSW Advanced Operating Systems course. It features
  a process server, network stack integration via lwIP, and a custom shell, primarily
  targeting the i.MX6 ARM platform.
codeUrl: https://github.com/Techget/Advanced_Operating_System_2017
siteUrl: https://www.cse.unsw.edu.au/~cs9242/17/project/index.shtml
isShow: false
rtos: sel4
libraries:
- lwip
topics:
- operating-system
- sel4
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- rust-sel4-toy-system-for-i-mx6-sabre-lite
- sofa-operating-system-framework
- minios-esp
- apache-nuttx-rtos-for-pinephone
- mos-rtos
- phoenix-rtos-project
---

The **Advanced Operating System 2017** project represents a deep dive into microkernel-based system design. Developed as part of the UNSW COMP9242 course, this repository contains the implementation of **SOS (Simple Operating System)**, a system server that runs on top of the **seL4 microkernel**. While seL4 provides the fundamental mechanisms for isolation and capability-based resource management, SOS provides the higher-level abstractions—such as file systems, networking, and process management—that turn a microkernel into a functional operating environment.

### Architecture and Core Components

The project is structured around a multi-layered architecture where the seL4 kernel sits at the bottom, managing hardware access and enforcing security boundaries. Above the kernel, the SOS application acts as the primary system server. SOS is responsible for:

*   **Process Management**: Handling the lifecycle of user applications.
*   **Virtual Memory**: Managing address spaces and page faults for user processes.
*   **System Calls**: Providing an interface for user applications to interact with hardware and system services.
*   **Networking**: Utilizing the **lwIP** stack to provide network connectivity, including support for NFS (Network File System) for remote storage.

Included in the repository are several user-level applications, most notably **sosh** (the SOS Shell). Sosh allows users to interact with the system in real-time, providing a command-line interface to explore the file system and manage running tasks.

### Hardware Support and Build System

The project specifically targets the **Freescale i.MX6** (Sabre Lite) platform, a popular ARM-based development board. The build system is heavily inspired by the Linux kernel's infrastructure, utilizing **Kconfig** for configuration management and a complex set of **Makefiles** to handle cross-compilation for the ARM architecture.

To build the project, the environment expects a specific toolchain and often integrates with a TFTP server for network booting. The `Makefile` includes targets for copying images to a TFTP root and even includes logic to reset the target hardware via a serial port connection:

```makefile
all: app-images
	mkdir -p $(TFTPROOT)
	cp ./build/arm/imx6/sosh/sosh.bin $(TFTPROOT)/sosh
	cp ./build/arm/imx6/my_app/my_app.bin $(TFTPROOT)/my_app
	cp -v $(IMAGE_ROOT)/sos-image-arm-imx6 $(TFTPROOT)/bootimg.elf
	$(MAKE) reset
```

### Development and Extensibility

One of the most interesting aspects of this project is its modularity. The `apps/` directory demonstrates how new user-level applications can be added to the system. For instance, `my_app` shows the minimal requirements for a seL4-based application, requiring libraries like `muslc`, `libsel4`, and `libsos` to function. 

The project also includes a comprehensive set of libraries (`libs/`) that provide essential services like clock management (`libclock`), ELF parsing (`libelf`), and platform support (`libplatsupport`). This modular approach allows developers to focus on specific system components without needing to modify the core microkernel, adhering to the microkernel philosophy of keeping the privileged core as small and secure as possible.

### Educational Context

As a project for the UNSW Advanced Operating Systems course, it serves as a rigorous practical application of OS theory. It challenges developers to handle complex tasks like asynchronous I/O, demand paging, and high-performance networking within the constraints of a capability-based security model. The repository even includes exam materials and design reports, highlighting the academic rigor behind the implementation.
