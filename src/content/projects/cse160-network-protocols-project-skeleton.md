---
title: CSE160 Network Protocols Project Skeleton
summary: A network protocol implementation skeleton for TinyOS, designed for the CSE160
  network project. It provides a foundation for developing routing, transport, and
  application layer protocols on sensor motes using the nesC language and TOSSIM simulation
  environment.
slug: cse160-network-protocols-project-skeleton
codeUrl: https://github.com/brando209/network-protocols
star: 0
lastUpdated: '2019-11-05'
rtos: tinyos
topics:
- nesc
- network-programming
- python
- tinyos
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- compass-multihop-framework-for-tinyos
- tinyos-nesc-telosb-programs
- msf-protocol-simulation-for-contiki-ng
- tag-and-tina-implementation-on-tinyos
- computer-network-with-contiki-ng
- networked-embedded-systems-nes-project
---

## Overview

This project provides a comprehensive skeleton for developing network protocols within the TinyOS ecosystem. Originally designed for the CSE160 network project at UC Merced, it serves as a foundational framework for students and developers to implement various layers of the OSI model, specifically tailored for resource-constrained sensor nodes (motes).

The repository includes implementations and interfaces for core networking tasks, including neighbor discovery, link-state routing, and transport layer logic. By leveraging TinyOS's component-based architecture and the nesC programming language, the project allows for modular development and testing of complex distributed systems.

## Key Components and Architecture

The project is structured around several core modules and interfaces that abstract the complexities of low-level hardware interaction:

- **Node Logic**: The central `Node.nc` component manages the state machine of the sensor node, handling boot events, radio control, and packet dispatching.
- **Data Structures**: To assist with protocol management, the project includes custom implementations of Hashmaps and Lists, optimized for the constraints of embedded environments.
- **General Libraries**: 
    - **CommandHandler**: Provides an interface with TOSSIM (the TinyOS simulator), allowing external commands to trigger events within the node.
    - **SimpleSend**: A wrapper for the TinyOS lower-level sender that includes basic queuing and collision avoidance mechanisms.
    - **Transport**: An interface defined for end-to-end communication, intended for manual implementation of flow control and reliability.

## Simulation and Testing

One of the project's strengths is its integration with TOSSIM, which enables high-fidelity simulation of wireless sensor networks. The repository includes Python scripts that define network topographies and noise models, allowing developers to test their protocols under various conditions without needing physical hardware.

### Topography and Noise

Network layouts are defined in `.topo` files, specifying bidirectional or unidirectional links between nodes and their respective gains. To simulate real-world interference, the project utilizes noise models (e.g., `no_noise.txt`) that can be loaded into the simulation to test packet loss handling and protocol robustness.

### Example Simulation Script

The following Python snippet demonstrates how to initialize a simulation, load a network layout, and execute a ping command between nodes:

```python
from TestSim import TestSim

def main():
    # Get simulation ready to run.
    s = TestSim();

    # Before we do anything, lets simulate the network off.
    s.runTime(1);

    # Load the the layout of the network.
    s.loadTopo("long_line.topo");

    # Add a noise model to all of the motes.
    s.loadNoise("no_noise.txt");

    # Turn on all of the sensors.
    s.bootAll();

    # Add the main channels for debugging
    s.addChannel(s.COMMAND_CHANNEL);
    s.addChannel(s.GENERAL_CHANNEL);

    # Simulate a ping from node 1 to node 2
    s.runTime(1);
    s.ping(1, 2, "Hello, World");
    s.runTime(1);

if __name__ == '__main__':
    main()
```

## Technical Implementation Details

The project utilizes `nescc-mig` to generate Python interfaces for message structures defined in C headers, facilitating seamless communication between the simulation scripts and the nesC code. The core packet structure includes fields for source, destination, TTL (Time To Live), sequence numbers, and protocol identifiers, supporting protocols like PING, TCP, and custom routing logic.

Key features implemented in the skeleton include:
- **Neighbor Discovery**: Identifying adjacent motes in the network.
- **Link State Routing**: Building a global view of the network topology to calculate shortest paths.
- **Flooding**: A basic mechanism for broadcasting packets across the entire network.
- **Application Layer**: A framework for building chat servers or other high-level services on top of the transport layer.
