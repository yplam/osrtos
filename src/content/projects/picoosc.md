---
title: PicoOSC
summary: A lightweight Open Sound Control (OSC) communication library for the Raspberry
  Pi Pico. It utilizes the lwIP networking stack from the Pico C++ SDK to provide
  OSC client functionality for sending messages over UDP.
slug: picoosc
codeUrl: https://github.com/madskjeldgaard/PicoOSC
star: 17
lastUpdated: '2023-05-28'
rtos: ''
libraries:
- lwip
topics:
- lwip
- open-sound-control
- osc
- raspberry-pi-pico
- raspberry-pi-pico-rp2040
- raspberry-pi-pico-sdk
- raspberry-pi-pico-w
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- asyncudp-rp2040w
- rp2040-hat-lwip-c
- rp2040-pico-w-esp8285-wifi-library
- wiznet-freertos-sdk-for-raspberry-pi-pico-ethernet
- websocket-implementation-for-raspberry-pi-pico-w
- picoshell
---

## Overview

PicoOSC is a C++ library designed to bring Open Sound Control (OSC) capabilities to the Raspberry Pi Pico. By leveraging the Lightweight IP (lwIP) stack integrated into the Raspberry Pi Pico C++ SDK, PicoOSC allows developers to send control data from their microcontrollers to any OSC-compatible software or hardware over a network. 

While primarily developed for the RP2040 platform, the library's architecture is designed with portability in mind, potentially working on other platforms that utilize the lwIP stack with minimal modifications.

## Key Features

The library currently focuses on providing a robust OSC client interface. It simplifies the process of formatting and transmitting OSC packets, which are widely used in music technology, interactive installations, and media art for high-speed, low-latency communication.

**Supported OSC Message Types:**
- **Integers (int32_t):** Standard 32-bit integer support.
- **Floats:** Standard floating-point numbers for continuous control data.
- **Strings:** Support for sending text-based messages or tags.

As a work in progress, the library aims for eventual full compatibility with the OSC 1.0 specification. Current development focuses on the client-side transmission of single-type messages, with future goals including support for OSC bundles, blobs, time tags, and a server interface for receiving messages.

## Technical Implementation

PicoOSC is built as a header-only or interface library that integrates seamlessly with CMake-based build systems. It defines two primary classes:

1.  **`picoosc::OSCClient`**: Manages the network target, including the IP address and port of the destination.
2.  **`picoosc::OSCMessage`**: Handles the construction of the OSC packet, including the address pattern and the data payload.

The library uses C++ templates to provide a clean API for adding data to messages, ensuring that the correct OSC type tags are applied automatically during packet construction.

## Usage Example

Sending data with PicoOSC is designed to be intuitive. After setting up the UDP target, a message is constructed with an address and a value before being dispatched via the client.

```cpp
// Setup UDP target
const auto target = "192.168.0.105";
const auto port = 3333;

picoosc::OSCClient client(target, port);

// Make an integer message
picoosc::OSCMessage msg;

msg.addAddress("/picoint");
msg.add<int32_t>(8); 

// Send the message
msg.send(client);
```

## Integration and Development

PicoOSC is easily integrated into existing Pico SDK projects. It supports the CPM (CMake Package Manager) for automatic dependency management, allowing developers to include the library with just a few lines in their `CMakeLists.txt`. Alternatively, it can be manually included as a subdirectory in a standard CMake project structure.

Because the project is open-source and under active development, it serves as a foundation for developers looking to implement custom OSC protocols on the Raspberry Pi Pico, whether for DIY synthesizers, lighting controllers, or IoT sensors.
