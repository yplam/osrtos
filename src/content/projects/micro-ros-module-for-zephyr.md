---
title: micro-ROS module for Zephyr
summary: A dedicated middleware module that integrates micro-ROS with the Zephyr RTOS,
  allowing microcontrollers to function as ROS 2 nodes. It supports multiple transport
  layers including Serial and UDPv4, targeting resource-constrained hardware like
  the STM32-based Discovery IoT kit.
slug: micro-ros-module-for-zephyr
codeUrl: https://github.com/micro-ROS/micro_ros_zephyr_module
star: 79
version: 6.0.0
lastUpdated: '2025-12-15'
rtos: zephyr
topics:
- micro-ros
- zephyr
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- micro-ros-for-rt-thread
- rt-rosserial-for-rt-thread
- micro-ros-stm32-template
- cybergear-ros2-controller
- zephyr-grbl
- zephyr-rtos-lorawan-node
---

## Bridging ROS 2 and Zephyr RTOS

The micro-ROS module for Zephyr provides a seamless bridge between the Robot Operating System (ROS 2) ecosystem and the Zephyr Real-Time Operating System. As micro-ROS is designed to bring ROS 2 to microcontrollers and resource-constrained devices, this module acts as the glue that allows Zephyr-based applications to communicate with standard ROS 2 environments using the XRCE-DDS protocol.

This implementation has been validated on Zephyr RTOS versions v4.0.0 and v4.1.0, utilizing the Zephyr SDK 0.16.9-rc3. It is designed to work within the standard Zephyr development workflow, leveraging the `west` build system and `menuconfig` for easy integration and configuration.

## Key Features and Capabilities

The module provides several essential features for embedded robotics development:

- **Multiple Transport Layers**: It supports communication via Serial (UART) and UDPv4, allowing developers to choose the best physical medium for their specific hardware and networking requirements.
- **Standard Zephyr Integration**: The module integrates directly into the Zephyr build system. By adding `CONFIG_MICROROS=y` to the project configuration, developers can enable micro-ROS support within their existing Zephyr applications.
- **Hardware Flexibility**: While tested on boards like the `disco_l475_iot1` (STM32L4 Discovery kit for IoT), the module is designed to be portable across various Zephyr-supported architectures.
- **Docker-Ready Workflow**: The project provides clear instructions for using Docker-based micro-ROS Agents, simplifying the process of bridging the embedded device to a host machine running ROS 2.

## Technical Implementation

The module relies on `colcon` and several Python packages (`catkin_pkg`, `lark-parser`, `empy`) to build the necessary micro-ROS packages. Within the Zephyr environment, it utilizes the POSIX API and Newlib C library to manage threading and clock synchronization, ensuring that the micro-ROS client can maintain stable communication with the agent.

Configuration is handled through Zephyr's Kconfig system. Developers can fine-tune parameters such as stack sizes, thread priorities, and transport-specific settings (like UART interrupt-driven modes or line control) using the standard `west build -t menuconfig` interface.

## Getting Started

To use this module, developers typically include it as an extra module in their Zephyr workspace. A basic build command for a supported board looks like this:

```bash
west build -b disco_l475_iot1 -p
```

Once the firmware is flashed, a micro-ROS Agent must be running on the host side to facilitate communication with the rest of the ROS 2 graph. This can be achieved easily using Docker:

```bash
# For Serial communication
docker run -it --rm -v /dev:/dev --privileged --net=host microros/micro-ros-agent:kilted serial --dev [YOUR BOARD PORT] -v6

# For UDPv4 communication
docker run -it --rm --net=host microros/micro-ros-agent:kilted udp4 --port 8888 -v6
```

## Development and Safety

It is important to note that this software is currently positioned as a development tool rather than a production-ready solution. The maintainers advise that it has not been tested for specific safety-critical use cases. Developers looking to use this in safety-relevant settings, such as those governed by ISO 26262, should perform their own validation and adjustments to meet applicable standards.
