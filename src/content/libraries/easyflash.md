---
title: EasyFlash
slug: easyflash
summary: EasyFlash is an open-source, lightweight embedded flash memory library designed
  for MCUs to handle common flash-based tasks such as Key-Value (KV) storage, In-Application
  Programming (IAP), and log management. It provides robust features like wear leveling
  and power-fail protection, making it ideal for resource-constrained devices requiring
  reliable data persistence without a full file system.
codeUrl: https://github.com/armink/EasyFlash
siteUrl: https://github.com/armink/EasyFlash
star: 2284
version: 4.1.0
lastUpdated: '2025-03-14'
components:
- Storage
- Database
- Bootloader
- OTA
- Shell
platforms:
- ARM
- ARM Cortex-M
licenses:
- MIT
libraryType: Database
createdAt: '2025-03-14'
updatedAt: '2026-03-22'
---

### Features


- Key-Value (KV) environment variable storage with support for add, delete, modify, and query operations.

- Next Generation (NG) mode offering near-zero RAM footprint by avoiding extra caching.

- Native wear leveling to extend flash lifespan by distributing write operations across sectors.

- Power-fail safeguard to prevent data corruption or loss during unexpected power outages.

- Support for arbitrary data types and lengths in NG mode, allowing direct memory copying to flash.

- In-Application Programming (IAP) interface for online firmware upgrades via various protocols.

- CRC32 checksum verification for ensuring data integrity during IAP processes.

- Direct flash log storage system for devices lacking a formal file system.

- Seamless integration with EasyLogger for high-performance C log storage.

- Incremental environment variable upgrades following firmware updates.

- Large data storage support allowing values to span across multiple flash sectors.

- Legacy mode compatibility for specific hardware like STM32L4 that restricts reverse-order writing.

- Minimal resource requirements, starting at 6K ROM and 0.1K RAM.

- Portability through a single abstraction file (ef_port.c) for flash read/write/erase operations.

- Support for data encryption in future versions to enhance IoT security.

- Support for data compression in future versions to reduce flash footprint.



### Architecture

EasyFlash is designed with a modular architecture that abstracts hardware-specific flash operations from high-level application logic. The library is divided into three primary functional modules: **ENV** (Environment Variables), **IAP** (In-Application Programming), and **Log** (Flash Logging). These modules interact with a hardware abstraction layer (HAL) defined in a single porting file, `ef_port.c`, which requires the implementation of basic flash erase, write, and read functions.

The **ENV** module is the core of the library, offering two distinct operating modes: the **NG (Next Generation) mode** and the **Legacy mode**. The NG mode is a complete reconstruction that eliminates the need for RAM caching, allowing for a near-zero RAM footprint while supporting arbitrary data types and lengths. It utilizes a NoSQL-style Key-Value model and includes built-in garbage collection (GC) to manage flash sectors efficiently. The **IAP** module provides standardized interfaces for firmware updates, supporting CRC32 validation and multi-partition management. The **Log** module allows for sequential log storage directly to flash, optimized for systems without a file system.

### Use Cases

This library is ideal for:

- **IoT Devices**: Storing Wi-Fi credentials, device IDs, and cloud configuration parameters securely with power-fail protection.
- **Wearable Electronics**: Managing user settings and activity logs on devices with extremely limited RAM and ROM resources.
- **Industrial Control**: Recording system fault logs and sensor calibration data directly to flash for post-mortem analysis.
- **Smart Home Appliances**: Implementing over-the-air (OTA) firmware updates via the IAP module using protocols like Ymodem or CAN.
- **Data Logging**: Storing high-frequency event logs in systems lacking a file system, especially when paired with EasyLogger.
- **Battery-Powered Sensors**: Extending hardware life through wear leveling, ensuring flash sectors are not prematurely worn out by frequent parameter updates.

### Getting Started

To integrate EasyFlash into an embedded project, developers must first include the source files in their build system and configure the `ef_port.c` file. This file acts as the bridge between the library and the specific MCU flash controller or external SPI flash chip. Once the porting layer is implemented, call `easyflash_init()` at system startup to initialize the environment. 

Detailed API documentation is available in the `\docs\en\api.md` file, and a comprehensive porting guide can be found in `\docs\en\port.md`. For developers migrating from older versions, the `\docs\zh\v4_migrate.md` provides specific instructions on transitioning to the NG mode. The library also includes a shell interface that can be mapped to a console for real-time debugging and manual environment variable manipulation.
