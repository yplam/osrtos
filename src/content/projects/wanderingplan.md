---
title: WanderingPlan (流浪计划)
summary: An IoT-based smart storage and locker system built on the AliOS-Things RTOS
  and the Haas600 development board. It integrates PIR motion detection, GPS tracking,
  temperature monitoring, and magnetic lock control with Alibaba Cloud IoT services.
slug: wanderingplan
codeUrl: https://github.com/FENGHSIAO/WanderingPlan
star: 4
version: v1.0.0
lastUpdated: '2022-04-07'
rtos: alios-things
topics:
- alios-things
- nodejs
- shapr3d
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- w600-rt-thread-smart-fingerprint-lock
- gnss-lorawan-tracker
- fctc-art-pi-code-iot-from-chip-to-cloud
- w601-rt-thread-alarm-clock
- smartlock-for-disco-l475vg-iot01a
- chronothermostat-an-aws-powered-iot-climate-control-system
---

## Overview

WanderingPlan (流浪计划) is an embedded IoT project designed to create intelligent storage solutions, such as smart bookshelves or automated lockers. Developed using the AliOS-Things operating system, the project targets the Haas600 development platform to provide a robust, cloud-connected hardware ecosystem. It combines physical security via magnetic locks with environmental sensing and remote management capabilities.

## Hardware and Architecture

The project is built around the Haas600 development board, a cellular IoT platform that facilitates easy connection to Alibaba Cloud. The system architecture is divided into several functional modules:

- **Security**: Controlled magnetic locks and PIR (Passive Infrared) sensors for human detection.
- **Environment**: Temperature sensors for monitoring storage conditions.
- **Location**: Integrated GPS module for asset tracking and positioning.
- **Connectivity**: UART-to-TTL communication and cellular connectivity for cloud synchronization.
- **Power**: Support for lithium battery modules and planned solar power integration.

## Project Phases

The development is structured into two distinct stages:

### Phase 1: Core Functionality
This stage focuses on the fundamental requirements for a smart locker, including temperature monitoring, PIR-based human detection, GPS tracking, and the implementation of the magnetic lock mechanism. All these components are successfully integrated with the Alibaba Cloud IoT platform.

### Phase 2: Expansion and Optimization
The second phase aims to extend the system's capabilities by adding a TTL serial camera for visual monitoring, solar power modules for energy independence, and active cooling systems to manage internal temperatures.

## Cloud Integration and API

WanderingPlan leverages Alibaba Cloud's IoT ecosystem for data telemetry and remote command execution. The project provides a comprehensive set of APIs (documented for NodeJS) that allow external applications to interact with the hardware. These APIs enable functions such as retrieving sensor values (PIR, temperature, location) and controlling actuators like LED indicators and magnetic locks.

### API Usage Example

Below is an example of how the project interacts with the Aliyun API Gateway to control the system's LED indicators:

```javascript
const Client = require('aliyun-api-gateway').Client;
const UUID = require('uuid');

const client = new Client('Your_AppKey', 'Your_AppSecret');

const params = {
    url: 'http://fcaea944ce554e968c4dc6acdd53033b-cn-shanghai.alicloudapi.com/a123spAe9pmMS0F4/bfx3LnoN6vcCkD',
    apiVer: '1.0.0',
    params: {
        "action":"node_bb4914c0",
        "green":1,
        "blue":1,
    }
}

// The Gateway function handles the POST request to the Aliyun IoT endpoint
Gateway(params)
    .then(res => console.log(res))
    .catch(res => console.log(res));
```

## Development Context

The project was initiated in late 2021 and saw active development through early 2022. It represents a practical application of AliOS-Things in the smart city and logistics sectors. The developer has also engaged with the AliOS-Things community to explore advanced features like UART-based camera streaming for the Haas600 platform.
