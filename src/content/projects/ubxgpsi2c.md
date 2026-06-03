---
title: UbxGpsI2C
summary: An asynchronous I2C library for Ublox GPS modules designed for the Mbed OS
  framework. It provides a non-blocking interface for parsing UBX protocol messages,
  supporting features like odometer data, PVT (Position, Velocity, Time) updates,
  and power management configuration.
slug: ubxgpsi2c
codeUrl: https://github.com/pilotak/UbxGpsI2C
star: 6
lastUpdated: '2023-12-22'
rtos: mbed-os
topics:
- async
- gps
- gps-coordinates
- i2c
- library
- mbed
- mbed-os
- ublox
- ublox-gps
- ubx
- ubx-gps-library
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- ublox-gnss-api-for-mbed
- modbusmaster-for-mbed-os-6
- micropygps
- spektrum-receiver-library-for-mbed
- ds248x-1-wire-library
- nano33blesensor
---

## Overview

UbxGpsI2C is a specialized library for Mbed OS that facilitates asynchronous communication with Ublox GPS modules over the I2C bus. Unlike traditional synchronous drivers that block execution while waiting for data, this library leverages Mbed's callback and event-driven architecture to handle GPS data processing efficiently. It is built upon a robust UBX protocol parser, allowing developers to interact with GPS modules using the native binary format for high-performance telemetry and configuration.

## Key Features

The library is designed to be feature-rich while maintaining a small footprint suitable for embedded systems. Its core capabilities include:

- **Asynchronous I2C Operations**: Utilizes non-blocking I2C transfers to ensure the main application loop remains responsive.
- **Comprehensive UBX Parsing**: Includes a dedicated `UbxParser` class to handle the complexities of the Ublox binary protocol, including checksum verification and message framing.
- **Odometer Support**: Built-in methods to enable and retrieve data from the integrated Ublox odometer, supporting various profiles like running, cycling, and automotive.
- **Flexible Configuration**: Provides APIs to set output rates, dynamic models (e.g., stationary, pedestrian, airborne), and power management modes (Power Save Mode).
- **Diagnostic Integration**: Seamlessly integrates with `mbed-trace` for detailed debugging and logging, which can be configured through standard Mbed configuration files.

## Technical Implementation

The architecture is split into two main components: `UbxParser` and `UbxGpsI2C`. The parser handles the state machine for incoming byte streams, identifying sync characters, class IDs, and message lengths. The `UbxGpsI2C` class extends this functionality by managing the physical I2C interface and providing high-level methods for common GPS tasks.

Developers can configure the library's behavior using `mbed_lib.json`. Parameters such as RX/TX buffer sizes, I2C retry counts, and delays can be tuned to match specific hardware requirements or memory constraints.

## Getting Started

To use the library, you initialize the `UbxGpsI2C` object with the appropriate SDA and SCL pins. The library uses a callback mechanism to notify the application when new data is available for processing. Below is a basic example of how to initialize the GPS and set up an automatic PVT (Position, Velocity, Time) message update:

```cpp
#include "mbed.h"
#include "UbxGpsI2C.h"

UbxGpsI2C gps(GPS_SDA, GPS_SCL);
volatile bool read_gps = false;

void readGps() {  // ISR
    read_gps = true;
}

void gpsPVT() {
    // Process data from gps.msg.data
    printf("GPS Data Received\n");
}

int main() {
    while (!gps.init(readGps)) {
        ThisThread::sleep_for(1s);
    }

    // Request PVT messages automatically every cycle
    gps.auto_send(UbxGpsI2C::UBX_NAV, UBX_NAV_PVT, 1, gpsPVT);

    while (1) {
        if (read_gps) {
            read_gps = false;
            gps.process();
        }
        gps.poll();
    }
}
```

## Advanced Configuration

For power-sensitive applications, the library supports various Power Setup Values (PSV), ranging from full power to aggressive power-saving modes at different frequencies (1Hz to 4Hz). It also allows for permanent configuration storage in the GPS module's battery-backed RAM (BBR), Flash, or EEPROM using the `permanent_configuration` method.
