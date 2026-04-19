---
title: reliance-edge
summary: Reliance Edge is a small, portable, and power-fail safe file system designed
  specifically for resource-constrained embedded systems such as microcontrollers.
  It utilizes a unique transactional model to ensure data integrity during sudden
  power loss and provides both a POSIX-compliant API and a minimalist File System
  Essentials (FSE) API.
slug: tuxera-reliance-edge
codeUrl: https://github.com/tuxera/reliance-edge
siteUrl: https://www.tuxera.com/products/tuxera-edge-fs/
star: 118
version: v2.6
lastUpdated: '2026-04-17'
licenses:
- GPL-2.0
- Commercial
libraryType: FileSystem
createdAt: '2026-01-04'
updatedAt: '2026-04-19'
---

### Features


- Transactional model ensuring atomic 'all or nothing' updates to prevent file system corruption.

- Power-fail safety that eliminates the need for fsck or CHKDSK utilities after a crash.

- Dual API support featuring a familiar POSIX-like interface and a minimalist File System Essentials (FSE) API.

- Small memory footprint typically requiring 4 KB to 5 KB of RAM and 11 KB to 18 KB of code space.

- Highly configurable architecture allowing tuning of block sizes, buffer counts, and feature sets via a configuration utility.

- Support for 32-bit microcontrollers and integration with RTOSs like FreeRTOS, SafeRTOS, INTEGRITY, and MQX.

- POSIX ownership and permissions support, including UID, GID, and mode bits (read, write, execute).

- Symbolic link support with path resolution and dedicated APIs like red_symlink() and red_readlink().

- Ability to unlink open files, where the underlying inode is preserved until the last file descriptor is closed.

- Efficient path parsing using 'at' APIs (e.g., red_openat) to operate relative to directory file descriptors.

- Configurable block buffer cache with support for DMA-aligned memory transfers.

- Automatic run-time detection of storage media geometry including sector count and sector size.

- Support for multiple volumes with independent configurations and path prefixes.

- Optional discard (TRIM) support to improve performance and longevity on flash-based storage media.

- Task-specific errno and current working directory storage with dynamic task registration.

- Pre-allocation support via red_freserve() to ensure disk space for upcoming sequential writes.



Reliance Edge is designed with a layered architecture that prioritizes reliability and portability. At its core is a transactional engine that manages data updates using a copy-on-write-like mechanism, ensuring that the file system is always in a consistent state on disk. The architecture is divided into the core file system logic, a POSIX translation layer, and an OS Abstraction Layer (OSAL). The OSAL allows the file system to be ported to various RTOS environments or even bare-metal systems by implementing a set of service functions for threading, time, and block device I/O.

Configuration is a central pillar of the architecture; users utilize a Configuration Utility to generate `redconf.c` and `redconf.h` files. These files define volume parameters, buffer cache sizes, and enabled features, allowing the binary to be stripped of unnecessary code to meet strict ROM/RAM requirements. The block device interface (bdev) provides a standardized way for the core to communicate with different storage media, such as NOR/NAND flash, SD cards, or RAM disks.

**Core Components**
- **Transactional Core**: Manages the metaroot and atomic commit process.
- **POSIX Layer**: Provides standard file operations like `open()`, `read()`, `write()`, and `stat()`.
- **FSE (File System Essentials)**: A minimalist API for applications with extremely limited resources.
- **OSAL (OS Abstraction Layer)**: Interfaces with the underlying RTOS for task management and timing.
- **Block Device Interface**: Handles low-level sector I/O and optional discard commands.

### Use Cases

This library is ideal for:

- **Industrial IoT Controllers**: Reliable data logging and configuration storage in environments where power stability cannot be guaranteed.
- **Medical Devices**: Ensuring critical patient data or device logs are never corrupted during unexpected shutdowns or battery failures.
- **Automotive ECUs**: Storing firmware images and diagnostic data on microcontrollers with limited flash and RAM.
- **Consumer Electronics**: Managing small-scale storage on wearables or smart home sensors that require a POSIX-like interface without the overhead of a full OS.

### Getting Started

To get started with Reliance Edge, you must first port the library to your specific hardware and RTOS. This involves implementing the functions found in the `os/` directory; a blank template is provided in `os/stub/`. Once the porting layer is ready, use the Reliance Edge Configuration Utility to create your `redconf.h` and `redconf.c` files, which define your volume and cache settings. In your application, include `include/redposix.h` (for the POSIX API) or `include/redfse.h` (for the minimalist API), and initialize the driver using `red_init()` or `RedFseInit()`. Detailed instructions are available in the [Reliance Edge README](https://github.com/tuxera/reliance-edge/blob/main/README.md) and the [Quick Start Guide](https://github.com/tuxera/reliance-edge/blob/main/doc/quick_start.md).
