---
title: RoArm-M2 Robotic Arm Control Firmware
summary: A comprehensive ESP32-based control firmware for the Waveshare RoArm-M2,
  a 4DOF robotic arm. It features high-precision servo management, pneumatic control,
  and an OLED status display while utilizing LittleFS for data storage and supporting
  remote operation via Web interface, UART, and ESP-NOW.
slug: roarm-m2-robotic-arm-control-firmware
codeUrl: https://github.com/waveshareteam/roarm_m2
siteUrl: https://www.waveshare.com/roarm-m2-s.htm
lastUpdated: '2025-01-13'
licenses:
- AGPL-3.0
rtos: ''
libraries:
- littlefs
topics:
- arduino
- arduino-esp32
- arm
- esp32
- open-source
- robotics
isShow: true
image: /202604/RoArm-M2-S-details-39.webp
createdAt: '2026-04-08T00:05:53+00:00'
updatedAt: '2026-04-08T00:05:53+00:00'
---

## Overview

The RoArm-M2 is a sophisticated 4DOF robotic arm designed by Waveshare, targeting applications that require a blend of precision, flexibility, and lightweight construction. Built with a combination of carbon fiber and 5052 aluminum alloy, the arm weighs less than 900g while maintaining an effective payload of 0.5kg at a half-meter reach. This balance makes it an ideal candidate for mounting on mobile platforms or for use in educational and research environments where agility and ease of deployment are paramount.

At the heart of the RoArm-M2 is the ESP32 microcontroller. This choice of main control unit provides the arm with built-in WiFi and Bluetooth capabilities, enabling a variety of communication methods including a cross-platform web application, UART, and ESP-NOW. The firmware is designed to be compatible with the latest Arduino-ESP32 cores, ensuring developers have access to a modern toolchain and a wide array of libraries for secondary development.

## Technical Capabilities and Hardware

One of the standout technical features of the RoArm-M2 is its joint direct-drive design. By utilizing 12-bit high-precision magnetic encoders, the arm achieves a repeat positioning accuracy of 0.088°. This level of precision is complemented by an innovative dual-drive technology in the shoulder joint, which significantly boosts torque and overall load capacity. The arm's reach is equally impressive; with a 360° omnidirectional base and three flexible joints, it can operate within a workspace diameter of up to one meter.

The system is equipped with an expansion plate that supports customizing the End of Arm Tooling (EoAT). This allows users to swap out grippers or add specialized tools to meet specific project requirements. The firmware includes built-in management for pneumatic switches, providing a versatile interface for controlling vacuum grippers or other air-actuated tools.

## Software Architecture

The software implementation leverages several key technologies to provide a seamless user experience. It uses LittleFS for robust on-board file storage, handling configuration and system data. For data interchange, the project integrates ArduinoJson to parse commands and telemetry data. Users can monitor the system's status in real-time via an integrated OLED display, which provides immediate feedback on joint positioning, connectivity status, and system health.

Control of the arm is highly flexible. The firmware supports:
- **Web Interface**: A user-friendly, cross-platform web application for visualized coordinate control.
- **ESP-NOW**: Low-latency wireless communication for remote control without a traditional WiFi network.
- **UART & USB**: Standard wired interfaces for integration with host computers like Raspberry Pi or Jetson Nano.

## ROS2 Integration and Development

For those looking to integrate the arm into larger robotic ecosystems, the RoArm-M2 is fully compatible with ROS2. Waveshare provides specific examples and workspaces to facilitate Moveit2 integration, making it a viable tool for complex path planning and robotic simulations. The open-source nature of the control code and communication interfaces encourages deep customization, allowing developers to extend the firmware's capabilities or integrate it into autonomous mobile robot (AMR) projects.

The firmware also includes safety features such as a startup self-check with precise angle detection thresholds and capped gripping force to prevent hardware damage during operation. With its rich set of graphic and video tutorials, the RoArm-M2 serves as both a capable tool for innovators and an accessible entry point for those new to robotic arm control.
