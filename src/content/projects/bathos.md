---
title: BathOS
summary: BathOS is an embedded automation system designed for bathtub management,
  focusing on flood prevention, temperature monitoring, and water conservation. It
  utilizes a multi-threshold sensor array and is developed using nesC and Verilog,
  likely targeting the TinyOS platform.
codeUrl: https://github.com/seanpm2001/BathOS
isShow: false
rtos: tinyos
libraries: []
topics:
- automation
- bath
- bath-house-os
- bath-houseos
- bathhouse-os
- bathhouseos
- bathos
- bathroom
- bathtub
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
- bathhouseos-core-control-panel
- aquarios-project-aquarius
- lal-control-for-mbed-os
- knu-usn-automatic-ventilation-system
- esp32-p4-home-assistant-display
---

BathOS is a specialized subsystem of the broader BathHouseOS project, born out of a practical need to solve common household problems related to bathtub management. The project addresses issues such as accidental flooding, lack of temperature control, and inefficient water usage through a dedicated embedded operating system approach.

### The Core Mission: Flood Protection
The primary motivation behind BathOS is flood prevention. Standard bathtub overflows often cannot keep up with the volume of water from a fully open faucet. BathOS implements a sophisticated drain protection system involving various sensors that automatically shut off the water supply when specific depth thresholds are reached. 

To ensure reliability and prevent false triggers caused by splashing, the system requires water to touch all sensors at a specific level simultaneously before taking action. The system supports ten distinct depth thresholds, ranging from 10 centimeters (3.93 inches) to 100 centimeters (1 meter). While most residential tubs only reach the third or fourth threshold, the system is designed with scalability in mind, potentially extending to swimming pool management in future iterations.

### Intelligent Monitoring and Gauges
Beyond safety, BathOS aims to improve the bathing experience through precise data monitoring:

*   **Temperature Gauge:** Users can monitor cold and hot water temperatures separately, as well as the combined temperature of the bath. The system supports multiple units, including Celsius, Fahrenheit, Rankine, and Kelvin.
*   **Hot Water Gauge:** This feature tracks the remaining capacity of the hot water tank, allowing users to set limits on usage or schedule the completion of a fill for a later time.
*   **Automatic Draining:** A programmable timer allows for automatic draining after a set period, with a maximum limit of 12 hours.

### Technical Implementation
While the project is application-focused, its technical foundation is rooted in classic embedded technologies. The repository contains source files in **nesC** (`.nc`), the component-based language used by the **TinyOS** platform, which is frequently used in wireless sensor networks and low-power embedded systems. Additionally, the presence of **Verilog** (`.v`) files suggests that some components of the system may be implemented or simulated at the hardware logic level, possibly for high-speed sensor processing or FPGA-based control.

### Project Structure and Ecosystem
BathOS is maintained as a "guesthouse" repository, with primary development occurring within the larger BathHouseOS ecosystem. The project structure includes a robust versioning history for its configuration files and documentation, reflecting a long-term development cycle that began around 2022. It is licensed under the GPL, emphasizing an open-source approach to home automation and safety.
