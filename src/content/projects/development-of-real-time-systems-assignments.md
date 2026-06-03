---
title: Development of Real-Time Systems Assignments
summary: A collection of educational assignments and simulations focused on real-time
  systems development using FreeRTOS. The project utilizes a POSIX-based FreeRTOS
  simulator to demonstrate task scheduling, synchronization, and Rate Monotonic (RM)
  analysis without requiring dedicated embedded hardware.
codeUrl: https://github.com/ragu-manjegowda/development-of-real-time-systems
siteUrl: https://www.coursera.org/learn/real-time-systems
isShow: false
rtos: freertos
libraries: []
topics:
- freertos
- real-time-systems
- rtos
star: 22
lastUpdated: '2019-05-28'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- str-xenomai-real-time-systems-practices
- xenomai-3-exercises-for-raspberry-pi-4
- xenomai-3-exercises
- freertos-emulator
- ardurtos
- unipg-mbed-os-samples
---

Developing real-time systems often requires a deep understanding of how tasks interact with a scheduler and how timing constraints affect system stability. This repository, created by Ragu Manjegowda, serves as a practical companion to the Coursera course on Real-Time Systems, providing a structured environment to experiment with these concepts using FreeRTOS.

## Project Overview and Environment

The core of this project is built around a FreeRTOS simulator designed for POSIX environments. This allows developers and students to run FreeRTOS code directly on a Linux or macOS machine. By abstracting the hardware layer, the project focuses on the logic of real-time scheduling and task management. The repository is organized into five distinct assignments, each targeting different aspects of RTOS theory and practice.

## Technical Architecture

The project includes a full FreeRTOS source tree (`FreeRTOS-Sim/Source`) and a variety of demo files. The build system uses a standard Makefile that compiles the FreeRTOS kernel along with portable layers for GCC/POSIX. This setup is particularly useful for debugging real-time logic using standard desktop tools before deploying to actual microcontrollers.

### Key Components:
- **FreeRTOS Kernel**: Includes core files like `tasks.c`, `queue.c`, and `timers.c`.
- **POSIX Port**: Enables the RTOS to run as a process on a host operating system.
- **Simulation Tools**: Several assignments include XML files and Python scripts (like `P_RM.py`) for simulating task sets and analyzing scheduling feasibility.

## Exploring the Assignments

The repository is divided into five modules, each representing a step forward in complexity:

1. **Basic Task Management**: Assignments 1 and 2 focus on the fundamentals of creating tasks and understanding the FreeRTOS scheduler behavior.
2. **Scheduling Simulation**: Assignment 3 moves into the realm of simulation, using XML-based configurations to model task execution and visualize scheduling outcomes.
3. **Advanced Programming and Analysis**: Assignments 4 and 5 delve into more complex scenarios, including Rate Monotonic (RM) scheduling. Assignment 5 specifically includes a Python script for RM analysis and generates Gantt charts to visualize task execution over time.

## Getting Started

To use this project, you need a GCC-based environment. The workflow involves replacing the template `main.c` with the specific assignment code you wish to test.

### Build and Execution

To compile the project, navigate to the simulator directory and run the makefile:

```bash
cd FreeRTOS-Sim
# Replace Project/main.c with your desired assignment main.c
make
./FreeRTOS-Sim
```

This process compiles the FreeRTOS kernel and the application code into a single executable that simulates the real-time environment. The repository also includes various `.png` files that show expected simulation results, providing a benchmark for students to compare their output against.

## Educational Value

By bridging the gap between theoretical scheduling (like Rate Monotonic and Earliest Deadline First) and practical implementation in C, this repository provides a comprehensive toolkit for anyone looking to master FreeRTOS. The inclusion of both code-based assignments and simulation-based analysis ensures a well-rounded understanding of how real-time constraints impact software design.
