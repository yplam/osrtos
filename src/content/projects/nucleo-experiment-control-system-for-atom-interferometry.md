---
title: Nucleo Experiment Control System for Atom Interferometry
summary: A specialized experiment control library for Atom Interferometry built on
  the STM32 NUCLEO-F746ZG platform using Mbed OS. It provides a scriptable, high-precision
  alternative to traditional LabVIEW and FPGA setups for managing complex timing sequences
  and hardware triggers.
slug: nucleo-experiment-control-system-for-atom-interferometry
codeUrl: https://github.com/lazyoracle/nucleo-expt
star: 0
lastUpdated: '2020-12-16'
rtos: mbed-os
topics:
- embedded-c
- embedded-systems
- mbed-os
- microwave-engineering
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mongoose-os-app-on-stm32f446re
- lal-control-for-mbed-os
- nrf52-mbed-pwm
- mbed-rpi-pico-timerinterrupt
- arm-control-framework-acorns-rover
- mbed-rp2040-pwm-library
---

## Overview

The Nucleo Experiment Control System is a library designed to replace the complex LabVIEW and FPGA setups commonly found in atomic physics laboratories. Developed for the STM32 NUCLEO-F746ZG and built using the ARM Mbed OS framework, this project provides a flexible and scriptable environment for controlling Atom Interferometry experiments.

The system is designed with three core philosophies in mind: ease of extension for new hardware, straightforward modification of experiment parameters without deep code changes, and scriptability to allow front-end interfaces to update the embedded software without manual IDE interaction.

## System Architecture

The codebase is organized into four distinct functional areas to ensure maintainability and clarity:

- **Hardware Mapping**: `pin_settings.h` defines all physical connections to the Nucleo board.
- **Timing Configuration**: `run_settings.h` and `sweep_settings.h` manage the experiment's temporal sequences.
- **Core Logic**: `main.cpp` executes the operational sequences.
- **Hardware Abstraction**: The `/drivers` directory contains specific drivers for daughter boards, such as the AD9959 Direct Digital Synthesis (DDS) chip.

## Operational Modes

The control system supports two primary modes of operation, which can be toggled by a single macro definition:

1.  **Standard Mode**: Used for normal experimental runs where the same timing and hardware settings repeat indefinitely.
2.  **Sweep Mode**: Designed for optimization phases, this mode allows various timing parameters to be swept across a fixed number of runs, enabling researchers to find ideal experimental conditions automatically.

## Hardware Interaction and Timing

The library configures the NUCLEO digital outputs into several specialized modes to interact with laboratory equipment:

- **Trigger**: Produces a pulse of a preset length (default 50µs) to advance downstream Finite State Machines (FSMs) in devices like cameras or shim coils.
- **Switch**: Provides fast On/Off control for various devices.
- **Communication**: Implements SPI and UART protocols for high-level communication with daughter boards.

A unique aspect of this system is its timing philosophy. Rather than using absolute timestamps, the settings define the time delay between the last operation of the current phase and the first operation of the next phase. Within a specific phase, settings list relative delays between subsequent operations, starting from zero. This relative timing makes it significantly easier to adjust specific segments of an experiment without recalculating the entire sequence timeline.

## Technical Implementation

The project is optimized for performance by utilizing the Mbed OS "bare-metal" profile. By including a `mbed_app.json` configuration that requires only the bare-metal components, the system excludes the standard RTOS overhead, ensuring more deterministic behavior for timing-sensitive physics experiments. It is compiled using the ARMC6 compiler and is compatible with the Mbed Studio development platform.

### Example Configuration

Timing settings are defined in a human-readable format within the header files, allowing for quick adjustments to AOM (Acousto-Optic Modulator) frequencies, amplitudes, and delays:

```cpp
// Example State-Preparation phase settings
int AOM_0_Freq_STATE_PREP = 82000000;
int AOM_1_Amp_STATE_PREP = 250;
int AOM_1_SW_STATE_PREP = 0;
int AOM_2_Delay_STATE_PREP = 1000; // 1ms delay
int STATE_PREP = 4000; // 4ms delay to the next phase
```

This structure allows researchers to focus on the physics of the experiment rather than the complexities of embedded programming, while still maintaining the precision required for atomic-scale measurements.
