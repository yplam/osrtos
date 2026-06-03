---
title: Contiki LoRa TSCH Project
summary: An implementation of the Time-Slotted Channel Hopping (TSCH) MAC protocol
  over LoRa physical layers using the Contiki-NG RTOS. It features a modified Contiki-NG
  kernel to support the longer timeslots required by LoRa modulation and includes
  support for the Orchestra scheduler and RPL routing.
slug: contiki-lora-tsch-project
codeUrl: https://github.com/tperale/tsch-lora
star: 2
lastUpdated: '2021-05-12'
rtos: contiki-ng
topics:
- contiki-ng
- lora
- tsch
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- ql-tsch-implementation-for-contiki-ng
- rl-tsch-implementation-for-contiki-ng
- ql-tsch-reinforcement-learning-for-time-slotted-channel-hopping
- msf-protocol-simulation-for-contiki-ng
- sx128x-lora-transceiver-driver-for-contiki-ng
- sx127x-lora-transceiver-driver-for-contiki-ng
---

The Contiki LoRa TSCH project explores the integration of Time-Slotted Channel Hopping (TSCH) with LoRa modulation. While LoRa is traditionally associated with the LoRaWAN protocol—which typically uses an ALOHA-based medium access control—this project leverages the deterministic nature of TSCH, a key component of the IEEE 802.15.4 standard, to provide reliable and scheduled communication over long-range LoRa links.

At its core, the project is built upon Contiki-NG, a popular open-source operating system for the Internet of Things. Because LoRa transmissions generally take significantly longer than standard 802.15.4 transmissions, the project utilizes a modified version of the Contiki-NG kernel. This modification allows for the extended timeslots necessary to accommodate LoRa's lower data rates and longer symbol times while maintaining the synchronization required for TSCH.

## Key Features and Capabilities

The repository provides a complete environment for experimenting with TSCH over LoRa. It includes several advanced features of the Contiki-NG stack:

- **Orchestra Scheduler**: Support for the Orchestra autonomous scheduling algorithm, which allows nodes to compute their own transmission slots based on the network topology.
- **Link-Layer Security**: Integration with IEEE 802.15.4 standard security features to ensure encrypted and authenticated communication.
- **RPL Routing**: Support for the IPv6 Routing Protocol for Low-Power and Lossy Networks (RPL), including both storing and non-storing modes.
- **SX127x Integration**: A dedicated driver for the Semtech SX127x series of LoRa transceivers, integrated as a submodule.

## Technical Implementation

The project structure is designed for ease of use in research and development. The `/src` directory contains the application logic, while the `sx127x` directory provides the hardware abstraction for the LoRa radio. The system is configured to support different roles in the network, specifically a coordinator (the root of the TSCH network) and joining nodes.

One of the critical technical challenges addressed here is the timing. TSCH relies on precise synchronization between nodes. By modifying Contiki-NG to support longer timeslots, this project enables the use of LoRa's high sensitivity and long-range capabilities without sacrificing the reliability of a scheduled MAC layer.

## Getting Started

The project includes a convenient `compile.sh` script to streamline the build process. Users can quickly generate firmware for different node types:

```bash
# To compile the network coordinator
./compile.sh 0

# To compile a joining node
./compile.sh 1
```

The build system supports several command-line flags to enable or disable specific features, such as `MAKE_WITH_ORCHESTRA` for scheduling or `MAKE_WITH_SECURITY` for link-layer encryption. This flexibility makes it an excellent platform for benchmarking different network configurations in a LoRa-based mesh environment.
