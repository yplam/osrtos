---
title: Cybergear ROS2 Controller
summary: A ROS 2 bridge for controlling Xiaomi Cybergear motors using M5Stack hardware
  via micro-ROS and Ethernet. The system supports multiple motor configurations, real-time
  control modes, and parameter tuning through standard ROS 2 interfaces.
slug: cybergear-ros2-controller
codeUrl: https://github.com/project-sternbergia/cybergear_micro_ros_m5
lastUpdated: '2024-05-11'
licenses:
- MIT
image: /202604/cybergear_micro_ros_m5_0.avif
rtos: freertos
libraries:
- lwip
topics:
- arduino
- m5stack
- micro-ros
- ros2
- xiaomi
isShow: true
createdAt: '2026-04-02T23:25:26+00:00'
updatedAt: '2026-04-02T23:25:26+00:00'
---

## Package Summary

The Cybergear ROS2 Controller is designed to bridge the gap between high-level ROS 2 environments and the Xiaomi Cybergear motor hardware. By leveraging the M5Stack ecosystem and micro-ROS, this package allows for the control of multiple Cybergear motors over an Ethernet (RJ45) connection. This setup is particularly useful for robotics applications requiring reliable, high-bandwidth communication and the ability to manage several actuators through a centralized ROS 2 node.

## Hardware Components

The project supports two primary hardware configurations based on M5Stack controllers. Both setups utilize the W5500 Ethernet controller to provide stable network connectivity for micro-ROS.

### Case 1: M5Stack Basic

This configuration uses the classic M5Stack Basic V2.7 paired with a dedicated LAN Module. It is ideal for setups where a larger screen and more physical buttons are required for local interaction.


Key components for this build include:
* **Xiaomi Cybergear**: The primary actuator.
* **M5Stack Basic V2.7**: The ESP32-based core controller.
* **LAN Module W5500 with PoE**: Provides Ethernet and power delivery.
* **XT30(2+2)-F & Grove Cable**: For power and CAN bus connectivity.

### Case 2: M5Stack AtomS3

For more compact applications, the AtomS3 provides a miniature footprint while maintaining full functionality. This setup uses the Atomic PoE Base for networking.

![M5Stack AtomS3 Cybergear Controller Setup](/202604/cybergear_micro_ros_m5_1.avif)

Key components for this build include:
* **ATOMS3 Dev Kit**: A compact ESP32-S3 controller with a built-in screen.
* **ATOMIC PoE Base W5500**: Compact Ethernet interface.
* **Mini CAN Unit (TJA1051T/3)**: Essential for translating the controller's signals to the Cybergear's CAN bus.

## Technical Architecture and Build

The firmware is developed using the PlatformIO environment within VSCode. It relies on the `micro_ros_arduino` library to handle ROS 2 communication. One specific technical requirement for this project is a modification to the micro-ROS static library. Users must apply a patch to the `colcon.meta` file and rebuild the library using a Docker-based builder to accommodate the necessary number of ROS services required for full motor control.

The system utilizes FreeRTOS tasks to manage the concurrency between high-frequency motor control loops over CAN and the asynchronous nature of Ethernet-based ROS 2 messaging. This ensures that motor state reporting and command execution remain responsive even under network load.

## Firmware Configuration and Usage

Before deployment, the firmware requires network and motor configuration. Users must specify the local IP address and the micro-ROS agent's IP within the source code. Additionally, the Cybergear motors must be flashed with the latest firmware and assigned specific CAN IDs (defaulting to 0x7E and 0x7F for the demo) to ensure they are correctly addressed by the controller.

Once the micro-ROS agent is running (typically via a Docker container), the controller exposes several ROS 2 interfaces:
* **Topics**: `/cgc_node/joint_command` for control and `/cgc_node/joint_state` for feedback.
* **Services**: `/cgc_node/control_power` to enable or disable the motors.
* **Parameters**: A wide array of tuning parameters for gains and limits.

![ROS2 Topic and Parameter Visualization](/202604/cybergear_micro_ros_m5_2.avif)

## ROS2 Parameters and Control Modes

The controller supports four distinct run modes for the Cybergear: Motion (0), Position (1), Speed (2), and Current (3). Each mode can be fine-tuned using ROS 2 parameters, allowing for dynamic adjustment of control gains without reflashing the firmware. 

Available parameters include:
* **Limits**: Speed (rad/sec), Current (A), and Torque (Nm).
* **Gains**: Position P-gain (`loc_kp`), Speed P/I gains (`spd_kp`, `spd_ki`), and Current P/I gains (`cur_kp`, `cur_ki`).

These parameters allow for precise tailoring of the motor's performance to the specific requirements of the robotic system, whether it requires high-speed movement or delicate torque control.
