---
title: 'RCS_AVR: Relay Control System with SMS'
summary: A remote relay control system based on the ATmega328 microcontroller and
  Quectel M66 GSM module. It features SMS-based command processing, 433MHz remote
  control integration, and environmental sensing via the AHT20 sensor. The project
  includes a custom power supply design and a non-blocking state-machine-driven firmware
  architecture.
slug: rcs-avr-relay-control-system-with-sms
codeUrl: https://github.com/aKaReZa75/RCS_AVR
star: 50
version: V1.0
lastUpdated: '2025-12-25'
rtos: ''
libraries:
- platformio-platformio-core
topics:
- akareza
- alphanumeric-display
- altium-designer
- atmega328
- avr
- educational-project
- embedded-system
- gsm-modem
- hossein-bagheri
- microcontroller-prorgaming
- pcb-design
- pcb-layout
- platformio
- rcs-avr
- relay-controller
- schematic-design
- vscode
isShow: true
image: /202603/RCS2.webp
createdAt: '2026-03-07'
updatedAt: '2026-03-07'
---

## Overview

The RCS_AVR project is a comprehensive embedded systems initiative designed for remote relay control via SMS. Built around the popular ATmega328 microcontroller, the system integrates a GSM module to process incoming text commands, allowing users to toggle electrical loads from anywhere with cellular coverage. Beyond simple relay switching, the project incorporates environmental monitoring and local wireless control, making it a versatile platform for home automation and industrial monitoring.

## Hardware Architecture

The hardware is designed for reliability and modularity, featuring a robust Power Supply Unit (PSU) capable of providing multiple voltage levels (12V, 5V, 4V, and 3.3V) to support various components. 

**Key hardware components include:**
- **Microcontroller**: ATmega328 running at 16MHz.
- **GSM Module**: Quectel M66 for SMS and cellular network interaction.
- **Remote Control**: RXB22 433MHz receiver for local RF control.
- **Sensors**: AHT20 for high-precision temperature and humidity data.
- **Display**: 16x2 Character LCD for local status feedback.
- **Outputs**: SPDT Relays (12V, 240V/7A) for controlling high-voltage appliances.

The PCB was designed using Altium Designer, following professional standards for power path strengthening, signal integrity, and thermal management.

## Firmware and Logic Design

The software is developed in Embedded C using the PlatformIO IDE and the avr-gcc compiler. Rather than relying on a heavy RTOS, the project implements a custom, non-blocking state machine and a task scheduler. This architecture ensures that the system remains responsive while handling multiple concurrent operations, such as monitoring the GSM UART buffer, updating the LCD, and polling sensors.

**Technical highlights of the firmware include:**
- **Non-blocking GSM Driver**: Handles initialization, signal strength monitoring, and SMS parsing without halting the main loop.
- **State Machine Management**: Manages system transitions between idle, processing, and error states.
- **Command Parsing**: Includes robust string handling to interpret SMS commands and generate confirmation replies.
- **Modular Structure**: Code is organized into logical libraries for the LCD, GSM, and relay control, facilitating easier debugging and expansion.

## Features and Capabilities

- **Remote SMS Control**: Toggle relays and query system status via standard text messages.
- **Local RF Interaction**: Support for 433MHz remote controls for immediate, local switching.
- **Environmental Monitoring**: Real-time display and reporting of temperature and humidity.
- **Visual Feedback**: The 16x2 LCD provides a live dashboard showing network registration, signal strength, and relay states.
- **Safety and Protection**: Integrated fusing and voltage indicators protect the circuitry from power surges and wiring errors.

## Educational Resource

One of the unique aspects of RCS_AVR is its role as an educational platform. The repository is linked to a detailed video series that walks through the entire lifecycle of the project—from conceptual design and schematic entry in Altium to soldering components and writing the final firmware. This makes it an excellent resource for engineers looking to understand the practical integration of GSM modules and microcontrollers in real-world applications.
