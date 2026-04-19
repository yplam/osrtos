---
title: eefs
slug: eefs
summary: The EEPROM File System (EEFS) is a lightweight, non-block oriented file system
  designed specifically for memory devices such as EEPROM, RAM, and ROM. It provides
  a simple, deterministic API for embedded systems, supporting standalone operation,
  integration with RTOSs like vxWorks and RTEMS, and host-side image generation for
  target deployment.
codeUrl: https://github.com/nasa/eefs
siteUrl: https://github.com/nasa/eefs
star: 287
version: eefs-2.0
lastUpdated: '2014-04-23'
components:
- FileSystem
- Bootloader
- Storage
platforms:
- POSIX
- Native
- ARM
- PowerPC
- SPARC
licenses:
- Unknown
libraryType: FileSystem
createdAt: '2014-04-23'
updatedAt: '2026-04-19'
---

### Features


- Optimized for byte-addressable memory devices including EEPROM, RAM, and ROM

- Non-block oriented design eliminates the overhead of disk-based file system structures

- Provides a standalone API for embedded systems operating without an OS

- Includes dedicated drivers for the RTEMS real-time operating system

- Includes dedicated drivers for the vxWorks real-time operating system

- Features a 'microeefs' interface for minimal-code file lookups in bootloaders

- Supports host-side image creation to generate burnable memory images

- Enables bootloaders to locate system images by filename with minimal footprint

- Simple architecture designed for easy debugging, memory dumping, and inspection

- Supports multiple simultaneous volumes across different memory types (RAM/EEPROM)

- Contiguous file storage allows for direct memory mapping and execution

- Deterministic access times suitable for hard real-time applications

- Minimal RAM and ROM footprint for resource-constrained environments

- Facilitates easy porting to new hardware platforms and operating systems



### Architecture

The EEPROM File System (EEFS) is architected as a flat, lightweight file system specifically tailored for memory-mapped devices. Unlike traditional file systems that manage blocks on a disk, EEFS treats the storage medium as a linear array of bytes. This design choice simplifies the implementation significantly, making it ideal for devices like EEPROM and SRAM where wear-leveling and complex block management are often unnecessary or handled at a different layer.

The system is structured into three primary layers: the **Core API**, the **RTOS Abstraction Layer**, and the **Host Utilities**. The Core API handles the internal logic of file lookups and data retrieval. The RTOS Abstraction Layer provides the necessary glue code to integrate EEFS into the standard I/O systems of vxWorks and RTEMS. For extremely constrained environments, the **MicroEEFS** component provides a stripped-down interface that allows a bootloader to find a file's starting address and size using only a few hundred bytes of code.

#### Core Components
- **EEFS Core**: Manages the file system header and file allocation table (FAT) structures within the memory image.
- **MicroEEFS**: A minimalist lookup engine designed for primary bootloaders.
- **RTOS Drivers**: Integration modules for vxWorks and RTEMS file system frameworks.
- **Host Image Builder**: A utility that runs on a development machine (Linux/Windows) to pack files into a binary image for the target.

### Use Cases

This library is ideal for:

- **Bootloaders**: Locating and loading compressed kernel images or application binaries from EEPROM during the boot sequence.
- **Configuration Management**: Storing system parameters, calibration data, and lookup tables in non-volatile RAM (NVRAM).
- **OS-less Systems**: Providing basic file-like access to data on small microcontrollers that do not require a full RTOS.
- **Flight Software**: Serving as a reliable, simple storage mechanism for space-grade hardware where transparency and ease of debugging are critical.
- **Read-Only Media**: Managing data on ROM or Flash devices where the file set is static and requires fast, direct-access performance.

### Getting Started

To begin using EEFS, developers typically start by using the host-side tools to define a file system layout and populate it with initial files. The host utility generates a binary image that can be burned directly into the target's EEPROM or ROM. On the target side, the developer must initialize the EEFS library by providing the base memory address of the image. For systems using vxWorks or RTEMS, the provided drivers allow the EEFS volume to be mounted like any other disk device, enabling standard `open()`, `read()`, and `close()` operations. For standalone systems, the EEFS API can be called directly to access file data without the overhead of a virtual file system (VFS) layer.
