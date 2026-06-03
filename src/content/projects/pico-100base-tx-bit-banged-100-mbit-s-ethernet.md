---
title: 'Pico-100BASE-TX: Bit-banged 100 MBit/s Ethernet'
summary: A high-performance library for RP2040 and RP2350 microcontrollers that implements
  100 MBit/s Fast Ethernet transmission using the PIO peripheral. It achieves throughput
  of approximately 11 MByte/s by offloading MLT-3 encoding, 4B5B line coding, and
  scrambling to hardware-assisted lookups and DMA.
slug: pico-100base-tx-bit-banged-100-mbit-s-ethernet
codeUrl: https://github.com/steve-m/Pico-100BASE-TX
star: 269
lastUpdated: '2025-10-23'
rtos: ''
topics:
- bitbanging
- ethernet
- rp2040
- rp2350
- rpi-pico
- udp
isShow: true
image: /202601/pico-100base.webp
createdAt: '2026-01-28'
updatedAt: '2026-01-28'
relatedProjects:
- rp2040-hat-lwip-c
- asyncudp-esp32-sc-w6100
- hsdaoh-rp2350-high-speed-data-acquisition-over-hdmi
- asyncudp-esp32-ethernet
- asyncwebserver-esp32-w5500
- asyncudp-ethernet
---

## Overview

Pico-100BASE-TX is a specialized library designed for the Raspberry Pi Pico (RP2040) and Pico 2 (RP2350) that enables 100 MBit/s Fast Ethernet transmission through bit-banging. By leveraging the unique Programmable I/O (PIO) state machines and DMA controllers found in these microcontrollers, the project achieves a sustained data stream of approximately 11 MByte/s. This allows for high-bandwidth applications like real-time ADC streaming or high-fidelity audio transmission without the need for a dedicated external Ethernet MAC/PHY chip.

## Technical Implementation

Implementing 100BASE-TX is significantly more complex than 10BASE-T due to the requirements of the Fast Ethernet standard. The library manages several layers of encoding and signal processing:

### MLT-3 Encoding
Unlike simpler binary encodings, 100BASE-TX uses MLT-3 (Multi-Level Transmit 3), which cycles through three voltage levels (-1, 0, +1). The library implements this using the PIO's side-set feature, controlling two GPIOs to create the differential voltage levels required for the twisted pair cable.

### Scrambling and 4B5B Coding
To ensure signal integrity and clock recovery, the data is scrambled using an 11-bit Linear-Feedback Shift Register (LFSR) and then encoded using 4B5B line coding. The library optimizes these processes using pre-computed lookup tables (LUTs):
- **Scrambling**: A 10 KB RAM-based LUT contains pre-computed sequences to minimize CPU overhead.
- **4B5B**: A 256-entry LUT allows the system to encode two 4-bit nibbles simultaneously, processing an entire byte in a single table access.

### Hardware Acceleration
The project makes extensive use of the RP2040/RP2350 hardware features to maintain 100 Mbps speeds. The Ethernet Frame Check Sequence (FCS) and optional UDP checksums are calculated using the DMA CRC sniffer in CRC32 and sum modes, respectively. This offloads the heavy mathematical lifting from the CPU cores.

## Hardware Setup and Safety

While the library can technically drive an Ethernet cable directly from GPIOs, the project emphasizes safety and signal integrity. Users are warned **never to connect to Power over Ethernet (PoE) capable equipment**, as the high voltages could destroy the MCU. For reliable operation, the use of a pulse transformer with matching circuitry or a simple resistor network (47 + 470 Ohms) is recommended to match the impedance of the Ethernet cable.

## Example Applications

The repository includes several demonstration applications that showcase the library's throughput capabilities:

- **Internal ADC Streaming**: Digitizes signals using the MCU's internal ADC and streams the raw data over UDP.
- **PCM1802 Audio**: Streams high-quality audio from a PCM1802 ADC board at a 75 kHz sample rate.
- **Counter**: A high-speed data test that generates a 16-bit counter via PIO and streams it to a DMA ringbuffer for network transmission.

## Getting Started

The project is built using the standard Raspberry Pi Pico SDK. It supports both the original RP2040 and the newer RISC-V/Cortex-M33 based RP2350. By including `libpico100basetx` in a CMake project, developers can integrate high-speed Ethernet transmission into their own embedded applications, provided they can meet the 125 MHz symbol rate timing requirements of the PIO state machines.
