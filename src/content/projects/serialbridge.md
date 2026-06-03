---
title: SerialBridge
summary: A cross-platform C++ library for UART and CAN FD serial communication between
  PCs and microcontrollers including Arduino, Mbed, and STM32. It provides a flexible
  packet-based messaging system designed for embedded systems without relying on the
  C++ Standard Template Library (STL).
slug: serialbridge
codeUrl: https://github.com/TNCT-Mechatech/SerialBridge
star: 7
version: v1.1.0-beta
lastUpdated: '2025-12-18'
rtos: mbed-os
topics:
- arduino
- comunication
- linux
- mbed-os
- stm32cubeide
- uart
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- spirit-motor-driver-library
- arduino-serial-ble
- esp32-ble-uart-mx
- arduino-dronecan
- spektrum-receiver-library-for-mbed
- uart-communication-between-nrf52840-and-stm32f401-nucleo
---

## Overview

SerialBridge is a lightweight, cross-platform communication library designed to facilitate seamless data exchange between PCs and various microcontroller units (MCUs). By abstracting the underlying hardware layer, it allows developers to implement consistent serial communication protocols across Linux, Arduino, Mbed, and STM32 platforms. The library is specifically optimized for embedded environments, utilizing a non-STL dependent C++ and C codebase to ensure compatibility with resource-constrained hardware.

## Key Features

The library's primary strength lies in its flexible packet allocation system. Instead of manually parsing byte streams, developers can define structured messages and map them to specific frame IDs. This approach significantly reduces the complexity of managing multi-node communication networks.

**Core capabilities include:**
- **Multi-Platform Support**: Native drivers for Linux (Hardware Serial), Arduino, Mbed OS (2, 5, and 6), and STM32 (HAL-based).
- **Protocol Versatility**: Supports standard UART/Serial communication as well as high-speed CAN FD.
- **Message-Centric Design**: Uses a template-based `Message` class to wrap C-style structs for easy serialization.
- **Non-STL Architecture**: Written to be portable across compilers that may not fully support the C++ Standard Template Library.

## Technical Implementation

SerialBridge operates on an abstraction called `SerialDev`. This interface allows the core logic to remain hardware-agnostic while platform-specific drivers (like `LinuxHardwareSerial` or `InoHardwareSerial`) handle the actual I/O operations. 

For CAN FD support, the library utilizes the `SB_CANFD` macro, enabling high-bandwidth communication for industrial or automotive-grade embedded projects. The messaging system uses a frame-based approach where each data type is assigned a unique ID, allowing the receiver to automatically decode incoming packets into the correct data structures.

## Getting Started

To use SerialBridge, you first define a data structure for your message and wrap it in a `sb::Message` template. This message is then registered with a `SerialBridge` instance using a unique frame ID.

### Defining a Message

```cpp
#include <Message.hpp>

typedef struct Vector3Type
{
    float x;
    float y;
    float z;
} vector3_t;

// Create the message type
typedef sb::Message<vector3_t> Vector3;
```

### Initialization and Usage

Initialization varies slightly by platform. On Arduino, for example, you pass the `Serial` object to the hardware driver:

```cpp
#include <SerialBridge.hpp>
#include <InoHardwareSerial.hpp>

SerialDev *dev = new InoHardwareSerial(&Serial);
SerialBridge serial(dev);
Vector3 msg;

void setup() {
    Serial.begin(9600);
    serial.add_frame(0, &msg); // Register message with ID 0
}

void loop() {
    serial.update(); // Process incoming data
    if (msg.was_updated()) {
        // Handle new data in msg.data.x, msg.data.y, etc.
    }
}
```

## Platform Specifics

- **Linux**: Supports device paths and symbolic links (e.g., `/dev/serial/by-path/...`), making it ideal for ROS-based robotics applications where multiple identical USB-serial converters are used.
- **Mbed**: Compatible with both the classic `Serial` API (Mbed OS 2) and the modern `BufferedSerial` API (Mbed OS 5/6).
- **STM32**: Integrates with STM32CubeIDE projects, requiring standard HAL initialization and a small configuration for the USB/UART clock.

SerialBridge is an excellent choice for developers building robotics systems, sensor networks, or any project requiring reliable, structured data transfer between a host computer and embedded hardware.
