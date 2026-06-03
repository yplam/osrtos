---
title: 'EtcPal: ETC Platform Abstraction Layer'
summary: A robust platform abstraction layer providing a neutral interface for system
  calls across desktop and embedded environments. It supports FreeRTOS, Zephyr, MQX,
  Linux, and Windows, enabling highly portable C and C++ development for 32-bit microcontrollers
  and desktop OSs.
slug: etcpal-etc-platform-abstraction-layer
codeUrl: https://github.com/ETCLabs/EtcPal
siteUrl: https://etclabs.github.io/EtcPalDocs
star: 16
version: v0.4.1
lastUpdated: '2025-12-05'
rtos: freertos
libraries:
- lwip
topics:
- abstraction
- embedded
- freertos
- linux
- lwip
- macos
- pal
- platform
- windows
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- enterprise-stm32-platform-development
- c-common-for-rt-thread
- freertos-wrapper-for-rt-thread
- lua-rtos-for-esp32
- c-os-ii-compatibility-layer-for-rt-thread
- ameba-rtos-sdk
---

EtcPal, the ETC Platform Abstraction Layer, is a foundational library designed to facilitate the creation of highly portable software. In the professional lighting and embedded systems industry, software often needs to span a vast range of hardware—from high-end desktop workstations to resource-constrained 32-bit microcontrollers. EtcPal solves this challenge by providing a unified, platform-neutral interface for common system operations.

### Bridging the Gap Between Desktop and Embedded

The primary strength of EtcPal lies in its ability to abstract the underlying operating system and network stack. Whether a developer is working on a Windows-based configuration tool or firmware for a Zephyr-based device, they can use the same EtcPal APIs for threading, synchronization, and networking. This abstraction significantly simplifies the development of middleware and application libraries that must run across diverse environments.

Currently, EtcPal provides ports for a wide variety of platforms:
- **RTOS Environments**: Full OS abstraction for FreeRTOS, Zephyr, and MQX.
- **Desktop Operating Systems**: Support for Linux, macOS, and Microsoft Windows.
- **Network Stacks**: Specialized network abstraction for lwIP.
- **Bare-Metal**: A "no-OS" configuration that allows developers to use EtcPal's utility functionality in environments without a formal scheduler.

### Language Support and Modern C++

EtcPal is written primarily in C99, ensuring compatibility with a wide range of embedded compilers. It avoids certain C99 features like variable-length arrays and the `restrict` keyword to maintain maximum portability. For developers working in modern environments, EtcPal also provides a robust set of C++ wrappers supporting C++14. These wrappers offer an idiomatic experience, including strongly typed opaque IDs and RAII-style management for resources like threads and locks.

### Robust Quality Standards

Because EtcPal serves as the bedrock for many other software products, it is maintained with rigorous quality standards. The project employs several "Quality Gates" to ensure stability:
- **Automated Testing**: Extensive unit and integration tests covering individual API modules.
- **Static and Dynamic Analysis**: The project uses Clang Tidy for static analysis and Address Sanitizer (ASAN) during Linux testing to catch memory errors at runtime.
- **Continuous Integration**: A comprehensive GitLab CI pipeline builds and tests the library across all supported platforms, including specific stages for FreeRTOS, MQX, and Zephyr.

### Key Modules and Functionality

The library is organized into logical modules covering essential system services:
- **Threading and Synchronization**: Includes abstractions for mutexes, signals, semaphores, read-write locks, and event groups.
- **Networking**: Provides a consistent socket API and network interface management tools.
- **Utilities**: Offers common functionality such as logging, UUID generation, timers, and RTOS-style queues.

By abstracting these core services, EtcPal allows developers to focus on their core application logic rather than the idiosyncrasies of specific operating system APIs or hardware-specific network stacks.
