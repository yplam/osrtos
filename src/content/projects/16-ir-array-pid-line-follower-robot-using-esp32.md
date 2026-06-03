---
title: 16 IR Array PID Line Follower Robot using ESP32
summary: An advanced autonomous line follower robot utilizing a 16-channel IR sensor
  array and PID control. Powered by an ESP32 running MicroPython, the system features
  an OLED-based configuration menu for real-time tuning of control parameters and
  persistent storage of PID constants.
slug: 16-ir-array-pid-line-follower-robot-using-esp32
codeUrl: https://github.com/Aarushraj-Puduchery/16_IR_Array_PID_LFR_Using_ESP32
star: 14
lastUpdated: '2024-04-10'
rtos: ''
libraries:
- micropython
topics:
- esp32
- line-follower-robot
- micropython
- pid
isShow: true
image: /202602/16ir_pid_lfr.webp
createdAt: '2026-02-08'
updatedAt: '2026-02-08'
relatedProjects:
- human-following-robot
- stm32f103-quadruped-robot
- reflow-oven-with-micropython-lvgl
- eva-rt-robotracer
- cuybot-v1-opensource-smartcar-project
- pyespcar-micropython-esp32-wifi-car
---

## Overview

The 16 IR Array PID Line Follower Robot (LFR) is a high-performance autonomous vehicle designed for precision path tracking. Built upon the ESP32 microcontroller, this project represents a significant upgrade over standard line followers by employing a massive 16-sensor infrared array. This high-density sensor configuration allows the robot to detect subtle deviations in its path and handle complex track geometries with high reliability.

By leveraging the high clock speed of the ESP32 and the flexibility of MicroPython, the project implements a robust Proportional-Integral-Derivative (PID) control loop. This algorithm continuously adjusts motor speeds to keep the robot centered on the line, providing smooth and efficient movement compared to simple binary logic controllers.

## Hardware Architecture

The robot's hardware is carefully selected to balance processing power with mechanical agility. The core components include:

- **ESP32 Microcontroller**: Chosen for its dual-core performance and high clock speed, which is essential for processing 16 sensor inputs and calculating PID outputs in real-time.
- **16-Channel IR Array**: Utilizing TCRT5000 reflective optical sensors, the array provides a wide field of view for line detection. To manage the high number of analog inputs, a CD74HC4067 16-channel multiplexer is used to interface the sensors with the ESP32.
- **Motor System**: Dual N20 micro metal gear motors (1000 RPM) driven by a TB6612FNG dual-channel motor driver provide the necessary torque and speed.
- **Power Management**: An 11.1V 3S LiPo battery powers the system, with an MP1584 buck converter stepping down the voltage for the electronics.

## PID Control and Calibration

The heart of the robot is its PID control algorithm. Unlike basic robots that simply turn left or right when a sensor is triggered, this LFR calculates an error value based on the position of the line across the 16-sensor array. 

One of the standout features of this project is the integrated OLED-based tuning menu. Using a 1.3-inch SSD1106 display and tactile buttons, users can adjust the Proportional (Kp) and Derivative (Kd) constants directly on the robot without needing to re-flash the firmware. These values are saved to the ESP32's internal memory in CSV files (`KpValue.csv` and `KdValue.csv`), ensuring that calibration is preserved across power cycles.

## Software Implementation

The project is written in MicroPython, making the code accessible and easy to modify. The software architecture is divided into several key modules:

- **Main Logic (`main.py`)**: Handles the core execution loop, sensor polling via the multiplexer, and the PID calculation.
- **Graphics and UI (`bitmap.py`, `ssd1106.py`, `framebuf.py`)**: Manages the visual interface on the OLED display, including custom menu graphics for settings, calibration, and real-time sensor monitoring.
- **Data Persistence**: Uses standard file I/O to read and write PID parameters, allowing for field-tuning without a computer.

## Mechanical Design

The robot features a custom-designed chassis, which can be laser-cut, and specialized 3D-printed wheels. The use of a cricket bat grip on the wheels provides high-traction surfaces, ensuring that the motor's torque is efficiently translated into movement without slipping on smooth racing surfaces. A steel-ball caster wheel at the rear provides a low-friction pivot point for sharp turns.
