---
title: RoboMaster SuperCap Controller Adernal
summary: A high-performance parallel four-switch Buck-Boost (FSBB) supercapacitor
  controller for RoboMaster robots. Powered by an STM32G474, it features a 160kHz
  switching frequency and a 10kHz PID-FF-PID control loop with ESR compensation for
  stable, high-efficiency power management.
slug: robomaster-supercap-controller-adernal
codeUrl: https://github.com/ZhuaX0/RoboMasterSuperCapCtrller_Adernal
star: 50
lastUpdated: '2025-04-05'
rtos: cmsis
topics:
- dcdc-converter
- robomaster
- stm32
- supercapacitor
isShow: false
createdAt: '2026-03-07'
updatedAt: '2026-03-07'
---

## Overview

The Adernal project is a sophisticated power management solution designed for the RoboMaster competition, where managing chassis power limits is a critical technical challenge. The project implements a Parallel Four-Switch Buck-Boost (FSBB) topology, which is widely considered the "optimal solution" for modern competitive robotics. Unlike older serial buck/boost designs, the parallel FSBB architecture allows for high-efficiency, bidirectional power transfer between the chassis bus and a supercapacitor bank, enabling robots to handle peak power demands that exceed the standard referee system limits.

## Hardware Architecture

The controller is built around the **STM32G474CET6**, a microcontroller from ST's D-Power series specifically optimized for digital power applications. It utilizes high-resolution timers (HRTIM) to provide up to 184ps resolution, which is essential for precise PWM control in high-frequency switching environments. 

**Key hardware components include:**
- **Switching Topology:** Parallel Four-Switch Buck-Boost (FSBB).
- **Power Stage:** STL130N6F7 MOSFETs driven by 2EDF7275K isolated gate drivers, providing stable nanosecond-level switching.
- **Sensing:** INA197 and INA240 current sense amplifiers for high-side bus and DCDC current monitoring.
- **Protection:** Integrated soft-start and anti-reverse connection circuits using P-channel and N-channel MOSFETs.

The PCB layout is meticulously designed with strict separation between power and control sections. It uses a four-layer stack-up with dedicated ground planes to suppress noise and manage heat dissipation during high-current operation.

## Software & Control Theory

The software implements a complex nested control loop operating at 10kHz, while the hardware switches at 160kHz. The primary control strategy is a **PID-FF-PID** (Proportional-Integral-Derivative with Feed-Forward) loop. 

A significant technical highlight is the **ESR-compensated Feed-Forward model**. Standard control models often suffer from oscillations due to the internal resistance (ESR) of the supercapacitors. The Adernal firmware compensates for this by calculating the expected current based on a simplified ESR model, significantly improving response speed and stability during rapid power transients.

**Software Modules:**
- **AlarmSystem:** A non-blocking task scheduler providing time-slicing for system operations.
- **LoopCtrl:** The core 10kHz control loop managing the FSBB state machine.
- **Safety System:** A comprehensive safety monitor checking eight categories of potential failures (overvoltage, overcurrent, etc.) across five severity levels.
- **Mode Management:** Supports Silent, Work, and Charge modes to adapt to different competition phases.

## Capacitor Bank Design

The project includes a dedicated supercapacitor bank design. It utilizes an **11s1p configuration** of 50F cells (WTR3V050F0Z-1840L), resulting in a 4.54F bank with a 33V voltage rating. When charged to 30V, the bank stores approximately **2kJ of energy**, providing ample buffer for high-acceleration maneuvers. The bank features an active balancing circuit based on the BW6103 chip to ensure cell longevity and safety.

## Getting Started

The repository provides complete hardware design files (Altium Designer/Kicad compatible) and the STM32CubeIDE project. Developers are advised to pay close attention to the `LowOptZone.c` and `Safety.c` files, which require specific optimization settings (-O0) to ensure timing-critical safety checks are not optimized away by the compiler. Detailed documentation, including a user manual and Simulink simulation files, is included to help teams integrate the controller into their robot platforms.
