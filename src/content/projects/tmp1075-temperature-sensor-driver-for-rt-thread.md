---
title: TMP1075 Temperature Sensor Driver for RT-Thread
summary: A driver package for the Texas Instruments TMP1075 digital temperature sensor,
  built specifically for the RT-Thread sensor framework. It provides standard sensor
  interface access via I2C, supporting polling and power-down modes on RT-Thread 4.0.0+
  systems.
slug: tmp1075-temperature-sensor-driver-for-rt-thread
codeUrl: https://github.com/Prry/rtt-tmp1075
siteUrl: https://github.com/Prry/rtt-tmp1075
star: 0
version: v1.0.0
lastUpdated: '2024-11-09'
rtos: rt-thread
topics:
- i2c
- rt-thread
- tmp1075
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- vl53l0x-tof-sensor-driver-for-rt-thread
- hdc1000-sensor-driver-for-rt-thread
- dhtxx-sensor-driver-for-rt-thread
- tca9534-8-bit-i-o-expander-driver-for-rt-thread
- rx8900-high-precision-rtc-driver-for-rt-thread
- sgp30-gas-sensor-driver-for-rt-thread
---

## Overview

The tmp1075 package is a dedicated driver for the Texas Instruments TMP1075 digital temperature sensor, designed to integrate seamlessly with the RT-Thread sensor framework. By utilizing this package, developers can access temperature data through standard RT-Thread sensor interfaces, abstracting the underlying I2C communication and register management.

The TMP1075 is a high-precision, low-power digital temperature sensor with an I2C interface. It is hardware pin-to-pin compatible with classic sensors like the LM75 and TMP75, making it an excellent modern replacement for existing designs requiring higher accuracy or lower power consumption.

## Key Features

- **Standardized Access**: Fully integrated with the RT-Thread sensor framework, allowing the use of standard `rt_device_find`, `rt_device_open`, and `rt_device_read` calls.
- **High Precision**: Supports a temperature range of -55℃ to 127℃ with a resolution of 0.0625℃ and an accuracy of ±1℃.
- **Flexible Power Management**: Supports both normal operation and power-down modes to conserve energy in battery-powered applications.
- **Communication**: Uses the standard I2C interface for data transmission.
- **Ease of Testing**: Includes support for RT-Thread's MSH (Finsh) shell, enabling quick sensor probing and data reading from the command line.

## Technical Specifications

| Feature | Specification |
| :--- | :--- |
| Temperature Range | -55℃ to 127℃ |
| Resolution | 0.0625℃ |
| Accuracy | ±1℃ |
| Interface | I2C |
| Operating Modes | Polling, Power-down, Normal |

## Getting Started

### Dependency Requirements

To use this package, your environment must meet the following requirements:
- RT-Thread version 4.0.0 or higher.
- The Sensor framework component enabled.
- I2C driver support for the target hardware.

### Initialization

The driver requires a simple initialization step where you define the I2C bus name and the device address. The following example demonstrates how to register the sensor using the `rt_hw_tmp1075_init` function:

```c
#include "tmp1075.h"

static int rt_hw_tmp1075_port(void)
{
    struct rt_sensor_config cfg;
    	
    cfg.intf.dev_name = "i2c1";         /* I2C bus name */
    cfg.intf.user_data = (void *)0x48;  /* I2C slave address */
    rt_hw_tmp1075_init("tmp1075", &cfg);

    return RT_EOK;
}
INIT_COMPONENT_EXPORT(rt_hw_tmp1075_port);
```

### Reading Data

Once initialized, the sensor can be accessed like any other RT-Thread device. You can find the device by name (typically prefixed with `temp_`) and read the sensor data structure directly:

```c
temp_dev = rt_device_find("temp_tmp1075");
rt_device_open(temp_dev, RT_DEVICE_FLAG_RDONLY);
rt_device_read(temp_dev, 0, &sensor_data, 1);
```

## Shell Integration

The package provides excellent debugging capabilities through the RT-Thread MSH. Users can list devices to confirm registration, probe the device ID (0x7500), and read real-time temperature values directly from the terminal. This makes it easy to verify hardware connectivity and sensor performance without writing additional test code.
