---
title: okhi - Open Keylogger Hardware Implant
summary: okhi is an open-source hardware implant designed to sniff and log keystrokes
  from USB and PS2 keyboards. It utilizes an RP2040 microcontroller for data parsing
  and an ESP32-C2 (ESP8684) for real-time WiFi transmission to a web interface. The
  project features advanced hardware design choices like TCXO oscillators and custom
  PIO programs to handle non-standard keyboard signals.
slug: okhi-open-keylogger-hardware-implant
codeUrl: https://github.com/therealdreg/okhi
siteUrl: https://rootkit.es/
version: v3
lastUpdated: '2025-10-30'
licenses:
- MIT
image: /202604/okhi_0.avif
rtos: freertos
topics:
- educational-project
- esp
- espressif
- hacking-tool
- hardware
- hardware-hacking
- implant
- keylogger
- open-hardware
- pentesting
- pi-pico
- pico
- pico-sdk
- ps2
- ps2-keyboard
- ps2-keyboard-libraries
- raspberry
- rp2040
- usb
- usb-hacking
isShow: true
createdAt: '2026-04-06T00:39:29+00:00'
updatedAt: '2026-04-06T00:39:29+00:00'
---

okhi is a hardware implant designed to log keystrokes from USB and PS2 keyboards. It is engineered to be easily concealable within a keyboard housing, laptop, or desktop tower, drawing its power directly from the keyboard's internal cable. Once installed, the implant provides real-time viewing of keystrokes via a WiFi-enabled web interface.


### Technical Core and Architecture

The system is built on a dual-processor architecture consisting of the Raspberry Pi RP2040 and the Espressif ESP32-C2 (specifically the ESP8684). The RP2040 handles the critical task of sniffing and parsing keyboard data, leveraging its Programmable I/O (PIO) blocks for high-efficiency signal processing. The ESP32-C2, a RISC-V single-core chip, manages the WiFi connectivity and hosts the web server for data transmission. This chip choice offers a modern, cost-effective alternative to the older ESP8266, providing Wi-Fi 4 and Bluetooth 5 (LE) in a compact form factor.

### Hardware Implementation and Installation

Designed as an educational tool and proof of concept, okhi requires approximately 120mA of current. Installation involves connecting VBUS, GND, and the keyboard data lines to the implant. It can be integrated by soldering to through-hole pin connectors, accessible pads, or traces on the keyboard's internal PCB.

![okhi connected to keyboard PCB pads using copper wires](/202604/okhi_2.avif)

The project ecosystem includes several specialized boards to facilitate different use cases. The main okhi implant is supported by a USB implant probe for plug-and-play external testing and a PS2 implant probe that handles 5V to 3.3V signal shifting. For internal PS2 installations, a dedicated mini shifter board is used to ensure the 5V signals from older keyboards do not damage the 3.3V logic of the RP2040.

### Firmware and Development

The firmware is split into two components. The RP2040 acts as a gateway; during updates, it runs a temporary UART bridge firmware to program the ESP32-C2 via its own USB port before the final operational firmware is loaded. The RP2040 side is developed using the Pico SDK (v1.5.1), while the ESP side utilizes the native ESP-IDF framework (v5.5) built on FreeRTOS.

A significant portion of the software development focuses on the PS2 PIO implementation. Standard PS2 libraries often fail when encountering "adapters from hell"—low-quality PS2-to-USB converters that produce erratic clock pulses or long idle-state glitches. The okhi PIO code is specifically designed to be robust, discarding short pulses and tracking start/idle states across various hardware quirks to ensure reliable data capture.

### Advanced Hardware Design

To protect the sensitive GPIO pins during power-up, the latest hardware revisions incorporate a TS3USB3000RSER USB switch. This component ensures that sniffing lines are only routed to the RP2040 once the firmware has fully initialized, preventing potential damage from 5V signals while the chip is unpowered.

![Schematic of the USB switch protection circuit](/202604/okhi_46.avif)

Another key design decision was the move from standard crystals to a Temperature Compensated Crystal Oscillator (TCXO) for the RP2040. Standard crystals can be sensitive to PCB thickness, trace capacitance, and temperature variations, often requiring fine-tuning of load capacitors and software startup delays. The TCXO provides a stable 12MHz square wave, ensuring clock accuracy within ±2.5 ppm without the complexities of passive crystal matching.

### Performance Validation

The developer has conducted extensive testing to characterize crystal behavior and system stability. This includes using active FET probes with minimal input capacitance to measure oscillation without loading the circuit and implementing custom frequency meter firmware to calibrate hardware. Environmental testing using heat guns and cooling sprays ensures that the implant remains functional across a wide range of operating temperatures, validating the robustness of the physical design.

![Testing setup for measuring crystal frequency with an active probe](/202604/okhi_52.avif)
