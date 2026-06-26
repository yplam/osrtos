---
title: KNU-USN Automatic Ventilation System
summary: An automatic ventilation system developed as a Ubiquitous Sensor Network
  (USN) project. Built on TinyOS, it utilizes the Hanback Electronics HBE-ITC-RFID&USN
  Kit to integrate various sensors and actuators including gas detectors, motion sensors,
  and shutters.
slug: knu-usn-automatic-ventilation-system
codeUrl: https://github.com/JihunDev/KNU-USN
star: 0
lastUpdated: '2018-06-19'
rtos: tinyos
topics:
- c
- tinyos
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- networked-embedded-systems-nes-project
- temperature-controlled-ventilation-system-for-indoor-environments
- homeiot-smart-home-automation-system
- atmega128rfa1-tinyos-kth-wsn-project
- q-sensor-multi-functional-zigbee-air-quality-sensor
- bathos
---

## Overview

KNU-USN is a specialized embedded project focused on developing an automatic ventilation system within a Ubiquitous Sensor Network (USN) framework. Created as a course project, it demonstrates the integration of multiple sensor nodes and actuators to manage indoor air quality and safety. The system is built using TinyOS, a popular open-source operating system designed for low-power wireless devices, such as those used in sensor networks.

## Hardware and Environment

The project is specifically designed for the **Hanback Electronics HBE-ITC-RFID&USN Kit**. This educational platform provides the necessary hardware to experiment with RFID and USN technologies. To support the development workflow, the project utilizes **TinyOS** as the core operating system, typically running within a **Cygwin** environment on Windows to provide the necessary Linux-like toolchain for compiling and uploading code to the sensor nodes.

## System Components

The repository is organized into several modules, each representing a specific component of the smart home or industrial automation environment. These components work together to provide a comprehensive monitoring and response system:

- **Gas Detection and Control**: Includes modules for a Gas Detector and a Gas Shutter. This sub-system is responsible for identifying hazardous gas levels and automatically triggering a shutter mechanism to mitigate risk.
- **Motion and Security**: Features a Motion Detector and a Door Lock module, allowing the system to respond to physical presence and manage access control.
- **Environmental Control**: Includes a Dimmer module for lighting control and an Outlet module for power management.
- **Communication Protocol**: The project includes a custom protocol implementation (`MyProtocol`), which likely handles the data exchange between the various sensor nodes and the central controller.

## Technical Implementation

By leveraging TinyOS, the project utilizes a component-based architecture and the nesC programming language. This approach is highly efficient for resource-constrained devices, allowing for event-driven execution and low power consumption. The modular structure of the repository suggests a distributed system where different nodes handle specific tasks—such as sensing gas or detecting motion—and communicate their status over the network to trigger appropriate actions, such as opening a vent or locking a door.

## Getting Started

To work with this project, developers need the HBE-ITC-RFID&USN hardware kit. The software environment requires a functional TinyOS installation, which is traditionally set up via Cygwin on Windows systems. The various directories (Ch3 through Ch8) contain the source code for specific chapters or functional blocks of the system, providing a step-by-step implementation of the automatic ventilation logic.
