---
title: STM32 Inverter
summary: A 3-phase micro-inverter project based on the STM32F103C8 microcontroller.
  It utilizes Sinusoidal Pulse Width Modulation (SPWM) to generate three-phase signals
  with 120-degree phase shifts, featuring digital control for frequency, phase, and
  amplitude.
slug: stm32-inverter
codeUrl: https://github.com/Levitrevisan/STM32_Inverter
star: 37
lastUpdated: '2021-02-01'
rtos: cmsis
topics:
- cmsis
- grid-tied-solar
- power-electronics
- solar
- stm32f103
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32f4-digital-synthesizer
- stm32-pid-temperature-control-implementation
- esphome-deye-inverter
- kompressorklock
- infrared-remote-control-repeater
- ryattn-audio-relay-attenuator
---

## Overview

The STM32 Inverter project is a university-level implementation of a simple micro-inverter using the popular STM32F103C8 (Cortex-M3) microcontroller. The primary goal of the project is to generate a three-phase signal using Sinusoidal Pulse Width Modulation (SPWM) with a precise 120-degree phase difference between the phases. The system provides real-time control over the signal's frequency, phase, and amplitude through digital button inputs.

## Technical Implementation

The firmware is built using the STM32 Standard Peripheral Library and CMSIS. The core of the inverter's logic relies on a pre-calculated sine wave pattern generated via a MATLAB script. This pattern consists of 60 points representing a single cycle, which are used to update the PWM duty cycles within a timed interrupt routine.

### PWM Generation and Control

The project utilizes multiple hardware timers on the STM32 to manage the complex task of 3-phase SPWM generation:
- **TIM2 and TIM3**: These timers are configured to generate six PWM pulses. They handle the high-side and low-side signals for the three phases (R, S, and T).
- **TIM4**: This timer is dedicated to a periodic interrupt (approximately every 277 microseconds) that updates the duty cycles for each phase, effectively "stepping" through the sine table to create the AC waveform.

### User Interface and Interaction

The system includes a simple GPIO-based interface for manual adjustments:
- **Phase Control**: Buttons on PB6 and PB7 allow the user to increment or decrement the current position in the sine table, effectively shifting the phase.
- **Amplitude Control**: Buttons on PB8 and PB9 adjust an `amplitudeFactor` variable, which scales the PWM duty cycles to change the output voltage level.
- **Grid-Tie Features**: The project includes logic for reading a Zero Cross signal and controlling the phase based on that signal, laying the groundwork for grid-synchronization capabilities.

## Hardware Integration

The project is designed to interface with high-power modules, specifically referencing the Infineon CIPOS (Control Integrated Power System) Mini Inverter modules. The STM32 pins (PA0-PA3 and PA6-PA7) are mapped to provide the necessary PWM signals to drive the inverter bridge. Additionally, the project includes a toggleable LED on PC13 for status indication and a "Grid-Tie" mode toggle implemented via a long-press combination of the interface buttons.

## SPWM Generation with MATLAB

A unique aspect of this repository is the inclusion of a MATLAB script used to generate the reference values. By defining parameters such as the maximum PWM value, frequency, and the number of points per cycle, the script generates a C-style array that can be pasted directly into the firmware. This allows for easy tuning of the waveform resolution and carrier frequency to match specific hardware requirements.
