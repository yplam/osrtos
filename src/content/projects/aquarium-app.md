---
title: Aquarium App
summary: An IoT fish tank controller based on the ESP8266 NodeMCU and Mongoose OS.
  It enables remote monitoring of water temperature using a DS18B20 sensor and provides
  control over four AC outlets via a relay module, all managed through a responsive
  Node-RED dashboard.
codeUrl: https://github.com/atanasyanew/aqua-app
isShow: false
rtos: mongoose-os
libraries: []
topics:
- node-red
- mongoose-os
- mongoose-os-app
- esp8266
- aquarium
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- coral-reef-monitoring-system
- borneoiot-professional-aquarium-lighting-platform
- iot-project-on-hvac
- esp8266-mlx90614-temperature-monitor
- aquarios-project-aquarius
- esp-temperature-to-losant-using-mongoose-os
---

Managing a home aquarium requires constant attention to temperature and equipment status. The **Aquarium App** project provides a robust, DIY solution for remote fish tank monitoring and control, leveraging the power of the ESP8266 microcontroller and the Mongoose OS framework.

### Project Overview
At its core, the Aquarium App is a smart controller designed to automate and remotely manage aquarium hardware. By combining an ESP8266 NodeMCU with a four-channel relay module and a waterproof temperature sensor, the system allows users to toggle lights, pumps, or heaters from anywhere in the world. The project utilizes a modern software stack, featuring Mongoose OS for the device firmware and Node-RED for the user interface.

### Hardware Architecture
The project is built around accessible, low-cost components that offer high reliability for 24/7 operation:

*   **ESP8266 NodeMCU**: This Wi-Fi-enabled SoC acts as the brain of the operation. Running on the XTOS operating system with 128 kBytes of RAM and 4 MBytes of storage, it handles sensor data acquisition and relay switching.
*   **Four-Channel Relay Module**: To safely control high-voltage aquarium equipment (up to 250Vac 10A), a 5V relay module provides optical coupling isolation. This ensures the control circuit is protected from the operation circuit.
*   **DS18B20 Temperature Sensor**: A waterproof, stainless steel probe provides 9-bit to 12-bit Celsius measurements via a 1-Wire interface, allowing for precise tracking of water conditions.
*   **Power Supply**: A 5Vdc 10W supply powers both the microcontroller and the relay coils, ensuring stable operation.

### Software and Connectivity
The backend logic is written on top of **Mongoose OS**, an IoT firmware development framework designed for low-power connected microcontrollers. Mongoose OS simplifies the process of managing Wi-Fi connectivity and device-to-cloud communication.

For the frontend, the project employs **Node-RED**, which provides a visual dashboard based on Google's Material Design. The interface is fully responsive, ensuring a seamless experience across desktops, tablets, and smartphones. This dashboard allows users to view real-time temperature graphs and manually override relay states.

### Technical Implementation
The repository is organized into two main sections:
1.  **MCU Firmware**: Located in `src/mcu`, this contains the Mongoose OS configuration (`mos.yml`) and the logic required to interface with the hardware.
2.  **UI & Dashboard**: Located in `src/ui-nodered`, this includes a Docker-based setup for Node-RED and Mosquitto (an MQTT broker), facilitating communication between the ESP8266 and the web interface.

### Wiring and Safety
The project includes detailed wiring diagrams and electrical schematics to guide assembly. Because the system interacts with 220Vac mains power to control outlets, the design emphasizes the use of a relay module for isolation. The wiring block diagram illustrates how the 5V power supply feeds the ESP8266, which then sends control signals to the relay shield to switch four independent outlets.

Whether you are looking to automate your lighting schedule or ensure your water temperature stays within a safe range while you are away, the Aquarium App offers a comprehensive, open-source blueprint for modern fish tank management.
