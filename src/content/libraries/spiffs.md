---
title: SPIFFS
slug: spiffs
summary: SPIFFS is a lightweight, heap-less file system designed for SPI NOR flash
  devices on resource-constrained embedded targets. It provides a POSIX-like API for
  flat file structures while implementing static wear leveling and garbage collection
  to maximize flash longevity and performance.
codeUrl: https://github.com/pellepl/spiffs
siteUrl: https://github.com/pellepl/spiffs
star: 1611
version: 0.3.7
lastUpdated: '2026-02-10'
components:
- FileSystem
- Storage
- Shell
- Profiling
platforms:
- Xtensa
- POSIX
- Linux
- Windows
- Native
- ARM Cortex-M
licenses:
- MIT
libraryType: FileSystem
createdAt: '2023-12-02'
updatedAt: '2026-04-07'
---

### Features


- Designed for low RAM usage on small embedded targets without dynamic memory allocation (heap).

- Uses statically sized RAM buffers that remain independent of the number of files present.

- Provides a POSIX-like API including open, close, read, write, seek, and stat functions.

- Compatible with any NOR flash, including SPI flash and internal microprocessor flash.

- Supports multiple SPIFFS configurations running concurrently on the same target or flash device.

- Implements static wear leveling to prolong the life of flash memory by distributing erase cycles.

- Includes built-in file system consistency checks to ensure data integrity after power loss.

- Highly configurable through compile-time defines to adjust page/block sizes and features.

- Supports optional file metadata for storing additional information alongside files.

- Features index memory mapping to improve file reading performance and determinism.

- Includes a temporal cache system to speed up file opening operations by caching file descriptors.

- Offers a read-only build configuration to minimize the library's binary footprint.

- Provides both quick (non-intrusive) and full-scale (intrusive) garbage collection mechanisms.

- Supports a flat file structure without directory support to minimize metadata overhead.

- Includes API functions for file system formatting and retrieving usage information.

- Allows for file renaming and explicit error code clearing via SPIFFS_clearerr.

- Supports singleton mode to optimize performance and RAM when only one instance is used.

- Configurable garbage collection heuristics to tune wear-leveling behavior.

- Provides a HAL layer requiring only three basic functions: read, write, and erase.



### Architecture

SPIFFS operates on a logical abstraction layer over physical NOR flash memory. It divides the flash into logical blocks, which are further subdivided into logical pages. A logical page is the smallest unit of data storage and metadata tracking. The system is designed to be entirely heap-less, relying on user-provided static buffers for work areas, file descriptors, and optional caches. This design ensures deterministic memory usage, which is critical for small embedded systems.

The file system utilizes a flat structure where filenames can include slashes to simulate paths, but no actual directory hierarchy exists. This minimizes the metadata overhead required for navigation. The architecture includes a Hardware Abstraction Layer (HAL) that requires only three primitive operations from the user: read, write, and erase. Internally, SPIFFS manages an object index to track file locations and a garbage collector that reclaims space from deleted or modified files while maintaining wear leveling across the flash blocks.

#### Core Components
- **HAL Interface**: The bridge between SPIFFS and physical flash hardware, handling address-based read, write, and erase calls.
- **Object Indexer**: Manages file metadata, including names, sizes, and the mapping of logical pages to physical locations.
- **Garbage Collector**: Implements heuristics to select blocks for erasure, balancing free space reclamation with wear leveling.
- **Cache Subsystem**: Provides optional read/write caching and a temporal file descriptor cache to improve performance on frequently accessed files.
- **Consistency Checker**: A built-in tool to verify the integrity of the file system structure and repair common issues caused by unexpected power loss.

### Use Cases

This library is ideal for:
- **IoT Sensors**: Storing periodic sensor readings on small SPI flash chips where RAM is extremely limited.
- **Configuration Management**: Saving and updating device settings, calibration data, and network credentials in non-volatile memory.
- **Bootloaders**: Utilizing the read-only mode to load firmware images from flash while maintaining a minimal binary footprint.
- **Data Logging**: Efficiently appending logs to files with wear leveling to prevent premature failure of specific flash sectors.
- **Embedded Web Servers**: Storing static assets like HTML, CSS, and JavaScript files for local device management dashboards.
- **Resource Storage**: Storing UI assets, fonts, or lookup tables for microcontrollers driving small displays.

### Getting Started

To integrate SPIFFS into an embedded project, begin by copying the source files from the `src/` directory and the `spiffs_config.h` template into your build system. You must define basic integer types (e.g., `u32_t`, `s32_t`) in the configuration header to match your architecture. The integration requires implementing three HAL functions for your specific flash hardware: `read`, `write`, and `erase`. 

Once the HAL is ready, initialize a `spiffs_config` struct with the physical parameters of your flash (start address, total size, and block sizes) and provide the necessary static RAM buffers for the work area and file descriptors. Call `SPIFFS_mount` to initialize the system. If the flash is unformatted or contains invalid data, `SPIFFS_format` must be called before a successful mount can occur. For detailed configuration options and performance tuning, refer to the [SPIFFS Wiki](https://github.com/pellepl/spiffs/wiki).
