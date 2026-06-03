---
title: SD.h and FS.h Port for Mongoose OS
summary: A port of the Arduino ESP32 SD.h and FS.h libraries to Mongoose OS, specifically
  targeting ESP32 microcontrollers. It provides a reliable SD card interface by integrating
  source files and static libraries directly from the Arduino ESP32 core, bypassing
  standard compatibility layers.
slug: sd-h-and-fs-h-port-for-mongoose-os
codeUrl: https://github.com/meticulousCraftman/mgos-sdcard-port
star: 1
lastUpdated: '2020-08-12'
rtos: mongoose-os
topics:
- arduino
- arduino-library
- mongoose-os
- mongoose-os-app
- sdcard
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- hx711-library-for-mongoose-os
- lis3dh-accelerometer-library-for-mongoose-os
- max17263-library-for-mongoose-os
- esp8266sdupdater
- sd-card-spi-fatfs-for-esp8266-nonos-sdk
- littlefs-for-esp-idf
---

## Overview

The `mgos-sdcard-port` project provides a robust implementation of the Arduino `SD.h` and `FS.h` libraries for the Mongoose OS environment on ESP32. This project was born out of a need for reliability; the developer noted that existing solutions, such as `nvliu/sdlib`, often failed to mount SD cards correctly on certain ESP32 modules. By porting the core Arduino files directly, this project ensures that the well-tested logic from the Arduino ESP32 ecosystem is available to Mongoose OS users.

### A Different Approach to Compatibility

Typically, Mongoose OS users might reach for the `arduino-compat` library to run Arduino code. However, this project takes a more direct route. It incorporates the original source files, header files, and static library files (`libfatfs.a` and `libesp32.a`) from the `esp32-arduino` project. This "native" porting strategy minimizes the abstraction layers between the file system logic and the hardware, leading to higher reliability when interfacing with SD card modules.

### Technical Implementation

The repository is structured to integrate seamlessly with the Mongoose OS build system (`mos`). The `mos.yml` configuration file defines the necessary include paths for the ported Arduino core and FatFS components. It also links against the provided binary libraries. 

**Key components included in the port:**
- `SD.h` and `FS.h` headers for standard Arduino-style file operations.
- Arduino core compatibility layers for ESP32.
- Static libraries for FatFS and ESP32 hardware abstraction.
- Configuration for the Mongoose OS build tool to include local binary libraries.

### Getting Started

To use this port, developers build the project using the Mongoose OS CLI. Because it relies on specific binary libraries included in the repository, the build command requires pointing to the `binary_libs` directory and disabling remote library updates to ensure the local versions are used:

```console
mos build --platform esp32 --local --verbose --no-libs-update --binary-libs-dir "binary_libs"
```

Once built and flashed to an ESP32, the application demonstrates its functionality by creating a file named `hello.txt` on the SD card and writing "Hello World!" to it. This serves as a simple smoke test to verify that the SPI communication, FatFS mounting, and file I/O operations are all functioning correctly. Users can verify the output by removing the SD card after the application runs and checking the contents on a standard PC.

### Hardware Support

This project is specifically designed for ESP32-based development boards. It is intended for use with SD card slots or external SD card modules connected via the SPI interface. By using the original Arduino ESP32 core logic, it provides a familiar API for developers transitioning from the Arduino IDE to Mongoose OS while maintaining the performance and features of the Mongoose OS ecosystem.
