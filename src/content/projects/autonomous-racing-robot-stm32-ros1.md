---
title: Autonomous Racing Robot (STM32 + ROS1)
summary: A differential-drive autonomous robot utilizing an STM32F446RE for real-time
  motor control and ROS1 Noetic for mapping and navigation. The system employs a transparent
  Bluetooth communication link to perform laser-only SLAM via hector_slam on a remote
  host, optimizing performance for high-speed racing in static environments without
  the need for traditional odometry.
slug: autonomous-racing-robot-stm32-ros1
codeUrl: https://github.com/StarDust-XCHH/autonomous-car-project
lastUpdated: '2025-10-26'
licenses:
- MIT
image: /202604/f446re.avif
rtos: ''
topics:
- cubemx
- hector-slam
- keil-uvision5
- lidar-slam
- move-base-plugin
- pid-control
- ros-noetic
- slam
- stm32f4
isShow: true
createdAt: '2026-04-27T00:36:21+00:00'
updatedAt: '2026-04-27T00:36:21+00:00'
---

Building an autonomous robot often involves a complex dance between low-level hardware control and high-level spatial reasoning. This project simplifies that relationship through a minimalist, high-speed racing robot that bridges the gap between an STM32-based embedded system and the ROS1 (Noetic) ecosystem. Designed with a focus on efficiency and resource-constrained environments, the robot excels at navigating unknown static mazes using a "transparent transmission" architecture.

### System Architecture and Communication

The project is built around a differential-drive chassis powered by an STM32F446RE (Nucleo-64) development board. What makes this implementation unique is its communication model. Rather than processing heavy LiDAR data or calculating complex odometry on the microcontroller, the system uses a transparent Bluetooth relay. 

The STM32 acts as a high-speed data conduit. It reads raw hexadecimal streams from an RPLIDAR C1 and prepends a custom frame header before forwarding the data directly to a remote ROS host. On the return path, the ROS host sends lightweight velocity command frames which the STM32 translates into high-response PID motor control. This design significantly reduces the computational load on the embedded side, allowing the MCU to focus entirely on precise motor execution and sensor acquisition.

### Odometry-Free SLAM

A common challenge in robotics is the accumulation of error in wheel encoders, especially at high speeds. This project sidesteps that issue entirely by adopting an open-loop control architecture on the hardware side. By utilizing `hector_slam` on the ROS host, the robot performs laser-only SLAM. This means the system builds maps and determines its position based solely on LiDAR scans, removing the dependency on `/odom` messages. This approach is particularly effective in static environments where the laser can provide high-frequency updates to the navigation stack.

### Optimized Racing Navigation

Navigation is handled by a customized `move_base` local planner. Unlike traditional planners that prioritize cautious obstacle avoidance and complex costmap filtering, this project’s planner is stripped down for speed. By disabling real-time costmap updates, the robot achieves the high-speed path tracking required for racing scenarios. 

A dedicated "referee node" provides the logic for autonomous missions. Users can input target coordinates relative to the starting point, and the robot will autonomously explore the environment, map it in real-time, reach the goal, and return to the start. 

### Hardware Integration

The hardware stack is a blend of precision sensors and robust motor drivers:
- **Controller**: NUCLEO-F446RE (STM32F4 series).
- **Sensors**: RPLIDAR C1 for environment scanning and an MPU6050 IMU for orientation data.
- **Actuation**: MCS20 motors with Hall encoders (used for local PID loops) driven by an ATB236 dual-channel module.
- **Communication**: HC-04 Bluetooth module for long-range transparent data transmission.

### Use Cases and Applications

This project serves as an excellent reference for several scenarios:
- **Remote SLAM Architectures**: Ideal for developers looking to offload heavy computation (like SLAM and path planning) from the robot to a powerful remote server or workstation.
- **Autonomous Racing**: A solid foundation for "go-to-goal-and-return" competitions in static environments.
- **Educational Prototyping**: A clear example of how to integrate STM32CubeMX-generated HAL code with the ROS navigation stack using custom serial protocols.

By prioritizing a lightweight design and focusing on the synergy between transparent data transmission and laser-only localization, this project demonstrates a streamlined path to high-speed autonomous navigation.
