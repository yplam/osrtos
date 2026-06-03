---
title: ESP32 MQTT Motor Control
summary: An ESP32-based automation project for controlling window blinds using a 12V
  wiper motor and MQTT. It features multi-threaded motor control, soft-start PWM,
  over-current protection, and integration with Home Assistant for remote management
  and sensor data reporting.
codeUrl: https://github.com/JJFourie/ESP32_MQTT_Motor_Control
isShow: false
rtos: freertos
libraries:
- spiffs
topics:
- am2320
- bts7960
- esp32
- i2c
- motor-control
- mqtt
- multithreading
- softstarter
- spiffs
- tsl2561
star: 5
lastUpdated: '2024-03-17'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- hunter-douglas-powerview-ble-for-home-assistant
- esp32-c6-matter-over-thread-roof-window-controller
- esp32-jarolift-controller
- smart-home-automation-with-freertos-and-esp32
- cuybot-v1-opensource-smartcar-project
---

Automating home fixtures often requires a balance between high-torque mechanical power and smart, networked control. The **ESP32 MQTT Motor Control** project by JJFourie provides a robust solution for this by repurposing a 12V automotive wiper motor to manage heavy living room blinds. By leveraging the ESP32's dual-core capabilities and MQTT connectivity, this project transforms a standard DC motor into a precision-controlled smart device integrated with Home Assistant.

## Why a Wiper Motor?
One of the most interesting aspects of this project is the choice of a wiper motor. Unlike standard DC motors, wiper motors utilize a worm gear mechanism. This design is inherently self-locking; while the motor can easily turn the axle, the axle cannot turn the motor. This eliminates the need for an external braking system to keep the blinds in an open position, as the weight of the blinds won't cause the motor to back-drive.

## Technical Architecture
The system is built on the Arduino framework for ESP32, utilizing **FreeRTOS** to run motor control functions in a dedicated thread. This ensures that motor operations—such as monitoring limit switches or calculating PWM ramps—are never interrupted by network latency or MQTT processing. 

Key technical features include:
- **Soft-Start PWM**: To prevent mechanical wear, the motor speed is ramped up smoothly using Pulse Width Modulation.
- **Rotation Monitoring**: The project can track the number of axle rotations using the motor's internal slip rings or external magnets, allowing for partial opening (e.g., opening to exactly 50%).
- **Safety Protections**: It includes over-current protection via the BTS7960 motor driver and a configurable maximum run duration to prevent motor burnout if a limit switch fails.
- **Storage**: Application settings and calibration data are stored in **SPIFFS**, allowing for on-the-fly configuration changes via MQTT without reflashing the firmware.

## MQTT Control and Home Assistant Integration
The project is designed to be a first-class citizen in a Home Assistant ecosystem. It communicates over MQTT, allowing for both command execution and state reporting. Users can send simple payloads to the `livingroom/blinds/action` topic:

```text
open      - Opens blinds fully
open:50   - Opens to 50% based on rotation count
close     - Closes until the limit switch is triggered
stop      - Immediate motor halt
```

Beyond simple movement, the ESP32 acts as a sensor hub, reporting luminosity (via TSL2561), temperature, and humidity to Home Assistant. This data can be used to trigger automations, such as closing the blinds automatically when the sun is too bright or the room temperature exceeds a certain threshold.

## Hardware and Connectivity
The project utilizes a high-power **BTS7960 (IBT-2)** motor driver to handle the current demands of the 12V motor. For manual overrides, a physical SPDT momentary rocker switch is supported, allowing users to operate the blinds like electric car windows even if the network is down. 

For developers, the project includes advanced debugging features like **UDP Telnet streaming**, allowing for wireless log monitoring, and **Over-the-Air (OTA)** updates, which are essential once the unit is mounted inside a permanent housing near a window frame.
