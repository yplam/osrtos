---
title: Cooja-SensEH
summary: SensEH is an energy harvesting plugin for the Cooja simulator within the
  Contiki OS ecosystem. It enables the simulation of nodes that harvest energy from
  environmental sources, providing detailed energy profiles and transmission power
  records to analyze network efficiency.
codeUrl: https://github.com/iPAS/Cooja-SensEH
isShow: false
rtos: contiki-os
libraries: []
topics:
- contiki-os
- wireless-sensor-networks
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- eh-contiki-energy-harvesting-framework-for-contiki
- waco-a-wake-up-radio-cooja-extension
- cooja-using-contiki
- low-power-wireless-networking-for-iot-lpiot
- home-automation-simulation-using-contiki-os
- smart-orchard
---

In the world of Wireless Sensor Networks (WSNs), energy is the most precious resource. While traditional simulations often focus on battery depletion, the rise of Energy Harvesting (EH) technologies has created a need for more sophisticated modeling tools. Enter **SensEH**, a specialized plugin for the Cooja simulator (the standard simulation environment for Contiki OS) designed to model nodes that can replenish their energy while operating.

Originally developed by Usman Raza and further enhanced by iPAS, SensEH provides a framework for researchers to evaluate how networks behave when powered by ambient energy sources like solar, thermal, or vibration. Instead of simply assuming a static power supply, SensEH allows for dynamic energy profiles that reflect real-world environmental conditions.

### Simulating Realistic Energy Harvesting

At its core, SensEH integrates with the Cooja simulation environment to track the energy state of every node. It uses a modular architecture consisting of several key components:

*   **Energy Sources:** Models the external environment (e.g., light intensity or thermal gradients). The repository includes data for specific hardware like the Panasonic AM1816 solar cell.
*   **Harvesters:** Models the efficiency of the hardware that converts environmental energy into electrical power.
*   **Energy Storage:** Simulates batteries or supercapacitors, including non-linear characteristics via Lookup Tables (LUTs). The project includes pre-configured LUTs for Ni-Mh batteries.
*   **Power Consumption:** Tracks the energy used by the node's radio and MCU during different states (TX, RX, Idle, Sleep).

### Advanced Transmission Power Tracking

One of the significant contributions in this fork of SensEH is the addition of multiple transmission level recording. In many EH-WSN protocols, nodes adjust their transmission power dynamically based on their current energy reserves. This plugin records these adjustments, allowing researchers to assess how small, continual amounts of harvested energy impact the network's communication reliability and longevity.

### Technical Implementation

The plugin is implemented in Java, aligning with the Cooja simulator's architecture. It utilizes a sophisticated lookup table system (`LookupTable.java` and `LookupTable3D.java`) to handle complex, non-linear data often found in battery discharge curves and solar cell efficiency maps. 

Configuration is handled through `.config` and `.lut` files, making it relatively easy to swap out hardware profiles. For example, the `config/EnergySources` directory contains trace files and lookup tables that define the environmental input, such as light traces from specific locations or test scenarios.

### Why SensEH Matters

For researchers working on Contiki-based systems, SensEH bridges the gap between theoretical energy harvesting models and practical network simulation. By providing detailed energy reports after a simulation run, it allows for the fine-tuning of MAC protocols and routing algorithms to ensure they are truly "energy-neutral." Whether you are testing a new solar-powered environmental monitor or a vibration-harvesting industrial sensor, SensEH provides the visibility needed to ensure your system can survive indefinitely on ambient power.
