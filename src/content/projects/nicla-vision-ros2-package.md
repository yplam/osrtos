---
title: Nicla Vision ROS2 Package
summary: A ROS2 interface for the Arduino Nicla Vision board that enables sensor data
  streaming over TCP, UDP, or Serial connections. It provides standardized ROS2 topics
  for the board's 2MP camera, IMU, Time-of-Flight sensor, and microphone, supporting
  both physical hardware and Gazebo simulation.
slug: nicla-vision-ros2-package
codeUrl: https://github.com/ADVRHumanoids/nicla_vision_ros2
siteUrl: https://docs.arduino.cc/hardware/nicla-vision/
star: 10
version: 1.1.1
lastUpdated: '2025-11-12'
rtos: mbed-os
libraries:
- micropython
topics:
- arduino
- gazebo
- micropython
- nicla-vision
- ros2
- sensors-data-collection
isShow: false
createdAt: '2026-02-08'
updatedAt: '2026-02-08'
relatedProjects:
- rt-rosserial-for-rt-thread
- cybergear-ros2-controller
- micro-ros-module-for-zephyr
- micro-ros-stm32-template
- arduino-dronecan
- micro-ros-for-rt-thread
---

## Overview

The Nicla Vision ROS2 package serves as a bridge between the Arduino Nicla Vision—a powerful, compact board equipped with a dual-core STM32H7 processor—and the ROS2 ecosystem. By providing a standardized interface, it allows developers to treat the Nicla Vision as a plug-and-play sensor suite for robotic platforms. The package is designed to run on a ROS2-enabled host machine, receiving high-speed sensor data from the board and publishing it to the ROS graph.

## Architecture and Connectivity

The system utilizes a client-server architecture where the Nicla Vision board streams sensor data to a ROS-running machine through TCP/UDP sockets or a Serial connection. This flexibility allows the board to be used either as a wireless remote sensor or as a directly tethered component. The Python-based receiver is optimized for high-throughput data handling, ensuring that high-bandwidth streams like the 2MP color camera are processed with minimal latency.

## Sensor Integration

The package provides comprehensive support for the Nicla Vision's onboard hardware:
- **Vision**: Streams 2MP color images in both raw and compressed formats, including standard `camera_info` for calibration.
- **Distance Sensing**: Integrates the Time-of-Flight (ToF) sensor for range finding.
- **Motion Tracking**: Publishes IMU data for orientation and acceleration sensing.
- **Audio**: Streams microphone data and includes an optional integration with the VOSK speech recognition engine, allowing for on-device or host-side voice command processing.

## Simulation and Development

Beyond hardware interfacing, the repository includes tools for simulation and visualization. It provides URDF models and meshes that allow the Nicla Vision to be visualized in Rviz or simulated within the Gazebo environment. This is particularly useful for developers who need to test sensor fusion algorithms or robot transforms before deploying to physical hardware.

## Configuration and Usage

Launching the interface is straightforward via ROS2 launch files. Users can configure the connection type (TCP, UDP, or Serial), specify IP addresses, and toggle individual sensors to optimize bandwidth usage. For example, a user can enable only the IMU and ToF sensors for a low-power navigation task, or enable the full camera and audio suite for a telepresence application.

```bash
ros2 launch nicla_vision_ros2 nicla_receiver.launch receiver_ip:="x.x.x.x" connection_type:="tcp"
```

While the project has primarily moved toward an Arduino-based driver implementation for performance, it maintains legacy support for MicroPython, offering versatility for different development workflows. This package is an essential tool for researchers and hobbyists looking to leverage the advanced sensing capabilities of the Nicla Vision within the ROS2 framework.
