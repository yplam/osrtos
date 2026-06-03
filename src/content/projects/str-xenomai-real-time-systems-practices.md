---
title: 'STR-Xenomai: Real-Time Systems Practices'
summary: A collection of real-time systems exercises and practices using the Xenomai
  RTOS framework. It targets Linux-based platforms and the Raspberry Pi, focusing
  on concepts like task scheduling, semaphores, and priority inversion management.
slug: str-xenomai-real-time-systems-practices
codeUrl: https://github.com/rafaael1/str-xenomai
siteUrl: http://www.cs.ru.nl/lab/xenomai/
star: 2
lastUpdated: '2018-10-01'
rtos: xenomai
topics:
- rtos
- xenomai
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- xenomai-3-exercises-for-raspberry-pi-4
- xenomai-3-exercises
- development-of-real-time-systems-assignments
- xenomai-on-raspberry-pi
- xenomai-3-for-raspberry-pi-4
- raspberry-pi-rtos-rpi-rtos
---

## Overview

STR-Xenomai is an educational project focused on implementing real-time systems concepts using the Xenomai framework. Xenomai is a real-time development framework that supplements the Linux kernel, providing deterministic response times and hard real-time capabilities while maintaining compatibility with standard Linux APIs and drivers. This repository contains solutions for exercises originally designed by the Design of Embedded Systems (DES) course at Radboud University Nijmegen.

## Real-Time Capabilities with Xenomai

The project leverages Xenomai's ability to run alongside a standard Linux kernel. This architecture allows developers to use familiar Linux tools and drivers while executing time-critical threads with strict deadline requirements. One of the primary advantages highlighted in this project is the ability to port legacy POSIX code to a real-time environment by simply adjusting compilation flags to link against Xenomai's POSIX skin.

## Technical Focus Areas

The repository explores several fundamental RTOS concepts through practical implementation:

### Task Management and Scheduling
Exercises within the project demonstrate how to manage multiple tasks and observe their execution patterns. By manipulating global variables and observing task interleaving, the project illustrates how a real-time scheduler handles context switching and task priorities.

### Synchronization Primitives
A significant portion of the work involves using semaphores to control access to shared resources. The project includes implementations where semaphores (using `rt_sem_p` and `rt_sem_v` directives) are used to toggle variables between states, ensuring that tasks execute in a predictable, synchronized sequence.

### Priority Inversion Management
The project includes detailed documentation on the problem of priority inversion—where a low-priority task holding a resource prevents a high-priority task from executing. It explores two primary solutions implemented in real-time environments:
- **Priority Inheritance:** Where a low-priority task temporarily inherits the priority of a higher-priority task waiting for its resource.
- **Priority Ceiling:** Where resources are assigned a priority level, and any task acquiring the resource immediately operates at that ceiling priority to prevent preemption by medium-priority tasks.

## Hardware and Environment

The solutions are designed to be executed in both simulated and physical environments. The primary hardware target is the Raspberry Pi Model B, a popular platform for embedded Linux and RTOS experimentation. For development and testing without physical hardware, the project also supports execution within VirtualBox environments running Linux distributions patched with the Xenomai kernel.
