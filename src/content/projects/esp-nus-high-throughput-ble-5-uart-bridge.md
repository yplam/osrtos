---
title: esp-nus — High-throughput BLE 5 UART bridge
summary: A transparent UART-to-BLE cable replacement for the ESP32-C6 that implements
  the Nordic UART Service (NUS). It is specifically optimized for high throughput
  using BLE 5 features like LE 2M PHY, Data Length Extension (DLE), and credit-based
  flow control.
slug: esp-nus-high-throughput-ble-5-uart-bridge
codeUrl: https://github.com/cycbox/esp-nus
lastUpdated: '2026-06-15'
image: /202606/esp-nus_0.avif
rtos: freertos
libraries:
- nimble
topics:
- ble
- esp32
- uart
isShow: true
createdAt: '2026-06-15T02:19:59+00:00'
updatedAt: '2026-06-15T02:19:59+00:00'
relatedProjects:
- esp32-uart-bridge
- arduino-serial-ble
- esp32-ble-uart-mx
- dshare-hid
- esp32-s3-usb-to-ble-keyboard-bridge
- esp-usb-ble-hid-bridge
---

In the world of wireless prototyping, the "wireless serial cable" is a classic utility. The **esp-nus** project provides a high-performance implementation of this concept for the ESP32-C6, leveraging the Nordic UART Service (NUS) to bridge hardware UART signals over Bluetooth Low Energy. While many BLE-UART bridges suffer from latency or low data rates, this project is specifically engineered to maximize throughput by utilizing the advanced features of the BLE 5 stack.

### High-Throughput Optimization

What sets this project apart is its focus on efficiency and speed. Most standard BLE implementations default to conservative parameters to save power, but `esp-nus` is tuned for raw performance. It achieves this through several key mechanisms:

*   **LE 2M PHY**: By using the 2Mbps physical layer, the project effectively doubles the raw air-rate compared to standard 1M PHY.
*   **Data Length Extension (DLE)**: The system requests 251-byte link-layer payloads. This ensures that large data packets aren't fragmented at the air-interface level, reducing overhead.
*   **Optimal MTU Sizing**: While it supports a preferred MTU of up to 512 bytes, it is optimized for an MTU of 247. This specific size allows a 244-byte payload to fit perfectly into a single link-layer PDU when combined with L2CAP headers, avoiding on-air fragmentation entirely.
*   **Aggressive Connection Parameters**: It requests a 7.5 ms connection interval, the minimum allowed by the BLE specification, to ensure the lowest possible latency for serial data.

### Architecture and Flow Control

The bridge is built on the ESP-IDF framework using the NimBLE stack. One of the most critical challenges in high-speed UART-to-BLE bridging is handling the mismatch between the continuous stream of UART data and the packetized nature of BLE. 

To solve this, `esp-nus` implements flow-controlled notifications using a credit pool (`NUS_TX_CREDITS`). This mechanism keeps multiple notifications pipelined to the Bluetooth controller without exhausting the memory pool. When the controller confirms a transmission via the `BLE_GAP_EVENT_NOTIFY_TX` event, credits are returned. This creates a natural backpressure system: if the BLE link cannot keep up, the UART source is throttled, preventing data loss or buffer overflows.

### NUS GATT Layout

The project implements the standard Nordic UART Service, making it compatible with a wide range of mobile apps and desktop tools that support the NUS protocol:

| Role | UUID | Properties |
|------|------|-----------|
| Service | `6E400001-B5A3-F393-E0A9-E50E24DCCA9E` | Primary |
| RX (Central → Device) | `6E400002-…` | Write, Write No Response |
| TX (Device → Central) | `6E400003-…` | Notify |

### Hardware and Configuration

While developed and tested on the ESP32-C6-DevKitC, the project is highly configurable via the ESP-IDF `menuconfig` system. Users can adjust the advertised device name, UART port numbers, and baud rates (defaulting to 921600 to match BLE throughput). 

For high-speed operation, hardware flow control (RTS/CTS) is highly recommended and supported by the driver to avoid RX overruns. The project also utilizes the ESP32-C6's ability to move the console to USB-Serial-JTAG, which frees up the primary hardware UART (UART0) specifically for the bridge application.
