---
title: RTEMS I2C Driver for MAX961x
summary: A specialized I2C driver for the MAX9611 and MAX9612 current-sense amplifiers,
  designed for the RTEMS real-time operating system. It provides a standard interface
  for measuring current, voltage, and temperature on LEON2 and LEON3 processor architectures.
slug: rtems-i2c-driver-for-max961x
codeUrl: https://github.com/polycone/rtems-i2c-max961x-driver
star: 0
lastUpdated: '2018-08-04'
rtos: rtems
topics:
- driver
- i2c-device
- max9611
- max9612
- rtems
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- tmp1075-temperature-sensor-driver-for-rt-thread
- vl53l0x-tof-sensor-driver-for-rt-thread
- hdc1000-sensor-driver-for-rt-thread
- ds3231-rtc-driver-for-rt-thread
- rx8900-high-precision-rtc-driver-for-rt-thread
- sgp30-gas-sensor-driver-for-rt-thread
---

The `rtems-i2c-max961x-driver` provides a robust implementation for interfacing with the Maxim Integrated MAX9611 and MAX9612 high-side current-sense amplifiers within the RTEMS ecosystem. These chips are versatile sensors capable of monitoring high-side current, input supply voltage, and internal temperature, making them ideal for power management and system health monitoring in embedded applications.

## Architecture and Integration

This driver is built upon the RTEMS `libi2c` framework, ensuring a standard interface for I2C device communication. It is designed to work seamlessly with the GRLIB driver manager (`drvmgr`), which is commonly used in high-reliability systems based on LEON2 and LEON3 processor architectures. 

The project includes specific configuration files for LEON-based systems, demonstrating how to integrate the driver into a larger system-on-chip (SoC) environment. The `config.c` and `config_leon3_drvmgr.c` files provide the necessary glue code to initialize the driver manager and register hardware resources, including support for AMBA PnP buses.

## Key Features

The driver implements support for the primary sensing capabilities of the MAX961x family:

- **Current Sensing**: Utilizing the Current Sense Amplifier (CSA) with configurable gain to monitor power consumption.
- **Voltage Monitoring**: Measuring the common-mode voltage at the RSP pin to track supply stability.
- **Temperature Sensing**: Accessing the internal die temperature sensor for thermal management.

## Technical Implementation

The core logic resides in `i2c-max961x.c`, where standard RTEMS driver entries (read, write, and ioctl) are mapped to I2C operations. The driver uses `ioctl` commands to trigger specific measurement conversions and retrieve data from the chip's internal registers. 

For example, retrieving the current sense amplifier data involves reading the MSB and LSB registers and processing the 12-bit result. The driver handles the I2C start/stop sequences and address byte management internally via `rtems_libi2c` calls, abstracting the complexity of the I2C protocol from the user application.

## Getting Started

To use the driver, it must first be registered with the RTEMS I2C library. This is typically done during system initialization. Once registered, the device can be accessed via the standard POSIX file API.

### Registration Example

```c
status = rtems_libi2c_register_drv("max961x", i2c_max961x_driver_descriptor, 0, MAX961X_ADDRESS);
if (status < 0) {
    printf("ERROR: Could not register MAX961x driver\n");
}
```

### Usage Example

Once the driver is registered, you can open the device and use `ioctl` to fetch sensor data. The following snippet demonstrates how to read current, voltage, and temperature:

```c
int fd = open("/dev/i2c1.max961x", O_RDWR);

// Configure the chip (e.g., set gain and measurement mode)
ioctl(fd, IOCTL_MAX961X_CONTROL, 0x0700);

// Read measurements
int csa_raw = ioctl(fd, IOCTL_MAX961X_CSA_DATA);
int rsp_raw = ioctl(fd, IOCTL_MAX961X_RSP_DATA);
int temp_raw = ioctl(fd, IOCTL_MAX961X_TEMP_DATA);

// Convert raw values to physical units
float current = csa_raw * MAX961X_LSB_STEP_1X_GAIN / BRIDGE_RESISTANCE;
float voltage = rsp_raw * MAX961X_VOLTAGE_LSB_STEP;
```

This driver provides a clean abstraction for developers, allowing them to focus on application logic rather than low-level I2C register manipulation while maintaining compatibility with the RTEMS driver model.
