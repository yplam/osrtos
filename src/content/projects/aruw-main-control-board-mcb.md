---
title: ARUW Main Control Board (MCB)
summary: The ARUW Main Control Board (MCB) is the central firmware repository for
  the University of Washington's RoboMaster competition robots. It leverages the modm
  C++ HAL and the Taproot controls framework to manage complex systems including chassis
  drive, turret stabilization, and launcher mechanisms on the RoboMaster Development
  Board Type A.
codeUrl: https://github.com/uw-advanced-robotics/aruw-mcb
siteUrl: https://aruw.gitlab.io/controls/aruw-mcb/
isShow: false
rtos: ''
libraries:
- modm
topics:
- stm32
- modm
- robotics
- robomaster
- cpp
- vscode
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- texas-aimbots-embedded-development
- taproot
- arm-control-framework-acorns-rover
- breeze
- roarm-m2-robotic-arm-control-firmware
- stm32-starter-project-for-arch-max
---

The **ARUW Main Control Board (MCB)** project serves as the brain for the University of Washington’s advanced robotics team in the RoboMaster competition. This repository contains the firmware that directly operates the major systems of their robots, from the high-speed launcher wheels to the precision-controlled turrets and drive systems. Built primarily for the **RoboMaster Development Board Type A**, the project is a sophisticated example of modern embedded C++ development applied to competitive robotics.

### The Software Stack

At the heart of the MCB is a robust stack of libraries and tools designed for high-performance control. The project utilizes **modm**, a C++-native Hardware Abstraction Layer (HAL) that provides a clean interface to the underlying STM32 hardware. Layered on top of this is **Taproot**, a specialized RoboMaster controls framework developed by the ARUW team to handle the specific challenges of the competition, such as PID loops, state machines, and communication protocols.

To ensure code quality and consistency, the project employs a modern development environment including:
- **GCC Compiler**: For high-performance C++ builds.
- **OpenOCD**: For deploying and debugging firmware on hardware.
- **SCons**: A Python-based build system that manages complex build configurations.
- **Pipenv**: For managing Python dependencies required by the build tools.

### Versatile Robot Support

One of the most impressive features of the `aruw-mcb` repository is its ability to support multiple robot types from a single codebase. Whether the team is deploying code to a Standard robot, a Sentry, or a Hero, the build system allows for easy configuration. Developers can select the robot type directly within VSCode or via command-line arguments during the build process. Supported robot types include:
- `STANDARD_NULL` / `STANDARD_VOID`
- `DRONE`
- `ENGINEER`
- `SENTRY_ECLIPSE`
- `HERO_ZERO`

### Development and Workflow

The project is designed with developer experience in mind. It supports development within **Docker containers** to ensure environment parity across different operating systems. For those working on local machines, the project provides comprehensive setup guides for Linux, macOS, and Windows. 

The build process is streamlined through `scons`. For example, building and running tests—a critical part of their CI/CD pipeline—is as simple as:

```bash
pipenv shell
# Build for hardware
scons build
# Run automated tests on the host machine
scons run-tests
```

### Advanced Debugging and Tooling

For hardware interaction, the project supports both **ST-Link** and **J-Link** debuggers. It includes custom VSCode tasks and configurations that allow developers to switch between different build targets, such as "Test", "Sim", and "MCB". This flexibility ensures that developers can verify logic in a simulated environment before ever touching physical hardware.

Additionally, the project uses `lbuild` to manage `modm` modules. If a developer needs to add a new hardware dependency, such as a GPIO interface, they can simply update the `project.xml` and regenerate the HAL:

```xml
<module>modm:platform:gpio</module>
```

By combining professional-grade software engineering practices with specialized robotics frameworks, the ARUW MCB project provides a powerful foundation for the University of Washington's success in the RoboMaster arena.
