---
title: Eclipse ThreadX FileX
slug: filex
summary: Eclipse ThreadX FileX is a high-performance, FAT-compatible file system designed
  specifically for deeply embedded applications requiring a small memory footprint
  and high execution speed. It supports FAT12, FAT16, FAT32, and exFAT formats and
  is fully integrated with the ThreadX RTOS to provide deterministic file management
  across various physical media including RAM, SD cards, and flash memory.
codeUrl: https://github.com/eclipse-threadx/filex
star: 61
version: v6.5.0.202601_rel
lastUpdated: '2026-03-06'
components:
- FileSystem
- Storage
- USBHost
- USBDevice
- OTA
platforms:
- ARM
- ARM Cortex-M
- ARM Cortex-A
- ARM Cortex-R
- ARM7
- ARM9
- ARM11
- RISC-V
- Xtensa
- x86
- MIPS
- MIPS32
- MIPS64
- PowerPC
- ColdFire
- PIC
- dsPIC
- TriCore
- RX
- V850
- H8
- Microblaze
- Nios II
- Arc
- ARC EM
- ARC HS
- C6000
- POSIX
- Windows
licenses:
- MIT
libraryType: FileSystem
createdAt: '2025-09-29'
updatedAt: '2026-04-07'
---

### Features


- Support for FAT12, FAT16, and FAT32 file allocation table formats for broad compatibility.

- Support for the exFAT (Extended File Allocation Table) format for large files and high-capacity storage.

- Small footprint design requiring as little as 6 KB of instruction area and 1.5 KB of RAM.

- Full integration with Eclipse ThreadX RTOS for multi-threaded access and synchronization.

- Support for long file names (LFN) and comprehensive directory management.

- Fault tolerance and data integrity features to protect against power failures or unexpected media removal.

- Integration with LevelX for wear leveling and bad block management on NAND and NOR flash memories.

- Integration with USBX for managing USB mass storage devices via host or OTG interfaces.

- Architecture-independent core with optimized ports for various 32-bit and 64-bit processors.

- Support for multiple physical media including RAM disks, SD cards, MMC, and flash.

- Configurable sector cache to optimize performance based on available system resources.

- Deterministic execution times for file system operations to meet real-time requirements.

- User-notification callbacks for media and file operations to enable event-driven programming.

- Composable CMake-based build system for modular integration into existing projects.

- Support for contiguous file allocation to improve read/write performance on physical media.



### Architecture

Eclipse ThreadX FileX is designed with a layered, modular architecture that prioritizes performance and a small footprint. The core of the library is architecture-independent, written in C, which handles the logic for FAT12, FAT16, FAT32, and exFAT file systems. This core interacts with physical media through a standardized media driver interface, allowing developers to easily port FileX to custom hardware by implementing a simple set of read, write, and status functions.

FileX is deeply integrated with the ThreadX RTOS, utilizing its internal primitives for thread synchronization and mutual exclusion. This ensures that multiple threads can safely access the file system concurrently. The architecture also supports optional modules such as LevelX for flash memory wear leveling and USBX for USB mass storage. A key architectural feature is the configurable sector cache, which allows the system to trade RAM for performance by caching frequently accessed sectors, thereby reducing the number of physical I/O operations.

#### Core Components
- **FileX API**: Provides a consistent, noun-verb naming convention (e.g., `fx_file_read`) for application interaction.
- **FAT Management**: Handles the File Allocation Table logic for various FAT versions.
- **Directory Engine**: Manages directory entries, including long file name support.
- **Media Driver Interface**: A standardized abstraction layer for physical storage hardware.
- **Fault Tolerance Module**: An optional layer that ensures file system consistency during power loss.

### Use Cases

This library is ideal for:

- **Industrial IoT**: Managing log files and configuration data on SD cards or flash memory in remote sensors.
- **Medical Devices**: Storing patient data and device logs with high reliability and fault tolerance requirements.
- **Consumer Electronics**: Powering file management for digital cameras, portable media players, and wearables.
- **Automotive Systems**: Handling firmware updates and diagnostic data storage in ECUs and infotainment units.
- **Data Loggers**: High-speed, contiguous file writing for high-frequency sensor data acquisition.
- **USB Storage Devices**: Implementing USB mass storage class functionality in conjunction with USBX.

### Getting Started

To get started with Eclipse ThreadX FileX, developers should first ensure they have a working ThreadX RTOS environment. The library uses a CMake-based build system, making it easy to integrate into modern development workflows. The primary configuration is handled via the `fx_user.h` header file, where features like exFAT support, long file names, and fault tolerance can be enabled or disabled to optimize the footprint. 

Developers can build FileX as a static library using the Arm GNU Toolchain or integrate it directly into their IDE (such as STM32CubeIDE, MCUXpresso, or IAR) using semiconductor-specific SDKs. Detailed documentation for the API and media driver implementation can be found in the [official Eclipse ThreadX documentation](https://github.com/eclipse-threadx/rtos-docs/blob/main/rtos-docs/filex/index.md).
