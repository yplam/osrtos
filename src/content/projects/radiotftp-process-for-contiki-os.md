---
title: RadioTFTP Process for Contiki-OS
summary: A Contiki-OS process implementing the TFTP protocol for data transfer over
  Radiometrix radio modules. It features a custom network stack including UDP/IP,
  Ethernet, AX.25, and Manchester encoding, optimized for low-baud rate radio communication
  on AVR ATmega128RFA1 microcontrollers.
slug: radiotftp-process-for-contiki-os
codeUrl: https://github.com/alpsayin/radiotftp_process
siteUrl: http://alpsayin.com/
star: 3
lastUpdated: '2015-04-13'
rtos: contiki-os
topics:
- contiki-os
- data-transfer
- radiotunnel
- soundmodem
- tftp
- wireless-communication
- wsn
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- nrf24-driver-for-contiki-os
- akita-meshtastic-zmodem-library-module
- distributed-wavelet-transform-for-tinyos
- testbed-tsch-firmware
- kratos-contiki-os-for-lora
- contiki-lora-tsch-project
---

## Overview

RadioTFTP is a specialized Contiki-OS process designed to facilitate data transfers over Radiometrix radio modules using the Trivial File Transfer Protocol (TFTP). Originally developed as part of a long-range radio uplink project at KTH, this implementation provides a robust way to move data across low-bandwidth wireless links, specifically optimized for 2400 Baud rates.

While TFTP is traditionally used over standard Ethernet networks, this project adapts the protocol for the constraints of radio communication. It achieves this by implementing a custom, lightweight network stack that handles everything from the application layer down to physical bit encoding.

## Technical Architecture

The project is built around a modular architecture that allows it to operate over different link layers. The core logic is contained within `radiotftp_process.c`, which integrates with the Contiki-OS event system. 

### Multi-Layer Network Stack

One of the most impressive aspects of this project is its self-contained network stack. Rather than relying on a full-blown OS-provided TCP/IP suite, it implements specific layers required for radio transmission:

- **TFTP Layer**: Implements standard TFTP operations including `GET`, `PUT`, and `APPEND` (both file and line-based).
- **UDP/IP Layer**: Provides a lightweight IPv4/UDP implementation, including checksum calculation and packet demultiplexing.
- **Link Layers**: The system is flexible, supporting either **AX.25** (a data link layer protocol used heavily in amateur radio) or a simplified **Ethernet** framing.
- **Physical Encoding**: Includes a **Manchester encoding** implementation to ensure signal DC-balance, which is critical for reliable transmission over simple radio modules.

## Hardware Support

The project is specifically targeted at the **AVR ATmega128RFA1**, an 8-bit microcontroller with an integrated 2.4GHz radio transceiver, though the code is structured to work with external Radiometrix modules. The build system is configured for the `avr-atmega128rfa1` target and utilizes the standard Contiki-OS build environment.

## Key Features

- **Optimized for Low Speed**: Specifically tuned for 2400 Baud rate operation, ensuring reliability over narrow-band radio channels.
- **Flexible Addressing**: Supports local and broadcast IP addressing for radio nodes.
- **Command-Line Interface**: The process can handle various commands such as `put`, `get`, `append`, and `appendline`, making it useful for logging sensor data to a remote server or retrieving configuration files.
- **Manchester Encoding**: Built-in support for Manchester bit-stream encoding to improve radio link stability.
- **Contiki-OS Integration**: Runs as a standard Contiki process, allowing it to coexist with other tasks and drivers in an embedded environment.

## Implementation Details

The source code provides a clear example of how to build a custom protocol stack. For instance, the `udp_ip.c` file demonstrates manual construction of IPv4 headers and UDP pseudo-headers for checksumming, while `manchester.c` handles the bit-level transformations required for the radio hardware. 

To use the system, developers typically configure their network settings (such as AX.25 callsigns or IP addresses) in a `radiotftp.conf` file or directly within the source. The Makefile provided automates the generation of `.hex`, `.eep`, and `.lss` files for AVR deployment, and includes an `install` target for flashing via `avrdude` using an AVRISP mkII programmer.
