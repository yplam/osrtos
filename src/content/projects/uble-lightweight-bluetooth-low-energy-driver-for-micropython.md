---
title: 'uble: Lightweight Bluetooth Low Energy Driver for MicroPython'
summary: A pure Python Bluetooth Low Energy (BLE) driver designed for MicroPython
  environments. It enables parsing and building of HCI packets, specifically supporting
  the STMicroelectronics SPBTLE-RF module and BlueNRG-MS stack on platforms like the
  PyBoard.
slug: uble-lightweight-bluetooth-low-energy-driver-for-micropython
codeUrl: https://github.com/dmazzella/uble
star: 88
lastUpdated: '2024-08-12'
rtos: ''
libraries:
- micropython
topics:
- bluenrg-ms
- bluetooth-low-energy
- eddystone
- hci
- micropython
- pyboard
- spbtle-rf
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- micropython-human-interface-device-library
- micropython-for-the-bbc-micro-bit
- nimble-arduino
- micropython-for-monocle
- micropython-for-pandora-iot-board
- micropython-for-bare-metal-raspberry-pi
---

## Overview

uble is a lightweight Bluetooth Low Energy (BLE) driver written in pure Python specifically for the MicroPython ecosystem. It provides a flexible way to interact with BLE hardware by focusing on the Host Controller Interface (HCI) layer. By implementing the protocol in Python, it allows developers to maintain high-level control over BLE operations without needing to dive into complex C-based firmware stacks for every modification.

While the project is currently in a beta stage, it already provides robust capabilities for parsing and building HCI packets, enabling MicroPython-based boards like the PyBoard to control external BLE chips effectively.

## Key Features

The core of uble revolves around its ability to handle the low-level communication between a host microcontroller and a BLE controller. Key features include:

- **HCI Packet Management**: Comprehensive tools for parsing and building HCI packets from buffers.
- **Pure Python Implementation**: Simplifies debugging and extension within the MicroPython environment.
- **Broad Hardware Support**: Specifically targets the STMicroelectronics SPBTLE-RF module and the X-NUCLEO-IDB05A1 expansion board.
- **Protocol Support**: Implements HCI commands from the STSW-BLUENRG-DK 2.0.2 software stack, following the BlueNRG-MS application command interface.

## Technical Implementation

uble operates by abstracting the HCI UART communication. It provides classes for different packet types, such as commands and events. This allows for a very readable syntax when interacting with BLE hardware. For example, a developer can easily create an HCI command by specifying the Opcode Group Field (OGF) and Opcode Command Field (OCF):

```python
from bluetooth_low_energy.protocols.hci import cmd

# Building an HCI Command for LE_RAND
hci_cmd = cmd.HCI_COMMAND(ogf=cmd.OGF_LE_CTL, ocf=cmd.OCF_LE_RAND)
print(hci_cmd)
# Output: <HCI_COMMAND opcode=0x2018 ogf=LE_CTL(0x08) ocf=LE_RAND(0x18) ...>

# Convert to buffer for transmission
buf = hci_cmd.to_buffer()
```

## Hardware and Platform Support

The project is primarily tested on the **PyBoard** (STM32F405RG). It is designed to interface with the **STMicroelectronics SPBTLE-RF** module, which is a very popular, low-power BLE module. Support is also extended to the **X-NUCLEO-IDB05A1** expansion board, making it accessible for those using the Nucleo ecosystem.

For custom hardware designs, the repository even provides Fritzing files and Gerber files for a MicroPython SPBTLE-RF breakout board, facilitating the creation of custom BLE-enabled MicroPython devices.

## Versatile Applications

uble includes a wide range of examples demonstrating both low-level and high-level API usage:

- **Eddystone Beacons**: Implement an Eddystone-compliant beacon device.
- **HID over GATT**: Create a Bluetooth keyboard that can interface with iOS or Windows 10.
- **Scanner**: Build a device to scan for other LE devices broadcasting advertising data.
- **WebBluetooth REPL**: One of the most unique features is the implementation of a Bluetooth LE REPL, allowing users to access the MicroPython prompt wirelessly over BLE.

## Getting Started

To use uble, the `bluetooth_low_energy` package should be frozen into the MicroPython firmware to optimize memory usage. This is done by copying the package into the `micropython-lib` directory and compiling the firmware with the `FROZEN_MPY_DIR` flag. This integration ensures that the driver is available as a built-in module, saving precious RAM on resource-constrained microcontrollers.
