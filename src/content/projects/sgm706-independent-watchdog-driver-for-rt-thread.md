---
title: SGM706 Independent Watchdog Driver for RT-Thread
summary: A driver package for the SGM706 multi-function microprocessor monitoring
  circuit, specifically designed for the RT-Thread watchdog framework. It enables
  standard IO device interface access for watchdog operations, including feeding and
  timeout management via GPIO.
slug: sgm706-independent-watchdog-driver-for-rt-thread
codeUrl: https://github.com/Prry/rtt-sgm706
star: 2
version: v1.0.0
lastUpdated: '2023-11-12'
rtos: rt-thread
topics:
- rt-thread
- watchdog
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- tca9534-8-bit-i-o-expander-driver-for-rt-thread
- sgp30-gas-sensor-driver-for-rt-thread
- rx8900-high-precision-rtc-driver-for-rt-thread
- vl53l0x-tof-sensor-driver-for-rt-thread
- ds3231-rtc-driver-for-rt-thread
- rt-thread-bsp-for-mh1903x
---

## Overview

The sgm706 package provides a specialized driver for the SGMICRO SGM706 multi-function microprocessor monitoring circuit, built specifically for the RT-Thread RTOS. The SGM706 is a versatile chip that serves as a high-reliability alternative to the MAX706, offering not only watchdog functionality but also power-on automatic reset, manual reset, and low-voltage alarm capabilities. This driver integrates the chip's watchdog features into the RT-Thread standard watchdog framework, allowing developers to interact with the hardware using familiar IO device interfaces.

## Key Features

This driver package is designed to be lightweight and compliant with the RT-Thread ecosystem. Its primary capabilities include:

- **Standard Framework Integration**: Fully compatible with the RT-Thread watchdog framework and pin driver components.
- **GPIO-Based Control**: Implements watchdog feeding (kicking) via GPIO pins.
- **Standard API Access**: Supports standard RT-Thread device operations such as `open`, `read`, and `control` (specifically `RT_DEVICE_CTRL_WDT_KEEPALIVE`).
- **Flexible Initialization**: Allows users to define the device name and the specific GPIO pin used for communication during setup.
- **MSH Support**: Includes sample code that can be triggered directly from the RT-Thread Finsh/MSH shell for quick testing and verification.

## Technical Implementation

The driver abstracts the SGM706 hardware by wrapping it in the `rt_watchdog_ops` structure. It relies on the RT-Thread `pin` driver to toggle the watchdog's input pin. Because the SGM706 is a hardware watchdog, it provides a robust safety mechanism for embedded systems; if the software fails to "feed" the dog within the hardware timeout period, the chip will trigger a system reset.

### Initialization and Usage

To use the driver, the hardware must first be initialized by specifying the device name and the pin index. A typical registration looks like this:

```c
#include "sgm706.h"

static int rt_hw_sgm706_port(void)
{
    /* Initialize watchdog device "wdt" on pin 35 (e.g., PB0) */
    rt_hw_sgm706_init("wdt", 35);

    return RT_EOK;
}
/* Register the watchdog device into the system */
INIT_COMPONENT_EXPORT(rt_hw_sgm706_port);
```

Once registered, the watchdog can be accessed using the standard RT-Thread device find and control functions:

```c
rt_device_t wdg_dev;
wdg_dev = rt_device_find("wdt");
rt_device_init(wdg_dev); 
rt_device_control(wdg_dev, RT_DEVICE_CTRL_WDT_KEEPALIVE, NULL); /* Feed the dog */
```

## Getting Started

The package is available through the RT-Thread online package manager. Users can find it under `peripheral libraries and drivers` -> `sensors drivers`. Once enabled, the package manager handles the inclusion of the necessary source files and headers into the project's build system (SCons). For best practices, it is recommended to implement the watchdog feeding logic within an idle thread hook function to ensure the system remains responsive during normal operation.
