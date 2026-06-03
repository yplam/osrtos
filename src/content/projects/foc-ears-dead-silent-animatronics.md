---
title: 'FOC Ears: Dead Silent Animatronics'
summary: An open-source prototype for silent animatronic cat ears using brushless
  motors and Field Oriented Control (FOC). It utilizes an ESP32 microcontroller with
  the SimpleFOC library to achieve precise, quiet motion, overcoming the noise issues
  of traditional RC servos. The system integrates magnetic encoders and an IMU for
  sophisticated movement and orientation tracking.
slug: foc-ears-dead-silent-animatronics
codeUrl: https://github.com/HB-Stratos/FOC_Ears
star: 14
lastUpdated: '2025-12-27'
rtos: freertos
topics:
- animatronic
- animatronics
- arduino
- esp32
- foc
- simplefoc
isShow: false
createdAt: '2026-01-15'
updatedAt: '2026-01-15'
relatedProjects:
- foc-pocket
- esp32-virtual-cat-project
- lumifur-controller
- opentoys
- actonator-3d-printable-robot-actuator
- tny-360-quadruped-robot
---

# FOC Ears: Dead Silent Animatronics

The FOC Ears project addresses a common frustration in the world of animatronics: the distracting whine of RC servos. While traditional servos are the go-to for hobbyist robotics, their gear noise often breaks the immersion of wearable animatronics. This project documents a successful prototype of "dead silent" cat ears using brushless motors and Field Oriented Control (FOC).

## The Shift to Brushless FOC

At the heart of the system is the ESP32-WROOM microcontroller, which manages the complex task of Field Oriented Control via the SimpleFOC library. Unlike standard DC motors or servos, brushless motors driven by FOC provide smooth, high-torque motion with almost no audible noise. The project utilizes Mitoot 2208 100kv brushless gimbal motors, which are specifically designed for the low-speed, high-torque requirements of camera stabilization—making them perfect for subtle ear movements.

## Hardware and Components

The system is built around a sophisticated hardware stack designed for precision and silence:
- **ESP32-WROOM**: Provides the processing power for dual-motor FOC control.
- **SimpleFOC Mini Drivers**: Compact driver boards that interface the ESP32 with the brushless motors.
- **MT6701qt Magnetic Encoders**: These sensors provide the high-resolution feedback necessary for the FOC algorithm to maintain accurate position control.
- **BNO055 IMU**: Included to allow the ears to react to the wearer's head movements, enabling secondary motion that feels natural and lifelike.

## Mechanical Design and 3D Printing

The mechanical design is equally innovative. The ears are mounted using a custom 3D-printed "sandwich" assembly that clamps the motor and encoder together. To solve the problem of stiff internal wires in off-the-shelf ears, the developer used a "fatigue cracking" technique—repeatedly bending the internal wire with pliers to make it flexible enough for motorized movement without destroying the ear's structure. 

TPU (Thermoplastic Polyurethane) sliders are used for the lower ear lobes to ensure that even the sliding friction remains silent. This attention to detail ensures that the wearer doesn't hear mechanical grinding just inches from their own ears.

## Software and Control Logic

From a software perspective, the project is built using PlatformIO. The developer highlights several critical lessons learned during the build:
- **Loop Speed**: High loop speeds are essential for the FOC algorithm to maintain silent and precise control. Reading the IMU every loop was found to slow down the motor control loop too much; instead, the IMU is sampled every 10ms to maintain system performance.
- **PID Tuning**: Traditional PID tuning requires care in this application; adding a 'D' (derivative) term was found to introduce audible noise, leading to a preference for PI control or heavily filtered inputs.
- **Filtering**: A PT1 filter element was integrated into the motor driver to limit maximum acceleration, safeguarding the mechanics from violent position step inputs.

## Conclusion

This project serves as a comprehensive guide for makers looking to move beyond hobby servos into the world of high-performance brushless motion control. While it remains a prototype, the documentation provides a clear roadmap for anyone wishing to build their own silent animatronics, proving that with the right combination of FOC and clever mechanical design, "dead silent" motion is achievable.
