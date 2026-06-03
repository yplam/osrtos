---
title: LFR Flight Software
summary: The flight software for the Low Frequency Receiver (LFR) instrument on the
  ESA Solar Orbiter mission. It runs on a LEON3-FT processor using RTEMS 4.10 to manage
  data processing, telemetry, and housekeeping. The system leverages an FPGA-based
  SoC for high-speed digital filtering and spectral matrix computation.
slug: lfr-flight-software
codeUrl: https://github.com/LaboratoryOfPlasmaPhysics/LFR_Flight_Software
siteUrl: https://rpw.lesia.obspm.fr/rpw-instrument/
star: 6
version: 3.3.0.16
lastUpdated: '2023-03-04'
rtos: rtems
topics:
- cnes
- cnrs
- embedded
- esa
- leon3
- lpp
- rad-hard
- rpw
- rtems
- solar-orbiter
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- filtered-inertial-rotation-module-firm
- alturia-firmware
- project-shadow-flight
- floripasat-obdh-on-board-data-handling
- suchai-flight-software
- pv-curve-tracer
---

## Overview

The Low Frequency Receiver (LFR) flight software is a critical component of the Radio Plasma Wave (RPW) instrument aboard the ESA Solar Orbiter mission. Launched in February 2020, Solar Orbiter is designed to study the Sun and its environment in unprecedented detail. The LFR subsystem specifically measures electric and magnetic fields from quasi-DC to 10 kHz, providing essential data about the solar wind and the Sun's magnetic field.

This repository contains the source code responsible for controlling the instrument, acquiring scientific data, and managing communication with the RPW Data Processing Unit (DPU). Given the harsh environment of space, the software is built for high reliability and performance under strict resource constraints.

## Hardware and Architecture

The LFR flight software is designed to run on a LEON3-FT (Fault Tolerant) CPU. This processor is implemented within an RTAX-4000D FPGA. Because the CPU operates at a relatively low clock speed of 25MHz, the system architecture relies heavily on hardware acceleration. 

The design utilizes a custom System-on-Chip (SoC) within the FPGA to handle computationally intensive tasks that would overwhelm the CPU. This includes:
- **Digital Filtering**: Implementing various filters to produce aliasing-free data flows.
- **Signal Processing**: Generating waveform snapshots, performing Fast Fourier Transforms (FFTs), and computing spectral matrices.
- **DMA Management**: Using a custom DMA library to write snapshots and matrices directly into CPU memory, minimizing processor overhead.

By offloading these high-speed data processing tasks to the FPGA, the CPU is freed to focus on higher-level logic, such as averaging spectral matrices, computing basic parameters, and handling telemetry.

## Software Stack

The project utilizes **RTEMS 4.10** as its Real-Time Operating System. RTEMS provides the multitasking capabilities necessary to balance data processing, housekeeping tasks, and telemetry handling. The software is written primarily in C, with specific modules dedicated to different instrument functions:

- **Processing**: The `spectralmatrices.c` file handles the averaging, compression, and calibration of spectral data.
- **Telecommands**: SpaceWire telecommands are managed via `tc_handler.c`.
- **Hardware Interfacing**: Waveform DMA accelerators are controlled through `wf_handler.c`.
- **Science Logic**: Basic parameter computations are located in `basic_parameters.c`.

## Build System and Development

The project supports multiple build systems, including **Meson** and **CMake**. The preferred modern workflow uses Meson with Ninja, targeting the SPARC cross-compiler. To ensure environment consistency, the development team provides a Docker image containing the necessary toolchains. 

```bash
meson setup -Dlpp-destid=false -Doptimization=s --cross-file=sparc-cross.ini . build
cd build
ninja
```

## Mission History and Updates

The software has evolved since the mission's launch. The baseline version (3.2.0.24) was used from launch until early 2023. The subsequent release (3.3.0.16) introduced critical bug fixes and calibration matrices to correct for effects such as antenna misalignment, ensuring the continued accuracy of the scientific data returned from the probe.
