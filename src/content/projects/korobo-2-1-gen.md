---
title: KOROBO (2.1 Gen)
summary: A palm-sized spherical robot based on the Raspberry Pi Pico (RP2040) platform.
  It features a modular mechanical structure with 3D-printed components, an OLED display
  for expressions, and environmental sensors. The project serves as an open-source
  platform for exploring human-robot interaction and 'room for interpretation' in
  robotics.
slug: korobo-2-1-gen
codeUrl: https://github.com/KORokoro-rOBOt-project/KOROBO_2-1
star: 18
version: v2.1
lastUpdated: '2025-10-18'
rtos: ''
topics:
- cute
- kawaii
- korobo
- open-source-hardware
- osh
- raspberry-pi-pico
- robot
isShow: true
image: /202601/image_korobo-2-1.webp
createdAt: '2026-01-17'
updatedAt: '2026-01-17'
relatedProjects:
- andino-open-source-ros-2-educational-robot
- openrover-robotic-platform
- qbit
- sesame-robot-micro
- claude-buddy-pico
- kawaii-useless-robot
---

KOROBO (2.1 Gen) is a palm-sized, spherical robot designed to evoke a sense of presence and personality through simple movements and expressions. Developed as an open-source platform by the KORokoro.rOBOt project, this "2.1 Generation" version builds upon previous iterations to provide a more durable and extensible framework for makers and researchers interested in human-robot interaction.

The robot's core philosophy centers on "room for interpretation"—the idea that a robot's incomplete or simple nature allows humans to project their own meanings and feelings onto its actions. Unlike highly functional industrial robots, KOROBO moves somewhat unpredictably within its spherical capsule, driven by internal weights and motors that respond to its environment.

## Hardware and Design

At the heart of KOROBO 2.1 is the Raspberry Pi Pico, chosen for its affordability, availability, and widespread community support. The mechanical assembly is designed for accessibility, utilizing a Tamiya mini motor low-speed gearbox and custom 3D-printed components. The internal frame is designed to be snap-fitted together, minimizing the need for complex fasteners while maintaining enough durability to survive falls from desks or accidental impacts.

**Key hardware components include:**
- **Microcontroller**: Raspberry Pi Pico (RP2040)
- **Display**: An OLED module used to render the robot's square-eyed expressions
- **Sensors**: Light sensors and motion sensors (acceleration/angular velocity) to detect the surrounding environment
- **Power**: A lithium-ion battery with integrated micro-USB charging support
- **Drive System**: Tamiya 4-speed mini motor gearbox with custom 3D-printed tires

## Assembly and Customization

The project is structured to be highly modular and maker-friendly. The repository provides Gerber files for custom PCB ordering, STEP and STL files for 3D printing, and the necessary source code to get the robot running. The assembly process is divided into clear stages: drive unit construction, wiring, PCB soldering, and final integration into the spherical shell.

One of the standout features of the 2.1 generation is its improved extensibility. The internal frame provides accessible space for additional sensors or modules, allowing developers to evolve the robot's behavior. Whether it is reacting to light, sound, or physical orientation, KOROBO serves as a physical manifestation of code interacting with the real world.

## Software and Interaction

The software for KOROBO manages motor control, sensor data acquisition, and the OLED display interface. By leveraging the RP2040's capabilities, the robot can process environmental inputs in real-time to adjust its rolling patterns or facial expressions. The project encourages users to experiment with different behavioral algorithms, further exploring the concept of "interpretation" through varied movement logic. 

Because it uses the Raspberry Pi Pico, the platform is compatible with various development environments, making it an excellent tool for students and hobbyists to learn about embedded systems, robotics, and the nuances of social robotics design.
