---
title: BME680 Sensor Package for RT-Thread
summary: A hardware driver package for the Bosch BME680 4-in-1 environmental sensor,
  designed to integrate seamlessly with the RT-Thread sensor device framework. It
  provides measurement capabilities for VOC, temperature, humidity, and atmospheric
  pressure, supporting both I2C and SPI communication interfaces.
slug: bme680-sensor-package-for-rt-thread
codeUrl: https://github.com/luhuadong/rtt-bme680
star: 1
version: v1.0.0
lastUpdated: '2020-10-22'
rtos: rt-thread
topics:
- mcu
- rt-thread
- rt-thread-rtos
- sensor
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- sgp30-gas-sensor-driver-for-rt-thread
- dhtxx-sensor-driver-for-rt-thread
- mongoose-os-bme680-library
- hdc1000-sensor-driver-for-rt-thread
- ccs811-digital-gas-sensor-driver-for-rt-thread
- gp2y10-dust-sensor-driver-for-rt-thread
---

## Overview

The rtt-bme680 package is a dedicated driver for the Bosch BME680 environmental sensor, specifically tailored for the RT-Thread real-time operating system. The BME680 is a highly integrated MEMS sensor capable of measuring four critical environmental parameters: volatile organic compounds (VOC), temperature, humidity, and barometric pressure. Its small form factor and low power consumption make it an ideal choice for air quality monitoring in mobile devices, wearables, and smart home IoT nodes.

This package bridges the gap between the official Bosch BME680 driver and the RT-Thread Sensor Device Framework, allowing developers to interact with the sensor using standard RT-Thread device APIs. By adhering to the RT-Thread sensor framework, the driver ensures thread safety and provides a consistent interface for application developers.

## Key Features and Capabilities

The driver supports the full range of the BME680's sensing capabilities, including:
- **Temperature Sensing**: Ranges from -40℃ to +85℃ with ±1.0℃ accuracy.
- **Humidity Sensing**: 0-100% r.H. with ±3% accuracy.
- **Pressure Sensing**: 300-1100 hPa with ±0.6 hPa accuracy.
- **Air Quality (IAQ)**: Provides an Indoor Air Quality index ranging from 0 to 500.

Beyond raw data acquisition, the package is designed for flexibility in embedded environments. It supports both I2C (with configurable addresses 0x76 or 0x77) and SPI interfaces. Currently, the implementation focuses on polling mode for data retrieval, which is suitable for most environmental monitoring tasks where high-frequency sampling is not required.

## Technical Integration

Integrating the BME680 into an RT-Thread project is streamlined through the RT-Thread package manager. Once enabled via `menuconfig`, the driver can be initialized by registering it as a sensor device. The package relies on RT-Thread 4.0 or higher and requires the sensor device driver framework to be enabled in the BSP.

### Initialization Example

To use the sensor, developers typically initialize it within their board-level hardware initialization or as a component. The following snippet demonstrates how to register the BME680 on an I2C bus:

```c
#include <rtthread.h>
#include <rtdevice.h>
#include "bme680.h"

#define BME680_I2C_BUS_NAME       "i2c1"
#define BME680_I2C_ADDRESS        0x77

static int rt_hw_bme680_port(void)
{
    struct rt_sensor_config cfg;
    
    cfg.intf.type = RT_SENSOR_INTF_I2C;
    cfg.intf.dev_name = BME680_I2C_BUS_NAME;
    cfg.intf.user_data = (void *)BME680_I2C_ADDRESS;
    rt_hw_bme680_init("be6", &cfg);
    
    return RT_EOK;
}
INIT_COMPONENT_EXPORT(rt_hw_bme680_port);
```

## Debugging and Shell Interaction

One of the advantages of using this package within the RT-Thread ecosystem is the immediate access to FinSH (the RT-Thread shell) for debugging. Once the device is registered, users can verify the sensor's status and read data directly from the command line. Commands like `list_device` will show the registered humidity, temperature, and barometer devices. The `sensor probe` and `sensor read` commands allow for quick verification of hardware connectivity and data accuracy without writing additional test code.

For example, probing the device provides vendor information and measurement ranges:

```shell
msh >sensor info
vendor    :Bosch
model     :bme680
unit      :pa
range_max :110000
range_min :30000
period_min:1000ms
fifo_max  :1
```

## Architecture

The repository is structured to keep the core logic separate from the RT-Thread glue code. The `BME680_driver` directory contains the official Bosch driver library, while the `src` directory contains `sensor_bosch_bme680.c`, which implements the RT-Thread sensor ops (open, close, read, and control). This modularity makes it easier to update the underlying Bosch driver while maintaining compatibility with the RT-Thread environment.
