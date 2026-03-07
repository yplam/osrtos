---
title: Mercury Transforming Drone
summary: Mercury is a multi-modal transforming drone platform that combines aerial
  flight and ground-based driving capabilities. It utilizes a Raspberry Pi 5 for high-level
  autonomy and an ArduPilot-based flight controller for stable dynamics, featuring
  a unique transformation mechanism powered by linear actuators.
slug: mercury-transforming-drone
codeUrl: https://github.com/L42ARO/Mercury-Transforming-Drone
star: 71
lastUpdated: '2026-03-07'
rtos: chibios-rt
isShow: true
image: /202603/mercury-transforming-drone.webp
createdAt: '2026-03-07'
updatedAt: '2026-03-07'
---

## Overview

Mercury is a sophisticated, multi-modal robotic platform designed to navigate both the air and the ground. By integrating high-performance computing with robust flight control, the project demonstrates a "transforming" capability that allows it to switch between a quadcopter configuration and a ground-based rover. This versatility makes it an ideal platform for search and rescue, payload delivery, and advanced robotics research.

## System Architecture

The heart of Mercury's control system is a dual-processor architecture. A **Raspberry Pi 5** serves as the companion computer, handling high-level autonomy, vision processing, and the web-based user interface. For low-level flight dynamics and motor control, the project utilizes a **Cube Flight Controller** running the **ArduPilot** stack, which typically operates on the ChibiOS RTOS for high-reliability real-time performance.

Communication between these two systems is managed via a **Mavproxy bridge**. This setup allows the Python-based autonomy software on the Pi to send commands to the flight controller, enabling features like autonomous mission execution and real-time telemetry streaming.

## Transformation and Hardware

What sets Mercury apart is its mechanical transformation system. Using two **120N linear actuators**, the drone can adjust its arm positions to transition between flight and drive modes:

- **Aerial Mode**: Utilizes four BLDC motors with 8-inch propellers for vertical takeoff and maneuverability.
- **Ground Mode**: Employs dedicated 140KV BLDC driving motors and a gear system to move as a wheeled rover.
- **Payload**: The design includes a 1kg inner payload bay, protected by a 3D-printed shell.

The frame is a hybrid construction, utilizing **Carbon Fiber sheets** for structural rigidity and **PLA-CF (Carbon Fiber reinforced PLA)** for 3D-printed components like motor holders and gear assemblies.

## Sensing and Autonomy

Mercury is equipped with an extensive sensor suite to perceive its environment:

- **Vision**: A combination of RGB USB webcams, Depth cameras, and Thermal imaging sensors.
- **Positioning**: GPS integrated with ArduPilot and an **Optical Flow (MTF-01)** sensor for stable hovering in GPS-denied environments.
- **Proximity**: A **Time-of-Flight (TOF)** camera for obstacle detection and distance measurement.
- **Orientation**: Dual **MPU 9250 IMUs** for precise attitude estimation.

## Software Stack

The autonomy software is written in Python and designed to be modular. It includes a web-based control dashboard built with **Three.js** for 3D visualization and **Leaflet** for map-based navigation. The system also supports remote connectivity via **Tailscale**, allowing the drone to be controlled over long distances using mobile data dongles.

## Getting Started

The project is open-source under the CERN Open Hardware Licence. Developers can get started by setting up the autonomy software on a Raspberry Pi 5. The process involves creating a Python virtual environment, installing dependencies from the provided `requirements.txt`, and running the Mavproxy bridge alongside the main robot software. For those looking to build the hardware, the repository includes a detailed Bill of Materials and STL files for all 3D-printed parts.
