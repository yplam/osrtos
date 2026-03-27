---
title: levelx
summary: LevelX is a specialized flash wear leveling library for embedded systems,
  providing management for both NAND and NOR flash memory. It presents a logical sector
  interface to applications while transparently managing physical flash constraints,
  ensuring even distribution of erase cycles and robust fault tolerance during power
  interruptions.
slug: eclipse-threadx-levelx
codeUrl: https://github.com/eclipse-threadx/levelx
star: 149
version: v6.5.0.202601_rel
lastUpdated: '2026-03-06'
licenses:
- MIT
libraryType: FileSystem
createdAt: '2025-12-29'
updatedAt: '2026-03-27'
---

### Features


- Support for both NAND and NOR flash memory types with specialized management modules.

- Wear leveling algorithms that distribute flash usage evenly to extend hardware longevity.

- Logical-to-physical sector mapping for transparent application and file system access.

- Fault-tolerant design using a multi-step update process to ensure recovery after power loss.

- Seamless integration with the FileX FAT-compatible file system for flash-based storage.

- Standalone mode support allowing operation without the ThreadX RTOS.

- Configurable NOR flash direct read option to bypass driver routines for higher performance.

- Extended cache support for NOR flash to improve sector access and mapping speeds.

- Logical sector mapping cache with configurable sizes to balance memory use and performance.

- Thread-safe operation through optional integration with ThreadX mutex objects.

- NAND flash metadata block management with configurable allocation limits.

- Free sector data verification logic to ensure NOR flash integrity during initialization.

- Mapping bitmap support in extended cache for efficient physical sector tracking.

- Obsolete count cache for NOR flash to optimize garbage collection and erase cycles.

- Customizable logical sector sizes for NOR flash to match specific application requirements.

- User-definable extensions for NAND and NOR flash control blocks for custom metadata.



LevelX acts as a middleware layer between an application (or file system like FileX) and the underlying flash hardware driver. Its primary responsibility is to manage the physical constraints of flash memory, specifically the finite number of erase cycles and the requirement to erase blocks before rewriting. It implements a logical-to-physical mapping system where the application sees a contiguous array of logical sectors, while LevelX manages their actual placement on the physical media.

The architecture is designed for robustness; flash updates are performed in discrete steps, allowing the system to recover to a consistent state if interrupted by power failure. It includes specific modules for NAND and NOR flash, reflecting their different operational characteristics, such as block-based versus word-based access and the handling of spare areas in NAND devices.

**Core Components**
- **NOR Management**: Handles word-aligned access, sector mapping, and optional extended caching mechanisms.
- **NAND Management**: Manages block-based access, spare area/metadata, and bad block management.
- **Mapping Layer**: Translates logical sector addresses to physical flash offsets using internal tables.
- **Cache Engine**: Provides optional sector mapping and data caching to reduce physical I/O overhead.
- **Driver Interface**: Standardized API for hardware-specific flash drivers to perform read, write, and erase operations.

### Use Cases
This library is ideal for:
- **Data Logging**: Systems requiring frequent writes to flash memory where wear leveling is critical to prevent premature hardware failure.
- **Embedded File Systems**: Providing a reliable backend for FileX or other FAT-based systems on raw NAND/NOR flash chips.
- **Fault-Tolerant Storage**: Applications operating in unstable power environments where data integrity during write operations is paramount.
- **Resource-Constrained Devices**: Deeply embedded systems needing a small-footprint wear leveling solution without the overhead of a full OS.

### Getting Started
To integrate LevelX, developers should first clone the repository recursively and include the `common` directory in their build system. Configuration is handled via the `lx_user.h` file (based on the provided `lx_user_sample.h`), where features like `LX_THREAD_SAFE_ENABLE` or `LX_STANDALONE_ENABLE` can be defined. For CMake-based projects, LevelX can be added using `add_subdirectory()` and linked against the application target. Detailed API documentation for NAND and NOR operations, including driver implementation requirements, can be found in the [official LevelX documentation](https://github.com/eclipse-threadx/rtos-docs/blob/main/rtos-docs/levelx/index.md).
