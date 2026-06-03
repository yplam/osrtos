---
title: 6LBR on Telecontrolli Devices (X.IP4T/X.IP5)
summary: This project provides a Contiki OS port and application suite for Telecontrolli's
  X.IP4T and X.IP5 smart devices based on the CC1310 MCU. It implements a 6LoWPAN
  Border Router (6LBR) and a web demo supporting CoAP and MQTT for remote sensor monitoring
  and device control.
codeUrl: https://github.com/Telecontrolli/6lbr-on-Telecontrolli-Devices-XIP
siteUrl: https://www.hackster.io/Telecontrolli
isShow: false
rtos: contiki-os
libraries: []
topics:
- telecontrolli-devices-xip
- contiki-os
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- home-automation-simulation-using-contiki-os
- 6lowpan-ble-bridge
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- mbed-os-6-stm32-iot-ethernet-controller
- low-power-wireless-networking-for-iot-lpiot
- homeiot-smart-home-automation-system
---

Connecting low-power microcontrollers to the Internet of Things requires a robust networking stack and efficient hardware. Telecontrolli has addressed this for their CC1310-based Smart Devices by adapting the Contiki Operating System to create a comprehensive 6LoWPAN Border Router (6LBR) solution. This project specifically targets the X.IP4T SmartModule and the X.IP5 SmartMachine, providing the necessary firmware to bridge wireless sensor networks with standard IPv6 networks.

### Project Evolution and Capabilities

The repository has evolved through several versions, each expanding the capabilities of the Telecontrolli hardware. While the initial version focused on core Contiki OS support, subsequent updates introduced critical industrial features:
- **V1.1 & V1.2**: Added support for Output and Input management, allowing for remote device activation and state monitoring.
- **V1.3**: Introduced ADC (Analog-to-Digital Converter) input management. This allows users to read analog sensor values and display them via CoAP resources (specifically mapped to IOID_14).

### Technical Architecture

The system is built upon the Contiki-develop-20170121 branch, a popular choice for low-power wireless communication. The architecture typically involves two main components:
1. **6LBR-Slip-Radio**: A device acting as the bridge/router between the 802.15.4 wireless network and the host system (often a Raspberry Pi).
2. **cc26xx-web-demo**: A firmware for end-nodes that provides a web interface, CoAP server, and MQTT client for data interaction.

The project leverages the Erbium CoAP implementation and a REST engine to expose hardware features as web resources. This makes it possible to toggle LEDs, read sensors, and manage network settings using standard web protocols.

### Hardware Support

The project is optimized for Telecontrolli's proprietary hardware:
- **X.IP4T SmartModule**: A compact CC1310-based module designed for integration into larger systems.
- **X.IP5 SmartMachine**: A more robust device intended for industrial IoT applications.

Both devices utilize the CC1310's Sub-1 GHz radio, which provides excellent range and penetration compared to 2.4 GHz alternatives, making it ideal for smart building and industrial environments.

### Getting Started

To use this project, developers typically start with a standard Contiki OS installation and then "patch" it by replacing specific directories with the versions provided in this repository. The main areas of modification include:
- `cc26xx`: Example applications and web demos.
- `dev`: Core device drivers for battery, buttons, and radio.
- `slip-radio` & `rpl-border-router`: Networking logic for the border router.
- `srf06-cc26xx`: Platform-specific board configurations and peripheral drivers.

Once the files are integrated, the firmware can be compiled using the standard Contiki makefile system. For example, to build the web demo, one would navigate to the `cc26xx/cc26xx-web-demo` directory and run:

```makefile
make TARGET=srf06-cc26xx BOARD=launchpad/cc1310 cc26xx-web-demo
```

This project serves as a bridge for developers looking to deploy professional-grade 6LoWPAN networks using Telecontrolli's specialized hardware, combining the flexibility of Contiki OS with industrial-ready modules.
