---
title: FS_Nano33BLE
summary: A filesystem wrapper library for Arduino MBED nRF52840-based boards, providing
  a simplified interface for LittleFS and FATFS on internal flash memory. It supports
  power-fail safety and high-performance data storage for devices like the Nano 33
  BLE and Seeeduino XIAO nRF52840.
slug: fs-nano33ble
codeUrl: https://github.com/khoih-prog/FS_Nano33BLE
star: 12
version: v1.2.1
lastUpdated: '2022-12-05'
rtos: mbed-os
libraries:
- littlefs
topics:
- data-storage
- fatfs
- fatfs-mbed
- file-system
- filesystem
- flash
- flash-storage
- high-performance-file-system
- littlefs
- littlefs-mbed
- mbed
- mbed-nano
- nano-33-ble
- nano-33-ble-sense
- nrf52840
- seeeduino-xiao
- xiao-nrf52840
- xiao-nrf52840-sense
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- littlefs-mbed-rp2040
- littlefs-portenta-h7-library
- 107-arduino-littlefs
- arduino-littlefs-spimemory-wrapper
- littlefs-for-esp-idf
- effortless-spiffs
---

The FS_Nano33BLE library provides a streamlined way to manage filesystems on the onboard flash of nRF52840-based boards. Specifically designed for the Arduino MBED ecosystem, it acts as a wrapper for LittleFS and FATFS, allowing developers to leverage robust storage solutions without deep-diving into the complexities of the underlying Mbed OS storage layers.

While the library supports both FATFS and LittleFS, the author strongly recommends LittleFS for most applications. LittleFS is specifically designed for microcontrollers, offering power-fail resilience and efficient wear leveling. In contrast, FATFS on this specific platform has been noted to have limitations regarding supported partition sizes, often restricted to 512KB, whereas LittleFS offers more flexibility in size selection from 64KB to 512KB.

## Supported Hardware and Cores

The library is tailored for boards using the Arduino-mbed mbed_nano core or the Seeeduino mbed core. This includes popular development boards such as:
- Arduino Nano 33 BLE and Nano 33 BLE Sense
- Seeeduino XIAO nRF52840 and XIAO nRF52840 Sense

## Technical Implementation

FS_Nano33BLE utilizes standard POSIX APIs (such as `stdio.h` functions) or the native Mbed FileSystem APIs. This makes it highly compatible with existing C/C++ codebases while providing a familiar interface for Arduino developers. The library handles the initialization, mounting, and formatting of the flash memory, abstracting the specific start addresses and partition sizes required by the nRF52840's memory map. This ensures that developers do not waste flash space or accidentally overwrite critical bootloader sections.

## Practical Usage

Developers can easily integrate filesystem operations into their sketches. The library includes features for checking filesystem health, automatic formatting when mounting fails, and standard file I/O operations like reading, writing, appending, and renaming files. 

```cpp
// Basic example of mounting LittleFS
#include "FS_Nano33BLE.h"

void setup() {
  Serial.begin(115200);
  while (!Serial);

  if (!LittleFS.begin()) {
    Serial.println("LittleFS Mount Failed");
    // The library can be configured to format automatically if mount fails
  } else {
    Serial.println("LittleFS Mount OK");
  }
}
```

## Debugging and Configuration

To assist with development, the library includes a configurable logging system. By defining `_FS_LOGLEVEL_` before including the header, users can adjust the verbosity of the output to the Serial monitor, ranging from basic errors to detailed filesystem transaction logs. This is particularly useful for troubleshooting mounting issues or verifying flash wear patterns during long-term testing. The library also provides version strings and compile-time warnings to ensure users are aware of their configuration settings.
