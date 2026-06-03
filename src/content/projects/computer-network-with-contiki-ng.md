---
title: Computer Network with Contiki-NG
summary: A repository containing network simulations and RPL protocol implementations
  for the BIL401 Computer Networks course. It utilizes the Contiki-NG RTOS and Cooja
  emulator to explore DODAG structures, border node communication, and routing optimizations
  based on RSSI and hop count.
codeUrl: https://github.com/Pilestin/Computer-Network-with-ContikiNG
isShow: false
rtos: contiki-ng
libraries: []
topics:
- c
- computer-networks
- contiki-ng
- cooja
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- iot-labs-with-contiki-os
- cooja-using-contiki
- home-automation-simulation-using-contiki-os
- rl-tsch-implementation-for-contiki-ng
- rpl-network-authentication-simulation
- loadng-implementation-on-contiki-os
---

The **Computer-Network-with-ContikiNG** project is a practical implementation of networking concepts developed for the BIL401 Computer Networks course. Built on top of the **Contiki-NG** operating system, the project focuses on simulating and analyzing low-power wireless networks using the **Cooja** emulator. It serves as a hands-on exploration of how modern IoT routing protocols function in constrained environments.

### Project Structure and Objectives

The repository is organized into specific studies (Odev) that tackle different layers of network complexity. The primary goal is to understand how nodes interact within a Destination-Oriented Directed Acyclic Graph (DODAG) and how routing decisions can be optimized for efficiency and reliability.

### Study 2: Border Node Communication

The second study focuses on establishing a basic network structure where internal nodes communicate with a border router. This implementation involves three distinct node types:
- **First Node**: Responsible for generating packets and initiating communication within the network.
- **Inner Node**: Acts as a relay or intermediate point within the DODAG structure.
- **Last Node (Border Router)**: Receives packets from the network, evaluates their content, and sends responses back to the originating nodes.

This study demonstrates the fundamental mechanics of packet formation and the establishment of a DODAG structure, which is the backbone of the RPL (Routing Protocol for Low-Power and Lossy Networks) protocol.

### Study 3: RPL Algorithm Optimization

The third study dives deeper into the RPL algorithm, specifically looking at how to modify the objective function to improve routing efficiency. The project explores two primary metrics for path selection:
1. **Minimum Hop Count**: Prioritizing paths with the fewest number of "jumps" between the source and the destination.
2. **Signal Strength (RSSI)**: Dynamically adjusting the network topology based on Received Signal Strength Indication to ensure more stable links.

Technical research within this phase covers the investigation of RPL control messages, such as **DIO (DODAG Information Object)** and **DIS (DODAG Information Solicitation)**, which are critical for network discovery and maintenance. By modifying these parameters, the project demonstrates how to tailor the RPL algorithm to specific environmental conditions or performance requirements.

### Development and Simulation

All implementations are designed to run within the **Cooja Simulator**, the standard simulation tool for Contiki-NG. This allows for the visualization of the network topology and the monitoring of packet flow between nodes in real-time. The project highlights the collaborative effort of a development team, with members focusing on different aspects of the system, from documentation and protocol research to the actual implementation of the RSSI and Hop Count logic.
