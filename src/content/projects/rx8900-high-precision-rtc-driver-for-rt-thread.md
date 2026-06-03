---
title: RX8900 High-Precision RTC Driver for RT-Thread
summary: A high-precision real-time clock (RTC) driver package for the Epson RX8900
  chip, designed for the RT-Thread RTOS. It integrates with the RT-Thread RTC device
  framework to provide timekeeping, alarms, and internal temperature sensing via I2C.
slug: rx8900-high-precision-rtc-driver-for-rt-thread
codeUrl: https://github.com/Prry/rtt-rx8900
siteUrl: https://github.com/Prry/rtt-rx8900
star: 4
version: v1.0.0
lastUpdated: '2024-10-16'
rtos: rt-thread
topics:
- i2c
- rt-thread
- rtc
- rx8900
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- ds3231-rtc-driver-for-rt-thread
- hdc1000-sensor-driver-for-rt-thread
- tmp1075-temperature-sensor-driver-for-rt-thread
- ds3231-rtc-driver-for-mongoose-os
- vl53l0x-tof-sensor-driver-for-rt-thread
- bme680-sensor-package-for-rt-thread
---

## Overview

The rx8900 software package is a dedicated real-time clock (RTC) driver implemented for the RT-Thread RTOS. It follows the standard RT-Thread RTC device framework, allowing developers to seamlessly switch from a microcontroller's internal RTC to the external, high-precision RX8900 chip. 

The RX8900, manufactured by Epson, is an I2C-bus interface RTC that integrates a 32.768 kHz crystal oscillator and a temperature sensor. Its standout features include the ability to adjust frequency based on ambient temperature, a flexible power supply range, low standby current, and high timekeeping accuracy, making it ideal for industrial and battery-powered IoT applications.

## Key Features

This driver package provides full support for the core capabilities of the RX8900 hardware:
- **Real-Time Clock:** Standard timekeeping functions including seconds, minutes, hours, days, months, and years.
- **Alarm Functionality:** Configurable alarms that integrate with the RT-Thread alarm framework.
- **Temperature Sensing:** Access to the on-chip temperature sensor for environmental monitoring.
- **Seamless Integration:** Uses the RT-Thread I2C and RTC device frameworks, ensuring compatibility with existing standard C library time functions.

## Technical Implementation

The driver is structured to fit into the RT-Thread ecosystem using the `SConscript` build system. It depends on RT-Thread 3.0 or higher and requires the I2C and RTC device driver frameworks to be enabled in the BSP. 

One of the primary advantages of this implementation is its adherence to the RT-Thread device model. Once initialized, the RX8900 registers itself as a device named "rtc". This allows standard tools like the `date` command in the msh (module shell) to work out-of-the-box. If a system already has an internal RTC, users simply need to disable the internal driver to let the RX8900 take over the "rtc" device handle.

## Getting Started

### Initialization

The driver can be initialized manually by calling `rt_hw_rx8900_init()` or automatically during system startup using the RT-Thread automatic initialization mechanism:

```c
INIT_DEVICE_EXPORT(rt_hw_rx8900_init);
```

### Standard Usage

For time and alarm access, developers use the standard RT-Thread RTC and alarm interfaces. For example, retrieving the current time is done via the standard `time()` function:

```c
time_t now;
now = time(RT_NULL);
```

Setting the time or configuring alarms is handled through the `rt_device_control` API using standard commands like `RT_DEVICE_CTRL_RTC_SET_TIME` and `RT_DEVICE_CTRL_RTC_SET_ALARM`.

### Temperature Reading

Since temperature sensing is a specific feature of the RX8900 not covered by the generic RTC framework, the package provides a dedicated function:

```c
float rx8900_get_temperature(void);
```

## Shell Integration and Testing

The package includes built-in support for the RT-Thread msh and finsh shells, allowing for easy debugging and verification. Users can check the time using the `date` command or view the current temperature using the `list_rx89_temp` command:

```bash
msh >list_rx89_temp
rx8900 temperature: [27.5C] 
```

This integration ensures that the hardware can be verified quickly without writing custom test code.
