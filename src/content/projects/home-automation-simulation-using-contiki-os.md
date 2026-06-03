---
title: Home Automation Simulation using Contiki OS
summary: A simulation of a smart home automation network using Contiki OS and the
  Cooja simulator. It implements various IoT sensors using 6LoWPAN and CoAP protocols
  on Sky motes, connected to the internet via an RPL Border Router.
slug: home-automation-simulation-using-contiki-os
codeUrl: https://github.com/kanika2296/home-automation-contiki
star: 6
lastUpdated: '2020-05-29'
rtos: contiki-os
topics:
- 6lowpan
- 6lowpan-border-router
- coap
- coap-server
- contiki
- contiki-os
- home-automation
- instant-contiki
- iot
- iot-forensics
- iot-protocols
- sensors
- simulation-iot
- smart-home
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- homeiot-smart-home-automation-system
- rpl-network-authentication-simulation
- cooja-using-contiki
- smart-heating-iot-system
- 6lbr-on-telecontrolli-devices-x-ip4t-x-ip5
- smart-orchard
---

## Overview

This project provides a comprehensive simulation of a smart home automation system using Contiki OS, specifically targeting the InstantContiki 2.7 environment. The network is built and tested within Cooja, Contiki’s integrated IoT simulator, which allows for the emulation of wireless sensor networks without requiring physical hardware. 

The system leverages modern IoT protocols to ensure connectivity and interoperability. It uses 6LoWPAN for communication over IPv6 and the CoAP (Constrained Application Protocol) at the application layer. This setup allows sensors to share data with CoAP clients efficiently, mimicking real-world low-power wireless sensor network (WSN) deployments.

## Technical Architecture

The simulation utilizes Sky motes, which emulate the Tmote Sky hardware—an ultra-low power wireless module common in sensor networks and rapid prototyping. The network is bridged to the outside world using Contiki’s RPL (Routing Protocol for Low-Power and Lossy Networks) Border Router. 

The Border Router serves as the gateway, hosting a simple web page that displays the IPv6 addresses of all connected nodes. To facilitate communication between the simulated Cooja network and a local computer, the project uses the Tunslip utility, which creates a bridge between the simulated serial socket and the host's network stack.

## Sensor Implementation

The home automation network consists of six distinct sensors built upon the Erbium (Er) REST engine, specifically the `er-rest-example-server.c` framework. These sensors utilize resource handlers to respond to client requests and periodic handlers to push data at regular intervals.

### Environmental Sensors
- **Solar Sensor**: An extension of the light sensor functionality, this periodic sensor sends light intensity data to the CoAP client every 60 seconds.
- **Temperature Sensor**: Based on the SHT11 sensor model, this provides periodic temperature readings to the network.

### Actuators and State Sensors
- **Fan Sensor**: This sensor includes a toggle capability. It is an observable resource that monitors button clicks to represent the on/off state of a fan.
- **Door and Garage Sensors**: These function similarly to the fan sensor, tracking the state (open/closed) of entry points. They transition from state 0 (closed) to state 1 (open) upon interaction.
- **Camera Sensor**: An observable resource that is active by default. Users can toggle its state via a button. Interestingly, this module also serves as a testbed for security scenarios, where a user can simulate an attacker modifying recorded values using CoAP POST requests.

## Getting Started

To run the simulation, users must launch Cooja and compile the `border-router.c` located within the IPv6 RPL directory. Once the border router is active, a Serial Socket (SERVER) must be established to connect the simulated motes to the host system. The Tunslip utility is then used to bridge the traffic:

```c
cd contiki/examples/ipv6/rpl-border-router
make connect-router-cooja
```

Individual sensors like `light_solar.c` are compiled for the Sky mote platform and added to the simulation environment. Once connected, they receive an IPv6 address from the border router and begin transmitting data to any listening CoAP client.
