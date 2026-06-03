---
title: Zephyr USB MIDI Driver
summary: A USB MIDI 1.0 device class driver for the Zephyr RTOS that enables MIDI
  data transmission and reception over USB. It provides a public API for MIDI messaging
  and includes a sample application compatible with hardware like the STM32F4 Discovery
  and nRF52840 DK.
slug: zephyr-usb-midi-driver
codeUrl: https://github.com/stuffmatic/zephyr-usb-midi
star: 23
lastUpdated: '2024-11-05'
rtos: zephyr
topics:
- embedded
- midi
- usb
- usb-midi
- usb-midi-controller
- usb-midi-device
- usb-midi-interface
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zephyr-webusb-sample-for-stm32
- nrf-connect-sdk-midi
- cannectivity
- micro-ros-module-for-zephyr
- midi2piousbhub
- zephyr-stm32-spi-example
---

## Overview

The Zephyr USB MIDI driver is a module designed to provide USB MIDI 1.0 device class support for the Zephyr RTOS. This driver allows embedded developers to create USB MIDI peripherals capable of sending and receiving MIDI data, including support for large System Exclusive (Sysex) messages. While it currently utilizes Zephyr's legacy USB stack, it offers a functional implementation for developers looking to integrate MIDI capabilities into their Zephyr-based projects.

## Key Features

The driver is built as a Zephyr module, making it easy to integrate into existing build systems. Its core capabilities include:

- **USB MIDI 1.0 Compliance**: Implements the standard USB MIDI device class specification.
- **Configurable Virtual Cables**: Supports up to 16 input and 16 output jacks (cables), allowing for complex MIDI routing within a single USB device.
- **Custom Jack Naming**: Provides configuration options to define custom names for input and output jacks, which are visible to the host operating system.
- **Sysex Support**: Optimized for handling large Sysex transfers, with the sample application demonstrating efficient data movement to the host.
- **Public API**: A clean C API defined in `usb_midi.h` for sending and receiving MIDI messages.

## Technical Implementation

The project is structured as a standard Zephyr module. It leverages Zephyr's Kconfig system for build-time configuration, allowing developers to enable the driver via `CONFIG_USB_DEVICE_MIDI=y`. The driver manages the underlying USB descriptors and endpoints required by the MIDI class, abstracting the complexity of the USB protocol away from the application layer.

### Configuration Options

Developers can fine-tune the driver behavior using several Kconfig variables:
- `CONFIG_USB_MIDI_NUM_INPUTS` and `CONFIG_USB_MIDI_NUM_OUTPUTS`: Define the number of MIDI jacks.
- `CONFIG_USB_MIDI_USE_CUSTOM_JACK_NAMES`: Enables the use of user-defined strings for MIDI ports.
- `CONFIG_USB_MIDI_INPUT_JACK_n_NAME`: Sets the specific string for jack index `n`.

## Hardware Support

The driver and its accompanying sample application are designed to work on development boards with USB device support. It has been specifically tested and verified on:
- **STM32F4 Discovery (stm32f4_disco)**
- **nRF52840 DK (nrf52840dk_nrf52840)**

The sample application utilizes onboard peripherals like LEDs to indicate connection status and MIDI activity, and buttons to trigger test MIDI messages.

## Getting Started

To use the driver, you must add the repository as a module in your Zephyr project. This is typically done by appending the module path to `ZEPHYR_EXTRA_MODULES` in your `CMakeLists.txt`. 

```cmake
list(APPEND ZEPHYR_EXTRA_MODULES ${CMAKE_CURRENT_SOURCE_DIR}/path/to/zephyr-usb-midi)
```

Once integrated, you can enable the stack in your `prj.conf`:

```conf
CONFIG_USB_DEVICE_STACK=y
CONFIG_USB_DEVICE_PRODUCT="My MIDI Device"
CONFIG_USB_DEVICE_MIDI=y
```

The sample application included in the repository provides a robust reference for implementing MIDI echo, handling Sysex data, and managing periodic MIDI Note On/Off events. It serves as an excellent starting point for building custom MIDI controllers or synthesizers.
