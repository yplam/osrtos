---
title: RP2040 Projects by Armstrong Subero
summary: A comprehensive collection of MicroPython projects for the Raspberry Pi Pico
  (RP2040) covering basic hardware interaction, advanced data structures, and system-level
  programming. It includes implementations of control systems, design patterns, and
  task scheduling primitives for embedded development.
slug: rp2040-projects-by-armstrong-subero
codeUrl: https://github.com/ArmstrongSubero/RP2040
star: 15
lastUpdated: '2025-12-18'
rtos: ''
libraries:
- micropython
topics:
- pi-pico
- pico
- python
- raspberry-pi-pico
isShow: false
createdAt: '2026-02-09'
updatedAt: '2026-02-09'
relatedProjects:
- rp2040-freertos-template
- micropython-samples-and-drivers
- oficina-de-circuitpython
- pico-zephyr-project
- pico-demos-for-rp2040
- awesome-micropython
---

## Overview

This repository serves as an extensive educational resource for developers working with the Raspberry Pi Pico and the RP2040 microcontroller. It provides a wide array of projects implemented in MicroPython, ranging from fundamental hardware exercises to complex system-level implementations. The project is structured into two primary categories: Pure Python (P) projects, which focus on logic and basic I/O, and System-level (S) projects, which delve into low-level hardware interaction and operating system concepts.

## System-Level Programming and Scheduling

One of the most significant aspects of this collection is its focus on system-level programming. While MicroPython provides a high-level interface, these projects demonstrate how to implement core RTOS-like functionality directly. Developers can explore various scheduling and multitasking paradigms, including:

- **Round-Robin Scheduling**: Implementing fair CPU time distribution among tasks.
- **Cooperative Multitasking**: Managing task execution through voluntary yielding.
- **Task Management Systems**: Comprehensive structures for handling task lifecycles, priorities, and groups.
- **Synchronization Primitives**: Examples of event semaphores and mailbox queues for inter-task communication.

These examples are particularly valuable for those looking to understand the mechanics of an RTOS without the overhead of a full C-based kernel like FreeRTOS or Zephyr.

## Control Systems and Advanced Algorithms

The repository goes beyond simple LED blinking by implementing sophisticated control theory and algorithmic concepts. It includes practical implementations of:

- **PID Control**: Proportional-Integral-Derivative loops for stable system control.
- **Model Predictive Control (MPC)**: Advanced control strategies, including multi-variable control and robot-specific applications.
- **Pathfinding and AI**: Implementations of the A* algorithm and K-Means clustering.
- **Data Structures**: A deep dive into embedded-friendly data structures such as Red-Black Trees, Tries, Heaps, and Priority Queues.

## Design Patterns in Embedded Python

Unique to this collection is the application of classic software design patterns within an embedded context. The projects demonstrate how to use patterns like Singleton, Observer, Factory, Strategy, and State Machine to create modular and maintainable firmware. This bridge between high-level software engineering and low-level hardware control is a key highlight of the repository.

## Hardware Integration

On the hardware side, the projects cover a broad spectrum of RP2040 peripherals and external components. This includes UART communication, PWM for LED fading and motor control, RTC management, and interfacing with sensors like the HC-SR04 ultrasonic distance sensor and Light Dependent Resistors (LDR). It also explores RP2040-specific features such as dual-core execution and inline assembly for performance-critical tasks.

## Getting Started

To utilize these projects, users require a Raspberry Pi Pico with MicroPython installed. The scripts can be uploaded and executed using standard tools like Thonny. Because the projects are categorized by complexity and type, they serve as an excellent curriculum for learning embedded systems development from the ground up using the RP2040 platform.
