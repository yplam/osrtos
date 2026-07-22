---
title: FOC Ears
summary: FOC Ears is an open-source animatronics project designed to create silent,
  high-performance cat ears using Field Oriented Control (FOC). Built on an ESP32
  microcontroller, it utilizes brushless gimbal motors and magnetic encoders to achieve
  smooth, quiet motion compared to traditional RC servos. The system integrates an
  IMU for orientation sensing and is developed using the PlatformIO environment.
slug: foc-ears
codeUrl: https://github.com/SabrCat/FOC_Ears
lastUpdated: '2026-06-05'
licenses:
- GPL-3.0
image: /202607/FOC_Ears_10.avif
rtos: ''
topics:
- animatronic
- animatronics
- arduino
- esp32
- foc
- simplefoc
isShow: true
createdAt: '2026-07-22T13:56:36+00:00'
updatedAt: '2026-07-22T13:56:36+00:00'
---

FOC Ears is a project dedicated to creating truly silent animatronic cat ears. Traditional designs often rely on RC airplane servos, which are notoriously noisy and can disrupt conversation. By transitioning to brushless motors and utilizing Field Oriented Control (FOC) via the SimpleFOC library, this prototype achieves near-silent operation suitable for wearable animatronics.

## System Overview

The project has evolved from a bulky perfboard prototype shown at GPN23 to a more refined version featuring a dedicated PCB. The core of the system is an ESP32-WROOM microcontroller, which manages the complex FOC loops required for two motors. 

### Key Components

*   **Microcontroller**: ESP32-WROOM for high-speed processing.
*   **Motor Drivers**: Two SimpleFOC Mini boards (version 1.0 or 1.1).
*   **Motors**: Mitoot 2208 100kv brushless gimbal motors.
*   **Sensing**: MT6701qt magnetic encoders for position feedback and a BNO055 IMU for head tracking.
*   **Power**: A USB-C PD trigger board providing 15V from a power bank, regulated down to 3.3V for logic.

![System wiring diagram](/202607/FOC_Ears_0.avif)

### Motor Assembly and Mechanical Design

The motor and encoder are mounted in a specialized stack that clamps the assembly together. A 3D-printed adapter holds the encoder magnet within the hollow motor shaft via a press fit. Because the hole patterns on the motor and the encoder PCB do not naturally align, a custom drilling jig was developed to modify the sensor boards safely.


To achieve natural movement, the design incorporates secondary motion. The lower ear lobe is attached to a TPU slider on the headband. This allows the ear to fold during rotation rather than just swinging, which mimics real animal ear movement. The slider is printed in TPU to ensure the motion remains silent and low-friction.

## Wiring and Electronics

The electronics handle 15V for the motor phases while maintaining a 3.3V logic level for the sensors. The MT6701 encoders are used in SSI mode for feedback. While the encoders are capable of I2C, SSI was chosen for the prototype to avoid bus conflicts, though it required reverse-engineering the specific encoder boards used.

![Reverse-engineered magnetic encoder pinout](/202607/FOC_Ears_12.avif)

## Software and Build Environment

The project is developed using PlatformIO, leveraging its superior library management and code completion. The software relies heavily on the SimpleFOC and SimpleFOCDrivers libraries. A critical configuration in the `platformio.ini` is the setting `lib_archive = false`, which is required for SimpleFOC to function correctly. 

The control logic uses a high-speed FOC loop. To maintain performance, the BNO055 IMU is polled every 10ms rather than every loop iteration, preventing the motor control tasks from slowing down. A PT1 filter is also integrated into the driver to smooth out sudden position changes and protect the mechanical assembly.

## 3D Printing and Mounting

Most structural components are provided as STEP and Fusion360 files. The mounting system is currently designed to clip onto specific glasses frames (Zenni Optical #2018916), providing a stable base for the relatively heavy gimbal motors.

![3D printed mounting components](/202607/FOC_Ears_1.avif)

## Technical Lessons Learned

Prototyping revealed several critical engineering insights:
*   **Thermal Management**: Clamping pieces should be printed in ASA or similar high-temp materials, as the motors can get hot during testing or if an ear becomes blocked.
*   **Control Tuning**: High loop speeds are essential for silence. Adding a 'D' term to the PID controllers often introduced unwanted noise, so tuning focused on 'P' and 'I' terms.
*   **Mechanical Integrity**: If the encoder is not tightly clamped to the motor, the resulting vibration can create a feedback loop that shakes the assembly apart. However, over-tightening risks penetrating the motor coils with mounting screws.
