---
title: NeptuneOS
summary: Neptune OS is a microkernel-based operating system that implements a Windows
  NT personality on top of the seL4 microkernel. It executes the NT Executive as a
  userspace root task, providing a faithful implementation of the NT Native API and
  a driver model where device drivers run in isolated processes while communicating
  via seL4 IPC.
slug: cl91-neptuneos
codeUrl: https://github.com/cl91/NeptuneOS
star: 427
version: v0.3.0003
lastUpdated: '2026-01-05'
components:
- Scheduler
- Memory Management
- IPC
- FileSystem
- Storage
- Shell
- Bootloader
- Graphics
- Audio
- POSIX
- Cache Manager
- Object Manager
- Process Manager
- IO Manager
- Configuration Manager
platforms:
- x86
- x86_64
- i686
- i386
- amd64
- AArch64
- ARM
- QEMU
licenses:
- GPL-2.0
libraries:
- seL4
- ReactOS
- Microsoft Driver Samples
- Open Fabrics Alliance NVMe
- LKL
createdAt: '2025-12-31'
updatedAt: '2026-02-24'
---

### Features


- Implements the Windows NT Executive as a userspace process on the seL4 microkernel.

- Exposes the NT Native API (Nt*) via stub functions in a custom NTDLL.DLL.

- Runs device drivers in separate userspace processes to enhance system isolation and security.

- Provides a complete storage driver stack including classpnp.sys, disk.sys, and storport.sys.

- Supports high-performance storage interfaces through AHCI and NVMe miniport drivers.

- Features a FAT12/16/32 file system driver with integrated read-ahead and write-back caching.

- Includes an Object Manager for managing system resources with support for symbolic links and parsing.

- Implements a Cache Manager that ensures consistent file access across different process boundaries.

- Supports Structured Exception Handling (SEH) for robust kernel-mode and user-mode error recovery.

- Provides a Configuration Manager that implements a volatile registry for hardware configuration.

- Includes a DMA subsystem supporting ISA slave DMA, PCI bus mastering, and software scatter/gather.

- Supports UEFI booting with high-definition GOP linear framebuffer rendering for the text console.

- Implements Local Procedure Call (LPC) port objects as thin wrappers over seL4 endpoint primitives.

- Features a PNP root enumerator and ACPI/PCI bus drivers for automated device discovery.

- Includes a POSIX subsystem shim allowing for the execution of basic Unix-like utilities.

- Supports i686, x86_64, and AArch64 architectures with specific optimizations like fsgsbase and global pages.



Neptune OS utilizes a microkernel architecture where the seL4 microkernel serves as the foundational layer, handling low-level hardware abstraction, thread scheduling, and Inter-Process Communication (IPC). The core of the operating system is the "NT Executive," which runs as the seL4 root task in userspace. This component implements the high-level semantics of Windows NT, including the Object Manager, Process Manager, and IO Manager. By moving these traditionally kernel-space services into userspace, Neptune OS leverages seL4's capability-based security model to isolate system components.

Communication between the NT Executive and other system components, such as device drivers and environment subsystems, is performed using I/O Request Packets (IRPs) serialized over seL4 IPC. Device drivers in Neptune OS are standalone processes, a departure from the monolithic Windows model, which prevents a single driver failure from compromising the entire system. The architecture is designed to be binary compatible with native Windows executables by providing a faithful implementation of the NT Native API via NTDLL.

#### Core Components
- **Object Manager (Ob)**: Manages the system namespace, handle tables, and object lifetimes.
- **IO Manager (Io)**: Orchestrates IRP-based communication between clients and drivers.
- **Cache Manager (Cc)**: Provides a centralized caching mechanism for file systems and block devices.
- **Process Manager (Ps)**: Handles process and thread creation, mapping NT concepts to seL4 primitives.
- **Configuration Manager (Cm)**: Manages the system registry and hardware configuration database.

### Use Cases
This RTOS is ideal for:
- **Secure Systems Research**: Leveraging the formal verification of seL4 while providing a familiar Windows-like environment for application development.
- **Legacy Driver Isolation**: Running ported Windows or ReactOS drivers in isolated userspace environments to prevent system-wide crashes.
- **Embedded Windows Personalities**: Deploying lightweight, NT-compatible environments on hardware where a full Windows installation is not feasible.
- **Microkernel Performance Benchmarking**: Evaluating the overhead of NT-style IRP processing and system calls in a client-server microkernel model.

### Getting Started
To begin developing for Neptune OS, you must have a Linux-based build environment with the LLVM toolchain (Clang/LLD) and Python dependencies installed. The project uses a unified build script, `build.sh`, which orchestrates the compilation of the seL4 kernel, the NT Executive, and various PE-format drivers and utilities. Developers should clone the repository with submodules to include the seL4 source. Detailed architectural documentation and a driver porting guide are available in the `docs/` directory, specifically within the `Developer-Guide.md` file. For testing, the project provides `run.sh` to launch the OS in QEMU with support for direct kernel loading, ISO, or UEFI boot modes.
