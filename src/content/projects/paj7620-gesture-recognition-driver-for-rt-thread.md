---
title: PAJ7620 Gesture Recognition Driver for RT-Thread
summary: A software package for the PAJ7620 gesture recognition sensor, specifically
  designed for the RT-Thread RTOS. It provides driver support and sample code to enable
  hand gesture detection on embedded systems using the PAJ7620 chip.
slug: paj7620-gesture-recognition-driver-for-rt-thread
codeUrl: https://github.com/orange2348/paj7620
star: 1
version: v1.0.0
lastUpdated: '2020-07-08'
rtos: rt-thread
topics:
- paj7620
- rt-thread
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- gp2y10-dust-sensor-driver-for-rt-thread
- sgp30-gas-sensor-driver-for-rt-thread
- vl53l0x-tof-sensor-driver-for-rt-thread
- hdc1000-sensor-driver-for-rt-thread
- hynitron-cst816s-touch-controller-driver-for-apache-nuttx
- pmsxx-sensor-driver-for-rt-thread
---

## Overview

The PAJ7620 package is a dedicated driver library for the PAJ7620 gesture recognition sensor, optimized for the RT-Thread real-time operating system. This sensor is capable of recognizing various hand movements, such as swiping up, down, left, right, and more complex gestures, making it an ideal choice for touchless user interfaces in embedded applications.

This package simplifies the integration of the PAJ7620 chip into RT-Thread projects by providing a standardized driver interface and ready-to-use examples. It leverages the RT-Thread package management system, allowing developers to easily include gesture sensing capabilities into their firmware with minimal configuration.

## Key Features

- **Gesture Recognition**: Supports the full range of gestures provided by the PAJ7620 hardware, including basic directional swipes and proximity detection.
- **RT-Thread Ecosystem Integration**: Fully compatible with RT-Thread 4.0+ and integrates seamlessly with the Env tool and `menuconfig` system.
- **Sample Code Included**: Provides example applications to demonstrate how to initialize the sensor and read gesture data in a real-time environment.
- **Apache-2.0 Licensed**: Open-source and permissive licensing for both commercial and hobbyist use.

## Technical Implementation

The package is structured to follow the standard RT-Thread component layout. The core driver logic resides in the `src` directory, while the `examples` directory contains a sample implementation (`paj7620_samples.c`) that shows how to poll or interrupt-drive the gesture data acquisition.

The build process is managed via an `SConscript` file, which allows the RT-Thread build system to conditionally compile the driver and its examples based on the user's configuration in `rtconfig.h`. It utilizes the RT-Thread I2C bus abstraction to communicate with the sensor, ensuring portability across different hardware platforms supported by the RTOS.

## Getting Started

To use the PAJ7620 package, developers can enable it through the RT-Thread online package manager. The configuration is found under the peripheral libraries and drivers section:

```
RT-Thread online packages
    peripheral libraries and drivers --->
        [*] PAJ7620: a gesture detection module --->
            [*]   enable samples
```

Once enabled, the package can be updated into the project using the `pkgs --update` command. The provided samples offer a quick way to verify hardware connectivity and start processing gesture events in your application logic.
