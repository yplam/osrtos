---
title: RTAI-ROS
summary: RTAI-ROS integrates the Robot Operating System (ROS) with RTAI-Lab, allowing
  developers to generate hard real-time code from Matlab/Simulink for RTAI Linux.
  It replaces traditional RTAI-Lab communication tools with native ROS interfaces,
  enabling the use of standard ROS tools for monitoring and controlling real-time
  processes.
slug: rtai-ros
codeUrl: https://github.com/rhopfer/rtairos
siteUrl: https://rhopfer.github.io/rtairos/
star: 6
version: v1.1
lastUpdated: '2017-01-10'
rtos: rtai
topics:
- realtime
- ros
- rtai
- rtai-lab
- rtai-ros
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- urt-unified-interface-to-real-time-operating-systems
- rt-rosserial-for-rt-thread
- simple-open-ethercat-master-library-rtnet-version
- micro-ros-for-rt-thread
- cybergear-ros2-controller
- superviseur-robot-real-time-systems-project
---

## Overview

RTAI-ROS is a specialized bridge designed to bring the capabilities of the Robot Operating System (ROS) to the RTAI (Real-Time Application Interface) for Linux. Building upon the foundation of RTAI-Lab, this project enables a seamless workflow where control algorithms designed in Matlab/Simulink can be compiled into standalone real-time executables that communicate natively with a ROS ecosystem. 

Traditionally, RTAI-Lab required specific software like `xrtailab` to interact with running real-time processes. RTAI-ROS modernizes this approach by embedding a ROS node directly into the generated real-time task. This allows developers to use standard ROS utilities such as `rostopic`, `rviz`, and `rqt` to visualize data, tune parameters, and send commands to hard real-time control loops.

## Technical Architecture

The project functions as a Target Language Compiler (TLC) setup for Matlab's Real-Time Workshop (now Simulink Coder). It provides the necessary configuration files to transform a Simulink block diagram into C++ code optimized for RTAI's LXRT (Linux Real-Time) user-space environment.

Key components include:
- **rtairos.tlc**: The system target file that defines the code generation process and adds ROS-specific options to the Simulink configuration GUI.
- **RosInterface**: A C++ wrapper that manages the ROS node lifecycle, including publishers, subscribers, service servers, and TF broadcasters within the RTAI task context.
- **rtmain.cpp**: A specialized real-time entry point that initializes the RTAI environment, sets up shared memory for communication between the real-time loop and the ROS interface, and manages task scheduling.

## Hard Real-Time Integration

One of the primary challenges addressed by RTAI-ROS is the integration of the non-real-time ROS middleware with the hard real-time requirements of RTAI. The architecture typically employs a dual-task approach. The control logic runs in a high-priority RTAI task to ensure deterministic execution, while the ROS communication occurs in a separate, lower-priority thread. Data is exchanged between these domains using RTAI's high-performance synchronization primitives, such as semaphores and shared memory, ensuring that network jitter or ROS overhead does not interfere with the control loop's determinism.

## Key Features

- **Simulink Integration**: Provides a custom blockset and build target for Matlab, allowing users to specify ROS topic names, message types, and publication rates directly within the model.
- **Standard Message Support**: Includes support for common ROS message types, including `std_msgs`, `geometry_msgs`, and `sensor_msgs` (such as JointState and Joy).
- **Parameter Server Access**: Allows Simulink block parameters to be exposed to the ROS parameter server, enabling dynamic reconfiguration of the real-time controller.
- **TF Broadcaster**: Built-in support for publishing coordinate transforms, making it easy to integrate real-time robot state data with ROS visualization tools.

## Getting Started

To use RTAI-ROS, the environment must be configured with a working RTAI-enabled Linux kernel and a compatible ROS distribution (originally developed for ROS Hydro). The installation involves adding the RTAI-ROS files to the Matlab RTW directory and running a setup script to register the new target. Once configured, users select `rtairos.tlc` as the system target file in Simulink. The build process then generates a Linux executable that, when executed, appears as a standard ROS node while maintaining the timing guarantees of the RTAI kernel.
