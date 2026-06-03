---
title: LWIP MySQL Connector
summary: A C-based MySQL connector for the lwIP network stack using the TCP RAW API.
  It enables embedded devices to perform SQL operations like INSERT and SELECT directly
  on MySQL and MariaDB databases without requiring a full operating system.
slug: lwip-mysql-connector
codeUrl: https://github.com/the-diy-life/lwip_mysql_connector
star: 4
lastUpdated: '2019-07-29'
rtos: ''
libraries:
- lwip
topics:
- database
- db
- lwip
- lwip-mysql-connector
- mysql
- mysql-connector
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- littledb-sql-like-database-for-esp32
- w5500-lwip-binding-for-freertos
- sqlite-for-raspberry-pi-pico
- ip-over-usb
- d21rndis-usb-rndis-for-samd21
- lwirax
---

## Overview

The LWIP MySQL Connector is a specialized library designed to bridge the gap between embedded systems and SQL databases. Built specifically for the lwIP (Lightweight IP) stack, this connector allows microcontrollers to interact directly with MySQL and MariaDB servers. By utilizing the lwIP TCP RAW API, the library maintains a small footprint, making it suitable for resource-constrained environments where a full-featured database client would be too heavy.

The project was inspired by the "MySQL_Connector_Arduino" library by Chuck Bell, but it has been re-engineered to work within the native C environment of lwIP. This makes it an ideal choice for developers working on STM32, ESP32 (non-Arduino), or other ARM Cortex-M platforms that rely on lwIP for networking.

## Key Features

- **Core SQL Operations**: Currently supports `INSERT` and `SELECT` statements, allowing for both data logging and remote configuration retrieval.
- **Broad Compatibility**: Tested against MySQL version 5.5 and MariaDB (via XAMPP), ensuring compatibility with the most common open-source database engines.
- **Asynchronous Design**: Leverages the lwIP RAW API's callback mechanism, allowing the system to remain responsive while waiting for network I/O.
- **Multiple Connections**: Uses a descriptor-based system (similar to file descriptors) to manage up to 10 simultaneous database connections.
- **Security**: Implements the SHA1-based authentication handshake required by MySQL for secure login.

## Technical Implementation

The connector manages the complex MySQL protocol handshake and command phases internally. When a connection is initiated via `mysqlc_connect`, the library handles the server greeting, performs the necessary SHA1 hashing of the password with the server-provided seed, and establishes an authenticated session.

Data retrieval is handled through a structured API that allows developers to iterate through result sets. The library provides functions to extract column metadata and fetch row values as strings, which can then be parsed into native C types as needed.

### Memory Management

Because it targets embedded systems, the library allows for fine-tuned memory control. Users can define `MAX_FIELDS` to limit the maximum number of columns handled in a query, preventing stack or heap overflows when dealing with large tables. It also includes dedicated cleanup functions like `mysqlc_free_columns_buffer` and `mysqlc_free_row_buffer` to ensure that memory is returned to the heap promptly after processing results.

## Getting Started

Integrating the connector involves creating a descriptor and initiating a connection with the server's IP and credentials. Below is a basic conceptual example of how the API is used:

```c
mysqlc_descriptor db_conn;
if (mysqlc_create(&db_conn) == 0) {
    mysqlc_connect(&db_conn, "192.168.1.100", 3306, "db_user", "db_password");
}

// To execute a query
const char* query = "INSERT INTO sensors (type, value) VALUES ('temp', 25.5)";
mysqlc_execute(&db_conn, query);
```

For `SELECT` queries, the library provides an iterator pattern:

```c
column_names* cols = mysqlc_get_columns(&db_conn);
row_values* row;
while ((row = mysqlc_get_next_row(&db_conn)) != NULL) {
    // Process row->values[i]
}
```

## Community and Development

The LWIP MySQL Connector is an ongoing project. While `INSERT` and `SELECT` are fully implemented, the project structure is designed to be extensible, allowing for future implementation of more complex MySQL commands and protocol features. It serves as a robust starting point for IoT developers needing to log sensor data directly to a central database without intermediate gateways.
