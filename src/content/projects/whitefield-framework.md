---
title: Whitefield Framework
summary: A simulation framework for sensor networks that combines realistic PHY/MAC
  layer simulation with native-mode IoT stacks like Contiki, RIOT, and OpenThread.
  It allows developers to test real-world embedded firmware within high-fidelity RF
  simulation environments like NS-3.
slug: whitefield-framework
codeUrl: https://github.com/whitefield-framework/whitefield
siteUrl: https://whitefield.readthedocs.io/en/latest/
star: 85
lastUpdated: '2021-10-04'
rtos: ''
libraries:
- open-thread
topics:
- 6lowpan
- contiki
- contiki-os
- iot
- iot-framework
- ipv6
- ns3
- openthread
- os
- riot
- riot-os
- roll
- rpl
- simulation-environment
- stack
- wireless-sensor-network
- wsn
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- openthread-rtos
- cooja-using-contiki
- ameba-rtos-sdk
- building-wireless-sensor-networks-with-openthread
- home-automation-simulation-using-contiki-os
- elise-sdn-based-solution-for-iot-networks
---

Whitefield is a powerful simulation framework designed to bridge the gap between high-fidelity network simulation and real-world embedded software development. In the world of IoT and Wireless Sensor Networks (WSN), developers often face a difficult choice: use a simulator like NS-3 for realistic radio models but sacrifice the ability to run their actual firmware, or use an emulator like Cooja which is often tied to a specific OS and may lack the physical layer depth of dedicated simulators. Whitefield provides the "best of both worlds" by loosely coupling popular IoT operating systems with professional-grade PHY/MAC simulators.

## The Architecture of Whitefield

The framework is built on a modular architecture consisting of three primary components: Airline, Commline, and Stackline.

### Airline: The Physical Foundation
Airline refers to the PHY/MAC/RDC implementation provided by third-party simulators. By default, it leverages NS-3 (specifically the lr-wpan module) or PLC (Power Line Communication) simulators to provide realistic signal propagation, interference, and MAC layer behavior. This ensures that the network environment behaves like the real world, accounting for collisions, fading, and complex topologies.

### Commline: The Communication Glue
Commline is the messaging backbone of the framework. It uses a message queue system and corresponding interfaces to decouple the simulation engine (Airline) from the protocol stacks (Stackline). This decoupling is crucial because it allows the simulation to run at its own pace while the embedded stacks process packets as if they were receiving them from a real radio driver.

### Stackline: Real-world Protocol Stacks
Stackline is where the actual IoT operating systems reside. Whitefield supports a wide array of popular RTOSs and stacks, including RIOT, Contiki, OpenThread, Zephyr, and FreeRTOS. Instead of rewriting protocol logic for a simulator, developers use the native-mode port of these OSes. The stack interacts with a virtual radio driver provided by Whitefield, which transparently routes data through Commline to the Airline simulator.

## Key Use Cases

Whitefield is particularly effective for several scenarios:
- **Large-Scale Testing**: It can simulate thousands of nodes running real-world embedded stacks, allowing developers to observe how protocols like RPL or 6LoWPAN behave under heavy load.
- **Interoperability**: Because Whitefield is OS-agnostic, it can host different stacks in the same simulation. You can test how an OpenThread node interacts with a RIOT node in a shared 802.15.4 environment.
- **Reproducibility**: Scientific experiments in the IoT space are notoriously difficult to reproduce. Whitefield provides a standardized environment where configurations and code can be shared and executed consistently.

## Getting Started

Setting up Whitefield is streamlined through provided scripts and virtualization tools. Developers can use the native installation script or a Vagrant-based environment to ensure a consistent build process across different host systems.

```bash
git clone https://github.com/whitefield-framework/whitefield
cd whitefield
./scripts/setup.sh
make
```

Once built, the framework provides a suite of OAM (Operations, Administration, and Maintenance) tools. The `invoke_whitefield.sh` script starts the simulation based on a configuration file, while the `wfshell` and `monitor.sh` tools allow for real-time interaction and status checking. For visualization, the project includes a Python-based canvas tool that renders the live network topology in a web browser, simplifying the troubleshooting of complex mesh networks.

By providing a unified interface for multiple IoT operating systems and high-fidelity simulators, Whitefield empowers developers to validate their firmware in complex, realistic scenarios before deploying to physical hardware. It is an essential tool for anyone working on 6LoWPAN, RPL, or other constrained network protocols.
