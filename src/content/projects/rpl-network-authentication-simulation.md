---
title: RPL Network Authentication Simulation
summary: A Contiki-OS simulation project that implements a secure 6LoWPAN RPL network
  for hospital environments. It features a custom authentication scheme to prevent
  MITM attacks and uses the Erbium CoAP engine for data retrieval.
codeUrl: https://github.com/pavanchhatpar/cooja-simulation
isShow: false
rtos: contiki-os
libraries: []
topics:
- 6lowpan
- authentication
- contiki-os
- cooja
- iot
- rpl
- simulation
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- coap-eap-with-eap-noob-in-contiki
- home-automation-simulation-using-contiki-os
- cybersecurity-tinyos-encryption
- computer-network-with-contiki-ng
- msf-protocol-simulation-for-contiki-ng
- crypto-implementations-example-for-contiki-os
---

The **RPL Network Authentication Simulation** is a specialized project designed to model a secure Internet of Things (IoT) infrastructure within a healthcare context. Built on top of the **Contiki-OS** and simulated using the **Cooja** environment, this project addresses the critical need for security in 6LoWPAN networks, specifically focusing on protecting hospital data from common wireless threats.

### Project Overview
In a modern hospital setting, numerous sensors (ECG, glucose monitors, temperature sensors) collect sensitive patient data. This project simulates such an environment across multiple rooms, utilizing the **RPL (Routing Protocol for Low-Power and Lossy Networks)** to manage communication. The core innovation lies in the implementation of an authentication scheme designed to make brute-force and Man-in-the-Middle (MITM) attacks significantly more difficult, ensuring that only authorized entities can access or inject data into the network.

### Technical Architecture
The simulation is structured around several key components:
- **RPL Border Router**: Mote 1 acts as the gateway between the 6LoWPAN mesh and the outside world (the Internet).
- **RFID Servers**: Specific motes (2, 9, 16, 23, etc.) serve as RFID authentication nodes. These are strategically placed to ensure that sensors can identify and authenticate with their respective local controllers.
- **Sensor Motes**: Various motes act as medical sensors (ECG, Blood Pressure, Glucose, Oxygen, Respiration, and Temperature), running the Erbium (Er) CoAP REST Engine.
- **CoAP REST Engine**: By using the Constrained Application Protocol (CoAP), the system allows external applications (like a web browser with a CoAP plugin) to request real-time sensor data from the motes.

### Security Features
The project emphasizes a robust authentication layer. In many standard RPL deployments, security is either absent or relies on static keys that are vulnerable to interception. This simulation introduces a challenge-response mechanism (found in `challenge_response.h`) that validates the identity of nodes before they are fully integrated into the data exchange process. This prevents unauthorized motes from joining the DAG (Directed Acyclic Graph) or spoofing medical data.

### Getting Started with the Simulation
To run the simulation, you need a working Contiki-OS environment (specifically version 3.0). The project includes a pre-configured Cooja simulation file: `multi-room-contiki3.csc`.

1.  **Launch Cooja**: Open the `.csc` file within the Cooja simulator.
2.  **Setup the Bridge**: To allow the simulation to communicate with your host machine, you must use `tunslip6`. In your terminal, navigate to the Contiki tools directory and run:
    ```bash
    make tunslip6
    sudo ./tunslip6 -a 127.0.0.1 aaaa::1/64
    ```
3.  **Start Simulation**: Once the serial socket server is active, start the simulation. It may take some time for the RPL network to converge and for the border router to populate the routing table.
4.  **Access Data**: You can use a CoAP client (such as the Copper plugin for Firefox) to send GET requests to the IPv6 addresses of the sensor motes to retrieve medical telemetry.

### Hardware and Targets
While this is a simulation-heavy project, the source code is targeted at the **Tmote Sky (sky)** platform, one of the most popular hardware targets for Contiki-OS development. The repository includes specific Makefiles and project configurations (`project-conf.h`) optimized for the resource-constrained MSP430 microcontroller found on Sky motes.
