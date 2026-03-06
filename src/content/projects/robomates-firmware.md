---
title: Robomates Firmware
summary: Firmware for the Robomates self-balancing robot platform based on the ESP32
  microcontroller. It utilizes field-oriented control (FOC) for brushless motors,
  sub-GHz radio for robot-to-robot communication, and Bluetooth for gamepad integration
  in multiplayer gaming environments.
slug: robomates-firmware
codeUrl: https://github.com/art-rbmates/robomates-firmware
siteUrl: https://docs.rbmates.com
star: 17
lastUpdated: '2026-03-02'
rtos: freertos
isShow: true
image: /202603/spikes-red.webp
createdAt: '2026-03-06'
updatedAt: '2026-03-06'
---

## Overview

Robomates is an open-source robotics platform designed for real-time multiplayer games. The project centers around small, two-wheeled self-balancing robots that combine high-performance motor control with versatile connectivity. Each robot is capable of maintaining its upright posture autonomously while communicating with other units over a sub-GHz radio link and accepting commands from standard Bluetooth gamepads or a web-based interface.

## Technical Architecture

The firmware is built on the ESP32 platform using the Arduino framework, leveraging the underlying FreeRTOS for task management. The core of the robot's movement is driven by brushless motors utilizing Field-Oriented Control (FOC) via the SimpleFOC library. This approach provides the smooth, high-torque response necessary for precise self-balancing and agile movement during gameplay.

### Key Capabilities

- **Advanced Motion Control**: Uses an Inertial Measurement Unit (IMU) and FOC to achieve stable self-balancing on two wheels.
- **Multi-Protocol Connectivity**: Supports sub-GHz radio communication for low-latency robot-to-robot interaction and Bluetooth (via Bluepad32) for compatibility with a wide range of gamepads, including PS5, Xbox, and Nintendo Switch controllers.
- **Web-Based Management**: Integration with Robomates HQ allows for firmware updates, configuration, and control directly from Chromium-based browsers using Web Serial and Web Bluetooth APIs.
- **Hardware Security**: Each robot includes a unique cryptographic identity managed by an ATECC608A secure element, ensuring hardware authenticity.
- **Customization**: The system supports custom melodies via a buzzer and programmable autonomous behaviors through a visual block editor.

## Hardware Integration

The project is designed to work with a specific hardware stack that includes:
- **ESP32 DevKit**: The primary microcontroller.
- **Brushless Motors**: Driven by dedicated FOC drivers.
- **CC1101 Radio**: For sub-GHz long-range communication between game objects and robots.
- **Sensors**: Including the TMP117 for high-accuracy temperature monitoring and various IMUs for orientation sensing.
- **Visual Feedback**: FastLED-driven RGB LEDs for status and team identification.

## Development and Deployment

The firmware is managed using PlatformIO, which handles the complex dependency chain and build configurations for different radio frequencies (e.g., 868MHz). Developers can flash the firmware either through the Robomates HQ web interface for ease of use or via the PlatformIO CLI for advanced development. The project's open-source nature extends to its 3D-printable body designs, allowing users to customize the physical appearance of their robots while maintaining the core balancing mechanics.
