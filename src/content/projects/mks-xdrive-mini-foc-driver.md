---
title: MKS XDRIVE Mini FOC Driver
summary: A comprehensive guide and firmware collection for the MKS XDRIVE Mini, a
  high-performance FOC motor driver based on the ODrive architecture. It includes
  configuration scripts, Arduino-based CAN bus examples for ESP32, and critical procedures
  for firmware recovery and multi-driver synchronization.
slug: mks-xdrive-mini-foc-driver
codeUrl: https://github.com/justlovescience/MKS-XDRIVE-MINI
siteUrl: https://youtu.be/yRx7dsJmNvU
lastUpdated: '2026-04-06'
rtos: freertos
topics:
- actuator
- arduino
- bldc-motor-control
- brushless-servo
- can-bus
- esp32-s3
- field-oriented-control
- firmware
- foc-driver
- hardware-guide
- makerbase
- makerbase-mks
- mks-xdrive-mini
- motor-driver
- odrive
- quadruped-robot
- robotics
- st-link
- tutorial
- unbrick-guide
isShow: false
createdAt: '2026-04-21T05:25:21+00:00'
updatedAt: '2026-04-21T05:25:21+00:00'
---

The MKS XDRIVE Mini represents a cost-effective entry point into the world of high-performance Field Oriented Control (FOC) for robotics. Based on the proven ODrive architecture, this driver is designed to handle demanding motor control tasks with precision, utilizing the ODrive tool ecosystem for configuration and the CAN bus for robust communication in complex multi-axis systems.

### Core Architecture and Firmware

At its heart, the MKS XDRIVE Mini runs a modified version of the ODrive v0.5.1 firmware. This specific version is critical for the hardware's operation; the driver utilizes the DRV8301 gate driver, and standard upstream ODrive firmware updates (such as v0.5.6) often lead to motor inactivity due to differing pin assignments. Users are cautioned against using the standard `upgrade` command within the ODrive tool, as it can brick the device. For those who do encounter a bricked state, the repository provides original firmware dumps that can be flashed using an ST-Link V2 programmer.

### Configuration and Motor Tuning

Setup is primarily handled through the ODrive tool, a Python-based shell interface. The configuration process involves defining motor parameters, most notably the pole pairs. Accurate tuning is essential for performance; for instance, a motor like the LA8308 with 170kV requires the pole pairs to be set to 20 (calculated by halving the magnet count). The repository includes a `my_config.txt` file containing the necessary command sequences to streamline this initial setup.

For users who prefer a graphical interface, the project is compatible with community-developed web GUIs, allowing for visual monitoring and parameter adjustment without deep diving into the command line.

### CAN Bus Integration and Multi-Driver Systems

One of the most powerful features of the MKS XDRIVE Mini is its CAN bus support, which is vital for building complex robots with multiple joints. However, because the driver essentially acts as a dual-axis ODrive, it can cause ID conflicts when multiple units are placed on the same bus. 

A unique fix provided in this guide involves managing the "ghost" Axis1. By default, both axes attempt to claim IDs, which can clutter the communication line. By setting the unused Axis1 to a "listen-only" ID (such as 63), the bus is cleared for other drivers. 

### Arduino and ESP32 Ecosystem

The repository provides several practical examples for controlling the driver via an ESP32 or ESP32-S3 using the Two-Wire Automotive Interface (TWAI). These examples demonstrate various control modes:

*   **MotionLink**: A master-slave synchronization system where one motor (in torque control mode) is moved manually, and a second motor (in position control mode) mirrors its movement.
*   **CAN Test**: A basic implementation showing how to transition the ODrive into a closed-loop control state and send sine-wave position commands.
*   **ID Finder**: A diagnostic tool that monitors the CAN bus for heartbeat frames, allowing developers to identify active node IDs in real-time.

To facilitate this, the project utilizes an adapter library specifically designed to bridge the ODrive Arduino library with the ESP32's native CAN hardware, ensuring high-speed, reliable communication between the micro-controller and the power electronics.
