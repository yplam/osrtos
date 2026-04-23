---
title: ESP32 USB over IP
summary: An enhanced USB/IP protocol implementation for the ESP32S3 that enables sharing
  physical USB devices over a network. Built on the ESP-IDF framework and lwIP stack,
  it optimizes transmission stability for peripherals like ST-Link debuggers, keyboards,
  and serial tools.
slug: esp32-usb-over-ip
codeUrl: https://github.com/psdscsv/esp32_usb_over_ip
version: 0.2.2
lastUpdated: '2026-03-31'
licenses:
- Apache-2.0
rtos: freertos
libraries:
- lwip
topics:
- esp32
- esp32-idf
- usbip-client
isShow: false
createdAt: '2026-04-23T00:38:59+00:00'
updatedAt: '2026-04-23T00:38:59+00:00'
---

The ESP32 USB over IP project brings the capability of the USB/IP protocol to the ESP32S3 microcontroller, enabling users to share physical USB devices over a network. This repository is an enhanced fork of the original `usbipdcpp_esp32` project, specifically tuned for better stability, compatibility, and performance. By leveraging the ESP32S3's native USB capabilities and the ESP-IDF framework, it transforms the SoC into a wireless USB bridge.

### Bridging the Gap with USB/IP

The core goal of the project is to allow a remote computer—typically running Windows with a USB/IP client—to interact with a USB device plugged into the ESP32S3 as if it were connected locally. This is achieved by encapsulating USB request blocks (URBs) into TCP/IP packets. While the concept is straightforward, implementation on an embedded system requires careful resource management and low-level optimization of the networking stack.

### Technical Enhancements and Performance

One of the primary focuses of this version is addressing the performance bottlenecks found in earlier implementations. The developer has significantly reduced the TCP polling interval, moving from an initial 250ms down to a mere 1ms. This change prioritizes transmission speed, drastically reducing latency for interactive devices like mice and keyboards, though it comes at the cost of higher CPU and memory overhead.

Recent updates have also tackled critical bugs, such as:
- **Bulk OUT Transmission**: Fixed issues where the default length was incorrectly set to zero, which previously hindered data flow to devices.
- **Buffer Management**: Resolved crashes caused by data packets exceeding the device's buffer size.
- **ST-Link Support**: Successfully implemented support for ST-Link debuggers, allowing for remote firmware flashing within IDEs like Keil5. While a simple flash operation might take around 30-90 seconds, it provides a functional remote debugging solution.

### Hardware and Networking

The project is designed for the ESP32S3, specifically tested on the N16R8 variant. It utilizes IO18 and IO19 for the USB data lines. To ensure the best possible performance, the project supports two networking modes:
- **Access Point (AP) Mode**: The ESP32 creates its own hotspot. This provides the lowest latency and highest throughput, with data rates reaching up to 247kb/s.
- **Station Mode**: The ESP32 connects to an existing WiFi network. This mode includes a built-in captive portal for easy configuration of WiFi credentials via a web browser.

### Current Limitations and Compatibility

While the project represents a significant step forward, it remains a work in progress. High-bandwidth devices like USB flash drives are supported but face challenges due to the ESP32's limited RAM. While directory listing works, writing large files (greater than 60kb) currently fails because of memory constraints. However, for lower-bandwidth devices like USB-to-Serial adapters, HID devices (keyboards/mice), and debug probes, the system offers a stable connection.

### Getting Started

Setting up the project requires the ESP-IDF V5.5.1 environment. Once the firmware is flashed, users can configure WiFi settings through a web-based portal at `192.168.4.1`. On the client side, a Windows machine running a standard USB/IP client is required to "attach" the remote device. 

This project serves as a robust foundation for developers looking to implement remote hardware debugging, wireless peripheral connectivity, or custom USB bridging in their embedded workflows.
