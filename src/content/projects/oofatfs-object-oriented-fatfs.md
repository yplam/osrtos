---
title: ooFatFs - Object Oriented FatFs
summary: An object-oriented modification of ChaN's FatFs Generic FAT File System Module.
  It enables the creation of multiple independent FAT filesystems by ensuring all
  functions take a pointer to the filesystem state as their first argument, facilitating
  integration with diverse drivers and filesystem types.
slug: oofatfs-object-oriented-fatfs
codeUrl: https://github.com/micropython/oofatfs
siteUrl: http://elm-chan.org/fsw/ff/00index_e.html
star: 23
version: R0.13
lastUpdated: '2019-02-11'
rtos: ''
libraries:
- micropython
topics:
- embedded
- fatfs
- filesystem
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- awtk-fs-adapter
- pico-vfs-a-virtual-file-system-for-raspberry-pi-pico
- esp32-spiffs-with-directory-support-example
- ff-iso-stm32-multitasking-fatfs-sdio
- stm32-fatfs-and-freertos-integration
- littlefs2-idiomatic-rust-api-for-littlefs
---

## Overview

ooFatFs is a specialized, object-oriented version of the widely used FatFs Generic FAT File System Module originally developed by ChaN. While the original FatFs is the industry standard for implementing FAT filesystems on microcontrollers, this version introduces structural changes to make the library more flexible for complex embedded systems. 

Maintained by the MicroPython project, ooFatFs serves as a critical middleware component that allows developers to manage multiple, independent FAT filesystems simultaneously. This is particularly useful in modern embedded applications where a device might need to interface with several storage media, such as an internal SPI flash chip and an external SD card, at the same time.

## The Object-Oriented Approach

The primary modification in ooFatFs is the transformation of the API into an "object-oriented" style. In the standard FatFs implementation, state management can sometimes rely on global variables or static configurations that limit the ability to run multiple instances cleanly. 

In ooFatFs, every function has been modified to take a pointer to the filesystem state (or a file/directory structure that points back to that state) as its first argument. This architectural shift decouples the logic from the state, allowing the driver to be combined easily with other filesystem types or multiple instances of the FAT driver without namespace or state collisions.

## Technical Implementation and Maintenance

The project follows a disciplined maintenance strategy to ensure it stays up to date with the upstream "vendor" releases from ChaN. The repository structure includes:

- **Vendor Branches**: These contain the original, unmodified sources from Elm-Chan, tagged with the specific release version (e.g., R0.11a).
- **Working Branches**: These branches apply the object-oriented patches and Unix-style formatting (line endings, tab expansion) to the vendor code.
- **Conflict Resolution**: As new versions of FatFs are released, the patches are reapplied to the newer vendor tags, ensuring that ooFatFs benefits from the latest bug fixes and performance improvements of the original module.

## Integration and Use Cases

ooFatFs is a core component of the MicroPython ecosystem, providing the underlying filesystem logic for many ports. However, its design makes it equally suitable for any C-based embedded project that requires a robust, reentrant, and multi-instance FAT implementation.

Because it abstracts the filesystem state, it is an excellent choice for systems using an abstraction layer (like a Virtual File System or VFS). Developers can register multiple ooFatFs instances under different mount points, allowing for seamless file operations across different physical hardware devices using a unified API.
