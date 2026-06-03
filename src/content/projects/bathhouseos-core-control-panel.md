---
title: BathHouseOS Core Control Panel
summary: A specialized sub-operating system for the BathHouseOS ecosystem designed
  to provide centralized control over bathroom fixtures like smart tubs, toilets,
  and showers. It is built using nesC and Verilog on top of the TinyOS kernel, focusing
  on local, offline connectivity to ensure privacy and long-term reliability.
codeUrl: https://github.com/seanpm2001/BathHouseOS_Core_ControlPanel
siteUrl: https://github.com/seanpm2001/BathHouseOS/tree/BathHouseOS_Main-dev/Core_ControlPanel/
isShow: false
rtos: tinyos
libraries: []
topics:
- automation
- bath-house-os
- bath-houseos
- bathhouse-os
- bathhouseos
- bathhouseos-controlpanel
- control
- control-panel
- gpl3
- gplv3
- md
- nesc
- operating-system
- subsystem
- tinyos
- txt
- verilog
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- bathhouseos
- bathos
- aquarios-project-aquarius
- homebrew-tinyos-for-msp430
- buttfinity
- tanksync
---

The BathHouseOS Core Control Panel is a unique sub-operating system designed to act as the central nervous system for a suite of bathroom-focused embedded devices. In an era where the Internet of Things (IoT) often implies heavy reliance on cloud services and external servers, this project takes a different path by prioritizing local, wired or wireless connections that do not require an internet connection to function.

### The Philosophy of BathHouseOS
The project is driven by a desire to weaken the reliance on traditional IoT architectures, which the author describes as potentially dystopian and limited by the lifespan of the companies that run them. By creating a local control hub, BathHouseOS ensures that your bathroom hardware remains functional and private, regardless of your internet status or the business health of a third-party provider.

### Technical Foundation
Technically, the Control Panel is built using a combination of **nesC** and **Verilog**. It runs on the **TinyOS** operating system kernel, a platform well-known in the wireless sensor network community for its component-based architecture and efficiency in low-power environments. The use of Verilog suggests that the system is designed with hardware-level integration or FPGA targets in mind, allowing for high-performance control logic.

### Ecosystem Integration
The Control Panel serves as the primary interface for a variety of specialized operating systems within the BathHouseOS family. Since most of these endpoint devices lack their own screens, the Control Panel provides the necessary GUI to manage their settings. The systems it controls include:

*   **BathOS**: For smart bathtubs.
*   **ThroneOS**: For intelligent toilet systems.
*   **MaprilOS**: For shower control.
*   **UriOS**: For urinals.
*   **SankOS**: For sinks and basins.

### Features and Capabilities
The system features a basic Graphical User Interface (GUI) that allows users to bridge the gap between simple hardware and complex configuration. While the hardware for the physical interconnects is still in development, the software architecture is designed to handle both wired and wireless communication protocols to maintain a robust local network of devices.

### Project Status and Development
This repository serves as a "guesthouse" for the project, with primary development occurring within the main BathHouseOS repository. The codebase includes legacy versions and historical documentation, reflecting a long-term commitment to the project's evolution. It is licensed under the GPL, ensuring that the core control logic remains open and accessible to the community.
