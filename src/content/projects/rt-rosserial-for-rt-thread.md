---
title: RT-Rosserial for RT-Thread
summary: A rosserial implementation for the RT-Thread RTOS that enables microcontrollers
  to communicate with the Robot Operating System (ROS). It supports both UART and
  TCP communication protocols, allowing embedded devices to publish sensor data and
  subscribe to ROS topics.
slug: rt-rosserial-for-rt-thread
codeUrl: https://github.com/wuhanstudio/rt-rosserial
siteUrl: http://wuhanstudio.cc
star: 24
version: melodic-v1.0.0
lastUpdated: '2021-11-08'
rtos: rt-thread
libraries:
- lwip
topics:
- ros
- rosserial
- rt-thread
- tcp
- uart
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- micro-ros-for-rt-thread
- micro-ros-module-for-zephyr
- uc-modbus-for-rt-thread
- nicla-vision-ros2-package
- iotsharp-for-rt-thread
- micro-ros-stm32-template
---

## Overview

RT-Rosserial is a specialized communication package designed to bridge the gap between the RT-Thread real-time operating system and the Robot Operating System (ROS). By implementing the rosserial protocol, this project allows resource-constrained microcontrollers to participate in a ROS network as distributed nodes. This enables embedded systems to handle low-level tasks like sensor data collection and motor control while seamlessly interacting with high-level ROS nodes running on more powerful hardware like PCs or ARM-based single-board computers.

## Communication Capabilities

The project provides flexibility in how the embedded device connects to the ROS master. It supports two primary communication modes:

- **UART (Serial):** A standard wired connection using USART, typically used for direct connections to a host computer via USB-to-TTL adapters.
- **TCP (Network):** A wireless or wired network connection. This mode requires the RT-Thread system to have a functional network interface, such as an ENC28J60 SPI Ethernet controller combined with the lwIP stack.

By using these protocols, developers can publish sensor information to ROS topics or subscribe to control commands. A common application demonstrated in the project is a remote-controlled camera car where the MCU handles the hardware interface while ROS manages the high-level logic and visualization.

## Technical Implementation

RT-Rosserial is structured as an RT-Thread package, utilizing the SCons build system for easy integration. The source code is organized into core logic, porting layers for RT-Thread primitives, and a variety of examples. The implementation handles the serialization and deserialization of ROS messages, allowing C++ developers to use familiar ROS-like syntax within their RT-Thread applications.

## Key Features and Examples

The repository includes a wide range of examples that demonstrate the versatility of the library:
- **Basic Messaging:** Hello World examples for both UART and TCP.
- **Hardware Control:** LED blinking and button state reporting.
- **Advanced ROS Features:** Support for TF (Transform) broadcasts, Service Servers, and Service Clients.
- **Robotics Integration:** Specific examples for Kobuki robot control.

## Getting Started

To use RT-Rosserial, a ROS environment must be set up on a host machine (such as Ubuntu running ROS Noetic or Melodic). On the embedded side, the package is configured through RT-Thread's Menuconfig system. Once the firmware is running, the `rosserial_python` node is used on the host to establish the link:

```bash
# For Serial connection
rosrun rosserial_python serial_node.py /dev/ttyUSB0

# For TCP connection
rosrun rosserial_python serial_node.py tcp
```

After the connection is established, standard ROS tools like `rostopic echo` can be used to monitor data coming from the RT-Thread device, enabling a unified development workflow between embedded firmware and high-level robotics software.
