---
title: DS3231 RTC Driver for Mongoose OS
summary: An I2C driver for the DS3231 real-time clock designed for Mongoose OS. It
  provides essential functionality for managing date and time, including power loss
  detection, for embedded firmware projects.
slug: ds3231-rtc-driver-for-mongoose-os
codeUrl: https://github.com/OllieDay/mongoose-ds3231
star: 2
lastUpdated: '2017-08-05'
rtos: mongoose-os
topics:
- c
- ds3231
- iot
- mongoose-os
- rtc
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- ds3231-rtc-driver-for-rt-thread
- rx8900-high-precision-rtc-driver-for-rt-thread
- mongoose-os-ws2812b-driver
- sgm706-independent-watchdog-driver-for-rt-thread
- rtems-i2c-driver-for-max961x
- ds323x-generic
---

## Overview

The mongoose-ds3231 project provides a dedicated I2C driver for the DS3231 real-time clock (RTC) specifically tailored for the Mongoose OS ecosystem. The DS3231 is a highly accurate, temperature-compensated RTC with an integrated crystal, making it a popular choice for embedded systems that require precise timekeeping even when the main microcontroller is powered down.

This driver simplifies the integration of the DS3231 into Mongoose OS firmware, allowing developers to interact with the clock using standard C structures. While the current implementation focuses on core timekeeping functions, it provides a robust foundation for applications requiring reliable time stamps and power-resilient scheduling.

## Key Features

- **Time Management**: Easily set and retrieve the current date and time using a structured `datetime` object.
- **Power Loss Detection**: Includes a built-in check to determine if the RTC has lost power (e.g., if the backup battery was removed), which is critical for identifying when the time needs to be resynchronized.
- **Mongoose OS Integration**: Designed to work within the Mongoose OS build system, utilizing the platform's I2C configuration and schema management.

## Technical Implementation

The driver operates over the I2C bus. To use it, developers must enable the I2C connection within the Mongoose OS configuration schema (`conf_schema.yaml`) and include the driver source in their `mos.yml` manifest. The driver utilizes a `datetime` struct that tracks seconds, minutes, hours, weekdays, days, months, and years.

One limitation to note is that while the DS3231 hardware supports programmable alarms, this specific driver implementation currently only supports time-of-day functions. Alarms are not yet implemented.

## Getting Started

### Configuration

To integrate the driver, the `ds3231` directory must be added to the firmware's source directory. The I2C interface is enabled by adding the following to the configuration schema:

```yaml
["i2c.enable", true]
```

### Code Examples

Setting the time is straightforward. You define a `datetime` structure and pass it to the setter function:

```c
// Sunday, June 11, 2017 1:30:00 PM
const struct datetime dt = {
	.second = 0,
	.minute = 30,
	.hour = 13,
	.weekday = 7,
	.day = 11,
	.month = 6,
	.year = 2017
};

ds3231_set_datetime(&dt);
```

Retrieving the time is equally simple, allowing your application to maintain accurate logs or trigger events based on the wall-clock time:

```c
struct datetime dt;
ds3231_get_datetime(&dt);
```

Finally, the driver provides a utility to check the integrity of the time data:

```c
if (ds3231_lost_power()) {
	// Power lost, time may be inaccurate. Re-sync required.
}
```

This driver is an essential utility for Mongoose OS developers working with external RTC hardware, providing a clean API for one of the most common timekeeping chips in the industry.
