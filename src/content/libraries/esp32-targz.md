---
title: 🗜️ ESP32-targz
slug: esp32-targz
summary: ESP32-targz is a comprehensive Arduino-compatible library for ESP32, ESP8266,
  and RP2040 microcontrollers designed to manage .tar, .gz, and .tar.gz archives.
  It facilitates bi-directional data flow between various filesystems and compressed
  streams, enabling advanced features like direct firmware updates from compressed
  archives and low-memory archive extraction.
codeUrl: https://github.com/tobozo/ESP32-targz
siteUrl: https://github.com/tobozo/ESP32-targz
star: 144
version: v1.3.1
lastUpdated: '2026-01-29'
components:
- FileSystem
- Storage
- OTA
- Network
- HTTP
- HTTPS
- UDP
- CAN
platforms:
- Xtensa
- ARM Cortex-M
libraryType: Middleware
createdAt: '2025-12-27'
updatedAt: '2026-03-22'
---

### Features


- Compress files and folders directly to .tar.gz format on-device

- Decompress files from .tar.gz archives to various local filesystems

- Standalone Gzip compression and decompression for data streams and buffers

- Packing and unpacking of .tar archives with a minimal 512-byte memory footprint

- Integration with standard Arduino fs::FS filesystems including LittleFS, SPIFFS, and SD

- Support for data streaming from network protocols like HTTP, HTTPS, UDP, and Ethernet

- Direct ESP32 firmware flashing from .gz or .tar.gz streams without intermediate storage

- Configurable Gzip dictionary to save approximately 36KB of RAM during decompression

- Progress callbacks for monitoring decompression, packing, and update operations

- Health check and verification mechanisms for .tar file integrity

- Compile-time destination filesystem selection via macros for optimized resource usage

- Support for multiple input sources including buffers, files, and network streams

- Recursive folder packing and compression capabilities

- Error reporting with specific return codes for filesystem, Gzip, and OTA update failures

- Buffer-to-buffer and stream-to-stream compression signatures for flexible data handling

- Support for Xtensa (ESP32/ESP8266) and ARM Cortex-M (RP2040) architectures



ESP32-targz is architected as a high-level wrapper around the `uzlib` and `TinyUntar` libraries, specifically optimized for resource-constrained microcontrollers. The library follows an object-oriented design, providing specialized classes for different archive formats: `GzUnpacker` for Gzip, `TarUnpacker` for Tar, and `TarGzUnpacker` for combined archives. These classes abstract the complexities of stream handling and filesystem interaction, allowing developers to treat compressed data as standard Arduino Streams.

The library's core logic revolves around "channeling" data. It can pipe data from an input (Filesystem or Stream) through a decompression engine and directly into an output (Filesystem, Stream, or the ESP32 Update partition). This streaming architecture is crucial for OTA updates, as it allows the device to process archives larger than its available RAM by avoiding intermediate storage on the filesystem.

#### Core Components
- **Unpacker Modules**: Handles decompression and extraction logic for .gz and .tar files.
- **Packer Modules**: Provides compression and archive creation capabilities for files and directories.
- **FS/Stream Bridge**: Manages the interface between the compression engines and various storage backends like SD, LittleFS, and FFat.
- **OTA Integration**: Specialized logic for piping decompressed binary data directly into the ESP32's flash update system.

### Use Cases
This library is ideal for:
- **Compressed OTA Updates**: Reducing bandwidth and storage requirements for firmware updates by flashing directly from .tar.gz streams.
- **Web Server Asset Management**: Storing website files (HTML, JS, CSS) in a single compressed archive and extracting them to the local filesystem during deployment.
- **Data Logging and Archiving**: Periodically packing and compressing log files on an SD card to maximize storage efficiency and simplify data retrieval.
- **Resource Distribution**: Delivering large sets of configuration files or media assets to remote IoT devices over low-bandwidth connections.

### Getting Started
To begin using ESP32-targz, you must first define your destination filesystem macro before including the library header. This allows the library to alias the correct filesystem object as `tarGzFS`. For example, use `#define DEST_FS_USES_LITTLEFS` followed by `#include <ESP32-targz.h>`. Once included, you can instantiate an unpacker object, such as `TarGzUnpacker`, and configure its callbacks for progress monitoring and error logging. Detailed examples for various scenarios, including stream-to-flash and file-to-file operations, are provided in the library's `examples` folder and the main repository documentation.
