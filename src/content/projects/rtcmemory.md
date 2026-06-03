---
title: RTCMemory
summary: A specialized library for the ESP8266 that provides structured, type-safe
  access to the 512-byte user RTC memory. It simplifies data persistence across deep
  sleep cycles and includes built-in support for flash memory backups using LittleFS
  or SPIFFS.
slug: rtcmemory
codeUrl: https://github.com/fabianoriccardi/RTCMemory
star: 23
version: 2.0.0
lastUpdated: '2022-08-20'
rtos: ''
libraries:
- littlefs
- spiffs
topics:
- arduino
- arduino-library
- backup-data
- esp8266
- flash-memory
- littlefs
- rtc
- rtc-memory
- spiffs
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- effortless-spiffs
- espsavecrashspiffs
- spiffs-circular-queue
- spiffslogger
- esp-multiresetdetector
- easyini
---

## Overview

RTC memory is a critical resource for developers working with the ESP8266, particularly in low-power IoT applications. Unlike standard RAM, the RTC (Real-Time Clock) memory segment remains powered during deep sleep, allowing the microcontroller to preserve state information—such as sensor readings, Wi-Fi credentials, or boot counters—without the high energy cost and wear-and-tear associated with writing to flash memory. 

However, the standard ESP8266 Arduino core provides only basic, byte-oriented functions for interacting with this memory. This often requires developers to manage complex pointer arithmetic and manual casting, which can lead to memory alignment errors. RTCMemory was created to solve this by providing an intuitive, template-based wrapper that treats RTC memory as a structured data container.

## Key Features

RTCMemory focuses on ease of use and reliability for embedded developers:

- **Structured Access**: Define a C++ `struct` and map it directly to RTC memory. The library handles the underlying byte management.
- **Minimal Overhead**: The library uses only a 4-byte overhead on the RTC memory for integrity checks.
- **Flash Backup**: Since RTC memory is volatile and loses data on total power failure, the library provides a simple mechanism to back up data to the flash file system.
- **File System Flexibility**: It is fully compatible with both LittleFS (the modern standard) and SPIFFS (the deprecated legacy system).
- **OTA Compatibility**: It includes built-in considerations for OTA (Over-the-Air) update memory offsets to prevent data corruption during firmware updates.

## Technical Implementation and Memory Layout

The ESP8266 provides a total of 768 bytes of RTC memory. The underlying SDK reserves the first 256 bytes, leaving 512 bytes for user applications. A common pitfall in ESP8266 development is the overlap between user RTC data and OTA functionality, which typically utilizes the first 128 bytes of the user-available section.

RTCMemory manages this by defaulting to a 384-byte limit to ensure safety during OTA updates. However, for applications that do not use OTA or require more storage, the library allows users to expand this limit up to the full 512 bytes via class templates. The library also shifts data toward the highest addresses of the RTC memory to minimize conflict with system-reserved areas.

## Getting Started

To use the library, you define your data structure and instantiate the `RTCMemory` class. The library provides a pointer to your data, which you can modify like any other object before committing it to memory.

```cpp
typedef struct {
    int counter;
    float lastReading;
} MyData;

RTCMemory<MyData> rtcMemory("/backup.bin");

void setup() {
    // Initialize file system if using backup
    LittleFS.begin();

    if (rtcMemory.begin()) {
        // Data was successfully loaded from RTC or Flash
        MyData* data = rtcMemory.getData();
        data->counter++;
    } else {
        // No valid data found, initialize defaults
        MyData* data = rtcMemory.getData();
        data->counter = 0;
    }

    // Save to RTC memory
    rtcMemory.save();

    // Optional: Backup to Flash for persistence across power loss
    rtcMemory.backup();
}
```

By abstracting the hardware-specific details of the ESP8266 RTC memory, this library allows developers to focus on application logic rather than memory management, making it an essential tool for robust, low-power firmware development.
