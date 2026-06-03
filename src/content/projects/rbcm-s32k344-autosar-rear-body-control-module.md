---
title: 'RBCM: S32K344 AUTOSAR Rear Body Control Module'
summary: An automotive-grade Rear Body Control Module for Formula Student racing,
  based on the NXP S32K344 microcontroller. It utilizes an AUTOSAR-compliant Model-Based
  Design (MBD) workflow for power management, telemetry, and vehicle diagnostics.
slug: rbcm-s32k344-autosar-rear-body-control-module
codeUrl: https://github.com/Caler10/RBCM_S32K344_AUTOSAR_MBD
star: 15
lastUpdated: '2025-10-29'
rtos: ''
topics:
- altium-designer
- autosar
- bcm
- formular-student
- fsae
- fscc
- fsec
- mbd
- mqtt
- qt6
- racing-car
- s32k3
- simulink
isShow: true
image: /202601/s32k344-autosar.webp
createdAt: '2026-01-14'
updatedAt: '2026-01-14'
relatedProjects:
- wute-dashboard-for-formula-student-electric
- ly-steering-wheel-meterbox
- arm-control-framework-acorns-rover
- alfa-romeo-giulia-dashboard-info-display-for-esp32-s3
- toyota-rav4-climate-control-panel-lin-bus-interface
- rcs-avr-relay-control-system-with-sms
---

## Overview

The RBCM (Rear Body Control Module) is a sophisticated automotive electronic control unit designed for the Wuhan University of Technology (WUTE) Formula Student racing team. Built around the high-performance NXP S32K344 microcontroller, this project represents a shift toward modern vehicle E/E (Electrical/Electronic) architectures. By offloading body management and diagnostic tasks to the RBCM, the primary Vehicle Control Unit (VCU) can focus exclusively on chassis dynamics and high-level control logic.

## Hardware Architecture

The system utilizes a modular dual-board design consisting of a core control board and a high-power motherboard. This separation ensures that the sensitive logic of the S32K344 is isolated from the high-current switching environment of the vehicle's power distribution system.

### Core Control Board
At the heart of the RBCM is the NXP S32K344, a microcontroller designed for ASIL D functional safety applications. It is supported by an Infineon TLF35584 power management IC (PMIC), ensuring the system meets ISO 26262 standards. A unique feature of this board is the integration of an ESP32S3 chip acting as a wireless DAPLink debugger, allowing for 2.4G wireless flashing and real-time calibration without physical tethering.

### Power Distribution Motherboard
The motherboard replaces traditional thermal fuses with intelligent high-side switches (Infineon BTT6200 and BTT6050). This enables software-defined overcurrent protection, real-time current monitoring for every channel, and advanced diagnostics. The board supports both 12V and 24V platforms, capable of delivering up to 1344W of power. It also includes an EC800M 4G module for long-range data transmission.

## Software and Model-Based Design

The RBCM software is developed using a Model-Based Design (MBD) workflow, which is standard in the automotive industry. This approach uses MATLAB/Simulink to model the application logic, which is then automatically translated into C code using the NXP MBDToolbox.

**The software stack includes:**
- **AUTOSAR MCAL Layer:** Configured using S32 Configuration Tools and EB tresos to provide a standardized interface to the hardware.
- **Application Layer:** Developed in Simulink with a focus on high cohesion and low coupling, divided into subsystems for power management, sensor fusion, and communication.
- **Calibration:** Integration with NXP FreeMaster allows engineers to observe variables and tune parameters wirelessly during vehicle testing.

## Telemetry and Monitoring

For real-time data analysis, the RBCM implements a comprehensive telemetry system. Data is packaged into JSON format and transmitted via MQTT over a 4G connection to a cloud server. A custom-built dashboard developed with Qt 6.5 (Qt Quick) provides the pit crew with a real-time view of critical vehicle stats, including low-voltage battery health, individual channel currents, and high-voltage system status.

## Key Capabilities

- **Intelligent Power Management:** Real-time diagnostics and protection for all low-voltage peripherals, replacing traditional fuse boxes.
- **Multi-Protocol Support:** Interfaces for ADC, PWM, UART, IIC, and SPI, compatible with both 3.3V and 5V sensors.
- **Advanced Safety:** Integrated overvoltage, surge, and reverse polarity protection, alongside the functional safety features of the S32K3 platform.
- **Wireless Workflow:** Supports remote firmware updates and calibration, significantly reducing downtime during trackside testing.
