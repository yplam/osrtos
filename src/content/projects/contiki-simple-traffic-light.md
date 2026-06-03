---
title: Contiki Simple Traffic Light
summary: A simple traffic light implementation for Contiki-OS that utilizes LED blinking
  and Rime broadcast communication. It is designed to run on TelosB (Sky mote) hardware
  and includes a Cooja simulation configuration for testing.
codeUrl: https://github.com/tuanlh/contikisimpletrafficlight
isShow: false
rtos: contiki-os
libraries: []
topics:
- contiki
- contiki-os
- cooja
- mote
- telosb
- traffic-light
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- tinyos-cooja-simulator-application
- rtic-blinky-for-nrf52840
- tiva-tm4c1294-launchpad-freertos-demo
- lpc43xx-freertos-led-blinking-example
- home-automation-simulation-using-contiki-os
- cooja-using-contiki
---

Building a traffic light system is a classic exercise in embedded systems, but implementing it across multiple wireless nodes adds an interesting layer of complexity. The **Contiki Simple Traffic Light** project by Le Hoang Tuan provides a straightforward example of how to synchronize state between devices using Contiki-OS and the Rime communication stack.

### Project Overview
This project demonstrates a master-slave relationship between two wireless sensor nodes. Using the TelosB (Sky mote) platform, the system coordinates LED states to simulate a traffic light sequence. The communication is handled via Rime broadcast, a lightweight networking stack designed for low-power wireless networks in Contiki. 

### Technical Architecture
The system is split into two primary components:
1.  **Master (`master.c`)**: This node controls the timing and logic of the traffic light sequence. It broadcasts state changes to the network.
2.  **Slave (`slave.c`)**: This node listens for broadcasts from the master and updates its local LED states accordingly, ensuring synchronization across the intersection.

The project is specifically tailored for the TelosB platform, which is a popular choice for research and development in wireless sensor networks due to its integrated sensors and IEEE 802.15.4 radio.

### Simulation and Deployment
One of the strengths of this project is its inclusion of a Cooja simulation file (`simpletrafficlight.csc`). Cooja is the standard simulator for Contiki-OS, allowing developers to test their code in a virtual environment before deploying to physical hardware. This is particularly useful for debugging the Rime broadcast logic without needing multiple physical TelosB motes on hand.

For those with physical hardware, the deployment process is handled via the standard Contiki build system. The project requires Contiki-OS 2.6 and uses the following workflow for uploading code to the devices:

```bash
# Step 1: Prepare the device permissions
sudo chmod 666 /dev/ttyUSB0

# Step 2: Upload the Master code to the first TelosB
make TARGET=sky master.upload

# Step 3: Upload the Slave code to the second TelosB
make TARGET=sky slave.upload
```

### Key Features
- **Rime Stack Integration**: Uses the Rime broadcast primitive for simple, low-overhead wireless communication.
- **TelosB Support**: Native support for the Sky mote platform and its onboard LEDs.
- **Cooja Ready**: Includes a pre-configured simulation environment for immediate testing.
- **Educational Value**: Serves as an excellent starting point for developers learning about distributed state machines in an RTOS environment.

This project is a great example of how Contiki-OS simplifies the development of networked embedded applications, turning a simple LED blinker into a coordinated wireless system.
