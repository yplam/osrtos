---
title: 'EH-Contiki: Energy Harvesting Framework for Contiki'
summary: A specialized framework for Contiki OS designed to simulate and manage energy
  harvesting in wireless sensor nodes. It includes components for battery simulation,
  energy prediction using EWMA filters, and optimal task scheduling based on harvested
  energy availability.
codeUrl: https://github.com/victorcionca/eh_contiki
isShow: false
rtos: contiki-os
libraries: []
topics:
- contiki
- contiki-os
- cooja
- energy
- harvesting
star: 6
lastUpdated: '2021-01-04'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- cooja-senseh
- ql-tsch-implementation-for-contiki-ng
- low-power-wireless-networking-for-iot-lpiot
- waco-a-wake-up-radio-cooja-extension
- elise-sdn-based-solution-for-iot-networks
- rl-tsch-implementation-for-contiki-ng
---

Energy harvesting (EH) is a transformative technology for wireless sensor networks (WSNs), offering the potential for nodes to operate indefinitely without manual battery replacements. However, the intermittent nature of sources like solar or wind power introduces significant complexity in power management. **EH-Contiki** is a dedicated framework built on top of the Contiki operating system designed to help researchers and developers experiment with energy-aware algorithms and simulations.

### A Modular Approach to Energy Management

The framework is structured as a collection of modular Contiki applications that handle different aspects of the energy lifecycle:

*   **energy_harvester**: This module simulates the physical energy source (e.g., a solar panel). It receives harvested energy values over a serial line and generates system events whenever energy is successfully harvested.
*   **battery_sim**: Acting as the energy storage manager, this app tracks current, maximum, and minimum capacity. It leverages Contiki's **Energest** module to deduct energy based on actual hardware activity and adds energy based on events from the harvester.
*   **eh_predictor**: To make informed decisions, nodes need to look ahead. This module implements an Exponentially Weighted Moving Average (EWMA) filter to predict energy availability over a specific horizon.
*   **eh_optimal_scheduler**: This is a core component that implements the **MAllEC** (Maximum Allowed Energy Consumption) scheduler, an algorithm designed to balance task execution with energy availability.

### Simulation and Tooling

One of the most powerful aspects of EH-Contiki is its integration with the **Cooja** simulator. The project includes a suite of Python tools under `sim_eh_source` that allow users to feed real-world energy traces (such as solar irradiance data) into simulated devices. 

The tools can parse Cooja's CSC files to identify network configurations and modulate energy traces for individual devices using "shaders." This allows for complex scenarios where different nodes in a network might experience different environmental conditions, such as varying levels of shade or cloud cover.

### Getting Started with EH-Contiki

To use the framework, developers typically include the desired apps in their Contiki Makefile. For example, the `periodic_sender` application demonstrates how to adjust the inter-packet interval to match the energy budget computed by the MAllEC algorithm. 

```c
// Example of how apps are structured in the framework
#include "apps/energy_harvester/eh_sim.h"
#include "apps/battery_sim/battery_sim.h"
#include "apps/eh_predictor/eh_predictor.h"
#include "apps/eh_optimal_scheduler/eh_opt_sched.h"
```

The repository provides example projects like `optimal_sched_test`, which runs a periodic sender with the MAllEC scheduler, and `serial_dummy_eh_pred`, which is optimized for measuring processing time overhead. These examples serve as a baseline for implementing more complex energy-harvesting logic in WSN applications.
