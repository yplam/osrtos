---
title: Tockloader
summary: A comprehensive Python-based CLI tool for programming and managing applications
  on the Tock operating system. It supports multiple communication protocols including
  serial, J-Link, and OpenOCD to facilitate application installation, kernel flashing,
  and board inspection.
slug: tockloader
codeUrl: https://github.com/tock/tockloader
siteUrl: http://www.tockos.org/
star: 44
version: v1.16.0
lastUpdated: '2025-10-07'
rtos: tock
topics:
- pip
- python-3
- tock
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- tock-bootloader
- tock-test-harness
- tock-os-docker-build-environment
- esp32-mpy-jama
- nxscli
- west-the-zephyr-rtos-meta-tool
---

Tockloader is the essential command-line utility for developers working with the Tock operating system. Designed to streamline the development workflow, it provides a unified interface for flashing kernel binaries, managing multiple independent applications, and inspecting the state of embedded hardware.

### Application Management
The core of Tockloader revolves around managing Tock applications. Unlike traditional monolithic firmware, Tock allows multiple applications to reside in flash memory simultaneously. Tockloader handles the complexities of the Tock Binary Format (TBF), ensuring that applications are correctly placed and headers are properly configured. Key commands include:

- **install**: Loads new applications onto the board. Using the `--no-replace` flag allows for multiple copies of the same app.
- **update**: Replaces an existing application binary while maintaining its configuration and position.
- **uninstall**: Removes specific applications from flash by name.
- **enable-app / disable-app**: Controls whether the kernel will execute a specific application at boot time.

### Hardware Interaction and Debugging
Beyond simple flashing, Tockloader serves as a powerful debugging companion. The `listen` command allows developers to view `printf()` output from the board over UART or Segger's RTT (Real Time Transfer). For deeper inspection, the `info` and `list` commands provide a detailed view of the board's attributes and the specific applications currently stored in flash, including their memory footprints and permissions.

### Flexible Communication Channels
Tockloader is designed to be hardware-agnostic regarding how it talks to a board. It can interface with hardware through several mechanisms:

- **Serial Bootloader**: Communicates directly with the `tock-bootloader` over a serial port, which is the default for most Tock-supported boards.
- **JTAG/SWD**: Supports industry-standard tools like `JLinkExe`, `OpenOCD`, and `nrfjprog` for direct chip programming.
- **STLink**: Native support for STM32-based discovery and development boards using `st-flash` and `st-info` tools.
- **Flash Files**: Can operate on a local binary file as a "virtual board," which is particularly useful for QEMU-based emulation or CI/CD pipelines where physical hardware is not present.

### Advanced Configuration and Security
For power users, Tockloader provides granular control over the hardware. It can read and write arbitrary flash memory locations, manage board-specific attributes (key-value pairs stored on the device), and interact with TicKV, Tock's flash-friendly key-value database. 

It also includes robust support for credentials and integrity. Tockloader can add, remove, or verify SHA256 hashes and RSA signatures within the TBF footer, ensuring that only authorized and uncorrupted code runs on the target microcontroller.

### Example Usage
Installing an application and immediately opening a console to view its output is a common workflow:

```bash
tockloader install --make
tockloader listen
```

For boards that require specific JTAG settings, Tockloader allows detailed parameter specification to ensure compatibility with various debug probes:

```bash
tockloader install --board hail --jlink --jlink-device ATSAM4LC8C
```

Whether you are a kernel developer or an application author, Tockloader abstracts the low-level complexities of flash management, allowing you to focus on building secure and efficient embedded software.
