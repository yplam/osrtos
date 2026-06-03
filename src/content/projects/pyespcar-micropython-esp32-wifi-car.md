---
title: PyEspCar - MicroPython-ESP32 WIFI Car
summary: PyEspCar is an open-source robotics platform based on the ESP32 and MicroPython,
  designed for computer vision and motion control education. It features a dual-layer
  metal chassis, a 2-DOF gimbal for camera mounting, and supports remote debugging
  via WebREPL and MQTT control.
codeUrl: https://github.com/1zlab/1ZLAB_PyEspCar
siteUrl: http://dev.1zlab.com
isShow: false
rtos: ''
libraries:
- micropython
topics:
- python
- micropython
- micropython-esp32
- car
- robot
- wifi
- esp32
- rc-car
- opencv
- pid
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- cuybot-v1-opensource-smartcar-project
- mpython-board
- openrover-robotic-platform
- andino-open-source-ros-2-educational-robot
- mongoose-os-robot-car
- papaya-pathfinder
---

The PyEspCar project by 1ZLab is a versatile, open-source robotic platform designed to bridge the gap between high-level Python programming and embedded hardware control. Built around the ESP32 microcontroller, it leverages MicroPython to provide an interactive development experience, allowing developers to use REPL (Read-Eval-Print Loop) for real-time debugging and testing without the overhead of traditional C++ compilation cycles.

### Hardware Architecture
At its core, PyEspCar utilizes the NodeMCU32s module mounted on a custom-designed baseboard. The hardware design is robust, featuring a dual-layer aluminum alloy chassis that is significantly more durable than standard acrylic frames. Key hardware components include:

- **2-DOF Gimbal**: A lightweight two-degree-of-freedom platform capable of carrying a smartphone for video streaming or computer vision tasks.
- **High-Torque Servos**: Equipped with 20KG digital servos that can be expanded for robotic arm applications.
- **Expandable IO**: The baseboard includes interfaces for AB-phase encoders, dual motors, I2C sensors, and multiple UART ports.
- **Power System**: A 12V 6000mAh battery pack ensures long-lasting operation for complex experiments.

### Software and Development Environment
One of the standout features of PyEspCar is its focus on developer productivity. By using MicroPython, the project enables a "Make Things Easy" philosophy. Key software features include:

- **Remote Debugging**: Through WebREPL, users can wirelessly program the car and synchronize files without a physical USB connection.
- **Custom Web IDE**: 1ZLab provides a dedicated browser-based IDE specifically optimized for ESP32 MicroPython development.
- **MQTT Control**: The system supports remote operation over a network, allowing for complex control schemes like keyboard-based driving or automated tracking.

### Computer Vision Integration
While the car runs MicroPython for real-time motor and sensor management, it is designed to work in tandem with a PC for heavy lifting. A common workflow involves mounting a phone on the car's gimbal to stream video to a computer. The PC then processes the images using OpenCV and sends control commands back to the ESP32 via WIFI. This hybrid approach allows for sophisticated features like color block tracking and autonomous navigation.

### Modular Code Structure
The repository is organized into clear modules for different hardware components, making it easy to learn and extend:

- `motor.py`: Handles DC motor PWM signals.
- `pca9685.py`: A driver for the 16-channel PWM controller used for servos.
- `car.py`: A high-level abstraction for movement commands.
- `cloud_platform.py`: Logic for controlling the 2-DOF gimbal.

### Open Source Commitment
1ZLab has open-sourced the entire stack, including the PCB design files (v1.1 through v2.2), mechanical drawings for metal fabrication, and the complete Python source code. This makes it an excellent resource for students and hobbyists looking to understand the intersection of robotics, IoT, and computer vision. The project is further supported by a series of video tutorials available on Bilibili, covering everything from basic MicroPython syntax to advanced kinematics control.
