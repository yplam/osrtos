---
title: Xenomai 3 Exercises for Raspberry Pi 4
summary: A collection of educational exercises and solutions for Xenomai 3.1, focusing
  on real-time systems programming. The project covers core RTOS concepts like multitasking,
  scheduling, and interrupt handling on Raspberry Pi 4 hardware running a patched
  Linux kernel.
slug: xenomai-3-exercises-for-raspberry-pi-4
codeUrl: https://github.com/m-tartari/xemoai3-exercises
siteUrl: http://www.cs.ru.nl/lab/xenomai/
star: 8
lastUpdated: '2021-05-14'
rtos: xenomai
topics:
- c
- raspberry-pi
- raspberry-pi-4
- xenomai
- xenomai3
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- xenomai-3-exercises
- str-xenomai-real-time-systems-practices
- xenomai-3-for-raspberry-pi-4
- xenomai-on-raspberry-pi
- development-of-real-time-systems-assignments
- raspberry-pi-4-xenomai-3-patch
---

## Overview

This project provides a comprehensive set of exercises designed to help developers familiarize themselves with Xenomai 3.1, a real-time development framework that supplements the Linux kernel. Originally based on the curriculum from Radboud University (cs.ru.nl), this repository includes completed solutions tested on modern embedded hardware, specifically the Raspberry Pi 4B.

Xenomai is unique in the embedded world because it allows for hard real-time performance within a Linux environment by using a dual-kernel architecture (Cobalt) or a single-kernel approach (Mercury). These exercises focus on the Cobalt core, which utilizes an interrupt pipeline (I-pipe) to ensure deterministic response times.

## Exercise Topics

The repository is structured into nine distinct sets of exercises, each targeting a fundamental concept of real-time operating systems:

- **Multi-Tasking and Scheduling**: Exploring how Xenomai handles task creation and management.
- **Synchronization**: Practical implementation of semaphores to manage shared resources.
- **Scheduling Policies**: Deep dives into Preemptive Priority-Based Scheduling and Round Robin Scheduling.
- **Priority Inversion**: Understanding and mitigating common pitfalls in real-time priority management.
- **Hardware Interaction**: Exercises involving Interrupt Service Routines (ISRs) and programmable LED clocks.
- **Performance Analysis**: Measuring jitter and latency to verify the real-time characteristics of the system.

## Technical Implementation and Hardware

The exercises are tailored for the Raspberry Pi 4B (4GB RAM) running Raspbian Buster. Achieving hard real-time performance on this platform requires a specific software stack, including a prepatched Xenomai kernel (version 4.19.86). 

One of the critical technical aspects covered in the project documentation is the configuration of the Linux boot parameters to optimize real-time behavior. This includes disabling FIQ features that can interfere with the I-pipe kernel and modifying CPU affinity using `isolcpus` and `xenomai.supported_cpus`. These settings ensure that specific CPU cores are dedicated to Xenomai tasks, minimizing interference from standard Linux processes.

## Memory Management and Workarounds

A notable technical detail addressed in this project is a known issue with the 4GB RAM version of the Raspberry Pi 4 when using the I-pipe kernel. The project provides a specific workaround by limiting the usable memory to 3GB via the `total_mem` configuration, ensuring system stability during real-time operations.

## Getting Started

To use these exercises, users must first deploy a prepatched Xenomai kernel. The repository references the `rpi4-xeno3` project for the kernel source and deployment scripts. Once the environment is prepared, users can verify their setup using the standard Xenomai latency test tool:

```bash
sudo /usr/xenomai/bin/latency
```

This tool provides immediate feedback on the jitter and latency of the patched system, serving as a baseline before diving into the specific programming exercises located in the `ex1` through `ex9` directories.
