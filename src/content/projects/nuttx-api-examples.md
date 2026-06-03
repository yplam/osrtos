---
title: NuttX API Examples
summary: A collection of example applications demonstrating the use of various Apache
  NuttX RTOS APIs, including task management, semaphores, message queues, and system
  logging. These examples are designed for NuttX version 12.3 and lower, providing
  practical implementations for common embedded system tasks.
slug: nuttx-api-examples
codeUrl: https://github.com/nopnop2002/nuttx_api_examples
star: 5
lastUpdated: '2024-01-08'
rtos: nuttx
topics:
- examples
- nuttx
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- nuttx-rtos-experiments
- nuttx-applications
- unipg-mbed-os-samples
- esp32-freertos-examples
- tinycbor-test-app-for-apache-nuttx
- mbed-os-unipg-samples-1
---

The nuttx_api_examples repository serves as a practical guide for developers working with the Apache NuttX Real-Time Operating System. It provides a structured set of application examples that demonstrate how to utilize core kernel features and system APIs in a real-world embedded environment.

### Core API Coverage

The project covers a wide range of essential RTOS functionalities, making it a valuable resource for developers transitioning to NuttX or looking for reference implementations of specific primitives:

- **Task Management**: Multiple examples (nuttx_api_task through nuttx_api_task4) illustrate different aspects of task creation, scheduling, and lifecycle management.
- **Synchronization and IPC**: Examples for semaphores (nuttx_api_sem) and message queues (nuttx_api_mq) show how to handle resource sharing and communication between threads safely.
- **System Services**: The repository includes demonstrations of the system logger (nuttx_api_syslog), work queues (nuttx_api_wq), and standard file I/O operations (nuttx_file_io).
- **Peripheral Access**: UART communication is showcased through the nuttx_api_uart example, demonstrating how to interact with serial hardware via the NuttX driver model.

### Versioning and Compatibility

These examples are specifically tailored for NuttX version 12.3 or lower. A notable technical detail mentioned in the project documentation is the transition in NuttX version 12.0, where the global variable `g_system_timer` was renamed to `g_system_ticks`. This highlights the importance of matching example code with the specific RTOS version being used to ensure successful compilation and system timing accuracy.

### Integration into the NuttX Ecosystem

The examples are designed to be integrated directly into the `apps/examples` directory of a standard NuttX workspace. By modifying the Kconfig file, users can seamlessly incorporate these examples into the NuttX configuration system. This allows developers to enable or disable specific examples using the standard `make menuconfig` interface, facilitating easy testing on target hardware.

### Target Hardware

While the examples are largely API-focused and portable across various NuttX-supported architectures, the documentation references the use of `st-flash`. This suggests a common use case with STM32 microcontrollers or similar ARM Cortex-M platforms. The typical workflow involves configuring the kernel, building the binary, and flashing it to the device using standard ST-Link tools, allowing for rapid prototyping and verification of API behavior on physical hardware.
