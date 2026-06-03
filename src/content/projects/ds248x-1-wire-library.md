---
title: DS248X 1-Wire Library
summary: A C++ library for Mbed OS designed to interface with DS2484 and DS2482 series
  I2C-to-1-Wire bridge controllers. It provides a comprehensive API for managing 1-Wire
  buses, including device discovery, ROM selection, and support for parasitic power
  modes.
codeUrl: https://github.com/pilotak/DS248X
isShow: false
rtos: mbed-os
libraries: []
topics:
- 1-wire
- ds18b20
- ds18s20
- ds2482-100
- ds2482-800
- ds2484
- mbed
- mbed-os
- onewire
star: 4
lastUpdated: '2023-08-07'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- onewireng
- spektrum-receiver-library-for-mbed
- spirit-motor-driver-library
- cr95hf-mbed-library
- wiznetinterface-library
- ublox-gnss-api-for-mbed
---

The DS248X library is a specialized driver for Mbed OS that simplifies the integration of 1-Wire devices into embedded systems. By utilizing I2C-to-1-Wire bridge chips like the DS2484 or the DS2482 series, developers can offload the timing-critical 1-Wire protocol requirements from the main microcontroller to dedicated hardware. This is particularly useful in complex RTOS environments where strict timing for bit-banging 1-Wire can be difficult to maintain.

### Supported Hardware
This library is compatible with several popular bridge ICs:
- **DS2484**: A single-channel I2C to 1-Wire bridge with adjustable timing and sleep mode.
- **DS2482-100**: A standard single-channel 1-Wire master.
- **DS2482-800**: An eight-channel version, allowing for extensive 1-Wire networks managed through a single I2C interface.

### Core Functionality
The library provides a clean C++ interface to perform standard 1-Wire operations. Beyond simple resets and bit writes, it includes robust support for the 1-Wire search algorithm, allowing the host to discover the unique 64-bit ROM IDs of all connected devices. It also handles configuration settings such as Active Pull-Up, which improves signal integrity on long wires or heavily loaded buses.

### Getting Started
To use the library, you simply need to initialize the `DS248X` object with your I2C pins. The library handles the low-level I2C transactions required to communicate with the bridge chip.

```cpp
#include "mbed.h"
#include "DS248X.h"

DS248X oneWire(I2C_SDA, I2C_SCL);

int main() {
    if (!oneWire.init()) {
        debug("Init failed
");
        return 0;
    }

    // Check if any device is present on the bus
    debug("At least one device on the bus: %u
", oneWire.reset());

    return 0;
}
```

### Advanced Features and Error Handling
One of the standout features of this library is its callback system for error handling. By attaching a callback function, your application can respond to specific bus conditions such as short circuits, reset conditions, or instances where the bridge device itself needs a hardware reset.

For applications involving temperature sensing, the library provides the necessary primitives to interact with sensors like the DS18B20. It supports writing and reading bytes with optional Strong Pull-Up (SPU), which is essential for sensors operating in parasitic power mode during high-current operations like temperature conversions or EEPROM writes.

### Example: Searching the Bus
Searching for multiple devices is straightforward using the `search()` and `resetSearch()` methods. This allows for dynamic discovery of sensors without hardcoding ROM addresses into your firmware.

```cpp
char rom[8];
while (oneWire.search(rom)) {
    debug("Found device: ");
    for (size_t i = 0; i < sizeof(rom); i++) {
        debug("%02X", rom[i]);
    }
    debug("
");
}
oneWire.resetSearch();
```

### Integration with Mbed OS
The library is designed to play well with the Mbed ecosystem. It can either instantiate its own I2C object or accept a pointer to an existing `I2C` instance, allowing you to share the I2C bus with other peripherals efficiently. Its use of `ThisThread::sleep_for` and standard Mbed debugging tools makes it a natural fit for modern Mbed OS 6 applications.
