---
title: Hubris
slug: hubris
summary: Hubris is a memory-isolated, task-based RTOS written in Rust, specifically
  designed for deeply-embedded microcontrollers with high reliability requirements.
  It eliminates dynamic resource allocation and runtime task creation to minimize
  attack surfaces and ensure deterministic behavior in critical systems.
codeUrl: https://github.com/oxidecomputer/hubris
siteUrl: https://github.com/oxidecomputer/hubris
star: 3443
version: all-sp-v1.0.62
lastUpdated: '2026-02-28'
components:
- Bootloader
- Cryptography
- Profiling
- Network
- Shell
- Testing
- Tracing
- HAL
platforms:
- ARM
- ARM Cortex-M
- Linux
- Windows
- macOS
- POSIX
licenses:
- MPL-2.0
createdAt: '2025-12-15'
updatedAt: '2026-03-01'
---

### Features


- Memory isolation between separately-compiled components using hardware protection units.

- Preemptive multitasking with a fixed set of tasks defined entirely at build time.

- Zero dynamic resource allocation or runtime task creation/destruction to ensure determinism.

- Driver code runs in unprivileged mode as separate tasks, allowing for isolated restarts on failure.

- Inter-component messaging system that replaces traditional syscalls for most system operations.

- Custom xtask build system for managing complex multi-architecture Rust builds.

- Tight integration with the Humility debugger for in-situ and postmortem system analysis.

- Interface definitions managed via the Idol Interface Definition Language (IDL).

- Support for automated testing using dedicated test images and ITM output reporting.

- Built-in mechanism for generating task relationship and priority graphs via Graphviz.

- Specialized development environment support for rust-analyzer and Neovim integration.

- Comprehensive peripheral definitions and debugging support for various MCU families including STM32 and LPC.

- Ability to capture and analyze system dumps for offline 'postmortem' debugging.

- Integrated GDB support via Humility for low-level hardware debugging and semihosting.

- Support for auxiliary flash management for persistent data storage across reboots.



### Architecture

Hubris utilizes a microkernel-inspired architecture where the kernel is kept extremely minimal—approximately 2000 lines of Rust code. Its primary responsibilities are restricted to task scheduling, memory isolation, and managing inter-process communication (IPC). Unlike traditional RTOS designs, Hubris does not allow for dynamic resource allocation or the creation of tasks at runtime; the entire system structure is fixed at build time, which significantly reduces the potential for runtime errors and security vulnerabilities.

In this architecture, drivers and applications run as separate, unprivileged tasks. This isolation ensures that a failure or crash in a specific driver (such as a serial or SPI driver) does not compromise the kernel or other system components. Communication between these isolated tasks is facilitated through a synchronous messaging system defined by the Idol Interface Definition Language (IDL), which provides a structured and type-safe way for tasks to interact without direct memory sharing.

#### Core Components
- **Kernel (sys/kern)**: The privileged core managing task isolation and IPC.
- **User Library (sys/userlib)**: The ABI interface used by tasks to interact with the kernel.
- **Idol IDL**: A system for defining rigid, versioned interfaces between tasks.
- **Humility**: A specialized debugger designed to understand Hubris-specific concepts like tasks and archives.
- **xtask**: A custom build extension for Cargo that handles multi-architecture compilation and image distribution.

### Use Cases

This RTOS is ideal for:

- **Industrial Control Systems**: Applications requiring high reliability where driver failures must be isolated and recoverable without system-wide downtime.
- **Safety-Critical Monitoring**: Systems that benefit from postmortem analysis and in-situ debugging using the Humility toolset.
- **Secure Embedded Devices**: Products needing a minimal attack surface by eliminating C code, dynamic allocation, and runtime task management.
- **Hardware Management Controllers**: Deeply-embedded systems like the Oxide Gimlet board that manage complex power sequencing and peripheral monitoring.
- **Deterministic Automation**: Use cases where fixed memory footprints and predictable execution timing are mandatory.

### Getting Started

To begin developing with Hubris, you must first set up a Rust toolchain via `rustup` and install the Humility debugger. The build system is managed through a custom `xtask` extension, so instead of standard Cargo commands, you will use `cargo xtask dist` followed by the path to an application TOML file (e.g., `app/demo-stm32f4-discovery/app.toml`). This TOML file defines the tasks, priorities, and memory requirements for your specific hardware target. Detailed developer documentation is available in the `doc/` directory of the repository and is rendered at the official Hubris documentation site (https://oxidecomputer.github.io/hubris).
