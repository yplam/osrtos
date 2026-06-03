---
title: Pico Claw Machine
summary: A DIY claw machine project built using a Raspberry Pi Pico W and MicroPython.
  It features three-axis movement control using DC motor controllers and interfaces
  with a standard replacement claw mechanism and arcade-style controls.
slug: pico-claw-machine
codeUrl: https://github.com/geo-tp/Pico-Claw-Machine
star: 19
lastUpdated: '2025-03-22'
rtos: ''
libraries:
- micropython
topics:
- arcade-machine
- claw-machine
- motor-controller
- raspberry-pi-pico
isShow: false
createdAt: '2026-01-23'
updatedAt: '2026-01-23'
relatedProjects:
- diy-arcade-machine
- winder-bldc-motor-winding-machine
- diy-portrait-mode-gamepad
- scara-drawing-robot
- magic-8-ball-toy
- claude-buddy-pico
---

## Overview

The Pico Claw Machine is a DIY robotics project that transforms a Raspberry Pi Pico W into the brain of a fully functional arcade-style claw machine. By utilizing affordable replacement parts—such as a standard replacement claw and guide rails—this project demonstrates how to interface microcontrollers with high-voltage DC motors and electromagnets to create a complex mechanical system.

The machine provides free movement across three axes (X, Y, and Z), making it a versatile platform for various uses, from traditional toy grabbing to educational demonstrations. The project is designed to be accessible, utilizing recycled materials for the structure and standard off-the-shelf components for the electronics.

## Hardware and Architecture

The system is powered by a Raspberry Pi Pico W running MicroPython. Because the claw and motors require more power than the Pico can provide directly, the architecture employs two DC motor controllers powered by a 12V supply. 

### Axis Control
- **X-Axis**: Controls the internal movement of the claw assembly.
- **Y-Axis**: Manages movement along the guide rails.
- **Z-Axis**: Handles the raising and lowering of the claw.
- **The Claw**: Uses an electromagnet (or "pince") to grip objects.

The project utilizes a 12V 2.5A power supply, which is sufficient for the motors and the electromagnet. Interestingly, the Pico itself is powered via the 3.3V output from one of the motor controllers, simplifying the power distribution network.

## Software Implementation

The core logic is implemented in a single MicroPython script, `main.py`. The script manages the GPIO state for the motors and the claw based on input from an arcade stick and several buttons. 

One of the more sophisticated aspects of the software is the integration of limit switches. The script constantly polls the state of these switches to prevent mechanical overextension. For the Z-axis (descent), the project uses a clever hardware feature: a limit switch that triggers when the claw is relieved of its own weight upon touching the ground, allowing the machine to work at any height without manual calibration.

```python
# Example of motor and limit switch logic from main.py
if not btn_grue_gauche.value() and not limitX_gauche.value():
    motorX_gauche.on()
    print("Grue gauche")
    led_state = True
else:
    motorX_gauche.off()
```

## Technical Challenges and Solutions

Building a claw machine involves several integration challenges, particularly regarding proprietary hardware. The replacement claws found on the market often use proprietary connectors. This project solves that by creating a custom interface using 2x8 male Dupont headers. 

Additionally, while the motors and electromagnet perform well at 12V, the project notes that the electromagnet's holding force can be increased by powering it with 24V if needed. The motor controllers used are flexible enough to support a voltage range from 5V to 14V, allowing builders to tune the movement speed and gripping strength to their specific needs.

## Getting Started

To build the Pico Claw Machine, developers need to flash the Raspberry Pi Pico W with the MicroPython UF2 firmware. The hardware setup involves wiring the motors to the controllers and connecting the controllers to the Pico's GPIO pins according to the defined pinout. Once the physical structure is built and the `main.py` script is uploaded via an IDE like Thonny, the machine is ready for operation. The project serves as an excellent template for hobbyists interested in combining MicroPython with mechanical engineering and DC motor control.
