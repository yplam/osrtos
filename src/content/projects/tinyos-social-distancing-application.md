---
title: TinyOS Social Distancing Application
summary: A social distancing prototype application built on TinyOS that uses mote-to-mote
  broadcasting to detect proximity. It integrates with Node-Red and IFTTT to provide
  real-time mobile notifications when users are too close, tested within the Cooja
  simulation environment.
slug: tinyos-social-distancing-application
codeUrl: https://github.com/TheFalco/IoT_Project
star: 1
lastUpdated: '2020-09-03'
rtos: tinyos
topics:
- cooja
- ifttt
- mote
- motes
- motes-receive
- nesc
- node-red
- polimi
- project
- social-distancing-application
- tinyos
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- tinyos-cooja-simulator-application
- lightweight-publish-subscribe-application-protocol-for-tinyos
- internet-of-things-home-challenges
- mqtt-like-application-for-tinyos
- contiki-simple-traffic-light
- smart-orchard
---

The "Keep your distance!" project is a software prototype designed to facilitate social distancing through the use of wireless sensor networks. Developed using TinyOS, the application leverages the communication capabilities of embedded motes to monitor proximity between individuals in real-time. The system is validated through the Cooja simulator and integrates with modern IoT tools like Node-Red and IFTTT to bridge the gap between low-level sensor data and user-facing notifications.

### System Architecture

The core logic of the application resides on the motes, which operate within a TinyOS environment. Each mote acts as a beacon, broadcasting its unique identification number every 500 milliseconds. This periodic broadcast allows neighboring devices to detect the presence of others within their immediate radio range. 

When a mote receives a message from another device, it evaluates the proximity based on the reception of the signal. If the signal indicates that another person (represented by their mote) is within a restricted distance, the receiving mote performs two primary actions:
1. It stores the ID of the nearby mote to maintain a record of the encounter.
2. It triggers an alarm state, which is visible within the simulation environment.

### Data Flow and Notifications

The project utilizes a multi-tiered architecture to handle alerts. While the initial detection happens at the edge on the motes, the alarm information is forwarded through the Cooja simulator to an external socket. 

Node-Red serves as the orchestration layer, listening on specific sockets for each mote. Upon receiving an alert signal from the simulation environment, Node-Red processes the data and triggers a web request to IFTTT (If This Then That). This final step ensures that the end-user receives a push notification on their mobile phone, providing an immediate alert that social distancing boundaries have been breached.

### Technical Implementation Details

- **TinyOS**: Provides the event-driven operating system framework for the motes, handling the low-power wireless communication and timing required for periodic broadcasting.
- **Cooja Simulator**: Used to model the network of motes and simulate the physical proximity required to trigger alerts, allowing for testing without physical hardware.
- **Node-Red**: Acts as the IoT gateway, managing the data flow between the embedded simulation and cloud services through socket communication.
- **IFTTT**: Provides the delivery mechanism for mobile notifications, completing the loop from sensor detection to user awareness.

This prototype demonstrates a complete end-to-end IoT pipeline, from bare-metal embedded logic to cloud-integrated user notifications, specifically tailored for public health monitoring scenarios.
