---
title: OneWireNg
summary: A comprehensive 1-wire service library for embedded systems, providing an
  advanced alternative to the classic OneWire library. It supports features like overdrive
  mode, parasite powering, and search filtering across multiple frameworks including
  Arduino, ESP-IDF, Pico SDK, and Mbed OS.
slug: onewireng
codeUrl: https://github.com/pstolarz/OneWireNg
star: 100
version: 0.14.1
lastUpdated: '2025-11-19'
rtos: mbed-os
topics:
- 1-wire
- arduino
- avr
- ds18b20
- esp32
- esp8266
- iot
- mbed-os
- one-wire
- pico
- platformio
- rp2040
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- ds248x-1-wire-library
- supladevice-library
- doubleresetdetector-generic
- timezone-generic-library
- multiresetdetector-generic-library
- spirit-motor-driver-library
---

OneWireNg is a modern, feature-rich 1-wire service library designed for a broad spectrum of embedded platforms. It serves as a robust alternative to the classic OneWire library, offering enhanced functionality and a flexible architecture that caters to both hobbyist Arduino projects and professional industrial applications using ESP-IDF, Pico SDK, or Mbed OS.

At its core, OneWireNg is built to respect the open-drain nature of the 1-wire protocol. Unlike simpler implementations that might inadvertently drive the bus high, OneWireNg ensures that the master MCU GPIO is switched to reading mode to allow the pull-up resistor to pull the state high, preventing potential hardware conflicts and ensuring protocol compliance.

## Key Features and Capabilities

One of the standout features of OneWireNg is its support for Overdrive mode. This high-speed communication mode can increase data transfer rates by a factor of ten, which is critical for timing-sensitive applications or devices like the DS2431. Achieving this requires extremely precise bit-banging timings, which the library manages through various platform-specific implementations, including CPU cycle counters for high-frequency MCUs.

The library also excels in complex bus management. It includes advanced search filtering, allowing developers to scan the bus for specific family codes efficiently. This is particularly useful in environments with many different types of 1-wire sensors. Furthermore, it provides comprehensive support for parasite powering. It can handle both direct GPIO powering and setups involving an external switching transistor, providing the necessary energy for slaves during temperature conversions or EEPROM writes.

## Extensive Platform Support

OneWireNg is designed with a clear and flexible architecture that allows for easy porting. Currently, it supports an impressive range of hardware and frameworks:

- **Arduino**: Support for AVR, megaAVR, SAM, SAMD, and STM32.
- **Espressif**: Full support for ESP8266 and the entire ESP32 family (classic, S, C, H, and P) via both Arduino and ESP-IDF.
- **Raspberry Pi Pico**: Support for the RP2040 via the Pico SDK, utilizing both standard bit-banging and the unique PIO (Programmable I/O) peripheral.
- **Mbed OS**: Experimental support for Mbed-enabled platforms like the NUCLEO-L552ZE-Q.

For RP2040 users, the `OneWireNg_PicoRP2040PIO` driver is particularly noteworthy. It leverages the RP2040's PIO state machines to offload timing-critical 1-wire tasks from the main CPU cores, allowing a single MCU to control multiple 1-wire buses simultaneously with high precision.

## Architecture and Compatibility

The library is organized around the `OneWireNg` base class, which provides the public interface for 1-wire services. Platform-specific details are handled by derived classes, such as `OneWireNg_BitBang` or specific platform implementations like `OneWireNg_ArduinoAVR`. This abstraction allows developers to write platform-independent code for interacting with 1-wire devices.

To facilitate easy migration, OneWireNg includes a compatibility interface that mimics the original OneWire API. This allows developers to drop OneWireNg into existing projects with minimal code changes while gaining access to its more mature feature set, such as search filtering and touch support.

## Getting Started

Integrating OneWireNg into a project is straightforward. For Arduino users, it can be used like any other library. For ESP-IDF or Pico SDK users, it can be added as a git submodule and integrated into the build system via CMake or Kconfig.

```cpp
#include "OneWireNg_CurrentPlatform.h"

static OneWireNg *ow = NULL;

void setup()
{
    OneWireNg::Id id;
    // Initialize on pin 10 using the detected platform driver
    ow = new OneWireNg_CurrentPlatform(10);

    ow->searchReset();
    while (ow->search(id) == OneWireNg::EC_MORE) {
        // 'id' contains the 1-wire address of a connected slave
    }
}
```

Whether you are building a simple temperature logger or a complex industrial sensor network, OneWireNg provides the tools necessary for reliable 1-wire communication across the most popular modern microcontrollers.
