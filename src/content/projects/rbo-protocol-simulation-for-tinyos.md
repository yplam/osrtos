---
title: RBO Protocol Simulation for TinyOS
summary: A Java-based prototype and simulation environment for the Robust Broadcast-Scheduling
  Protocol (RBO). It emulates core TinyOS components to facilitate the development
  and testing of energy-efficient broadcast scheduling for wireless sensor networks.
slug: rbo-protocol-simulation-for-tinyos
codeUrl: https://github.com/bit-reversal/rbo-tinyos-java
siteUrl: https://sites.google.com/site/rboprotocol/
star: 0
lastUpdated: '2015-03-22'
rtos: tinyos
topics:
- bit-reversal
- java
- scheduling
- simulation
- tinyos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- msf-protocol-simulation-for-contiki-ng
- tinyos-cooja-simulator-application
- cse160-network-protocols-project-skeleton
- rl-tsch-implementation-for-contiki-ng
- ql-tsch-reinforcement-learning-for-time-slotted-channel-hopping
- ql-tsch-implementation-for-contiki-ng
---

## Overview

The RBO (Robust Broadcast-Scheduling) protocol is designed to minimize the tuning time and energy consumption of receivers in wireless broadcast networks. This repository provides a Java-based prototype and simulation framework that emulates the behavior of TinyOS, a popular operating system for wireless sensor networks. By leveraging the properties of bit-reversal permutations, RBO allows receivers to synchronize with a broadcast cycle using a minimal number of samples, significantly extending the battery life of remote nodes.

## The RBO Protocol

The core innovation of RBO lies in its use of bit-reversal permutations for scheduling. In a typical broadcast cycle, a sequence of keys (of length 2^k) is permuted using a k-bit-reversal algorithm. The sender broadcasts this sequence in a round-robin fashion. 

Because of the mathematical properties of bit-reversal, a receiver can start listening at any arbitrary point in the cycle. By receiving only a few samples, the receiver can determine its position within the cycle and predict when the specific data it needs will be transmitted. This "low-sample" requirement is what drives the energy efficiency of the protocol, as the radio hardware can remain in a low-power sleep state for the majority of the broadcast cycle.

## TinyOS Emulation in Java

To bridge the gap between high-level simulation and embedded deployment, this project includes a suite of Java classes that emulate the execution model of TinyOS. These components allow developers to test protocol logic using the same event-driven patterns found in nesC and TinyOS environments:

- **TinyScheduler**: Implements a task-based execution loop, managing a queue of tasks and handling system pauses and restarts.
- **TinyTask**: Defines the fundamental unit of work, mimicking the non-blocking tasks used in TinyOS to ensure system responsiveness.
- **TinySplitControl**: Emulates the asynchronous 'split-phase' operations common in embedded systems, such as starting or stopping a radio component with success/failure callbacks.
- **TinyTimer & TinyRadio**: Provide the necessary timing and communication abstractions to simulate real-time radio interactions and power management.

## Technical Implementation

The protocol implementation is split into several modules. The `RboReceiver` and `RboSender` classes handle the logic of the protocol, while files ending in `Events.java` define the interfaces for signaled events. This structure mirrors the component-and-interface architecture of TinyOS.

The simulation environment is designed for real-time testing. The `TestApplication` creates a visual representation of the network, spawning separate windows for the sender and receiver. Users can configure parameters such as the sequence length and the time slot duration (in milliseconds) to observe how the protocol performs under different network conditions.

## Getting Started

The project is structured for easy compilation using standard Java tools. By running `javac *.java`, the entire suite of protocol modules and TinyOS emulations are built. The simulation can then be launched via the `TestApplication` class, providing a terminal-based menu for monitoring statistics, such as the number of successful searches, timeouts, and total energy consumption (calculated based on the time the emulated radio spent in the 'ON' state).
