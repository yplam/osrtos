---
title: SPIFFS Circular Queue
summary: A circular FIFO buffer library for ESP32 and ESP8266 that persists data in
  SPIFFS. It supports both fixed and variable-sized elements, making it ideal for
  preserving network packets or sensor data across power cycles and deep sleep modes.
slug: spiffs-circular-queue
codeUrl: https://github.com/rykovv/spiffs_circular_queue
siteUrl: https://rykovv.github.io/spiffs_circular_queue/
star: 13
version: '1.2'
lastUpdated: '2023-02-06'
rtos: freertos
libraries:
- spiffs
topics:
- arduino
- esp-idf
- esp32
- esp8266
- espressif
- fifo
- queue
- spiffs
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- littlefs-ring-buffers
- hommie-logger
- rtcmemory
- effortless-spiffs
- spiffslogger
- esp-multiresetdetector
---

## Overview

The SPIFFS Circular Queue is a specialized data structure designed for embedded systems that require persistent data storage. By implementing a Circular FIFO (First-In, First-Out) buffer directly on top of the SPIFFS filesystem, this library allows developers to store data that survives power losses, unexpected resets, and deep sleep cycles. It is particularly useful for ESP32 and ESP8266 applications where RAM is limited or where data must be buffered before being transmitted over a network.

## Architecture and Efficiency

The library maintains a balance between performance and non-volatile footprint. While the queue metadata is cached in RAM within a `circular_queue_t` struct for fast access, it is kept synchronized with a header stored in SPIFFS. This ensures that the queue state (front/back indices and element counts) can be fully restored upon reboot.

One of the project's standout features is its support for both fixed and variable-sized elements:
- **Fixed Size**: Ideal for uniform data like timestamps or sensor readings. In this mode, no per-element size metadata is stored, saving flash space.
- **Variable Size**: Perfect for network packets or strings. The library stores the size of each element at the beginning of the entry, allowing for flexible data management.

## Technical Implementation

The underlying storage structure is split into a metadata header and a data body. The header includes a fixed part (front index, back index, count, max size, and flags) and an optional part for specific features. The flags bitfield tracks whether the queue uses fixed element sizes and defines the queue type. This robust structure was unit-tested on ESP32 to handle corner cases, such as wrap-around conditions and filesystem limits.

## Key API Functions

The library provides a clean C-style interface for managing the queue:

- `spiffs_circular_queue_init`: Initializes the library, mounting SPIFFS and restoring the queue state from an existing file or creating a new one.
- `spiffs_circular_queue_enqueue`: Adds data to the queue. If variable sizing is enabled, it can truncate elements that exceed a defined maximum size.
- `spiffs_circular_queue_dequeue`: Retrieves and removes the oldest element from the queue.
- `spiffs_circular_queue_size`: Returns the net data size currently stored, excluding metadata overhead.
- `spiffs_circular_queue_available_space`: Provides an estimate of remaining capacity for new elements.

## Usage Example

The library supports multiple queue instances simultaneously. Below is a typical example of initializing both a variable-sized and a fixed-sized queue in an Arduino environment:

```cpp
#include <Arduino.h>
#include "spiffs_circular_queue.h"

circular_queue_t cq_variable;
circular_queue_t cq_fixed;

void setup() {
    // Initialize a variable-sized queue
    snprintf(cq_variable.fn, SPIFFS_FILE_NAME_MAX_SIZE, "/spiffs/var_queue");
    cq_variable.max_size = 2048;
    spiffs_circular_queue_init(&cq_variable);

    // Initialize a fixed-sized queue for uint64_t values
    snprintf(cq_fixed.fn, SPIFFS_FILE_NAME_MAX_SIZE, "/spiffs/fix_queue");
    cq_fixed.elem_size = sizeof(uint64_t);
    cq_fixed.max_size = sizeof(uint64_t) * 100;
    spiffs_circular_queue_init(&cq_fixed);
}

void loop() {
    uint8_t data[] = {0xDE, 0xAD, 0xBE, 0xEF};
    uint64_t sensor_val = 123456789;

    // Enqueue data
    spiffs_circular_queue_enqueue(&cq_variable, data, sizeof(data));
    spiffs_circular_queue_enqueue(&cq_fixed, &sensor_val);

    // Dequeue and process
    uint8_t buffer[128];
    uint16_t len;
    if (spiffs_circular_queue_dequeue(&cq_variable, buffer, &len)) {
        // Process variable data
    }
}
```

## Considerations for SPIFFS

Because SPIFFS performance degrades as the filesystem fills up, the library recommends keeping the total used space under 75% of the assigned partition. This ensures reliable write operations and longevity of the flash memory. The project is compatible with both the native ESP-IDF framework and the PlatformIO/Arduino ecosystem.
