---
title: SUCHAI Flight Software
summary: A modular and extensible flight software framework designed for nanosatellites
  like the SUCHAI 1U CubeSat. It supports FreeRTOS and Linux, targeting platforms
  such as ATMEL AVR32, ESP32, and Raspberry Pi. The architecture utilizes a command
  processor pattern and LibCSP for subsystem communication.
slug: suchai-flight-software
codeUrl: https://github.com/spel-uchile/SUCHAI-Flight-Software
siteUrl: http://spel.ing.uchile.cl
star: 44
version: v0.1.1-base
lastUpdated: '2024-09-06'
rtos: freertos
libraries:
- sqlite
topics:
- cubesat
- flight
- flight-software
- freertos
- gplv3
- nanosatellite
- zmq
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- protoflight
- project-shadow-flight
- prust-pus-c-implementation-in-rust
- catpilot-autopilot-software-stack
- nuttx-real-time-operating-system
- bitcraze-crazyflie-2-0-2-1-mbed-os-firmware
---

The SUCHAI Flight Software is a robust, modular framework originally developed for the SUCHAI (Satellite of the University of Chile for Aerospace Investigation) project. Launched in June 2017, this 1U CubeSat demonstrated the effectiveness of a software architecture designed specifically for the challenges of nanosatellite missions. The framework is built to be highly extensible, allowing large, heterogeneous teams to develop and integrate payloads and functionalities with minimal friction.

## Architecture and Design

At its core, the software employs a command processor design pattern. This approach decouples the system's control logic from its functional implementation. Developers can extend the system by adding new commands or creating new clients that request these commands. Because commands can be used both internally by the software and externally as telecommands, the system maintains a high degree of flexibility. This modularity ensures that adding or removing a payload has zero impact on the core flight functionalities.

## Communication and Connectivity

Communication is a critical component of any satellite system, and the SUCHAI framework leverages the CubeSat Space Protocol (LibCSP). LibCSP provides a service-oriented communication layer that facilitates interaction between different subsystems and the ground station. For development and debugging on Linux, the software utilizes a ZeroMQ (ZMQ) interface to emulate these communication links, allowing for sophisticated testing in a desktop environment before deploying to target hardware.

## Platform Support

The software is designed to be portable across various embedded architectures. It officially supports FreeRTOS for real-time applications on microcontrollers like the ATMEL AVR32 (specifically the Nanomind A3200) and the Espressif ESP32. Additionally, it can be compiled for Linux, making it compatible with platforms like the Raspberry Pi. This dual-porting strategy allows the same codebase to serve as flight software, ground station firmware, or general-purpose embedded system logic.

## Development and Testing

The project emphasizes software quality and architectural tracking. It includes a comprehensive suite of tests, ranging from unit and integration tests to fuzzing and load testing. The build system, powered by CMake and a custom Python-based compilation script, simplifies the process of configuring the software for different operating systems and hardware targets. 

### Build Example

Using the provided `compile.py` script, developers can target specific architectures easily:

```python
# Build for Nanomind A3200 (AVR32)
python3 compile.py FREERTOS NANOMIND

# Build for ESP32 with specific modules disabled
python3 compile.py FREERTOS ESP32 --comm 0 --fp 0 --hk 0 --st_mode 0

# Build for Raspberry Pi
python3 compile.py LINUX RPI
```

This rigorous approach to development is documented in several academic publications, highlighting the framework's role in evaluating modular software for space applications. The project provides a ready-to-use solution for CubeSat developers looking for a flight-proven, incremental development path.
