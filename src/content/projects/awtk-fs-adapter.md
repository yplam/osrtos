---
title: awtk-fs-adapter
summary: AWTK File System Adapter provides a unified interface for integrating various
  file systems like FATFS and SPIFFS into the AWTK (Toolkit AnyWhere) framework. It
  bridges the gap between embedded file system implementations and AWTK's file system
  API, supporting both single-threaded and multi-threaded environments.
codeUrl: https://github.com/zlgopen/awtk-fs-adapter
isShow: false
rtos: rt-thread
libraries:
- awtk
- spiffs
topics:
- awtk
- fatfs
- spiffs
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- oofatfs-object-oriented-fatfs
- pico-vfs-a-virtual-file-system-for-raspberry-pi-pico
- stm32-fatfs-and-freertos-integration
- arduino-littlefs-spimemory-wrapper
- esp32-fatfs-image-tool-and-example
- ff-iso-stm32-multitasking-fatfs-sdio
---

### Bridging the Gap in Embedded File Systems

In the world of embedded development, the Toolkit AnyWhere (AWTK) provides a powerful framework for building cross-platform GUIs. However, embedded platforms often lack a standard POSIX-compatible file system API. This is where **awtk-fs-adapter** comes in. It acts as a middleware layer that wraps common embedded file system implementations into the standard AWTK file system interface, ensuring that your GUI application can seamlessly access files regardless of the underlying storage technology.

### Supported File Systems

The adapter currently provides out-of-the-box support for several popular file systems used in the embedded industry:

*   **FATFS**: Primarily used for accessing external storage like TF/SD cards.
*   **SPIFFS**: Optimized for Nor Flash memory, providing wear leveling and file system capabilities on raw flash chips.
*   **POSIX**: A compatibility layer designed to work with systems like RT-Thread's Device File System (DFS) interface.

### Technical Architecture and Configuration

The project is structured to be modular. Each file system has its own implementation file (e.g., `fs_os_fatfs.c`, `fs_os_spiffs.c`), which maps the specific library calls to the generic AWTK FS API. 

One of the critical features for modern embedded applications is multi-threading support. By defining the `WITH_FS_MT` macro and including `src/fs_mt.c` in your build, the adapter becomes thread-safe, allowing multiple tasks to interact with the file system without corruption.

Configuration is centralized in `src/fs_os_conf.h`. Developers can define specific paths for user data and temporary directories here, which is essential when working with constrained environments where storage might be partitioned across different physical media.

### Getting Started and Compilation

The project supports both PC-based functional testing and direct integration into embedded firmware projects.

#### PC Compilation for Testing
To test the functionality on a PC, you first need to compile the main AWTK library:

```bash
git clone https://github.com/zlgopen/awtk.git
cd awtk; scons; cd -
```

Then, you can compile the adapter:

```bash
git clone https://github.com/zlgopen/awtk-fs-adapter.git
cd awtk-fs-adapter; scons
```

#### Embedded Integration
For embedded systems, integration is straightforward: simply add the relevant source files from the `src` directory into your project's build system (such as Keil, IAR, or a Makefile). If you are using SPIFFS on a specific hardware platform, the repository even includes implementation demos like `src/impl_demo/spiffs_PZ6806L.c` to serve as a reference.

### Why Use awtk-fs-adapter?

By using this adapter, developers can write their AWTK application code using standard file operations without worrying about whether the data is stored on a SPI Flash chip or an SD card. This abstraction significantly improves code portability and reduces the time spent on hardware-specific file system integration.
