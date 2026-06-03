---
title: PV Curve Tracer
summary: Firmware for a solar array curve tracer built on Mbed OS 6. It manages high-speed
  voltage sweeps and data acquisition through a three-threaded architecture, coordinating
  between onboard sensors, CAN-based external sensor boards, and a host PC for real-time
  PV curve visualization.
slug: pv-curve-tracer
codeUrl: https://github.com/lhr-solar/PV-Curve-Tracer
star: 1
lastUpdated: '2022-05-02'
rtos: mbed-os
topics:
- c
- cpp
- mbed-os
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- openept-energy-profiler-probe-firmware
- move-on-helium-sensors
- stm32l476g-discovery-rtos-sensor-project
- oscilloscope-rp2040
- power-pico
- nanovna-x-enhanced-firmware-for-nanovna-h-h4
---

## Overview

The PV Curve Tracer is a specialized firmware project designed to drive the hardware responsible for characterizing solar panel performance. By sweeping the output voltage of a solar array and measuring the resulting current, the system generates an I-V (current-voltage) curve, which is essential for determining the efficiency and health of photovoltaic modules. 

Developed by the LHR Solar team, this software is part of a larger ecosystem that includes the Array-CurveTracerPCB and various 'Blackbody' sensor boards for measuring ambient conditions like irradiance and temperature. The firmware is built on Mbed OS 6, leveraging its real-time capabilities to ensure precise timing during experimental sweeps.

## Multi-Threaded Architecture

To maintain system responsiveness while performing time-critical measurements, the firmware employs a sophisticated three-thread scheme:

*   **Primary Thread (Input Processing):** This thread handles initialization and manages inbound communication. It captures messages from external devices, such as Blackbody sensor boards via CAN or commands from a host PC via USART/USB.
*   **Secondary Thread (Experiment Execution):** This is the 'firm real-time' core of the system. It remains idle until a test profile is defined. Once active, it executes the voltage sweep by updating the DAC, waiting for sensor stabilization, and sampling current and voltage data. It uses a semaphore-based notification system to trigger experiments.
*   **Tertiary Thread (Event Queue):** Acting as a serialized processor for outbound events, this thread handles tasks that have soft real-time deadlines or cannot be executed within an Interrupt Service Routine (ISR) context, such as transmitting results back to the user.

## Operational Workflow

A typical experiment begins when the primary thread receives a valid test profile from a PC. This profile defines the start voltage, end voltage, and voltage resolution. The secondary thread then takes control, signaling the start of the scan via an onboard LED. 

The system iterates through the following cycle until the sweep is complete:
1. The Digital-to-Analog Converter (DAC) is updated to a new target voltage.
2. The system pauses to allow sensor data to stabilize.
3. Onboard sensors sample the resulting current and voltage.
4. Data is calibrated and packaged into a result structure.
5. The event queue is notified to transmit the data point to the host application.

During this process, the firmware can simultaneously process asynchronous data from Blackbody sensor boards. These external measurements (irradiance and temperature) are assigned logical timestamps relative to the current sweep, providing a complete environmental context for the PV curve.

## Communication Protocols

The project implements robust communication over both CAN and Serial interfaces. The CAN protocol is primarily used for interfacing with the Blackbody line of sensors, supporting measurements for temperature and irradiance at frequencies up to 10 Hz. 

For PC interaction, a custom serial protocol is used over USB USART. This protocol uses a bitmapped format for efficiency, allowing the user to define complex test regimes and receive high-resolution measurement data. The firmware also includes a comprehensive error-handling scheme, where critical exceptions trigger a software halt and broadcast predefined error codes to assist in debugging hardware or communication failures.

## Technical Requirements

The project is designed to be compiled with Mbed OS 6 and depends on the `Mbed-Shared-Components` library for standardized message and error IDs. It is intended to be used with the Heliocentric visualizer application (a fork of DeSeCa) for real-time data plotting and analysis.
