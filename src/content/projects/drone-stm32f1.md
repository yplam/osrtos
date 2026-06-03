---
title: drone_stm32f1
summary: A comprehensive open-source hobby drone project based on the STM32F103C8T6
  (BluePill) microcontroller. It features a FreeRTOS-based firmware architecture,
  a C# ground station GUI for real-time monitoring, and complete hardware design files
  including PCBs and mechanical drawings.
codeUrl: https://github.com/EmbeddedArea/drone_stm32
isShow: false
rtos: freertos
libraries: []
topics:
- bluepill
- drone
- freertos
- hobby
- open
- opensource
- source
- stm32
- stm32f103
- tutorial
star: 29
lastUpdated: '2022-01-11'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- fpv-drone-stm32f411-flight-controller
- stm32-quadcopter-low-cost-quadcopter-design
- holy-stone-h120d-drone-protocol-reverse-engineering
- avem
- droners
- catpilot
---

Building a custom flight controller is a classic challenge in the embedded systems world, and the **drone_stm32f1** project provides a robust, open-source foundation for doing exactly that. Centered around the ubiquitous STM32F103C8T6—famously known as the 'BluePill'—this project offers a full-stack approach to drone development, covering everything from low-level firmware to high-level ground station software.

### Project Overview
The drone_stm32f1 project is designed for hobbyists and engineers who want to understand the inner workings of a quadcopter. Unlike commercial flight controllers that often arrive as 'black boxes,' this repository exposes every layer of the system. The project is divided into three main pillars:
1.  **Firmware**: The C-based logic running on the STM32 microcontroller.
2.  **Software**: A Windows-based Ground Station GUI for telemetry and control.
3.  **Hardware**: PCB schematics, Bill of Materials (BOM), and mechanical drawings for the frame.

### Technical Architecture
The firmware is built using the STM32CubeIDE environment and leverages the **FreeRTOS** real-time operating system. This is a critical choice for a drone, as it allows the system to manage multiple time-sensitive tasks—such as reading IMU data, calculating PID loops, and processing GPS signals—without blocking the main execution flow. 

The project integrates several key hardware components:
*   **MPU9250**: A 9-axis Inertial Measurement Unit (IMU) providing accelerometer, gyroscope, and magnetometer data.
*   **NEO-6M GPS**: For location tracking and potentially autonomous navigation features.
*   **STM32F103C8T6**: The brain of the operation, handling all sensor fusion and motor PWM generation.

### Ground Station Software
One of the standout features of this project is the custom **Ground Station Software**. Developed in C#, the GUI provides a visual interface for the drone's status. It utilizes the **SharpDX** library to interface with joysticks or controllers, allowing for manual flight input via a PC. The software is structured to handle real-time telemetry, giving the pilot insight into the drone's orientation and GPS coordinates.

### Hardware and Mechanical Design
Beyond the code, the repository includes a `software` directory containing the Ground Station source and a `firmware` directory with the core logic. For those looking to build the physical drone, the project provides mechanical drawings and PCB layouts. This makes it a 'one-stop-shop' for developers who want to move from breadboard prototyping to a finished, flying craft.

### Getting Started
To explore the firmware, developers can open the `.project` file in STM32CubeIDE. The repository includes Python test scripts (like `mpu9250Test.py`) to help verify sensor data before taking to the air. For the ground station, the provided Visual Studio solution (`GroundStation.sln`) allows for easy modification of the user interface and control logic. Whether you are interested in PID tuning, sensor fusion, or C# GUI development, this project serves as an excellent educational resource and a functional hobbyist platform.
