---
title: Erbium Border-Router
summary: A Contiki OS-based border router that utilizes the Erbium CoAP engine to
  provide RPL network information in JSON format. It is designed for Zolertia Z1 motes
  and allows users to query routing and parent information via CoAP instead of traditional
  HTTP.
codeUrl: https://github.com/shantanoo-desai/erbium-br
isShow: false
rtos: contiki-os
libraries: []
topics:
- border-router
- coap
- contiki-os
- rpl
- smcp
star: 1
lastUpdated: '2015-12-21'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- bramblez1
- 6lbr-on-telecontrolli-devices-x-ip4t-x-ip5
- loadng-implementation-on-contiki-os
- rpl-network-visualizer
- computer-network-with-contiki-ng
- mrhof-simplified-modified-rpl-objective-function-for-contiki
---

The Erbium Border-Router (ERBR) is a specialized implementation of a 6LoWPAN border router for the Contiki OS ecosystem. While standard Contiki border routers typically provide a simple HTTP web server to display routing tables and neighbor information, this project takes a more modern, machine-to-machine (M2M) approach by replacing the web interface with a RESTful CoAP engine.

### The Shift to CoAP and JSON

The primary motivation behind this project is to move away from human-readable HTML tables toward machine-parsable JSON data. By leveraging the **Erbium (Er) CoAP implementation** and the **REST Engine** provided by Contiki, the router exposes RPL (Routing Protocol for Low-Power and Lossy Networks) information as CoAP resources. This allows other nodes or management software to query the network topology using standard CoAP clients like `smcp` or `Copper`.

Instead of accessing a URL like `http://[IPv6-Address]`, users can interact with the router via:
```bash
smcpctl coap://[IPv6-of-Border-Router]:5683/
```

### Key Features and Capabilities

- **JSON Formatted RPL Info**: Provides structured data regarding network parents and routes.
- **Resource-Based Architecture**: Uses the `rplinfo` resource path to organize data.
- **Hardware Compatibility**: Specifically tested and optimized for the Zolertia Z1 platform.
- **Simulation Support**: Fully compatible with the Cooja simulator for virtual network testing.
- **Tunslip6 Integration**: Includes Makefile targets to bridge the border router to a host machine using `tunslip6`.

### Technical Implementation

The project is structured as a Contiki application. The core logic resides in `erbr.c`, which initializes the network stack and the REST engine. The `rplinfo` directory contains the specific CoAP resource handlers that traverse the RPL data structures to generate JSON responses.

To access routing information, a user can perform a GET request on the `routes` resource. If the router reports multiple routes, specific indices can be queried:

```bash
# Get parent information
get rplinfo/parents

# Get the number of routes
get rplinfo/routes

# Get specific route details
get rplinfo/routes?index=0
```

### Hardware Considerations and Optimization

Deploying this on memory-constrained hardware like the Zolertia Z1 requires specific configurations. The project documentation notes that the standard `UIP_CONF_BUFFER_SIZE` may need to be adjusted to `240` bytes in the platform's `contiki-conf.h` to prevent buffer overflows when handling REST chunks.

Additionally, for developers testing multi-hop scenarios in close physical proximity, the project provides guidance on controlling Transmission (TX) Power using the `cc2420` driver. By including `cc2420.h` and using `cc2420_set_txpower()`, users can artificially limit range to force the formation of complex multi-hop topologies.

### Getting Started

To deploy the Erbium Border-Router, the folder should be placed within the `examples/` directory of a Contiki installation. Compilation and uploading are handled via the standard Contiki build system:

```bash
make TARGET=z1 erbr.upload
make connect-router
```

For those working in a simulation environment, the `connect-router-cooja` target allows for seamless integration with Cooja's serial socket server, enabling the host machine to communicate with the simulated 6LoWPAN network.
