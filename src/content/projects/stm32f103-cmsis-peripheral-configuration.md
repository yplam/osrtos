---
title: STM32F103 CMSIS Peripheral Configuration
summary: A collection of low-level peripheral configuration examples for the STM32F103
  microcontroller using the CMSIS library. It provides direct register-level implementations
  for GPIO, DMA, SPI, UART, PWM, and NVIC interrupts, serving as a lightweight alternative
  to the STM32 HAL.
slug: stm32f103-cmsis-peripheral-configuration
codeUrl: https://github.com/Mohammadsafarisouri/stm32f103CMSIS
star: 1
lastUpdated: '2019-06-28'
rtos: cmsis
topics:
- arm
- cmsis
- cortex-m3
- keil
- stm32f013
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32f103-cmsis-libraries-and-projects
- stm32f103rb-templates-and-examples
- stm32-cmsis-zero-to-hero
- stm32-cmsis-libraries
- stm32f4-cmsis-lessons
- stm32-cortex-m4-code-examples
---

The stm32f103CMSIS repository provides a comprehensive set of low-level peripheral configuration examples for the STM32F103 series of microcontrollers. By leveraging the Cortex Microcontroller Software Interface Standard (CMSIS), this project demonstrates how to interface with hardware registers directly, offering a lightweight and efficient alternative to higher-level abstraction layers like the STM32 HAL.

The project is organized into several modules, each focusing on a specific peripheral or hardware feature. This modular approach makes it an excellent resource for developers looking to understand the underlying hardware mechanics of the ARM Cortex-M3 architecture and how to write firmware that is both performant and resource-efficient.

### Key Peripheral Implementations

The repository covers a wide range of essential microcontroller functionalities, providing practical code for common embedded tasks:

- **Communication Interfaces**: Examples include both SPI and UART. The UART implementation is demonstrated using multiple methods, including standard polling and interrupt-driven communication via the NVIC (Nested Vectored Interrupt Controller).
- **Data Transfer**: The project highlights the use of Direct Memory Access (DMA) to offload data transfer tasks from the CPU. This is specifically demonstrated in conjunction with the ADC (for temperature sensing) and SPI peripherals, showing how to achieve high-speed data movement without CPU intervention.
- **Timers and PWM**: It includes configurations for general-purpose timers and Pulse Width Modulation (PWM) generation, which are critical for motor control, LED dimming, and timing-sensitive applications.
- **System Fundamentals**: Basic building blocks such as GPIO configuration and the Systick timer are provided, forming the foundation for more complex application logic.

### Technical Approach

Unlike projects that rely on the STM32 Cube HAL, this repository focuses on the CMSIS library. CMSIS provides a vendor-independent hardware abstraction layer for the Cortex-M processor series. By using CMSIS, the code interacts more closely with the hardware registers. This approach results in smaller binary sizes and reduced execution overhead, which is often a requirement in resource-constrained embedded environments.

### Use Cases and Learning

This collection is particularly useful for developers who want to move beyond high-level libraries and gain a deeper understanding of how the STM32 hardware actually works. It serves as a reference for:

- Learning register-level programming for ARM Cortex-M microcontrollers.
- Developing high-performance firmware where the overhead of the HAL is undesirable.
- Implementing efficient interrupt-driven or DMA-based drivers.
- Porting code between different Cortex-M microcontrollers using standardized CMSIS definitions.

Each directory within the repository serves as a standalone example, allowing developers to pick and choose the specific peripheral logic they need for their own embedded systems projects.
