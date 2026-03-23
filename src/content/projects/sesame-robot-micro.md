---
title: Sesame Robot Micro
summary: A compact robotics platform featuring firmware for motor control and a Wi-Fi
  bridge. It utilizes an ESP32-C6 for wireless connectivity and a main board for servo-driven
  animations and OLED face rendering. The project supports various motion sequences,
  captive portal control, and optional BLE gamepad integration.
slug: sesame-robot-micro
codeUrl: https://github.com/dorianborian/sesame-robot-micro
star: 53
lastUpdated: '2026-03-19'
rtos: ''
isShow: true
image: /202603/sesame-robot-micro.avif
createdAt: '2026-03-23'
updatedAt: '2026-03-23'
---

## Overview

The Sesame Robot Micro is an experimental, compact robotics platform designed for fast iteration and hardware hacking. A derivative of the larger Sesame Robot project, this "micro" version focuses on a streamlined architecture that combines servo-driven motion, expressive OLED animations, and wireless control via a dedicated Wi-Fi bridge.

## Firmware Architecture

The project is split into two primary firmware components: the main board controller and the Wi-Fi bridge. This decoupled approach allows the main microcontroller to focus on real-time servo timing and display rendering while the secondary processor handles the network stack.

### Main Board Controller

The main board firmware manages the physical interactions of the robot. Written as an Arduino sketch, it handles complex servo movement sequences and expressive poses. The system supports a wide array of commands, including:
- **Directional Motion**: Forward, backward, left, right, and stop.
- **Expressive Poses**: Wave, dance, swim, point, bow, cute, and "freaky."
- **System Tuning**: Frame delay, walk cycles, and per-servo angle commands.

Simultaneously, the main board drives an SSD1306 OLED display using the Adafruit GFX library to render facial animations, providing the robot with a distinct personality.

### Wi-Fi Bridge

To provide a modern control interface, the project employs a Wi-Fi bridge powered by the Seeed XIAO ESP32-C6. This bridge acts as a Wi-Fi access point named "Sesame" and hosts a captive-portal web UI. This allows users to control the robot's movements and settings directly from a smartphone or browser without needing external infrastructure. The bridge communicates with the main board via a simple UART connection, forwarding HTTP-based commands to the motion controller.

For developers looking to expand the robot's capabilities, the Wi-Fi bridge also includes optional support for BLE gamepads via the Bluepad32 library. This enables physical remote control, making the robot a versatile platform for testing different input methods.

## Hardware and Integration

The hardware side of the project is highly accessible, with 3D CAD source files provided in `.f3z` and `.step` formats, alongside printable STL meshes. The wiring is straightforward, requiring only a common ground and a single-wire UART connection (TX to RX) between the ESP32-C6 and the main microcontroller.

## Getting Started

The project is built using the Arduino IDE. To deploy the firmware, users need to install several standard libraries:
- **Servo** and **SoftwareSerial** for motor and communication control.
- **Adafruit GFX** and **SSD1306** for the display interface.
- **Espressif ESP32 (3.x)** board package for the Wi-Fi bridge.

While the repository is geared toward active development rather than being a polished consumer product, it provides a robust foundation for anyone interested in compact robotics, ESP32-based web controllers, or expressive embedded systems.
