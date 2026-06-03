---
title: DS3231 RTC Driver for RT-Thread
summary: A high-precision real-time clock driver for the DS3231 chip, specifically
  designed for the RT-Thread RTOS. It integrates seamlessly with the RT-Thread RTC
  device framework, supporting time synchronization, alarm management, and internal
  temperature monitoring via I2C.
slug: ds3231-rtc-driver-for-rt-thread
codeUrl: https://github.com/Prry/rtt-ds3231
siteUrl: https://github.com/Prry/rtt-ds3231
star: 4
lastUpdated: '2023-11-12'
rtos: rt-thread
topics:
- ds3231
- i2c
- rt-thread
- rtc
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rx8900-high-precision-rtc-driver-for-rt-thread
- ds3231-rtc-driver-for-mongoose-os
- hdc1000-sensor-driver-for-rt-thread
- tmp1075-temperature-sensor-driver-for-rt-thread
- vl53l0x-tof-sensor-driver-for-rt-thread
- ds323x-generic
---

## Overview

The DS3231 driver package provides a robust implementation for the high-precision DS3231 Real-Time Clock (RTC) within the RT-Thread ecosystem. Designed to follow the standard RT-Thread RTC device framework, this package allows developers to seamlessly switch from a microcontroller's internal RTC to the external DS3231 without changing application-level code. 

The DS3231 is a low-cost, extremely accurate I2C real-time clock with an integrated temperature-compensated crystal oscillator (TCXO) and crystal. This driver leverages those hardware capabilities to provide reliable timekeeping and alarm functions for embedded systems.

## Key Features

- **RT-Thread Framework Integration**: Fully compatible with the RT-Thread RTC and Alarm device drivers.
- **High Precision**: Utilizes the DS3231's external oscillator for superior accuracy compared to most internal MCU RTCs.
- **Alarm Support**: Includes support for setting and retrieving alarm times through the standard device control interface.
- **Temperature Monitoring**: Provides a dedicated interface to read the DS3231's internal temperature sensor.
- **Ease of Use**: Supports both manual initialization and automatic initialization via the `INIT_DEVICE_EXPORT` macro.
- **Shell Integration**: Includes built-in support for RT-Thread's Finsh and MSH shells for quick testing and debugging.

## Technical Implementation

The driver communicates with the DS3231 over the I2C bus. It implements the standard `rt_device` operations, specifically focusing on the `control` function to handle RTC-specific commands such as `RT_DEVICE_CTRL_RTC_GET_TIME`, `RT_DEVICE_CTRL_RTC_SET_TIME`, and alarm management. 

Internally, the driver handles BCD (Binary Coded Decimal) to Hexadecimal conversions required by the DS3231 hardware registers. It maps these to the standard C `struct tm` format used by RT-Thread's time services. The driver also manages the I2C message transfers using the RT-Thread I2C bus device framework, ensuring thread-safe access to the hardware.

## Getting Started

To use the DS3231 driver, it must first be enabled in the RT-Thread package manager (menuconfig). Once enabled, the driver can be initialized in your application code:

```c
/* Manual initialization */
int rt_hw_ds3231_init(void);
```

Alternatively, if `INIT_DEVICE_EXPORT` is used, the device will be registered automatically as "rtc". Note that if your hardware also has an internal RTC, you should disable the internal driver to avoid naming conflicts within the device filesystem.

### Basic Usage Examples

**Reading the Current Time:**
```c
time_t now;
now = time(RT_NULL);
```

**Reading Temperature:**
```c
float temp = ds3231_get_temperature();
rt_kprintf("Current Temperature: [%d.%dC]\n", (int)temp, (int)(temp * 10) % 10);
```

## Shell Commands

The package provides convenient shell commands for interaction via the console:
- `date`: Standard command to get or set the system date and time.
- `list_ds31_temp`: A custom command to print the current temperature from the DS3231 sensor.

This driver is an ideal solution for RT-Thread projects requiring high-accuracy timekeeping, such as data loggers, industrial controllers, or IoT gateways.
