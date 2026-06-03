---
title: CMSIS-RTOS1 Compatibility Layer for RT-Thread
summary: This project provides a CMSIS-RTOS API v1 compatibility layer for the RT-Thread
  operating system. It enables developers to migrate legacy applications or third-party
  middleware designed for CMSIS-RTOS1 to the RT-Thread ecosystem without modifying
  the application-level code.
codeUrl: https://github.com/RT-Thread-packages/CMSIS_RTOS1
isShow: false
rtos: rt-thread
libraries: []
topics:
- cmsis
- cmsis-rtos
- cmsis-rtos1
- rt-thread
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- cmsis-rtos2-compatibility-layer-for-rt-thread
- c-os-ii-compatibility-layer-for-rt-thread
- freertos-wrapper-for-rt-thread
- c-os-iii-compatibility-layer-for-rt-thread
- c-common-for-rt-thread
- rtduino
---

The CMSIS-RTOS1 Compatibility Layer for RT-Thread is a specialized middleware designed to bridge the gap between the ARM CMSIS-RTOS API v1 and the RT-Thread real-time operating system. For developers working with legacy codebases or third-party libraries originally written for CMSIS-compliant kernels, this package provides a seamless migration path, allowing application code to run on RT-Thread without modification.

### Seamless Migration and Compatibility
The primary goal of this project is to allow application-level code to remain "unaware" of the underlying RT-Thread kernel. By providing the standard `cmsis_os.h` header and implementing its functions, the layer maps CMSIS-RTOS calls directly to RT-Thread's native Inter-Process Communication (IPC) and scheduling primitives. This includes support for:
- **Thread Management**: Creating and managing threads using `osThreadCreate` and related functions.
- **Timers**: Implementing software timers via `osTimerCreate`.
- **Signal Management**: Handling event flags and signals.
- **Synchronization**: Full support for Mutexes and Semaphores.
- **Message Queues and Mail Queues**: Standardized data passing between threads.

### Technical Implementation
The implementation is primarily contained within two files: `cmsis_os.h`, which defines the standard interface, and `cmsis_rtthread.c`, which contains the logic mapping the CMSIS API to RT-Thread kernel calls. This architecture ensures that the overhead is kept to a minimum while maintaining high compatibility with the ARM standard.

To help developers verify the integration, the repository includes a `testcases` directory containing `cmsis_rtos_tc.c`. These test cases serve as both a validation suite and a reference for how the CMSIS-RTOS API interacts with the RT-Thread environment.

### A Broader Ecosystem
This package is part of a larger initiative by the RT-Thread community to provide compatibility layers for various RTOS environments. Beyond CMSIS-RTOS1, RT-Thread also offers wrappers for:
- **μCOS-II and μCOS-III**
- **FreeRTOS**
- **CMSIS-RTOS2 (RTX5)**
- **Arduino Ecosystem (RTduino)**

This extensive support makes RT-Thread a versatile choice for developers who need to integrate diverse software components or transition from other popular embedded platforms without rewriting their entire application stack.
