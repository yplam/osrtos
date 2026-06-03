---
title: MicroPython MPU-9250 I2C Driver
summary: A comprehensive MicroPython driver for the MPU-9250 9-axis motion tracking
  device, combining support for the MPU-6500 accelerometer/gyroscope and the AK8963
  magnetometer. It provides high-level APIs for motion sensing, temperature readings,
  and magnetometer calibration over I2C.
slug: micropython-mpu-9250-i2c-driver
codeUrl: https://github.com/tuupola/micropython-mpu9250
star: 163
version: 0.3.0
lastUpdated: '2023-12-01'
rtos: ''
libraries:
- micropython
topics:
- ak8963
- micropython
- mpu6050
- mpu9250
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- micropython-mpu9x50-imu-driver
- icm-20948-component-for-esp-idf
- esp32-i2c-mpu6050-driver
- micropython-sensor-fusion
- mpu6050-interfacing-library-for-esp32-esp-idf
- apache-nuttx-driver-for-bosch-bme280-sensor
---

## Overview

The MicroPython MPU-9250 driver is a specialized library designed to interface with the InvenSense MPU-9250, a System in Package (SiP) that integrates two distinct chips: the MPU-6500 (3-axis gyroscope and 3-axis accelerometer) and the AK8963 (3-axis digital compass). This driver allows MicroPython developers to easily access 9-axis motion data for robotics, navigation, and orientation-sensing projects.

## Key Features

The library is structured to provide both a unified interface for the MPU-9250 and granular access to its constituent components. Key capabilities include:

- **Unified 9-Axis Sensing**: Access acceleration, gyroscopic rotation, and magnetic field data through a single composite class.
- **Component-Level Access**: The MPU-6500 and AK8963 drivers are available as separate classes, allowing for specialized configurations or use in standalone hardware setups.
- **Configurable Units**: By default, the library returns values in standard SI units (m/s², rad/s, uT, and °C), but it can be configured to return acceleration in Gs and angular velocity in degrees per second.
- **I2C Bypass Management**: Automatically handles the I2C bypass required to access the AK8963 magnetometer through the MPU-6500.
- **Advanced Calibration**: Includes built-in support for magnetometer calibration, addressing both hard-iron and soft-iron distortions.

## Technical Implementation

The driver is written in pure Python using the MicroPython `machine.I2C` API. It utilizes the `ustruct` module for efficient binary data unpacking from sensor registers. The architecture is modular: `mpu9250.py` acts as a wrapper that instantiates `mpu6500.py` and `ak8963.py`. This design allows developers to pass custom-configured instances of the sub-drivers into the main MPU9250 constructor, providing flexibility for specific scaling factors or offsets.

## Getting Started

Basic usage involves initializing the I2C bus and passing it to the MPU9250 constructor. The following example demonstrates a simple polling loop:

```python
import utime
from machine import I2C, Pin
from mpu9250 import MPU9250

i2c = I2C(scl=Pin(22), sda=Pin(21))
sensor = MPU9250(i2c)

print("MPU9250 id: " + hex(sensor.whoami))

while True:
    print(sensor.acceleration)
    print(sensor.gyro)
    print(sensor.magnetic)
    print(sensor.temperature)

    utime.sleep_ms(1000)
```

## Magnetometer Calibration

For accurate compass headings, the AK8963 requires calibration to compensate for local magnetic interference. The library provides a `calibrate()` method that collects samples while the user rotates the sensor. This method returns offset and scale tuples that can be stored in non-volatile memory and passed to the constructor on subsequent boots to ensure consistent accuracy without re-calibrating.

```python
from machine import I2C, Pin
from mpu9250 import MPU9250
from ak8963 import AK8963

i2c = I2C(scl=Pin(22), sda=Pin(21))
dummy = MPU9250(i2c) # Opens the bypass to access the AK8963

ak8963 = AK8963(
    i2c,
    offset=(-136.89, -160.48, 59.02),
    scale=(1.18, 0.92, 0.93)
)

sensor = MPU9250(i2c, ak8963=ak8963)
```

## Hardware Support

The driver is compatible with any MicroPython-supported hardware with I2C capabilities, such as the ESP32, ESP8266, or STM32. It is particularly well-suited for boards where the MPU-9250 is connected via standard I2C pins (SDA/SCL).
