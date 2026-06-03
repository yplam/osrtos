---
title: CMSIS-RTOS2 Compatibility Layer for RT-Thread
summary: A software compatibility layer that implements the CMSIS-RTOS2 API on top
  of the RT-Thread kernel. It allows applications designed for ARM's standardized
  RTOS interface to run seamlessly on RT-Thread without modification.
codeUrl: https://github.com/RT-Thread-packages/CMSIS_RTOS2
siteUrl: https://github.com/RT-Thread-packages/CMSIS_RTOS2
isShow: false
rtos: rt-thread
libraries: []
topics:
- cmsis
- cmsis-rtos
- cmsis-rtos2
- rt-thread
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- cmsis-rtos1-compatibility-layer-for-rt-thread
- c-os-ii-compatibility-layer-for-rt-thread
- freertos-wrapper-for-rt-thread
- c-os-iii-compatibility-layer-for-rt-thread
- c-common-for-rt-thread
- rtduino
---

## Bridging the Gap: CMSIS-RTOS2 on RT-Thread

In the world of ARM Cortex-M development, the CMSIS-RTOS2 API serves as a critical standardization layer. It provides a generic RTOS interface for software components, middleware, and library providers, ensuring that code remains portable across different real-time operating systems. The **CMSIS-RTOS2 Compatibility Layer for RT-Thread** brings this flexibility to the RT-Thread ecosystem, allowing developers to migrate legacy code or use CMSIS-compliant middleware with ease.

This project acts as an Application Compatibility Layer (ACL). Its primary goal is to make the transition to RT-Thread "painless" for applications originally developed for other CMSIS-RTOS2 compliant kernels, such as Keil RTX5. By mapping standard CMSIS calls to RT-Thread's native kernel primitives, it provides a familiar environment for developers coming from the ARM/Keil ecosystem.

### Why Use a Compatibility Layer?

RT-Thread is a powerful, feature-rich RTOS, but many existing software stacks and drivers are written specifically against the CMSIS-RTOS2 standard to ensure maximum reach. By using this wrapper, you gain several advantages:

*   **Code Portability**: Easily move application logic between different RTOS platforms that support CMSIS-RTOS2.
*   **Ecosystem Access**: Utilize ARM's extensive middleware and software components that require a CMSIS-RTOS2 environment.
*   **Reduced Learning Curve**: Developers familiar with the CMSIS standard can start working on RT-Thread projects immediately without learning a new set of API calls for basic threading and synchronization.

### Technical Implementation

The core of the project is contained within `cmsis_rtthread.c` and `cmsis_rtthread.h`. These files implement the standard CMSIS-RTOS2 functions—such as thread management, event flags, mutexes, semaphores, and memory pools—by wrapping RT-Thread's internal functions. 

For example, a call to `osThreadNew()` in the CMSIS API is internally translated into an `rt_thread_create()` or `rt_thread_init()` call within the RT-Thread kernel. The project also includes `os_systick.c`, which handles the underlying system timer requirements to ensure that CMSIS-style delays and timeouts function correctly.

### Project Structure

The repository is organized to be easily integrated into the RT-Thread build system:

*   **cmsis_rtthread.c/h**: The primary implementation of the compatibility layer.
*   **os_systick.c**: Handles system tick and timing integration.
*   **SConscript**: The build script for RT-Thread's Scons-based build system, making it a "plug-and-play" package.
*   **testcases/**: Includes functional tests, such as `thread_tc.c`, to verify that the threading implementation behaves as expected under the CMSIS specification.

### Getting Started

Because this is designed as an RT-Thread package, it is typically included via the RT-Thread Env tool or RT-Thread Studio. Once enabled, you can include the standard header:

```c
#include "cmsis_os2.h"
```

From there, you can initialize the kernel and create threads using the standard CMSIS-RTOS2 syntax:

```c
void app_main (void *argument) {
  // Application logic here
}

int main (void) {
  osKernelInitialize();
  osThreadNew(app_main, NULL, NULL);
  osKernelStart();
  for (;;);
}
```

This compatibility layer is part of a broader effort by the RT-Thread community to provide wrappers for various RTOS APIs, including uC/OS-II, uC/OS-III, FreeRTOS, and Arduino, making RT-Thread one of the most versatile kernels for cross-platform embedded development.
