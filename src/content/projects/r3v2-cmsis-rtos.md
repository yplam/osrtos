---
title: R3v2 CMSIS-RTOS
summary: R3v2 is a high-performance RTOS kernel for ARM Cortex-M microcontrollers
  featuring native C11 thread support and POSIX compatibility. It utilizes lock-free
  and wait-free synchronization primitives to ensure non-blocking execution and includes
  advanced features like phase-compensated timer tasks and an OpenCL-style kernel
  queue.
codeUrl: https://github.com/AnatolyGeorgievski/CMSIS-RTOS
isShow: false
rtos: cmsis
libraries: []
topics:
- cmsis
- cmsis-rtos
- cortex-m
- kernel
- os
- posix
- real-time
- rtos
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- mos-rtos
- rust-support-for-rt-thread
- freertos-port-for-teensy-3-6-4-0-4-1
- cmsis-rtos2-compatibility-layer-for-rt-thread
- stateos-c-11
- freertos-wrapper-for-rt-thread
---

R3v2 is a sophisticated real-time operating system (RTOS) specifically engineered for ARM Cortex-M microcontrollers. Developed by Anatoly Georgievski, this kernel distinguishes itself by prioritizing non-blocking execution through lock-free and wait-free synchronization primitives. Whether you are working with legacy CMSIS-RTOS code or modern C11 threads, R3v2 provides a robust foundation for high-performance embedded applications.

### Multi-Standard Interface Support
One of the standout features of R3v2 is its multi-layered interface support. It natively implements C11 `threads.h`, including mutexes, condition variables, and thread-specific storage. For developers requiring industry-standard compatibility, it offers full CMSIS-RTOS support and selective CMSIS-RTOS v2 features. Furthermore, it provides extensive POSIX footprint, implementing Pthreads, semaphores, and device I/O to ease the porting of code from larger systems.

### Advanced Scheduling and Task Management
The scheduler in R3v2 operates within the PendSV interrupt, allowing for efficient context switching at the "tail" of any hardware interrupt. This ensures minimal latency and high responsiveness. The system supports multiple concepts of process management:
- **Standard Threads**: Full-featured threads with dedicated or shared stacks.
- **Services**: Background processes that implement cooperative multitasking without requiring a dedicated stack.
- **Kernels**: OpenCL-style task queues that allow for asynchronous event-driven execution models.
- **ThreadPools**: A system-level mechanism to run an unlimited number of tasks on a fixed number of time slots (stacks), significantly reducing RAM consumption.

### High-Precision Timing and Memory
For specialized applications like motor control or digital signal processing (DSP), R3v2 offers unique timer tasks. These tasks include phase error compensation, ensuring that periodic processes run with microsecond precision and minimal jitter, even when multiple timers are active simultaneously.

Memory management is handled through several non-blocking mechanisms. It provides a `malloc/free` implementation and a "slice" allocation mechanism compatible with Glib. By utilizing atomic operations, the kernel avoids the delays and jitter often associated with dynamic memory allocation in real-time environments.

### System Registry and Data Handling
R3v2 takes a modern approach to data persistence. Instead of a traditional file system, which often involves unnecessary data copying, it utilizes a System Registry. This object-oriented data model is compatible with BACnet addressing and allows program variables to be mapped directly to static configuration segments that persist across power cycles. This approach ensures that data is always available in memory for the application while maintaining the ability to save state.

### Hardware Compatibility
Currently, R3v2 supports a wide range of ARM Cortex-M architectures, including:
- **ARMv7-M**: Cortex-M3, M4, M7
- **ARMv8-M**: Cortex-M23, M33, M35P, M55, M85

The kernel is designed for portability, targeting any architecture that provides hardware support for exclusive access (atomic) operations. Debugging is facilitated through a Trace subsystem that supports non-blocking output via ITM SWO or UART, allowing for real-time monitoring without stalling the CPU.
