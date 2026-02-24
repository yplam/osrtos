---
title: NuttX
slug: nuttx
summary: Apache NuttX is a highly scalable, standards-compliant real-time operating
  system (RTOS) designed for deeply embedded environments ranging from 8-bit to 64-bit
  architectures. It distinguishes itself by strictly adhering to POSIX and ANSI standards,
  providing a familiar Unix-like programming interface while maintaining a minimal
  footprint and modular architecture.
codeUrl: https://github.com/apache/nuttx
siteUrl: https://nuttx.apache.org/
star: 3708
version: nuttx-12.12.0
lastUpdated: '2026-02-24'
components:
- Shell
- FileSystem
- Network
- Wireless
- Audio
- Video
- Graphics
- Bootloader
- Cryptography
- IPv6
- TCP
- UDP
- TLS/SSL
- DNS
- DHCP
- MQTT
- WiFi
- Bluetooth
- BLE
- USBHost
- USBDevice
- CAN
- CANFD
- OTA
- SecureBoot
- TrustZone
- PKI
- Profiling
platforms:
- ARM
- ARM Cortex-M
- ARM Cortex-A
- ARM Cortex-R
- ARM7
- ARM9
- AArch32
- AArch64
- RISC-V
- Xtensa
- x86
- x86_64
- AVR
- AVR8
- MIPS
- MIPS32
- SPARC
- TriCore
- OpenRISC
- Z80
- QEMU
- POSIX
- Linux
- Simulator
- Renode
licenses:
- Apache-2.0
libraries:
- OpenAMP
- Newlib
- uClibc++
- OP-TEE
createdAt: '2025-08-11'
updatedAt: '2026-02-24'
---

### Features


- Strict adherence to POSIX and ANSI standards for high application portability.

- Scalable architecture supporting 8-bit, 16-bit, 32-bit, and 64-bit microcontroller environments.

- Small footprint optimized for resource-constrained deeply embedded systems.

- Modular design allowing developers to include only necessary components for a specific build.

- Built-in simulator enabling development and testing on host terminal environments (Linux, macOS, Windows).

- Comprehensive support for Symmetric Multiprocessing (SMP) on multi-core hardware.

- Extensive Virtual File System (VFS) supporting FAT, ROMFS, SMART, and NFS client.

- Full TCP/IP networking stack with support for IPv4, IPv6, and standard BSD socket APIs.

- Integrated NX Graphics Subsystem for display management and user interface development.

- Support for loadable binary formats including ELF and the specialized NXFLAT format.

- Real-time scheduling with priority inheritance to mitigate priority inversion issues.

- Unified device driver framework for character, block, network, and specialized hardware devices.

- Dedicated audio and video subsystems for multimedia-capable embedded applications.

- Native support for modern programming languages including C++ and Rust.

- Advanced debugging features including Kernel Address Sanitizer (KASAN), GDB integration, and core dumps.

- Support for OpenAMP to facilitate Asymmetric Multiprocessing (AMP) communication.



### Architecture

Apache NuttX follows a modular, microkernel-like architectural philosophy while maintaining a monolithic structure for performance in its default configuration. The core of the system is built around a strict POSIX-compliant interface, which abstracts hardware complexities and provides a standardized environment for application development. The architecture is divided into several distinct layers: the Hardware Abstraction Layer (HAL) or Architecture-Specific Logic, the RTOS Kernel, and the Application Space. 

A key architectural feature is the Virtual File System (VFS), which allows devices, sockets, and files to be accessed through a unified set of standard APIs (e.g., open, read, write). This design pattern extends to its driver model, where hardware is represented as device nodes in the `/dev` directory. NuttX also supports various build modes, including a Flat Build (all code in one address space), a Protected Build (using an MPU to separate kernel and user space), and a Kernel Build (using an MMU for full process isolation), providing flexibility based on the target hardware's capabilities.

#### Core Components
- **NuttShell (NSH)**: A comprehensive interactive shell for system management and debugging.
- **Scheduler**: A real-time, multi-tasking scheduler supporting FIFO and Round Robin policies.
- **Network Stack**: A full-featured, BSD-compatible stack supporting various protocols from link to application layer.
- **Memory Management**: Advanced allocators including support for CCM (Core Coupled Memory) and external RAM.

### Use Cases

This RTOS is ideal for:

- **Industrial Automation**: Suitable for PLC and sensor controllers requiring high reliability and real-time determinism.
- **IoT Gateways**: Ideal for devices needing complex networking (IPv6, MQTT) and wireless connectivity (WiFi, BLE).
- **Consumer Electronics**: Used in smartwatches, audio equipment, and appliances that require a small footprint but rich feature sets.
- **Automotive Systems**: Applicable for telematics and body control modules, leveraging its support for CAN, CANFD, and S32K architectures.
- **Drones and Robotics**: Excellent for flight controllers and robotic actuators requiring low-latency interrupt handling and SMP support.
- **Legacy System Migration**: A perfect target for porting legacy Unix/Linux applications to microcontrollers due to its high POSIX compliance.

### Getting Started

To begin development with Apache NuttX, developers should first set up their build environment by installing the necessary toolchains for their target architecture (e.g., `arm-none-eabi-gcc` or `riscv64-unknown-elf-gcc`). The build system is based on `kconfig` and `make`, similar to the Linux kernel. A typical workflow involves selecting a predefined configuration using the `./tools/configure.sh` script, followed by running `make` to generate the binary image. 

For those without physical hardware, the NuttX Simulator provides an excellent starting point, allowing the RTOS to run as a native process on Linux, macOS, or Windows. Detailed documentation, including board-specific guides and API references, can be found at the [official Apache NuttX Documentation page](https://nuttx.apache.org/docs/latest/index.html). Community support is active through GitHub issues and the project's mailing lists.
