---
title: Nano33BLESensor
summary: An Arduino library for the Nano 33 BLE Sense that leverages Mbed OS to automatically
  place sensor measurements in a ring buffer. It provides a common interface for various
  onboard sensors, including the accelerometer, gyroscope, magnetometer, and environmental
  sensors, allowing background data collection without blocking the main loop.
slug: nano33blesensor
codeUrl: https://github.com/DaleGia/Nano33BLESensor
siteUrl: https://dalegi.com/2020/09/04/the-arduino-nano-33-ble-sense-sensor-library-you-have-been-waiting-for/
star: 92
version: 1.1.0
lastUpdated: '2024-01-31'
rtos: mbed-os
topics:
- ble
- mbed-os
- ring-buffer
- sensor-measurements
- serial
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- arduino-serial-ble
- mbed-os-ble-gap-advertiser-for-arduino-nano-33-ble
- esp32-nimble-hid-client
- nimble-arduino
- n-able-arduino-core
- fs-nano33ble
---

## Overview

The Nano33BLESensor library is designed specifically for the Arduino Nano 33 BLE Sense, a powerful board based on the nRF52840 microcontroller. While the standard Arduino libraries for this board provide basic access to its wide array of sensors, they often require the user to manage timing and polling manually within the main loop. Nano33BLESensor changes this paradigm by leveraging the underlying Mbed OS to handle sensor measurements in the background.

By utilizing Mbed OS threads and ring buffers, the library automatically captures sensor data and stores it for later retrieval. This approach "softens" time constraints, ensuring that high-frequency sensor data isn't lost if the main application loop is busy with other tasks, such as complex calculations or Bluetooth communication.

## Key Features

The library provides a unified class implementation with a common interface for nearly every sensor on the board:
- **Motion Sensing**: 3-axis Accelerometer, Gyroscope, and Magnetometer.
- **Environmental**: Barometric Pressure, Temperature, and Humidity.
- **Optical**: Proximity, RGBC Colour, and Gesture detection.
- **Audio**: RMS Microphone levels.

One of the most significant advantages is the common interface. Whether you are reading from the accelerometer or the pressure sensor, the methods for checking available data and retrieving it remain consistent across the library.

## Technical Implementation

At its core, Nano33BLESensor uses Mbed OS to schedule sensor reads. When a sensor is initialized, the library sets up a background process that periodically samples the hardware. These samples are pushed into a ring buffer (defaulting to a size of 20). 

This architecture is particularly beneficial for BLE (Bluetooth Low Energy) applications. BLE stacks often require precise timing and can occasionally block the main execution loop. By offloading sensor acquisition to background tasks, the application remains responsive, and data integrity is maintained through the buffer system.

## Getting Started

Initialization is designed to be as simple as possible. Instead of managing multiple disparate libraries with different naming conventions, you can start all sensors with a consistent `begin()` call:

```cpp
#include "Nano33BLEAccelerometer.h"
#include "Nano33BLEPressure.h"

void setup()
{
  Accelerometer.begin();
  Pressure.begin();
}
```

To retrieve data, you simply check if data is available and "pop" it from the buffer. This can be done for a single data point or multiple points at once:

```cpp
Nano33BLEAccelerometerData accelerometerData;

if(Accelerometer.pop(accelerometerData))
{
  // Use the sensor values stored in accelerometerData
  Serial.println(accelerometerData.x);
}
```

For high-throughput requirements, the `popMultiple` method allows you to drain the buffer into an array, which is ideal for batch processing or sending data packets over a network.

## Compatibility and Requirements

The library is compatible with both the `ArduinoCore-nRF528x-mbedos` and the newer `ArduinoCore-mbed` cores. It depends on the standard Arduino sensor drivers (such as `Arduino_LSM9DS1` and `Arduino_LPS22HB`), acting as a sophisticated wrapper that adds RTOS-based scheduling and buffering capabilities to these base drivers.
