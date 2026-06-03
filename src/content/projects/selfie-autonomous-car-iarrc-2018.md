---
title: Selfie Autonomous Car (IARRC 2018)
summary: An autonomous vehicle project based on a 1:10 scale RC car platform, designed
  for the International Autonomous Robot Racing Competition (IARRC) 2018. It features
  a dual-processor architecture using an Intel i3 for computer vision and an STM32F7
  running FreeRTOS for low-level control and sensor fusion.
slug: selfie-autonomous-car-iarrc-2018
codeUrl: https://github.com/KNR-Selfie/selfie-archive-cc-iarrc2018
star: 15
version: v2.0
lastUpdated: '2018-10-23'
rtos: freertos
topics:
- autonomous-car
- bluetooth
- freertos
- jetson
- odroid
- opencv
- rpi
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- pyespcar-micropython-esp32-wifi-car
- autonomous-racing-robot-stm32-ros1
- cuybot-v1-opensource-smartcar-project
- mongoose-os-robot-car
- watchbot-system
- arm-control-framework-acorns-rover
---

## Overview

The Selfie project is a sophisticated autonomous vehicle platform developed for the International Autonomous Robot Racing Competition (IARRC) 2018. Built on a 1:10 scale RC car chassis, the vehicle was designed to navigate simulated road environments autonomously, ultimately winning first prize in both Drag and Circuit races. The system demonstrates a high level of integration between high-level computer vision and low-level real-time control.

## System Architecture

The vehicle utilizes a tiered computing architecture to balance heavy data processing with real-time responsiveness:

- **High-Level Computing**: An Intel i3-based platform handles computer vision tasks. This unit runs C++ applications utilizing OpenCV to process camera data for line detection, startup light recognition, and obstacle avoidance.
- **Low-Level Control**: An STM32F7 microcontroller (AnyFC F7 board) serves as the vehicle controller. This unit runs on FreeRTOS, ensuring deterministic execution for critical tasks such as motor control, sensor fusion, and trajectory execution.

## Key Features and Capabilities

The project was engineered to overcome several significant challenges inherent in outdoor autonomous racing:

- **High-Speed Navigation**: The vehicle achieved stable operation at speeds up to 12 m/s during the Drag Race event.
- **Advanced Sensing**: The platform is equipped with a comprehensive sensor suite, including magnetic encoders for odometry, distance sensors for collision avoidance, an IMU for orientation, and a camera for visual navigation.
- **Robust Computer Vision**: The software includes specialized algorithms for high-speed line detection and trajectory correction, capable of handling varying luminance conditions such as shadows and direct sunlight.
- **Real-Time Control**: By leveraging FreeRTOS on the STM32F7, the system maintains precise control over the vehicle's dynamics, allowing for rapid corrections based on sensor input and high-level trajectory commands.

## Competition Performance

During the IARRC 2018 competition in Waterloo, Canada, the Selfie vehicle outperformed competitors in two primary events:
- **Drag Race**: A 60-meter straight track focused on acceleration and stability.
- **Circuit Race**: A 1000-meter course (3 laps) requiring complex navigation, lane keeping, and obstacle avoidance.

## Technical Implementation

The repository is organized into several key components:
- `cpp-opencv-app`: Contains the vision processing logic for both Circuit and Drag racing modes.
- `stm32-atollic`: Houses the FreeRTOS-based firmware for the STM32F7 controller, developed using the Atollic TrueSTUDIO environment.
- `lidar-app` and `trajectory-app`: Specialized modules for environmental mapping and path planning.

This project serves as an excellent example of combining RTOS-based embedded control with high-level Linux-based vision processing in a robotics context.
