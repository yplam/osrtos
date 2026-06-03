---
title: AsynchSerial
summary: AsynchSerial is a C++ wrapper for the Mbed OS UARTSerial class that introduces
  timeout functionality for serial communication. It simplifies asynchronous data
  handling by providing callback mechanisms for both transmission and reception, making
  it easier to integrate serial I/O into event-driven Mbed applications.
codeUrl: https://github.com/pilotak/AsynchSerial
isShow: false
rtos: mbed-os
libraries: []
topics:
- mbed-os
- mbed
- uart
- serial
- asynchronous
- wrapper
- uart-interface
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- modbusmaster-for-mbed-os-6
- serialbridge
- spektrum-receiver-library-for-mbed
- murasaki
- ubxgpsi2c
- rt-rosserial-for-rt-thread
---

Managing serial communication in embedded systems often involves balancing responsiveness with reliability. In the Mbed OS ecosystem, while `UARTSerial` provides a robust foundation for buffered serial I/O, developers frequently need more granular control over timeouts and asynchronous event handling. This is where **AsynchSerial** comes in—a lightweight wrapper designed to simplify these common tasks.

### Enhancing Mbed UARTSerial

AsynchSerial is built specifically for Mbed OS, wrapping the standard `UARTSerial` class to provide a more flexible interface. Its primary contribution is the addition of timeouts, which are crucial for preventing a system from hanging while waiting for data that may never arrive due to noise, disconnection, or peripheral failure. By providing a structured way to handle these scenarios, AsynchSerial makes serial communication more predictable and easier to debug.

### Asynchronous Callbacks and Event Handling

One of the standout features of AsynchSerial is its built-in support for callbacks. In an RTOS environment like Mbed, it is often inefficient to poll a serial port for data. AsynchSerial allows developers to attach specific functions to both Receive (RX) and Transmit (TX) events. 

Because Mbed's interrupt context has strict limitations (such as not being able to perform complex I/O or blocking operations), AsynchSerial is designed to work seamlessly with the Mbed `EventQueue`. This allows developers to trigger a callback that schedules the actual data processing on a separate thread, keeping the interrupt service routine (ISR) fast and responsive.

### Implementation Example

Integrating AsynchSerial into an Mbed project is straightforward. The following example demonstrates how to set up a serial instance, attach callbacks, and use an `EventQueue` to process incoming data without blocking the main execution loop:

```cpp
#include "mbed.h"
#include "AsynchSerial.h"

// Initialize on specific pins with a baud rate of 9600
AsynchSerial serial(PD_8, PD_9, 9600);
EventQueue queue;

void getData() {
    char buffer[20];
    int16_t len = serial.read(buffer, sizeof(buffer));

    if (len > 0) {
        printf("len:%i
", len);
        for (int16_t i = 0; i < len; ++i) {
            printf("%02X ", buffer[i]);
        }
        printf("
");

        // Echo back what we received
        serial.write(buffer, len);
    }
}

void rxCb() {
    // Defer processing to the event queue to avoid ISR issues
    queue.call(getData);
}

void txCb() {
    printf("sent
");
}

int main() {
    Thread eventThread;
    eventThread.start(callback(&queue, &EventQueue::dispatch_forever));

    // Attach callbacks for RX and TX events
    serial.attach(callback(rxCb), AsynchSerial::RX);
    serial.attach(callback(txCb), AsynchSerial::TX);
    serial.init();

    while (1) {
        // Main loop remains free for other tasks
    }
}
```

### Why Use AsynchSerial?

For developers working on Mbed-based projects, AsynchSerial offers several advantages:

*   **Non-blocking Design**: By leveraging callbacks and timeouts, your application remains responsive even during heavy serial traffic.
*   **Simplified API**: It abstracts the complexities of manual buffer management and interrupt handling.
*   **RTOS Friendly**: It is built to play nicely with Mbed's threading and event dispatching models.

Whether you are building a sensor node that periodically reports data or a complex gateway device that requires reliable command-and-control via UART, AsynchSerial provides the necessary tools to handle serial data efficiently and safely.
