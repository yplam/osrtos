---
title: Mbed Cellular Boilerplate
summary: A robust boilerplate for Mbed OS applications using uBlox cellular modems.
  It implements automatic reconnection logic, event-driven modem management, and basic
  SMS and TCP socket functionality.
slug: mbed-cellular-boilerplate
codeUrl: https://github.com/pilotak/mbed-cellular-boilerplate
star: 1
lastUpdated: '2020-11-26'
rtos: mbed-os
topics:
- autoreconnect
- cellular
- mbed
- mbed-os
- modem
- ublox
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mbed-os-wifi-sample-with-esp8266
- avnet-wnc14a2a-cellular-driver
- pelion-device-management-client-example-for-mbed-os
- quectel-gsm-lte-modem-driver
- pppos-example-for-mongoose-os
- ppp-device-for-rt-thread
---

Connecting embedded devices to cellular networks often involves managing complex state machines, handling unexpected disconnections, and interfacing with specific modem hardware. The Mbed Cellular Boilerplate project provides a solid foundation for building reliable cellular applications using Mbed OS and uBlox modems.

## Overview

This project serves as a template for developers looking to implement cellular connectivity with a focus on stability. It abstracts the complexities of the Mbed OS Cellular API into a manageable structure, providing built-in logic for modem initialization, network registration, and automatic reconnection. By utilizing an event-driven architecture, the boilerplate ensures that the main application thread remains responsive while network operations occur in the background.

## Key Features

- **Automatic Reconnection**: Implements a retry mechanism using an `EventQueue` to ensure the device attempts to reconnect to the network if the connection is lost.
- **Custom Modem Control**: Includes a specialized `myUblox` class that extends the standard `UBLOX_AT` driver, allowing for fine-grained control over hardware reset and power-on pins.
- **Event-Driven Architecture**: Leverages Mbed's `EventQueue` and `Thread` to handle modem callbacks and network events without blocking the main loop.
- **SMS Integration**: Provides a ready-to-use SMS setup and read handler, demonstrating how to receive and process text messages.
- **TCP Socket Example**: Includes a server communication example that performs a DNS lookup and a simple TCP echo test to verify end-to-end connectivity.

## Technical Implementation

The core logic is split across several header files, each focusing on a specific aspect of the cellular stack:

- **`mdm.h`**: Manages the `CellularContext` and handles network status callbacks. It tracks registration status (Home, Roaming, etc.) and triggers reconnection logic when the connection drops.
- **`myModem.h`**: Defines the hardware interface. It specifies the UART pins (TX, RX, RTS, CTS) and implements the `hard_power_on` and `soft_power_on` sequences required for uBlox modules.
- **`sms.h` and `server.h`**: These modules demonstrate how to use the established cellular link for practical tasks like reading SMS messages or sending data over a TCP socket.

### Event Handling

The project makes extensive use of the `nsapi_event_t` system. When the modem state changes—such as moving from 'Searching' to 'Registered'—the `mdmCb` function processes these events. If a fatal error occurs or the connection is lost, the system can automatically reset the MCU or restart the modem sequence to recover.

## Getting Started

The project is configured via `mbed_app.json`, where users can set their APN, SIM PIN, and debug trace levels. The `main.cpp` file initializes the system and starts the event queue thread:

```cpp
int main() {
    trace_init();
    Thread eQueueThread;

    if (eQueueThread.start(callback(&eQueue, &EventQueue::dispatch_forever)) != osOK) {
        debug("eQueueThread error\n");
        return 0;
    }

    mdmSetup();

    while (1) {
        ThisThread::sleep_for(500ms);
        led = !led;
        // Logic to check if tasks are complete
    }
}
```

This structure allows developers to focus on their specific application logic while the boilerplate handles the underlying cellular maintenance. It is particularly useful for IoT prototypes and industrial gateways where cellular uptime is critical.
