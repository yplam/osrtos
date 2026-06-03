---
title: 'RASPA: Realtime Audio Driver Access Library'
summary: A user-space C++ library for accessing low-latency realtime audio drivers
  on Elk Audio OS devices. It provides a unified interface for interacting with audio
  hardware through Xenomai Cobalt or EVL real-time frameworks.
slug: raspa-realtime-audio-driver-access-library
codeUrl: https://github.com/elk-audio/raspa
siteUrl: https://elk.audio/
star: 3
version: 1.2.0
lastUpdated: '2024-11-22'
rtos: xenomai
topics:
- audio
- driver
- elk
- elk-audio
- rtdm
- xenomai
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- elk-audio-rtdm-driver-for-raspberry-pi
- twine-thread-and-worker-interface-for-elk-audio-os
- rtdm-shift-register-driver-for-elk-pi
- urt-unified-interface-to-real-time-operating-systems
- simple-open-ethercat-master-library-rtnet-version
- real-time-spi-on-xenomai-3
---

## Overview

RASPA is a specialized user-space library developed by Elk Audio to facilitate high-performance audio processing on embedded devices. It serves as the primary interface for applications running on Elk Audio OS to communicate with underlying real-time audio drivers. By abstracting the complexities of the hardware-software boundary, RASPA allows developers to focus on audio processing logic while maintaining the strict timing requirements necessary for professional audio applications.

## Real-Time Architecture

The library is built to support the dual-kernel architecture typical of high-end real-time Linux systems. It specifically targets two major real-time frameworks:

- **Xenomai (Cobalt):** The traditional real-time co-kernel for Linux, providing deterministic response times by running a real-time core alongside the standard Linux kernel.
- **EVL:** The next-generation real-time core for Linux, which RASPA has supported since version 1.0.0. 

Through its CMake configuration, developers can toggle between these backends using the `RASPA_WITH_EVL` option. This flexibility ensures that RASPA remains compatible with both legacy Elk systems and modern implementations using the latest real-time advancements.

## Key Features and Capabilities

RASPA is more than just a simple wrapper; it includes several features tailored for embedded audio development:

- **Low-Latency Communication:** Optimized for minimal overhead when passing audio buffers between user-space applications and the kernel-space driver.
- **Sample Conversion:** Includes built-in utilities for linear int-float-int conversion across various formats, ensuring high-quality audio signal paths with robust clipping behavior.
- **CPU Pinning:** Supports pinning the main real-time thread to specific CPU cores, a critical requirement for avoiding jitter in multi-core embedded SoCs.
- **Mode Switch Detection:** In debug modes, the library can detect and signal when a thread inadvertently drops out of the real-time domain (a "mode switch"), which is essential for debugging audio glitches.

## Technical Implementation

The library is implemented in C++17 and is designed to be linked statically into audio applications. It utilizes a PIMPL (Pointer to Implementation) pattern to keep the public API clean and stable while hiding the complexities of the Xenomai or EVL-specific system calls. 

Its build system is integrated with CMake, allowing for easy cross-compilation—a necessity for targeting the ARM-based SoCs commonly found in Elk Audio hardware. The library also integrates with other Elk components, such as the `audio-control-protocol` and a custom FIFO implementation for thread-safe, lock-free data exchange.

## Usage in the Elk Ecosystem

RASPA is a foundational component of the Elk Audio OS. It is typically used by audio engines (like SUSHI) to pull and push audio samples to the hardware codecs. Because it handles the heavy lifting of real-time synchronization and buffer management, it enables the creation of embedded audio products—such as synthesizers, effects processors, and digital mixers—that achieve the same latency performance as dedicated hardware DSPs.
