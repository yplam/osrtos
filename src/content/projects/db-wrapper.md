---
title: db_wrapper
summary: db_wrapper is a high-performance Nim database library providing a unified
  interface for MySQL, PostgreSQL, and SQLite. It implements robust connection pooling
  to enable efficient parallel database processing, addressing performance limitations
  found in standard Nim database drivers.
codeUrl: https://github.com/sivchari/db_wrapper
isShow: false
rtos: ''
libraries:
- sqlite
topics:
- database
- mysql
- nim
- nim-lang
- nim-language
- nimble
- postgresql
- sqlite
- sqlite3
star: 21
lastUpdated: '2021-05-25'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- csvql
- lwip-mysql-connector
- qdbm-library-for-mongoose-os
- sqlite-for-raspberry-pi-pico
- nesper-nim-wrappers-for-esp-idf
- bloom
---

In the Nim ecosystem, database interaction is often handled by standard libraries that, while functional, sometimes lack advanced features like native connection pooling. This can lead to performance bottlenecks or synchronization errors when attempting to run multiple queries in parallel. **db_wrapper** is designed to solve these issues by providing an intuitive, high-speed interface for MySQL, PostgreSQL, and SQLite with built-in connection management.

### High-Performance Parallel Processing
The standout feature of db_wrapper is its implementation of connection pooling. By maintaining a pool of active connections, the library allows for parallel database processing at significantly higher speeds than traditional single-connection approaches. In benchmark tests involving 150,000 queries, db_wrapper completed the task in approximately 23 seconds, compared to over 30 seconds for the standard `db_mysql` library. When running asynchronous loops, the standard library often encounters "commands out of sync" errors because it cannot handle concurrent requests on a single connection; db_wrapper avoids this by intelligently managing its pool.

### Unified Database API
One of the primary goals of db_wrapper is to provide a consistent experience regardless of the backend. Whether you are working with a local SQLite file or a remote PostgreSQL cluster, the API remains largely the same. 

#### MySQL Example
```nim
import db_wrapper

let db = open(MySQL, "database", "user", "Password!", "127.0.0.1", "3306", 10)
echo db.ping

# Simple query execution
discard db.query("INSERT INTO sample(id, age, name) VALUES(?, ?, ?)", 1, 10, "New Nim")

# Prepared statements for safety and performance
let row = db.prepare("SELECT * FROM sample WHERE id = ?").query(1)
echo row.all

discard db.close()
```

#### SQLite Example
For embedded or local storage use cases, SQLite is fully supported with a simplified connection string:
```nim
import db_wrapper

let db = open(SQLite3, "sample.sqlite3")
discard db.query("CREATE TABLE IF NOT EXISTS sample (id INT, age INT, name VARCHAR)")
```

### Technical Architecture and Cross-Compilation
Under the hood, db_wrapper utilizes a Go-based core (found in the `database-resource` directory) that is compiled into shared libraries (`.so`, `.dll`). This architecture allows the library to leverage Go's mature database drivers and concurrency primitives while providing a native Nim interface. 

The project provides comprehensive instructions for cross-compiling these shared resources across various platforms, including macOS (ARM64/AMD64), Linux, and Windows. This makes it a versatile choice for developers targeting different operating systems or architecture types, including ARM-based embedded systems.

### Transaction Support
Reliability is a core focus, and db_wrapper includes a clean syntax for database transactions. This ensures that complex operations are atomic and can be rolled back safely in the event of an application error:

```nim
db.transaction:
  let stmt = db.prepare("UPDATE sample SET name = ? WHERE id = ?")
  discard stmt.exec("Rollback Nim", 1)
  raise newException(Exception, "rollback") # This triggers an automatic rollback
```

By bridging the gap between ease of use and high-concurrency performance, db_wrapper serves as a powerful tool for Nim developers building data-intensive applications or systems requiring reliable, parallel database access.
