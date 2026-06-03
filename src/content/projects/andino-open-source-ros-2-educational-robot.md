---
title: 'Andino: Open-Source ROS 2 Educational Robot'
summary: Andino is an open-source differential drive robot platform built for education
  and low-cost robotics research. It provides a complete ROS 2 Humble ecosystem, including
  microcontroller firmware, hardware descriptions, and integration with navigation
  and SLAM stacks. The project supports both physical hardware based on Raspberry
  Pi and a wide array of simulation environments like Gazebo and Webots.
slug: andino-open-source-ros-2-educational-robot
codeUrl: https://github.com/Ekumen-OS/andino
star: 287
version: 0.2.0
lastUpdated: '2025-06-23'
rtos: ''
topics:
- differential-drive-robot
- gazebo
- gazebo-ros
- gazebosim
- humble
- robotics
- ros
- ros2
- ros2-control
- urdf
isShow: true
image: /202601/andino.webp
createdAt: '2026-01-15'
updatedAt: '2026-01-15'
relatedProjects:
- pyespcar-micropython-esp32-wifi-car
- mobile-mecanum-4wd-robot
- cuybot-v1-opensource-smartcar-project
- openrover-robotic-platform
- korobo-2-1-gen
- tny-360-quadruped-robot
---

# Andino: A Complete Open-Source Platform for ROS 2 Robotics

Andino is a fully open-source differential drive robot designed to bridge the gap between educational theory and practical robotics application. Developed by Ekumen, it serves as a robust base platform for students and hobbyists to improve their skills in the robotics field using industry-standard tools like ROS 2.

## A Comprehensive Robotics Ecosystem

What sets Andino apart is its "batteries-included" approach to the robotics stack. It isn't just a hardware design or a simple driver; it is a collection of integrated packages that cover every aspect of a modern robot's lifecycle. From the low-level firmware that communicates with motors and sensors to the high-level SLAM (Simultaneous Localization and Mapping) and navigation stacks, Andino provides a clear, documented path for developers.

The project is built primarily for **ROS 2 Humble Hawksbill** running on **Ubuntu 22.04**. For the physical robot, it typically utilizes a Raspberry Pi 4B as the Single Board Computer (SBC), which handles the high-level ROS nodes, while a microcontroller manages the real-time hardware interfacing.

## Key Components and Architecture

The project structure is organized into several specialized packages that handle different layers of the robot's operation:

- **andino_firmware**: This contains the code that runs on the robot's microcontroller. It acts as the bridge between the SBC and the physical hardware, handling motor PWM, encoder feedback, and sensor data.
- **andino_hardware**: Provides the physical blueprints and assembly instructions. It is the physical foundation of the open-source design.
- **andino_base & andino_control**: These packages implement the ROS 2 Control hardware interfaces. This allows the robot to use standard controllers like the `diff_drive_controller` and `joint_state_broadcaster`, making the software side compatible with standard ROS-based robotics workflows.
- **andino_description**: Contains the URDF (Unified Robot Description Format) files, which define the robot's visual and physical properties for both simulation and visualization in RViz.

## Autonomy and Intelligence

Andino is fully equipped for autonomous operation. With the **andino_slam** package, users can generate maps of their environment using LIDAR data. Once a map is created, the **andino_navigation** package leverages the Nav2 stack to allow the robot to navigate complex environments, avoiding obstacles and planning paths to goals autonomously.

## Simulation: A Playground for Developers

One of Andino's strongest features is its extensive support for simulation. Recognizing that testing in simulation is often safer and faster than testing on hardware, the project supports an impressive array of engines:

- **Gazebo & Gazebo Classic**: The standard for ROS simulations.
- **Webots**: A popular open-source robot simulator.
- **O3DE (Open 3D Engine)**: For high-fidelity visual simulations.
- **NVIDIA Isaac Sim**: Leveraging Omniverse for advanced robotics simulation.
- **MuJoCo**: Optimized for fast and accurate physics.

## Getting Started with Andino

The project is designed to be accessible to a wide audience. It supports installation via **Ansible** for automated setup on a real robot, or building from source using the standard **colcon** build system. For those who prefer a containerized approach, a Docker configuration is also provided to ensure a consistent development environment across different machines. Whether you are a student looking to learn the ropes of ROS 2 or a developer prototyping a low-cost mobile platform, Andino provides a well-documented, community-supported foundation to build upon.
