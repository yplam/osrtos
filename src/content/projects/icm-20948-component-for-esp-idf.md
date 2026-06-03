---
title: ICM-20948 Component for ESP-IDF
summary: A portable C99 driver for the TDK InvenSense ICM-20948 9-DOF sensor, implemented
  as a reusable ESP-IDF component. It provides comprehensive support for I2C and SPI
  communication interfaces and includes firmware loading for the InvenSense Digital
  Motion Processor (DMP). The project is a modified port of the SparkFun Arduino library,
  optimized for the ESP32 ecosystem.
slug: icm-20948-component-for-esp-idf
codeUrl: https://github.com/cybergear-robotics/icm20948
star: 14
version: v0.1.0
lastUpdated: '2025-01-23'
rtos: freertos
topics:
- dmp
- esp-idf
- esp32
- i2c
- icm20948
- imu
- spi
isShow: false
createdAt: '2026-01-21'
updatedAt: '2026-01-21'
relatedProjects:
- mpu6050-interfacing-library-for-esp32-esp-idf
- esp32-i2c-mpu6050-driver
- esp32-s3-esp-idf-components-library
- micropython-mpu-9250-i2c-driver
- axp2101-pmic-driver-for-esp-idf
- apache-nuttx-driver-for-bosch-bme280-sensor
---

The ICM-20948 is a highly integrated 9-axis Inertial Measurement Unit (IMU) from TDK InvenSense, combining a 3-axis gyroscope, 3-axis accelerometer, and a 3-axis compass. This project provides a dedicated component for the ESP-IDF framework, allowing developers to easily integrate this powerful sensor into ESP32-based robotics and IoT applications.

### Origins and Portability

This driver is a modified port of the popular SparkFun ICM-20948 Arduino library. By stripping away Arduino-specific dependencies and basing the implementation on portable C99 code, the driver leverages the native I2C and SPI peripheral drivers provided by ESP-IDF. This ensures better performance and tighter integration with the ESP32's hardware capabilities compared to generic wrappers. It specifically targets ESP-IDF version 5.0 and higher.

### Key Features and Capabilities

- **Dual Interface Support**: The component provides full support for both I2C and SPI communication protocols. This flexibility allows hardware designers to choose the interface that best fits their bus constraints and speed requirements.
- **DMP Integration**: A standout feature of this driver is its support for the InvenSense Digital Motion Processor (DMP™). The DMP offloads complex motion processing algorithms—such as sensor fusion, quaternion calculation, and gesture recognition—from the main ESP32 MCU, saving CPU cycles and reducing power consumption.
- **Configurable Settings**: Through ESP-IDF's Kconfig system (`menuconfig`), users can easily toggle DMP support and other sensor parameters without modifying the source code.
- **Comprehensive API**: The driver provides a structured API for sensor initialization, raw data retrieval (AGMT: Accelerometer, Gyroscope, Magnetometer, Temperature), and FIFO management.

### Digital Motion Processor (DMP) Support

The DMP can process sensor data internally to provide high-level information such as 6-axis or 9-axis quaternions, step counting, and activity recognition. This driver handles the complex task of loading the DMP firmware image into the sensor's memory and configuring the motion engine. Detailed documentation for the DMP implementation is included within the project, covering aspects like orientation and quaternion output.

### Getting Started with ESP-IDF

Integrating the component into an ESP-IDF project is streamlined via the IDF Component Manager. Developers can add the dependency directly to their project using the following command:

```bash
idf.py add-dependency "cybergear-robotics/icm20948"
```

The driver provides a clean API where users define a device structure and link it to the appropriate serial interface. The repository includes several examples to help developers get up and running quickly:

- **i2c_agmt**: Basic example for reading data over the I2C bus.
- **spi_agmt**: Basic example for reading data over the SPI bus.
- **spi_dmp_quad9_orientation**: Advanced example demonstrating how to use the DMP for 9-axis orientation tracking.

### Hardware Compatibility

While primarily targeting the ESP32 family of microcontrollers, the underlying C99 logic is designed to be portable. Within the ESP-IDF ecosystem, it supports any chip compatible with the framework's I2C and SPI driver APIs, including the ESP32, ESP32-S series, and ESP32-C series. This makes it a versatile choice for a wide range of embedded motion-sensing projects.
