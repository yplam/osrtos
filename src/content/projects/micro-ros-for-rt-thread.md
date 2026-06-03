---
title: micro-ROS for RT-Thread
summary: A port of the micro-ROS framework for the RT-Thread operating system, supporting
  the ROS 2 Galactic distribution. It enables resource-constrained microcontrollers
  to participate in the ROS 2 ecosystem via UDP or Serial transports. The project
  includes pre-compiled libraries for various ARM Cortex-M architectures and integrated
  examples for common ROS 2 tasks.
slug: micro-ros-for-rt-thread
codeUrl: https://github.com/wuhanstudio/micro_ros
star: 28
lastUpdated: '2022-10-31'
rtos: rt-thread
topics:
- micro-ros
- ros
- rt-thread
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- micro-ros-module-for-zephyr
- rt-rosserial-for-rt-thread
- c-common-for-rt-thread
- micropython-port-for-rt-thread
- tensorflow-lite-micro-for-rt-thread
- micro-ros-stm32-template
---

Micro-ROS brings the power of ROS 2 (Robot Operating System) to microcontrollers and resource-constrained devices. This project specifically targets the RT-Thread RTOS, providing a seamless integration for developers working with the ROS 2 Galactic distribution. By bridging the gap between high-level robotics software and low-level embedded systems, it allows RT-Thread nodes to communicate directly with a standard ROS 2 graph.

The communication between the Micro-ROS Agent and the RT-Thread nodes is flexible, supporting both Serial Port transports and UDP over IPv4 or IPv6. This versatility ensures compatibility with a wide range of hardware configurations, from simple UART connections to networked IoT devices.

### Hardware and Architecture Support

One of the strengths of this port is its broad support for ARM Cortex-M architectures. The build system is configured to handle various profiles, including:

- **ARM Cortex-M0+**
- **ARM Cortex-M3**
- **ARM Cortex-M4** (with support for FPV4 floating-point units, both soft and hard float)
- **ARM Cortex-M7** (with support for FPV5 floating-point units)

Static libraries are pre-generated for these architectures, simplifying the integration process for developers using different hardware platforms. The build process is managed via SCons, the standard build tool for RT-Thread, making it easy to include in existing RT-Thread projects.

### Integration with RT-Thread

The project is designed to work within the RT-Thread ecosystem, utilizing the `rtconfig` and `building` modules. It integrates with the RT-Thread shell (`msh`), allowing users to trigger micro-ROS nodes directly from the command line. For example, running a command like `microros_pub_int32` initializes the node, creates a publisher, and starts a dedicated thread for message transmission.

### Examples and Capabilities

The repository includes several practical examples that demonstrate the core functionality of micro-ROS on an RTOS:

- **Publishers and Subscribers**: Basic integer data exchange (`int32`) to verify connectivity.
- **Robotics Control**: Support for `geometry_msgs/Twist` messages, which are standard for controlling the velocity of mobile robots.
- **Services**: Implementation of ROS 2 services, such as an integer addition service.
- **Complex Interactions**: Ping-pong tests for latency measurement and specific examples for Kobuki robot control.

### Getting Started

To use this project, developers typically follow a three-step process:

1.  **Start the Micro-ROS Agent**: Usually run in a Docker container on a host machine, the agent acts as a bridge between the microcontroller and the ROS 2 network. It can be configured for serial or UDP communication.
2.  **Run the Node on RT-Thread**: Once the firmware is flashed to the target hardware, the RT-Thread shell is used to start the micro-ROS application.
3.  **Interact via ROS 2**: Use standard ROS 2 CLI tools on the host machine, such as `ros2 topic echo`, to verify that the embedded node is successfully communicating with the rest of the ROS 2 system.

This implementation provides a robust foundation for building complex robotic systems where real-time tasks are handled by RT-Thread while high-level logic and orchestration reside in the broader ROS 2 environment.
