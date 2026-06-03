---
title: RPL Network Visualizer
summary: A Python-based visualization tool for RPL networks running on Contiki-NG.
  It extracts routing and neighbor table data from a border router's HTTP server to
  generate interactive network topologies and SVG graphs.
slug: rpl-network-visualizer
codeUrl: https://github.com/mahboobkarimian/network-visualizer
star: 3
lastUpdated: '2020-12-28'
rtos: contiki-ng
topics:
- contiki-ng
- iot
- mesh-networks
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- bramblez1
- freertos-visualizer
- erbium-border-router
- contikipy
- computer-network-with-contiki-ng
- loadng-implementation-on-contiki-os
---

## Overview

The RPL Network Visualizer is a specialized tool designed to map and draw the topology of a Routing Protocol for Low-Power and Lossy Networks (RPL) mesh. Primarily targeting developers working with the Contiki-NG operating system, it provides a bridge between the raw routing data stored on embedded nodes and a human-readable graphical representation.

In a typical RPL deployment, understanding the parent-child relationships and neighbor links can be challenging. This tool simplifies the process by programmatically fetching data from a border router and rendering it into an interactive or static format, allowing for real-time monitoring of network health and structure.

## Integration with Contiki-NG

The visualizer works out of the box with Contiki-NG by leveraging the built-in HTTP webserver module. When a mote is configured as a RPL border router and connected via a tunslip interface, it can serve its routing and neighbor tables as HTML. The visualizer parses this data using BeautifulSoup to reconstruct the network graph.

To enable this functionality on the embedded side, the Contiki-NG project must include the webserver module in its Makefile:

```c
MODULES_REL += webserver
```

## Key Features and Capabilities

The tool offers multiple ways to view and interact with the network data:

- **Interactive Web View**: By using a local Flask-based webserver, the tool generates a dynamic view using d3-force. This allows users to zoom, drag nodes, and observe the network layout in a fluid, interactive environment.
- **SVG Export**: For documentation and static reporting, the tool can generate `Netgraph.svg`, a scalable vector graphics file representing the current state of the mesh.
- **Automated Updates**: The script is designed to poll the border router every 5 seconds, ensuring that the visualization stays synchronized with the actual network topology as nodes join, leave, or change parents.
- **Jupyter Notebook Support**: For researchers and data scientists, a notebook version (`rpl_visualizer.ipynb`) is provided, allowing for inline visualization and further analysis of network metrics.

## Technical Implementation

The project is built on a robust Python stack tailored for graph theory and data processing:

- **NetworkX**: Used for the underlying graph data structure and managing directed edges between nodes.
- **Flask**: Provides the backend for the interactive web interface.
- **BeautifulSoup4**: Handles the parsing of the HTML tables served by the Contiki-NG border router.
- **Matplotlib**: Used for generating the static SVG output.

## Getting Started

To use the visualizer, you must know the Global IPv6 address of your Border Router. The script can be executed from the terminal with various flags to customize the output:

```console
python3 rpl_visualizer.py -i [BR_GLOBAL_IP] -w -p 8002
```

The `-i` flag specifies the IPv6 address, `-w` enables the interactive web view, and `-p` sets the local port. Once running, the tool automatically handles the conversion of link-local addresses (fe80::) to global addresses (fd00::) to ensure consistency across the visualization.
