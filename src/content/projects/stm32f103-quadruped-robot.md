---
title: STM32F103 Quadruped Robot
summary: A sophisticated quadruped crawling robot powered by an STM32F103C8T6 microcontroller
  and an ESP32-CAM for real-time vision and remote connectivity. It utilizes FreeRTOS
  for multi-tasking and MicroPython for the wireless communication stack, supporting
  both cloud-based MQTT control via a mobile app and local control through a web interface.
slug: stm32f103-quadruped-robot
codeUrl: https://github.com/jmzdd/STM32F103-Robot
siteUrl: https://hackaday.io/project/202105-stm32f103-robot
lastUpdated: '2025-02-08'
image: /202605/STM32F103-Robot_0.avif
rtos: freertos
libraries:
- micropython
topics:
- emqx
- esp32-cam
- flet-app
- microdot
- micropython-esp32
- mqtt
- quadrupedal-robots
- stm32f103c8t6
isShow: true
createdAt: '2026-05-05T23:25:23+00:00'
updatedAt: '2026-05-05T23:25:23+00:00'
relatedProjects:
- quadruped-robot
- tny-360-quadruped-robot
- hexapod
- pyespcar-micropython-esp32-wifi-car
- 16-ir-array-pid-line-follower-robot-using-esp32
- sesame-robot-micro
---

This quadruped crawling robot is designed as a comprehensive embedded systems project, utilizing the STM32F103C8T6 as the primary controller. By integrating an ESP32-CAM and MQTT protocols, the system achieves real-time image backhaul and remote command execution. The control architecture is split into cloud-based and local solutions, offering flexibility in how the robot is operated.


### System Architecture

The robot's control logic involves a multi-tier communication strategy. A mobile application built with the Flet framework communicates with an EMQX MQTT broker. Commands are forwarded to the ESP32-CAM, which passes them to the STM32 via USART2. Simultaneously, video streams are uploaded to a Node.js server and displayed in the app. For local operation, the ESP32-CAM hosts a Microdot web server, allowing users to connect directly to the robot's hotspot and control it through a browser-based dashboard.

![System architecture diagram showing communication between STM32, ESP32-CAM, and the Cloud](/202605/STM32F103-Robot_1.avif)

### Hardware and Power Design

The physical structure was designed using FreeCAD, specifically tailored for MG90S servos. The chassis features dedicated compartments for battery placement and reinforced screw holes for stability. The components were fabricated using 3D printing with PLA material at a 0.1mm infill density. 

Power management is handled by a custom module based on the TI TPS5430. This module provides three independent power rails to ensure stable voltage for the high-current servos, the main controller, and the auxiliary functional modules.

![Power module schematic based on the TPS5430](/202605/STM32F103-Robot_4.avif)

### Software Implementation

#### STM32 Firmware
The STM32 core runs FreeRTOS to manage concurrent tasks. Upon initialization, the system enters a default state, waiting for commands via the USART2 serial interrupt. When a command is received, the interrupt service routine identifies the instruction and triggers specific event bits. These bits activate motion tasks which execute gait functions while updating the onboard OLED display. The firmware also includes drivers for the SSD1306 OLED, HC-SR04 ultrasonic sensor, and PCA9685 PWM driver for servo control.

#### ESP32-CAM and Connectivity
The ESP32-CAM runs a custom MicroPython environment. It manages the WiFi interface, switching between AP mode for local web control (via Microdot) and Station mode for MQTT cloud connectivity. The local interface provides a low-latency video stream and directional buttons that relay serial commands to the STM32. The cloud connection uses the MQTT protocol to synchronize state between the mobile app and the robot hardware.

#### Flet Application
The mobile interface is developed using the Flet framework, which allows for Python-based cross-platform app development. It features an instruction page and a control dashboard. The dashboard integrates a WebView to display the video feed from the server while sending control packets to the MQTT broker.

### Gait Planning

Movement is achieved through coordinated gait cycles. For forward motion, the robot alternates between lifting diagonal pairs of legs (left-front/right-back and right-front/left-back) and shifting the body weight. Turning is handled by rotating specific joints in clockwise or counter-clockwise patterns to achieve orientation changes.

![Gait planning diagram for forward and backward movement](/202605/STM32F103-Robot_13.avif)

### Deployment and Configuration

Deploying the system requires setting up an EMQX MQTT server, which can be easily managed via Docker or 1panel. The image backhaul relies on a Node.js server (CAM_Server) to process and serve the video stream. Developers must configure the server IP, MQTT credentials, and WiFi settings within the MicroPython and Flet source files to match their specific network environment.
