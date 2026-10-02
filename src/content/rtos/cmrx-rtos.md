---
title: CMRX RTOS
summary: CMRX is security-oriented, high-performance microkernel targeted towards low-cost
  microcontrollers without support for memory management unit. It provides memory isolated
  environment on commodity 32-bit microcontrollers equipped with MPU. It serves as a minimal 
  core for building secure and reliable embedded systems by enforcing strict hardware-enforced
  isolation.
slug: cmrx
codeUrl: https://github.com/ventZl/cmrx
siteUrl: http://cmrxrtos.org/
star: 129
version: 0.2.1
lastUpdated: '2026-09-26'
components:
- Scheduler
- IPC
- TrustZone
platforms:
- ARM
- ARM Cortex-M
- RISC-V
- hosted POSIX environment
licenses:
- MIT
createdAt: '2026-10-01'
createdAt: '2026-10-01'
---

### Features

- Always-on, fully automatically managed hardware-enforced memory protection

- Preemptive priority-driven multithreaded scheduler

- Zero-allocation kernel design with all resource needs calculated during compile-time

- High-performance synchronous Remote Procedure Calls (RPC) for inter-process communication

- Object-oriented RPC interfaces done in plain C (no IDL needed)

- Drivers running in user-space processes rather than inside kernel

- Support for CMSIS-based HALs

- Ability to build CMRX as hosted application for development and testing purposes

- Extensive test suite including kernel tests and HAL integration tests

#### Architecture

CMRX is a microkernel-based RTOS designed to provide highest level of security for embedded applications running on low-power microcontrollers. Unlike other real-time operating systems running on microcontrollers, CMRX follows the principle of minimalism, displacing most of non-essential components outside of the kernel. This makes the kernel extremely small and portable. CMRX kernel utilizes hardware-enforced memory isolation not only to isolate kernel from userspace but also to isolate individual processes in userspace. Memory protection is managed fully automatically by the kernel.

Following the microkernel architecture, not only processes but also device drivers are displaced into userspace. In CMRX, drivers are also a subject of memory protection. A bug or crash in driver or process cannot compromise kernel, another driver or driver and is always contained within failing process.

CMRX kernel does not use dynamic memory allocation. All resources and resource pools have to be statically configured during compile time. Dynamic memory allocation of userspace processes is not explicitly prohibited but it is not supported by the kernel.

Inter-process communication is provided via synchronous remote procedure calling mechanism, that allows traversal of process boundaries. CMRX RPC subsystem is object-oriented. Interface definition is done directly in the C code and all RPC calls are compile time-validated for type safety and correctness directly by the compiler. At runtime, the kernel validates that RPC calls are made to legit RPC interfaces published by processes. RPC calls also provides way for memory sharing between processes.

Drivers use the same RPC mechanism as processes to define the driver API.

#### Core Components
- **Kernel**: Manages threads, timers, notifications and dispatches RPC calls
- **RPC calls**: Provides high-speed, cross-address-space communication
- **Standard library**: The userspace support library providing access to kernel functions and common functionality implemented in userspace
- **Queue library/server**: Optimized queue implementation suitable for intra-process and inter-process queue use cases

### Use Cases
This RTOS is ideal for:

- **Mixed-criticality systems**: Systems where it is necessary to spatially isolate components of different criticality to avoid corruption of more critical parts by bugs in less critical parts.
- **Secure Edge Computing**: Utilizing memory isolation to run untrusted or third-party applications securely.
- **Critical Infrastructure**: Building secure gateways and industrial controllers that must remain resilient against remote exploitation.
- **Medical Devices**: Ensuring that life-critical monitoring and delivery functions are protected from software failures in auxiliary components.

### Getting Started

To begin developing with CMRX, it is recommended to use CPM, the CMake Package Manager to include CMRX as a dependency in your project. The integration of CMRX in project running on supported platform is matter of adding following lines in your main CMakeLists.txt:

~~~~
set(CMRX_DEVICE <name_of_chip>)
include(${cmrx_SOURCE_DIR}/cmake/cmrx.cmake)
add_subdirectory(${cmrx_SOURCE_DIR})
~~~~

Where `<name_of_chip>` is HAL-recognized name of microcontroller used in your project. From that point on, you can use `add_firmware` as an alias for `add_executable` which initializes various automated post-build tasks needed to manage MPU; `add_application` as an alias for `add_library` to define processes and `target_add_applications` as an alias for `target_link_libraries` to link applications to firmware. 

Detailed documentation, including the CMRX Reference Manual and examples can be found at the [CMRX website](https://cmrxrtos.org/). For host-based execution, CMRX provides native hosted builds which are available on any POSIX-compatible host system, such as Linux, Mac OS or WSL. This is a tool suitable for CI/CD builds, testing and development deployments.
