---
title: WatchBot System
summary: A modular embedded intelligent control platform based on STM32F103C8T6 and
  ESP32-S3-CAM. It features a custom lightweight scheduler called FunOS, face recognition
  via ESP-WHO, and a 3-axis robotic arm for target tracking and surveillance.
slug: watchbot-system
codeUrl: https://github.com/WQW4230/WatchBot_System
star: 17
version: v1.17
lastUpdated: '2025-12-16'
rtos: freertos
topics:
- esp32s3
- funos
- irremote
- robot
- scheduler
- scheduler-job
- stm32f103
- vision
isShow: false
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- arm-control-framework-acorns-rover
- stm32f103-quadruped-robot
- roarm-m2-robotic-arm-control-firmware
- lekaos
- maixface
- lecyborg-ai-powered-third-arm-prosthesis
---

## Overview

The WatchBot System is a sophisticated, modular embedded platform designed for intelligent vision and robotic control. By leveraging a dual-MCU architecture, the project splits responsibilities between an STM32F103C8T6, which handles system logic and motor control, and an ESP32-S3-CAM, which manages high-performance visual processing. The system is capable of face detection, feature point recognition, and real-time pose estimation, linking these visual inputs to a three-axis robotic arm for automated tracking and interaction.

## Dual-MCU Architecture

The heart of the WatchBot lies in the collaboration between its two processors. The ESP32-S3-CAM acts as the "eyes" of the system, utilizing the ESP-WHO framework to perform complex AI tasks such as face detection and pose calculation (Yaw/Pitch/Roll). Meanwhile, the STM32F103C8T6 serves as the "brain" for physical control, managing the user interface, the robotic arm's servos, and the overall system state.

Communication between the two units is handled via a custom UART protocol. This protocol uses a structured frame format (including headers, command IDs, length verification, and checksums) to ensure reliable data exchange for tracking coordinates, alarm triggers, and status updates.

## FunOS: A Lightweight Scheduler

One of the most interesting technical aspects of the project is the implementation of **FunOS**, a custom, lightweight multi-tasking scheduler designed for the STM32. While inspired by the FreeRTOS API style, FunOS is a non-preemptive (cooperative) scheduler. It supports:
- Task creation and deletion.
- Periodic scheduling based on the system tick.
- Non-blocking delays to prevent CPU stalling.
- A design requirement that tasks remain non-blocking and execute in under 2ms to maintain system responsiveness.

## Vision and Tracking Capabilities

The vision system utilizes the OV2640 camera sensor to capture video streams at 640x480 resolution. The ESP32 processes these frames to identify facial landmarks and calculate the target's position relative to the center of the frame. This data is then mapped to servo angles for the 3-axis robotic arm (Pan, Tilt, and Roll).

The system includes several advanced tracking features:
- **Automatic Tracking**: The arm adjusts its position to keep a detected face centered in the camera's field of view.
- **Patrol Mode**: When no face is detected, the system can enter a patrol routine, scanning the environment based on pre-defined angular ranges.
- **Pose Estimation**: Using the atan2f function and facial landmark coordinates, the system can calculate the tilt of a user's head to synchronize the robotic arm's roll axis.

## Hardware and Interaction

The WatchBot is equipped with a variety of peripherals for user interaction and feedback:
- **Display**: A 0.96" OLED provides a multi-level menu system for configuration, while a 2.8" TFT can display the real-time camera feed.
- **Robotic Arm**: A 3-axis gimbal structure (Base/Pan, Roll, Pitch) with smooth control algorithms and dead-zone filtering to prevent jitter.
- **Storage**: An onboard SD card slot allows for high-resolution (1600x1200) JPEG captures when an "intruder" is detected.
- **Entertainment**: The system includes built-in games like Snake and Minesweeper, playable via an infrared remote control.
- **Feedback**: Integrated WS2812 RGB LEDs and a buzzer provide visual and auditory alerts for alarms or status changes.

## Technical Implementation Details

The project emphasizes modularity and decoupling. Recent updates have focused on separating the hardware driver layers from the application logic for the RTC, infrared NEC module, and the PS2 joystick interface. The robotic arm control utilizes a proportional smoothing algorithm to ensure that movements are fluid rather than jerky, which is critical for maintaining a stable video feed during tracking.
