---
title: 'Actonator: 3D Printable Robot Actuator'
summary: A comprehensive robotics project featuring a 3D printable belt-driven gearbox
  and a custom dual-channel BLDC motor driver. The system utilizes an STM32-based
  FOC driver board and communicates via the CAN SOT protocol for dynamic runtime configuration
  and state management.
slug: actonator-3d-printable-robot-actuator
codeUrl: https://github.com/JeyRunner/actonator
star: 10
lastUpdated: '2025-11-20'
rtos: ''
topics:
- actuator
- foc
- robotics
- stm32
isShow: true
image: /202601/actonator.webp
createdAt: '2026-01-17'
updatedAt: '2026-01-17'
relatedProjects:
- mks-xdrive-mini-foc-driver
- tny-360-quadruped-robot
- hexapod
- winder-bldc-motor-winding-machine
- cuybot-v1-opensource-smartcar-project
- robomates-firmware
---

The Actonator project provides a complete, open-source blueprint for building high-performance robot actuators. It bridges the gap between hobbyist 3D printing and professional-grade robotics by offering a belt-driven gearbox paired with a custom Field Oriented Control (FOC) driver board.

### The Driver Board
At the heart of the Actonator is a dual-channel brushless motor driver designed specifically for high-torque robotics applications. The board is powered by an STM32 microcontroller and can handle an input voltage range of 10V to 24V. Each of the two motor outputs is capable of delivering up to 10A, making it suitable for a wide variety of BLDC motors.

For feedback, the system supports 12-bit encoders connected via either dual I2C or dual SPI interfaces. This flexibility allows developers to choose the sensing method that best fits their specific mechanical constraints or precision requirements. The hardware design is fully open, with KiCad schematics and PCB layouts provided in the repository.

### Communication and Control
The Actonator uses the CAN SOT (State-Object-Transfer) Protocol for communication. This protocol is particularly powerful for robotics because it doesn't just handle basic command and state updates; it also allows for the dynamic setting of configuration parameters during runtime. This means users can tune PID loops, current limits, or motion profiles on the fly without needing to reflash the firmware.

The project includes a dedicated `can_client_lib` which contains the protocol definitions and host applications. This library simplifies the process of interfacing the actuator with a master controller or a PC for configuration and testing.

### Mechanical Design: The Gearbox
The mechanical component of the Actonator is a fully 3D printable gearbox. Unlike traditional planetary gears which can be difficult to print with high precision on consumer-grade machines, the Actonator uses a two-stage timing belt reduction. This design choice offers several advantages:

- **Ease of Assembly**: A simple screw-based mechanism handles belt tensioning.
- **Performance**: It achieves approximately a 1:20 reduction ratio.
- **Back-drivability**: The gearbox is easily back-drivable, which is a crucial feature for compliant robotics and safety in human-robot interaction.

### Project Structure
The repository is organized into three main pillars to support a full-stack build:

- **Firmware**: C++ code for the STM32 microcontroller, located in `motor_driver/firmware`.
- **Hardware**: Complete KiCad schematics and PCB layouts, including manufacturing files for various versions.
- **Gearbox**: STL files ready for 3D printing and assembly.

By providing the full stack from CAD files to firmware, Actonator serves as an excellent platform for researchers and hobbyists looking to build custom robotic limbs, mobile platforms, or automated systems that require precise, high-torque motion control.
