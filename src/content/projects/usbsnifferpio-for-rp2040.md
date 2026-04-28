---
title: USBSnifferPIO for RP2040
summary: A passive USB 1.1 protocol sniffer for the Raspberry Pi RP2040 that leverages
  the PIO coprocessor for high-speed signal capture. It supports Low-Speed and Full-Speed
  traffic with zero electrical interference, providing full protocol decoding and
  a structured callback API.
slug: usbsnifferpio-for-rp2040
codeUrl: https://github.com/angeloINTJ/USBSnifferPIO_RP2040
version: v1.0.0
lastUpdated: '2026-04-01'
licenses:
- MIT
rtos: ''
topics:
- arduino
- arduino-library
- dma
- dual-core
- full-speed
- hardware-accelerated
- hid
- low-speed
- nrzi
- passive-sniffer
- pio
- platformio
- protocol-analyzer
- raspberry-pi-pico
- rp2040
- usb
- usb-sniffer
isShow: true
image: /boards/raspberry-pi-pico.webp
createdAt: '2026-04-28T02:39:25+00:00'
updatedAt: '2026-04-28T02:39:25+00:00'
---

Understanding the inner workings of USB communication often requires expensive protocol analyzers or complex software setups. USBSnifferPIO_RP2040 changes this by turning a standard Raspberry Pi Pico into a high-impedance, passive USB 1.1 sniffer. By offloading timing-critical signal sampling to the RP2040’s unique PIO (Programmable I/O) blocks, this project achieves robust packet capture without interfering with the host or device.

### How It Works

The project is built on a high-performance pipeline designed to handle the rigors of 12 Mbps Full-Speed USB traffic. The process begins in the PIO state machine, where a single instruction samples the D+ and D- pins every clock cycle. To ensure reliability, the system uses 8× oversampling, allowing for robust clock recovery even with slight timing variations. 

Data is moved from the PIO FIFO to RAM using a DMA ping-pong strategy. This implementation uses a single DMA channel with manual restarts to avoid specific RP2040 hardware race conditions that can occur with chained transfers, ensuring that no samples are lost during the transition between buffers. 

Once the raw signal data is in memory, a software decoder performs the heavy lifting. It implements a full decoding pipeline, including:
- **NRZI Decoding**: Converting the Non-Return-to-Zero Inverted signals back to binary.
- **Bit Unstuffing**: Removing the extra bits inserted by the USB protocol for synchronization.
- **Framing and CRC**: Validating packets via CRC5 and CRC16 checks and identifying End-of-Packet (EOP) markers.

One notable optimization is the "fast-path" logic. When the USB bus is idle (all-J state), the decoder skips processing in O(1) time, resulting in 0% CPU usage during periods of inactivity.

### Hardware Integration

The hardware setup is remarkably simple, requiring only a few 100 Ω series resistors to interface the Pico's GPIOs with the USB differential lines. These resistors are crucial as they prevent the Pico from loading the bus impedance, maintaining the "passive" nature of the sniffer. Because the sniffer does not participate in the electrical handshake of the USB bus, the host and device remain entirely unaware of its presence.

### Dual-Core Architecture

USBSnifferPIO is designed to take full advantage of the RP2040’s dual-core processor. In a typical configuration, Core 1 is dedicated to the timing-sensitive task of capturing and decoding packets, while Core 0 handles application logic, such as printing data to a serial terminal or logging to an SD card. This separation ensures that slow I/O operations on Core 0 don't cause buffer overflows in the capture pipeline.

### Quick Start Example

The library provides a clean Callback API, making it easy to filter for specific traffic, such as HID keyboard reports:

```cpp
#include <USBSnifferPIO_RP2040.h>

USBSnifferPIO sniffer;

void onPacket(const USBPacket& pkt) {
    if (pkt.isHIDKeyboardReport()) {
        Serial.printf("Mods=0x%02X Key=0x%02X\n",
                      pkt.data[0], pkt.data[2]);
    }
}

void setup()  { Serial.begin(115200); }
void setup1() { sniffer.begin(2); sniffer.onPacket(onPacket); }
void loop()   { }
void loop1()  { sniffer.task(); }
```

### Applications and Limitations

This tool is ideal for educational purposes, security research, and hardware auditing. It allows developers to inspect HID protocol internals or debug custom USB device implementations. 

However, there are technical boundaries to consider. While it excels at USB 1.1 (1.5 Mbps and 12 Mbps), it cannot capture USB 2.0 High-Speed (480 Mbps) traffic, as that exceeds the sampling capabilities of the RP2040 PIO. Additionally, users must be mindful of the system clock; running at 12 Mbps with 8× oversampling requires a PIO clock of 96 MHz, which is most stable when the RP2040 system clock is set to 120 MHz or higher.
