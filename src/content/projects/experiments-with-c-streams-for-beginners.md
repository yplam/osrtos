---
title: 'Experiments with C: Streams for Beginners'
summary: A comprehensive collection of C programming experiments and educational materials
  covering embedded systems, Linux kernel modules, and network protocols. The project
  targets platforms ranging from AVR (ATmega, ATtiny) and ESP32 (using FreeRTOS and
  LwIP) to standard Linux environments, focusing on practical implementations of SPI,
  ePaper displays, and socket programming.
slug: experiments-with-c-streams-for-beginners
codeUrl: https://github.com/olgapavlova/lectures
lastUpdated: '2026-03-27'
licenses:
- NOASSERTION
rtos: freertos
libraries:
- lwip
- parson
topics:
- avr
- c
- driver
- esp32
- kernel
- linux
- patterns
- stm32
isShow: false
createdAt: '2026-04-02T03:43:14+00:00'
updatedAt: '2026-04-02T03:43:14+00:00'
---

Programming in C is often taught through abstract exercises, but this repository takes a different approach by exploring the language through live experiments and real-world hardware interactions. Developed as a companion to a series of educational live streams, this collection serves as a deep dive into what is possible with C, covering everything from low-level bit manipulation to high-level network communication.

## A Multi-Platform Laboratory

The repository is structured as a series of standalone experiments, each targeting a specific technology or concept. The breadth of hardware and environments supported is a testament to the versatility of the C language:

*   **ESP32 & ESP-IDF**: Utilizing the ESP32-C3 and S3, several projects leverage the **FreeRTOS** kernel and **LwIP** stack for IoT applications. These include secure storage, SPI flash communication, and network-enabled dashboards.
*   **AVR Microcontrollers**: From the ubiquitous ATmega328p (Arduino Uno) to the minimalist ATtiny13 and ATtiny85, the repository explores bare-metal development using the AVR-GCC toolchain. Projects here include shift register control, PWM-based timers, and custom firmware for small-scale automation.
*   **Linux Kernel Space**: A significant portion of the project is dedicated to writing Linux kernel modules. This includes character device drivers, custom memory allocators (`kalloc`), and low-level hardware abstractions.
*   **Desktop Linux & POSIX**: For higher-level concepts, the project utilizes standard Linux APIs for multi-threading (pthreads), socket programming, and terminal user interfaces via ncurses.

## Key Technical Explorations

### Embedded Hardware Interfacing
The project provides practical examples of driving hardware peripherals. The `eboard` module focuses on two-color ePaper displays and their drivers, while the `flash` and `cstore` modules demonstrate how to interact with SPI-based storage and implement encryption on microcontrollers. For those interested in the fundamentals of digital logic, the `shiftreg` experiment provides a non-physicist's perspective on controlling shift registers.

### Networking and Data Protocols
Connectivity is a major theme, with experiments ranging from raw socket programming to modern web standards. The project demonstrates how to use `libcurl` for HTTP requests and implements OAuth 2.0 flows for cloud integration. Data serialization is handled using the **Parson** library for JSON parsing, showing how to manage structured data in resource-constrained environments.

### Systems Programming Fundamentals
Beyond hardware, the repository serves as a tutorial for advanced C concepts. This includes:
*   **Memory Management**: Exploring `malloc` implementations and kernel-level memory allocation strategies.
*   **Concurrency**: Using POSIX threads and synchronization primitives to handle multi-threaded tasks.
*   **Type Systems**: Deep dives into C `unions` for binary data manipulation and implementing polymorphism in C.
*   **Documentation and Testing**: Integrating Doxygen for automated documentation and setting up unit testing frameworks for C code.

## Educational Context

Each directory in the repository corresponds to a specific lecture or stream, providing a snapshot of the code developed in real-time. This makes it an excellent resource for developers who want to see how C code evolves from a basic concept to a functional driver or application. The inclusion of Makefiles and CMake configurations for each sub-project ensures that the experiments are reproducible across different toolchains, whether using `idf.py` for Espressif chips or standard `gcc` for Linux utilities.
