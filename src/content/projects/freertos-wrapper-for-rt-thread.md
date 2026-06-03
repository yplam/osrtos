---
title: FreeRTOS Wrapper for RT-Thread
summary: A FreeRTOS application compatibility layer for the RT-Thread operating system
  that enables seamless migration of FreeRTOS-based applications. It maps FreeRTOS
  V10.4.6 APIs to RT-Thread primitives, covering task management, queues, semaphores,
  and event groups while handling architectural differences like priority logic and
  stack units.
slug: freertos-wrapper-for-rt-thread
codeUrl: https://github.com/RT-Thread-packages/FreeRTOS-Wrapper
star: 33
version: v1.0.0
lastUpdated: '2024-10-19'
rtos: rt-thread
topics:
- freertos
- rt-thread
- rtthread
- wrapper
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- cmsis-rtos1-compatibility-layer-for-rt-thread
- c-os-ii-compatibility-layer-for-rt-thread
- cmsis-rtos2-compatibility-layer-for-rt-thread
- c-os-iii-compatibility-layer-for-rt-thread
- c-common-for-rt-thread
- rtduino
---

The FreeRTOS Wrapper for RT-Thread is a specialized Application Compatibility Layer (ACL) designed to bridge the gap between two popular real-time operating systems. By providing a FreeRTOS-compatible API on top of the RT-Thread kernel, it enables developers to migrate existing FreeRTOS codebases to RT-Thread with minimal modifications. This is particularly useful for teams looking to leverage RT-Thread's extensive software component ecosystem while maintaining their investment in FreeRTOS-based application logic.

### Comprehensive API Support
The wrapper is based on FreeRTOS V10.4.6 and implements a wide array of standard APIs. This includes essential task control functions like `xTaskCreate`, `vTaskDelay`, and priority management. It also covers core synchronization and communication primitives:

- **Queues**: Support for creation, sending, and receiving, including ISR-safe versions.
- **Semaphores and Mutexes**: Binary semaphores, counting semaphores, and recursive mutexes are all mapped to RT-Thread's native synchronization objects.
- **Software Timers**: Full support for timer creation, starting, stopping, and period changes.
- **Event Groups**: Bitwise synchronization for complex task coordination.
- **Task Notifications**: Direct-to-task signaling, which is a high-performance alternative to semaphores in FreeRTOS.

### Navigating the Differences
While the wrapper aims for a seamless experience, there are fundamental architectural differences between FreeRTOS and RT-Thread that developers should keep in mind during migration.

#### Task Priorities and Stack Sizes
One of the most critical differences is priority logic. In FreeRTOS, a higher numerical value represents a higher priority, whereas RT-Thread uses the opposite convention (lower values are higher priority). The wrapper handles this conversion internally using macros like `FREERTOS_PRIORITY_TO_RTTHREAD`, but developers mixing native RT-Thread calls with FreeRTOS calls must be cautious. Similarly, stack size units differ: FreeRTOS typically uses words (`StackType_t`), while RT-Thread uses bytes. The wrapper adheres to FreeRTOS rules for its own APIs to maintain compatibility.

#### Interrupt Handling
In native FreeRTOS, APIs used within an Interrupt Service Routine (ISR) usually have a `FromISR` suffix and require the developer to manually trigger a context switch if a higher-priority task is woken. RT-Thread, however, handles this automatically within its APIs. Consequently, the `FromISR` functions in this wrapper are provided for compatibility but do not require manual yielding; the `xHigherPriorityTaskWoken` parameter is always returned as `pdFALSE` because the kernel has already handled the rescheduling.

#### Memory Management
The wrapper supports the standard FreeRTOS heap allocation algorithms (heap_1 through heap_5). By default, it uses `heap_3`, which redirects `pvPortMalloc` to the RT-Thread system heap. If other algorithms are selected, the wrapper maintains a separate heap area defined by `configTOTAL_HEAP_SIZE`, distinct from the main RT-Thread memory pool. This flexibility allows developers to choose between unified memory management or isolated heaps for ported components.

### Integration and Configuration
Integrating the wrapper is straightforward using the RT-Thread Env tool or RT-Thread Studio. Once added as an online package, developers can configure the layer via a `FreeRTOSConfig.h` template. Many settings are automatically synchronized with RT-Thread's kernel configuration, such as the tick rate (`RT_TICK_PER_SECOND`) and maximum priority levels. 

For developers starting a migration, the project includes several test cases in the `test` directory demonstrating dynamic queues and other synchronization primitives. These examples can be run directly from the RT-Thread msh (module shell) to verify the environment is correctly configured.
