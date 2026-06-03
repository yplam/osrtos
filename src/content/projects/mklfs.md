---
title: mklfs
summary: A command-line utility for creating LittleFS filesystem images from a local
  directory. It allows embedded developers to pre-populate flash images with files
  and configurations for deployment on microcontrollers.
slug: mklfs
codeUrl: https://github.com/xingrz/mklfs
star: 5
version: v1.0.0
lastUpdated: '2021-11-05'
rtos: ''
libraries:
- littlefs
topics:
- lfs
- littlefs
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- esp32-fatfs-image-tool-and-example
- littlefs-python
- littlefs-disk-image-viewer
- littlefs-explorer-for-windows
- esp32-spiffs-image-generation-example
- fileferry-click2flash
---

# mklfs: LittleFS Image Creation Tool

`mklfs` is a specialized command-line utility designed to generate LittleFS (littlefs) filesystem images from a source directory on a host computer. This tool is essential for embedded developers who need to pre-load data, configuration files, or assets into a device's flash memory during the manufacturing or firmware flashing process.

Originally based on the implementation found in the Lua-RTOS-ESP32 project, `mklfs` provides a standalone way to package files into a format that the LittleFS filesystem can understand and mount on target hardware. By using the actual LittleFS source code internally, it ensures that the generated binary images are fully compatible with the filesystem driver running on the embedded device.

## Why Use mklfs?

In many embedded applications, the filesystem isn't just for runtime data storage; it often contains initial web assets, certificates, or default configuration files. Manually writing these files via a serial console or custom protocol is inefficient. `mklfs` allows developers to:

- Prepare a complete filesystem structure on a development machine.
- Convert that structure into a single binary blob.
- Flash that blob directly to a specific partition on the target MCU's flash memory.

## Technical Capabilities

The tool integrates the core `littlefs` source code to ensure that the generated images are perfectly compatible with the filesystem driver running on the embedded device. It supports a variety of configuration options to match the specific hardware characteristics of the target flash memory, such as:

- **Read and Program Sizes**: Define the minimum units for reading and programming (defaulting to 16 bytes).
- **Block Size**: Configure the size of an erasable block (defaulting to 4096 bytes, common for SPI flash).
- **Cache and Lookahead**: Fine-tune the memory usage and performance characteristics of the filesystem metadata.

## Usage and Integration

The tool is invoked via the command line, taking a source directory, a target image filename, and the total size of the filesystem to be created.

```bash
mklfs [options] DIRECTORY IMAGE SIZE
```

For example, to create a 1MB image from a folder named `data` with specific block parameters:
```bash
mklfs -b 4096 -p 256 -r 256 data storage.bin 1048576
```

## Build System and Portability

`mklfs` is built using CMake and is designed to be cross-platform. It supports Windows, macOS, and Linux, making it easy to integrate into automated CI/CD pipelines or local build scripts (like those using Ninja or Make). The build process is straightforward, requiring only a C compiler and CMake. This portability ensures that developers can generate filesystem images regardless of their host operating system, which is particularly useful for teams working in heterogeneous environments.
