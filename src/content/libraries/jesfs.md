---
title: JesFs
slug: jesfs
summary: JesFs is a lightweight, robust file system specifically engineered for serial
  NOR-Flash memories in ultra-low-power embedded systems. It provides a minimal footprint,
  optimized wear leveling, and high-speed data access, making it suitable for IoT
  applications requiring reliable data persistence and secure firmware updates.
codeUrl: https://github.com/joembedded/JesFs
siteUrl: https://github.com/joembedded/JesFs
star: 248
lastUpdated: '2026-02-14'
components:
- FileSystem
- Storage
- Bootloader
- SecureBoot
- OTA
- Cryptography
platforms:
- ARM Cortex-M
- MSP430
- Windows
licenses:
- Unknown
libraryType: FileSystem
createdAt: '2025-08-19'
updatedAt: '2026-03-17'
---

### Features


- Ultra-small RAM footprint requiring as little as 200 Bytes for operation.

- Minimal code footprint suitable for MCUs with 8kByte program memory or less.

- Optimized for standard Serial NOR-Flash memories ranging from 8kByte to 16MByte.

- Integrated wear leveling algorithms to maximize the operational lifespan of NOR-Flash memory.

- High-speed data reading performance reaching up to 3.7MB/sec on nRF52840 hardware.

- Persistent storage design ensuring no data loss during power failures or system resets.

- Specialized journaling mode supporting millions of write cycles for data collection and event reporting.

- Native support for JesFsBoot secure bootloader with integrated AES-128 encryption.

- Built-in capabilities for Over-the-Air (OTA) firmware updates.

- Designed for ultra-low-power operation with support for deep sleep and wakeup modes.

- Standalone operation or integration with an underlying RTOS.

- Intuitive C API for standard file operations including open, read, write, delete, and rename.

- Integrated disk check and formatting utilities for file system maintenance.

- Support for CRC32 checksum generation for data integrity verification.

- Time conversion utilities for handling Unix timestamps to calendar date formats.

- Supply voltage check feature to prevent operations during unstable power conditions.

- Support for deep sleep with RTC active and full RAM retention on supported hardware.

- Written in standard C for maximum portability across different MCU architectures.



### Architecture

JesFs is structured as a lightweight abstraction layer specifically designed for Serial NOR-Flash. It manages the physical constraints of NOR technology, where data can only be written by flipping bits from 1 to 0 and requires block-level erasure to reset bits to 1. The system utilizes a file descriptor approach (`FS_DESC`) to manage file handles and state, ensuring that even on extremely resource-constrained devices, multiple files can be tracked with minimal RAM overhead. 

The architecture is divided into a high-level API for application developers and a low-level hardware abstraction layer that interfaces with the SPI bus. It includes a specialized wear-leveling engine that distributes write and erase cycles across the flash medium to prevent premature hardware failure. Additionally, JesFs is designed to work in tandem with the JesFsBoot secure bootloader, providing a seamless path for encrypted firmware storage and updates.

#### Core Components
- **File API**: High-level functions for file manipulation (open, read, write, delete, rename).
- **Flash Management**: Low-level drivers for handling SPI communication and flash-specific commands for chips like Macronix and GigaDevices.
- **Wear Leveling Engine**: Logic to maximize memory life by distributing writes.
- **Secure Boot Interface**: Hooks for JesFsBoot to handle encrypted firmware images and OTA updates.
- **Maintenance Tools**: Integrated utilities for disk checking, formatting, and CRC32 verification.

### Use Cases

This library is ideal for:

- **IoT Data Logging**: Storing sensor readings and event logs in a power-efficient manner on battery-operated devices.
- **Firmware Management**: Handling OTA updates and storing multiple firmware images for secure recovery and bootloading.
- **Asset Storage**: Storing static assets like language packs, graphics, and configuration files that need to be updated independently of the application code.
- **BlackBox Recording**: Implementing a "flight recorder" for embedded devices to capture system states and failure logs for post-mortem analysis.
- **Journaling Applications**: Utilizing the high-cycle write mode for frequent small data updates without wearing out the flash.
- **Ultra-Low Power Systems**: Devices requiring deep sleep modes with minimal current draw while maintaining file system integrity.

### Getting Started

To integrate JesFs, include the `JesFs.h` header in your project and provide the low-level SPI/Flash drivers for your specific hardware platform. Initialization is performed by calling `fs_start()`, which mounts the file system and prepares the flash for operation. Developers can then use the intuitive API to perform file operations; for example, `fs_open()` with flags like `FS_WRITE` or `FS_READ` followed by `fs_write()` or `fs_read()`. 

For developers using nRF52 or CC13xx/CC26xx platforms, the repository provides sample projects and `tb_tools` to simplify I/O configuration. Detailed technical documentation and API references are available in the `Documentation/JesFs.pdf` file within the repository.
