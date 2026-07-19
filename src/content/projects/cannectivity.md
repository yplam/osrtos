---
title: CANnectivity
summary: An open-source firmware for USB to CAN adapters based on the Zephyr RTOS.
  It implements the Geschwister Schneider (gs_usb) protocol, supporting CAN classic,
  CAN FD, and hardware timestamping across various microcontroller platforms.
slug: cannectivity
codeUrl: https://github.com/CANnectivity/cannectivity
star: 144
version: v1.3.0
lastUpdated: '2025-12-31'
rtos: zephyr
libraries:
- mcuboot
topics:
- can
- canbus
- cannectivity
- gs-usb
- usb
- usb-device
- usb-to-can
- zephyr
- zephyr-rtos
- zephyrproject-rtos
isShow: true
image: /202602/CANnectivity.webp
createdAt: '2026-02-14'
updatedAt: '2026-02-14'
relatedProjects:
- zephyr-usb-midi-driver
- canfestival-rtt
- zephyr-grbl
- taskmanager-j2534-bridge
- micro-ros-module-for-zephyr
- openhaystack-zephyr-firmware
---

## Overview

CANnectivity is an open-source firmware designed to transform microcontroller development boards into functional Universal Serial Bus (USB) to Controller Area Network (CAN) adapters. By implementing the Geschwister Schneider USB/CAN device protocol—commonly known as "gs_usb"—CANnectivity ensures broad compatibility with existing software ecosystems. This protocol is natively supported by the Linux kernel's SocketCAN driver, the popular `python-can` library, and numerous other diagnostic and automotive software packages.

Built upon the Zephyr RTOS, the project leverages a modern, scalable foundation that allows it to run on a wide variety of hardware targets while maintaining a consistent feature set. Whether you are building a custom diagnostic tool or integrating CAN communication into a larger system, CANnectivity provides a robust, standards-compliant bridge between USB and CAN networks.

## Key Features and Capabilities

CANnectivity is more than a simple bridge; it includes advanced features required for professional automotive and industrial development:

- **Protocol Support**: Full support for both CAN Classic and CAN FD (Flexible Data Rate), depending on the underlying hardware capabilities.
- **High-Performance USB**: Compatible with both Full-speed and Hi-speed USB interfaces.
- **Multi-Channel Operation**: Supports multiple independent CAN channels on a single device.
- **Hardware Timestamping**: Precise hardware-level timestamping for both received and transmitted CAN frames, which is critical for accurate bus analysis.
- **Integrated Diagnostics**: Real-time reporting of CAN bus states and errors, along with visual feedback via configurable LEDs for channel state, activity, and errors.
- **Hardware Control**: Support for GPIO-controlled CAN bus termination resistors and visual identification of specific CAN channels.
- **Ease of Use**: Features automatic WinUSB driver installation on Windows 8.1+ and provides custom udev rules for seamless driver loading on Linux.

## Technical Architecture

The firmware's reliance on the Zephyr RTOS provides significant advantages in terms of hardware abstraction. CANnectivity uses Zephyr's devicetree system to define hardware configurations. By default, it looks for the `zephyr,canbus` chosen node and standard aliases like `led0`. This design allows the firmware to run on almost any Zephyr-supported board that includes a USB device driver and at least one CAN controller with minimal modification.

For more complex hardware, the project supports advanced configurations via devicetree overlays. This allows developers to map multiple CAN controllers, define complex LED behaviors, or integrate hardware timestamp counters without changing the core application logic.

## Firmware Management and DFU

To support field updates and boards without dedicated on-board programmers, CANnectivity integrates with the MCUboot bootloader. It supports USB Device Firmware Upgrade (DFU), allowing users to update the firmware over the same USB connection used for CAN communication. The system includes logic for DFU entry via physical buttons or software triggers, complete with visual LED feedback during the update process.

## Integration as a Zephyr Module

Beyond being a standalone application, CANnectivity is structured as a Zephyr module. This modularity allows developers to pull the `gs_usb` protocol implementation into their own custom Zephyr-based projects. By adding CANnectivity to a `west.yml` manifest, its components become available for reuse in specialized firmware that might require USB-to-CAN functionality alongside other application-specific tasks.
