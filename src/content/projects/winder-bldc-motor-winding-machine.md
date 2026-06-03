---
title: 'Winder: BLDC Motor Winding Machine'
summary: An automated system for winding BLDC motors using a four-motor configuration
  and an STM32G431CBU6 master controller. The project includes high-level Python control
  scripts, YAML-based configuration for motor kinematics, and a Godot-based simulation
  environment.
slug: winder-bldc-motor-winding-machine
codeUrl: https://github.com/aotenjo-xyz/winder
star: 122
lastUpdated: '2025-12-25'
rtos: ''
topics:
- bldc
- godot
- motor
- stm32
isShow: true
image: /202601/winder.webp
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- esp32-mqtt-motor-control
- actonator-3d-printable-robot-actuator
- cybergear-ros2-controller
- pico-claw-machine
- quadruped-robot
- mks-xdrive-mini-foc-driver
---

## Overview

Winding the wire for a BLDC motor is a time-consuming and labor-intensive process that requires high precision to ensure consistent performance. The Winder project addresses this challenge by providing an automated machine designed specifically for winding gimbal and drone motors. By utilizing a multi-axis motor system and a dedicated microcontroller-based master controller, it transforms a manual task into a repeatable, automated operation.

## Hardware and Motor Configuration

The machine uses four motors to perform the winding operation, each serving a specific role in the kinematics of the device:

- **M0**: Moves the M1 unit using closed-loop control to position the stator relative to the wire feeder.
- **M1**: Rotates the stator to align the correct slot for winding.
- **M2**: Performs the actual winding motion to wrap the wire around the stator teeth.
- **M3**: Adjusts wire tension using closed-loop torque control. This is critical for preventing wire breakage while ensuring a tight, efficient wind.

The hardware is primarily built using BE4108 gimbal motors, which are themselves often products of this machine. The system is powered by an 18V 1.5A supply, providing sufficient overhead for the simultaneous operation of all four axes.

## Control System Architecture

All motors are orchestrated by the Aotenjo Master, a custom controller board based on the STM32G431CBU6 microcontroller. This master controller acts as a bridge between the host computer and the motor nodes. It communicates with the PC via USB and sends real-time commands to the individual motor controllers over a CAN bus. This architecture ensures high-speed communication and precise synchronization between the movement of the stator and the wire feeder.

## Software and Simulation

The project features a robust software stack for configuration and testing. High-level control is handled via Python, with dependencies managed through Conda. The system relies on several key configuration files:

- **settings.yml**: Defines production parameters, including motor velocities, zero-position offsets, and winding configurations.
- **dev-settings.yml**: Used for development and simulation, allowing for lower velocities and debugging modes.

A unique aspect of this project is its integration with the Godot engine for simulation. Before committing to a physical wind, users can run a simulation to visualize the motor movements and verify the winding pattern. This is particularly useful for complex winding configurations, such as the 24n22p (24 slots, 22 poles) pattern defined in the project's default settings.

## Technical Implementation

The winding logic is highly configurable. Users can specify the `turns_per_slot` and the `winding_config` string (e.g., "AaAabBbBCcCcaAaABbBbcCcC"). The software calculates the necessary trajectories for M0, M1, and M2 to execute these patterns while M3 maintains constant tension. The use of `pyserial` for communication and `pydantic` for data validation ensures that the control scripts are both reliable and easy to maintain.
