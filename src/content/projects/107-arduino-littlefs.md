---
title: 107-Arduino-littlefs
summary: A modern C++ wrapper for the littlefs filesystem designed for the Arduino
  ecosystem. It provides a fail-safe, flash-optimized storage solution for platforms
  like the Raspberry Pi Pico and Arduino Uno R4, often used in conjunction with the
  Cyphal protocol.
codeUrl: https://github.com/107-systems/107-Arduino-littlefs
siteUrl: https://107-systems.org/
isShow: false
rtos: ''
libraries:
- littlefs
topics:
- arduino
- arduino-library
- littlefs
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- littlefs-mbed-rp2040
- arduino-littlefs-spimemory-wrapper
- littlefs-portenta-h7-library
- fs-nano33ble
- littlefs-for-esp-idf
- pico-vfs-a-virtual-file-system-for-raspberry-pi-pico
---

Managing data on embedded systems requires a filesystem that is both resilient to power failures and gentle on flash memory. `107-Arduino-littlefs` brings the power of [littlefs](https://github.com/littlefs-project/littlefs) to the Arduino environment, providing a clean C++ wrapper around the popular littlefs-v2.5.1 core. Developed by 107-systems, this library is a key component for projects requiring reliable persistent storage, particularly those utilizing the Cyphal (formerly UAVCAN) protocol.

### Why littlefs?

Standard filesystems are often too heavy or too fragile for microcontrollers. littlefs is specifically designed for embedded systems with features like:
* **Power-loss resilience**: Designed to handle unexpected power cuts without corrupting the filesystem.
* **Wear leveling**: Extends the life of flash memory by distributing writes across the storage medium.
* **Low RAM/ROM footprint**: Optimized for devices where every kilobyte counts.

### Hardware Compatibility

This library is built to support modern Arduino cores and high-performance microcontrollers. It has been verified to work with:
* **arduino-pico**: Raspberry Pi Pico, Adafruit Feather RP2040, and other RP2040-based boards.
* **ArduinoCore-renesas**: The latest generation of Arduino boards including the Portenta C33, Uno R4 WiFi, and Uno R4 Minima.

### Integration and Usage

The library abstracts the complexity of littlefs into a manageable C++ interface. To use it, developers typically define a configuration that maps filesystem operations (read, program, erase, sync) to their specific hardware driver, such as an external EEPROM or internal flash.

Below is a snippet demonstrating how the library can be interfaced with a 24LCxx series EEPROM using the `107-Arduino-24LCxx` driver:

```cpp
#include <Wire.h>
#include <107-Arduino-littlefs.h>
#include <107-Arduino-24LCxx.hpp>

static uint8_t const EEPROM_I2C_DEV_ADDR = 0x50;

static EEPROM_24LCxx eeprom(EEPROM_24LCxx_Type::LC64,
                            EEPROM_I2C_DEV_ADDR,
                            [](uint8_t const dev_addr) { Wire.beginTransmission(dev_addr); },
                            [](uint8_t const data) { Wire.write(data); },
                            []() { return Wire.endTransmission(); },
                            [](uint8_t const dev_addr, size_t const len) -> size_t { return Wire.requestFrom(dev_addr, len); },
                            []() { return Wire.available(); },
                            []() { return Wire.read(); });

static littlefs::FilesystemConfig filesystem_config
  (
    +[](const struct lfs_config *c, lfs_block_t block, lfs_off_t off, void *buffer, lfs_size_t size) -> int
    {
      eeprom.read_page((block * c->block_size) + off, (uint8_t *)buffer, size);
      return LFS_ERR_OK;
    },
    +[](const struct lfs_config *c, lfs_block_t block, lfs_off_t off, const void *buffer, lfs_size_t size) -> int
    {
      eeprom.write_page((block * c->block_size) + off, (uint8_t const *)buffer, size);
      return LFS_ERR_OK;
    },
    // Additional callbacks for erase and sync follow...
  );
```

### Part of a Larger Ecosystem

While `107-Arduino-littlefs` is a standalone filesystem library, it is part of the broader 107-systems ecosystem. It is particularly useful when implementing the Cyphal protocol via `107-Arduino-Cyphal`, where persistent storage is necessary for configuration parameters and node identification. Whether you are building a complex robotic system using Cyphal or a simple data logger, this library provides a robust foundation for your storage needs.
