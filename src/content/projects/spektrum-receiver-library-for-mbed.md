---
title: Spektrum Receiver Library for Mbed
summary: A C++ library providing Mbed support for Spektrum serial receivers, specifically
  tested with the SPM9745 DSMX remote receiver. It includes classes for receiver interfacing
  and binding, along with utility macros for converting raw servo positions to PWM
  pulse widths.
slug: spektrum-receiver-library-for-mbed
codeUrl: https://github.com/devangel77b/Spektrum
star: 2
version: v1.0.1
lastUpdated: '2019-03-16'
rtos: mbed-os
topics:
- mbed-cli
- mbed-os
- mbed-os5
- radio-control
- receiver
- rtos
- spektrum
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- spirit-motor-driver-library
- ds248x-1-wire-library
- qn8066-fm-dsp-rx-tx-arduino-library
- cr95hf-mbed-library
- serialbridge
- chirp-sdk-library-for-mbed-os
---

## Overview

The Spektrum library is a specialized driver for Mbed-enabled microcontrollers, designed to interface with Spektrum serial receivers. These receivers, often referred to as "satellite" or remote receivers, communicate via a serial protocol rather than traditional PWM or PPM signals. This library simplifies the process of reading multi-channel RC data and managing the binding process between the receiver and a transmitter.

Originally developed to support the Spektrum SPM9745 DSMX remote receiver, the library is built to handle the nuances of the Spektrum Remote Receiver Interfacing specification. It provides a robust alternative to older, unmaintained Mbed libraries that may not support modern DSMX quad race receivers or the latest serial standards.

## Key Features

The library is organized around two primary classes and a set of utility macros:

- **Spektrum Class**: Handles the serial communication with the receiver, parsing incoming data frames into usable channel values.
- **BindPlug Class**: Facilitates the binding process, allowing the receiver to be paired with a Spektrum transmitter without requiring a separate hardware bind plug setup in some configurations.
- **SPEKTRUM_COUNT2US Macro**: A convenience tool for converting the raw 0-2048 servo position values provided by the receiver into standard PWM pulse widths (typically 600-2100us, centered at 900us).

## Technical Implementation and Servo Mapping

One of the critical aspects of the Spektrum serial protocol is how it represents servo positions. Depending on the bind type, the data range can be 0-1024 or 0-2045. These limits correspond to +/-150% travel settings in Spektrum's AirWare software. 

At a standard +/-100% travel setting, the data range is approximately 341 to 1707. The library accounts for these ranges, translating them to PWM signals between 1102us and 1898us. This precision is vital for flight controllers and robotics applications where accurate actuator control is required.

## Hardware Compatibility

While the library was primarily tested on the **Spektrum SPM9745**, it is designed with enough flexibility to likely support the **SPM9645** and similar DSMX/DSM2 remote receivers. The project includes configuration files for Mbed targets like the **K64F**, setting appropriate baud rates for serial communication (typically 115200 baud for Spektrum serial, though the `mbed_app.json` provides a template for target-specific overrides).

## Getting Started

To use the library in an Mbed project, developers can instantiate the `Spektrum` class by providing the TX and RX pins of the UART interface connected to the receiver. The library then handles the background processing of serial frames. 

```cpp
// Example snippet for initialization
Spektrum rx(UART_TX, UART_RX);

// In the main loop or a callback
if (rx.read()) {
    uint16_t channelData = rx.getChannel(0);
    float pulseWidth = SPEKTRUM_COUNT2US(channelData);
}
```

The project also includes a `TESTS` directory, providing examples of how to verify the library's functionality on supported hardware. This ensures that developers can validate their wiring and receiver configuration before integrating the driver into a larger flight stack or control system.
