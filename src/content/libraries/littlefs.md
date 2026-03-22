---
title: littlefs
slug: littlefs
summary: littlefs is a fail-safe filesystem specifically designed for microcontrollers
  with limited resources, featuring power-loss resilience and dynamic wear leveling.
  It employs a unique two-layer architecture combining metadata logs and copy-on-write
  structures to ensure data integrity and minimize flash wear while maintaining a
  strictly bounded memory footprint.
codeUrl: https://github.com/geky/littlefs
siteUrl: https://github.com/geky/littlefs
star: 6508
version: v2.11.2
lastUpdated: '2025-09-29'
components:
- FileSystem
- Storage
platforms:
- ARM
- ARM Cortex-M
- Xtensa
- Linux
- POSIX
licenses:
- BSD 3-Clause
libraryType: FileSystem
createdAt: '2025-09-29'
updatedAt: '2026-03-22'
---

### Features


- Power-loss resilience with strong copy-on-write guarantees for all file operations.

- Dynamic wear leveling across flash blocks to extend storage lifespan.

- Bad block detection and automatic workaround capabilities for NAND/NOR flash.

- Strictly bounded RAM and ROM usage that remains constant regardless of filesystem size.

- Elimination of unbounded recursion to prevent stack overflow in constrained environments.

- Configurable, potentially static buffers to avoid dynamic memory allocation.

- Full POSIX-like API for file and directory management.

- Atomic POSIX operations including file removal and renaming.

- Metadata stored in small logs called metadata pairs for efficient, low-latency updates.

- File data stored in copy-on-write structures to prevent wear amplification.

- C99 compliant source code for maximum portability across embedded compilers.

- Support for multiple simultaneous filesystem instances via user-allocated state structures.

- Data integrity verification through read-back checks during write operations.

- Customizable block device interface for read, program, erase, and sync operations.

- Support for custom error codes returned from underlying block device drivers.

- Integrated test suite for PC/Linux environments using emulated block devices.



### Architecture

littlefs is architected as a block-based filesystem utilizing a "two-layered cake" design to balance performance and reliability. The first layer consists of metadata pairs, which are small logs used to store directory information and file metadata. These logs allow for fast, frequent updates to metadata anywhere on the storage medium without requiring large-scale erases. The second layer uses larger copy-on-write (COW) structures to store actual file data, ensuring that data is stored compactly and that updates do not cause unnecessary wear amplification.

At the core of the system is a common block allocator that services both metadata and data structures. This allocator implements dynamic wear leveling by tracking and limiting the number of erases allowed on a block per allocation cycle. The system is designed to be entirely reentrant and supports multiple instances by requiring the user to provide the state storage (`lfs_t`) and configuration (`lfs_config`). This design ensures that RAM usage is strictly bounded and predictable, as the filesystem does not use recursion or unbounded dynamic memory allocation.

### Use Cases

This library is ideal for:

- **IoT Edge Devices**: Systems requiring high reliability during unpredictable power cycles or battery failures.
- **Data Logging**: Applications that need to write data frequently to flash while maximizing the lifespan of the hardware through wear leveling.
- **Embedded Firmware Storage**: Storing system configurations and firmware images where corruption could lead to device bricking.
- **Resource-Constrained MCUs**: Microcontrollers with very limited RAM (e.g., <10KB) where a traditional filesystem would be too heavy.
- **NAND/NOR Flash Management**: Devices using raw flash chips that require manual bad block management and wear leveling.

### Getting Started

To integrate littlefs, developers must first define a `lfs_config` structure that specifies the block device dimensions (read size, program size, block size, and count) and provides function pointers for the hardware-specific `read`, `prog`, `erase`, and `sync` operations. Once the configuration is defined, the filesystem can be initialized using `lfs_mount`. If the mount fails (common on first boot), `lfs_format` can be called to create a fresh filesystem. 

Detailed API documentation is located within the `lfs.h` header file. For developers looking to port the library, the `DESIGN.md` and `SPEC.md` files in the repository provide deep dives into the on-disk format and architectural tradeoffs. Testing can be performed on a development PC using the provided emulated block device and the Python-based test runner found in the `scripts` directory.
