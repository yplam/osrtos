---
title: WIZnetInterface Library
summary: A comprehensive network stack implementation for WIZnet Ethernet controllers
  like the W5500 and W6100 on Mbed OS. It provides a standard EthInterface and NetworkStack,
  enabling embedded developers to easily integrate wired networking with TCP, UDP,
  DHCP, and DNS support.
slug: wiznetinterface-library
codeUrl: https://github.com/WIZnet-MbedEthernet/WIZnetInterface
star: 9
lastUpdated: '2020-06-24'
rtos: mbed-os
topics:
- ethernet
- ethernet-shield
- mbed
- mbed-os
- w5500
- w6100
- wiznet
- wiznetinterface
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- wiznet-freertos-sdk-for-raspberry-pi-pico-ethernet
- webserver-esp32-w5500
- esp32-enc28j60
- rp2040-hat-lwip-c
- w5500-lwip-binding-for-freertos
- webserver-esp32-enc
---

## Overview

The WIZnetInterface library is a dedicated network stack implementation for WIZnet Ethernet controllers, specifically designed for the Mbed OS ecosystem. By providing a hardware-abstracted interface for chips like the W5500 and W6100, it allows developers to utilize standard Mbed socket APIs to perform network operations. This library is essential for adding wired connectivity to Mbed-enabled microcontrollers that do not have native Ethernet MAC/PHY or for offloading the network stack to dedicated hardware.

## Key Features

The library acts as a bridge between the Mbed OS Network Interface API and the WIZnet hardware registers. Key capabilities include:

- **Full Network Stack Support**: Implements the `NetworkStack` and `EthInterface` classes, ensuring compatibility with standard Mbed `TCPSocket` and `UDPSocket` objects.
- **Hardware Offloading**: Leverages the WIZnet hardware TCP/IP stack, which handles the transport and network layers internally, reducing the CPU and memory overhead on the host microcontroller.
- **Integrated Services**: Includes built-in DHCP and DNS clients, allowing for automatic IP assignment and hostname resolution without requiring external libraries.
- **Multi-Chip Compatibility**: Supports popular WIZnet modules including the W5500 and the newer W6100 (which adds IPv6 support).
- **Thread Safety**: Utilizes Mbed OS RTOS primitives like `Mutex` and `Thread` to ensure safe concurrent access to the SPI bus and socket management.

## Technical Architecture

The core of the library is the `WIZnetInterface` class. It manages a pool of hardware sockets (typically up to 8 on WIZnet chips) and maps them to Mbed's internal socket handles. Communication with the chip is performed over a high-speed SPI interface. 

The library handles the low-level SPI transactions, register configurations, and interrupt/polling logic required to move data between the host MCU and the WIZnet buffer memory. It also manages a background thread (`thread_read_socket`) to monitor socket status and trigger callbacks when data arrives, mimicking the asynchronous behavior expected by Mbed OS.

## Configuration and Setup

Integration into an Mbed project is primarily handled through the `mbed_app.json` or `mbed_lib.json` configuration files. Developers must define the SPI pins (MOSI, MISO, SCK, CS) and the hardware reset pin. 

```json
{
    "config": {
        "sck": { "value": "SPI_SCK" },
        "cs": { "value": "SPI_CS" },
        "miso": { "value": "SPI_MISO" },
        "mosi": { "value": "SPI_MOSI" },
        "rst": { "value": "D15" },
        "interface": { "value": "W5500" }
    }
}
```

## Getting Started

Using the library follows the standard Mbed networking pattern. After instantiating the interface with the appropriate pins, the user calls `connect()`, which triggers the DHCP process. Once connected, the interface can be passed to any socket object:

```cpp
#include "WIZnetInterface.h"

WIZnetInterface eth(D11, D12, D13, D10, D9); // mosi, miso, sclk, cs, reset

int main() {
    eth.connect();
    printf("IP Address: %s\n", eth.get_ip_address());

    UDPSocket sock;
    sock.open(&eth);
    // Standard socket operations...
}
```

This seamless integration makes it a powerful tool for IoT developers building industrial gateways, sensors, or controllers that require the reliability of a wired Ethernet connection.
