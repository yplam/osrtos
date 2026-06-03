---
title: 3D Cloud Scanner - ARM Hackathon 2017
summary: A wireless 3D scanner project developed for the 2017 ARM Hackathon using
  the Mbed Cloud Connect Board. It utilizes C++ for sensor data acquisition, Python
  for server-side communication, and a web interface to visualize 3D scan results.
codeUrl: https://github.com/theo9921/ARMHack
isShow: false
rtos: mbed-os
libraries: []
topics:
- arm
- mbed-os
- python3
- html-css
- device-programming
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- weather-led-map-with-micropython-on-esp32c3
- embedded-proto-mbed-os-to-server-example
- mbed-ble-gap-scanner
- pv-curve-tracer
- stm32l476g-discovery-rtos-sensor-project
- 2d-lidar-edge-detection-using-raspberry-pi-pico
---

## Bringing Objects into the Digital Realm: The 3D Cloud Scanner

During the 2017 ARM Hackathon, a team of developers set out to bridge the gap between physical objects and digital 3D models. The result was the **3D Cloud Scanner**, a wireless, server-based scanning system built on the Mbed Cloud Connect Board. The project demonstrates how embedded systems can interact with cloud environments to create a seamless data pipeline from a hardware sensor to a web-based visualization tool.

### How It Works

The core concept of the project is to use the Mbed board as a handheld or stationary scanner. As the board scans an object, it collects spatial data and transmits it wirelessly to a backend server. This data is then processed and served to a front-end website where the user can view the resulting 3D model. 

### The Technology Stack

The project is built using a multi-layered approach, combining low-level hardware control with high-level web technologies:

*   **C++ (Firmware):** The team used C++ to interface with the Mbed Cloud Connect Board's sensors. This layer is responsible for capturing raw data and establishing communication with the external environment.
*   **Python (Backend):** Python serves as the glue for the system. It handles the server-side logic, establishing a communication channel between the Mbed board and the front-facing website. It processes incoming data packets and prepares them for visualization.
*   **HTML5/CSS3 (Frontend):** A static website provides the user interface. Using modern web standards, the team created a display where the "scan result"—the 3D model—is rendered for the user.

### Project Structure and Development

The repository is organized to show both the final product and the iterative steps taken to get there. The `/FINAL` directory contains the polished files used for the hackathon demo, including the main C++ logic and the website backend. 

For those interested in the development process, the `/Temp` directory is a treasure trove of experimental code. It includes various sensor demos and concept tests, such as:
*   **Sensors Demo:** Individual implementations for accelerometers, air quality sensors, temperature/humidity sensors, and light sensors.
*   **Concept Tests:** Early versions of the laser scanning logic and server communication scripts.
*   **Visualization Tools:** Python scripts like `3dplot.py` and `back_end_plot.py` which were used to test the 3D data rendering before the final website was integrated.

### Getting Started

To replicate this project, you will need an Mbed Cloud Connect Board and the Mbed online IDE or CLI environment. The firmware relies on several Mbed-specific libraries, the links for which are documented in the `libraries.md` file within the repository. 

On the server side, the project utilizes Python scripts (like `server.py`) to listen for incoming data from the board. The frontend can be launched by serving the `main.html` file located in the `FINAL/Website` directory. 

This project serves as an excellent example of how hackathon teams can leverage the Mbed ecosystem to quickly prototype complex IoT applications that involve hardware, cloud connectivity, and data visualization.
