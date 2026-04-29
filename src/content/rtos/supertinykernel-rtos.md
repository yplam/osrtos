---
title: SuperTinyKernel RTOS
slug: supertinykernel-rtos
summary: SuperTinyKernel™ RTOS (STK) is a high-performance, deterministic, bare-metal
  C++ real-time operating system designed for resource-constrained embedded systems.
  It features a rich set of scheduling strategies including hard real-time (HRT) with
  deadline enforcement, mixed-criticality adaptive scheduling, and full CMSIS-RTOS2
  and FreeRTOS API compatibility, targeting ARM Cortex-M and RISC-V architectures.
codeUrl: https://github.com/SuperTinyKernel-RTOS/stk
siteUrl: https://supertinykernel.org
star: 19
version: '1.06.1'
lastUpdated: '2026-04-29'
components:
- Scheduler
- Synchronization
- Memory
- Profiling
- TrustZone
- MPU
platforms:
- ARM Cortex-M
- ARM Cortex-M3
- ARM Cortex-M4
- ARM Cortex-M7
- ARM Cortex-M33
- ARM Cortex-M55
- RISC-V
- Windows
- QEMU
licenses:
- MIT
libraries:
- SEGGER SystemView
createdAt: '2026-04-29'
updatedAt: '2026-04-29'
---

### Features

- Preemptive and cooperative multitasking with both soft real-time and hard real-time (HRT) kernel modes.

- Rich scheduling strategy suite: Round-Robin, Fixed-Priority, Smooth Weighted Round-Robin (SWRR), Rate-Monotonic (RM), Deadline-Monotonic (DM), Earliest Deadline First (EDF), and Mixed-Criticality Adaptive Scheduling (MCAS / MCAS4).

- Hard real-time mode with guaranteed execution windows, per-task deadline enforcement, and `OnDeadlineMissed()` callback on overrun.

- Static (`KERNEL_STATIC`) and dynamic (`KERNEL_DYNAMIC`) task models for both startup-only and runtime task creation patterns.

- Tick-based and tickless (`KERNEL_TICKLESS`) context switching for power-efficient battery-operated devices.

- Asymmetric Multi-Processing (AMP) multi-core support via independent per-core kernel instances with no shared locks.

- Memory Protection Unit (MPU) support with privileged (`ACCESS_PRIVILEGED`) and unprivileged (`ACCESS_USER`) task separation.

- Comprehensive synchronization API (`stk::sync`): Mutex, RWMutex, Semaphore, Event, EventFlags, ConditionVariable, SpinLock, Pipe, and MessageQueue.

- Deterministic, fragmentation-free memory allocator (`stk::memory::BlockMemoryPool`) with O(1) alloc and free.

- Thread-Local Storage (TLS) per task via a dedicated CPU register with zero-overhead inline helpers.

- Full CMSIS-RTOS2 wrapper (`cmsis_os2_stk.cpp`) for drop-in compatibility with STM32CubeMX and MCUXpresso middleware.

- Full FreeRTOS API wrapper (`freertos_stk.cpp`) enabling migration of existing FreeRTOS codebases with minimal changes.

- No dynamic heap allocation, making it suitable for safety-critical systems and MISRA-compliant projects.

- Scheduling trace and profiling support via SEGGER SystemView.

- Development and testing mode for Windows (x86), with all commits covered by QEMU-based unit tests for Cortex-M and RISC-V.

- 100% scheduler source-code line coverage by unit tests.

### Architecture

SuperTinyKernel RTOS uses a microkernel design implemented in C++ with an object-oriented approach that avoids STL dependencies, dynamic memory allocation, and aggressive namespace usage, keeping it approachable for embedded developers. The kernel core is strictly focused on the task scheduler; all other functionality is opt-in via compile-time flags (`KERNEL_SYNC`, `KERNEL_TICKLESS`, `KERNEL_HRT`, etc.), so unused modules are stripped by the compiler and do not consume flash or RAM.

Hardware-dependent code is isolated in `stk/src/arch` and `stk/include/arch`, making porting to a new platform a matter of implementing a small, well-defined surface. The scheduler itself is abstracted behind the `ITaskSwitchStrategy` interface, allowing custom scheduling algorithms to be plugged in without modifying the kernel internals.

#### Core Components
- **Task Scheduler**: Supports preemptive, cooperative, and round-robin strategies in soft real-time mode; rate-monotonic, deadline-monotonic, and EDF strategies in hard real-time mode; plus commercial mixed-criticality adaptive strategies (MCAS / MCAS4).
- **Synchronization (`stk::sync`)**: A full suite of thread-safe primitives including mutexes, reader-writer locks, semaphores, events, event flags, condition variables, spin locks, typed pipes, and message queues—all backed by ISR-safe operations where applicable.
- **Memory (`stk::memory`)**: Fixed-size block memory pool with zero fragmentation and O(1) alloc/free, designed for use in environments where heap allocation is prohibited.
- **MPU Support**: Hardware-enforced task isolation on ARMv7-M and ARMv8-M cores; untrusted tasks run unprivileged while drivers retain full peripheral access.
- **AMP Multi-Core**: One STK kernel instance per physical core for lock-free inter-core operation on dual-core ARM or RISC-V devices.

### Use Cases

This RTOS is ideal for:

- **Industrial Automation**: Deterministic motor control and sensor fusion loops with hard real-time deadline enforcement and EDF or RM scheduling.
- **Medical Devices**: Safety-critical firmware requiring no heap allocation, 100% tested scheduler logic, and formal IEC 62304 compliance assistance.
- **Consumer IoT & Wearables**: Low-power battery devices leveraging tickless idle and the lightweight footprint of the opt-in module architecture.
- **Automotive Telematics**: Mixed-criticality systems on ARM Cortex-M/R processors where high-priority safety tasks must be isolated from lower-priority application logic.
- **Secure Edge Devices**: MPU-based privilege separation for tasks handling untrusted network, USB, or firmware update payloads.
- **FreeRTOS Migration**: Existing FreeRTOS-based products seeking improved scheduling flexibility or hard real-time guarantees with minimal codebase changes.

### Getting Started

Clone the repository and explore the `build/example/project` directory, which contains pre-configured Eclipse projects for popular boards such as STM32F407G-DISC1 (ARM Cortex-M4) and Raspberry Pi RP2350W (RISC-V).

To integrate STK into an existing project, add `stk/include` to your include paths, create a minimal `stk_config.h` that selects your target architecture (e.g., `#define _STK_ARCH_ARM_CORTEX_M`), and add the appropriate architecture source file from `stk/src/arch/<your-platform>` to your build. No other dependencies are required for the bare kernel.

Full documentation, API reference, and porting guidance are available in the [GitHub repository](https://github.com/SuperTinyKernel-RTOS/stk). For commercial licensing, safety-critical compliance support (IEC 61508, ISO 26262, IEC 62304, DO-178C), or enterprise maintenance contracts, contact [contact@supertinykernel.org](mailto:contact@supertinykernel.org).
