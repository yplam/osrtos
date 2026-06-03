---
title: Raybot
summary: Raybot is a rail-based robotic delivery system designed for smart transportation
  in structured environments. It utilizes Go for control logic, featuring RFID-based
  tracking, distance sensors for obstacle detection, and dual-motor control for movement
  and payload lifting.
slug: raybot
codeUrl: https://github.com/tbe-team/raybot
star: 14
version: v0.20.0
lastUpdated: '2025-11-23'
rtos: ''
libraries:
- sqlite
topics:
- go
- grpc
- iot
- raybot
- rest-api
- uart
- vue
isShow: false
createdAt: '2026-01-29'
updatedAt: '2026-01-29'
relatedProjects:
- human-following-robot
- cuybot-v1-opensource-smartcar-project
- watchbot-system
- 16-ir-array-pid-line-follower-robot-using-esp32
- smart-moon-transportation-system
- pyespcar-micropython-esp32-wifi-car
---

## Overview

Raybot is an innovative rail-based robotic delivery system designed for smart transportation within structured environments. Unlike traditional ground-based mobile robots, Raybot travels along a fixed overhead rail system, allowing it to navigate complex indoor spaces without occupying floor area. This makes it an ideal solution for automated delivery in hospitals, laboratories, or smart offices where payload movement needs to be precise and reliable.

## Key Features and Capabilities

The system is built to handle the full lifecycle of payload delivery, from lifting and transport to precise dropping at designated locations. Its core capabilities include:

- **Rail-Based Mobility**: Optimized for travel along fixed overhead tracks, ensuring predictable paths and high reliability.
- **Precision Tracking**: Uses RFID-based location tracking to determine its exact position along the rail network.
- **Safety & Obstacle Detection**: Integrated distance sensors provide real-time feedback to prevent collisions and ensure safe operation.
- **Dual-Motor Control**: Manages two distinct motor systems—one for horizontal movement along the rail and another for the vertical lifter mechanism.
- **Flexible Connectivity**: Supports both WiFi Access Point (AP) and Station modes, enabling local and networked control.
- **Remote Management**: Features a gRPC API for remote control and monitoring, complemented by a reverse gRPC tunnel for seamless cloud integration.

## Technical Architecture

Raybot is built on a modern software stack that bridges the gap between high-level management and low-level hardware control. The core logic is implemented in **Go 1.24**, providing a performant and type-safe environment for handling concurrent sensor data and motor commands.

### Embedded Integration

The project communicates with embedded hardware via UART and utilizes libraries like `periph.io` and `go.bug.st/serial` to interface with sensors and motor controllers. This allows the Go-based application to run on embedded Linux boards (such as a Raspberry Pi or similar ARM-based SoCs) while maintaining direct control over the physical hardware components.

### Data and API Layer

- **Storage**: Uses SQLite for local data persistence, managing configuration and state information.
- **Communication**: Leverages gRPC and Protobuf for efficient, structured communication between the robot, the web interface, and remote cloud services.
- **Web Interface**: A modern dashboard built with Vue.js, Shadcn Vue, and TailwindCSS provides a user-friendly way to monitor the robot's status and adjust configurations via a YAML-based system.

## Getting Started

Raybot is designed to be highly configurable. The system behavior is defined through a YAML configuration file, allowing users to specify rail parameters, sensor thresholds, and network settings. For developers, the project includes a comprehensive Makefile for building the Go binary, generating Protobuf code, and managing database migrations using Goose.

For those targeting specific hardware, the project supports cross-compilation for ARM64 architectures, typically used in embedded Linux environments. The inclusion of a Docker-based build process ensures a consistent environment for generating production-ready binaries for the robot's onboard computer.
