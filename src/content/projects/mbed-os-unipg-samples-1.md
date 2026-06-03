---
title: 'Mbed OS UniPG Samples #1'
summary: A collection of educational Mbed OS example projects demonstrating core RTOS
  concepts, GPIO interrupt handling, and event queues. It provides a foundational
  framework for embedded development with specific configurations for stack management
  and Ozone debugger integration.
slug: mbed-os-unipg-samples-1
codeUrl: https://github.com/maiorfi/mbed-unipg-samples-1
star: 0
lastUpdated: '2017-12-03'
rtos: mbed-os
topics:
- mbed
- mbed-os
- tutorial
- unipg
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- unipg-mbed-os-samples
- arm-kl25z-mbed-ide-example-programs
- stm32f4-cmsis-lessons
- chibios-rt-examples-for-stm32f401re-nucleo
- esp32-repo
- mongoose-os-samples-for-esp32
---

## Overview

The Mbed OS UniPG Samples #1 repository serves as an introductory resource for developing embedded applications using Mbed OS. Created for educational purposes at the University of Perugia, these samples guide developers through the fundamental concepts of real-time operating systems and hardware interfacing on ARM Cortex-M platforms.

The project is structured to showcase different levels of complexity, from basic RTOS initialization to more advanced event-driven architectures. It includes configuration files for the Mbed build system and project files for the Ozone debugger, facilitating a professional development and debugging workflow.

## Key Features and Examples

The repository is organized into several branches, each focusing on a specific aspect of embedded development:

- **Basic RTOS Example**: A clean implementation of an RTOS project, providing a minimal structure required for multi-threaded applications.
- **GPIO Interrupts**: Demonstrates how to handle hardware interrupts triggered by GPIO pins, which is a critical skill for creating responsive embedded systems.
- **Event Queues**: An evolution of the interrupt example that utilizes event queues to defer processing from an Interrupt Service Routine (ISR) context to a thread context, improving system stability and reducing interrupt latency.

## Technical Configuration

The project utilizes `mbed_app.json` to manage system-wide settings. Specifically, it defines stack sizes for both the main thread and user threads, ensuring that the application has sufficient memory for its operations while remaining within the constraints of the target microcontroller:

```json
{
    "config": {
      "thread_stack_size": {
        "value": 1024
      },
      "main_stack_size": {
        "value": 1024
      }
    }
}
```

This explicit configuration is essential for resource-constrained devices where default stack sizes might be either too large (wasting RAM) or too small (causing stack overflows).

## Debugging and Development

Beyond the source code, the repository includes an `ozone_project.jdebug` file. Ozone is a powerful graphical debugger for embedded systems, and its inclusion suggests a focus on professional debugging techniques. This allows developers to inspect thread states, variables, and hardware registers in real-time during execution.

The build environment is further refined using `.mbedignore`, which excludes unnecessary Mbed OS features such as networking (lwIP), uVisor, and Mbed TLS. This optimization reduces binary size and compilation time, keeping the focus on the core RTOS functionality and hardware I/O.
