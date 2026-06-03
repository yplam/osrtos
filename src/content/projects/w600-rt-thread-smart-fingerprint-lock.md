---
title: W600 RT-Thread Smart Fingerprint Lock
summary: A smart fingerprint door lock system based on the W600 WiFi SoC and RT-Thread
  RTOS. It features multiple unlocking methods including fingerprint recognition,
  NEC infrared remote control, and remote operation via the OneNET IoT platform. The
  project integrates hardware components like the FPC1020A sensor and MG996R servo
  for a complete security solution.
slug: w600-rt-thread-smart-fingerprint-lock
codeUrl: https://github.com/han-xiaohu/W600_RT-Thread_Smart_fingerprint_lock
siteUrl: https://docs.w600.fun/
star: 5
lastUpdated: '2020-12-26'
rtos: rt-thread
libraries:
- easyflash
- lwip
topics:
- onenet
- rt-thread
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- wanderingplan
- w601-rt-thread-alarm-clock
- smartlock-for-disco-l475vg-iot01a
- freebees-access-control-for-esp32
- maixface
- watchbot-system
---

## Overview

The W600 RT-Thread Smart Fingerprint Lock is a comprehensive embedded project that transforms the W600 WiFi SoC into a secure, connected door management system. By leveraging the RT-Thread real-time operating system, the project integrates fingerprint biometric authentication, infrared remote control, and cloud-based management via the OneNET platform. The system is designed to provide multiple layers of access while maintaining a persistent connection to the cloud for status monitoring and remote operation.

## Hardware Architecture

The project is built around the **WinnerMicro W600 (TW-03 module)**, an ARM Cortex-M3 based SoC with integrated WiFi. This controller manages several peripheral modules to provide a complete security experience:

- **FPC1020A Fingerprint Module**: A capacitive sensor used for high-precision biometric identification.
- **MG996R Servo**: Acts as the mechanical actuator to physically engage or disengage the lock mechanism.
- **Hall Sensor**: Monitors the physical state of the door (open/closed) by detecting a magnet mounted on the door frame.
- **Infrared Receiver**: Enables local unlocking via standard NEC-protocol remote controls.

## Software Implementation

The software stack is powered by **RT-Thread**, utilizing its multi-threading capabilities to handle concurrent tasks such as network management, sensor polling, and cloud communication. Key software components include:

- **OneNET Integration**: Uses the MQTT protocol to synchronize door status and receive remote unlock commands. It tracks history logs, including the specific method used to open the door (fingerprint ID, IR code, or remote user ID).
- **Network Management**: Features a 'OneShot' web configuration mode, allowing users to connect the lock to their local WiFi via a mobile-friendly captive portal hosted at `192.168.169.1`.
- **Storage & Flash**: Utilizes the **EasyFlash** and **FAL (Flash Abstraction Layer)** packages to manage configuration data and persistent logs safely on the chip's internal flash.
- **Watchdog Control**: A dedicated hardware watchdog ensures system reliability by automatically resetting the device in the event of a software hang.

## Key Features

### Multiple Access Methods
Users can interact with the lock in three primary ways:
1. **Biometric**: Fingerprint matching via the FPC1020A module.
2. **Local Remote**: NEC-encoded infrared signals for convenient local access.
3. **Cloud Remote**: Commands issued via the OneNET console or a dedicated Android application.

### Intelligent Monitoring
The system doesn't just open the door; it monitors the environment. The Hall sensor provides real-time feedback on whether the door is physically closed. This state is pushed to the OneNET data stream, allowing users to check their door status from anywhere in the world.

### Robust Connectivity
The project includes automatic network detection and reconnection logic. If the WiFi connection is lost, the W600 will attempt to restore the link to ensure the remote management features remain available.

## Technical Structure

The application logic is neatly organized into modular components:
- `fpc1020_control.c`: Handles serial communication and protocol parsing for the fingerprint sensor.
- `onenet_control.c`: Manages the MQTT lifecycle and data stream reporting.
- `door_control.c`: Controls the MG996R servo via PWM and monitors the Hall sensor GPIO.
- `wifi_control.c`: Manages the WiFi station mode and the AP-based web configuration portal.

This project serves as an excellent reference for developers looking to build IoT-connected security hardware using the RT-Thread ecosystem and the W600 SoC.
