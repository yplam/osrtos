---
title: Introduction to SoC Design Education Kit
summary: A comprehensive educational resource for learning System-on-Chip (SoC) design
  using the Arm Cortex-M0 processor on FPGA platforms. It covers hardware description
  languages, AMBA bus architectures, and peripheral integration using industry-standard
  tools like Xilinx Vivado and Keil MDK.
slug: introduction-to-soc-design-education-kit
codeUrl: https://github.com/arm-university/Introduction-to-SoC-Design-Education-Kit
siteUrl: https://www.arm.com/resources/education/education-kits/introduction-to-soc
star: 146
version: v2.0.0
lastUpdated: '2025-10-07'
rtos: cmsis
topics:
- amba
- arm
- arm-cortex-m0
- cmsis
- cortex-m
- design-start
- fpga
- hardware-designs
- keil-mdk
- soc
- system-on-chip
- system-on-chip-design
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- rapid-embedded-systems-design-education-kit
- dallas-formula-racing-embedded-onboarding
- h-c-l-p-tr-nh-stm32f1
- tinycore-esp32-s3-learning-platform
- bare-metal-programming-guide
- learning-stm32
---

## Overview

The Introduction to System-on-Chip (SoC) Design Education Kit is a flagship offering from the Arm University Program. It provides a complete set of educational materials designed to teach the fundamentals of SoC design, from hardware description languages to the implementation of a functional system on an FPGA. The kit is centered around the Arm Cortex-M0 processor and guides students through the process of building a simple yet powerful SoC.

## Core Technologies and Hardware

The project focuses on the Arm Cortex-M0 architecture, a popular choice for low-power embedded systems. The hardware implementation targets the Digilent BASYS 3 FPGA board, utilizing Xilinx Vivado for hardware synthesis and implementation. On the software side, the kit leverages the Arm Development Studio and Keil MDK for firmware development, providing students with exposure to professional-grade tools used in the semiconductor industry.

## Curriculum and Syllabus

The kit is structured as a 10-12 week undergraduate course, covering a wide range of topics essential for modern embedded engineers:

- **Processor Architecture**: Deep dives into the Arm Cortex-M0 architecture.
- **Bus Systems**: Detailed exploration of the AMBA 3 AHB-Lite bus architecture, which serves as the backbone of the SoC.
- **Peripheral Design**: Hands-on labs for creating AHB-compliant peripherals, including VGA controllers, UART interfaces, Timers, GPIO, and 7-segment displays.
- **Interrupt Mechanisms**: Understanding how hardware events interact with software execution.
- **Software Stack**: Transitioning from hardware design to software development using C, CMSIS (Cortex Microcontroller Software Interface Standard), and custom software drivers.

## Practical Application: The Snake Game

The course culminates in a final application where students develop an Application Programming Interface (API) to control their custom hardware. The final project is a functional "Snake" game running on the SoC they built, demonstrating the full integration of hardware peripherals (VGA for display, GPIO for input) and software logic.

## Inclusive Language and Standards

Reflecting modern industry standards, the kit includes a commitment to inclusive language. This involves updating technical terminology, such as replacing 'Master/Slave' with 'Manager/Subordinate' in the context of AMBA protocols. This ensures that the educational material remains respectful and aligned with the evolving values of the global engineering ecosystem.

## Getting Started

The repository provides a structured path for both students and educators. It includes lecture slides, lab manuals with solutions, and the necessary Verilog and C source files to implement the SoC. Prerequisites include a basic understanding of hardware description languages (Verilog or VHDL) and introductory C and assembly programming.
