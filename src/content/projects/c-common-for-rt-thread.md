---
title: μC/Common for RT-Thread
summary: A port of Micrium's µC/Common module for the RT-Thread RTOS, providing a
  Kernel Abstraction Layer (KAL) and shared components for Micrium software stacks.
  It enables the integration of µC/FS, µC/USB, and µC/TCP-IP into RT-Thread environments
  by leveraging a uCOS-III compatibility layer.
slug: c-common-for-rt-thread
codeUrl: https://github.com/mysterywolf/uC-Common-for-RT-Thread
siteUrl: https://doc.micrium.com/pages/viewpage.action?pageId=10754328
star: 1
lastUpdated: '2021-11-01'
rtos: rt-thread
topics:
- rt-thread
- uc-common
- ucos
- ucos-iii
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- uc-modbus-for-rt-thread
- c-os-iii-compatibility-layer-for-rt-thread
- c-os-ii-compatibility-layer-for-rt-thread
- cmsis-rtos1-compatibility-layer-for-rt-thread
- cmsis-rtos2-compatibility-layer-for-rt-thread
- freertos-wrapper-for-rt-thread
---

## Overview

μC/Common for RT-Thread is a specialized port of Micrium's foundational software module, designed to facilitate the use of Micrium's high-performance embedded stacks within the RT-Thread ecosystem. As a core component of the Micrium product line, μC/Common serves as a centralized repository for shared utilities and abstraction layers used by various products, including μC/FS (File System), μC/USB-Device, μC/USB-Host, and μC/TCP-IP.

The primary goal of this project is to provide the necessary infrastructure for these stacks to operate seamlessly on RT-Thread. It achieves this by implementing a Kernel Abstraction Layer (KAL) that maps Micrium's internal kernel requirements to RT-Thread's native APIs, often utilizing a uCOS-III compatibility layer as an intermediary.

## The Kernel Abstraction Layer (KAL)

At the heart of μC/Common is the Kernel Abstraction Layer (KAL). The KAL is a critical architectural component that allows Micrium's middleware to remain agnostic of the underlying Real-Time Operating System. By providing a standardized set of APIs for common RTOS services, the KAL ensures that stacks like μC/TCP-IP can be ported to different kernels with minimal modification.

Key features supported by the KAL in this implementation include:

- **Task Management**: Allocation, creation, and deletion of tasks.
- **Synchronization Primitives**: Support for both re-entrant and non-re-entrant locks (mutexes) and semaphores.
- **Message Queues**: Creation and management of queues for inter-task communication.
- **Timers**: One-shot and periodic timer support.
- **Memory Management**: Integration with memory segments for dynamic allocation.
- **Task Registers**: Support for task-specific storage and retrieval.

## Integration with RT-Thread

This package is designed to be used within the RT-Thread environment using the SCons build system. It includes an `SConscript` file that automates the inclusion of source files and header paths into the project. 

A notable feature of this port is its automatic dependency management. When enabled, it automatically triggers the inclusion of the [RT-Thread uCOS-III compatibility layer](https://github.com/mysterywolf/RT-Thread-wrapper-of-uCOS-III). This compatibility layer handles the heavy lifting of translating uC/OS-III specific calls into RT-Thread primitives, allowing the μC/Common module to initialize the system environment correctly.

## Technical Details

The project structure is clean and follows Micrium's traditional naming conventions. Core files include:

- `kal.c` / `kal.h`: The implementation and interface for the Kernel Abstraction Layer.
- `common.h`: General definitions and versioning information for the module.
- `auth.c` / `auth.h`: Authentication and security-related utilities used by higher-level Micrium stacks.
- `slist.c` / `slist.h`: Implementation of singly-linked list utilities.

## Getting Started

To use μC/Common in an RT-Thread project, users typically enable the package through the RT-Thread Env tool or via `menuconfig`. Once the `PKG_USING_UC_COMMON` definition is set, the SCons build script will include the necessary source files. 

Because μC/Common is a prerequisite for other Micrium components, it is rarely used in isolation. Instead, it serves as the foundation for developers looking to bring industrial-grade file systems or networking stacks from the Micrium portfolio into their RT-Thread-based firmware.
