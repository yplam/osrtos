---
title: Embedded Proto Mbed OS to Server Example
summary: An example project demonstrating ethernet communication between an STM32
  NUCLEO-F767ZI and a PC using Embedded Proto for Protocol Buffers. It runs on Mbed
  OS and provides a complete end-to-end implementation including a Python-based desktop
  server.
codeUrl: https://github.com/Embedded-AMS/EmbeddedProto_Example_Mbed_to_server
siteUrl: https://embeddedproto.com
isShow: false
rtos: mbed-os
libraries: []
topics:
- arm
- cortex-m
- cpp
- mbed
- mbed-os
- microcontroller
- protobuf
- stm32
- stm32cubeide
- stm32cubemx
- tcp
- tcp-server
star: 1
lastUpdated: '2023-12-14'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- transfer-files-over-ethernet-with-stm32-and-freertos
- lwip-tcp-ip-stack-on-stm32-microcontroller
- stm32h745-ethernet-with-lwip-and-freertos
- sk-mstm32f107-demo-board-example
- mender-ota-example-for-stm32l4-and-zephyr-rtos
- stm32h750b-dk-touchgfx-freertos-mqtt-example
---

Connecting embedded devices to desktop environments or cloud services often requires a robust serialization format to ensure data integrity and ease of development. This project serves as a practical demonstration of using **Embedded Proto**, an embedded-focused implementation of Google Protocol Buffers, to facilitate communication between a microcontroller and a PC over Ethernet.

### Project Overview

The repository provides a complete example of a NUCLEO-F767ZI development board (based on the ARM Cortex-M4) communicating with a Python-based server. The core logic is simple but effective: when a user presses the blue button on the Nucleo board, a protobuf-encoded message is sent via Ethernet to a listening desktop application. This setup highlights how developers can leverage Mbed OS for networking tasks while using Protocol Buffers to define structured data schemas that are easily shared between C++ and Python environments.

### Technical Architecture

The project is divided into two main components:
1.  **Microcontroller (nucleo-f767zi):** Built using Mbed OS, this side handles the hardware abstraction, Ethernet stack, and the serialization of messages using the Embedded Proto library.
2.  **Desktop (desktop):** A Python script that acts as a server, receiving and deserializing the protobuf messages sent by the hardware.

Data structures are defined in the `proto/eth_messages.proto` file, ensuring that both the embedded C++ code and the Python server have a single source of truth for the message format.

### Hardware and Software Requirements

To run this example, you will need:
- A **NUCLEO-F767ZI** board.
- An Ethernet cable connecting the board to the same network as your PC.
- **Mbed Studio** or **Mbed CLI** for building the firmware.
- **Python 3** for running the desktop server.

### Getting Started

The project includes a `setup.py` script to streamline the installation of dependencies and the generation of protobuf source code. After cloning the repository recursively to include the Embedded Proto submodule, you can initialize the environment:

```bash
python setup.py
```

This script handles the heavy lifting of copying the Embedded Proto source into the Mbed project. Once the firmware is flashed to the Nucleo board, you can start the desktop server:

```bash
cd desktop
source venv/bin/activate
python3 main.py
```

When the board is reset, the server will list the new connection. Pressing the blue user button on the Nucleo board triggers the transmission of a message, which is then displayed by the Python script. This workflow demonstrates a seamless integration between low-level hardware events and high-level data processing.
