---
title: EVA-RT Robotracer
summary: A high-performance robotracer featuring a centrifugal fan for increased downforce
  and specialized side sensors for curve detection. Built on the ATMEGA328P microcontroller,
  the project includes complete source code, PCB designs, and 3D models for a competitive
  line-following robot.
slug: eva-rt-robotracer
codeUrl: https://github.com/EXOTIC-TEAM-MX/EVA-RT
star: 37
lastUpdated: '2025-05-28'
rtos: ''
topics:
- arduino
- cpp
- linefollower
- robotics
- robotracer
isShow: true
image: /202601/EVA-RT_01.webp
createdAt: '2026-01-15'
updatedAt: '2026-01-15'
relatedProjects:
- cuybot-v1-opensource-smartcar-project
- 16-ir-array-pid-line-follower-robot-using-esp32
- human-following-robot
- taproot
- actonator-3d-printable-robot-actuator
- openrover-robotic-platform
---

## Overview

EVA-RT is a specialized robotracer designed for high-speed line following competitions. Developed in late 2024 by EXOTIC TEAM MX, the robot was engineered specifically for the All Chile Robot Contest 2025, where it achieved significant success, securing both 1st and 2nd place finishes. The project stands out for its integration of a centrifugal fan system, which provides active downforce to improve traction during high-speed cornering.

Despite its competitive performance, the design maintains a level of simplicity that makes it an excellent reference for developers interested in robotics, sensor fusion, and embedded control systems.

## Technical Specifications

The robot is built around a compact 117 x 146 mm PCB that serves as the main chassis. It is powered by the ATMEGA328P-AU microcontroller, a staple in the embedded world for its reliability and ease of programming within the Arduino ecosystem.

### Hardware Components
- **Microcontroller**: ATMEGA328P-AU (AVR architecture)
- **Sensing Array**: The robot utilizes 12 QRE1113GR sensors for primary line tracking and an additional 2 sensors for detecting side marks (goal and curve markers).
- **Actuation**: Three coreless 1020 7.4V motors drive the system, managed by IFX9201SG and RM10N100LD motor drivers.
- **Power System**: A 2S 7.4V 300mAh LiPo battery with a high discharge rate (80C/160C) provides the necessary current for rapid acceleration and fan operation.
- **Drivetrain**: Features a gear ratio of 11T (pinion) to 64T (spur) using M0.3 gears.

## Design and Development

The EVA-RT project is fully open-source, providing all the necessary files to replicate or modify the hardware. The development workflow utilized several industry-standard tools:

- **Firmware**: Developed using Arduino IDE 2.0.2, allowing for rapid prototyping of PID control loops and sensor calibration routines.
- **Mechanical Design**: Autodesk Fusion 360 was used to create the 3D models for the fan assembly and structural components.
- **Electronics**: The PCB was designed using EasyEDA Pro, with project files available for direct editing and exporting.

## Key Features

### Centrifugal Fan System
One of the most critical features of EVA-RT is its centrifugal fan. In robotracing, maintaining high speeds through curves is often limited by tire friction. By using a fan to create a vacuum effect (downforce), the robot can navigate turns at speeds that would otherwise cause it to slide off the track.

### Advanced Sensor Array
With 14 total infrared sensors, the robot has a high-resolution view of the track. The 12-sensor front array allows for precise error calculation in line-following algorithms (such as PID), while the side sensors enable the robot to anticipate curves or detect the finish line, allowing for dynamic speed adjustment.

## Getting Started

The repository is organized into several directories containing the source code, 3D printable files, and PCB manufacturing data. Developers can find the test code (LITE 1.0) in the `source_code` folder, which provides a baseline for implementing movement and sensor reading logic. The project is licensed under the GNU Affero General Public License v3.0, ensuring that improvements made by the community remain open and accessible.
