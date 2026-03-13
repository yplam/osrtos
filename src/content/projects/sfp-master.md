---
title: SFP-Master
summary: A cross-platform desktop application designed to read, write, and save data
  for optical SFP modules using the CH341a programmer. It provides a specialized interface
  for interacting with SFP internal memory, including hex editing, checksum calculation,
  and password management.
slug: sfp-master
codeUrl: https://github.com/bigbigmdm/SFP-Master
siteUrl: https://oshwlab.com/einkreader/ch341a_sfp_adapter
star: 38
version: v1.0.7
lastUpdated: '2025-12-05'
rtos: ''
topics:
- ch341a
- i2c
- module
- programmer
- prom-writer
- sfp
isShow: true
image: /202603/sfp-master.webp
createdAt: '2026-03-12'
updatedAt: '2026-03-12'
---

## Overview

SFP-Master is a specialized utility for network engineers and hardware developers who need to interact with the internal configuration data of optical SFP (Small Form-factor Pluggable) modules. By leveraging the widely available and inexpensive CH341a USB programmer, SFP-Master provides a user-friendly interface to read, modify, and write module data, which is essential for tasks like vendor rebranding, troubleshooting, or custom configuration.

The project integrates several open-source components, including the QHexEdit2 hex editor for data manipulation and logic derived from the ch341prog utility for hardware communication. It is designed to work on both Linux and Windows environments, supporting both Qt5 and Qt6 frameworks.

## Hardware Integration

To use SFP-Master, a specific hardware setup is required. Since standard CH341a programmers are designed for EEPROM and Flash chips, an SFP-to-I2C adapter is necessary to bridge the programmer to the SFP module's interface. The software expects this adapter to be inserted into the `24xxx` (I2C) slot of the CH341a programmer.

The hardware implementation includes jumpers (J1 to J3) for TxPWR, RxPWR, and TxEN. These are used to supply power to the SFP module. Interestingly, the software and hardware design allow for bypassing hardware write protection by selectively removing these jumpers, which is a common requirement when dealing with locked modules from specific vendors.

## Key Features

### Integrated Hex Editor
The right side of the application features a robust hex editor that allows users to modify buffer data directly. It supports standard operations like Undo (Ctrl+Z) and Redo (Ctrl+Y), making it easy to experiment with data changes before committing them to the module hardware.

### SFP Address Mapping
SFP modules typically store data in two distinct address spaces (0xA0 and 0xA2). SFP-Master simplifies this by using a color-coded checkbox system to select specific address areas for operations:
- **Green**: 0x0000 - 0x007F (Maps to SFP 0xA000 - 0xA07F)
- **Blue**: 0x0080 - 0x00FF (Maps to SFP 0xA080 - 0xA0FF)
- **Red**: 0x0100 - 0x017F (Maps to SFP 0xA200 - 0xA27F)
- **Yellow**: 0x0180 - 0x01FF (Maps to SFP 0xA280 - 0xA2FF)

### Checksum and Parsing
For users manually editing vendor strings or serial numbers, the application includes a `Checksum` button. This automatically calculates the two critical checksums at addresses 0x3F and 0x5F according to the SFF-8472 Rev 12.3 specification. The `Parse` button allows the UI to refresh and interpret the raw hex data into human-readable fields on the left side of the screen.

### Password Protection
Many modern SFP modules are password-protected to prevent unauthorized writes. SFP-Master includes a dedicated password setting menu (Ctrl+P) that allows users to input the necessary credentials to unlock the module's memory for programming.

## Technical Implementation

The application is written in C++ using the Qt framework for the GUI and `libusb-1.0` for direct communication with the CH341a hardware. The build system uses CMake, providing a flexible way to compile against different versions of Qt and handle dependencies across various Linux distributions. It also includes udev rules to ensure the programmer can be accessed without root privileges on Linux systems.
