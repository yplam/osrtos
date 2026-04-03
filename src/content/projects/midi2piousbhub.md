---
title: midi2piousbhub
summary: A versatile MIDI hub firmware for the Raspberry Pi Pico that interconnects
  USB MIDI hosts, serial MIDI devices, and USB MIDI controllers. It leverages the
  RP2040's PIO to implement a software USB host port and supports Bluetooth MIDI on
  the Pico W.
slug: midi2piousbhub
codeUrl: https://github.com/rppicomidi/midi2piousbhub
lastUpdated: '2026-02-20'
licenses:
- NOASSERTION
rtos: ''
libraries:
- littlefs
- parson
topics:
- bluetooth-midi
- midi-hub
- midi-router
- pico
- pico-w
- rp2040
- serial-port-midi
- usb-midi-device
- usb-midi-host
isShow: false
createdAt: '2026-04-03T05:37:37+00:00'
updatedAt: '2026-04-03T05:37:37+00:00'
---

Managing a setup with diverse MIDI hardware often requires a complex web of cables and converters. The midi2piousbhub project offers a streamlined solution by transforming a Raspberry Pi Pico into a central routing hub capable of bridging USB, serial, and wireless MIDI streams. By utilizing the unique features of the RP2040 processor, this firmware allows musicians and developers to interconnect a MIDI host (like a PC), traditional serial MIDI devices, and up to four USB MIDI devices through a standard USB hub.

## Advanced Hardware Utilization

At the core of this project is a clever use of the RP2040's hardware peripherals. While the built-in USB port is used as a device port for connecting to a computer, the project employs the Programmable I/O (PIO) blocks to create a secondary software-based USB host port. This allows the Pico to act as a host for MIDI controllers and keyboards that would typically require a full computer to operate. 

For those using the Pico W, the project extends its reach to Bluetooth Low Energy (BLE) MIDI. This enables connections to mobile devices like iPads and phones or wireless MIDI peripherals, making it a comprehensive bridge between legacy hardware and modern wireless standards.

## Flexible Routing and Configuration

The project features a robust routing matrix that allows users to define exactly how MIDI data flows between "FROM" terminals (inputs) and "TO" terminals (outputs). This configuration is managed through a serial terminal Command Line Interface (CLI) accessible via the Pico’s UART or the USB serial interface. 

Users can assign human-readable nicknames to their devices, making it easy to manage complex setups. For instance, a controller might be nicknamed "Drumpads" instead of its raw USB ID. The software supports merging multiple MIDI streams, allowing several controllers to drive a single sound engine simultaneously.

## Persistent Storage and Backups

To ensure settings are preserved across power cycles, the firmware utilizes the LittleFS file system on the Pico's internal flash memory. Users can save their routing configurations as presets, which are stored in JSON format using the Parson library. On startup, the system automatically reloads the last saved preset.

Beyond internal storage, the project integrates FatFS support, allowing users to backup their presets to an external USB flash drive connected to the hub. This is particularly useful for mobile performers who may need to swap configurations or keep backups of complex routing setups.

## Command Line Interface Examples

The built-in CLI provides granular control over the system. Users can list connected devices, create connections, and monitor the routing matrix in real-time. A sample routing matrix view looks like this:

```text
       TO-> |   |   |   |
            | l | k | f |
            | e | e | a |
            | a | y | d |
FROM |      | d | s | e |
v      |      | - | - | r |
------------+---+---+---+
lead        |   |   |   |
------------+---+---+---+
keys        | x |   |   |
------------+---+---+---+
faders      | ! |   |   |
------------+---+---+---+
```

In this example, the `keys` device is successfully routed to the `lead` device, while a `!` indicates a configured but currently disconnected dedicated device, such as a Bluetooth peripheral.

## Technical Considerations

The project is designed to be extensible and supports various RP2040 and RP2350 boards, including the Adafruit Feather RP2040 with USB Host. Developers should note the reliance on specific versions of the TinyUSB stack to support native MIDI Host functionality. Additionally, the project provides troubleshooting guidance for complex MIDI devices with large USB descriptors, allowing users to adjust enumeration buffer sizes to accommodate high-end workstation keyboards or multi-function DSP pedals.
