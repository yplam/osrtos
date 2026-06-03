---
title: PMSxx Sensor Driver for RT-Thread
summary: A comprehensive driver for the Plantower PMS series of digital particulate
  matter sensors, designed specifically for the RT-Thread RTOS. It supports a wide
  range of models including PMS1003 through PMSA003, offering both custom APIs and
  standard RT-Thread sensor framework integration.
slug: pmsxx-sensor-driver-for-rt-thread
codeUrl: https://github.com/luhuadong/rtt-pmsxx
star: 4
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
- dhtxx-sensor-driver-for-rt-thread
- gp2y10-dust-sensor-driver-for-rt-thread
- ccs811-digital-gas-sensor-driver-for-rt-thread
- sgp30-gas-sensor-driver-for-rt-thread
- bme680-sensor-package-for-rt-thread
- hdc1000-sensor-driver-for-rt-thread
---

## Overview

The `rtt-pmsxx` package is a dedicated driver for the Plantower PMS series of digital universal particulate matter sensors, designed to run on the RT-Thread real-time operating system. These sensors utilize laser scattering principles to continuously collect and calculate the concentration of suspended particulate matter of different particle sizes in the air per unit volume. The driver supports a broad spectrum of models, including the PMS1003, PMS3003, PMS5003, PMS7003, PMS9003, and PMSA003, as well as enhanced versions like the PMS5003ST.

## Key Features

This driver is built with flexibility and robustness in mind, catering to various embedded application requirements. Key technical features include:

- **Multi-instance Support**: Manage multiple sensors simultaneously on different UART interfaces.
- **Memory Management**: Supports both static and dynamic memory allocation, allowing for optimization based on system resources.
- **RT-Thread Sensor Framework**: Seamlessly integrates with the standard RT-Thread sensor device driver framework, enabling standard `open/read/control/close` operations.
- **High Performance**: Supports both UART interrupt and DMA modes for efficient data reception.
- **Thread Safety**: Designed to be safe for use in multi-threaded RTOS environments.
- **Dual Interface**: Provides both a custom API for direct control and a standard RT-Thread device interface for portability.

## Working Modes

The driver supports two primary communication patterns:
1. **Active Mode (Interrupt-driven)**: The sensor pushes data automatically, and the driver handles it via interrupts.
2. **Passive Mode (Polling)**: The host sends a request command, and the sensor responds with data. 

While the custom interface supports both modes, the RT-Thread Sensor Framework interface currently focuses on the passive (polling) mode to maintain consistency with standard sensor behaviors.

## Technical Implementation

The driver distinguishes between "Basic" and "Enhanced" sensor types. Basic models typically transmit a 32-byte protocol frame containing PM1.0, PM2.5, and PM10 concentrations. Enhanced models, such as the PMS5003ST, utilize a 40-byte protocol that adds environmental data like temperature, humidity, and formaldehyde concentration.

### Custom API Usage

For developers needing granular control, the custom API provides functions for lifecycle management and data retrieval:

```c
// Create a sensor object
pms_device_t pms_create(const char *uart_name);

// Set working mode (Passive, Active, Standby, or Normal)
rt_err_t pms_set_mode(pms_device_t dev, pms_mode_t mode);

// Read data in passive mode
rt_uint16_t pms_read(pms_device_t dev, void *buf, rt_uint16_t size, rt_int32_t time);
```

### RT-Thread Sensor Framework Integration

By using the standard framework, the sensor can be accessed like any other device in the system. This is particularly useful for applications that aim for hardware abstraction. When using the standard `rt_device_read` interface, the driver defaults to returning the PM2.5 concentration, which is often the most critical metric for air quality monitoring.

```c
struct rt_sensor_data sensor_data;
rt_device_t dev = rt_device_find("pms_pm2.5");
rt_device_open(dev, RT_DEVICE_FLAG_RDWR);
rt_device_read(dev, 0, &sensor_data, 1);
rt_kprintf("PM2.5: %d ug/m3\n", sensor_data.data.dust);
```

## Getting Started

The package is easily integrated via the RT-Thread online package manager (Env tool or RT-Thread Studio). Users can configure the sensor type, UART device name, and enable DMA support through the `menuconfig` interface. For debugging, the driver includes built-in functions to dump raw response data and show command frames in the MSH terminal, facilitating rapid development and troubleshooting.
