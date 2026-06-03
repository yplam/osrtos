---
title: Asynchronous Programming in MicroPython
summary: A comprehensive resource for asynchronous programming in MicroPython using
  the asyncio library. It provides documentation, tutorials, synchronization primitives,
  and hardware drivers optimized for high performance on bare-metal microcontrollers.
slug: asynchronous-programming-in-micropython
codeUrl: https://github.com/peterhinch/micropython-async
star: 813
lastUpdated: '2025-12-18'
rtos: ''
libraries:
- micropython
topics:
- asyncio
- embedded
- micropython
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- micropython-samples-and-drivers
- micropython-lib
- awesome-micropython
- awesome-circuitpython
- micropython-for-kendryte-k210-lobo-port
- rp2040-projects-by-armstrong-subero
---

## Overview

Asynchronous programming is a powerful paradigm for embedded systems, allowing microcontrollers to handle multiple tasks concurrently without the overhead of a traditional multi-threaded operating system. This repository, maintained by Peter Hinch, serves as the definitive guide and toolkit for using `asyncio` within the MicroPython ecosystem. 

MicroPython's `asyncio` is a subset of the CPython library, specifically rewritten and optimized for small code size and high performance on bare-metal targets. It enables developers to write non-blocking code that is both readable and efficient, making it ideal for IoT devices, sensor monitoring, and complex user interfaces.

## The Evolution to asyncio V3

The repository focuses on the modern implementation of asynchronous MicroPython, known as V3. This version represents a complete rewrite by Damien George (the creator of MicroPython) and is incorporated into all recent firmware builds. Unlike the now-obsolete `uasyncio` V2, the V3 implementation provides better compatibility with CPython syntax and improved scheduling efficiency.

## Key Resources and Components

The project is more than just a code library; it is a complete educational resource. The `v3` directory contains a wealth of materials designed to take a developer from basic concepts to advanced implementation:

- **Tutorials**: Comprehensive guides that explain the fundamental concepts of `async` and `await` in the context of microcontrollers.
- **Synchronization Primitives**: Implementations of essential concurrency tools such as Locks, Events, and Barriers, which are crucial for managing shared resources between coroutines.
- **Hardware Drivers**: Asynchronous drivers for various peripherals, allowing for non-blocking I/O operations with sensors, displays, and communication modules.
- **Applications and Demos**: Real-world examples showing how to structure complex asynchronous projects.

## Concurrency and Performance

Beyond basic task switching, the repository explores advanced concurrency techniques. This includes documentation on threading and multi-core coding, which are increasingly relevant as microcontrollers like the RP2040 and ESP32 become more prevalent. The goal is to provide developers with the tools to maximize the performance of their hardware while maintaining the simplicity of the Python language.

## Getting Started

For developers moving from standard synchronous code to asynchronous patterns, the repository provides a clear path forward. By utilizing the provided synchronization primitives and following the architectural patterns laid out in the tutorials, developers can build robust, responsive firmware. The resources are specifically tailored for bare-metal targets where memory is limited and timing is critical.
