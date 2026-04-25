---
title: Human Following Robot
summary: An autonomous mobile robot based on the Arduino Uno that uses a trio of infrared
  sensors to track and follow a person or object. The system integrates an L298N motor
  driver for motion control and features a dedicated Lithium-Ion charging circuit
  for portable operation.
slug: human-following-robot
codeUrl: https://github.com/Awais-Asghar/Human-Following-Robot
siteUrl: https://github.com/Awais-Asghar/Human-Following-Robot
lastUpdated: '2025-07-13'
licenses:
- MIT
image: /202604/Human-Following-Robot_2.avif
rtos: ''
topics:
- arduino
- autonomous-vehicles
- ide
- microcontroller
isShow: true
createdAt: '2026-04-25T13:56:30+00:00'
updatedAt: '2026-04-25T13:56:30+00:00'
---

## Overview / Introduction

The Human Following Robot is an intelligent mobile platform designed to detect and track a person or object in real-time. By utilizing three infrared (IR) sensors, the robot can identify the relative position of a target—such as a person's leg or a dark object—and adjust its movement accordingly. Built on the Arduino Uno platform, this project provides a practical implementation of sensor-based decision-making and motor control for autonomous navigation.

## Key Features

The robot is designed for responsive movement and smart decision-making. Its primary capabilities include:
- Real-time tracking using three digital IR sensors.
- Dynamic directional control (forward, left, and right) via an L298N motor driver.
- Simple, robust logic that allows it to follow a moving target or a specific path.
- Modular hardware design that is easy to assemble and modify for different use cases.

## Hardware and Technical Specifications

The system is built around the Arduino Uno microcontroller. The movement is handled by four DC motors mounted on a standard robot chassis and controlled by the L298N dual H-bridge motor driver. 

### Pin Configuration

The wiring for the project is organized to separate sensor inputs from motor control outputs:
- **Sensors:** The Left, Right, and Middle IR sensors are connected to digital pins D3, D2, and D4 respectively.
- **Motor Control:** The L298N driver uses pins D10 and D5 for PWM speed control (Enable pins), while pins D9, D8, D7, and D6 handle the directional logic (IN1-IN4).

## Decision-Making Logic

The robot operates on a reactive control loop. It continuously polls the three IR sensors to determine the target's location:
- **Forward:** Triggered when the middle IR sensor detects an object (reads LOW).
- **Left Turn:** Triggered when only the left sensor detects an object.
- **Right Turn:** Triggered when only the right sensor detects an object.
- **Stop:** If all sensors read HIGH, the robot assumes it has lost the track and halts all motor movement to prevent erratic behavior.

## Sensors and Motor Control Explained

### Infrared Detection

The core of the tracking system lies in how the IR sensors interpret reflected light. These sensors emit infrared light and measure the reflection. A reflective surface (like white) returns a LOW signal, while an absorptive surface (like dark clothing) returns a HIGH signal. By comparing these values across the three sensors, the robot perceives the direction of the target.


### L298N Motor Driver

The L298N module acts as the power interface between the Arduino and the DC motors. It allows the microcontroller to control both the direction and the speed of the motors. Speed is managed via Pulse Width Modulation (PWM) signals sent to the enable pins, while direction is set by toggling the input pins (IN1-IN4) to drive the motors forward or backward.

## Power Management and Charging

To ensure portability, the robot is powered by a 3.7V Lithium-Ion battery (such as an 18650 cell). The project includes a dedicated charging circuit using the TP4056 module. This module provides a safe way to charge the battery via a 5V USB source, featuring over-voltage protection and LED status indicators (Red for charging, Blue/Green for fully charged).

![TP4056 Lithium-Ion Charging Module Circuit](/202604/Human-Following-Robot_1.avif)

### Safety and Maintenance

When working with Lithium-Ion batteries, it is essential to use protected modules to avoid short circuits or over-discharge. The TP4056 ensures the battery reaches its 4.2V cut-off voltage safely, making the robot reliable for extended use in various environments.

## Demonstration and Applications

Once assembled and programmed via the Arduino IDE, the robot is ready to follow any dark object placed in front of its sensor array. This technology serves as a foundational step for more complex applications, such as autonomous shopping carts, personal delivery bots, or educational kits for learning robotics and sensor integration.

![Assembled Human Following Robot Prototype](/202604/Human-Following-Robot_2.avif)
