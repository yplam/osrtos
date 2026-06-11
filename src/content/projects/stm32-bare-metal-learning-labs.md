---
title: STM32 Bare-Metal Learning Labs
summary: A collection of bare-metal C++ experiments for the STM32F411 (Black Pill)
  microcontroller, focusing on register-level programming without vendor abstraction
  layers. It utilizes CMSIS for hardware access and features implementations of DMA,
  USART, I2C, and SPI drivers using finite state machines and non-blocking logic.
slug: stm32-bare-metal-learning-labs
codeUrl: https://github.com/feraleagle/bare-metal-stm32f411-labs
lastUpdated: '2026-02-28'
image: /202606/bare-metal-stm32f411-labs_0.avif
rtos: cmsis
topics:
- bare-metal
- c
- cortex-m4
- cpp
- makefile
- stm32
- stm32f411
isShow: true
createdAt: '2026-06-11T00:55:53+00:00'
updatedAt: '2026-06-11T00:55:53+00:00'
---

The STM32F411, affectionately known as the "Black Pill," is a powerhouse of a microcontroller featuring an ARM Cortex-M4 core. While many developers reach for the STM32 HAL (Hardware Abstraction Layer) or LL (Low-Level) drivers to get up and running, there is a profound educational value—and often a performance gain—in stripping away these layers. The STM32 Bare-Metal Learning Labs project serves as a structured journey into the heart of the silicon, demonstrating how to interface with peripherals at the register level.

This collection is built on the philosophy of "silicon exploration." By avoiding vendor-provided abstraction layers, the developer gains a direct understanding of how DMA, Timers, GPIOs, and the NVIC (Nested Vectored Interrupt Controller) interact. This isn't just about learning the registers; it's about mastering the underlying architecture of the MCU to write more efficient and predictable firmware.

### The Power of C++ in Bare-Metal

One of the standout features of this lab collection is its use of C++. While C remains the industry standard for embedded systems, these labs demonstrate how modern C++ features can enhance firmware without introducing bloat. By utilizing type safety, `constexpr` for compile-time optimizations, and templates for zero-cost abstractions, the project achieves a level of code clarity and robustness that is often difficult to maintain in pure C. This approach proves that C++ is not just viable for large firmware projects but is actually superior when managing complex peripheral configurations.

### A Guided Tour of Peripherals

The repository is organized into twelve distinct labs, each focusing on a specific peripheral or system concept. These range from fundamental building blocks to complex driver implementations:

- **Interrupts and Timers**: Starting with basic interrupt-driven binary counters and moving into PWM-based breathing effects.
- **Data Transfer**: Exploring the efficiency of DMA (Direct Memory Access) for array copying and circular-buffered USART communication.
- **Communication Protocols**: Implementing I2C and SPI from the ground up, including polling-based drivers and more advanced non-blocking, Finite State Machine (FSM) driven implementations.
- **Clock Management**: A dedicated lab for configuring the RCC (Reset and Clock Control) to push the HSE (High-Speed External) clock to 100MHz.
- **Sensor Integration**: Interfacing with the VL53L0X Time-of-Flight sensor, showcasing how to bridge bare-metal drivers with manufacturer-provided APIs.

### Technical Stack and Tooling

The environment is tailored for developers who prefer a lightweight, command-line-driven workflow. Using the `arm-none-eabi-gcc` toolchain and GNU Make, each project is self-contained. The build system integrates specific STM32 hardware drivers, startup assembly files, and Segger-based fault handling to manage the execution environment without a full operating system. 

Flashing is handled via OpenOCD, ensuring a "no-magic" approach where the developer understands every step of the compilation and linking process—from the startup assembly code to the final linker script execution. For those looking to move beyond abstraction layers and truly understand the STM32 architecture, these labs provide a clear, practical roadmap for professional-grade bare-metal development.
