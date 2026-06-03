---
title: Testbed TSCH Firmware
summary: A firmware suite for Time-Slotted Channel Hopping (TSCH) testbeds based on
  the Contiki-NG operating system. It provides client and server modules for OpenMote-B
  hardware to automate data collection and transmission analysis using UDP.
slug: testbed-tsch-firmware
codeUrl: https://github.com/Kyoto-01/testbed-tsch-firmware
star: 0
lastUpdated: '2023-06-01'
rtos: contiki-ng
topics:
- contiki-ng
- firmware
- ieee802154e
- testbed
- testbed-tsch
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- sx128x-lora-transceiver-driver-for-contiki-ng
- x-cube-subg2-firmware-package
- contiki-lora-tsch-project
- meshtnc
- sx127x-lora-transceiver-driver-for-contiki-ng
- esp32-mesh-control
---

The Testbed TSCH Firmware project provides a specialized suite of firmware modules designed for conducting experiments with Time-Slotted Channel Hopping (TSCH) networks. Developed for the Contiki-NG environment, these firmwares are optimized for the OpenMote-B platform, offering a structured way to collect transmission data, monitor network performance, and automate the deployment process across multiple nodes.

### Firmware Modules and Roles

The repository organizes firmware into three distinct roles to facilitate different testbed scenarios:

- **Client Firmware**: This module acts as the data source. It collects transmission metrics and sends them to a central server. Simultaneously, it outputs the same data via the serial port, allowing external software to capture and process the information in real-time.
- **Server Firmware**: The server acts as a sink for client data. Upon receiving a packet, it echoes the data back to the client as a form of confirmation and forwards the received information to its own serial output.
- **Stopped Firmware**: A utility module used to effectively pause or stop the data flow within the testbed. It performs no actions, serving as a null firmware for nodes that should remain inactive during specific phases of an experiment.

### Communication and Protocol Design

Reliability and data structure are central to the testbed's operation. The communication between clients and servers is connectionless, utilizing UDP as the transport protocol. 

To ensure data delivery without the overhead of complex handshake protocols, the system implements a custom confirmation mechanism. When a server receives data, it echoes the payload back to the originating client. The client waits for this echo to verify that its transmission was successful. 

Data is exchanged in a human-readable, comma-separated string format. A typical client-to-server packet includes:
- **tx**: Number of packets transmitted.
- **rx**: Number of packets confirmed.
- **txpwr**: Transmission power level.
- **ch**: The specific TSCH channel used for the transmission.

When reporting to the serial interface, the firmware adds metadata such as the firmware type (client/server), node addresses, peer addresses, and signal strength (RSSI) for received packets.

### Hardware Integration and Automation

While the firmware is built on the portable Contiki-NG RTOS, the current implementation and build scripts are tailored specifically for the **OpenMote-B** platform. The project includes a robust automation tool, `testbed-build.sh`, which simplifies the process of compiling and flashing the various firmware types to multiple devices connected via USB hubs. 

For developers looking to monitor the network live, the project supports a `serialview` target through the Contiki-NG make system. This allows for raw data visualization directly from the command line, providing immediate feedback on the health and performance of the TSCH network.

### Getting Started

Setting up the testbed involves configuring a local environment with Contiki-NG and cloning the repository into a specific directory structure. The automation tools assume a Linux environment where motes are mapped to serial ports like `/dev/ttyUSBn`. Detailed documentation is provided within the repository for environment setup and custom build configurations, ensuring that researchers can quickly deploy and iterate on their TSCH experiments.
