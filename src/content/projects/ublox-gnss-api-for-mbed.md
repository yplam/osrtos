---
title: Ublox GNSS API for Mbed
summary: A C++ API for communicating with u-blox GNSS chips, specifically the ZOE-M2B
  on Mbed-enabled boards like the C030-R412M. It supports both NMEA and UBX protocols,
  providing methods for power management, message parsing, and advanced configuration.
slug: ublox-gnss-api-for-mbed
codeUrl: https://github.com/phlegx/gnss
siteUrl: https://os.mbed.com/platforms/ublox-C030-R412M/
star: 1
lastUpdated: '2022-03-16'
rtos: mbed-os
topics:
- c030
- embedded
- gnss
- mbed
- mbed-os
- r412m
- ublox
- ublox-gps
- zoe-m8b
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- ubxgpsi2c
- ds248x-1-wire-library
- spektrum-receiver-library-for-mbed
- ltc68xx-battery-monitoring-library-for-mongoose-os
- serialbridge
- mbed-cellular-boilerplate
---

## Overview

The Ublox GNSS library provides a robust C++ API for communicating with u-blox GNSS modules, with a primary focus on the ZOE-M2B chip found on the u-blox C030-R412M development board. Originally derived from the u-blox C027 Support library, this implementation has been reworked and adapted to integrate seamlessly with the modern Mbed Cellular API and Mbed OS environment.

The library abstracts the complexities of serial communication and protocol parsing, allowing developers to interact with the GNSS receiver using high-level commands. It is designed to handle the dual-protocol nature of u-blox chips, supporting both the standard NMEA strings and the proprietary, high-efficiency UBX binary protocol.

## Key Features

### Dual Protocol Support
The core of the library is the `GnssParser` class, which implements a state-machine-based parser capable of identifying and extracting messages from a shared serial stream. 
- **NMEA Protocol:** Standardized GPS data strings. The library includes utilities to find specific items within NMEA sentences and convert them to usable data types (doubles, integers, or angles).
- **UBX Protocol:** A binary protocol used for advanced configuration and high-frequency data. The library supports decoding various UBX messages including `NAV-PVT` (Position, Velocity, Time), `NAV-ODO` (Odometer), and `NAV-SAT` (Satellite status).

### Power Management
Efficient power usage is critical for embedded GNSS applications. This library provides multiple levels of power control:
- **Software Power Off:** Puts the GNSS chip into backup mode using the `UBX-RXM-LPREQ` command.
- **Hardware Cut-off:** Disables the physical enable pin to completely remove power from the module.
- **Power Mode Configuration:** Supports various power modes such as Semi-Continuous, Aggressive Continuous, and Full Power through the `GnssOperations` class.

### Advanced GNSS Operations
Beyond simple coordinate retrieval, the library enables advanced features of the u-blox hardware:
- **Odometer Support:** Enable and retrieve distance data directly from the chip's internal odometer.
- **Batch Logging:** Configure the chip to batch data internally and retrieve it in chunks, reducing the wake-time of the host MCU.
- **Navigation Configuration:** Fine-tune navigation settings, including accuracy masks and dynamic platforms.

## Technical Implementation

The library utilizes a `SerialPipe` architecture to handle asynchronous data reception. By using a ring buffer (pipe), the parser can process incoming bytes without blocking the main application thread. This is particularly important when dealing with high-frequency GNSS updates or when the MCU is busy with cellular communication.

```cpp
// Example: Initializing the GNSS module
GnssSerial gnss;
if (gnss.init()) {
    printf("GNSS initialized successfully.\n");
}

// Example: Reading a message
char buffer[256];
int length = gnss.getMessage(buffer, sizeof(buffer));
if (length > 0) {
    if (PROTOCOL(length) == GnssParser::NMEA) {
        // Handle NMEA message
    } else if (PROTOCOL(length) == GnssParser::UBX) {
        // Handle UBX message
    }
}
```

## Hardware Compatibility

While specifically optimized for the **u-blox C030-R412M** board, the library maintains legacy support for the **C027** platform. It uses Mbed's `DigitalInOut` and `Serial` abstractions, making it portable to other Mbed-enabled hardware that utilizes u-blox GNSS modules via UART. The library automatically handles pin mapping for supported boards through preprocessor macros, ensuring that the correct enable and communication pins are used for the target platform.
