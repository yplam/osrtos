---
title: SQLite3 for ESP-IDF
summary: A port of the SQLite3 relational database engine for ESP32 microcontrollers
  using the ESP-IDF framework. It supports ESP-IDF V5.x, offers specialized PSRAM
  memory management, and integrates with various filesystems including SPIFFS, LittleFS,
  and FATFS.
slug: sqlite3-for-esp-idf
codeUrl: https://github.com/nopnop2002/esp32-idf-sqlite3
lastUpdated: '2026-03-27'
licenses:
- Apache-2.0
rtos: freertos
libraries:
- littlefs
- spiffs
- sqlite
topics:
- esp-idf
- esp32
- sqlite3
isShow: false
createdAt: '2026-04-01T23:49:15+00:00'
updatedAt: '2026-04-01T23:49:15+00:00'
---

## Bringing Relational Databases to the Edge

Embedded developers often face a dilemma when managing complex data: use simple flat files and custom binary formats, or risk the overhead of a full database engine. This project provides a robust solution by porting SQLite3 to the ESP-IDF framework, allowing developers to leverage the power of SQL on ESP32, ESP32-S3, and ESP32-C series microcontrollers. 

Originally based on the work by siara-cc, this repository has been modernized to support ESP-IDF Version 5 and later. It transforms SQLite3 into a local component that can be easily integrated into modern Espressif IoT Development Framework projects, providing a familiar relational interface for local data storage.

## Modernizing the SQLite Port

The transition to ESP-IDF v5 brought significant changes to the build system and underlying APIs. This project ensures compatibility with these newer environments while adding several critical features for resource-constrained hardware. One of the most significant additions is the support for PSRAM (Pseudo-Static RAM). SQLite is notoriously memory-hungry during complex queries; by utilizing PSRAM, the library can handle larger databases and more complex operations that would otherwise exhaust the internal SRAM of an ESP32.

If PSRAM is enabled in the project configuration, the library automatically switches to using `ps_malloc()` and `ps_realloc()`. This allows the database engine to scale its memory footprint according to the available hardware, such as the 8MB of PSRAM often found on ESP32-CAM or high-end ESP32-S3 modules.

## Flexible Storage Backends

One of the strengths of this implementation is its flexibility regarding the underlying storage medium. SQLite requires a filesystem to host its database files, and this repository provides ready-to-use examples for almost every common ESP32 storage configuration:

*   **Internal Flash**: Using SPIFFS or LittleFS for lightweight, wear-leveled storage.
*   **SD Cards**: Support for both SD-MMC and SD-SPI interfaces for high-capacity requirements.
*   **FATFS**: Standard filesystem support for compatibility with external devices.

## Integration and Usage

Integrating the library into an existing ESP-IDF project is straightforward using the ESP Component Manager. By creating an `idf_component.yml` file in the project's main directory, the build system can automatically fetch and link the library.

```yaml
dependencies:
  nopnop2002/sqlite3:
    path: components/esp32-idf-sqlite3/
    git: https://github.com/nopnop2002/esp32-idf-sqlite3.git
```

## Advanced Networking Examples

Beyond simple local storage, the project includes a wide array of examples demonstrating how to interact with the database over a network. This includes:

*   **Web-based Querying**: Accessing the database via WebSockets or a built-in web server.
*   **Remote Management**: Transferring database files via FTP or using MQTT to publish query results.
*   **Redirection**: Tools to redirect database output to UDP or other communication protocols.

This makes the library suitable not just for local logging, but for sophisticated edge computing nodes that need to synchronize data with remote servers or provide real-time dashboards to users.
