---
title: get_irq_priority for RT-Thread
summary: A diagnostic package for RT-Thread that provides MSH commands to query and
  manage interrupt priorities on STM32 microcontrollers. It mimics the NVIC display
  found in Keil MDK's debug environment, allowing developers to view enabled interrupts,
  their names, and priority levels directly from the console.
slug: get-irq-priority-for-rt-thread
codeUrl: https://github.com/wdfk-prog/rt-thread-get_irq_priority
siteUrl: https://github.com/wdfk-prog/rt-thread-get_irq_priority
star: 2
version: V1.0.0
lastUpdated: '2024-10-06'
rtos: rt-thread
topics:
- cortex-m
- irq
- rt-thread
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-m-nuttx-custom-board-mod
- micropython-port-for-rt-thread
- mkdbg-embedded-crash-diagnostics-over-uart
- pico-rtic-template
- rt-thread-bsp-for-stm32f407vet6
- stm32f103-cmsis-peripheral-configuration
---

## Overview

The **get_irq_priority** package is a specialized diagnostic tool for the RT-Thread real-time operating system. It provides a set of FinSH/MSH (Micro-Shell) commands that allow developers to inspect the state of the Nested Vectored Interrupt Controller (NVIC) at runtime. By mimicking the interrupt display functionality found in the Keil MDK debugger, it offers a convenient way to verify interrupt configurations without needing to pause the processor or use an external debugger.

## Key Features

The primary goal of this package is to provide visibility into the system's interrupt management. It allows users to identify which interrupts are currently enabled, their assigned names, and their priority levels. 

**Core capabilities include:**
- **Multiple Display Modes**: View interrupts sorted by IRQ number or by priority level (lowest to highest).
- **Real-time Configuration**: Includes a 'set' command to modify interrupt priorities on the fly through the console.
- **CMSIS Integration**: Utilizes standard CMSIS query functions, ensuring software portability across different Cortex-M profile processors.
- **Familiar Interface**: The output format is modeled after the Keil5 NVIC debug window, making it intuitive for developers transitioning from traditional IDE-based debugging.

## Hardware and Platform Support

While the underlying logic leverages CMSIS functions applicable to most Cortex-M microcontrollers, the package currently includes specific header support for the STM32 series. It has been verified on several popular hardware platforms:
- **STM32H7**: Verified on H750
- **STM32F7**: Verified on F747
- **STM32F4**: Verified on F429
- **STM32F1**: Verified on F103

## Technical Implementation

The package integrates seamlessly into the RT-Thread ecosystem. It uses the `SConscript` build system and can be easily enabled via the RT-Thread Env tool or RT-Thread Studio. Once enabled, it registers the `nvic_irq` command with the MSH shell. 

The directory structure is organized for easy integration:
- `inc/`: Contains interrupt name definitions for specific STM32 families.
- `src/`: Contains the core logic in `get_irq.c`.
- `SConscript`: Handles the automated build process within the RT-Thread environment.

## Getting Started

Once the package is added to an RT-Thread project and the console is initialized, several commands become available:

- `nvic_irq`: Displays enabled interrupts sorted by IRQ number.
- `nvic_irq num`: Displays enabled interrupts with numerical sorting.
- `nvic_irq priority`: Displays interrupts sorted by priority level.
- `nvic_irq set <IRQ_NUM> <PRIORITY>`: Dynamically sets the priority for a specific interrupt.

This tool is particularly useful during the bring-up phase of a project or when debugging complex systems where multiple peripherals are competing for CPU time, helping to ensure that time-critical interrupts are correctly prioritized.
