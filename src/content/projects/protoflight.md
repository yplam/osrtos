---
title: Protoflight
summary: A modular flight control software framework designed for high-performance
  8kHz Gyro/PID loops on dual-core processors. It supports bare-metal or FreeRTOS
  environments across ESP32, Raspberry Pi Pico, and STM32 platforms while maintaining
  compatibility with Betaflight configuration tools.
slug: protoflight
codeUrl: https://github.com/martinbudden/Protoflight
star: 10
lastUpdated: '2026-01-21'
rtos: freertos
topics:
- drone
- flight
- flight-controller
- freertos
- quadcopter
- raspberry-pi-pico
- uav
isShow: false
createdAt: '2026-01-25'
updatedAt: '2026-01-25'
relatedProjects:
- flight-controller-rev2
- droners
- suchai-flight-software
- avem
- fpv-drone-stm32f411-flight-controller
- catpilot
---

Protoflight is a modular flight control software framework designed with a focus on performance, versatility, and educational value. Unlike monolithic flight controllers, Protoflight is built from a collection of independent libraries, each designed to be usable in its own right. This architecture makes the system "protean"—easily changeable and adaptable for prototyping new ideas in flight dynamics and stabilization.

## Core Design and Performance

A primary goal of Protoflight is to support high-frequency control loops, specifically targeting an 8kHz Gyro/PID loop time. To achieve this, the software is optimized for dual-core processors, such as the ESP32-S3 and Raspberry Pi Pico, allowing the critical Gyro/PID loop to occupy an entire core. This isolation ensures that background tasks like telemetry, logging, or receiver processing do not jitter the timing of the flight stabilization logic.

The system is designed to run either on bare metal or under the FreeRTOS real-time operating system. This flexibility allows developers to choose the level of abstraction they need, whether they are building a simple stabilized vehicle or a complex autonomous drone.

## Modular Architecture

Protoflight is composed of over a dozen specialized libraries. Key components include:
- **VectorQuaternionMatrix**: Handles 3D math using vectors, quaternions, and 3x3 matrices.
- **SensorFusion**: Implements various filters including Complementary, Mahony, Madgwick, and the Versatile Quaternion Filter (VQF).
- **MotorMixers**: Manages motor commands for various configurations, supporting PWM and bidirectional DShot protocols with RPM filtering.
- **Blackbox & MSP**: Ports of the Betaflight Blackbox and MultiWii Serial Protocol (MSP), ensuring compatibility with the Betaflight Configurator and Blackbox Explorer.

## The Main Control Loop

The heart of Protoflight is the "Gyro/PID loop," which follows a strict timing window. For an 8kHz update frequency, the system has only 125 microseconds to complete a full cycle. This includes:
1. Reading the IMU via SPI/DMA.
2. Filtering raw data using RPM and notch filters.
3. Calculating orientation via sensor fusion.
4. Updating motor outputs using PID controllers.
5. Copying data to the Blackbox logging queue.

On an ESP32-S3 running at 240MHz, the software achieves these steps with significant headroom, often completing the core PID calculations in as little as 20 to 50 microseconds depending on the stabilization mode used.

## Innovation in Quaternion Space

One of the more experimental aspects of Protoflight is its approach to PID control. While traditional controllers operate in Euler Angle space (Roll, Pitch, Yaw), Protoflight explores running PIDs in "Quaternion Space." By using the sine of Euler angles derived directly from quaternions, the system avoids computationally expensive trigonometric functions. This optimization allows for sophisticated angle-mode stabilization even at high loop frequencies.

## Hardware and Ecosystem

Protoflight targets a wide range of modern embedded hardware:
- **Espressif**: ESP32, ESP32-S3 (M5Stack StampS3, AtomS3, Core2).
- **Raspberry Pi**: RP2040 (Pico) and RP2350 (Pico 2).
- **STM32**: Support for F1, F3, and F4 series microcontrollers.

By maintaining "Tool Compatibility" with the Betaflight ecosystem, Protoflight allows users to leverage industry-standard configuration and log analysis tools while experimenting with a completely custom, modular codebase. This makes it an ideal platform for researchers, students, and hobbyists who want to understand the inner workings of flight control software without the complexity of legacy codebases.
