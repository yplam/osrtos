---
title: LOADng Implementation on Contiki OS
summary: An implementation of the Lightweight On-demand Ad hoc Distance-vector Routing
  Protocol - Next Generation (LOADng) for the Contiki operating system. It extends
  the Rime network stack to provide efficient routing for low-power and lossy networks
  (LLNs).
codeUrl: https://github.com/jiahaoliang/EE652_LOADng
siteUrl: https://tools.ietf.org/html/draft-clausen-lln-loadng-12
isShow: false
rtos: contiki-os
libraries: []
topics:
- contiki
- contiki-os
- routing
star: 6
lastUpdated: '2020-08-26'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- contiki-lora-tsch-project
- low-power-wireless-networking-for-iot-lpiot
- ql-tsch-implementation-for-contiki-ng
- computer-network-with-contiki-ng
- rl-tsch-implementation-for-contiki-ng
- mrhof-simplified-modified-rpl-objective-function-for-contiki
---

The LOADng (Lightweight On-demand Ad hoc Distance-vector Routing Protocol - Next Generation) is a simplified version of the AODV routing protocol, specifically designed for Low-power and Lossy Networks (LLNs). This project provides a functional implementation of the LOADng protocol integrated into the Contiki OS environment, specifically targeting the Rime network stack.

### Overview of LOADng
LOADng is intended for use in resource-constrained environments where traditional routing protocols might be too heavy. It operates by discovering routes on-demand, which reduces the overhead of maintaining routing tables for paths that are not currently in use. This implementation follows the specifications outlined in the IETF draft for LOADng, focusing on core functionalities like route discovery and maintenance within the Contiki ecosystem.

### Technical Implementation
The project involves significant modifications to the core networking components of Contiki 2.7. The implementation primarily resides within the Rime stack, affecting how nodes discover neighbors and establish multi-hop paths. Key files modified or implemented include:

- **route.c / route.h**: Handles the routing table logic, including adding, removing, and looking up routes, as well as managing blacklists and pending route requests.
- **route-discovery.c / route-discovery.h**: Manages the process of finding new paths through the network.
- **mesh.c**: Provides the mesh networking interface that utilizes the LOADng routing logic.
- **uip-over-mesh.c**: Bridges the uIP (TCP/IP) stack with the underlying mesh routing, allowing standard IP traffic to flow over the LOADng-managed network.

### Key Features and Progress
The implementation covers a wide range of mandatory routing functions, including:
- Route initialization and lifecycle management (add, refresh, remove).
- Pending list lookups to handle concurrent route requests.
- Blacklisting mechanisms to avoid unreliable links.
- Route discovery opening and execution.

While the core discovery and routing logic are complete, the project identifies future work areas such as full Route Error (RERR) handling, route repair mechanisms, and sequence number-based route updates to ensure path freshness.

### Getting Started and Testing
To use this implementation, users are expected to integrate the provided source files into a standard Contiki 2.7 installation. The repository includes a `contiki-2.7.zip` archive for a consistent environment. Once the files are placed in the `~/contiki/core/net/rime` and `~/contiki/core/net` folders, the protocol can be tested using the Cooja simulator.

An example test workflow involves compiling the `example-mesh` application for the Tmote Sky platform:

```bash
cd ~/contiki/examples/rime
make TARGET=sky example-mesh
```

In the Cooja simulator, users can trigger a "Hello" message from one node to another (e.g., node 1.1) via a button click. This triggers the LOADng route discovery process, allowing the message to traverse multiple hops to reach its destination. The project also includes a dedicated test suite in the `test_route` directory to verify routing table operations independently.
