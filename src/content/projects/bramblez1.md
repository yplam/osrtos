---
title: BRambleZ1
summary: BRambleZ1 is a web-based visualization and management tool for 6LoWPAN multi-hop
  networks using Zolertia Z1 motes. It allows users to monitor network topology and
  interact with CoAP resources on Contiki-OS based devices through a Flask-driven
  dashboard.
codeUrl: https://github.com/shantanoo-desai/BRambleZ1
isShow: false
rtos: contiki-os
libraries: []
topics:
- border-router
- coap
- contiki-os
- erbium
- smcp
- visualisation
- zolertia-z1
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- rpl-network-visualizer
- erbium-border-router
- 6lbr-on-telecontrolli-devices-x-ip4t-x-ip5
- bluetooth-mesh-sensor-network
- esp32-mesh-control
- smartorchard
---

## Visualizing Multi-hop Networks with BRambleZ1

In the world of the Internet of Things (IoT), understanding the topology of a multi-hop mesh network can be a significant challenge. BRambleZ1 is a visualization tool specifically designed for Zolertia Z1 motes, based on the original BRamble project by Mariano Alvira. It provides a graphical interface to see how your motes are connected and allows for direct interaction with CoAP (Constrained Application Protocol) resources across the network.

BRambleZ1 acts as a bridge between the low-power wireless mesh and a standard web browser, making it easier for developers to debug routing issues and monitor sensor data in real-time.

### Technical Architecture

The project is built on a modern web stack that interfaces with specialized embedded components:

*   **Web Frontend/Backend:** A Python-based Flask application that handles the visualization logic and user authentication.
*   **CoAP Communication:** It utilizes [SMCP](https://github.com/darconeous/smcp) as the backend CoAP stack to communicate with the motes.
*   **Embedded OS:** The motes themselves run **Contiki-OS**, utilizing the Erbium CoAP engine.
*   **Hardware:** Specifically optimized for the Zolertia Z1 platform.

### Key Components of the Ecosystem

To get a full visualization environment running, BRambleZ1 works in tandem with two other firmware projects:

1.  **Erbium-br (Border Router):** A modified border router that excludes the standard HTTP server to save space, instead implementing `rplinfo` via CoAP to provide routing information to the dashboard.
2.  **CoAPZ1 (Mote Firmware):** The firmware for the nodes in the network. These nodes must include `rplinfo.c` and `rplinfo.h` to ensure the visualization tool can correctly map the network hierarchy.

### Getting Started

Setting up BRambleZ1 requires a Linux environment (Ubuntu/Debian is recommended). First, you need to install the system dependencies and Flask-related Python packages:

```bash
# System dependencies
apt-get install cython libjs-jquery python-flask python-pip python-dev ipv6calc

# Flask and Networking dependencies
pip install Flask-OpenID Flask-Login Flask-Principal Flask-Bcrypt Flask-Mako IPy gevent-socketio
```

Once the dependencies are met and the Border Router is connected to your machine, you can launch the visualization server:

```bash
cd BrambleZ1/web
chmod a+x runserver.py
./runserver.py
```

### Network Configuration and Usage

After launching the server, users can access the dashboard via `localhost:5000`. The default login credentials allow access to the `mesh.html` page, where the network visualization occurs. 

One critical step for users is configuring the Border Router IP address. This is handled in the `radio.py` file within the `bradmin` folder. Users must update the `addrstr` variable with their specific global IPv6 and link-local addresses to ensure the web application can communicate with the hardware gateway.

### Why BRambleZ1 Matters

For developers working with Contiki-OS and RPL (Routing Protocol for Low-Power and Lossy Networks), having a visual representation of the DODAG (Destination-Oriented Directed Acyclic Graph) is invaluable. BRambleZ1 simplifies this by turning complex routing tables into an intuitive mesh diagram, significantly lowering the barrier to entry for debugging 6LoWPAN deployments on Zolertia hardware.
