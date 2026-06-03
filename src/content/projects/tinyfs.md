---
title: TinyFS
summary: A collection of Go-based filesystem implementations specifically designed
  for embedded systems using TinyGo. It provides a standardized interface for storage
  backends like onboard flash, external SPI/QSPI flash, and SD cards, with primary
  support for the LittleFS filesystem.
slug: tinyfs
codeUrl: https://github.com/tinygo-org/tinyfs
siteUrl: https://tinygo.org/
star: 36
version: v0.5.0
lastUpdated: '2025-03-19'
rtos: ''
libraries:
- littlefs
topics:
- embedded
- fatfs
- flash
- littlefs
- microcontroller
- sdcard
- tinygo
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- pico-vfs-a-virtual-file-system-for-raspberry-pi-pico
- littlefs-mbed-rp2040
- littlefs2-idiomatic-rust-api-for-littlefs
- fs-nano33ble
- littlefs-for-esp-idf
- 107-arduino-littlefs
---

TinyFS provides a bridge between the Go programming language and the specialized storage needs of microcontrollers. As part of the TinyGo ecosystem, it offers implementations of filesystems like LittleFS and FAT that are optimized for the constraints of embedded hardware, allowing developers to use familiar Go patterns in resource-constrained environments.

## Core Architecture

The project is built around a set of clean, modular interfaces defined in Go. The `Filesystem` interface provides standard operations such as `Mount`, `Open`, `Mkdir`, and `Stat`. To support various hardware backends, TinyFS utilizes a `BlockDevice` interface. This abstraction allows the library to interact with different physical storage media—whether it is internal flash, an external SPI chip, or an SD card—without requiring changes to the high-level application logic.

## Supported Filesystems

Currently, LittleFS is the primary and most stable filesystem supported by TinyFS. LittleFS is specifically engineered for microcontrollers, offering features that are critical for embedded reliability:
- **Power-fail resilience**: Designed to handle random power failures without filesystem corruption.
- **Wear leveling**: Distributes writes across flash blocks to extend the physical life of the memory hardware.
- **Low footprint**: Optimized to work within limited RAM and ROM constraints.

While the project includes a FAT filesystem implementation, it is currently noted as experimental due to specific upstream compiler issues. However, the LittleFS implementation is fully functional and compatible with the TinyGo `io/fs` and `os` interfaces.

## Hardware Integration

TinyFS is designed to be hardware-agnostic through its driver layer. It supports several common embedded storage configurations:
- **Onboard Flash**: Utilizing the internal flash memory of the processor (e.g., RP2040) in areas not occupied by the program code.
- **External Flash**: Supporting chips connected via SPI or QSPI interfaces.
- **SD Cards**: Supporting standard SD cards connected via SPI or QSPI.

## Example Usage

The following example demonstrates how to use TinyFS with LittleFS on a Raspberry Pi Pico (RP2040), utilizing the on-board flash memory:

```go
// Example console output from an RP2040 running LittleFS
==> format
Successfully formatted LittleFS filesystem.

==> mount
Successfully mounted LittleFS filesystem.

==> ls
==> samples
wrote 90 bytes to file0.txt
wrote 90 bytes to file1.txt
==> ls
-rwxrwxrwx    90 file0.txt
-rwxrwxrwx    90 file1.txt
```

## Integration with the Go Ecosystem

One of the strongest features of TinyFS is its integration with standard Go interfaces. By providing a wrapper that satisfies the `io/fs` interface, TinyFS allows developers to use modern Go filesystem features. It also includes an `OSFilesystem` type that integrates with TinyGo's `os` package, enabling a seamless transition for developers moving from standard Go to embedded development.
