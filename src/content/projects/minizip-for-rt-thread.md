---
title: minizip for RT-Thread
summary: A zip manipulation library for RT-Thread based on the official zlib implementation.
  It provides APIs and shell commands for compressing and decompressing files in the
  ZIP format on embedded systems, requiring approximately 300KB of RAM for operations.
slug: minizip-for-rt-thread
codeUrl: https://github.com/mysterywolf/minizip
siteUrl: http://www.winimage.com/zLibDll/minizip.html
star: 12
lastUpdated: '2023-07-27'
rtos: rt-thread
topics:
- minizip
- rt-thread
- zip
- zlib
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- zlib-compression-and-decompression-for-esp-idf
- esp32-targz
- cozy
- rtt-validator
- c-crc-for-rt-thread
- termbox-for-rt-thread
---

## Overview

minizip for RT-Thread is an embedded port of the popular minizip library, which is officially recognized by the zlib project. This package enables RT-Thread users to handle ZIP file compression and decompression directly on their embedded devices. It serves as a middleware layer that leverages the zlib compression engine to provide a higher-level interface for managing archive files.

## Core Functionality and Shell Commands

The library provides two primary sets of functionality, accessible both through C APIs and RT-Thread shell (FinSH) commands:

### 1. Compression (minizip)
The `minizip` command allows users to compress multiple files into a single ZIP archive. It supports various compression levels (0 for storage only, 1 for speed, and 9 for maximum compression) and optional password protection. 

```shell
Usage : minizip [-o] [-a] [-0 to -9] [-p password] file.zip [files_to_add]
```

### 2. Decompression (miniunz)
The `miniunz` command handles the extraction of ZIP archives. It includes features for listing archive contents, extracting with or without pathnames, overwriting existing files, and decrypting password-protected archives.

```shell
Usage : miniunz [-e] [-x] [-v] [-l] [-o] [-p password] file.zip [file_to_extr.] [-d extractdir]
```

## Technical Architecture

The project is structured into several key components that manage different aspects of the ZIP format:
- **zip.c/h**: Implements the logic for creating archives and adding files.
- **unzip.c/h**: Handles the parsing and extraction of ZIP files.
- **ioapi.c/h**: Provides an I/O abstraction layer, allowing the library to interface with RT-Thread's file system (DFS) or other storage mediums.
- **crypt.h**: Contains the logic for PKZip-compatible encryption.

## Memory Considerations

One of the most critical aspects of using minizip in an embedded environment is its memory footprint. While simply listing the contents of a ZIP file is memory-efficient, the actual compression and decompression processes are resource-intensive. 

Users should be aware that these operations require at least 300KB of free RAM. Because of this requirement, it is highly recommended to use this package on development boards equipped with external SRAM. Attempting to run compression on memory-constrained microcontrollers without sufficient heap space will likely result in allocation failures.

## Integration with RT-Thread

As a native RT-Thread package, minizip integrates seamlessly into the RT-Thread ecosystem. It uses the `SConscript` build system and can be easily added to a project via the RT-Thread online package manager under the `miscellaneous package` category. This integration ensures that the library correctly links against the required zlib dependency and utilizes the system's standard I/O interfaces.
