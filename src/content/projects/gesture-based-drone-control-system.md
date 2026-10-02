---
title: Gesture-Based Drone Control System
summary: A real-time computer vision system that translates hand gestures into drone
  flight commands using MediaPipe landmark detection and a rule-based classification
  engine. The platform features a FastAPI backend and React dashboard, supporting
  both Microsoft AirSim simulations and physical drone hardware through a pluggable
  adapter architecture.
slug: gesture-based-drone-control-system
codeUrl: https://github.com/COS301-SE-2026/Gesture-Based-Drone-Control
siteUrl: https://cos301-se-2026.github.io/Gesture-Based-Drone-Control/
version: v0.2.1
lastUpdated: '2026-07-30'
rtos: ''
libraries:
- sqlite
topics:
- computer-vision
- docker
- drone
- epi-use-labs
- fastapi
- gesture-control
- mediapipe
- opencv
- python
- react
- tensorflow-lite
- typescript
- university-of-pretoria
- webscokets
isShow: false
createdAt: '2026-08-02T06:45:56+00:00'
updatedAt: '2026-08-02T06:45:56+00:00'
relatedProjects:
- mercury-transforming-drone
- voice-controlled-ground-and-aerial-robot
- droners
- catpilot-autopilot-software-stack
- magic-wand-on-mbed
- holy-stone-h120d-drone-protocol-reverse-engineering
---

## Redefining Flight: Gesture-Based Drone Control

The traditional drone pilot experience relies heavily on physical joysticks and complex controllers. The Gesture-Based Drone Control System (GBDCS) shifts this paradigm by using computer vision to turn the human hand into the primary interface. By processing live camera feeds, the system identifies specific hand landmarks and translates them into flight commands—such as take-off, land, and directional movement—in real-time.

### The Vision Pipeline

At the heart of the project is a sophisticated computer vision pipeline built on MediaPipe. The system tracks 21 distinct hand landmarks, providing a high-fidelity map of the user's hand position and finger states. This data feeds into a dual-recognition engine. Initially, a rule-based classifier provides deterministic, low-latency gesture recognition. This is supplemented by a `GestureStabilizer` which uses majority voting over a rolling buffer of frames to filter out noise caused by motion blur or poor lighting, ensuring that only intentional commands are sent to the drone.

### Gesture Vocabulary

The system recognizes a specific set of gestures derived from finger states and patterns:
- **OPEN_PALM**: 5 fingers up (Take-off or specific movement)
- **FIST**: 0 fingers up (Landing or stop)
- **ONE_FINGER to FOUR_FINGERS**: Numeric-based directional or mode commands
- **UNKNOWN**: A failure state for low-confidence frames to prevent accidental triggers

### Safety and Calibration

Flying a drone via camera feed introduces unique safety challenges. To address this, the system implements a mandatory "Calibration Gate." Before the flight commands are unlocked, users must complete a sequence of gestures to verify that the lighting conditions and hand tracking are optimal for their specific environment. The `CalibrationManager` ensures that the pipeline can reliably read the user's hand under current conditions before allowing the drone to leave the ground.

Safety is further reinforced through built-in fail-safes. The system is designed to trigger an automatic hover command if hand tracking is lost or if the video feed is interrupted. Additionally, an emergency stop gesture and dashboard-level overrides provide multiple layers of protection for both the hardware and the operator.

### Architecture and Hardware Agnosticism

The project utilizes a decoupled "DroneAdapter" pattern, which allows the software to remain hardware-agnostic. This architecture enables seamless switching between different environments:
- **Project AirSim / Legacy AirSim**: High-fidelity simulators used for training and testing without risk to physical hardware.
- **Physical Drones**: Integration paths for hardware like the DJI Tello or XFly drones.
- **Dummy Adapters**: Used for CI/CD pipelines and unit testing to simulate drone behavior without a physical or virtual environment.

The backend is powered by FastAPI, facilitating low-latency communication via WebSockets for telemetry and command streaming. The frontend dashboard, built with React 18, provides the operator with real-time telemetry data, including altitude, battery levels, and a live video overlay of the hand skeleton rendered via a custom library.

### Accessibility and Input Alternatives

While hand gestures are the primary focus, the system is built for broad accessibility. It supports interchangeable input sources, including keyboard and gamepad adapters. This ensures that the drone can be operated through traditional means if necessary, or by users who may have limited motor control, fulfilling a core goal of making drone flight more inclusive. All input sources pass through a unified command object, ensuring consistent behavior regardless of whether the user is using their hands, a controller, or on-screen UI buttons.
