---
title: esp32-ble-uart-mx
summary: A multipurpose dual-role BLE-to-serial bridge for ESP32 microcontrollers
  that supports simultaneous peripheral and central connections. Built on the Arduino
  platform and utilizing FreeRTOS, it provides a robust communication link with features
  like automatic data fragmentation, checksums, and a command-based serial protocol.
  The project targets various ESP32 variants and includes specialized examples for
  RFID interfacing and Web BLE integration.
slug: esp32-ble-uart-mx
codeUrl: https://github.com/olegv142/esp32-ble-uart-mx
lastUpdated: '2025-05-30'
licenses:
- Unlicense
image: /202604/esp32-ble-uart-mx_0.avif
rtos: freertos
topics:
- arduino
- ble
- ble-serial
- esp32
- esp32-arduino
- mfrc522
- rfid-reader
isShow: false
createdAt: '2026-04-02T03:42:05+00:00'
updatedAt: '2026-04-02T03:42:05+00:00'
---

The **esp32-ble-uart-mx** is a versatile BLE-to-serial bridge designed for the ESP32 family. Unlike standard adapters that typically operate in a single mode, this project implements a dual-role architecture, allowing a device to act as a peripheral for a central host (like a smartphone) while simultaneously maintaining up to four connections to other peripheral devices. This flexibility makes it ideal for gathering telemetry from multiple sensors or creating bidirectional wireless links between pairs of devices.

Developed using the Arduino framework for ease of use and portability, the firmware has been validated on a range of hardware including the ESP32, ESP32-C3, ESP32-C6, and ESP32-S3. The repository provides reusable components and three primary example projects: a multipurpose adapter, a simple peripheral template, and an RFID-to-BLE bridge using the MFRC522 card reader.

## Architecture and Communication Protocol

### Device Roles
In the BLE ecosystem, devices typically function as either a peripheral (server) or a central (client). The **ble_uart_mx** adapter breaks this mold by supporting both roles simultaneously. The peripheral role provides wireless access for desktops, mobile devices, or web browsers via Web BLE, while the central role allows the adapter to initiate connections to other peripherals using their 6-byte MAC addresses.


### Serial Protocol
Communication between the host and the adapter occurs over a serial link using a specific messaging structure. Each message is framed by start and end markers. When using hardware UART, these are represented by byte values `1` and `0`, respectively. For USB CDC connections, the new line symbol acts as the terminator to simplify terminal-based interaction. 

Messages include a type identifier following the start marker. Digits `0..3` designate target peripheral connections, `>` indicates data for the connected central device, and `#` marks commands for system operations such as resetting, connecting to specific addresses, or controlling onboard NeoPixel LEDs.

## Protocol Variants and Data Integrity

To meet diverse application needs, the communication protocol can be extended through several compile-time options:

*   **Binary Data Encoding:** To prevent binary data from conflicting with protocol markers (like the `0` byte), the system can encode data into Base64, prepended with an encoding marker.
*   **Extended Data Frames:** This feature adds sequence numbers and cumulative checksums. It allows for transparent fragmentation of large data frames (up to 8400 bytes by default), ensuring that large payloads are delivered reliably across the radio link.
*   **Stream Tags:** To combat data loss in serial links lacking hardware flow control, stream tags can be added to messages. These tags use incrementing sequence numbers to help the host detect dropped or corrupted frames.

![Stream tags protocol structure](/202604/esp32-ble-uart-mx_2.avif)

### Reliability and Design Philosophy
A key design decision was the move away from "transparent" data streams in favor of packet-based communication. Because the BLE stack does not inherently guarantee delivery or atomicity, a packet-based approach with internal checksums is significantly more reliable. The adapter handles the complexities of splitting and merging data, providing a more stable abstraction for the user application.

## Hardware and Performance

### Power Consumption
Power efficiency varies across the ESP32 family. Testing shows that the ESP32-H2 offers the lowest idle consumption (approx. 27mA), while the ESP32-S3 sits at the higher end (approx. 93mA at max frequency). Under load, such as a central device managing three active connections, consumption increases moderately. Lowering the CPU frequency to 80MHz can reduce power usage by roughly 10-20%, though this may increase the risk of data loss during high-throughput BLE operations.

### Communication Range and Antenna Modifications
Standard ESP32 modules with chip antennas typically achieve a range of about 10 meters. However, hardware layout issues on some compact boards, like the ESP32-C3 Super Mini, can severely limit performance. The project demonstrates that by rotating the chip antenna 90 degrees or replacing it with a 30mm (1/4 wavelength) wire, the range can be extended to 100 meters or more.

![Improved chip antenna orientation](/202604/esp32-ble-uart-mx_4.avif)

![Wire antenna modification](/202604/esp32-ble-uart-mx_5.avif)

For maximum range, users can remove the onboard chip antenna and solder an external monopole antenna, which has demonstrated stable performance at distances exceeding 150 meters in open environments.
