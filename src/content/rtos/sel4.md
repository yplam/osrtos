---
title: seL4
summary: seL4 is a high-assurance, high-performance microkernel that is the first
  of its kind to be formally verified for functional correctness and security properties.
  It serves as a minimal core for building secure and reliable operating systems by
  enforcing strict isolation through a capability-based access control system.
slug: sel4
codeUrl: https://github.com/seL4/seL4
siteUrl: http://sel4.systems/
star: 5333
version: 14.0.0
lastUpdated: '2026-02-25'
components:
- Scheduler
- Memory Management
- IPC
- Bootloader
- Profiling
- SecureBoot
- TrustZone
- Shell
platforms:
- ARM
- ARM Cortex-A
- AArch32
- AArch64
- RISC-V
- x86
- x86_64
- i386
- QEMU
- Simulator
licenses:
- GPL-2.0
- BSD 2-Clause
libraries:
- libsel4
createdAt: '2025-12-14'
updatedAt: '2026-03-03'
---

### Features


- Formal verification of functional correctness from C implementation to abstract specification.

- Binary-level verification ensuring the compiled machine code matches the verified C source.

- Capability-based security model for fine-grained access control over all kernel objects.

- High-performance synchronous Inter-Process Communication (IPC) with optimized fastpaths.

- Strict temporal isolation and budget management through the Mixed-Criticality System (MCS) configuration.

- Policy-free resource management where the kernel delegates memory and authority to a user-level root task.

- Virtualization support allowing the kernel to act as a Type-1 hypervisor on ARM and x86.

- Zero-heap design where all kernel-side metadata memory is explicitly provided by user-level applications.

- Mathematical proofs of integrity and confidentiality properties to prevent unauthorized data access.

- Support for Symmetric Multiprocessing (SMP) using a big-kernel-lock architecture for multi-core systems.

- Domain-based scheduling for preventing timing side-channels between security domains.

- Hardware-assisted isolation using IOMMU (x86) and SystemMMU (ARM) for secure DMA management.

- Comprehensive support for ARMv7/v8, x86/x86_64, and RISC-V (32/64-bit) architectures.

- Configurable kernel optimization levels and debug facilities including serial printing and assertions.

- Integrated benchmarking framework for tracking kernel entries, utilization, and tracepoints.

- Support for huge pages (1GB) and PCIDs to optimize memory management and context switching.

- Hardware debug API support for userspace breakpoints, watchpoints, and single-stepping.

- Minimal kernel image size (approx. 66-162 KiB) depending on architecture and configuration.



seL4 is a third-generation microkernel designed to provide the highest level of security and reliability for critical systems. Unlike monolithic kernels, seL4 follows the principle of minimality, containing only the essential mechanisms for controlling access to physical address space, interrupts, and processor time. Its architecture is built around a capability-based security model, where every operation must be authorized by an unforgeable token (capability) held by the calling thread. This design ensures that components are strictly isolated, and faults in one part of the system cannot propagate to others.

The kernel is unique for its zero-heap design; it does not manage its own memory. Instead, all memory management is delegated to a user-level 'root task' that receives all free physical memory as 'Untyped' capabilities upon boot. This root task can then partition and retype this memory into specific kernel objects (like Thread Control Blocks or Page Tables) and delegate them to other processes. This policy-freedom allows developers to implement custom resource management strategies suitable for diverse application domains, from real-time embedded systems to secure hypervisors.

#### Core Components
- **Capability-Based Access Control**: Manages all kernel resources (memory, IPC, IRQs) via delegatable tokens.
- **Synchronous IPC Mechanism**: Provides high-speed, cross-address-space communication with optimized fastpaths.
- **MCS Scheduler**: A Mixed-Criticality System scheduler that provides temporal isolation and budget enforcement.
- **Virtualization Layer**: Hardware-assisted hypervisor support for running guest operating systems like Linux.
- **Interrupt Management**: Mediates access to hardware interrupts and forwards them as asynchronous notifications.

### Use Cases
This RTOS is ideal for:
- **Aerospace and Defense**: Securing Unmanned Aerial Vehicles (UAVs) and cross-domain solutions where formal proof of security is required to prevent cyber-attacks.
- **Automotive Systems**: Isolating safety-critical engine control units (ECUs) from non-critical infotainment systems on the same hardware.
- **Critical Infrastructure**: Building secure gateways and industrial controllers that must remain resilient against remote exploitation.
- **Medical Devices**: Ensuring that life-critical monitoring and delivery functions are protected from software failures in auxiliary components.

### Getting Started
To begin developing with seL4, it is recommended to use the Google `repo` tool to manage the complex set of dependencies and manifests. Developers typically start by initializing a project like `sel4test` to verify their build environment. The build system is based on CMake and Ninja, requiring a cross-compilation toolchain for the target architecture (ARM, RISC-V, or x86). Detailed documentation, including the seL4 Reference Manual and interactive tutorials, can be found at the [seL4 Documentation Site](https://docs.sel4.systems/). For simulation, QEMU is the primary tool used to run and debug kernel images before deploying to physical hardware.
