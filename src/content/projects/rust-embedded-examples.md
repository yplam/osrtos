---
title: Rust Embedded Examples
summary: A collection of embedded Rust projects utilizing the stm32f1xx-hal crate
  and the Real-Time Interrupt-driven Concurrency (RTIC) framework. Targeted at the
  NUCLEO-F103RB development board, these examples demonstrate various peripheral interactions
  including GPIO, USART, and PWM.
slug: rust-embedded-examples
codeUrl: https://github.com/hbacelar8/rust-embedded-examples
star: 10
lastUpdated: '2021-07-01'
rtos: rtic
topics:
- rtic
- rust-embedded
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rust-for-arduino-portenta-h7
- stm32f4-rtic-playground
- uart-communication-between-nrf52840-and-stm32f401-nucleo
- chibios-rt-examples-for-stm32f401re-nucleo
- b-l475e-iot01a-discovery-board-support-crate
- pico-rtic-template
---

Rust has become a powerful contender in the embedded systems world, offering memory safety and modern tooling for microcontrollers. This repository serves as a practical guide for developers looking to explore embedded Rust on the STM32 platform, specifically targeting the NUCLEO-F103RB development board.

The project showcases a progression from low-level register manipulation to high-level abstraction using the `stm32f1xx-hal` crate and the Real-Time Interrupt-driven Concurrency (RTIC) framework. RTIC is particularly notable here; it provides a concurrency model that leverages the hardware's nested vectored interrupt controller (NVIC) to ensure efficient, race-free execution of tasks.

## Diverse Embedded Scenarios

The examples are structured to help developers understand different layers of the embedded stack through practical implementation:

- **Hardware Abstraction**: The "blink" examples contrast direct peripheral access with the use of a Hardware Abstraction Layer (HAL), illustrating how crates like `stm32f1xx-hal` simplify development while maintaining performance.
- **Serial Communication**: Multiple projects explore USART2 communication, ranging from simple echo programs to complex protocols that control RGB LEDs and buzzers. These examples demonstrate both polling and interrupt-driven I/O patterns.
- **Real-Time Concurrency**: The RTIC-based examples show how to manage multiple peripherals—such as LCD displays and LEDs—within a structured framework that handles task prioritization and shared resources safely.

## Target Hardware

All examples are designed for the NUCLEO-F103RB, which features the STM32F103RB microcontroller (ARM Cortex-M3). This makes it an excellent resource for anyone working with the popular STM32F1 series. Each example is organized as a standalone project, allowing developers to build and flash them independently to experiment with specific features.

## Technical Implementation

The repository demonstrates several key concepts in the Rust embedded ecosystem:
- **Zero-cost abstractions**: Using the HAL to manage pins and clocks without significant overhead.
- **Interrupt Handling**: Implementing serial communication protocols that respond to hardware events rather than wasting CPU cycles on polling.
- **Resource Management**: Using RTIC to share peripherals between different tasks without the risk of data races, a core benefit of the Rust ownership model in an embedded context.

For those new to the ecosystem, the repository serves as a companion to "The Embedded Rust Book" and the RTIC documentation. By studying these examples, developers can learn how to implement serial protocols, manage PWM for hardware control, and architect robust embedded applications using Rust's unique safety guarantees.
