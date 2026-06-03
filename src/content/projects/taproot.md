---
title: Taproot
summary: A C++20 control library and framework specifically built for RoboMaster robotics
  competitions. It features a command-based scheduler inspired by WPILib, comprehensive
  drivers for DJI hardware, and advanced modules for power limiting and sensor filtering,
  targeting RoboMaster Development Boards using the modm HAL.
slug: taproot
codeUrl: https://github.com/uw-advanced-robotics/taproot
siteUrl: https://aruw.gitlab.io/controls/taproot/
star: 17
version: '2.0'
lastUpdated: '2026-01-01'
rtos: ''
libraries:
- modm
topics:
- cpp
- framework
- modm
- robomaster
- robotics
- stm32
- vscode
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- texas-aimbots-embedded-development
- aruw-main-control-board-mcb
- breeze
- spirit-motor-driver-library
- arm-control-framework-acorns-rover
- xiaomi-cybergear-arduino-library
---

## Overview

Taproot is a comprehensive, modern C++ control library and framework designed specifically for the RoboMaster robotics competition. Developed by the Advanced Robotics at the University of Washington (ARUW) team, it provides a robust foundation for building complex robot control software. The library is built on top of the `modm` C++-native Hardware Abstraction Layer (HAL) and leverages C++20 features to provide a clean, efficient, and well-tested API.

At its core, Taproot aims to solve the common challenges faced by RoboMaster teams: managing complex hardware interactions, implementing precise control loops, and maintaining a scalable codebase. It transitions away from simple loop-based architectures toward a sophisticated command-based framework that allows for modular and reusable robot behaviors.

## The Command-Based Framework

One of Taproot's most significant features is its organizational framework and round-robin scheduler, which takes inspiration from FIRST's WPILib. This architecture centers around two main concepts:

- **Subsystems**: These represent distinct functional units of the robot, such as a chassis, gimbal, or intake. Subsystems encapsulate hardware logic, jam detection, and calibration routines.
- **Commands**: These represent specific actions or behaviors, such as "Move to Position" or "Follow Target." Commands can be scheduled, interrupted, and composed into complex sequences or concurrent groups.

This design allows developers to write high-level logic without worrying about the underlying timing or resource conflicts, as the scheduler manages subsystem access and execution flow.

## Hardware Support and Drivers

Taproot includes first-class support for the standard DJI/RoboMaster ecosystem. It provides ready-to-use drivers for:

- **RoboMaster Motors**: Full support for C620, GM3508, GM3510, and GM6020 motors via CAN communication.
- **Input Devices**: Integration for the DR16 Receiver and remote control systems.
- **Referee System**: A comprehensive implementation of the RoboMaster referee system protocol via UART, allowing robots to react to game states, damage, and power limits in real-time.
- **Sensors**: Support for IMUs like the BMI088 and MPU6500, including Mahony AHRS algorithms for orientation tracking.

## Advanced Control and Algorithms

Beyond basic drivers, Taproot provides sophisticated building blocks for robot control:

- **Power Limiting**: Closed-loop power limiting logic that integrates with the referee system to ensure the robot stays within competition-mandated power buffers.
- **Kinematics and Transforms**: A dedicated transforms library for handling 2D and 3D coordinate frames, translational velocity, and acceleration.
- **Signal Processing**: Built-in support for Butterworth filters (lowpass, highpass, bandpass), ramping primitives, and computational helpers for wrapping measurements like angles.
- **Error Handling**: Integrated error aggregation and reporting that can output to a UART terminal or an onboard OLED display (SH1106/SH1107).

## Development Workflow and Testing

Taproot is designed with a modern development workflow in mind. It uses `lbuild`, a library generator, which allows users to configure and generate a tailored version of the library based on their specific project requirements. This ensures that only the necessary modules and drivers are included in the final firmware image.

A standout feature of Taproot is its emphasis on testing. The library is designed to be highly testable, with first-class support for unit and integration testing. Using a "hosted" simulation environment, developers can run their control logic and tests on a standard PC (Linux, macOS, or Windows) without requiring physical hardware. This significantly speeds up the development cycle and improves code reliability.

## Getting Started

Taproot is intended to be used as a submodule within a robot project. The project provides a template repository to help new users set up their environment. Development typically involves using `scons` for building and flashing, and `openocd` for debugging on the RoboMaster Development Board Type A or Type C.
