---
title: CatPilot
summary: CatPilot is an open-source library and framework for drone autopilots, providing
  a platform-independent core based on the c-atom framework. It includes board support
  packages for STM32-based flight controllers, integration with FreeRTOS, and a POSIX-compliant
  API layer.
codeUrl: https://github.com/ctlst-tech/catpilot
siteUrl: https://docs.ctlst.app/uas-catpilot/intro.html
isShow: false
rtos: freertos
libraries: []
topics:
- autopilot
- c-atlas
- c-atom
- c-language
- control-systems
- ctlst
- ctlst-tech
- cube
- cubepilot
- drone
- eswb
- freertos
- mission-critical
- model-based-development
- scalable
- stm32
- uas
- uav
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- catpilot-autopilot-software-stack
- protoflight
- avem
- drone-stm32f1
- arduino-dronecan
- fpv-drone-stm32f411-flight-controller
---

CatPilot is a sophisticated open-source library designed specifically for drone autopilot systems. It serves as a foundational component of the broader `uas-catpilot` project, offering a modular and platform-independent approach to flight control software. At its heart, CatPilot leverages the `c-atom` framework, which provides the structural backbone for building complex embedded systems.

One of the standout features of CatPilot is its flexible operating system abstraction. While it primarily integrates with FreeRTOS, it doesn't just use the raw RTOS API. Instead, it provides a POSIX-compliant wrapper, making it easier for developers familiar with Linux or QNX environments to write portable code. This is evident in the repository structure, which includes a `FreeRTOS-Plus-POSIX` implementation, allowing for standard threading and synchronization primitives like `pthread`, `mqueue`, and `semaphore`.

### Project Architecture

The project is organized into several distinct layers to ensure modularity and portability:

*   **BSP (Board Support Package):** This layer contains the low-level drivers and hardware abstraction for specific autopilot hardware. It currently supports STM32-based systems, specifically the STM32H753 found in high-performance flight controllers like the "Cube".
*   **Atomics:** These are board-specific atomic functions and I/O operations that bridge the gap between the generic framework and the physical hardware, covering sensors, ODrive protocols, and u-blox GPS modules.
*   **OS Layer:** This includes the RTOS core (FreeRTOS), file system support (FatFS), and the POSIX API wrappers. It also provides essential services such as a CLI, serial bridges, and file management utilities (ls, cd, pwd, rm).
*   **c-atom:** The core framework that manages the software system's architecture and inter-component communication.

### Hardware Support

CatPilot is heavily optimized for modern flight control hardware. The build system includes configurations for the "Cube" (often used in Pixhawk-based systems) and custom "ctlst" boards. The BSP includes drivers for a wide array of sensors and peripherals common in the drone industry, including the ICM20602, ICM20948, IST8310 magnetometers, and MS5611 barometers.

### Getting Started

For developers looking to build or customize drone firmware, CatPilot is intended to be used as a submodule within a larger project. This modularity allows the core autopilot logic to remain separated from the specific application code, facilitating easier updates and better code maintenance. 

Because it uses CMake, integrating CatPilot into a build pipeline is straightforward. The project structure encourages a clean separation between the hardware-specific code (BSP) and the high-level control logic, making it a robust choice for researchers and commercial drone developers alike who need a reliable, POSIX-like environment on top of a real-time kernel.
