---
title: RT-Thread ART (Arduino RT-Thread)
summary: ART is an Arduino-compatible development platform based on the STM32F407VGT6
  microcontroller running the RT-Thread RTOS. It enables the parallel execution of
  multiple Arduino programs by leveraging RT-Thread's application module feature while
  maintaining hardware and software compatibility with the Arduino ecosystem.
codeUrl: https://github.com/RT-Thread/ART
siteUrl: http://en.rt-thread.org
isShow: false
rtos: rt-thread
libraries:
- lwip
topics: []
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- rtduino
- arduino-rt-thread-library
- arduino-freertos-library
- micro-ros-stm32-template
- seeed-arduino-freertos
- arduino-osek-with-erika-enterprise-ee
---

The RT-Thread ART (Arduino RT-Thread) project represents a powerful convergence between the user-friendly Arduino ecosystem and the robust capabilities of a professional Real-Time Operating System. Built around the high-performance STM32F407VGT6 ARM Cortex-M4 microcontroller, ART provides a platform that is hardware-compatible with Arduino shields while offering a significantly more advanced software environment.

## A High-Performance Hardware Foundation

At the heart of the ART board is the STM32F407VGT6, a 32-bit ARM Cortex-M4 CPU with a Floating Point Unit (FPU). Running at a maximum frequency of 168 MHz, it delivers 210 DMIPS, providing ample headroom for complex calculations and real-time tasks. The board is well-equipped with 1 Mbyte of Flash memory and 192+4 Kbytes of SRAM. Connectivity is a priority, with support for up to 3 UARTs, 2 SPIs, a CAN interface, and dual USB OTG ports. This hardware profile makes it suitable for demanding applications that outgrow traditional 8-bit or lower-end 32-bit Arduino boards.

## Parallel Arduino Execution via RT-Thread

What truly sets ART apart from standard Arduino clones is its software architecture. The platform runs the RT-Thread RTOS, which introduces a sophisticated feature: the application module. This allows the system to execute multiple Arduino programs in parallel. Unlike a standard Arduino sketch that follows a single `setup()` and `loop()` execution flow, ART can manage several independent modules simultaneously, managed by the RT-Thread scheduler. This multitasking capability allows developers to isolate different parts of their project—such as communication, sensor processing, and UI—into separate, concurrently running programs.

## Seamless Compatibility and Familiar Tools

The project maintains a high degree of compatibility with existing Arduino resources. The repository includes a dedicated IDE (located in the `ide/` directory) and a comprehensive set of libraries including EEPROM, Ethernet, SD, SPI, Wire, and Servo. These libraries are ported to work on top of the RT-Thread drivers, ensuring that standard Arduino code can be migrated with minimal effort.

For developers who prefer command-line tools, the project utilizes the SCons build system. The `software/basic` directory contains the core firmware and drivers, which can be compiled using a simple `scons` command as seen in the provided Makefiles:

```makefile
all:
	scons --max-drift=1 --implicit-deps-unchanged

clean:
	scons -c
```

## Getting Started with ART

The repository provides several examples to help users transition to this RTOS-powered Arduino environment. These range from the classic 'blink' sketch to more advanced examples involving C++ and ADK (Android Open Accessory Development Kit) support. The `software/cores/arduino` directory contains the implementation of the Arduino API, showing how the project maps standard functions like `digitalWrite()` and `analogRead()` to the underlying STM32 hardware via RT-Thread's device drivers.

By combining the ease of use of Arduino with the power of RT-Thread, the ART project offers a unique path for makers and professional engineers to build more complex, multi-threaded embedded applications without abandoning the libraries and hardware they already know.
