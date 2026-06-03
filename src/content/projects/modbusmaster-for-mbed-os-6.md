---
title: ModbusMaster for Mbed OS 6
summary: An asynchronous Modbus-RTU library for Mbed OS 6 that provides non-blocking
  communication using EventQueues. It supports standard Modbus functions for reading
  and writing coils and registers, with built-in support for RS485 direction control
  and custom frame handling.
slug: modbusmaster-for-mbed-os-6
codeUrl: https://github.com/akiroz/Mbed-ModbusMaster
star: 4
lastUpdated: '2022-12-06'
rtos: mbed-os
topics:
- coils
- mbed
- mbed-os
- mbed-os5
- mbed-os6
- mcu
- modbus-read
- modbusmaster
- register
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- ubxgpsi2c
- uc-modbus-for-rt-thread
- spektrum-receiver-library-for-mbed
- embeddedmqttbroker
- spirit-motor-driver-library
- asynchttpsrequest-esp32-ethernet
---

## Overview

ModbusMaster is an asynchronous Modbus-RTU library specifically designed for Mbed OS 6. Inspired by the widely-used Arduino ModbusMaster library by 4-20ma, this implementation brings modern asynchronous patterns to the Mbed ecosystem. It allows developers to handle Modbus communication without blocking the main execution thread, leveraging Mbed's `EventQueue` to process responses safely outside of Interrupt Service Routine (IRQ) contexts.

## Key Features and Capabilities

The library is built to be flexible and robust for industrial and embedded applications. By using C++ templates, it allows users to define transmit and receive buffer sizes at compile-time, optimizing memory usage for specific hardware constraints.

**Core functionalities include:**
- **Standard Modbus Functions**: Full support for reading coils, discrete inputs, holding registers, and input registers, as well as writing single or multiple coils and registers.
- **Asynchronous Architecture**: Uses `EventQueue` for non-blocking operation, making it ideal for complex RTOS-based applications where timing is critical.
- **RS485 Support**: Includes pre-transmit and post-transmit hooks, which are essential for toggling Data Enable (DE) and Receiver Enable (RE) pins on RS485 transceivers.
- **Customizable Frame Handling**: A unique `attachPostReceive` callback allows developers to modify received frames before CRC calculation, providing a workaround for slave devices with non-standard protocol implementations.
- **Configurable Reliability**: Users can toggle CRC checks and set custom response timeouts using `std::chrono` durations.

## Technical Implementation

The library integrates deeply with Mbed OS 6 features. It utilizes `PinName` for hardware abstraction and `std::chrono::milliseconds` for precise timing. The use of callbacks for results ensures that the application logic remains decoupled from the low-level serial communication.

### Example Usage

Setting up a Modbus master instance involves defining the buffer sizes and providing the necessary hardware pins and event queue:

```cpp
#include <mbed.h>
#include <ModbusMaster.h>

// Define buffer sizes via template
typedef ModbusMaster<16, 32> MBM;

EventQueue queue;
MBM modbus(&queue, PA_2, PA_3, 115200, 1);

int main() {
    // Asynchronously read holding registers
    modbus.readHoldingRegisters(1, 4, [](auto res){
        if(res != MBM::Result::success) {
            // Handle error
        } else {
            uint16_t* reg = modbus.getRegisters();
            // Process register values (reg[0] to reg[3])
        }
    });
    
    queue.dispatch_forever();
    return 0;
}
```

## Getting Started

To use ModbusMaster, you need an Mbed OS 6 project. The library is configured via a `library.json` file, making it compatible with build systems like PlatformIO. When initializing the `ModbusMaster` object, you must provide a pointer to an `EventQueue`. This queue is responsible for dispatching the completion callbacks, ensuring that your data processing happens in a thread-safe manner. 

For hardware setups requiring RS485, remember to use the `attachPreTransmit` and `attachPostTransmit` methods to manage your transceiver's direction pins. This ensures the bus is correctly driven during transmission and released for reception.
