---
title: LoRaWAN Test App for Apache NuttX
summary: A demonstration application for implementing LoRaWAN connectivity on the
  Apache NuttX RTOS. It provides a reference implementation for joining LoRaWAN networks
  and transmitting data using SX1262 transceivers on platforms like BL602 and ESP32.
slug: lorawan-test-app-for-apache-nuttx
codeUrl: https://github.com/lupyuen/lorawan_test
siteUrl: https://lupyuen.github.io/articles/lorawan3
star: 2
lastUpdated: '2022-06-03'
rtos: nuttx
topics:
- bl602
- bl604
- lorawan
- nuttx
- pinecone
- pinedio
- riscv32
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lora-test-app-for-semtech-sx1262-and-apache-nuttx
- rust-test-app-for-apache-nuttx-os
- tinycbor-test-app-for-apache-nuttx
- ikea-vindriktning-air-quality-sensor-for-apache-nuttx
- zephyr-lorawan-lora-examples
- zig-on-risc-v-bl602-with-apache-nuttx-rtos
---

## Overview

The LoRaWAN Test App is a specialized example designed for the Apache NuttX RTOS, providing a bridge between the NuttX ecosystem and LoRaWAN long-range wireless networking. It serves as a practical implementation of the LoRaMac-node stack, adapted specifically for the NuttX environment. The project is particularly useful for developers working with the BL602 (RISC-V) and ESP32 microcontrollers who need to implement low-power wide-area network (LPWAN) capabilities.

## Technical Architecture

The application is built upon the Semtech LoRaMac-node reference implementation, ported to run as a standard NuttX application. It leverages the NuttX SPI driver and GPIO subsystems to communicate with LoRa transceivers like the Semtech SX1262. 

One of the unique technical aspects of this implementation is its approach to entropy. For LoRaWAN to function securely, it requires a random seed for Join Nonces. This project includes logic to initialize an entropy pool by reading the internal temperature sensor of the BL602 SoC, ensuring that every device generates unique identifiers even after a hard reset or firmware flash.

## Key Features

- **Network Joining**: Supports the standard LoRaWAN Join procedure to establish connectivity with gateways.
- **Uplink Processing**: Implements a periodic uplink mechanism that sends data packets (e.g., "Hi NuttX") to the network server.
- **Event-Driven Design**: Uses an event queue to handle LoRaMAC events, MAC process notifications, and timer-based transmissions without blocking the system.
- **Multi-Platform Support**: Includes configuration steps for both RISC-V (BL602) and Xtensa (ESP32) architectures.
- **Fragmentation Support**: Includes hooks for the LoRaWAN Fragmentation protocol, allowing for large data transfers over the air.

## Implementation Details

The core logic resides in `lorawan_test_main.c`, which manages the LoRaWAN state machine. The application initializes the `LmHandler` with callbacks for battery level, temperature, and random seed generation. 

```c
// Example of preparing a LoRaWAN transmission frame
static void PrepareTxFrame( void )
{
    if (LmHandlerIsBusy()) { puts("PrepareTxFrame: Busy"); return; }

    const char msg[] = "Hi NuttX";
    printf("PrepareTxFrame: Transmit to LoRaWAN: %s (%d bytes)\n", msg, sizeof(msg));

    memcpy(AppDataBuffer, msg, sizeof(msg));
    LmHandlerAppData_t appData = {
        .Buffer = AppDataBuffer,
        .BufferSize = sizeof(msg),
        .Port = 1,
    };

    LmHandlerSend( &appData, LmHandlerParams.IsTxConfirmed );
}
```

## Getting Started

The application is designed to be integrated into the NuttX build system as a submodule within the `apps/examples` directory. Once added, it can be enabled via `make menuconfig` under the Application Configuration menu. The project depends on a specific port of the LoRaMac-node library for NuttX, which provides the underlying protocol implementation. Developers can use the provided configuration scripts to target specific boards like the `bl602evb` or `esp32-devkitc`.
