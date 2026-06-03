---
title: TinyOS-nesC TelosB Programs
summary: A collection of nesC applications developed for the TinyOS operating system,
  specifically targeting the TelosB mote platform. The project includes environment
  setup scripts for the MSP430 toolchain and TinyOS core components.
slug: tinyos-nesc-telosb-programs
codeUrl: https://github.com/nivu/TinyOS-nesC
star: 4
lastUpdated: '2019-06-19'
rtos: tinyos
topics:
- cc2420
- tinyos
- wsn
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- tinyos-apps-for-msp430f5529
- homebrew-tinyos-for-msp430
- tinyos-role-for-ansible
- atmega128rfa1-tinyos-kth-wsn-project
- mongoose-os-programs-and-examples
- tinyos-for-msp430
---

## Overview

TinyOS-nesC is a repository dedicated to developing applications for the TelosB mote using the TinyOS operating system. TinyOS is a well-known component-based, event-driven operating system designed specifically for low-power wireless devices, such as those used in sensor networks. The applications in this repository are written in nesC, a dialect of C that supports the TinyOS component model.

## Hardware Platform: TelosB Mote

The primary target for these programs is the TelosB mote. This platform is a popular choice in the research community for wireless sensor networks (WSN). It is based on the MSP430 microcontroller and features an IEEE 802.15.4 compliant radio, making it ideal for low-power communication and environmental monitoring tasks.

## Technical Environment and Tooling

Developing for TinyOS requires a specific toolchain that bridges high-level component descriptions with low-level hardware execution. This project provides a setup script, `tinyos.sh`, which automates the installation of the necessary dependencies on a Linux environment. Key components of the toolchain include:

- **nesCC**: The nesC compiler that translates component-based code into standard C code for the target microcontroller.
- **gcc-msp430**: The GNU compiler collection for the MSP430 architecture, used to compile the output from nesCC into binary format.
- **TinyOS Main**: The core TinyOS repository which provides the system-level components and hardware abstraction layers (HAL).
- **PySerial**: Used for communication between the host computer and the TelosB mote via USB.

## Project Structure

The repository is organized to facilitate the development and deployment of sensor network applications:

- **apps/**: This directory contains the source code for various nesC applications. These typically include a configuration file (ending in `.nc`) that wires components together and a module file that implements the application logic.
- **tinyos.sh**: A comprehensive shell script that handles the installation of Java (OpenJDK 8), build essentials, and the TinyOS source tree, ensuring a consistent development environment.

## Getting Started

To use these programs, developers typically need to set up the TinyOS environment using the provided shell script. Once the environment is configured and the `TINYOS_ROOT` is set, applications can be compiled using the TinyOS build system (usually via `make telosb`). This process involves the nesC compiler analyzing the component graph, optimizing the code, and generating a firmware image that can be flashed onto the TelosB hardware.
