---
title: 'MRHOF-simplified: Modified RPL Objective Function for Contiki'
summary: A simplified implementation and modification of the Minimum Rank with Hysteresis
  Objective Function (MRHOF) for the RPL routing protocol in Contiki-OS. It provides
  tools for observing parent selection processes and measuring performance metrics
  like parent change count and packet delivery ratio using COOJA simulation logs.
slug: mrhof-simplified-modified-rpl-objective-function-for-contiki
codeUrl: https://github.com/jonty1604/MRHOF-simplified
star: 2
lastUpdated: '2019-07-12'
rtos: contiki-os
topics:
- contiki-os
- rpl
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- loadng-implementation-on-contiki-os
- contiki-lora-tsch-project
- msf-protocol-simulation-for-contiki-ng
- rl-tsch-implementation-for-contiki-ng
- compass-multihop-framework-for-tinyos
- computer-network-with-contiki-ng
---

## Overview

MRHOF-simplified is a project focused on the modification and analysis of the Routing Protocol for Low-Power and Lossy Networks (RPL), specifically targeting the Minimum Rank with Hysteresis Objective Function (MRHOF). Built on the Contiki operating system, this repository provides a modified version of the RPL stack designed to make the parent selection process more transparent and easier to observe during simulations.

The project is particularly useful for researchers and developers working with the Internet of Things (IoT) and Wireless Sensor Networks (WSN) who need to compare different objective functions or evaluate the stability of network topologies in constrained environments.

## Key Features

- **Modified RPL Implementation**: Includes hard-coded modifications to the standard RPL objective function to clarify how nodes select their preferred parents.
- **Performance Measurement Tools**: Provides scripts and logic to track the 'parent change count,' a critical parameter for evaluating the stability of a routing topology.
- **Simulation Analysis**: Includes tools like `ana.pl` that parse `COOJA.testlog` files to determine the Packet Delivery Ratio (PDR) based on control message overhead.
- **Simplified Output**: The modified code generates clearer logs during execution, helping developers understand the internal decision-making process of the RPL Directed Acyclic Graph (DAG).

## Technical Details

The project modifies several core components of the Contiki RPL implementation:

- `rpl-mrhof.c`: Contains the logic for the Minimum Rank with Hysteresis Objective Function, which uses metrics like ETX (Expected Transmission Count) to determine the best path to the root.
- `rpl-dag.c`: Manages the Directed Acyclic Graph structure, including rank calculation and preferred parent selection.
- `rpl-icmp6.c`: Handles the ICMPv6 control messages (DIO, DIS, DAO) essential for RPL network formation.

By instrumenting these files, the project allows for a deeper look into how link metrics and rank updates influence the overall network structure. The inclusion of a sample `COOJA.testlog` provides a baseline for users to understand the expected output format and analysis workflow.

## Performance Comparison

One of the primary goals of MRHOF-simplified is to provide a framework for comparison. By focusing on the parent change count, users can quantify the 'churn' in a network. High churn often leads to increased control plane overhead and decreased energy efficiency. By using the provided Perl script (`ana.pl`), users can correlate these topology changes with the Packet Delivery Ratio to find the optimal balance between path quality and routing stability.

## Getting Started

To use this project, you typically integrate the modified files into a Contiki-OS environment (specifically the `core/net/rpl` directory). Simulations are generally performed using the COOJA simulator, which is the standard tool for Contiki development. After running a simulation, the resulting test log can be processed by the analysis scripts to extract performance metrics.
