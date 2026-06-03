---
title: Arduino-LittleFS-SpiMemory-Wrapper
summary: A lightweight C++ wrapper that integrates the LittleFS filesystem with the
  SPIMemory library for Arduino. It provides a block device interface to enable robust,
  power-fail resilient file management on external SPI flash memory chips.
codeUrl: https://github.com/khswong/Arduino-LittleFS-SpiMemory-Wrapper
isShow: false
rtos: ''
libraries:
- littlefs
topics:
- littlefs
- spimemory
- arduino
- feather
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- 107-arduino-littlefs
- littlefs-mbed-rp2040
- esp8266-littlefs-file-handler
- spiffs-for-esp8266-non-os-sdk
- littlefs-portenta-h7-library
- fs-nano33ble
---

Managing files on external SPI flash memory in the Arduino ecosystem can be a challenge, especially when looking for a filesystem that is both lightweight and resilient to power failures. The **Arduino-LittleFS-SpiMemory-Wrapper** project provides a straightforward solution by bridging the gap between the high-integrity [LittleFS](https://github.com/ARMmbed/littlefs) and the versatile [SPIMemory](https://github.com/Marzogh/SPIMemory) library.

### Overview
LittleFS is a filesystem designed specifically for microcontrollers, featuring wear leveling and power-loss resilience. However, implementing it requires a block device driver tailored to the specific storage hardware. This project provides that driver (the "wrapper") for use with the SPIMemory library, which supports a wide range of SPI Flash ICs. This allows developers to use LittleFS on external flash chips with minimal setup code, moving beyond simple raw memory access to a structured file system.

### Key Features
- **Seamless Integration**: Connects LittleFS directly to the SPIMemory SPIFlash driver functions.
- **C++ Interface**: Provides `LfsInstance` and `LfsFile` classes for an object-oriented experience that fits naturally into Arduino projects.
- **Resource Efficient**: Optimized for resource-constrained microcontrollers like the Cortex-M0+.
- **Robustness**: Inherits the power-loss resilience and wear-leveling capabilities of LittleFS, making it suitable for data logging and configuration storage.

### Hardware Compatibility
The library has been verified on specific hardware configurations, though it is designed to be portable across the Arduino ecosystem:
- **Microcontroller**: ATSAMD21G18 (Cortex-M0+ based, such as the Arduino Feather M0).
- **Flash Memory**: Adesto AT25SF041 (4Mbit SPI Flash IC).

### Getting Started
To use this library, you must have both the ARMmbed LittleFS and Marzogh's SPIMemory libraries in your Arduino library path. The wrapper provides a simple API to mount the filesystem and perform file I/O. 

Below is a basic example of how to initialize the filesystem and track the number of times a device has booted:

```cpp
#include <SPI.h>
#include <SPIMemory.h>
#include "LFSWrapper.h"
#include "LFSInterface.h"

#define EXT_FLASH_SS A5
SPIFlash flash(EXT_FLASH_SS, &SPI);
LfsInstance extFlashFs;

void setup() {
  Serial.begin(115200);
  flash.begin();

  // Configure and mount the filesystem
  extFlashFs.configure(SpiFlashLfsCfg);
  if (extFlashFs.mount() != 0) {
    Serial.println("Formatting drive...");
    extFlashFs.format();
    extFlashFs.mount();
  }

  // Open or create a boot count file
  LfsFile boot_count(&extFlashFs, "boot_count", LFS_O_RDWR | LFS_O_CREAT);
  byte count = 0;
  boot_count.read(&count, 1);
  
  count++;
  Serial.print("Boot count: ");
  Serial.println(count);

  // Update the file and close to save changes
  boot_count.rewind();
  boot_count.write(&count, 1);
  boot_count.close();
}
```

### Technical Implementation
The core logic resides in `LFSInterface.cpp`, which maps the LittleFS block device API (read, program, erase, and sync) to the corresponding low-level functions in the SPIMemory library. The `LfsInstance` class manages the filesystem configuration and mounting state, while `LfsFile` handles file-specific operations like seeking, reading, and writing. This abstraction allows developers to focus on application logic rather than the intricacies of flash page management and wear leveling.
