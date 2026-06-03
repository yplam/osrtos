---
title: Avem
summary: Avem is an open-source UAV flight controller project based on the STM32F103
  microcontroller. It implements a full flight stack including MPU6050 sensor fusion,
  cascade PID control, and FreeRTOS-based task scheduling for quadcopter stabilization.
codeUrl: https://github.com/avem-labs/Avem
siteUrl: http://bbs.5imx.com/forum.php?mod=viewthread&tid=1227960&extra=page%3D1
isShow: false
rtos: freertos
libraries: []
topics:
- arm
- drones
- flight-controller
- freertos
- hardware
- imu
- kicad
- pcb-layout
- stm32
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- fpv-drone-stm32f411-flight-controller
- drone-stm32f1
- stm32-quadcopter-low-cost-quadcopter-design
- flight-controller-rev2
- droners
- protoflight
---

Avem is a comprehensive open-source flight control system designed for Unmanned Aerial Vehicles (UAVs). Built around the popular and cost-effective STM32F103 microcontroller, Avem provides a robust foundation for hobbyists and engineers looking to understand the inner workings of flight stabilization and control.

### The Heart of the System: STM32 and MPU6050
At its core, Avem leverages the STM32F103's processing power to handle real-time sensor data and control loops. The primary sensor is the MPU6050, a 6-axis MotionTracking device that combines a 3-axis gyroscope and a 3-axis accelerometer. Avem processes this raw data to compute Quaternions and Euler Angles, which are essential for determining the aircraft's orientation in 3D space. The project implements software-based I2C to communicate with the sensor, ensuring flexibility in pin assignment.

### Advanced Control with Cascade PID
One of the standout features of Avem is its implementation of a cascade PID (Proportional-Integral-Derivative) controller. Unlike a simple single-loop PID, a cascade system uses multiple loops to improve stability and responsiveness. In a flight context, this typically involves an outer loop for angle control and an inner loop for angular rate control, allowing the drone to maintain its posture even in turbulent conditions. This architecture is critical for achieving the smooth flight characteristics seen in professional-grade flight controllers.

### Software Architecture and RTOS
To manage the various tasks required for flight—such as sensor polling, control calculations, and communication—Avem utilizes FreeRTOS. This real-time operating system ensures that critical flight control tasks are prioritized, providing the deterministic behavior necessary for stable flight. The project also includes a custom library of modules (`libs/module`) for:
- **I2C Communication**: Software-based implementation for sensor interfacing.
- **Motor Control**: PWM output for driving BLDC motors.
- **MPU6050 Driver**: Specialized code for data acquisition and processing.
- **Connectivity**: Interfacing with peripherals like Wi-Fi (ESP8266) and GPS.

### Hardware and Connectivity
The project is well-documented with schematics and PCB layouts. The I/O mapping is clearly defined for the STM32 platform:
- **MPU6050**: Connected via PB14 (SDA) and PB15 (SCL).
- **Motors**: Four BLDC channels mapped to PA6, PA7, PB0, and PB1.
- **Telemetry**: USART3 (PB10/PB11) is reserved for Wi-Fi communication, enabling remote monitoring and control.

### Development and Tooling
Avem is designed to be built using a standard ARM GCC toolchain. The repository includes a structured Makefile system that handles the compilation of the core application, the CMSIS and STM32 standard peripheral libraries, and the custom Avem modules. For debugging and visualization, the project supports a terminal-based HUD (Heads Up Display) and host-side tools built with Flask and pyserial, allowing developers to monitor flight data in real-time.

Whether you are building a custom quadcopter or studying flight dynamics, Avem offers a transparent and hackable platform to explore the world of aerial robotics.
