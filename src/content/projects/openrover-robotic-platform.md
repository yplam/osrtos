---
title: OpenRover Robotic Platform
summary: An open-source, 3D-printed robotic platform modeled after NASA's Perseverance
  rover. It features a distributed control system using Arduino Mega for low-level
  hardware management, an ESP32-S3-powered touchscreen remote utilizing the LVGL library,
  and a Raspberry Pi Zero 2W for web-based telemetry and video streaming.
slug: openrover-robotic-platform
codeUrl: https://github.com/pol-valero/openrover-robotic-platform
star: 13
lastUpdated: '2025-12-30'
rtos: freertos
libraries:
- lvgl
topics:
- 3d-printing
- arduino
- camera
- dashboard
- esp32
- lvgl
- nrf24l01
- perseverance-rover
- platformio
- raspberry-pi
- remote-control
- robotics
- touchscreen
- wifi
isShow: false
createdAt: '2026-01-07'
updatedAt: '2026-02-06'
relatedProjects:
- papaya-pathfinder
- pyespcar-micropython-esp32-wifi-car
- hexapod
- andino-open-source-ros-2-educational-robot
- mobile-mecanum-4wd-robot
- tny-360-quadruped-robot
---

## The OpenRover Project

The OpenRover is a sophisticated, open-source robotic platform designed as a functional 3D-printed replica of NASA's Perseverance rover. Developed as a final computer engineering degree project, it serves as an educational bridge for those looking to master hardware-software integration across multiple development ecosystems. Unlike many DIY projects that rely on a single controller, OpenRover utilizes a distributed architecture, leveraging the specific strengths of Arduino, ESP32, and Raspberry Pi boards to manage its complex subsystems.

## Modular Architecture

The project is organized into three primary functional modules, each handling distinct aspects of the rover's operation:

### Central Rover Module
At the heart of the rover's body is an Arduino Mega. This module is responsible for the low-level physical interactions, including the 6-wheel drive system with four steerable wheels, the 4-axis robotic arm, and the tiltable camera head. It also interfaces with environmental sensors (temperature, humidity, pressure, and altitude) and manages radio frequency communication with the remote control.

### Remote Control and Touchscreen Module
User interaction is handled by a custom-built remote control. This module features an ESP32-S3 microcontroller paired with a touchscreen interface. The UI was designed using SquareLine Studio and the LVGL (Light and Versatile Graphics Library), providing real-time status updates and mode selection. An auxiliary Arduino Nano within the remote handles the reading of RC channels and battery monitoring.

### Camera and Webserver Module
Located in the rover's head, a Raspberry Pi Zero 2W acts as the high-level connectivity hub. It interfaces with a camera to provide a live video feed and hosts a Flask-based web dashboard. This allows users to monitor the rover's status and view the camera feed from any device on the same WiFi network.

## Key Features and Capabilities

OpenRover is designed to replicate the sophisticated mobility and scientific capabilities of planetary explorers:
- **Advanced Locomotion**: A 6-wheel drive platform with 4-wheel steering allows for complex maneuvers, including 360-degree turns.
- **Robotic Manipulation**: A 4-axis foldable robotic arm equipped with a gripper for interacting with the environment.
- **Environmental Monitoring**: Integrated sensors provide a constant stream of atmospheric data.
- **Custom UI**: The touchscreen remote offers four main operation modes: conventional driving, 360º turn control, robotic arm control, and head control.
- **Web Integration**: A dedicated dashboard for remote monitoring and video streaming.

## Technical Implementation

The software stack is diverse, reflecting the multi-processor nature of the build. The microcontrollers (Arduino and ESP32) are programmed using the PlatformIO IDE with the Arduino Framework. For the ESP32-S3, the project leverages the LVGL library to create a responsive and professional-grade embedded user interface. The Raspberry Pi component utilizes Python and the Flask framework to serve the web dashboard, while the frontend is built with standard web technologies like HTML5, CSS3, and JavaScript.

## Building the Platform

Constructing an OpenRover is a significant undertaking, estimated to require approximately 400 hours of 3D printing and over 140 hours of assembly and wiring. The project is designed to be modular and extensible, encouraging builders to add their own upgrades, such as computer vision for autonomous navigation or automated routines for the robotic arm. The repository provides comprehensive documentation, including wiring schematics, 3D design files, and a detailed project report explaining the design decisions behind the platform.
