---
title: CCS811 Digital Gas Sensor Driver for RT-Thread
summary: A comprehensive driver package for the CCS811 digital gas sensor designed
  for the RT-Thread RTOS. It enables monitoring of indoor air quality by measuring
  Total Volatile Organic Compounds (TVOC) and equivalent CO2 (eCO2) levels. The driver
  supports both standalone custom APIs and the standard RT-Thread sensor device framework.
slug: ccs811-digital-gas-sensor-driver-for-rt-thread
codeUrl: https://github.com/luhuadong/rtt-ccs811
siteUrl: https://github.com/luhuadong/rtt-ccs811
star: 2
version: v1.0.0
lastUpdated: '2020-10-05'
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
- pmsxx-sensor-driver-for-rt-thread
- gp2y10-dust-sensor-driver-for-rt-thread
- bme680-sensor-package-for-rt-thread
- dhtxx-sensor-driver-for-rt-thread
- sgp30-gas-sensor-library-for-mongoose-os
---

## Overview

The rtt-ccs811 package provides a robust driver for the CCS811 digital gas sensor, specifically tailored for the RT-Thread ecosystem. The CCS811 is a low-power sensor designed for monitoring indoor air quality, capable of detecting a wide range of Total Volatile Organic Compounds (TVOCs) and providing equivalent CO2 (eCO2) readings. It features an integrated micro-controller unit (MCU) and an Analog-to-Digital Converter (ADC), communicating with host controllers via a standard I2C interface.

This driver is designed to be flexible, supporting both static and dynamic memory allocation, and is fully thread-safe, making it suitable for complex multi-threaded RTOS environments.

## Key Features

- **Dual Interface Support**: Provides both a custom API for direct control and a standard RT-Thread sensor framework interface (`open`/`read`/`control`/`close`).
- **Memory Management**: Supports both static and dynamic memory allocation to suit different system resource constraints.
- **Thread Safety**: Built-in mechanisms ensure the driver can be safely accessed from multiple threads.
- **Configurable Communication**: Supports I2C address configuration (0x5A or 0x5B) and multiple measurement cycles (250ms, 1s, 10s, 60s).
- **Environmental Compensation**: Includes APIs to set ambient temperature and humidity data, allowing the sensor to provide more accurate gas concentration readings.

## Technical Implementation

The driver is structured into clear directories: `inc` for headers, `src` for the core logic, and `examples` for implementation references. It leverages the RT-Thread `sensor` device framework, allowing the CCS811 to appear as a standard device in the system. This integration allows users to use standard shell commands like `sensor probe` and `sensor read` to interact with the hardware during development.

### Measurement Modes

The CCS811 supports several operating modes, ranging from idle to high-frequency sampling. The driver allows developers to configure these modes easily using the `ccs811_cycle_t` enumeration, balancing power consumption against data resolution.

## Getting Started

To use this package, it must be selected via the RT-Thread package manager (menuconfig):

```
RT-Thread online packages --->
    peripheral libraries and drivers --->
        [*] sensors drivers  --->
            [*] CCS811: Digital Gas Sensor for Monitoring Indoor Air Quality..
```

### Example: Using the Sensor Framework

Registering the sensor within the RT-Thread environment is straightforward. Below is a snippet showing how to initialize the device on a specific I2C bus:

```c
#include "ccs811.h"

#define CCS811_I2C_BUS_NAME "i2c1"

static int rt_hw_ccs811_port(void)
{
    struct rt_sensor_config cfg;
    
    cfg.intf.type = RT_SENSOR_INTF_I2C;
    cfg.intf.dev_name = CCS811_I2C_BUS_NAME;
    rt_hw_ccs811_init("cs8", &cfg);
    
    return RT_EOK;
}
INIT_COMPONENT_EXPORT(rt_hw_ccs811_port);
```

## Important Considerations

When working with the CCS811, developers should be aware of several hardware characteristics documented in the driver's notes:
- **Preheating**: The sensor requires a warm-up period of approximately 15 seconds before providing valid data.
- **Burn-in**: For new sensors, a 48-hour initial run-in period is recommended by the manufacturer.
- **Baseline Calibration**: The sensor automatically calibrates its baseline over time. The driver provides APIs to manually get and set these baseline values, which is recommended for maintaining accuracy across power cycles.
- **Dual Device Registration**: Because the CCS811 provides both TVOC and eCO2 data, the RT-Thread sensor framework will register two distinct devices (e.g., `tvoc_cs8` and `eco2_cs8`).
