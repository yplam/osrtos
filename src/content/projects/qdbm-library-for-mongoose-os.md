---
title: QDBM Library for Mongoose OS
summary: A port of the QDBM high-performance embedded database for Mongoose OS, specifically
  optimized for ESP32 and ESP8266 platforms. It provides a C-based key-value storage
  solution with custom shims to handle Mongoose OS virtual file system limitations.
slug: qdbm-library-for-mongoose-os
codeUrl: https://github.com/ztittle/qdbm
siteUrl: http://fallabs.com/qdbm/index.html
star: 1
lastUpdated: '2018-03-05'
rtos: mongoose-os
topics:
- b-tree
- database
- mongoose-os
- qdbm
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- littledb-sql-like-database-for-esp32
- sd-h-and-fs-h-port-for-mongoose-os
- sqlite3-for-esp-idf
- sqlite-for-raspberry-pi-pico
- ltc68xx-battery-monitoring-library-for-mongoose-os
- max17263-library-for-mongoose-os
---

## Overview

QDBM (Quick Database Manager) is a library of routines for managing a database. It is a high-performance key-value store that serves as a faster alternative to traditional DBM implementations. This project brings QDBM to the Mongoose OS ecosystem, enabling developers to utilize robust database features on resource-constrained hardware like the ESP32 and ESP8266.

While QDBM is traditionally used in POSIX environments, this port adapts the library to work within the specific constraints of Mongoose OS. It focuses on the core 'C' implementation to ensure compatibility and performance on microcontrollers.

## Handling File System Limitations

Mongoose OS provides a Virtual File System (VFS) that differs significantly from standard Linux or Unix environments. To make QDBM functional, this library implements a support layer to bridge the gap for missing POSIX functions. 

Key adaptations include:
- **lstat**: Since Mongoose OS does not support symbolic links, `lstat` is mapped directly to the standard `stat` function.
- **ftruncate**: The VFS in Mongoose OS has limited support for file truncation. This implementation supports truncating files to 0 bytes, which is the primary requirement for QDBM's internal logic.
- **fsync**: This function is implemented as a stub that always returns success (0), as the underlying file system handles data persistence differently than a standard desktop OS.

Additionally, because file locking is not supported in the Mongoose OS VFS, users must ensure the `DP_ONOLCK` mode is set when opening a database to prevent the library from attempting to acquire a lock.

## Technical Implementation

The library is structured as a Mongoose OS library (`lib`), defined by a `mos.yml` manifest. It includes the core QDBM modules such as Depot, Curia, Relic, and Hovel. By setting the `MYNOMMAP` definition, the library avoids using memory-mapped files, which is essential for devices with limited RAM and no MMU.

## Getting Started

To use QDBM in a Mongoose OS application, you initialize the database within the `mgos_app_init` function. The following example demonstrates how to open a database, store a record, and retrieve it.

```c
#include "mgos.h"
#include <depot.h>
#include <stdlib.h>
#include <stdio.h>

#define NAME     "mikio"
#define NUMBER   "000-1234-5678"
#define DBNAME   "book"

enum mgos_app_init_result mgos_app_init(void) {
    DEPOT *depot;
    char *val;

    /* open the database - Note the use of DP_ONOLCK */
    if(!(depot = dpopen(DBNAME, DP_OWRITER | DP_OCREAT | DP_ONOLCK, -1))){
        fprintf(stderr, "dpopen: %s\n", dperrmsg(dpecode));
        return MGOS_APP_INIT_ERROR;
    }

    /* store the record */
    if(!dpput(depot, NAME, -1, NUMBER, -1, DP_DOVER)){
        fprintf(stderr, "dpput: %s\n", dperrmsg(dpecode));
    }

    /* retrieve the record */
    if(!(val = dpget(depot, NAME, -1, 0, -1, NULL))){
        fprintf(stderr, "dpget: %s\n", dperrmsg(dpecode));
    } else {
        printf("Name: %s\n", NAME);
        printf("Number: %s\n", val);
        free(val);
    }

    /* close the database */
    if(!dpclose(depot)){
        fprintf(stderr, "dpclose: %s\n", dperrmsg(dpecode));
    }

    return MGOS_APP_INIT_SUCCESS;
}
```

## Platform Compatibility

This library is primarily tested and intended for use on:
- **ESP32**: Leveraging the higher RAM and processing power for more complex database operations.
- **ESP8266**: Suitable for simpler key-value storage needs.

Developers should be mindful of the flash endurance and SPIFFS/LFS performance characteristics on these devices when performing frequent write operations.
