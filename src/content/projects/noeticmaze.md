---
title: NoeticMaze
summary: NoeticMaze is an embedded navigation and control system for the NUCLEO-F446RE
  development board, integrating Lidar, IMU, and motor control. Built on FreeRTOS,
  it implements advanced robotics algorithms including ICP-based localization, grid
  mapping, and A* path planning for autonomous differential-drive robots.
slug: noeticmaze
codeUrl: https://github.com/StarDust-XCHH/NoeticMaze
lastUpdated: '2026-05-29'
image: /202606/NoeticMaze_0.avif
rtos: freertos
topics:
- astar
- cmake
- dma
- dsp
- embedded-systems
- fpu
- freertos
- icp
- imu-sensor
- lidar-point-cloud
- mpu6500
- pid-control
- slam
- slam-algorithms
- spi
- stm32f4
- usart
isShow: true
createdAt: '2026-06-09T00:27:43+00:00'
updatedAt: '2026-06-09T00:27:43+00:00'
relatedProjects:
- autonomous-racing-robot-stm32-ros1
- arm-control-framework-acorns-rover
- texas-aimbots-embedded-development
- cuybot-v1-opensource-smartcar-project
- stm32l476g-discovery-rtos-sensor-project
- embedded-graphical-interface-for-pid-control
---

NoeticMaze is a comprehensive embedded robotics project designed to demonstrate advanced navigation capabilities on the STM32F446RE microcontroller. Unlike many simple motor-control projects, NoeticMaze implements a full navigation stack—ranging from raw sensor fusion to high-level path planning—directly on the NUCLEO-F446RE platform. By leveraging the FreeRTOS real-time operating system and the CMSIS-RTOS v2 API, the system manages a complex array of concurrent tasks including Lidar processing, IMU attitude estimation, and real-time motion control.

## System Architecture and Modular Design

The project is built with a highly modular structure, separating hardware abstraction from high-level logic. This organization is reflected in the `App/` directory, which contains dedicated modules for different robot functions:

*   **Perception**: The `App/lidar` module handles UART DMA reception and protocol decoding to build a 360-degree point cloud, while the `App/imu` module interfaces with an MPU6500 over SPI to process attitude and yaw data.
*   **Localization and Mapping**: The `App/algorithmBrain` serves as the bridge between raw data and spatial awareness. It converts polar scans into Cartesian coordinates and performs ICP (Iterative Closest Point) localization to maintain an accurate estimate of the robot's pose.
*   **Path Planning**: Using the `App/Planner` module, the system maintains a 10 cm resolution grid map. It utilizes an A* search algorithm with priority queues and path smoothing to generate safe trajectories through the environment.
*   **Actuation**: The `App/motor` module abstracts the complexities of PWM generation, encoder feedback, and PID-based motion control, ensuring the differential-drive chassis follows the planned path accurately.

## Intelligent Navigation Stack

At the heart of NoeticMaze is its ability to transform sensor data into movement. The system processes Lidar frames using a zero-copy buffer pool to minimize overhead, allowing the STM32's Cortex-M4F core to focus on computationally intensive tasks like mapping and pathfinding. When the robot detects obstacles or significant pose drift, the `algorithmBrain` triggers a re-planning request. The A* planner then calculates a new optimal path, which is published via FreeRTOS event flags to the motor control task.

## Hardware Integration

NoeticMaze is optimized for the NUCLEO-F446RE, utilizing its rich peripheral set:
*   **Timers**: Used for both PWM output (TIM2) and quadrature encoder feedback (TIM3, TIM4).
*   **Communication**: Multiple USART interfaces handle Lidar data and Bluetooth telemetry, while SPI is dedicated to the MPU6500 IMU.
*   **DMA**: Heavily utilized for Lidar reception to ensure no data is lost during high-speed rotation.

## Development and Tooling

The project is designed for a modern embedded development workflow using CLion, CMake, and the Ninja build system. It includes a comprehensive `CMakeLists.txt` that links the STM32Cube HAL, CMSIS-DSP for mathematical optimizations, and the FreeRTOS middleware. Debugging is streamlined through OpenOCD configurations, supporting ST-LINK for real-time firmware inspection and telemetry via Bluetooth for remote monitoring.
