---
title: MicroPython Sensor Fusion
summary: A MicroPython implementation of the Madgwick sensor fusion algorithm for
  calculating orientation from IMU data. It provides both synchronous and asynchronous
  (uasyncio) interfaces for 6DOF and 9DOF sensors. Designed for high performance on
  microcontrollers like the Pyboard, it enables real-time tracking of heading, pitch,
  and roll.
slug: micropython-sensor-fusion
codeUrl: https://github.com/micropython-IMU/micropython-fusion
star: 344
lastUpdated: '2020-08-26'
rtos: ''
libraries:
- micropython
topics:
- fusion
- micropython
- sensor
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- micropython-mpu9x50-imu-driver
- micropython-mpu-9250-i2c-driver
- mpu6050-interfacing-library-for-esp32-esp-idf
- filtered-inertial-rotation-module-firm
- stm32l476g-discovery-rtos-sensor-project
- micropython-port-for-rt-thread
---

## Overview

The `micropython-fusion` library provides a robust implementation of the Madgwick algorithm specifically optimized for MicroPython-based embedded systems. Sensor fusion is a critical process in robotics, drones, and wearable devices, where it combines raw data from accelerometers, gyroscopes, and magnetometers to produce accurate orientation data—specifically heading, pitch, and roll.

The Madgwick algorithm is widely favored in the multicopter community for its computational efficiency and high-quality output. On a standard Pyboard, an update cycle takes less than 2ms, making it suitable for high-frequency control loops. The library is designed to be sensor-agnostic, meaning it can interface with any Inertial Measurement Unit (IMU) that provides the necessary vector data, though it has been extensively tested with the InvenSense MPU-9150.

## Synchronous and Asynchronous Operation

One of the library's most powerful features is its support for two distinct programming models:

1.  **Synchronous Implementation**: Contained in `fusion.py`, this version is ideal for simple applications where the sensor data is polled and processed in a linear fashion.
2.  **Asynchronous Implementation**: Contained in `fusion_async.py`, this version utilizes the `uasyncio` library. It allows sensor fusion to run as a background task, enabling the application to access the latest orientation data with effectively zero latency. This is particularly useful for complex systems where the CPU must handle multiple tasks like networking, display updates, and motor control simultaneously.

## Handling 6DOF and 9DOF Sensors

The library supports both 6-Degrees-of-Freedom (accelerometer and gyroscope) and 9-Degrees-of-Freedom (adding a magnetometer) sensors. 

*   **9DOF Sensors**: By incorporating magnetometer data, the algorithm can calculate a stable `heading` relative to magnetic North. The library includes a `calibrate` method to help users compensate for local magnetic fields and ferrous metals that might otherwise distort the readings.
*   **6DOF Sensors**: In configurations without a magnetometer, the library provides `update_nomag`. While this mode cannot provide an absolute heading, it remains highly effective for tracking `pitch` and `roll` (elevation and bank).

## Technical Considerations and Performance

Because the Madgwick algorithm relies heavily on floating-point mathematics, RAM allocation can be a concern on smaller MicroPython platforms like the ESP8266. The library documentation recommends using frozen bytecode and periodic manual garbage collection to maintain stability. 

For developers working on slower platforms, the asynchronous version includes a `slow_platform` argument in its `start()` method. When enabled, this adds a yield to the scheduler in the middle of the computation, preventing the fusion algorithm from starving other background tasks of CPU time.

## Getting Started

To use the asynchronous version, you define a coroutine that reads your IMU hardware and returns the data as tuples. The `Fusion` object then manages the background updates automatically.

```python
from fusion_async import Fusion
import uasyncio as asyncio

# Example coroutine to read sensor data
async def read_coro():
    # Hardware dependent: trigger and wait for sensor data
    await asyncio.sleep_ms(20)
    return imu.accel.xyz, imu.gyro.xyz, imu.mag.xyz

fuse = Fusion(read_coro)

async def main():
    # Start the background update task
    await fuse.start()
    
    while True:
        print(f"Heading: {fuse.heading} Pitch: {fuse.pitch} Roll: {fuse.roll}")
        await asyncio.sleep_ms(100)

asyncio.run(main())
```

## Key Variables and Units

The library outputs Euler angles in degrees:
*   **Heading**: Angle relative to North (often called yaw).
*   **Pitch**: Angle of the nose relative to the ground (elevation).
*   **Roll**: Angle of the wings/sides relative to the ground (bank).
*   **Quaternion (q)**: For advanced users, the raw unit quaternion `[w, x, y, z]` is also available, which is useful for performing 3D rotations without the mathematical pitfalls of Euler angles, such as gimbal lock.
