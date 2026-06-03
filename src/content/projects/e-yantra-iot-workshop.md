---
title: e-Yantra IoT Workshop
summary: A comprehensive collection of resources for learning IoT development, focusing
  on the e-Yantra IoT Platform and AWS IoT. It provides notes, exercises, and code
  samples for platforms like Raspberry Pi and Mongoose OS, covering IoT protocols,
  device shadows, and cloud integration.
slug: e-yantra-iot-workshop
codeUrl: https://github.com/eyantra-iot-platform/iot-workshop
siteUrl: http://iot.e-yantra.com
star: 2
lastUpdated: '2021-07-06'
rtos: mongoose-os
topics:
- aws-iot
- e-yantra
- esp8266
- iot
- iot-platform
- javascript
- mongoose-os
- python
- rpi
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- huawei-iot-developer-community-2017-codelabs
- mongoose-os-samples-for-esp32
- fctc-art-pi-code-iot-from-chip-to-cloud
- that-project
- universal-maker-sensor-kit
- blinker-iot-documentation
---

The e-Yantra IoT Workshop repository serves as a central hub for educational resources designed to guide developers through the complexities of the Internet of Things. Created by the e-Yantra project, this repository provides a structured path from fundamental IoT concepts to advanced cloud integration using AWS IoT and the specialized e-Yantra IoT Platform.

## Educational Structure

The resources are organized into three distinct modules, each targeting a specific layer of the IoT ecosystem:

### 1. Introduction to IoT
This section focuses on the foundational knowledge required to understand how connected devices operate. It includes technical notes and interactive exercises covering the IoT stack and various communication protocols. This module is designed to give learners a solid grasp of how data moves from sensors to the cloud before diving into specific platforms.

### 2. AWS IoT Deep Dive
AWS IoT is a cornerstone of modern industrial IoT applications. The workshop provides detailed documentation, diagrams, and demos to help users understand the AWS IoT architecture. Key concepts covered include the Device Shadow—which allows for persistent state management even when devices are offline—and AWS IoT Rules, which enable automated data processing and routing within the AWS ecosystem.

### 3. The e-Yantra IoT Platform
The e-Yantra IoT Platform is an open-source framework that acts as a developer-friendly wrapper around AWS IoT. Its primary goal is to lower the barrier to entry for building IoT applications. The platform includes several advanced features:
- **Device Connectivity:** Walkthroughs for connecting various hardware platforms.
- **Data Management:** Tools for exchanging data, visualization, and controlling actuators.
- **Advanced Interfaces:** Support for cron jobs and even Natural Language Processing (NLP) interfaces for device interaction.

## Supported Platforms and Hardware

While the principles taught are platform-agnostic, the repository provides specific code samples and implementations for several popular environments:
- **Raspberry Pi:** Using Python for rapid prototyping and edge computing.
- **Mongoose OS:** A purpose-built operating system for microcontrollers like the ESP32, facilitating cloud-native IoT development.
- **Node.js:** For server-side logic and application development.

The workshop is designed to be used with hardware provided by e-Yantra, but the open-source nature of the framework allows developers to set up their own hosted servers or use the official e-Yantra hosted environment to experiment with their own devices.
