---
title: 'LittleDB: SQL-like Database for ESP32'
summary: A lightweight SQL-like database library designed for ESP32 microcontrollers.
  It utilizes the LittleFS file system to manage data storage on embedded flash memory,
  providing a familiar query interface for creating databases, tables, and performing
  CRUD operations.
slug: littledb-sql-like-database-for-esp32
codeUrl: https://github.com/pouriamoosavi/LittleDB
star: 34
version: v1.3.0
lastUpdated: '2021-05-16'
rtos: ''
libraries:
- littlefs
topics:
- database
- embedded
- esp
- esp32
- littlefs
- microcontroller
- sql
- sqlite
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- sqlite-for-raspberry-pi-pico
- sqlite3-for-esp-idf
- esp8266-littlefs-file-handler
- littlefs-mbed-rp2040
- qdbm-library-for-mongoose-os
- littlefs-for-esp-idf
---

LittleDB is a specialized database library tailored for the ESP32 ecosystem, offering a SQL-like interface for managing data on embedded file systems. By leveraging LittleFS, it provides a robust way to handle structured data without the overhead of a full-scale relational database management system, making it ideal for IoT applications that require persistent storage with a familiar query syntax.

The library simplifies data interactions through a single entry point: the `execQuery` function. Developers can perform standard database operations using strings that mimic SQL syntax. Supported operations include creating and dropping databases (which map to directories), managing tables (which map to files), and executing standard CRUD (Create, Read, Update, Delete) commands.

## Supported Queries and Operations

LittleDB implements a subset of SQL tailored for the constraints of microcontrollers. The query engine supports several key operations:

- **Data Definition**: `CREATE_DB`, `DROP_DB`, `CREATE_TBL`, and `DROP_TBL` allow for dynamic schema management. Tables are stored as individual files within database directories.
- **Data Manipulation**: `INSERT` adds new rows, while `UPDATE` and `DELETE` handle modifications. 
- **Data Retrieval**: The `SELECT` query supports various operators (`=`, `>=`, `<=`, `<`, `>`, `<>`) for filtering data. While it can filter by any column, selecting by the `id` field is optimized for both speed and memory usage.

One interesting design choice in LittleDB is how it handles the physical limitations of ESP32 flash memory. Because flash has a limited number of write cycles, the `DELETE` operation doesn't immediately erase data; instead, it sets a "deleted" bit. To reclaim space, users can run a `COMPACT` query, which rewrites the table without the marked rows. Similarly, `UPDATE` operations are performed as a delete followed by an insert underneath to manage the file structure efficiently.

## Schema and Data Types

The library supports several core data types designed for embedded efficiency:

- **id**: A 16-byte string, optimized for lookups.
- **int**: A 4-byte signed 32-bit integer (ranging from -2,147,483,647 to 2,147,483,647).
- **tinyint**: A 1-byte integer for small values (-128 to 128).
- **text**: A variable-length string that can store up to 65,536 characters.

## Technical Implementation and Memory Management

LittleDB is designed to work within the Arduino and PlatformIO environments, specifically targeting boards like the WEMOS Lolin 32. It relies on the `LittleFS_esp32` library for low-level file operations. 

To maintain a small footprint, the library uses global variables for result sets. When a `SELECT` query is executed, the results are written into a global `selectedRows` structure. Developers can then extract data using helper functions:

```cpp
// Example of retrieving data from a selected row
String name = getText(selectedRows->rows[0], "name");
int32_t age = getInt32(selectedRows->rows[0], "age");
```

This approach minimizes dynamic memory allocation during query execution, which is critical for maintaining stability in long-running embedded applications. However, it does mean that subsequent queries will overwrite previous results, requiring developers to process or copy data before the next database operation.

## Performance and Benchmarks

Benchmarks conducted on the WEMOS Lolin 32 highlight the library's performance characteristics. Inserting 100 rows takes approximately 6.8 seconds, while a `SELECT` operation on a 100-row table using an ID lookup takes roughly 70ms. Queries using non-ID fields or complex operators take longer due to the linear scanning required on the file system. These metrics provide a realistic expectation for developers building data-driven applications on the ESP32 platform.
