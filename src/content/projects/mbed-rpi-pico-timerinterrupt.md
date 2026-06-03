---
title: MBED_RPI_PICO_TimerInterrupt
summary: A high-precision hardware timer interrupt library for RP2040-based boards
  using the Arduino-mbed core. It enables non-blocking, ISR-based timing and allows
  multiplexing up to 16 virtual timers from a single hardware timer resource.
slug: mbed-rpi-pico-timerinterrupt
codeUrl: https://github.com/khoih-prog/MBED_RPI_PICO_TimerInterrupt
star: 11
version: v1.2.0
lastUpdated: '2022-12-05'
rtos: mbed-os
topics:
- accuracy
- hardware-timers
- interrupt
- isr
- isr-based
- isr-based-timer
- mbed
- mbed-nano
- mbed-os
- mbed-rp2040
- mission-critical
- nano-rp2040-connect
- non-blocking
- raspberry-pi-pico
- raspberry-pi-pico-rp2040
- rp2040
- timerinterrupt
- timerinterrupt-library
- timers
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mbed-rp2040-pwm-library
- nrf52-mbed-pwm
- pico-rtic-template
- nucleo-experiment-control-system-for-atom-interferometry
- arduino-pico
- flexptp
---

## Overview

The MBED_RPI_PICO_TimerInterrupt library provides a robust solution for implementing hardware-based timer interrupts on RP2040 microcontrollers, including the Raspberry Pi Pico and Arduino Nano RP2040 Connect. By utilizing the underlying hardware timer peripherals of the RP2040, the library allows developers to execute mission-critical code with high precision and reliability, independent of the main application loop's performance.

## The Importance of ISR-Based Timing

In standard embedded development, many tasks are handled via software timers or polling within the `loop()` function. However, these methods are susceptible to blocking; if a function (like a WiFi connection or a slow sensor read) takes too long, the software timer will drift or fail to trigger. 

This library uses Interrupt Service Routines (ISRs) to ensure that timing remains nearly perfect. Because the interrupts are handled at the hardware level, the CPU will pause its current task to execute the timer handler at the exact requested interval. This is essential for applications requiring consistent sampling rates, motor control, or safety-critical monitoring.

## Key Features

- **Resource Efficiency**: Hardware timers are a limited resource on any MCU. This library includes an ISR-based timer array that allows you to run up to 16 separate timers while only consuming one of the four available hardware timers on the RP2040.
- **Non-Blocking Execution**: Timer execution is not hindered by "badly behaved" code or blocking functions in the main loop.
- **Flexible Intervals**: Supports intervals ranging from microseconds for high-frequency tasks to practically unlimited durations using unsigned long milliseconds.
- **Core Compatibility**: Specifically designed for the `Arduino-mbed RP2040` core, ensuring deep integration with the official Arduino board support package.

## Technical Implementation and Constraints

When using this library, developers must adhere to standard ISR practices to maintain system stability. Since the handlers run in an interrupt context:
- Variables modified within the ISR and accessed elsewhere must be declared as `volatile`.
- Handlers must be kept short and efficient.
- On MBED-based cores, `Serial.print()` should never be used inside an ISR, as it can lead to immediate system hangs.

## Getting Started

The library provides two primary ways to interact with timers: direct hardware timer access for high-frequency needs, and the ISR-based timer array for managing multiple lower-frequency tasks.

### Basic Hardware Timer Example

```cpp
#include "MBED_RPi_Pico_TimerInterrupt.h"

// Initialize Hardware Timer 0
MBED_RPI_PICO_Timer ITimer(0);

void TimerHandler(uint alarm_num) {
  // Perform time-sensitive task here
}

void setup() {
  // Attach the handler with a 1-second interval (1,000,000 microseconds)
  if (ITimer.attachInterruptInterval(1000 * 1000, TimerHandler)) {
    Serial.println("Timer Started");
  } else {
    Serial.println("Failed to start timer");
  }
}
```

### Multiplexing Timers

For projects requiring multiple periodic events, the `MBED_RPI_PICO_ISR_Timer` class can be used to schedule various functions at different intervals, all synchronized by a single hardware interrupt. This is particularly useful for complex IoT projects where different sensors might need different polling rates.
