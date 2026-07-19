---
title: Quadruped Robot
summary: A four-legged bionic walking robot inspired by arachnid movements, utilizing
  STM32F407G-DISC1 and Arduino Uno controllers. The system integrates FreeRTOS for
  task scheduling and manages 12 servo motors through a PCA9685 driver for complex
  gait patterns.
slug: quadruped-robot
codeUrl: https://github.com/TheUnsolvedDev/Quadruped-Robot
star: 16
version: v1.1
lastUpdated: '2021-08-24'
rtos: freertos
topics:
- adafruit
- arduino
- cmsis
- cpp-library
- cubeide
- embedded-systems
- i2c
- movement
- oled-display-ssd1306
- robot
- spider
- stm32
- uart
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32f103-quadruped-robot
- tny-360-quadruped-robot
- hexapod
- mobile-mecanum-4wd-robot
- scara-drawing-robot
- voice-controlled-ground-and-aerial-robot
---

## Overview

The Quadruped Robot project is a bionic representation of a spider, designed to replicate arachnid-like movements using a four-legged chassis. While traditional spiders possess eight legs, this robot utilizes a simplified four-leg configuration to perform complex walking tasks and environmental navigation. The project aims to develop a self-adaptive system capable of assisting in scenarios where human presence is difficult or dangerous, such as search and rescue operations in dense forests or exploring oxygen-depleted caves.

## Hardware Architecture

The robot's physical structure is built around a 3D-printed chassis, providing a lightweight yet durable frame for its electronic components. The movement is powered by 12 SG90 servo motors, allowing for three degrees of freedom per leg. This configuration enables the robot to perform intricate gait patterns and maintain stability on uneven terrain.

**Key hardware components include:**
- **Microcontrollers:** A dual-controller setup featuring an Arduino Uno and an STM32F407G-DISC1 (Discovery board).
- **Actuators:** 12 SG90 servo motors for leg articulation.
- **Servo Driver:** A PCA9685 PWM driver to manage the high number of servo signals efficiently.
- **Display:** A 128x64 OLED display for real-time status updates and debugging.
- **Connectivity:** An AT09 Bluetooth module for human interaction and remote control.
- **Power Management:** A 5V-1.5A power supply supported by a 2200μF capacitor to handle current spikes from the servos.

## Software and Control System

The project leverages a sophisticated software stack to manage the robot's movements and task execution. The development environment is split between the Arduino IDE and STM32Cube IDE, reflecting the heterogeneous nature of the hardware.

### RTOS Integration

A critical component of the STM32-based control system is the use of FreeRTOS. By implementing a real-time operating system, the project can handle multiple concurrent tasks such as sensor data processing, Bluetooth communication, and servo trajectory calculation with deterministic timing. This ensures that the robot's movements remain fluid and responsive even when processing complex environmental data.

### Libraries and Drivers

The system utilizes several industry-standard libraries to interface with its peripherals:
- **Adafruit PWM Servo Library:** Used to communicate with the PCA9685 driver over I2C, simplifying the control of the 12 servos.
- **Adafruit SSD1306 Driver:** Manages the OLED display for visual feedback.

## Technical Motivation

The development of this quadruped focuses on the challenge of self-adaptation. In uncertain environments, mobile robots must adapt to changes in terrain and obstacles. By combining the processing power of the STM32F4 series with the ease of use of the Arduino ecosystem, this project serves as a platform for experimenting with bionic movement algorithms and autonomous navigation in challenging real-world environments.
