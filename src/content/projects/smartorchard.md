---
title: SmartOrchard
summary: SmartOrchard is an IoT-based orchard management system utilizing Contiki-NG
  for low-power mote devices and a Java-based cloud application. It features a network
  of CoAP-enabled sensors and actuators for monitoring environmental conditions like
  soil humidity and air temperature, and controlling greenhouse systems.
slug: smartorchard
codeUrl: https://github.com/ariannagavioli/SmartOrchard
star: 1
lastUpdated: '2020-06-12'
rtos: contiki-ng
topics:
- contiki
- contiki-ng
- contiki-os
- iot
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- smart-orchard
- smart-heating-iot-system
- smart-dc-maintenance
- homeiot-smart-home-automation-system
- low-power-wireless-networking-for-iot-lpiot
- coral-reef-monitoring-system
---

SmartOrchard is an integrated IoT project designed to modernize orchard management through automated monitoring and control. The system is divided into two primary components: a Low Power and Lossy Network (LLN) consisting of various "mote" devices and a centralized cloud application for data visualization and device interaction.

### The Mote Network

The core of the SmartOrchard system lies in its distributed sensor and actuator network. These devices are built on the **Contiki-NG** operating system, a popular choice for low-power IoT devices due to its robust support for IPv6 and standard-based networking. The motes are designed to operate within a Low Power and Lossy Network (LLN), which is typical for agricultural environments where power efficiency and range are critical.

The network includes three specialized sensor motes:
- **Air Monitor**: Tracks ambient humidity and temperature.
- **Soil Monitor**: Provides critical data on soil humidity, temperature, pH levels, and salinity.
- **Luminosity Monitor**: Measures light intensity to optimize plant growth.

Complementing these sensors are three actuator motes that allow for remote or automated intervention:
- **Greenhouse Heating**: Manages the climate within protected growing areas.
- **Greenhouse Roller Shutter**: Controls light exposure and insulation.
- **Irrigator**: Automates the watering process based on soil data.

Each mote operates as a **CoAP (Constrained Application Protocol) server**. Upon startup, motes register themselves with the cloud application, enabling seamless discovery and communication within the orchard environment.

### Cloud Management and Interaction

The cloud application serves as the user's primary interface with the SmartOrchard system. Developed in Java using the **Californium** library, it provides a graphical user interface (GUI) that allows users to monitor real-time sensor data and manually override actuators. By leveraging CoAP, the application can efficiently communicate with the resource-constrained motes over the network, providing a bridge between the physical orchard and the digital management platform.

### Simulation and Development

To validate the system's performance and logic, the project utilizes the **Cooja simulator**, the standard simulation tool for Contiki-NG. This allows for the testing of network topologies and device interactions in a virtual environment before physical deployment. The simulation environment helps in debugging the registration process and ensuring that the CoAP servers respond correctly to requests from the cloud application. Detailed technical specifications, including the network architecture and simulation results, are documented in the project's comprehensive report.
