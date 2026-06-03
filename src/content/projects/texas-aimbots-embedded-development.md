---
title: Texas Aimbots Embedded Development
summary: The core embedded software repository for the Texas Aimbots RoboMaster team,
  built on the Taproot framework and modm library. It provides a modular architecture
  for controlling various robot configurations using STM32 microcontrollers and FreeRTOS.
codeUrl: https://github.com/TAMU-Robomasters/aimbots-dev
isShow: false
rtos: freertos
libraries:
- modm
topics:
- robotics
- freertos
- cpp20
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- taproot
- arm-control-framework-acorns-rover
- aruw-main-control-board-mcb
- breeze
- enterprise-stm32-platform-development
- stm32-framework
---

## Powering the Texas Aimbots: An Inside Look at Their Embedded Stack

The Texas Aimbots, a RoboMaster team from Texas A&M University, maintains a sophisticated embedded development environment designed to handle the high-speed, high-stakes requirements of robotic combat. This repository, `aimbots-dev`, is the heart of their robots' intelligence, managing everything from chassis movement to advanced gimbal control and vision integration.

### A Modular Foundation with Taproot and modm

At the core of the project is **Taproot**, a specialized framework developed for RoboMaster robots. Taproot provides a structured way to manage tasks, hardware peripherals, and communication protocols. It sits atop **modm**, a highly efficient C++ library that acts as a hardware abstraction layer (HAL) for STM32 microcontrollers. This combination allows the team to write high-level robot logic without getting bogged down in low-level register configuration, while still maintaining the performance needed for real-time control loops. The system leverages **FreeRTOS** to handle multitasking, ensuring that critical control loops for motor PID and sensor fusion are never interrupted by lower-priority communication tasks.

### Architecture and Organization

The codebase is organized to support multiple robot types through a shared library of subsystems. Inside the `aimbots-src/src` directory, the project is divided into logical components:

*   **Robots**: Specific configurations for different competition units (e.g., Infantry, Hero, or Sentry).
*   **Subsystems**: Reusable components like gimbals, chassis, and shooters that can be shared across different robot platforms.
*   **Communicators**: Logic for handling CAN bus traffic, remote control inputs, and referee system data.
*   **Informants**: Modules that process raw sensor data to provide high-level state information to the rest of the system.

### Development Workflow and Tooling

The team utilizes a modern development stack to ensure code quality and ease of collaboration. The project uses **SCons** as its build system, which offers more flexibility than traditional Makefiles for complex C++ projects. For dependency management, they use **Pipenv** and **Poetry**, ensuring that all developers are working with the same toolchain versions.

Code quality is enforced through `clang-format` and a suite of unit tests located in the `test/` directory. The repository also includes a `.devcontainer.json`, allowing developers to spin up a pre-configured Linux environment with all necessary compilers and tools (like the ARM GCC toolchain) regardless of their host operating system. This containerized approach minimizes the "it works on my machine" problem common in embedded development.

### Getting Started

While the primary setup instructions are located in the internal documentation, the repository structure suggests a standard workflow for developers:

1.  **Environment Setup**: Install Python dependencies via `pipenv install` to prepare the build environment.
2.  **Configuration**: Use the build tools in `aimbots-src/build_tools` to extract or set the target robot type.
3.  **Compilation**: Compile the project using SCons, which links the Taproot framework and modm library against the robot-specific source code.
4.  **Deployment**: Flash the firmware to an STM32 board (commonly a DJI RoboMaster Type A or C board) using OpenOCD or a J-Link debugger, as evidenced by the `openocd.cfg` and `.jdebug` files in the repository.

This robust infrastructure allows the Texas Aimbots to iterate quickly, moving from high-level strategy changes to deployed code on the field in record time, ensuring their robots remain competitive in the arena.
