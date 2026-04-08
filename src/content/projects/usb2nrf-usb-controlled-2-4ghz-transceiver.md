---
title: USB2NRF - USB Controlled 2.4GHz Transceiver
summary: USB2NRF is a hardware and software bridge between a USB interface and the
  nRF24L01+ 2.4GHz wireless transceiver, powered by the CH32X033 RISC-V microcontroller.
  It supports wireless serial data transfer via USB CDC and provides a flexible platform
  for IoT sensor networks, remote actuators, and wireless HID peripherals.
slug: usb2nrf-usb-controlled-2-4ghz-transceiver
codeUrl: https://github.com/wagiminator/CH32X033-USB-NRF
siteUrl: https://oshwlab.com/wagiminator/ch32x033-usb2nrf
lastUpdated: '2024-11-24'
licenses:
- NOASSERTION
image: /202604/CH32X033-USB-NRF_0.avif
rtos: ''
topics:
- ch32x033
- ch32x035
- nrf24l01
- rf-transceiver
- risc-v
- transceiver
- usb
- usb-cdc
isShow: true
createdAt: '2026-04-07T23:53:38+00:00'
updatedAt: '2026-04-07T23:53:38+00:00'
---

USB2NRF (also referred to as NRF2USB) is a versatile development tool specifically engineered for wireless applications utilizing the low-cost nRF24L01+ 2.4GHz transceiver. By integrating a CH32X033 microcontroller, the device provides a seamless USB interface for communicating with the radio module. This makes it an ideal choice for a variety of tasks, such as transferring serial data wirelessly between computers, acting as a receiver for wireless keyboards and mice, or collecting data from remote IoT sensors.


## Hardware Architecture

The core of the project is the **CH32X033**, a 32-bit RISC-V microcontroller featuring the QingKe RISC-V4C core. This MCU is particularly well-suited for USB applications as it includes a built-in USB PHY and supports USB 2.0 full-speed device functions. Operating at up to 48MHz, it packs 62KB of flash and 20KB of SRAM, alongside specialized peripherals like a programmable protocol I/O controller (PIOC) and multiple analog components.

![USB2NRF Circuit Schematic](/202604/CH32X033-USB-NRF_1.avif)

For wireless communication, the device utilizes the **nRF24L01+** transceiver. This ultra-low power module operates in the 2.4GHz ISM band and supports data rates up to 2Mbps. It connects to the CH32X033 via an SPI interface, allowing for high-speed configuration and data exchange. The hardware design is optimized for ease of assembly, using standard components and a layout that accommodates the common SMD versions of the nRF24L01+ module.

![USB2NRF PCB Top View](/202604/CH32X033-USB-NRF_2.avif)

## Firmware and Functionality

The project offers different firmware versions depending on the intended use case. The primary firmware, **NRF to CDC**, implements a Communications Device Class (CDC) interface. This allows the computer to treat the device as a standard serial port, facilitating easy data transmission without custom drivers on most modern operating systems.

### Command Interface
Users can configure the nRF24L01+ module directly through the serial monitor. By sending strings that begin with an exclamation mark (`!`), users can issue specific commands:
- `!cXX`: Set the radio channel (e.g., `!c2A` sets channel 0x2A).
- `!tXXXXXXXXXX`: Set the 5-byte Transmit (TX) address.
- `!rXXXXXXXXXX`: Set the 5-byte Receive (RX) address.
- `!sXX`: Set the data rate (250kbps, 1Mbps, or 2Mbps).

Sending a standalone `!` will print the current settings of the NRF module to the monitor, providing a quick way to verify the configuration.

## Development and Flashing

Compiling the firmware is supported through both a traditional Makefile-based workflow and PlatformIO. The Makefile approach utilizes the RISC-V GCC toolchain and the `chprog` utility for flashing. For those preferring an integrated environment, the project is compatible with the `platform-ch32v` platform in PlatformIO.

![USB2NRF PCB Bottom View](/202604/CH32X033-USB-NRF_3.avif)

To upload new firmware, the CH32X033 must be placed into bootloader mode. This is achieved by holding the physical **BOOT button** while connecting the device to a USB port. Once in this mode, the chip is recognized as a USB device, allowing the `chprog` tool or the official WCHISPTool to write the compiled binary to the microcontroller's flash memory.
