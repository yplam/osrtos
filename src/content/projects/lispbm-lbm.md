---
title: lispBM (LBM)
summary: An embeddable Lisp/Scheme-like programming language designed for microcontrollers
  and embedded systems. It features Erlang-inspired concurrency, message passing,
  and process monitoring, supporting platforms like STM32, ESP32, and NRF52 running
  on FreeRTOS, Zephyr, or ChibiOS.
slug: lispbm-lbm
codeUrl: https://github.com/svenssonjoel/lispBM
siteUrl: https://www.lispbm.com
star: 116
version: old_parser
lastUpdated: '2025-12-29'
rtos: freertos
topics:
- chibios
- concurrency
- esp32
- freertos
- functional-programming
- interpreter
- language
- lisp
- microcontroller
- nrf52
- pattern-matching
- programming-language
- quasiquotation
- repl
- riscv32
- stm32f4
- zephyr
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lua-rtos-for-esp32
- atome-lm
- pikapython
- micropython-esp32-ulp
- micropython-and-lvgl-firmware-for-esp32
- pycopy
---

## Overview

lispBM (LBM) is an embeddable Lisp or Scheme-like programming language specifically engineered for microcontrollers. It distinguishes itself from other embedded scripting languages by borrowing powerful concepts from Erlang, particularly in the realms of concurrency, message passing, pattern matching, and process monitoring. Designed to be integrated into larger C-based applications, lispBM provides a sandboxed environment for scripting complex logic on resource-constrained hardware.

The runtime system is highly portable, capable of being compiled for both 32-bit and 64-bit architectures. It is designed to run on a wide variety of hardware, including STM32 (Cortex-M4), NRF52, ESP32, and even standard X86 Linux systems. When deployed on microcontrollers, lispBM can operate on top of popular Real-Time Operating Systems (RTOS) such as ChibiOS, FreeRTOS, or ZephyrOS, or it can run directly on bare-metal for maximum performance.

## Key Features & Capabilities

- **Erlang-Inspired Concurrency**: lispBM supports concurrent processes with independent mailboxes, allowing for robust message-passing architectures within an embedded context.
- **Continuation-Passing Style (CPS) Evaluator**: The core engine uses a CPS evaluator, which facilitates non-blocking execution and easy implementation of advanced control flow like `call-cc`.
- **Flexible Memory Management**: The system includes a sophisticated heap management system with multiple garbage collection strategies, including copying GC and reverse pointer GC, which are essential for long-running embedded applications.
- **Extensible Architecture**: Developers can easily extend the language by adding "extensions"—C functions that can be called directly from LispBM scripts, allowing for seamless hardware abstraction and performance-critical logic implementation.
- **Rich Data Types**: Beyond standard Lisp lists, LBM supports byte buffers, arrays (both byte and Lisp-cell based), and defragmentable memory pools.

## Technical Architecture

The lispBM project is structured to be modular and platform-independent. The core components include:

- **Evaluator (`eval_cps.c`)**: The heart of the runtime that processes expressions.
- **Heap (`heap.c`)**: Manages memory allocation and garbage collection.
- **Parser (`tokpar.c`)**: Handles tokenization and parsing of Lisp source code.
- **Symbols (`symrepr.c`)**: Manages symbol representation and interning to save memory.
- **Extensions System**: A dedicated framework for integrating C-side functionality, with built-in support for math, strings, arrays, and even display/font rendering (TTF).

## Hardware and RTOS Integration

lispBM is built to be agnostic of the underlying OS but provides specific platform layers for common embedded environments. The build system includes configurations for:
- **STM32F4**: Utilizing ChibiOS for threading and HAL support.
- **NRF52840**: Targeting Nordic's Bluetooth-enabled SoC.
- **ESP32**: Often used in conjunction with the VESC-Tool and VESC Express firmware for high-level motor control and IoT applications.
- **Zynq**: Targeting Xilinx's SoC architecture.

## Getting Started

For developers looking to experiment with lispBM, the project provides a REPL (Read-Eval-Print Loop) that runs on Linux. This allows for rapid prototyping of Lisp logic before deploying to hardware. On the embedded side, the easiest entry point is often through the VESC-Tool IDE, which provides a complete environment for Lisp programming on ESP32-C3 hardware.

Integrating lispBM into a C project typically involves initializing the runtime and then loading scripts via the provided C API:

```c
#include "lispbm.h"

// Initialize the system with a specific heap size
if (lbm_init(heap_memory, heap_size, extension_memory, extension_size)) {
    // Load and evaluate a program
    lbm_load_and_eval_program(program_string);
}
```

The language reference provides a comprehensive set of functions for list manipulation, arithmetic, bitwise operations, and concurrency primitives like `spawn`, `send`, and `recv`.
