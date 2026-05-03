---
title: OpenDualMotorDriver
summary: OpenDualMotorDriver is an open-source, high-performance dual H-bridge motor
  controller powered by the Raspberry Pi RP2350 microcontroller and Texas Instruments
  DRV8412 driver. It supports brushed DC motor control from 4V to 40V with integrated
  current sensing, magnetic encoder feedback, and a comprehensive serial API for closed-loop
  position and speed control.
slug: opendualmotordriver
codeUrl: https://github.com/MilosRasic98/OpenDualMotorDriver
siteUrl: https://community.element14.com/challenges-projects/element14-presents/project-videos/w/documents/72060/designing-a-more-capable-dual-motor-driver-beyond-the-l298n-what-worked-and-what-didn-t?ICID=I-HP-DESIGNING-A-MORE-CAPABLE-DUAL-MOTOR-APR26
lastUpdated: '2026-05-02'
licenses:
- GPL-3.0
image: /202605/OpenDualMotorDriver_0.avif
rtos: ''
topics:
- brushed-motor
- motor
- motor-controller
- pid
- rp2350
isShow: true
createdAt: '2026-05-03T02:19:55+00:00'
updatedAt: '2026-05-03T02:19:55+00:00'
---

OpenDualMotorDriver is a compact (50x60 mm) and capable dual H-bridge brushed DC motor driver designed as an all-in-one solution for robotics projects. Built around the Raspberry Pi RP2350 (Pico 2) and the Texas Instruments DRV8412, it successfully manages two motors with a wide input voltage range of 4V to 40V. The board is designed to handle 3A per motor continuously, with peaks up to 6A, and features integrated hall-effect current sensors for precise monitoring.


### Hardware Architecture

The hardware is organized into a 4-layer PCB divided into three logical sections: power electronics, sensing and protection, and compute/IO. The power stage utilizes the DRV8412 bridge driver in PWM mode, supported by significant bulk capacitance and input filtering. For sensing, the board includes two ACS722 hall-effect sensors for per-bridge current monitoring and a resistor divider for bus voltage tracking. The compute section features the RP2350 MCU, an AS5600 magnetic encoder for shaft position sensing, and a PCA9633 RGB LED for status feedback.

![OpenDualMotorDriver Schematic Overview](/202605/OpenDualMotorDriver_3.avif)

Connectivity is a priority, with headers for UART, SPI, and an I2C slave port. The design also includes daisy-chaining connectors for both power and I2C, allowing multiple drivers to be linked easily in complex robotic systems. Software-switched pull-ups on the I2C buses ensure clean signal integrity when adding external sensors.

### Firmware and Control Logic

The firmware is developed as an Arduino sketch targeting the Earle Philhower RP2040/RP2350 core. It employs a modular, class-based architecture where individual components handle specific responsibilities such as PWM generation, encoder unwrapping, and PID calculation. The system operates with a 20 kHz switching frequency and a 4 ms control period for closed-loop operations.

Key firmware components include:
- **DualMotorController**: Manages bridge enabling, PWM duty cycles (capped at 95%), and fault handling.
- **As5600Encoder**: Handles multi-turn unwrapping and filtered velocity estimation.
- **ClosedLoopController**: Implements a cascaded position → speed → output PID control scheme.
- **CommandProcessor**: Parses both ASCII and binary frames across USB, UART, and I2C transports.

![Finished OpenDualMotorDriver PCB](/202605/OpenDualMotorDriver_6.avif)

### Desktop GUI and Telemetry

To facilitate tuning and monitoring, the project includes a desktop application built with PySide6. The GUI connects via USB serial and provides a real-time interface for controlling the motors. It features manual drive sliders, gauges for current and voltage, and live oscilloscope-style plotting for telemetry data. A dedicated closed-loop tab allows users to tune PID constants and set speed or position references on the fly.

![OpenDualMotorDriver PySide6 Desktop GUI](/202605/OpenDualMotorDriver_1.avif)

### Operational Modes

The driver supports multiple modes of operation, ranging from simple manual PWM duty cycle control to sophisticated closed-loop position tracking. It exposes a full API that accepts M-codes and binary opcodes across all communication ports. This flexibility makes it suitable for various applications, from simple remote-controlled vehicles to precise robotic actuators requiring specific angular positioning and speed regulation.
