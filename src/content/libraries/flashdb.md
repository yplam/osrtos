---
title: FlashDB
slug: flashdb
summary: FlashDB is an ultra-lightweight, high-performance embedded database optimized
  for Flash memory, supporting both Key-Value (KVDB) and Time Series (TSDB) data models.
  It is designed to minimize resource consumption with near-zero RAM usage while ensuring
  data reliability through power-off protection and extending hardware lifespan via
  wear leveling.
codeUrl: https://github.com/armink/FlashDB
siteUrl: https://armink.github.io/FlashDB/#/
star: 2442
version: 2.1.1
lastUpdated: '2025-12-23'
components:
- Database
- Storage
- Shell
platforms:
- ARM Cortex-M
- ARM
licenses:
- Apache-2.0
libraryType: Database
createdAt: '2025-12-23'
updatedAt: '2026-03-01'
---

### Features


- Provides a Key-Value database (KVDB) for non-relational data storage using unique identifiers.

- Provides a Time Series Database (TSDB) for storing timestamped data in chronological order.

- Optimized for Flash storage characteristics, avoiding the overhead of traditional file systems.

- Extremely low resource footprint with RAM usage approaching zero.

- Supports multiple partitions and multiple database instances to optimize retrieval times.

- Integrated wear leveling algorithms to extend the service life of Flash memory.

- Robust power-off protection to ensure data integrity during unexpected resets.

- Supports both string and binary large object (blob) types for KV pairs.

- Features incremental KVDB upgrades to handle data schema changes after firmware updates.

- Allows modification of individual TSDB record statuses for flexible data management.

- High-performance insertion and query speeds on Nor Flash and on-chip Flash.

- Small code footprint suitable for resource-constrained microcontrollers like STM32.

- Supports data storage for dynamically generated structured data like sensor logs.

- Includes a shell interface for database interaction and benchmarking.



### Architecture

FlashDB is architected as a lightweight storage engine that interacts directly with Flash memory partitions, bypassing the complexity and overhead of traditional file systems. The system is divided into two primary functional modules: the Key-Value Database (KVDB) and the Time Series Database (TSDB). These modules share a common core that manages low-level Flash operations, ensuring that data is stored efficiently while respecting the physical constraints of Flash hardware.

The design prioritizes reliability and longevity. It incorporates a wear-leveling mechanism to distribute write cycles across the Flash medium, preventing premature sector failure. Additionally, the architecture includes a power-off protection layer that ensures data consistency even if the system loses power during a write operation. This makes it particularly suitable for industrial and IoT applications where power stability cannot always be guaranteed.

#### Core Components
- **KVDB Engine**: Manages non-relational data pairs with support for string and blob types.
- **TSDB Engine**: Handles sequential, timestamped data with high-speed insertion and query capabilities.
- **Storage Abstraction Layer**: Interfaces with the hardware to provide wear leveling and power-fail safety.
- **Shell Interface**: Provides a command-line interface for database management, testing, and performance benchmarking.

### Use Cases

This library is ideal for:

- **IoT Device Configuration**: Storing product parameters and user-defined settings in the KVDB for persistent configuration management.
- **Environmental Monitoring**: Recording high-frequency sensor data such as temperature, humidity, and air quality using the TSDB.
- **Wearable Health Tracking**: Logging real-time biometric data like heart rate and step counts in a time-sequenced format.
- **Industrial Operation Logs**: Maintaining a reliable history of system operations, abnormal alarms, and error logs for forensic analysis.
- **Firmware Asset Management**: Managing small binary files or assets using the blob storage capabilities of the KVDB.
- **Resource-Constrained Systems**: Implementing database functionality on microcontrollers with very limited RAM and Flash resources.

### Getting Started

To begin using FlashDB, developers must first port the library to their specific hardware platform, which typically involves implementing the Flash Abstraction Layer (FAL) to define how the library interacts with the physical Flash sectors. Once the hardware interface is established, you can define your database partitions and initialize the KVDB or TSDB instances within your application code.

Comprehensive documentation is available to guide the integration process, including a [Quick Start Document](http://armink.github.io/FlashDB/#/quick-started) for basic setup, a [Porting Document](http://armink.github.io/FlashDB/#/porting) for hardware adaptation, and a detailed [API Document](http://armink.github.io/FlashDB/#/api) for application development. The library also includes built-in benchmarks to help verify performance on your specific hardware configuration.
