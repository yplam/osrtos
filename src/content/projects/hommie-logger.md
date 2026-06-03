---
title: hommie LOGGER
summary: A logging library for Arduino and ESP32 that implements a circular buffer
  algorithm for file-based logs. It supports internal dataflash via SPIFFS, external
  SD cards, and RAM storage, providing features like automatic timestamps and configurable
  log limits.
slug: hommie-logger
codeUrl: https://github.com/r-zlotorzynski/hommie_logger
siteUrl: https://hommie.pl
star: 5
lastUpdated: '2022-01-19'
rtos: ''
libraries:
- spiffs
topics:
- arduino
- arduino-library
- circular-buffer-algorithm
- esp32
- esp32-arduino
- logger
- logging-library
- spiffs
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- spiffslogger
- meindatalogger
- spiffs-circular-queue
- espsavecrashspiffs
- ulog-easyflash-flash-backend-and-filter-storage-for-rt-thread
- esp-datalogger-with-firebase-and-spiffs
---

## Overview

hommie LOGGER is a specialized logging utility designed for the Arduino ecosystem, with a primary focus on the ESP32 platform. It addresses the common challenge of managing persistent logs on embedded devices where storage space is limited and flash wear is a concern. By utilizing a circular buffer algorithm, the library ensures that logging can continue indefinitely by overwriting the oldest entries once a predefined limit is reached.

## Storage Flexibility

One of the core strengths of hommie LOGGER is its versatility regarding storage backends. By default, the library is configured to use the internal dataflash of the ESP32 via the SPIFFS (SPI Flash File System). This is ideal for standalone IoT devices that do not have external peripherals. However, for applications requiring larger log volumes or removable media, the library provides seamless integration with SD card controllers. Support for RAM-based logging is also planned, which would cater to high-frequency logging scenarios where persistence across reboots is not required.

## Key Features

- **Circular Buffer Management**: Automatically manages file size and log rotation to prevent storage overflow.
- **Configurable Log Limits**: Users can define the maximum number of log entries (up to 65,535), allowing for fine-tuned control over memory usage.
- **Integrated Timestamps**: The library can automatically prepend millisecond-accurate timestamps to each log entry, representing the device's uptime.
- **Flexible Output**: Includes built-in methods to print logs directly to the Serial console or retrieve a file handle for custom processing.

## Technical Implementation

The library is structured around the `class_hommie_logger` class. It abstracts the underlying filesystem operations, allowing developers to switch between SPIFFS and SD cards with minimal code changes. 

### Basic Initialization

Setting up the logger with the default SPIFFS backend is straightforward:

```cpp
#include "hommie_logger.h"

class_hommie_logger hommie_logger;

void setup() {
    Serial.begin(115200);
    // Initialize the library with default settings
    hommie_logger.init();
}

void loop() {
    // Append a new log entry
    hommie_logger.append("System heartbeat");
    delay(5000);
}
```

### Using External Storage

To use an SD card instead of internal flash, the library allows you to pass a different filesystem controller:

```cpp
#include <SD.h>
#include "hommie_logger.h"

void setup() {
    // Initialize without mounting SPIFFS
    hommie_logger.init(false);
    // Set the SD card as the storage controller
    hommie_logger.set_controller(SD);
}
```

## Advanced Configuration

Developers can customize the behavior of the logger to suit specific application needs. For instance, if log entries need to be as compact as possible, the automatic timestamping can be disabled. Conversely, for debugging complex timing issues, the millisecond-relative timestamp provides essential context for when events occurred relative to the boot time.

```cpp
// Disable timestamps for cleaner output
hommie_logger.set_usage_timestamp(false);

// Limit the log to the last 100 entries
hommie_logger.set_max_logs(100);
```

## Data Retrieval

Reading logs back from the system is handled through either a direct print method or by obtaining a file handler. The `get_read_handler()` method returns a standard `File` object from the `FS.h` library, enabling the use of all standard filesystem methods like `readString()`, `readBytes()`, or seeking to specific positions within the log file.
