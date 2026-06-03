---
title: 'Project ASTRA: Asset Tracking'
summary: An asset tracking solution for large enterprises developed on the Contiki
  OS. It utilizes Zolertia Remote motes and an ad-hoc distance vector (DV) protocol
  for energy-aware routing between asset nodes and gateways.
codeUrl: https://github.com/yadhu1961/Asset-Tracking
isShow: false
rtos: contiki-os
libraries: []
topics:
- contiki
- contiki-os
- wsn-routing
- wsn
- c
- iot
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- loadng-implementation-on-contiki-os
- low-power-wireless-networking-for-iot-lpiot
- contiki-lora-tsch-project
- gnss-lorawan-tracker
- motesync
- networked-embedded-systems-nes-project
---

In large-scale enterprise environments, maintaining real-time visibility of high-value or mission-critical assets is a significant logistical challenge. Project ASTRA (Asset Tracking) provides a robust solution designed to track moving assets across multiple locations using a network of wireless nodes. Developed on the Contiki operating system, this project leverages low-power wireless communication to ensure efficient, energy-aware monitoring.

### The Core Concept: Dynamic Asset Monitoring

Project ASTRA treats assets as moving wireless nodes within a larger network. These assets are monitored by tracking nodes that form a mesh-like infrastructure. The system distinguishes between two primary types of nodes:

1.  **Asset Tracking Nodes**: These are attached to the assets themselves. They collect information and forward it through the network.
2.  **Gateway Nodes**: These act as the central collection points, receiving data from the tracking nodes to provide a unified view of asset locations.

To manage the communication between these nodes, the project implements an ad-hoc distance vector (DV) protocol. This protocol is specifically designed for dynamic, energy-aware routing, ensuring that data takes the shortest and most power-efficient path to the gateway.

### Technical Foundation: Contiki OS and Zolertia Remote

The project is built upon **Contiki OS**, an open-source operating system for the Internet of Things. Contiki is particularly well-suited for this application because of its event-driven programming model and **Protothreads**. Protothreads provide a memory-efficient way to handle concurrency, which is vital for resource-constrained embedded systems like the **Zolertia Remote** motes used in this project.

By using the **Rime stack**—Contiki's lightweight networking stack—the project achieves efficient communication without the overhead of a full IPv6 stack (though IPv6 support is optional in the Makefiles). The Rime stack allows for custom broadcast and unicast primitives, which are utilized here to manage routing tables and neighbor discovery.

### Energy-Aware Routing and Distance Vector Protocol

One of the standout features of Project ASTRA is its focus on energy awareness. In a wireless sensor network (WSN), battery life is the most critical constraint. The distance vector protocol implemented in this repository doesn't just look for the fewest hops; it considers the energy levels of the nodes. 

Nodes maintain a routing table (defined in `routing_table.c` and `routing_table.h`) that tracks the cost of reaching the gateway. This cost is dynamically updated based on the network topology and the remaining energy of intermediate nodes, preventing specific nodes from being depleted too quickly by acting as constant relays.

### Simulation and Development

The repository includes several **Cooja** simulation files (`.csc`). Cooja is the Contiki network simulator, and these files allow developers to test various scenarios, such as:
*   Constant packet loss environments.
*   Gateway information propagation.
*   TTL (Time to Live) logic for packets.
*   Route sharing and distance vector convergence.

### Getting Started with the Code

The project structure is organized into several sample directories, each containing a specific implementation of the tracking logic. A typical node application is found in `Samples/project_dv/project.c`. To compile the project for the Zolertia Remote platform, the standard Contiki build system is used:

```makefile
CONTIKI_PROJECT = project
all: $(CONTIKI_PROJECT)

PROJECT_SOURCEFILES += routing_table.c
CONTIKI_WITH_RIME = 1
CONTIKI = $(HOME)/contiki
include $(CONTIKI)/Makefile.include
```

By running `make TARGET=zoul`, developers can generate the `.zoul` or `.hex` files necessary to flash the hardware. The inclusion of Doxygen configuration files (`Doxyfile`) also suggests that the project is prepared for automated documentation generation, making it easier for new developers to understand the internal API and routing logic.
