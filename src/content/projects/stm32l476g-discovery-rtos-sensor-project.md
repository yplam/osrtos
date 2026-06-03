---
title: STM32L476G-Discovery RTOS Sensor Project
summary: A multi-threaded embedded application for the STM32L476G-Discovery board
  using CMSIS-RTOS2 (RTX). The project integrates gyroscope, accelerometer, and magnetometer
  data with an LCD interface and real-time clock, demonstrating advanced RTOS features
  like mutexes, message queues, and event flags.
slug: stm32l476g-discovery-rtos-sensor-project
codeUrl: https://github.com/JLewinski/OSProject
star: 1
lastUpdated: '2019-04-26'
rtos: cmsis
topics:
- auburn
- cmsis
- cmsis-os2
- elec5260
- elec6260
- embedded
- vscode
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- azurertos-dual-core-implementation-for-stm32h747
- erikaos-real-time-watch
- lvgl-demo-embarcadores
- h747-weighing-station
- practice-project-for-stm32f746g-discovery
- h747-camera-dual-core-stm32h747-camera-and-display-system
---

The OSProject repository showcases a comprehensive implementation of a real-time operating system on the STM32L476G-Discovery board. Developed as a final project for Auburn University's RTOS course, it leverages the ARM CMSIS-RTOS2 (RTX) framework to manage complex hardware interactions across multiple concurrent threads.

### System Architecture and Threading

The project is structured around eight distinct RTOS threads, each handling specific tasks from sensor data acquisition to user interface management. The `app_main` thread serves as the orchestrator, initializing state variables and spawning the worker threads before terminating.

Sensor data is handled by three dedicated threads: `gyro`, `acc`, and `mag`. These threads poll the L3GD20 3-axis gyroscope and the LSM30CTR 3D magnetometer/accelerometer every 50ms. To prevent race conditions during data access, these threads utilize a `dataMutex`, ensuring that only one thread modifies or reads the sensor state at any given time.

### Data Processing and Feedback

A `compute` thread analyzes the acquired sensor data. It determines the polarity of specific values based on the user's current selection (sensor and dimension). This thread provides visual feedback via the board's LEDs: a green LED indicates positive values, while a red LED indicates negative values. If the value is zero, both LEDs are extinguished.

The system also includes a real-time `clock` thread. This thread maintains a second-counter (up to 99 seconds) and communicates with the display system using a `messageQueue` (specifically `clockPrintQueue`). This demonstrates inter-thread communication where time data is passed asynchronously to the display logic with a 500ms timeout to ensure the clock remains accurate even if the queue is temporarily blocked.

### User Interface and Display Management

The project utilizes the onboard LCD and Joystick for user interaction. The Joystick allows users to toggle the system's active state via the SEL button, switch between sensors using Up/Down, and cycle through dimensions (X, Y, or Z) using Left/Right. These inputs are handled via interrupts that signal the threads.

Display updates are split into two specialized threads:
- **printCharacters**: Updates the LCD with the current sensor type (GYR, ACC, MAG) and the active dimension. It uses thread flags triggered by joystick interrupts to update the display only when the state changes, optimizing CPU usage.
- **printTime**: Manages the final two digits of the LCD to display the clock value received from the message queue.

Both display threads coordinate access to the hardware using a `displayMutex`, preventing corruption of the LCD buffer when multiple threads attempt to write simultaneously.

### RTOS Features Demonstrated

This project serves as a practical exercise in modern RTOS primitives:
- **Mutexes**: Used for protecting shared sensor data and the LCD hardware resource.
- **Message Queues**: Facilitating data transfer between the clock and the display thread.
- **Event/Thread Flags**: Enabling efficient, interrupt-driven UI updates.
- **Kernel Timing**: The system clock is modified to use `osKernelTicks` for precise timing and delay management, replacing the standard HAL ticks.

The project is configured for the PlatformIO ecosystem, targeting the `disco_l476vg` board with the STM32Cube framework, making it a robust example of CMSIS-RTOS2 application development for ARM Cortex-M4 microcontrollers.
