---
title: Filtered Inertial Rotation Module (FIRM)
summary: FIRM is a high-powered rocketry flight computer firmware designed for accurate
  attitude and position tracking. Built for the STM32F405 microcontroller, it utilizes
  FreeRTOS and advanced Kalman filtering to process data from an array of inertial
  and environmental sensors.
slug: filtered-inertial-rotation-module-firm
codeUrl: https://github.com/NCSU-High-Powered-Rocketry-Club/FIRM
siteUrl: https://firm.ncsurocketry.org/docs
version: v0.2.0
lastUpdated: '2026-03-25'
licenses:
- MIT
rtos: freertos
topics:
- c
- flight-computer
- kalman-filter
- rtos
- stm32f4
isShow: true
image: /202606/firm_plugged_in.webp
createdAt: '2026-06-02T09:59:04+00:00'
updatedAt: '2026-06-02T09:59:04+00:00'
relatedProjects:
- alturia-firmware
- avem
- droners
- bitcraze-crazyflie-2-0-2-1-mbed-os-firmware
- james-rocket-controller
- flight-controller-rev2
---

The Filtered Inertial Rotation Module (FIRM) represents a sophisticated approach to flight instrumentation for high-powered rocketry. Developed by the NCSU High Powered Rocketry Club, this project serves as the primary flight computer for tracking a rocket's attitude and position during high-speed ascent and recovery. By combining high-frequency sensor data with robust filtering algorithms, FIRM provides the precise telemetry required for advanced rocketry missions.

### Hardware Architecture

The firmware is specifically tailored for the STM32F405RGT6, a high-performance ARM Cortex-M4 microcontroller. The hardware design is modular, allowing it to be adapted to various rocket configurations. To achieve high-fidelity motion tracking, the system integrates a comprehensive sensor suite:

*   **ICM-45686 6-Axis IMU**: Provides high-resolution accelerometer and gyroscope data.
*   **MMC5983MA Magnetometer**: Delivers magnetic field sensing for heading orientation.
*   **BMP581 Pressure Sensor**: Offers precision altitude data through barometric pressure monitoring.
*   **ADXL371**: A high-G accelerometer capable of handling the intense forces of rocket launches.
*   **W25Q128JV**: External flash storage for non-volatile data management.

### Software and Real-Time Processing

At its core, FIRM leverages FreeRTOS to manage the concurrency required for real-time flight systems. The firmware must simultaneously sample multiple sensors, run computational heavy-lifting—such as Kalman filters for attitude estimation—and log data to storage without missing critical timing windows. 

The project utilizes the STM32Cube HAL (Hardware Abstraction Layer) for peripheral management and the ARM CMSIS math libraries to optimize the matrix calculations necessary for inertial navigation. For data persistence, it incorporates the FatFs middleware, enabling the flight computer to log telemetry directly to an SD card in a standard file format.

### Advanced Tracing and Debugging

One of the standout features of the FIRM development workflow is its approach to performance profiling. In high-speed flight applications, understanding thread execution time and latency is vital. The project includes a custom tracing implementation that allows developers to dump binary trace data from the STM32 via a debugger. 

This data can then be converted into a JSON format compatible with visualization tools like Spall or Perfetto. This allows the team to see exactly how long each FreeRTOS thread runs, ensuring that the sensor fusion algorithms and logging tasks never exceed their allotted time slices during a flight.

### Development Environment

FIRM utilizes a modern development stack centered around VS Code and CMake. It employs the `uv` Python toolchain for managing scripts and pre-commit hooks, ensuring code quality through `clang-format` and `clang-tidy`. This structured environment allows for a professional-grade firmware development lifecycle, from initial configuration in STM32CubeMX to final flashing via SWD (Serial Wire Debug).
