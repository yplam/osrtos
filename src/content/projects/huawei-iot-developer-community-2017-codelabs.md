---
title: Huawei IoT Developer Community 2017 Codelabs
summary: A collection of source materials and tutorials for Huawei's IoT ecosystem,
  focusing on NB-IoT, LiteOS, and OceanConnect. It provides end-to-end examples ranging
  from embedded device firmware using LiteOS to northbound web applications built
  with Node.js.
slug: huawei-iot-developer-community-2017-codelabs
codeUrl: https://github.com/softbaddog/iot-codelabs
siteUrl: http://developer.huawei.com/ict/cn/training/codelab/labs
star: 24
lastUpdated: '2018-01-08'
rtos: liteos
topics:
- edge-computing
- iot-platform
- liteos
- nb-iot
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- e-yantra-iot-workshop
- fctc-art-pi-code-iot-from-chip-to-cloud
- that-project
- alios-things-application-development
- mongoose-os-samples-for-esp32
- mongoose-os-programs-and-examples
---

## Overview

The Huawei IoT Developer Community Codelabs repository serves as a comprehensive resource for developers working within the Huawei IoT ecosystem. Originally released for the Huawei 2017 developer events, these codelabs provide practical, hands-on examples of how to integrate hardware devices with the OceanConnect IoT platform using various connectivity technologies and software frameworks.

The project is structured to guide developers through the entire IoT stack, from the physical device layer to the cloud-based application layer. It specifically highlights the use of Huawei's LiteOS, a lightweight real-time operating system designed for power-constrained IoT devices.

## Technical Components

The repository is organized into three primary modules, each focusing on a different aspect of the IoT lifecycle:

### NB-IoT and LiteOS Integration
This section focuses on connecting Narrowband IoT (NB-IoT) devices to the OceanConnect platform. It utilizes Huawei LiteOS as the device-side operating system, demonstrating how to manage tasks and connectivity on resource-constrained hardware. The examples are particularly tailored for the Lierda B-type NB-IoT development boards, which are common in the Chinese IoT market.

### Edge Computing with AgentLite
For gateway and edge scenarios, the project explores AgentLite. This middleware is designed for more capable edge devices that act as intermediaries between local sensor networks and the cloud. It covers edge computing concepts and how to manage local data processing before transmission to the central platform.

### Northbound Application Development
To complete the end-to-end loop, the repository includes a web application tutorial. Built with Node.js, this "northbound" application demonstrates how to consume data from the OceanConnect platform and present it through a web-based interface. This allows developers to see how device data is eventually visualized and utilized by end-users.

## Key Features

- **End-to-End Workflow**: Covers everything from embedded C code on the device to JavaScript on the server.
- **LiteOS Implementation**: Provides a real-world look at how LiteOS is deployed in NB-IoT scenarios.
- **Platform Integration**: Deep integration with Huawei OceanConnect for device management and data collection.
- **Hardware Specifics**: Includes support and research into specific hardware like the Lierda NB-IoT boards.

## Getting Started

Developers can explore the individual directories to find source code for each stage of the IoT pipeline. The repository is designed to be used alongside the official Huawei developer training materials. While the core material dates back to 2017, it remains a foundational reference for understanding the architecture of Huawei's IoT solutions and the implementation of LiteOS in commercial NB-IoT applications.
