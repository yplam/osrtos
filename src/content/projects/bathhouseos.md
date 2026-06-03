---
title: BathHouseOS
summary: BathHouseOS is a suite of six specialized operating systems designed for
  bathroom automation, covering everything from bathtubs to toilets. Built on TinyOS
  using nesC and Verilog, it provides features like flood protection, temperature
  monitoring, and automated flushing without requiring an internet connection.
codeUrl: https://github.com/seanpm2001/BathHouseOS
isShow: false
rtos: tinyos
libraries: []
topics:
- automation
- bath-house-os
- bathhouse-os
- bathos
- bathouseos
- bathroom
- bathroom-management
- gpl3
- gplv3
- md
- nesc
- operating-system
- operating-system-family
- tinyos
- txt
- verilog
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- bathhouseos-core-control-panel
- bathos
- aquarios-project-aquarius
- homebrew-tinyos-for-msp430
- knu-usn-automatic-ventilation-system
- esphome-plant-watering
---

### Automating the Most Private Room in the House: An Introduction to BathHouseOS

In the world of embedded systems, we often see RTOS implementations for industrial sensors, automotive ECUs, or consumer wearables. However, **BathHouseOS** (codename: Taft) takes a different approach by focusing on a highly specific and often overlooked environment: the bathroom. This project is not just a single operating system, but a cluster of six distinct OSes designed to automate and improve the performance of bathtubs, showers, sinks, toilets, and even urinals.

Built on the foundation of **TinyOS** and written using **nesC** and **Verilog**, BathHouseOS aims to provide a robust, local-first automation solution. One of its core design principles is privacy and reliability; no internet connection is required for any functionality, with the sole exception of optional time synchronization.

### The Subsystems of BathHouseOS

BathHouseOS is divided into specialized modules, each tailored to a specific fixture:

*   **BathOS**: Designed for bathtub management, its standout feature is a multi-threshold flood protection system. It uses sensors at various depths (from 10cm to 100cm) to automatically shut off water when specific levels are reached. It also includes a temperature gauge for monitoring cold, hot, and combined water temperatures.
*   **ThroneOS**: This module manages toilets, offering features like automatic flushing, flush direction control, and an "automatic opening" sensor that detects when a user is nearby. It even includes an optional "blender" add-on as a mechanical alternative to a plunger.
*   **MaprilOS**: A dedicated shower OS that introduces the "ThoughtPad," allowing users to record "shower thoughts" without leaving the stall. It also features an "AutoOff" sensor that shuts down the water when the user walks out of the shower area.
*   **SankOS & UriOS**: These provide basic automation for sinks and urinals, including soap and towel dispenser management and automatic flushing.

### Centralized Control with BathHouse Core

To manage this ecosystem, the project includes **BathHouse Core**. This is a GUI-based operating system installable on a central bathroom panel. It connects to all the other subsystems, allowing users to monitor hot water levels, adjust lighting patterns, or even schedule fish feeding (if an aquarium is present in the room) from a single interface.

### Technical Architecture and Requirements

From a technical standpoint, BathHouseOS is lightweight. It targets systems with approximately 4 megabytes of RAM and 64 megabytes of disk space. By utilizing nesC—a component-based, event-driven programming language—and Verilog for hardware-level logic, the system is optimized for the low-power, high-reliability requirements of embedded sensor networks.

### Why Taft?

The current development cycle (Alpha through v2.0) is codenamed **Taft**, named after U.S. President William Howard Taft. The choice is a humorous nod to the historical anecdote of the President getting stuck in a White House bathtub, emphasizing the project's goal of preventing bathroom-related mishaps through better technology.

Whether it is preventing a flood via the ten-threshold sensor system or capturing a fleeting idea on the ThoughtPad, BathHouseOS represents a unique application of RTOS principles to domestic life, prioritizing local control and specific utility over cloud-connected complexity.
