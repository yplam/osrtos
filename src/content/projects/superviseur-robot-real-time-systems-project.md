---
title: Superviseur Robot - Real-Time Systems Project
summary: A robot supervisor application developed for real-time systems coursework
  at INSA GEI. It implements control logic and monitoring for robotic systems using
  C and real-time extensions, targeting the Xenomai framework within the DeStijl educational
  environment.
slug: superviseur-robot-real-time-systems-project
codeUrl: https://github.com/INSA-GEI/superviseur_robot
star: 5
version: STRESS-TEST
lastUpdated: '2018-11-19'
rtos: xenomai
topics:
- c
- insa-toulouse
- opencv
- real-time
- xenomai
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- xenomai-3-exercises-for-raspberry-pi-4
- str-xenomai-real-time-systems-practices
- cuybot-v1-opensource-smartcar-project
- xenomai-3-exercises
- development-of-real-time-systems-assignments
- rtai-ros
---

## Overview

The **superviseur_robot** project is a core component of the Real-Time Systems (TP-RT) curriculum at INSA GEI. Designed as a supervisor for robotic platforms, this project provides a practical environment for students to apply theoretical concepts of real-time programming, task synchronization, and hardware interfacing. 

The project is built around the **DeStijl** framework, a specialized environment used for teaching embedded and real-time systems. This framework typically integrates with **Xenomai**, a real-time development framework for Linux, allowing for deterministic behavior in control loops and sensor processing.

## Core Functionality

The supervisor acts as the central intelligence for a robot, managing various concurrent tasks. In a typical real-time robotics application, these tasks must be carefully orchestrated to ensure safety and responsiveness. Key areas of focus include:

- **Communication Management**: Handling data exchange between the supervisor and the robot's low-level controllers or remote user interfaces.
- **Mission Logic**: Executing high-level commands and managing the state machine of the robot to perform specific maneuvers or tasks.
- **Safety Monitoring**: Ensuring that the robot operates within safe parameters and responding to emergency stops or sensor alerts with high priority.
- **Real-Time Scheduling**: Utilizing Xenomai's capabilities to ensure that critical tasks, such as control loops, meet their deadlines without jitter.

## Technical Architecture

The source code is organized into several modules, including initialization routines found in the `destijl_init` directory and various examples in the `src` folder. By using the C programming language, the project maintains the low overhead essential for embedded real-time applications. 

The architecture relies heavily on real-time primitives provided by the underlying RTOS, such as:
- **Semaphores and Mutexes**: For protecting shared resources between concurrent tasks.
- **Message Queues**: For inter-task communication and data passing.
- **Periodic Tasks**: For control loops that require precise timing.

## Educational Context

As a "TP" (Travaux Pratiques) project, it serves as a bridge between low-level hardware interaction and high-level software architecture. It challenges developers to navigate the complexities of multi-threaded programming where timing is as critical as logic. The repository provides the necessary boilerplate and structure to get a robot supervisor up and running in a controlled, real-time environment, making it an excellent resource for learning hard real-time development on Linux-based systems.
