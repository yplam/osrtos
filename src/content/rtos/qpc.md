---
title: qpc
summary: QP/C is a lightweight, event-driven real-time event framework (RTEF) based
  on the Active Object (Actor) model of computation and Hierarchical State Machines.
  It serves as a modern alternative to traditional RTOSs by providing a non-blocking,
  asynchronous architecture designed for deterministic execution in safety-critical
  embedded systems.
slug: qpc
codeUrl: https://github.com/QuantumLeaps/qpc
siteUrl: https://www.state-machine.com/products/qp
star: 1280
version: v8.1.4
lastUpdated: '2026-04-18'
components:
- Scheduler
- IPC
- Memory Management
- Profiling
- FunctionalSafety
- POSIX
- Windows
platforms:
- ARM Cortex-M
- ARM Cortex-R
- MSP430
- PIC32
- RISC-V
- POSIX
- Linux
- Windows
- Native
- Simulator
licenses:
- GPL-3.0
- Commercial
libraries:
- QM
- QTools
- PC-Lint-Plus
createdAt: '2025-12-16'
updatedAt: '2026-04-19'
---

### Features


- Implementation of the Active Object (Actor) model for strict encapsulation of concurrency.

- Support for Hierarchical State Machines (UML Statecharts) to specify complex behavior.

- Includes the QV non-preemptive kernel for simple foreground/background systems.

- Includes the QK preemptive, non-blocking kernel for hard real-time performance.

- Includes the QXK preemptive, dual-mode kernel supporting both blocking and non-blocking threads.

- Event-driven, asynchronous communication via event queues and publish-subscribe mechanisms.

- Run-to-completion (RTC) event processing semantics to ensure state machine integrity.

- Built-in software tracing (QS/QP Spy) for real-time monitoring and profiling.

- Trace-based unit testing support via the QUTest harness.

- MISRA-C:2023/2025 compliance for safety-critical application development.

- Zero-copy event delivery through efficient event pools and memory management.

- Support for multiple system clock tick rates (up to 15).

- Native integration with the QM graphical modeling tool for automatic code generation.

- Portability across bare-metal MCUs, traditional RTOSs, and GPOSs like Linux and Windows.

- Functional safety artifacts available for IEC 61508, ISO 26262, and IEC 62304 certification.



QP/C is architected as a Real-Time Event Framework (RTEF) that replaces or augments traditional RTOS kernels with an Active Object (Actor) model. The core design centers on the "Shared-Nothing" principle, where Active Objects are autonomous entities that encapsulate state and behavior, communicating exclusively through asynchronous event exchanges. This architecture eliminates common concurrency hazards like race conditions and deadlocks by avoiding shared resources and explicit mutual exclusion mechanisms like semaphores.

The framework provides three distinct built-in kernels to suit different application needs: the cooperative QV kernel, the preemptive non-blocking QK kernel, and the dual-mode QXK kernel which allows legacy blocking code to run alongside non-blocking Active Objects. The system is highly modular, consisting of the QEP (Event Processor) for state machine execution, QF (Framework) for event delivery and memory management, and QS (Software Tracing) for system visibility.

### Core Components
- **QEP Event Processor**: A universal implementation of Hierarchical State Machines based on UML statecharts.
- **QF Framework**: A portable event-driven infrastructure for executing Active Objects and managing event queues.
- **QV/QK/QXK Kernels**: A selection of real-time kernels ranging from non-preemptive to preemptive dual-mode operation.
- **QS Software Tracing**: A highly efficient instrumentation system for real-time monitoring and testing.

### Use Cases
This RTOS is ideal for:
- **Industrial Automation**: Managing complex control logic in PLCs and motor controllers using hierarchical state machines.
- **Medical Devices**: Developing safety-critical systems that require formal traceability and functional safety certification (IEC 62304).
- **Consumer Electronics**: Implementing responsive, low-power user interfaces and communication protocols on resource-constrained MCUs.
- **Automotive Systems**: Building deterministic, hard real-time components that comply with ISO 26262 ASIL requirements.

### Getting Started
To get started with QP/C, it is recommended to download the QP-bundle, which includes the framework, the QM modeling tool, and QTools. Developers should begin by exploring the provided examples in the `examples/` directory, such as the "Blinky" or "Dining Philosophers Problem (DPP)" projects. The framework uses a CMake-based build system; integration involves including `qpc_sdk_import.cmake` and calling `qpc_sdk_init()` in your project's `CMakeLists.txt`. Detailed documentation, including the System Requirements Specification (SRS) and Architecture Specification (SAS), is available at [state-machine.com/qpc](https://www.state-machine.com/qpc).
