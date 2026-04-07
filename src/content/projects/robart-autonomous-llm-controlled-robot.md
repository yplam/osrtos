---
title: 'RoBart: Autonomous LLM-controlled Robot'
summary: RoBart is an autonomous mobile robot that uses an iPhone Pro for compute
  and sensing, controlled by Large Language Models like Claude and GPT-4. It features
  a custom mobile base built from a salvaged hoverboard and an Adafruit Feather nRF52,
  leveraging ARKit for SLAM, spatial mapping, and navigation.
slug: robart-autonomous-llm-controlled-robot
codeUrl: https://github.com/trzy/RoBart
lastUpdated: '2026-01-06'
licenses:
- NOASSERTION
image: /202604/RoBart_1.avif
rtos: ''
topics:
- arduino
- arkit
- claude
- ios
- openai
- robotics
- vision-language-model
isShow: true
createdAt: '2026-04-06T23:55:27+00:00'
updatedAt: '2026-04-06T23:55:27+00:00'
---

RoBart explores the potential of embodied AI by placing sophisticated Large Language Models into a mobile robot body. Built using a salvaged hoverboard for mobility and an iPhone Pro for its powerful sensors and compute, RoBart demonstrates how high-level reasoning can be integrated with real-world navigation and perception.

### Project Objectives and Vision
The project began as an experiment to build a low-cost mobile base that leverages the advanced capabilities of modern smartphones. By utilizing ARKit, RoBart gains access to professional-grade SLAM, scene understanding, and spatial meshing without the need for expensive dedicated robotics hardware. The project serves as a platform for exploring autonomous navigation in household environments, agent-based planning, and the integration of vision-language models into robotics.

### System Architecture
The RoBart ecosystem consists of four main components that work together to provide autonomy and remote control:

1.  **iOS Application**: The primary controller running on the iPhone Pro. It manages the AI "Brain," handles vision and spatial mapping, and communicates with LLM APIs directly.
2.  **Arduino Firmware**: Runs on an Adafruit Feather nRF52 Bluefruit LE to control the hoverboard motors via Bluetooth Low Energy (BLE).
3.  **watchOS Application**: An optional Apple Watch app that serves as a remote microphone, providing reliable voice input in noisy environments.
4.  **Debug Server**: A Python-based terminal for issuing manual commands and monitoring robot telemetry.


The iOS app is the heart of the system, containing specialized controllers for navigation, audio processing, and motor execution. The `ARSessionManager` provides continuous camera transform updates and scene geometry, while the `NavigationController` builds a real-time occupancy map for obstacle avoidance.

### Motor Control and Navigation
RoBart's movement is handled by the `HoverboardController`, which translates high-level commands into motor throttle values. Despite the inherent latency of BLE, the system employs a PID controller on the iOS side that uses ARKit's 6DOF pose for feedback. This enables the robot to perform precise maneuvers such as rotating to specific headings, driving forward by exact distances, or navigating to specific world-space coordinates.

For collision avoidance, the robot constructs a 2D occupancy map on the xz-plane. This map is generated using a Metal compute shader that projects vertices from ARKit's scene meshing onto a grid. This allows RoBart to identify obstacles relative to the floor height and plan safe paths through its environment.

![Occupancy map and paths as RoBart explores.](/202604/RoBart_2.avif)

### Vision and Perception
To enable the LLM to reason about movement, the system uses an `AnnotatingCamera`. This component takes photos from the ARKit stream and overlays "navigable points"—numbered markers on the floor that the occupancy map has identified as reachable. These annotated images are sent to the LLM, allowing it to give specific instructions like "Move to point 5."

![Navigable points in the kitchen.](/202604/RoBart_3.avif)

### The Agent Loop
RoBart's intelligence is driven by a ReAct-like (reason and act) prompting method. The agent processes human speech (transcribed via Deepgram) and visual data to generate structured plans. The interaction follows a cycle of generating thoughts, planning steps, executing actions (like turning or taking photos), and observing the results. This structured XML-based communication allows the robot to handle multi-step tasks, such as looking behind itself to describe an object or navigating through a room to find a specific person.

### Mechanical and Electrical Construction
The physical platform is based on a Hover-1 H1 hoverboard with the original electronics replaced. A frame made of 2020 aluminum extrusions supports the iPhone mount and a rear caster. The hoverboard's 350W brushless DC motors are driven by RioRand motor controllers, which receive signals from the Adafruit Feather. Power is provided by the original 36V hoverboard battery, stepped down to 3.3V for the logic electronics.

![Teleoperation interface.](/202604/RoBart_0.avif)

For remote operation, a teleoperation system using WebRTC is also available, allowing users to control RoBart and view its camera stream through a web-based interface.
