---
title: SGP30 Gas Sensor Driver for RT-Thread
summary: A driver package for the Sensirion SGP30 multi-pixel gas sensor designed
  for the RT-Thread RTOS. It provides measurement capabilities for TVOC and eCO2 via
  I2C and supports both custom APIs and the standard RT-Thread sensor device framework.
slug: sgp30-gas-sensor-driver-for-rt-thread
codeUrl: https://github.com/luhuadong/rtt-sgp30
star: 4
version: v1.0.0
lastUpdated: '2025-03-20'
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
- ccs811-digital-gas-sensor-driver-for-rt-thread
- bme680-sensor-package-for-rt-thread
- gp2y10-dust-sensor-driver-for-rt-thread
- sgp30-gas-sensor-library-for-mongoose-os
- pmsxx-sensor-driver-for-rt-thread
- vl53l0x-tof-sensor-driver-for-rt-thread
---

## Overview

The rtt-sgp30 package is a dedicated driver for the Sensirion SGP30 multi-pixel gas sensor, specifically tailored for the RT-Thread RTOS environment. The SGP30 is a sophisticated metal-oxide gas sensor featuring multiple sensing elements on a single chip. It is designed to provide fully calibrated air quality output signals, specifically Total Volatile Organic Compounds (TVOC) and equivalent CO2 (eCO2) concentrations.

This driver simplifies the integration of the SGP30 into RT-Thread projects by providing a structured interface to the sensor's I2C communication protocol. It is particularly useful for developers building indoor air quality monitors, smart home devices, and IoT environmental sensing nodes.

## Key Features

- **Multi-Instance Support**: The driver is designed to handle multiple SGP30 sensors connected to the same system.
- **Flexible Memory Management**: Supports both static and dynamic memory allocation, allowing it to fit into various system constraints.
- **RT-Thread Sensor Framework Integration**: Fully compatible with the RT-Thread sensor device driver framework, enabling standard `open`, `read`, and `control` operations.
- **Thread Safety**: Built-in mechanisms ensure the driver can be safely accessed from multiple threads within the RTOS.
- **Dual Interface Design**: Provides both a custom API for direct sensor control and a standard RT-Thread device interface for portability.

## Technical Implementation

The SGP30 communicates over a standard I2C interface with a fixed address of 0x58. The driver handles the complexities of the I2C protocol, including the measurement of raw signals (H2 and Ethanol) and the calculation of air quality metrics. 

One important technical consideration for the SGP30 is its initialization phase. Upon power-up, the sensor requires approximately 15 seconds to stabilize. During this warm-up period, the sensor typically returns default values (TVOC at 0 and eCO2 at 400). The driver also includes support for managing baselines, which is critical for maintaining sensor accuracy over long-term operation.

## Getting Started

To use the sgp30 package, developers can select it through the RT-Thread online package manager (Menuconfig). The package is located under `peripheral libraries and drivers` -> `sensors drivers`.

### Custom API Example

For direct control, the driver offers a straightforward API for creating a device instance and performing measurements:

```c
sgp30_device_t dev = sgp30_create("i2c1");
if (dev)
{
    if (sgp30_measure(dev))
    {
        rt_kprintf("TVOC: %d ppb, eCO2: %d ppm\n", dev->TVOC, dev->eCO2);
    }
}
```

### Sensor Framework Example

Alternatively, the driver can be registered as a standard RT-Thread sensor device, which is the recommended approach for maintaining consistency across different sensor types:

```c
#define SGP30_I2C_BUS_NAME "i2c1"
#define SGP30_I2C_ADDRESS  0x58

static int rt_hw_sgp30_port(void)
{
    struct rt_sensor_config cfg;
    cfg.intf.type = RT_SENSOR_INTF_I2C;
    cfg.intf.dev_name = SGP30_I2C_BUS_NAME;
    cfg.intf.user_data = (void *)SGP30_I2C_ADDRESS;
    rt_hw_sgp30_init("sg3", &cfg);
    return RT_EOK;
}
INIT_COMPONENT_EXPORT(rt_hw_sgp30_port);
```

## Operational Notes

When using the RT-Thread sensor framework, the driver registers two distinct devices: one for TVOC and one for eCO2. Because these measurements are derived from the same physical sensor read, the driver implements a 1-deep FIFO buffer to synchronize data between the two logical devices. It is important to ensure both devices are opened successfully before attempting to read data to maintain this synchronization.
