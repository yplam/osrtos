---
title: VL53L0X TOF Sensor Driver for RT-Thread
summary: A driver package for the STMicroelectronics VL53L0X Time-of-Flight (TOF)
  sensor, specifically designed for the RT-Thread sensor framework. It provides standard
  sensor interface access for distance measurement via I2C on RT-Thread 4.0.0+ systems.
slug: vl53l0x-tof-sensor-driver-for-rt-thread
codeUrl: https://github.com/Prry/rtt-vl53l0x
siteUrl: https://github.com/Prry/rtt-vl53l0x
star: 4
version: v1.0.0
lastUpdated: '2024-11-09'
rtos: rt-thread
topics:
- i2c
- rt-thread
- tof
- vl53l0x
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- tmp1075-temperature-sensor-driver-for-rt-thread
- sgp30-gas-sensor-driver-for-rt-thread
- gp2y10-dust-sensor-driver-for-rt-thread
- hdc1000-sensor-driver-for-rt-thread
- bme680-sensor-package-for-rt-thread
- ccs811-digital-gas-sensor-driver-for-rt-thread
---

## Overview

The vl53l0x package is a dedicated driver for the STMicroelectronics VL53L0X Time-of-Flight (TOF) sensor, built specifically for the RT-Thread sensor framework. This integration allows RT-Thread applications to access distance data using standard sensor interfaces, abstracting the underlying I2C communication and hardware-specific registers.

The VL53L0X is a high-performance, single-point TOF sensor that measures distance by timing the flight of 940nm infrared light. It is known for its compact size, high accuracy, and robustness against ambient light interference, making it ideal for applications ranging from camera autofocus to robotics obstacle avoidance.

## Key Features

This driver package supports the core functionality of the VL53L0X sensor while adhering to the RT-Thread device model. Key capabilities include:

- **Distance Measurement**: Supports a range of 0 to 2000mm with 1mm resolution.
- **RT-Thread Sensor Framework Integration**: Uses standard `open`, `read`, and `control` operations.
- **Communication**: Reliable data transfer via the I2C interface.
- **Power Management**: Includes support for power-down (shutdown) and normal operation modes using a dedicated XSHUTDOWN control pin.
- **Operating Modes**: Currently supports polling mode for single-shot measurements.

## Technical Implementation

The package structure is organized to separate the official STMicroelectronics library functions from the RT-Thread platform-specific logic. The `vl53l0x` directory contains the core library and I2C platform abstraction, while the `src` and `inc` directories handle the RT-Thread sensor device registration.

### Initialization

To use the sensor, the driver must be initialized by specifying the I2C bus name, the device address, and the GPIO pin used for the XSHUTDOWN (reset) signal. The following example demonstrates how to export the initialization to the RT-Thread component initialization sequence:

```c
#include "vl53l0x_sensor_v1.h"

static int rt_hw_vl53l0x_port(void)
{
    struct rt_sensor_config cfg;
    	
    cfg.intf.dev_name = "i2c1";         /* i2c bus */
    cfg.intf.user_data = (void *)0x29;   /* i2c slave addr */
    rt_hw_vl53l0x_init("vl53l0x", &cfg, 57); /* xshutdown ctrl pin */

    return RT_EOK;
}
INIT_COMPONENT_EXPORT(rt_hw_vl53l0x_port);
```

### Data Access

Once registered, the sensor appears as a standard device (typically named `tof_vl53l0x`). Data can be retrieved using the standard RT-Thread device API:

```c
temp_dev = rt_device_find("tof_vl53l0x");
rt_device_open(temp_dev, RT_DEVICE_FLAG_RDONLY);
rt_device_read(temp_dev, 0, &sensor_data, 1);
```

## Debugging and Shell Integration

The package provides excellent visibility through the RT-Thread FinSH/MSH shell. Users can list the registered sensor devices, probe the hardware to verify the device ID (0xEE), and use built-in sensor commands to read distance data directly from the command line. This makes it easy to verify hardware connectivity and calibration without writing custom test code.
