---
title: Mbed OS BLE GAP Advertiser for Arduino Nano 33 BLE
summary: A demonstration of using the Mbed OS BLE library on Arduino Nano 33 BLE hardware
  to manage multiple advertising sets. It showcases simultaneous broadcasting on both
  the legacy 1M PHY and the LE Coded PHY using an event-driven architecture.
slug: mbed-os-ble-gap-advertiser-for-arduino-nano-33-ble
codeUrl: https://github.com/tjpetz/mbed_BLE_GAP_advertiser
star: 0
lastUpdated: '2021-04-11'
rtos: mbed-os
topics:
- arduino
- ble
- bluetooth
- mbed-os
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mbed-ble-gap-scanner
- arduino-serial-ble
- develop-your-own-bluetooth-low-energy-applications
- nano33blesensor
- esp32-ble-uart-mx
- nimble-arduino
---

## Overview

The Mbed OS BLE GAP Advertiser is a specialized example project designed for the Arduino Nano 33 BLE and Arduino Nano 33 BLE Sense. It demonstrates the integration of the Mbed OS BLE library within the Arduino environment, specifically focusing on the Generic Access Profile (GAP) to manage advertising sets.

This project serves as a practical implementation guide for developers looking to leverage advanced Bluetooth Low Energy (BLE) features, such as extended advertising and multiple physical layers (PHYs), on Nordic Semiconductor nRF52840-based Arduino boards.

## Key Features

The primary objective of this project is to demonstrate the simultaneous use of multiple advertising sets. This is a powerful feature of the BLE 5.0 specification that allows a single device to broadcast different sets of data or use different transmission parameters at the same time.

**Core capabilities include:**
- **Dual Advertising Sets**: The application configures and runs two distinct advertising sets concurrently.
- **Legacy 1M PHY Support**: The first set uses the standard 1M PHY, ensuring compatibility with older BLE devices and standard scanners.
- **LE Coded PHY Support**: The second set utilizes the Coded PHY (Long Range), which provides significantly increased range at the cost of lower data rates.
- **Event-Driven Architecture**: Uses the Mbed OS `EventQueue` to manage BLE operations asynchronously, preventing blocking and ensuring system stability.

## Technical Implementation

One of the critical insights provided by this project is the handling of advertising set initialization. In Mbed OS, attempting to add multiple advertising sets in a single synchronous call can lead to failures where only the first set becomes active. 

To solve this, the project implements a queued approach using `_event_queue.call` and `_event_queue.call_in`. By staggering the initialization of the legacy and coded advertising sets, the system ensures that the BLE stack has sufficient time to process each request. 

### Hardware Compatibility

While built using the Arduino IDE (as an `.ino` file), the project relies heavily on the underlying Mbed OS layer that powers the Arduino Nano 33 BLE series. It is specifically tested on:
- Arduino Nano 33 BLE
- Arduino Nano 33 BLE Sense

## Code Example: Initializing Advertising Sets

The following snippet from the project illustrates how the event queue is used to serialize the setup of different advertising modes:

```cpp
void on_init_complete(BLE::InitializationCompleteCallbackContext *event)
{
    if (event->error) {
        print_error(event->error, "Error during the initialisation");
        return;
    }

    print_mac_address();
    
    /* All calls are serialised through the event queue to ensure proper setup */
    _event_queue.call(this, &MultipleAdvertisingSetsDemo::advertiseLegacy);
    _event_queue.call_in(250ms, this, &MultipleAdvertisingSetsDemo::advertiseCoded);
}
```

## Getting Started

To use this project, developers need the Arduino IDE with the Arduino Mbed OS Nano Boards core installed. Because the project redirects standard output to the USB Serial port, it includes a startup delay to allow users to open the Serial Monitor after a reset. This ensures that the initialization logs and MAC address information are visible during the boot sequence.
