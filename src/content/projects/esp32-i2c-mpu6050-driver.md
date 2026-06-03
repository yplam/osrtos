---
title: ESP32 I2C MPU6050 Driver
summary: A specialized hardware-based I2C driver for the MPU6050 inertial measurement
  unit, designed specifically for the ESP32 using the ESP-IDF framework. It features
  high-speed 400kHz communication and includes a Kalman filter implementation for
  smoothed sensor data processing.
codeUrl: https://github.com/imxieyi/esp32-i2c-mpu6050
isShow: false
rtos: freertos
libraries: []
topics:
- cpp
- driver
- esp-idf
- esp32
- freertos
- i2c
- mpu6050
star: 32
lastUpdated: '2017-07-18'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- mpu6050-interfacing-library-for-esp32-esp-idf
- icm-20948-component-for-esp-idf
- micropython-mpu-9250-i2c-driver
- micropython-mpu9x50-imu-driver
- apache-nuttx-driver-for-bosch-bme280-sensor
- esp32-lepton
---

## Interfacing the MPU6050 with ESP32

The MPU6050 is one of the most ubiquitous 6-axis MotionTracking devices in the embedded world, combining a 3-axis gyroscope and a 3-axis accelerometer. For developers working with the ESP32 and the ESP-IDF (Espressif IoT Development Framework), having a reliable, hardware-abstracted driver is crucial for performance. This project provides a clean C++ implementation of an MPU6050 driver specifically optimized for the ESP32's hardware I2C peripherals.

## High-Performance Hardware I2C

Unlike many generic libraries that rely on software bit-banging or high-level wrappers, this driver is built to utilize the ESP32's dedicated hardware I2C ports. By leveraging the native hardware implementation, the driver achieves a stable clock speed of 400kHz. In practical applications, this allows for a data refresh rate of approximately 250Hz, making it suitable for real-time motion tracking, robotics, and stabilization tasks.

One of the advantages of this approach is scalability; because it uses the hardware ports, you can connect up to two sensors to the same chip simultaneously by utilizing different I2C port numbers and device addresses.

## Integrated Kalman Filtering

Raw data from Inertial Measurement Units (IMUs) is notoriously noisy. Accelerometers are highly sensitive to vibration and external forces, while gyroscopes tend to drift over time. To solve this common problem, the repository includes a dedicated `KalmanFilter` class. This implementation helps fuse and smooth the sensor readings, providing more accurate orientation and motion data for end-user applications.

## Technical Architecture

The project is organized into modular components, making it easy to understand and integrate:

- **i2c.cpp/hpp**: Handles the low-level ESP-IDF I2C driver initialization, bus configuration, and read/write transactions.
- **mpu6050.cpp/hpp**: Manages sensor-specific logic, including power management, register configuration, and raw data retrieval.
- **kalmanfilter.cpp/hpp**: Provides the mathematical framework for data smoothing and noise reduction.
- **main.cpp**: Demonstrates the integration of the driver within an ESP-IDF application.

## Getting Started

This project is structured as an ESP-IDF project. It uses the traditional Makefile-based build system (though the logic is easily portable to modern CMake versions). The configuration is managed via `sdkconfig`, where parameters like the serial flasher port and baud rate are defined.

To use the driver, you typically initialize the I2C bus and then pass that reference to the MPU6050 object:

```cpp
// Example of typical initialization logic
#include "i2c.hpp"
#include "mpu6050.hpp"

// Initialize I2C on Port 0 with specific SDA/SCL pins
I2C i2c_bus(I2C_NUM_0, GPIO_NUM_21, GPIO_NUM_22, 400000);

// Initialize the MPU6050 sensor
MPU6050 sensor(&i2c_bus);
if (sensor.testConnection()) {
    sensor.initialize();
}
```

Whether you are building a self-balancing robot, a handheld gimbal, or a wearable motion tracker, this driver provides a solid, high-performance foundation for motion sensing on the ESP32 platform.
