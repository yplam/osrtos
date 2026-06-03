---
title: Intelligent Building Fire Protection System
summary: A Huawei LiteOS-based fire safety solution for smart buildings using the
  Bear Pi platform. It utilizes smoke and flame sensors for detection, NB-IoT and
  GSM for communication, and Huawei Cloud for remote monitoring and alerting.
slug: intelligent-building-fire-protection-system
codeUrl: https://github.com/hyydf/Intelligent-Building-Fire-Protection-System-based-on-LiteOS-and-NB-IoT
star: 14
lastUpdated: '2022-06-04'
rtos: liteos
topics:
- 2g
- liteos
- nb-iot
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- wanderingplan
- smart-heating-iot-system
- patient-monitoring-system-using-96boards
- genius-gateway
- knu-usn-automatic-ventilation-system
- smartorchard
---

The Intelligent Building Fire Protection System is a comprehensive IoT solution designed to enhance safety in modern structures through real-time environmental monitoring and automated emergency response. Built upon the Huawei LiteOS real-time operating system and the Bear Pi development platform, this project demonstrates a robust implementation of a three-layer IoT architecture to detect hazards and provide multi-channel alerting.

### System Architecture

The project is structured around a standard three-layer IoT framework:

*   **Perception Layer**: This layer consists of smoke and flame sensors that monitor environmental conditions. An STM32L431 microcontroller serves as the central controller, processing sensor data and managing local actuators such as relays, the JQ8900 voice module, and status LEDs.
*   **Network Layer**: The system employs dual-mode communication for high reliability. A Quectel BC35-G NB-IoT module handles high-efficiency data transmission to the cloud, while a SIM800C GSM module provides redundant alerting capabilities via SMS and voice calls.
*   **Application Layer**: Integration with Huawei Cloud allows for data packet parsing, real-time visualization, and automated alert dispatching to mobile devices and management consoles.

### Key Features

*   **Real-time Monitoring**: Continuous sampling of smoke density and fire presence, with data displayed locally on an integrated LCD screen for immediate situational awareness.
*   **Multi-channel Alerting**: In the event of an emergency, the system triggers local voice alarms, sends SMS notifications, initiates phone calls to designated numbers, and pushes alerts to the Huawei Cloud platform.
*   **Low Power Design**: By leveraging Huawei LiteOS, the system is optimized for the power constraints typical of building-wide sensor networks, ensuring long-term reliability.
*   **Cloud Synchronization**: Seamless connection to Huawei Cloud enables remote management, historical data logging, and remote command execution.

### Technical Implementation

The core logic is implemented in `oc_smoke_template.c`, which manages several concurrent tasks within the LiteOS environment. The software architecture is designed to handle data acquisition, cloud communication, and alarm logic asynchronously. Key tasks include:

*   **Data Acquisition**: Periodically reads analog and digital sensor values and updates the local LCD display.
*   **Data Upload**: Formats sensor data into cloud-compatible packets and transmits them via the NB-IoT stack.
*   **Command Handling**: Processes incoming commands from the cloud platform to trigger local actions, such as resetting alarms or activating relays.
*   **Alarm Logic**: Evaluates sensor thresholds to determine if an emergency state exists, subsequently triggering the voice module and GSM alerts.

The project was developed using VS Code with the IoT Link plugin, which provides a streamlined development environment for LiteOS-based firmware on STM32 hardware. This setup allows for efficient debugging and deployment on the Bear Pi (小熊派) development board.
