---
title: 'ELISE: SDN-based Solution for IoT Networks'
summary: ELISE is a Software-Defined Networking (SDN) framework for Wireless Sensor
  Networks (WSNs) built on Contiki-NG. It features a Python-based controller with
  reinforcement learning capabilities, TSCH scheduling, and support for the Cooja
  simulator and FIT IoT LAB platforms.
slug: elise-sdn-based-solution-for-iot-networks
codeUrl: https://github.com/fdojurado/SDWSN-controller
siteUrl: https://sdwsn-controller.readthedocs.io/
star: 3
version: release/v1.2
lastUpdated: '2023-12-11'
rtos: contiki-ng
topics:
- contiki
- contiki-ng
- contiki-os
- machine-learning
- reinforcement-learning
- sdn-controller
- sdwsn
- sdwsn-controller
- wsn
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rl-tsch-implementation-for-contiki-ng
- ql-tsch-implementation-for-contiki-ng
- ql-tsch-reinforcement-learning-for-time-slotted-channel-hopping
- low-power-wireless-networking-for-iot-lpiot
- smart-orchard
- wsntestbed
---

## Overview

ELISE is a comprehensive Software-Defined Networking (SDN) solution designed for the next generation of Internet of Things (IoT) networks. By merging multidisciplinary research in SDN, Wireless Sensor Networks (WSNs), and Machine Learning (ML), ELISE provides a flexible and intelligent control plane for managing constrained device environments. 

The project is divided into two primary components: the SDWSN Controller, which acts as the centralized intelligence, and the SDWSN Network OS (based on Contiki-NG), which runs on the actual sensor nodes and edge devices.

## The SDWSN Controller

The controller is the heart of the ELISE architecture, implemented in Python and designed to manage complex network behaviors. It supports various deployment environments, including containerized instances for the Cooja network simulator and direct integration with the FIT IoT LAB platform. 

One of the most distinctive features of the ELISE controller is its Reinforcement Learning (RL) module. This allows the network to adapt dynamically to changing conditions by processing rewards and optimizing environment management. The controller also includes specialized modules for:

- **TSCH Scheduling**: Designing and building Time-Slotted Channel Hopping schedules to ensure reliable communication.
- **Routing Management**: Handling the calculation and distribution of routing paths across the SDWSN.
- **Packet Processing**: A dedicated dissector for packing and unpacking packets specific to the SDWSN protocol.
- **Network Reconfiguration**: Managing the configuration functions of the entire network infrastructure.
- **Data Persistence**: Utilizing a MongoDB database to store and track network information.

## SDWSN Network OS: Contiki-NG-SDWSN

The data plane of ELISE relies on a specialized version of Contiki-NG, referred to as Contiki-NG-SDWSN. This protocol is optimized for constrained devices and edge controllers, providing the necessary hooks for the SDN controller to manage node behavior. It leverages the robust features of Contiki-NG while adding the specific signaling required for software-defined control in a wireless sensor context.

## Technical Implementation

The controller is built using Python 3.10+ and integrates several powerful libraries to handle its diverse tasks. It uses `stable_baselines3` for its reinforcement learning capabilities, `networkx` for graph-based routing calculations, and `pyserial` for communication with the sink node of the network. The system is designed to be highly modular, allowing researchers and developers to swap or extend modules for specific IoT use cases.

For experimentation, ELISE provides scripts to automate tests on the FIT IoT LAB, a large-scale open testbed for IoT. This allows for seamless transition from simulation in Cooja to real-world hardware validation.
