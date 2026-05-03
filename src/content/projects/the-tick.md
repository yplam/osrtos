---
title: The Tick
summary: The Tick is an ESP32-C3-based covert access control implant designed to intercept,
  log, and replay credentials across Wiegand, Magstripe Clock&Data, and OSDP protocols.
  It features a robust hardware design with integrated level shifting and a high-efficiency
  DC-DC converter, supported by a modular software stack utilizing NimBLE for Bluetooth
  and a custom HTTP interface for remote management.
slug: the-tick
codeUrl: https://github.com/jkramarz/TheTick
version: hardware-v0.2A
lastUpdated: '2025-09-08'
licenses:
- GPL-3.0
image: /202605/TheTick_0.avif
rtos: freertos
libraries:
- nimble
- spiffs
topics:
- access-control
- esp32
- facility-security
- kicad
- redteam
- wiegand
isShow: true
createdAt: '2026-05-01T00:13:56+00:00'
updatedAt: '2026-05-01T00:13:56+00:00'
---

**The Tick** represents a significant evolution in covert access control system implants. Designed to be installed seamlessly behind card readers, it silently intercepts, logs, and replays access credentials. It provides security auditors and red teamers with a compact and flexible tool for investigating facility security through advanced credential injection and protocol sniffing.

## Comparison to Other Tools
Compared to predecessors like BLEKey or ESPKey, The Tick offers broader protocol support and more robust hardware. While earlier tools were often limited to Wiegand and 5V data lines, The Tick supports Wiegand, Magstripe Clock&Data, and OSDP. It utilizes the modern ESP32-C3 SoC, providing both BLE and WiFi connectivity, and can handle power supplies up to 25V DC with data lines up to 16V.

## Hardware Evolution
The hardware is developed using KiCad and has undergone several revisions to optimize assembly and reliability. Each revision represents a step toward better field-readiness and easier maintenance.

### Revision 0.2
![the device revision 0.2 placed on the back side of a small RFID reader](/202605/TheTick_1.avif)
This is the current production revision, featuring purple rectangular boards and an RS485 transceiver in a hand-solderable SOIC-8 package. It utilizes larger KYOCERA AVX 9176-000 connectors suitable for common wire gauges and includes an automatic power-source switching circuit for more foolproof operation.

### Earlier Revisions
*   **Revision 0.1**: The initial release used a square PCB with a QFN16 RS485 transceiver. It was famously used in technical demonstrations at Black Hat Asia 2025.
*   **Revision 0.0**: A proof-of-concept build using an ESP32-C3, discrete level converters, and an RS485 transceiver on a prototype layout.

## Software and Features
The firmware began as a port of ESPKey but has evolved into an extensible multi-protocol suite. It is built using the Arduino framework but optimized for PlatformIO to manage its modular feature flags.

### Communication and Protocols
The device supports multiple sniffing and transmission modes:
*   **Wiegand**: Sniffs and transmits messages of any length, with configurable D0/D1 line assignments.
*   **Clock&Data**: Supports Magstripe and UNITEK-emulation modes, tested on 12V systems.
*   **OSDP**: Operates in Peripheral Device (PD) mode, allowing card numbers to be transmitted via HTTP or BLE.

### Management Interfaces
Users can interact with the device through two primary wireless methods:

**HTTP Interface**
![wiegand interface screenshot](/202605/TheTick_4.avif)
When built with web support, the device hosts a jQuery and Bootstrap-based UI. This allows for real-time review of sniffed interactions, modification of configuration files, and replaying acquired credentials or sending arbitrary card numbers.

**BLE Interface**
The device exposes a custom Bluetooth Low Energy service. It allows for reading the last sniffed card and receiving notifications of new interactions. By default, the interface requires bonding with a pre-configured passkey for security.

## Technical Hardware Design
The Tick is designed for high efficiency and minimal heat dissipation, avoiding linear regulators in favor of advanced PMICs.

### Power Management
![dc dc converter schematics](/202605/TheTick_6.avif)
The device utilizes synchronous buck converters (LMR51430 or TPS54202) capable of handling up to 24V-powered readers. It includes reverse polarity protection and a battery overdischarge protection circuit that shuts down the DC-DC converter if the voltage drops below approximately 6V, making it safe for 2S LiPo battery operation.

### Level Shifting and Transceivers
Input protection and signaling are handled by a bi-directional level shifter derived from the Philips AN97055 design. This allows the device to work across various external pull-up voltages (5V to 12V+) common in access control systems. For OSDP support, a THVD1410/2410 transceiver handles half-duplex RS-485 communication, configured for high impedance when not in use to prevent interference with existing bus traffic.
