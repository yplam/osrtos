---
title: Dallas Formula Racing Embedded Onboarding
summary: A structured tutorial series designed for onboarding new members to the Dallas
  Formula Racing embedded systems team. It covers essential topics ranging from C
  programming and computer architecture to STM32 peripherals, RTOS concepts, and signal
  processing using industry-standard tools like CMake, OpenOCD, and the ARM toolchain.
slug: dallas-formula-racing-embedded-onboarding
codeUrl: https://github.com/DallasFormulaRacing/embedded-onboarding
star: 24
version: v1.1.f25
lastUpdated: '2026-01-16'
rtos: cmsis
topics:
- embedded-c
- learning-by-doing
- source
- stm32
- tutorial-exercises
isShow: false
createdAt: '2026-02-16'
updatedAt: '2026-02-16'
relatedProjects:
- learning-stm32
- rapid-embedded-systems-design-education-kit
- zephyr-rtos-tutorial-for-beginners
- introduction-to-soc-design-education-kit
- h-c-l-p-tr-nh-stm32f1
- mbed-os-unipg-samples-1
---

The Dallas Formula Racing Embedded Onboarding repository is a comprehensive educational resource designed to transition new members into the world of professional embedded systems development. Rather than providing a simple set of instructions, the project utilizes a structured learning progression inspired by Bloom’s Taxonomy, guiding students from basic conceptual understanding to the practical application of complex engineering principles.

The curriculum is explicitly designed to avoid "spoonfeeding," instead encouraging new members to engage deeply with technical manuals, datasheets, and vendor documentation. This approach ensures that members develop the independent problem-solving skills necessary for high-stakes automotive engineering.

### A Multi-Tiered Learning Path

The onboarding process is organized into seven distinct sections, each targeting a specific layer of the embedded stack:

- **Section 00 & 01: Fundamentals** - Focuses on the "bread and butter" of development—Git version control and the C language. It emphasizes critical embedded C concepts like pointers, memory management, and the use of `volatile` and `weak` keywords.
- **Section 02 & 03: Hardware Interfacing** - Transitions into hardware-software interaction. Students explore ARMv8 architecture, registers, and the linking process before moving on to communication protocols like CAN, I2C, and SPI. This section introduces the STM32 HAL (Hardware Abstraction Layer) and DMA (Direct Memory Access) for efficient data handling.
- **Section 04 & 05: Advanced Systems** - Covers high-level system design and low-level signal integrity. This includes the fundamentals of RTOS schedulers, task management, and concurrency, as well as analog-to-digital conversion and EMI mitigation techniques using CMSIS libraries.
- **Final Project** - The culmination of the course requires building a rudimentary data acquisition system that transmits information over UART, testing the student's ability to synthesize all previous modules.

### Modern Tooling and Environment

A key highlight of this project is its departure from traditional, heavy-weight vendor IDEs in favor of a modular, command-line-friendly toolchain. The project emphasizes a professional "industry-ready" stack, which includes:

- **VSCode**: Used as the primary text editor with `clangd` for language server support.
- **Build Systems**: Utilization of CMake and Ninja for project orchestration and build automation.
- **Toolchain**: The ARM GNU Toolchain (`gcc-arm-none-eabi`) for cross-compilation.
- **Debugging**: OpenOCD and ST-Link for flashing firmware and real-time debugging on hardware.

The tutorials are designed for POSIX-compliant environments, recommending WSL (Windows Subsystem for Linux) or MSYS2 for Windows users to ensure a consistent development experience across different operating systems.

### Hardware Integration

The tutorials are tailored for the STM32 ecosystem, specifically targeting the high-performance H7 series Nucleo boards. By utilizing the CMSIS libraries and OpenOCD for flashing and debugging, students gain hands-on experience with the tools required to maintain and develop the sophisticated electronics used in Formula-style racing vehicles. This practical focus ensures that upon completion, members are ready to contribute to the team's primary vehicle projects with a solid understanding of both the software and hardware constraints of the platform.
