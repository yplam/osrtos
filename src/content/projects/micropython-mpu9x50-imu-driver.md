---
title: MicroPython MPU9x50 IMU Driver
summary: A comprehensive MicroPython library for InvenSense MPU9150, MPU9250, and
  MPU6050 sensors. It features a robust 3D vector class, sensor calibration tools,
  and support for vehicle-relative coordinate mapping, specifically optimized for
  the Pyboard and other MicroPython-compatible hardware.
slug: micropython-mpu9x50-imu-driver
codeUrl: https://github.com/micropython-IMU/micropython-mpu9x50
star: 273
lastUpdated: '2024-10-23'
rtos: ''
libraries:
- micropython
topics:
- accelerometer
- driver
- magnetometer
- micropython
- mpu9150
- mpu9250
- sensor
isShow: true
image: /202512/9DoF_IMU_Breakout.webp
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
---

## Overview

The micropython-mpu9x50 repository provides a suite of drivers for InvenSense inertial measurement units (IMUs), specifically targeting the MPU6050, MPU9150, and MPU9250. These sensors are widely used in robotics, drones, and balancing vehicles to measure acceleration, turn rate, and magnetic fields. 

This project is designed to work seamlessly with MicroPython, offering a high-level API while maintaining the ability to perform low-level, high-performance operations. It is particularly well-suited for use with the Pyboard, though it can be adapted for other MicroPython-compatible microcontrollers using I2C communication.

## Key Features

### Comprehensive Sensor Support
The library includes dedicated classes for different generations of InvenSense hardware:
- **MPU6050**: A 6-axis device (accelerometer and gyroscope).
- **MPU9150**: A 9-axis device combining the MPU6050 with an AK8795 magnetometer.
- **MPU9250**: A newer 9-axis device featuring an AK8963 magnetometer, offering continuous 100Hz operation and separate filters for the accelerometer and gyroscope.

### Advanced Vector Handling
At the core of the driver is the `Vector3d` class. This utility manages 3D coordinates (x, y, z) and provides built-in support for calibration and coordinate transformations. This is essential for sensor fusion algorithms, such as the Madgwick algorithm, which require data to be oriented correctly relative to the vehicle's frame of reference.

### Vehicle-Relative Coordinates
One of the most challenging aspects of using IMUs is aligning the coordinate systems of different internal chips (like the magnetometer and accelerometer). This driver automatically corrects these misalignments. Furthermore, it supports axis transposition and scaling, allowing developers to mount the sensor in any orientation and still receive standard vehicle-relative coordinates (X-forward, Y-right, Z-down).

## Technical Implementation

The driver is split into several modules to optimize memory usage and maintainability:
- `imu.py`: Contains the base class `InvenSenseMPU` and the `MPU6050` implementation.
- `mpu9150.py` and `mpu9250.py`: Extend the base class to support 9-axis functionality.
- `vector3d.py`: Handles all vector math and calibration logic.

### Interrupt-Safe Operations
For advanced users, the driver provides experimental methods like `get_accel_irq()`, `get_gyro_irq()`, and `get_mag_irq()`. These are designed to be called from within MicroPython interrupt callbacks. Because MicroPython prohibits heap allocation during interrupts, these methods update pre-allocated integer buffers, bypassing the standard floating-point scaling logic to ensure stability.

## Getting Started

Using the driver is straightforward. After connecting the sensor to the I2C bus of a Pyboard, you can initialize the sensor and begin reading data immediately.

```python
from mpu9250 import MPU9250

# Initialize the IMU on I2C bus 'X'
imu = MPU9250('X')

# Read sensor data
print("Acceleration (g):", imu.accel.xyz)
print("Gyroscope (degs/s):", imu.gyro.xyz)
print("Magnetometer (uT):", imu.mag.xyz)
print("Temperature (C):", imu.temperature)
```

### Calibration
The library includes a simple calibration routine for the magnetometer. By rotating the device through various axes and using a trigger (like the Pyboard's onboard switch), users can generate offset values that are automatically applied to subsequent readings, significantly improving the accuracy of heading calculations.
