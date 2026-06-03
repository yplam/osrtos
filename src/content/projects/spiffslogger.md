---
title: SPIFFSLogger
summary: A minimal binary data logging library for ESP8266 systems. It provides efficient
  storage with UTC timestamps, automatic daily file rotation, and space-saving binary
  serialization for sensor data and system logs.
slug: spiffslogger
codeUrl: https://github.com/bitmario/SPIFFSLogger
star: 28
version: v0.1.3
lastUpdated: '2020-11-12'
rtos: ''
libraries:
- spiffs
topics:
- arduino-library
- data-logger
- data-logging
- esp8266
- esp8266-arduino
- spiffs
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- hommie-logger
- meindatalogger
- effortless-spiffs
- esp-datalogger-with-firebase-and-spiffs
- espsavecrashspiffs
- rtcmemory
---

## Overview

SPIFFSLogger is a specialized C++ library designed for efficient data logging on ESP8266 microcontrollers. In many IoT applications, logging sensor data or system events is a core requirement; however, traditional formats like CSV can be incredibly wasteful in terms of storage space and processing overhead. SPIFFSLogger addresses this by providing a template-based system for logging raw binary data directly to the ESP8266's Serial Peripheral Interface Flash File System (SPIFFS).

By storing data in binary format alongside a UTC timestamp, the library achieves approximately 50% space savings compared to equivalent CSV logging. This efficiency is critical for long-term deployments where flash memory is a limited resource.

## Key Features and Capabilities

The library is built with the constraints of embedded systems in mind, offering several automated features that simplify data management:

- **Binary Serialization**: Data is stored in its raw memory representation, minimizing the footprint on the flash chip.
- **Daily File Rotation**: To prevent single files from becoming unmanageably large, the logger automatically splits data into daily files. This structure significantly improves search efficiency and data retrieval speed.
- **Automatic Retention Management**: The library includes built-in rotation logic that deletes old log files once they exceed a user-defined age, preventing the filesystem from filling up.
- **UTC Integration**: It leverages the built-in ESP8266/newlib time functions to ensure every data point is accurately timestamped.

## Technical Implementation

SPIFFSLogger uses C++ templates, allowing it to handle any user-defined `struct` or primitive data type. This flexibility makes it suitable for everything from simple temperature logging to complex multi-sensor environmental monitoring.

### Data Structure

Every entry in the log is wrapped in a `SPIFFSLogData<T>` struct, which pairs the user's data with a `time_t` timestamp:

```cpp
template <class T>
struct SPIFFSLogData
{    
    time_t timestampUTC; /** creation time in UTC */
    T data;              /** data of type T */
};
```

### Initialization and Usage

Setting up the logger requires initializing the SPIFFS filesystem and configuring the system time (usually via NTP). The logger instance is configured with a base directory and a retention period (in days).

```cpp
// Store custom environment data, keeping 7 days of history
struct EnvData {
    float temperature;
    float humidity;
    uint16_t pressure;
};

SPIFFSLogger<EnvData> logger("/log", 7);

void setup() {
    SPIFFS.begin();
    configTime(0, 0, "pool.ntp.org");
    logger.init();
}
```

To maintain the filesystem, the `logger.process()` method must be called within the main loop. Writing data is a simple one-line operation:

```cpp
EnvData currentReadings = { 23.54, 50.67, 1020 };
logger.write(currentReadings);
```

## Advanced Data Retrieval

Beyond simple logging, SPIFFSLogger provides robust methods for reading data back. Users can read specific rows from the current day's log or filter data across a specific time range. The `readRowsBetween` function is particularly powerful for generating charts or reports, as it allows for fetching data from a specific window (e.g., the last 20 minutes) without manually parsing multiple files.

This library is an excellent choice for ESP8266 developers who need a reliable, set-and-forget logging solution that respects the hardware's resource limitations while providing high-level data management features.
