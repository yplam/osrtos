---
title: AquariOS (Project Aquarius)
summary: AquariOS is an embedded operating system designed for aquarium automation
  and management. Built on TinyOS and implemented using nesC and Verilog, it provides
  features for automated lighting control and scheduled fish feeding without requiring
  an internet connection.
codeUrl: https://github.com/seanpm2001/AquariOS
isShow: false
rtos: tinyos
libraries: []
topics:
- api-blueprint
- aquarium
- fish-tank
- gpl3
- gplv3
- md
- nesc
- no-internet
- offline
- operating-systems
- tinyos
- txt
- verilog
- aquarios
- aquarios-dev
- project-aquarius
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- bathhouseos-core-control-panel
- bathhouseos
- esp32-cyd-aquarium
- aquarium-app
- bathos
- borneoiot-professional-aquarium-lighting-platform
---

AquariOS, also known as Project Aquarius, is a specialized embedded operating system tailored specifically for the management and automation of aquariums. In an era where many IoT devices rely heavily on cloud connectivity, AquariOS takes a different approach by offering a completely offline solution for fish tank maintenance, ensuring that your aquatic ecosystem remains stable regardless of your internet status.

### Built on a Solid Foundation
Technically, AquariOS is built upon TinyOS, a well-known component-based operating system designed for low-power wireless devices. The project utilizes nesC (network-embedded systems C) for its software components and Verilog for hardware-level logic. This combination allows for a highly efficient system that can run on modest hardware; the project estimates system requirements at just 4 megabytes of RAM and 64 megabytes of disk space.

### Key Functionalities
The primary goal of AquariOS is to automate the daily routines that keep an aquatic environment healthy. Its feature set currently focuses on two main areas:

*   **Lighting Management**: The system can dynamically adjust brightness and color based on the time of day. This includes support for complex patterns, frequency adjustments, and specific color ranges to simulate natural environments for the fish.
*   **Automated Feeding**: Users can schedule feeding times and even specify the type of food to be dispensed, ensuring that inhabitants are fed consistently without manual intervention.

### Hardware and Architecture
The repository includes hardware blueprints (found in the `Hardware/Blueprints` directory) and system records, suggesting a holistic approach to the aquarium controller. By using Verilog (seen in `MAIN.v`), the project indicates that it may target FPGA-based controllers or custom digital logic to handle specific timing or sensor tasks. The software side is organized into modules, with a dedicated configuration system (`CONFIG.cfg`) and a graphical interface component (`GUI.nc`) written in nesC.

### A Community-Driven Effort
Despite its niche application, AquariOS boasts a significant number of contributors across various domains. The project follows the "all-contributors" specification, highlighting a collaborative effort involving expertise in marine biology, hardware design, and software engineering. It is licensed under the GPL, ensuring that the project remains open-source and accessible to the hobbyist community.

For those looking to build a custom, reliable, and private aquarium controller, AquariOS provides a unique framework that bridges the gap between traditional RTOS development and specialized pet care automation. It represents a fascinating use case for TinyOS in a domestic, non-industrial setting.
