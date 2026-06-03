---
title: Ultrasonic HC-SR04 Test for Mongoose OS
summary: A technical implementation of time-of-flight measurement for the HC-SR04
  ultrasonic sensor on Mongoose OS. It utilizes interrupt-driven logic for precise
  echo pulse width detection on the ESP8266 platform.
slug: ultrasonic-hc-sr04-test-for-mongoose-os
codeUrl: https://github.com/Tommystus/hc-sr04test
star: 1
lastUpdated: '2018-03-20'
rtos: mongoose-os
topics:
- mongoose-os
- ultrasonic-sensor-distance
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- zephyr-rtos-driver-for-hc-sr04-ultrasonic-sensor
- hlw8012-and-bl0937-energy-meter-library-for-mongoose-os
- hx711-testing-app-for-mongoose-os
- max17263-test-app-for-mongoose-os
- ds18b20-mgos-test
- hx711-library-for-mongoose-os
---

## Overview

This project provides a reference implementation for interfacing the HC-SR04 ultrasonic distance sensor with Mongoose OS, specifically targeting the ESP8266 microcontroller. The core functionality focuses on measuring the duration of the echo pulse returned by the sensor to calculate distance. To ensure accuracy and responsiveness, the project employs an interrupt-driven approach for time measurement, drawing inspiration from existing IR library implementations.

## Technical Implementation

The implementation addresses the specific timing requirements of ultrasonic sensors, where the width of the high pulse on the echo pin is proportional to the distance of the nearest object. By using interrupts rather than polling, the system can capture the start and end of the pulse with high precision without blocking the execution of other tasks within the Mongoose OS environment.

One of the critical aspects of this project is the management of hardware interrupts. The developer noted significant effort in organizing the code to prevent the trigger interrupt from interfering with system timers. Additionally, the project highlights the importance of physical signal integrity, recommending that trigger and echo lines be kept separate to prevent signal crosstalk, which can lead to false triggers.

## Hardware and Wiring

The project is designed for the ESP8266, a 3.3V logic microcontroller. Since the HC-SR04 typically operates at 5V, the project includes a wiring diagram that incorporates a diode to protect the ESP8266's GPIO pins from the higher voltage signal of the sensor's echo pulse. 

For distance calculation, the project uses a refined formula to convert the pulse width in microseconds ($t$) to centimeters ($d$):

```c
d = (t + 14) / 55
```

## Features and Capabilities

- **Interrupt-Driven Timing**: High-precision pulse width measurement based on logic derived from IR signal processing.
- **Mongoose OS Integration**: Built using the `mos` toolchain, allowing for easy deployment and management.
- **JavaScript Support**: Includes examples like `pingbuz.js`, demonstrating how to interface the low-level C timing logic with the mJS (Mongoose JavaScript) engine for higher-level application logic, such as triggering a buzzer based on distance.
- **Configuration Management**: Uses `mos.yml` for defining hardware pins, library dependencies (such as PWM and NeoPixel), and system settings.

## Getting Started

The project is structured to be built using the Mongoose OS command-line tool. The standard workflow involves cloning the repository and using the `mos build` command with the `esp8266` architecture flag. Because the project is designed with modularity in mind, the interrupt logic is intended to eventually be packaged as a standalone Mongoose OS library for broader community use.
