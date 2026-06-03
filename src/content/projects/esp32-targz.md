---
title: ESP32-targz
summary: A comprehensive Arduino library for ESP32, ESP8266, and RP2040 that enables
  handling of .tar, .gz, and .tar.gz files. It supports compression, decompression,
  and streaming across various filesystems and network protocols, including specialized
  features for OTA firmware updates from compressed archives.
codeUrl: https://github.com/tobozo/ESP32-targz
isShow: false
rtos: ''
libraries:
- littlefs
- spiffs
topics:
- arduino
- arduino-library
- esp32
- esp8266
- gz
- rp2040
- rp2040-zero
- rp2040w
- spiffs
- tar
- tgz
- uncompress
- untar
- uzlib
- zlib
star: 140
version: v1.2.9
lastUpdated: '2025-08-17'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- zlib-compression-and-decompression-for-esp-idf
- bleota-esp32-ota-updates-over-ble
- esp-fs-webserver
- esp32-ota-firmware-update-and-file-management
- esp8266sdupdater
- timezone-generic-library
---

Managing files on embedded systems often involves a delicate balance between storage capacity and data transfer speeds. The ESP32-targz library provides a robust solution for developers working with ESP32, ESP8266, or RP2040 microcontrollers who need to handle compressed archives. By bridging the gap between filesystems and compression formats, this library allows for the efficient storage and transmission of data using standard .tar and .gz formats.

### Core Capabilities
ESP32-targz is built upon two well-regarded projects: `uzlib` for DEFLATE/zlib/gzip logic and `TinyUntar` for handling the Tape Archive (TAR) format. The library enables a wide range of operations, including:
- **Compression**: Creating `.gz` files from buffers or streams, and packing folders into `.tar.gz` archives.
- **Decompression**: Expanding `.tar.gz`, `.tgz`, or `.gz` files directly to a filesystem.
- **Streaming**: Channeling data from HTTP, HTTPS, or even UDP streams directly into the decompression engine, which is particularly useful for OTA updates.
- **OTA Updates**: Flashing firmware or filesystem partitions directly from compressed `.gz` or `.tar.gz` files, saving significant bandwidth and storage space.

### Hardware and Filesystem Support
The library is designed to be flexible across the Arduino ecosystem. It supports a variety of filesystems including SPIFFS (though LittleFS is recommended), SD cards, SD_MMC, and FFat. The support matrix covers the most popular Espressif and Raspberry Pi Silicon chips:
- **ESP32**: Full support for all filesystems and advanced streaming features.
- **ESP8266**: Support for LittleFS and SD, though users must be mindful of the 32KB RAM requirement for the gzip dictionary in complex scenarios.
- **RP2040**: Support via the Earle Philhower core for LittleFS and SD.

### Practical Implementation
Using the library typically involves defining a destination filesystem and then utilizing one of the specialized unpacker classes. For example, to expand a `.tar.gz` archive, a developer would use the `TarGzUnpacker` class. The library uses a callback system to provide progress updates and logging, making it easy to integrate into UI-driven applications.

```c
#define DEST_FS_USES_LITTLEFS
#include <ESP32-targz.h>

void setup() {
    tarGzFS.begin();
    TarGzUnpacker *TARGZUnpacker = new TarGzUnpacker();

    // Set up progress and logging
    TARGZUnpacker->setGzProgressCallback(BaseUnpacker::defaultProgressCallback);
    TARGZUnpacker->setLoggerCallback(BaseUnpacker::targzPrintLoggerCallback);

    // Expand archive to the /tmp folder
    if(!TARGZUnpacker->tarGzExpander(tarGzFS, "/data.tar.gz", tarGzFS, "/tmp")) {
        Serial.printf("Expansion failed: %d
", TARGZUnpacker->tarGzGetError());
    }
}
```

### Advanced Features: OTA and Streaming
One of the most powerful features of ESP32-targz is the `gzStreamUpdater`. This allows a device to download a compressed firmware update and flash it on the fly without ever needing to store the uncompressed binary on the local filesystem. This is a game-changer for devices with limited internal flash. Similarly, the `tarGzStreamExpander` can extract multiple files from a web stream directly to an SD card or LittleFS partition.

### Memory Management and Trade-offs
Compression on microcontrollers is resource-intensive. ESP32-targz offers a trade-off: while gzip can work without a dictionary to save ~36KB of RAM, doing so results in significant performance slowdowns. The library is optimized to use `TinyUntar`, which requires only 512 bytes of memory, ensuring that the TAR handling portion of the process remains lightweight. Developers should be aware that while the library is highly capable, operations like `tarGzExpander` without an intermediate file can be heap-intensive, especially on the ESP8266.
